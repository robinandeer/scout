#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scout import app
from scout.settings import DEBUG


if __name__ == '__main__':

  if DEBUG:
    # Run in development mode
    app.run('localhost', port=5000)

  else:
    # Run in production mode
    app.run('0.0.0.0', port=8081, ssl_context=ctx)