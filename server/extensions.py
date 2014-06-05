# -*- coding: utf-8 -*-
from flask.ext.login import LoginManager
from flask.ext.mail import Mail
from flask_oauthlib.client import OAuth
from flask.ext.pymongo import PyMongo
from OpenSSL import SSL

from .github import IssueTracker

# +--------------------------------------------------------------------+
# | Flask-PyMongo
# +--------------------------------------------------------------------+
mongo = PyMongo()

# +--------------------------------------------------------------------+
# | Flask-OAuthlib
# +--------------------------------------------------------------------+
oauth = OAuth()

# Use Google as remote application
# You must configure 3 values from Google APIs console
# https://code.google.com/apis/console
google = oauth.remote_app('google', app_key='GOOGLE')

# +--------------------------------------------------------------------+
# | Flask-Login
# +--------------------------------------------------------------------+
login_manager = LoginManager()

login_manager.login_view = 'frontend.index'
login_manager.login_message = 'Please log in to access this page.'
login_manager.refresh_view = 'frontend.reauth'

# +--------------------------------------------------------------------+
# | Flask-Mail
# +--------------------------------------------------------------------+
mail = Mail()

# GitHub IssueTracker
gh_issues = IssueTracker()

# +--------------------------------------------------------------------+
# | Flask-SSLify
# +--------------------------------------------------------------------+
# (ext lacks init_app...)
ctx = SSL.Context(SSL.SSLv23_METHOD)
