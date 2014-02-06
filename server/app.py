#!/usr/bin/env python
# coding: utf-8
"""
scout.app
~~~~~~~~~~~~~~
"""

from flask import (Flask, request, redirect, url_for, session, flash,
                   render_template, jsonify, Response, make_response)
from flask_oauth import OAuth
from flask.ext.login import (LoginManager, login_user, logout_user,
                             current_user, login_required)
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.mail import Mail, Message
from OpenSSL import SSL
from flask_sslify import SSLify

import re
import requests
import arrow
import json

from github import IssueTracker
from cors import crossdomain
from secrets import google_keys, gmail_keys, github_keys, SECRET_KEY

# ----------------------------------------------------------------------
#  Configuration
# ----------------------------------------------------------------------
DATABASE_URI = 'sqlite:///db.sqlite'
DEBUG = True
# One of the Redirect URIs from Google APIs console
REDIRECT_URI = '/authorized'

# Setup Flask
app = Flask(__name__, static_url_path='/static')
app.config['DEBUG'] = DEBUG
app.config['SECRET_KEY'] = SECRET_KEY

# Setup SSL: http://flask.pocoo.org/snippets/111/
ctx = SSL.Context(SSL.SSLv23_METHOD)
ctx.use_privatekey_file('/Users/robinandeer/Downloads/recertifikat/myserver.key')
ctx.use_certificate_file('/Users/robinandeer/Downloads/recertifikat/server.crt')

# https://github.com/kennethreitz/flask-sslify
# Force SSL. Redirect all incoming requests to HTTPS.
# Only takes effect when DEBUG=False
sslify = SSLify(app)

# Setup OAuth
oauth = OAuth()

# Setup Flask Mail (using Gmail)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = gmail_keys.username
app.config['MAIL_PASSWORD'] = gmail_keys.password

mail = Mail(app)

# Use Google as remote application
# You must configure 3 values from Google APIs console
# https://code.google.com/apis/console
google = oauth.remote_app('google',
  # Prepend to all (non-absolute) request URLs
  base_url             = 'https://www.google.com/accounts/',
  authorize_url        = 'https://accounts.google.com/o/oauth2/auth',
  request_token_url    = None,
  request_token_params = {
    'scope': 'https://www.googleapis.com/auth/userinfo.email',
    'response_type': 'code'
  },
  access_token_url     = 'https://accounts.google.com/o/oauth2/token',
  access_token_method  = 'POST',
  access_token_params  = {'grant_type': 'authorization_code'},
  consumer_key         = google_keys.client_id,
  consumer_secret      = google_keys.client_secret
)

# Setup SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
db = SQLAlchemy(app)

# Setup LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
  user = User.query.get(user_id)
  flash(user.email + ' logged in!')
  return user

# Setup GitHub IssueTracker
it = IssueTracker(github_keys.username, github_keys.password)


# ----------------------------------------------------------------------
#  Flask-SQLAlchemy Models
# ----------------------------------------------------------------------
class User(db.Model):
  """docstring for User"""
  id = db.Column(db.Integer, primary_key=True)
  google_id = db.Column(db.String)
  name = db.Column(db.String)
  email = db.Column(db.String)
  institute = db.Column(db.String)
  access_token = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=arrow.now().datetime)
  active = db.Column(db.Boolean, default=True)

  def to_dict(self):
    return {
      'id': self.id,
      'google_id': self.google_id,
      'name': self.name,
      'email': self.email,
      'institute': self.institute
    }

  def __repr__(self):
    return "<User (name='{name}')>".format(name=self.name)

  def is_active(self):
    return True

  def is_authenticated(self):
    return True

  def is_anonymous(self):
    return False

  def get_id(self):
    try:
      return unicode(self.id)
    except AttributeError:
      raise NotImplementedError('No `id` attribute - override `get_id`')


# ----------------------------------------------------------------------
#  Routes
# ----------------------------------------------------------------------
# Return a tuple of Google tokens, if they exist
@google.tokengetter
def get_google_token():
  """This is ised by the API to look for aith token and secret."""
  if current_user.is_authenticated():
    return (current_user.access_token, '')
  else:
    flash('Not able to get user tokens.')
    return None

@app.route('/')
def index():
  if current_user.is_authenticated():
    #return render_template('index.html')
    return app.send_static_file('index.html')

  else:
    return render_template('login.html')

@app.route('/login')
def login():
  """Calling into authorize. If everything works out, the remote app will
  redirect back to the callback URL."""
  # Setup OAuth callback
  next_url = request.args.get('next') or request.referrer or None
  session['next'] = next_url

  return google.authorize(callback=url_for('google_callback', _external=True))

@app.route(REDIRECT_URI)
@google.authorized_handler
def google_callback(resp):
  """Called after authorization."""
  if resp is None:
    flash(u'You denied the request to sign in.')

  else:
    # Get more user info with the access token
    r = requests.get('https://www.googleapis.com/oauth2/v1/userinfo',
      headers={'Authorization': 'OAuth ' + resp['access_token']})

    if r.ok:
      user_info = r.json()

      # Now let's store the user in the datastore
      user = User.query.filter_by(email=user_info['email']).first()
      if user is None:
        # Create a new user
        user = User(
          google_id    = user_info['id'],
          email        = user_info['email'],
          access_token = resp['access_token']
        )

        db.session.add(user)
        db.session.commit()

        login_user(user)
        flash('You created a new account: ' + user_info['email'])

      else:
        # In any case we update the authentication token in the db
        # In case the user temporarily revoked access we will have new tokens
        user.access_token = resp['access_token']

        db.session.commit()
        login_user(user)
        flash('You were signed in as: ' + user_info['email'])

      session['user_id'] = user.id

  next_url = request.args.get('next') or url_for('index')
  return redirect(next_url)

