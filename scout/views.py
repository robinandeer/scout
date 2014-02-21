#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bson import ObjectId
import requests

from flask import request, Response, make_response, jsonify, flash
from flask import render_template, session, url_for, redirect
from flask.ext.login import current_user, login_user, logout_user
from flask.ext.mail import Message

from cors import crossdomain
from secrets import gmail_keys
from scout import app
from scout.core import it, mail, google, login_manager
from scout.models import User, Comment
from scout.settings import REDIRECT_URI
from scout.utils import jsonify_mongo


# +--------------------------------------------------------------------+
# |  OAuth related routes
# +--------------------------------------------------------------------+
@login_manager.user_loader
def load_user(user_id):
  user = User.objects.get(id=ObjectId(user_id))
  return user


# Return a tuple of Google tokens, if they exist
@google.tokengetter
def get_google_token():
  return session.get('google_token')


@app.route('/')
def index():
  if current_user.is_authenticated():
    # Serve the Ember.js app
    return app.send_static_file('index.html')

  else:
    return render_template('login.html')


@app.route('/login')
def login():
  return google.authorize(callback=url_for('authorized', _external=True))


@app.route(REDIRECT_URI)
@google.authorized_handler
def authorized(resp):
  if resp is None:
    return 'Access denied: reason=%s error=%s' % (
        request.args['error_reason'],
        request.args['error_description']
    )

  # Add token to session
  session['google_token'] = (resp['access_token'], '')

  # Get more user info with the access token
  me = google.get('userinfo')

  # Now let's store the user in the datastore
  user = User.objects(email=me.data['email']).first()
  if user is None:

    # Let's finally check if the user should have access
    url = 'http://clinical-db.scilifelab.se:8082/checkEmail/'\
          + me.data['email']
    r2 = requests.get(url)
    validation = r2.json()

    if 'Error' in validation:
      return jsonify(**validation), 403

    # Create a new user
    user = User(
      google_id=me.data['id'],
      email=me.data['email'],
      access_token=resp['access_token'],
      given_name=me.data['given_name'],
      family_name=me.data['family_name'],
      name=me.data['name'],
      locale=me.data['locale'],
      institutes=validation['institute'].split(',')
    ).save()

    login_user(user)

  else:
    # In any case we update the authentication token in the db
    # In case the user temporarily revoked access we will have new tokens
    user.access_token = resp['access_token']

    user.save()
    login_user(user)

  session['user_id'] = str(user.id)

  return redirect(request.referrer or url_for('index'))


@app.route('/logout')
def logout():
  logout_user()
  session.pop('google_token', None)
  return redirect(request.referrer or url_for('index'))


# +--------------------------------------------------------------------+
# |  REST API
# +--------------------------------------------------------------------+
# Get user info object
@app.route('/v1/user', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def user():
  user = {'name': 'Robin Andeer', 'email': 'robin.andeer@scilifelab.se'}
  # try:
  #   user = current_user.to_mongo().to_dict()
  # except AttributeError:
  #   # return jsonify(error="You are not logged in."), 403
  #   print('\nFAKING A USER!')
  #   user = {'name': 'Robin Andeer', 'email': 'robin.andeer@scilifelab.se'}

  # Return json object for the logged in user
  return jsonify_mongo(**user)


# Route incoming API calls to the Tornado backend and sends JSON response
@app.route('/api/v1/<path:path>', methods=['GET', 'POST', 'DELETE'])
@crossdomain(origin='*', methods=['GET', 'POST', 'DELETE'])
def api(path):
  # Route incoming request to Tornado
  try:
    cookie = {'institute': ','.join(current_user.institutes)}
  except AttributeError, e:
    #return jsonify(error='You are not logged in!'), 403
    cookie = {'institute': 'CMMS'}

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
@app.route('/remote/static/<path:path>', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def remote_static(path):
  # Check if GET 206
  range_header = request.headers.get('Range', None)
  if range_header:
    headers = {'Range': range_header}
  else:
    headers = {}

  # Route request to Tornado
  url = 'http://clinical-db.scilifelab.se:8082/static/' + path
  cookie = {'institute': ','.join(['cmms'])}

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


# +--------------------------------------------------------------------+
# |  Sanger Sequencing Order Mail
# +--------------------------------------------------------------------+
@app.route('/v1/comments', methods=['OPTIONS', 'POST', 'GET'])
@app.route('/v1/comments/<comment_id>', methods=['OPTIONS', 'GET', 'PUT',
                                                 'DELETE'])
@crossdomain(origin='*', methods=['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'])
def comments(comment_id=None):
  # Get a specific comment if requested
  if comment_id:
    comment = Comment.objects.get(id=ObjectId(comment_id))

  if request.method == 'POST':
    # Create a new comment
    comment = Comment(**request.json).save()

  elif request.method == 'GET':
    if comment_id is None:
      # Get all comments for a given family/variant
      context = request.args.get('context')
      parent_id = request.args.get('parent_id')
      comments = Comment.objects(context=context, parent_id=parent_id)
      raw_comments = [c.to_mongo().to_dict() for c in comments]
      return jsonify_mongo(comments=raw_comments)

  elif request.method == 'PUT':
    # Update a specific comment
    Comment.objects(id=comment_id).update_one(**request.json)
    comment.reload()

  elif request.method == 'DELETE':
    # Delete a specific comment
    comment.delete()

  return jsonify_mongo(comment.to_mongo().to_dict())


# +--------------------------------------------------------------------+
# |  GitHub Issues
# +--------------------------------------------------------------------+
@app.route('/issues', methods=['GET', 'POST'])
@app.route('/issues/<issue_id>', methods=['GET', 'PUT', 'DELETE'])
@crossdomain(origin='*', methods=['GET', 'POST', 'PUT', 'DELETE'])
def issues(issue_id=None):
  if request.method == 'POST':
    # Submits an issue to Scout repo at GitHub
    body = """{body}

    submitted by **{author}**.
    """.format(body=request.form['body'], author=current_user.name)

    issue = it.create(request.form['title'], body)

    return jsonify(id=issue.id, body=issue.body, title=issue.title,
                   html=issue.body_html, url=issue.html_url)

  elif request.method == 'GET':

    if issue_id:
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

    else:
      # Get all issues
      issues = [{
        'id': issue.number,
        'title': issue.title,
        'body': issue.body,
        'html': issue.body_html,
        'created_at': issue.created_at.date().isoformat(),
        'url': issue.html_url
      } for issue in it.find()]

      return jsonify(issues=issues)


# +--------------------------------------------------------------------+
# |  Sanger Sequencing Order Mail
# +--------------------------------------------------------------------+
@app.route('/sanger', methods=['POST'])
@crossdomain(origin='*', methods=['POST'])
def sanger_order():
  # Send an email with Sanger sequencing order
  # TODO: should also send to the person submitting the order
  # current_user.email
  msg = Message('Sanger sequencing of ' + request.form['hgnc_symbol'],
    sender=gmail_keys.username,
    recipients=['robin.andeer@gmail.com']
  )

  body = {
    'family_id': request.form['family_id'],
    'variant_link': request.form['variant_link'],
    'db': request.form['database'],
    'chr_pos': request.form['chr_pos'],
    'amino_change': request.form['amino_change'],
    'gt_call': request.form['gt_call'],
    'name': current_user.name
  }

  msg.body = """\n
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
