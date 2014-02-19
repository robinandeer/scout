#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask.ext.mongoengine import MongoEngine
from flask.ext.mail import Mail
from flask.ext.login import LoginManager
from flask_oauthlib.client import OAuth

from OpenSSL import SSL
from flask_sslify import SSLify

from github import IssueTracker
from secrets import ssl_key_path, ssl_cert_path, github_keys
from scout import app


# +--------------------------------------------------------------------+
# |  SSL
# +--------------------------------------------------------------------+
# Setup SSL: http://flask.pocoo.org/snippets/111/
ctx = SSL.Context(SSL.SSLv23_METHOD)
ctx.use_privatekey_file(ssl_key_path)
ctx.use_certificate_file(ssl_cert_path)

# https://github.com/kennethreitz/flask-sslify
# Force SSL. Redirect all incoming requests to HTTPS.
# Only takes effect when DEBUG=False
sslify = SSLify(app)


# +--------------------------------------------------------------------+
# |  Flask-Mail
# +--------------------------------------------------------------------+
mail = Mail(app)


# +--------------------------------------------------------------------+
# |  MongoEngine
# +--------------------------------------------------------------------+
db = MongoEngine(app)


# +--------------------------------------------------------------------+
# |  Flask-OAuth
# +--------------------------------------------------------------------+
oauth = OAuth(app)

# Use Google as remote application
# You must configure 3 values from Google APIs console
# https://code.google.com/apis/console
google = oauth.remote_app('google',
  consumer_key=app.config.get('GOOGLE_ID'),
  consumer_secret=app.config.get('GOOGLE_SECRET'),
  # Prepend to all (non-absolute) request URLs
  base_url='https://www.googleapis.com/oauth2/v1/',
  authorize_url='https://accounts.google.com/o/oauth2/auth',
  request_token_url=None,
  # request_token_params={
  #     'scope': 'https://www.googleapis.com/auth/userinfo.email'
  # },
  request_token_params={
    'scope': "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
  },
  access_token_url='https://accounts.google.com/o/oauth2/token',
  access_token_method='POST'
)


# +--------------------------------------------------------------------+
# |  Flask-LoginManager
# +--------------------------------------------------------------------+
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


# +--------------------------------------------------------------------+
# |  GitHub IssueTracker
# +--------------------------------------------------------------------+
it = IssueTracker(github_keys.username, github_keys.password)
