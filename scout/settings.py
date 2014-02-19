#!/usr/bin/env python
# -*- coding: utf-8 -*-
from secrets import gmail_keys, mongo_auth, SECRET_KEY, google_keys

# Enable debug mode
DEBUG = True

# One of the Redirect URIs from Google APIs console
REDIRECT_URI = '/authorized'

# Setup Flask Mail (using Gmail)
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USERNAME = gmail_keys.username
MAIL_PASSWORD = gmail_keys.password

# MongoDB/MongoEngine
MONGODB_SETTINGS = {
  'USERNAME': mongo_auth.username,
  'PASSWORD': mongo_auth.password,
  'HOST': mongo_auth.host,
  'PORT': mongo_auth.port,
  'DB': mongo_auth.db,
}

# Google OAuth
GOOGLE_ID = google_keys.client_id
GOOGLE_SECRET = google_keys.client_secret
