# -*- coding: utf-8 -*-
"""
  App Setup Factory Function
"""
from datetime import timedelta
import os

from flask import Flask, render_template, session, current_app
from flask_sslify import SSLify

from .api import api
from .config import DefaultConfig
from .extensions import login_manager, oauth, mongo, mail, gh_issues, ctx
from .frontend import frontend
from .frontend.models import User
from .utils import INSTANCE_FOLDER_PATH

# Common blueprints
DEFAULT_BLUEPRINTS = (frontend, api)


def create_app(config=None, app_name=None, blueprints=None):
  """Create and initialize a Flask app"""
  if app_name is None:
    app_name = DefaultConfig.PROJECT

  if blueprints is None:
    blueprints = DEFAULT_BLUEPRINTS

  app = Flask(
    app_name,
    static_url_path='',
    instance_path=INSTANCE_FOLDER_PATH,
    instance_relative_config=True
  )

  configure_app(app, config)
  configure_blueprints(app, blueprints)
  configure_extensions(app)
  configure_logging(app)
  configure_error_handlers(app)

  return app


def configure_app(app, config=None):
  """Different ways of configuring the app"""

  # http://flask.pocoo.org/docs/api/#configuration
  app.config.from_object(DefaultConfig)

  # http://flask.pocoo.org/docs/config/#instance-folders
  app.config.from_pyfile((config or 'scout.cfg'), silent=True)

  # Set the timeout for our session to 30 days.
  # The session will be lost after 30 days with no interaction form
  # the user.
  # +INFO: http://flask.pocoo.org/docs/api/#flask.Flask.permanent_session_lifetime
  app.permanent_session_lifetime = timedelta(days=1)


def configure_extensions(app):
  # Flask-PyMongo
  mongo.init_app(app)

  # Flask-OAuthlib
  oauth.init_app(app)

  # Flask-Login
  @login_manager.user_loader
  def load_user(user_id):
    """Returns the currently active user as an object.

    Since this app doesn't handle passwords etc. there isn't as much
    incentive to keep pinging the database for every request protected
    by 'login_required'.

    Instead I set the expiration for the session cookie to expire at
    regular intervals.
    """
    # 1. Retrive user data from the session
    # 2. Create new User object based of that (potential) data
    data = {
      'user_id': session.get('user_id'),
      'name': session.get('name'),
      'email': session.get('email'),
      'institutes': session.get('institutes')
    }

    if data.get('email'):
      user = User(**data)
    else:
      user = None

    return user

  login_manager.init_app(app)

  # Flask-Mail
  mail.init_app(app)

  # GitHub Issue Tracker
  gh_issues.init_app(app)

  # Setup SSL: http://flask.pocoo.org/snippets/111/
  ctx.use_privatekey_file(app.config.get('SSL_KEY_PATH'))
  ctx.use_certificate_file(app.config.get('SSL_CERT_PATH'))

  # https://github.com/kennethreitz/flask-sslify
  # Force SSL. Redirect all incoming requests to HTTPS.
  # Only takes effect when DEBUG=False
  SSLify(app)


def configure_blueprints(app, blueprints):
  """Configure blueprints in views"""
  for blueprint in blueprints:
    app.register_blueprint(blueprint)


def configure_logging(app):
  """Configure file(info) and email(error) logging"""

  if app.debug or app.testing:
    # Skip debug and test mode; just check standard output
    return

  import logging
  from logging.handlers import RotatingFileHandler, SMTPHandler

  # Set info level on logger which might be overwritten by handlers
  # Suppress DEBUG messages
  app.logger.setLevel(logging.INFO)

  info_log = os.path.join(app.config['LOG_FOLDER'], 'info.log')
  info_log_handler = RotatingFileHandler(
    info_log, maxBytes=100000, backupCount=10)
  info_log_handler.setLevel(logging.INFO)
  info_log_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]')
  )
  app.logger.addHandler(info_log_handler)

  mail_handler = SMTPHandler(
    app.config['MAIL_SERVER'],
    app.config['MAIL_USERNAME'],
    app.config['ADMINS'],
    'O_ops... %s failed!' % app.config['PROJECT'],
    (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
  )
  mail_handler.setLevel(logging.ERROR)
  mail_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]')
  )
  app.logger.addHandler(mail_handler)


def configure_error_handlers(app):
  @app.errorhandler(403)
  def forbidden_page(error):
    return render_template('errors/forbidden_page.html'), 403

  @app.errorhandler(404)
  def page_not_found(error):
    return render_template('errors/page_not_found.html'), 404

  @app.errorhandler(500)
  def server_error_page(error):
    current_app.logger.exception(error)
    return render_template('errors/server_error.html'), 500
