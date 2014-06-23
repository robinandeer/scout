# -*- coding: utf-8 -*-
import os

from .utils import make_dir, INSTANCE_FOLDER_PATH


class BaseConfig(object):

  PROJECT = 'server'
  NAME = PROJECT

  # Get app root path, also can use flask.root_path.
  # ../../config.py
  PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

  DEBUG = False
  TESTING = False

  # http://flask.pocoo.org/docs/quickstart/#sessions
  SECRET_KEY = 'secret key'

  LOG_FOLDER = os.path.join(INSTANCE_FOLDER_PATH, 'logs')
  make_dir(LOG_FOLDER)

  ADMINS = ['robin.andeer@scilifelab.se']


class DefaultConfig(BaseConfig):

  NAME = 'scout'

  DEBUG = True

  # Flask-cache: http://pythonhosted.org/Flask-Cache/
  CACHE_TYPE = 'simple'
  CACHE_DEFAULT_TIMEOUT = 60

  TORNADO_PORT = 8082

  # Flask-mail: http://pythonhosted.org/flask-mail/
  # https://bitbucket.org/danjac/flask-mail/issue/3/problem-with-gmails-smtp-server
  MAIL_DEBUG = DEBUG
  MAIL_SERVER = 'smtp.gmail.com'
  MAIL_PORT = 587
  MAIL_USE_TLS = True
  MAIL_USE_SSL = False
  # Put real MAIL_USERNAME and MAIL_PASSWORD under instance folder
  MAIL_USERNAME = 'yourmail@gmail.com'
  MAIL_PASSWORD = 'yourpass'
  MAIL_DEFAULT_SENDER = MAIL_USERNAME


class TestConfig(BaseConfig):

  TESTING = True
