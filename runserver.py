#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scout import app
from scout.settings import DEBUG
from scout.core import ctx


if __name__ == '__main__':

  if DEBUG:
    # Run in development mode
    app.run('0.0.0.0', port=8081)

  else:
    # Run in production mode
    app.run('0.0.0.0', port=8081, ssl_context=ctx)
