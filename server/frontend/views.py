# -*- coding: utf-8 -*-
from flask import (abort, Blueprint, flash, redirect, request, session,
  url_for, current_app)
from flask.ext.login import (confirm_login, current_user, login_required,
  login_user, logout_user)
import requests

from ..decorators import templated
from ..extensions import google, mongo
from .models import User
from ..utils import get_current_time


frontend = Blueprint('frontend', __name__)


@google.tokengetter
def get_google_token():
  """Returns a tuple of Google tokens, if they exist"""
  return session.get('google_token')


@frontend.route('/')
def index():
  if current_user.is_authenticated():
    # Serve entry point to the Ember.js app
    return current_app.send_static_file('index.html')
  else:
    return redirect(url_for('frontend.connect'))


@frontend.route('/connect')
@templated('login.html')
def connect():
  return dict()


@frontend.route('/unsupported')
@templated('errors/unsupported_browser.html')
def unsupported_browser():
  return dict()


@frontend.route('/login')
def login():
  callback_url = url_for('frontend.authorized', _external=True)
  return google.authorize(callback=callback_url)


@frontend.route('/reauth')
@login_required
def reauth():
  if confirm_login():
    flash('Reauthenticated', 'success')

  return redirect(
    request.args.get('next') or request.referer or url_for('frontend.index'))


@frontend.route('/logout')
@login_required
def logout():
  logout_user()
  session.pop('google_token', None)
  flash('Logged out', 'success')

  return redirect(url_for('frontend.index'))


@frontend.route('/authorized')
@google.authorized_handler
def authorized(oauth_response):

  if oauth_response is None:
    flash('Access denied: reason=%s error=%s' % (
      request.args['error_reason'],
      request.args['error_description']
    ))

    return abort(403)

  # Add token to session, do it before validation to be able to fetch
  # additional data (like email) on the authenticated user
  session['google_token'] = (oauth_response['access_token'], '')

  # Get additional user info with the access token
  google_user = google.get('userinfo')
  google_data = google_user.data

  # Run an internal check to make sure the user should have access to Scout
  url = ('http://clinical-db.scilifelab.se:%d/checkEmail/%s'
         % (8082, google_data['email']))

  validation = requests.get(url).json()

  if 'Error' in validation:
    flash(validation.get('Error'))
    return abort(403)

  # Check if user is already in the database
  user_data = mongo.db.user.find_one({'email': google_data['email']})
  if user_data is None:

    # OK, let's store the NEW user in the datastore
    user_data = dict(
      google_id = google_data['id'],
      email = google_data['email'],
      access_token = oauth_response['access_token'],
      given_name = google_data['given_name'],
      family_name = google_data['family_name'],
      name = google_data['name'],
      locale = google_data['locale'],
      institutes = validation['institute'].split(','),
      created_at = get_current_time()
    )

    user_data['_id'] = mongo.db.user.insert(user_data)

  else:
    # In any case we need to keep the user object up to date
    user_data['access_token'] = oauth_response['access_token']
    # Update user with latest values from ref database + logged_in_at
    user_data['logged_in_at'] = get_current_time()
    user_data['institutes'] = validation['institute'].split(',')

    mongo.db.user.save(user_data)

  # Convert to Flask-Login User object
  user = User(**user_data)

  if login_user(user, remember=True):
    # For the timeout/session lifetime config to work we need
    # to make the sessions permanent. It's false by default
    # +INFO: http://flask.pocoo.org/docs/api/#flask.session.permanent
    session.permanent = True
    session['logged_in'] = True
    session['user_id'] = str(user['_id'])
    session['name'] = user['name']
    session['email'] = user['email']
    session['institutes'] = user['institutes']
    flash('Logged in', 'success')

    return redirect(request.args.get('next') or url_for('frontend.index'))

  flash('Sorry, you could not log in', 'warning')
  return redirect('frontend.connect')
