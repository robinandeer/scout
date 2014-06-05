#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask.ext.script import Manager

from server import create_app

app = create_app()
manager = Manager(app)


@manager.command
@manager.option('-h', '--host')
@manager.option('-p', '--port')
def run(host='localhost', port=None):
  """Run in local machine."""

  # Use command line, config definition or 5000 (default)
  port = port or int(app.config.get('PORT', 5000))

  app.run(host=host, port=port, debug=app.config.get('DEBUG'))


@manager.command
def initdb():
  """Init/reset database."""
  pass


manager.add_option(
  '-c', '--config', dest='config', required=False, help='config file')

if __name__ == '__main__':
  manager.run()
