#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging
from logging.handlers import RotatingFileHandler

from scout import app
from scout.settings import DEBUG
from scout.core import ctx


if __name__ == '__main__':

  if DEBUG:
    # Run in development mode
    app.run('0.0.0.0', port=8081)

  else:
    # Set up logging to a file
    handler = RotatingFileHandler(
      'scout-server.log', maxBytes=1024 * 1024 * 100, backupCount=20)
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.INFO)
    log.addHandler(handler)

    # Run in production mode
    app.run('0.0.0.0', port=8081, ssl_context=ctx)
