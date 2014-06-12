#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask.ext.script import Manager, Server

from server import create_app
from server.extensions import ctx

manager = Manager(create_app)


class SecureServer(Server):
  """Enables conditional setup of SSL context during the ``app.run()``
  execution depending on DEBUG mode."""
  def __call__(self, app, *args, **kwargs):

    if not app.config.get('SSL_MODE'):
      # Remove SSL context
      del self.server_options['ssl_context']

    # Run the original ``__call__`` function
    super(SecureServer, self).__call__(app, *args, **kwargs)

manager.add_command('serve', SecureServer(ssl_context=ctx))

manager.add_option(
  '-c', '--config', dest='config', required=False, help='config file')

if __name__ == '__main__':
  manager.run()
