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
from flask.ext.mail import Mail, Message
from OpenSSL import SSL
from flask_sslify import SSLify
from flask.ext.mongoengine import MongoEngine

from datetime import datetime
import re
import requests
import arrow
import json
from bson import ObjectId

from github import IssueTracker
from cors import crossdomain
from secrets import (google_keys, gmail_keys, github_keys, SECRET_KEY,
                     mongo_auth)

# ----------------------------------------------------------------------
#  Configuration
# ----------------------------------------------------------------------
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

# Setup Flask Mail (using Gmail)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = gmail_keys.username
app.config['MAIL_PASSWORD'] = gmail_keys.password

mail = Mail(app)

# Setup OAuth
oauth = OAuth()

# Use Google as remote application
# You must configure 3 values from Google APIs console
# https://code.google.com/apis/console
google = oauth.remote_app('google',
  # Prepend to all (non-absolute) request URLs
  base_url='https://www.google.com/accounts/',
  authorize_url='https://accounts.google.com/o/oauth2/auth',
  request_token_url=None,
  request_token_params={
    'scope': "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    'response_type': 'code'
  },
  access_token_url='https://accounts.google.com/o/oauth2/token',
  access_token_method='POST',
  access_token_params={'grant_type': 'authorization_code'},
  consumer_key=google_keys.client_id,
  consumer_secret=google_keys.client_secret
)

# Setup MongoEngine
# MongoDB
app.config['MONGODB_SETTINGS'] = {
  'USERNAME': mongo_auth.username,
  'PASSWORD': mongo_auth.password,
  'HOST': mongo_auth.host,
  'PORT': mongo_auth.port,
  'DB': mongo_auth.db,
}
db = MongoEngine(app)

# Setup LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
  user = User.objects.get(id=ObjectId(user_id))
  return user

# Setup GitHub IssueTracker
it = IssueTracker(github_keys.username, github_keys.password)


# +--------------------------------------------------------------------+
# |  Flask-MongoEngine Models
# +--------------------------------------------------------------------+
class User(db.Document):
  given_name = db.StringField()
  family_name = db.StringField()
  name = db.StringField()
  locale = db.StringField()
  email = db.EmailField(required=True, unique=True)
  created_at = db.DateTimeField(default=datetime.now())
  google_id = db.StringField()
  name = db.StringField()
  institutes = db.ListField()
  access_token = db.StringField()

  def is_active(self):
    return True

  def is_authenticated(self):
    return True

  def is_anonymous(self):
    return False

  def get_id(self):
    try:
      return str(self.id)
    except AttributeError:
      raise NotImplementedError('No `id` attribute - override `get_id`')


class Comment(db.Document):
  user = db.ReferenceField(User)
  email = db.StringField(required=True)
  # 'variantid' or 'family'
  parent_id = db.StringField(required=True, unique_with='email')
  body = db.StringField()
  created_at = db.DateTimeField(default=datetime.now())
  # 'column' or 'rating'
  category = db.StringField()
  # 'position_in_column'
  type = db.StringField()


class Sample(db.EmbeddedDocument):
  sample_id = db.StringField(required=True, unique=True)
  father = db.ReferenceField('self')
  mother = db.ReferenceField('self')
  sex = db.StringField()
  phenotype = db.StringField()
  internal_id = db.StringField(unique=True)
  tissue_origin = db.StringField()
  isolation_kit = db.StringField()
  isolation_date = db.DateTimeField()
  isolation_personnel = db.StringField()
  physician = db.StringField()
  inheritance_models = db.ListField()
  phenotype_terms = db.ListField()
  seq_id = db.StringField()
  sequencing_provider_id = db.StringField(unique=True)
  capture_kit = db.StringField()
  capture_date = db.DateTimeField()
  capture_personnel = db.StringField()
  clustering_date = db.DateTimeField()
  sequencing_kit = db.StringField()
  clinical_db = db.StringField()


class Pedigree(db.Document):
  family_id = db.StringField()
  samples = db.ListField(db.EmbeddedDocumentField(Sample))


# +--------------------------------------------------------------------+
# |  Utility functions
# +--------------------------------------------------------------------+
class MongoDocumentEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, datetime):
      # Return a string like "2 hours ago"
      return arrow.get(o).format('YYYY-MM-DD HH:mm:ss ZZ')

    elif isinstance(o, ObjectId):
      return str(o)

    return json.JSONEncoder(self, o)


def jsonify_mongo(*args, **kwargs):
  payload = json.dumps(dict(*args, **kwargs), cls=MongoDocumentEncoder,
                       separators=(',', ':'), ensure_ascii=False)

  return Response(payload, mimetype='application/json; charset=utf-8')


# ----------------------------------------------------------------------
#  Routes
# ----------------------------------------------------------------------
# Return a tuple of Google tokens, if they exist
@google.tokengetter
def get_google_token():
  """This is ised by the API to look for auth token and secret."""
  if current_user.is_authenticated():
    return (current_user.access_token, '')
  else:
    flash('Not able to get user tokens.')
    return None


@app.route('/')
def index():
  if current_user.is_authenticated():
    # Serve the Ember.js app
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
    r = requests.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      headers={'Authorization': 'OAuth ' + resp['access_token']})

    if r.ok:
      user_info = r.json()

      # Now let's store the user in the datastore
      user = User.objects(email=user_info['email']).first()
      if user is None:

        # Let's finally check if the user should have access
        url = 'http://clinical-db.scilifelab.se:8082/checkEmail/'\
              + user_info['email']
        r2 = requests.get(url)
        validation = r2.json()

        if 'Error' in validation:
          return jsonify(**validation), 403

        # Create a new user
        user = User(
          google_id=user_info['id'],
          email=user_info['email'],
          access_token=resp['access_token'],
          given_name=user_info['given_name'],
          family_name=user_info['family_name'],
          name=user_info['name'],
          locale=user_info['locale'],
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

  next_url = request.args.get('next') or url_for('index')
  return redirect(next_url)


@app.route('/logout')
def logout():
  logout_user()
  return redirect(request.referrer or url_for('index'))


# ----------------------------------------------------------------------
#  REST API routes
# ----------------------------------------------------------------------
# Get user info object
@app.route('/user', methods=['GET'])
@crossdomain(origin='*', methods=['GET'])
def user():
  try:
    user = current_user.to_mongo().to_dict()
  except AttributeError:
    # return jsonify(error="You are not logged in."), 403
    print('\nFAKING A USER!')
    user = {'name': 'Robin Andeer', 'email': 'robin.andeer@scilifelab.se'}

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
  cookie = {'institute': ','.join(current_user.institutes)}

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
  """.format(body=request.form['body'], author=current_user.name)

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


if __name__ == '__main__':
  if DEBUG:
    app.run('localhost', port=5000)

  else:
    app.run('0.0.0.0', port=8081, ssl_context=ctx)
