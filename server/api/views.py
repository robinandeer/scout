# -*- coding: utf-8 -*-
from datetime import datetime
import json

from bson import ObjectId
from flask import Blueprint, current_app, jsonify, request, Response, \
  make_response
from flask.ext.login import current_user, login_required
from flask.ext.mail import Message
from pymongo.errors import DuplicateKeyError
import requests

from ..extensions import mongo, mail, gh_issues
from ..utils import get_current_time, PLURAL_METHODS, SINGLE_METHODS, \
  jsonify_mongo, HTTP_METHODS

api = Blueprint('api', __name__, url_prefix='/api/v1')


@api.route('/remote/static/<path:path>', methods=['GET'])
@login_required
def remote_static(path):
  """Route incoming API calls to the Tornado backend and sends JSON response"""
  # Check if GET 206
  range_header = request.headers.get('Range', None)
  if range_header:
    headers = {'Range': range_header}
  else:
    headers = {}

  # Route request to Tornado
  TORNADO_PORT = current_app.config.get('TORNADO_PORT')
  url = 'http://clinical-db.scilifelab.se:{port}/static/{path}'\
        .format(port=TORNADO_PORT, path=path)
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


@api.route('/activities', methods=PLURAL_METHODS)
@api.route('/activities/<document_id>', methods=SINGLE_METHODS)
@login_required
def activities(document_id=None):
  # Store the submitted query options
  query_args = request.args.to_dict()
  data = request.json

  if document_id:
    # Well, at least we know we should try to fetch a document
    document = mongo.db.activity.find_one({'_id': ObjectId(document_id)})

  if request.method == 'POST':
    # Update data before inserting a new document
    data['created_at'] = get_current_time()
    data['user_id'] = ObjectId(data['user_id'])

    # Add a new activity to the collection
    try:
      document_id = mongo.db.activity.insert(data)
      document = data
      document['_id'] = document_id
    except DuplicateKeyError:
      return Response('Document already exists'), 500

  elif request.method == 'GET':
    if document_id is None:
      return jsonify_mongo(activities=list(mongo.db.activity.find(query_args)))

  elif request.method == 'PUT':
    # Update a specific document
    # Start by updating the changed fields
    for key, value in data.items():
      if key == 'user_id':
        value = ObjectId(value)
      elif key in ('created_at', 'updated_at'):
        value = datetime(value)

      document[key] = value

      mongo.db.activity.save(document)

  elif request.method == 'DELETE':
    # Remove a document from the collection
    effect = mongo.db.activity.remove(ObjectId(document_id))

    if effect['err']:
      # There was an error while deleting the record
      return Response(effect['err']), 500

  return jsonify_mongo(document)


@api.route('/users/<user_id>', methods=['OPTIONS', 'GET'])
@login_required
def users(user_id=None):
  if user_id:
    if user_id == 'current':
      # Get the user id from the logged in user
      user_id = current_user['user_id']

    # Fetch document from the store
    user = mongo.db.user.find_one({'_id': ObjectId(user_id)})

    if user is None:
      return Response('User document with id: %s not found' % user_id), 404

  # Return json object for the logged in user
  return jsonify_mongo(**user)


# +--------------------------------------------------------------------+
# |  Sanger Sequencing Order Mail
# +--------------------------------------------------------------------+
@api.route('/sanger', methods=['POST'])
@login_required
def sanger_order():
  sender_email = current_user.get('email', 'robin.andeer@gmail.com')

  # Send an email with Sanger sequencing order
  msg = Message(
    'Sanger sequencing of ' + request.form['hgnc_symbol'],
    sender=current_app.config.get('MAIL_USERNAME'),
    recipients=current_app.config.get('MAIL_RECEPIENTS'),
    cc=[sender_email],
    bcc=['robin.andeer@scilifelab.se']
  )
  msg.html = request.form['message']
  mail.send(msg)

  return jsonify(message=msg.html)


# +--------------------------------------------------------------------+
# |  GitHub Issues
# +--------------------------------------------------------------------+
@api.route('/issues', methods=PLURAL_METHODS)
@api.route('/issues/<issue_id>', methods=SINGLE_METHODS)
@login_required
def issues(issue_id=None):
  if request.method == 'POST':
    # Submit an issue to the Scout repo at GitHub

    # Build the body content
    body = """{body}

submitted by **{author}**.
    """.format(body=request.json['body'].encode('utf-8'),
               author=current_user.get('name').encode('utf-8'))

    # Create the new isssue
    issue = gh_issues.create(request.json['title'], body)

    return jsonify(id=issue.number, body=issue.body, title=issue.title,
                   html=issue.body_html, url=issue.html_url)

  elif request.method == 'GET':

    if issue_id:
      # Find an existing issue
      issue = gh_issues.find(issue_id)
      payload = dict(
        id=issue.number,
        title=issue.title,
        body=issue.body,
        html=issue.body_html,
        created_at=issue.created_at.date().isoformat(),
        url=issue.html_url
      )

      return jsonify(**payload)

    else:
      # Get all existing issues
      issues = [{
        'id': issue.number,
        'title': issue.title,
        'body': issue.body,
        'html': issue.body_html,
        'created_at': issue.created_at.date().isoformat(),
        'url': issue.html_url
      } for issue in gh_issues.find()]

      return jsonify(issues=issues)


# Route incoming API calls to the Tornado backend and sends JSON response
@api.route('/<path:path>', methods=HTTP_METHODS)
@login_required
def remote_api(path):
  # Route incoming request to Tornado
  try:
    cookie = {'institute': ','.join(current_user.get('institutes', []))}
  except AttributeError:
    return jsonify(error='You are not logged in!'), 403

  # Double check that user has access to the institute
  institute = request.args.get('institute')
  unauthorized = institute not in cookie['institute'].split(',')
  if request.args.get('institute') and unauthorized:
    return Response('Error'), 401

  TORNADO_PORT = current_app.config.get('TORNADO_PORT')
  url = 'http://clinical-db.scilifelab.se:{port}/{path}?{query}'\
        .format(port=TORNADO_PORT, path=path, query=request.query_string)

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