@app.route('/logout')
def logout():
  logout_user()
  flash('You were signed out.')
  return redirect(request.referrer or url_for('index'))


# ----------------------------------------------------------------------
#  REST API routes
# ----------------------------------------------------------------------
# Get user info object
@app.route('/user', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def user():
  try:
    user = current_user.to_dict()
  except AttributeError:
    user = {'name': 'Robin Andeer', 'email': 'robin.andeer@scilifelab.se'}

  # Return json object for the logged in user
  return jsonify(**user)

# Route incoming API calls to the Tornado backend and sends JSON response
@app.route('/api/v1/<path:path>', methods=['GET', 'POST', 'DELETE'])
@crossdomain(origin='*', methods=['GET', 'POST', 'DELETE'])
def api(path):
  # Route incoming request to Tornado
  cookie = {'institute': 'cmms'} # current_user.institute

  url = 'http://clinical-db.scilifelab.se:8082/{path}?{query}'\
        .format(path=path, query=request.query_string)

  mimetype = 'application/json'

  if request.method == 'GET':
    r = requests.get(url, cookies=cookie)

  elif request.method == 'POST':
    # POST request
    headers = {'Content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(request.form.to_dict()),
                      cookies=cookie, headers=headers)

  elif request.method == 'DELETE':
    r = requests.delete(url, cookies=cookie)

  else:
    return jsonify(error='Not a valid REST method.')

  # Send JSON response
  return Response(r.text, mimetype=mimetype), r.status_code, dict(r.headers)

# Route incoming API calls to the Tornado backend and sends JSON response
@app.route('/api/static/<bam_file>', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def api_static(bam_file):
  # Check if GET 206
  range_header = request.headers.get('Range', None)
  if range_header:
    headers = {'Range': range_header}
  else:
    headers = {}

  # Route request to Tornado
  url = 'http://clinical-db:8082/static/' + bam_file
  cookie = {'institute': 'cmms'} # current_user.institute

  if request.method == 'GET':

    resp = requests.get(url, cookies=cookie, headers=headers)

    new_resp = make_response(resp.content)

  else:
    # HEAD request incoming
    resp = requests.head(url, cookies=cookie, headers=headers)

    new_resp = make_response(u'')

  new_resp.status_code = resp.status_code
  new_resp.headers['content-length'] = resp.headers.get('content-length')
  new_resp.headers['accept-ranges'] = resp.headers.get('accept-ranges')
  new_resp.headers['Content-Type'] = 'application/octet-stream'

  return new_resp


@app.route('/issues', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def issues():
  issues = [{
    'id': issue.number,
    'title': issue.title,
    'body': issue.body,
    'html': issue.body_html,
    'created_at': issue.created_at.date().isoformat(),
    'url': issue.html_url
  } for issue in it.find()]

  return jsonify(issues=issues)

@app.route('/issues/<issue_id>', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def issue(issue_id):
  issue = it.find(issue_id)
  json = {
    'id': issue.number,
    'title': issue.title,
    'body': issue.body,
    'html': issue.body_html,
    'created_at': issue.created_at.date().isoformat(),
    'url': issue.html_url
  }

  return jsonify(**json)

@app.route('/issues/new', methods=['POST'])
@crossdomain(origin='*', methods=['POST'])
def create_issue():
  # Submits an issue to Scout repo at GitHub
  body = """{body}

  submitted by **{author}**.
  """.format(body=request.form['body'], author='Anna Wedell')  # TEMP

  issue = it.create(request.form['title'], body)

  return jsonify(id=issue.id, body=issue.body, title=issue.title,
                 html=issue.body_html, url=issue.html_url)

# +--------------------------------------------------------------------+
# |  Sanger Sequencing Order Mail
# +--------------------------------------------------------------------+
@app.route('/sanger', methods=['POST'])
@crossdomain(origin='*', methods=['POST'])
def sanger_order():
  # Send an email with Sanger sequencing order
  # TODO: should also send to the person submitting the order
  # current_user.email
  msg = Message('Hello',
    sender = gmail_keys.username,
    recipients = ['robin.andeer@gmail.com']
  )

  body = {
    'hgnc': request.form['hgnc_symbol'],
    'family_id': request.form['family_id'],
    'variant_link': request.form['variant_link'],
    'db': request.form['database'],
    'chr_pos': request.form['chr_pos'],
    'amino_change': request.form['amino_change'],
    'gt_call': request.form['gt_call'],
    'name': current_user.name
  }

  msg.body = """Subject: Sanger sequencing of {hgnc}\n
    Family {family_id}: {variant_link} \n
    HGNC symbol: {hgnc}\n
    Database: {db}\n
    Chr position: {chr_pos}\n
    Amino acid change:\n{amino_change}\n
    GT-call:\n{gt_call}\n
    Ordered by: {name}\n
  """.format(**body)

  mail.send(msg)

  return jsonify(**body)


if __name__ == '__main__':
  if DEBUG:
    app.run('localhost', port=5000)

  else:
    app.run('0.0.0.0', port=8081, ssl_context=ctx)
