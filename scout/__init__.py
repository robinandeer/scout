#!/usr/bin/env python
# -*- coding: utf-8 -*-
#    _____                  __
#   / ___/_________  __  __/ /_
#   \__ \/ ___/ __ \/ / / / __/
#  ___/ / /__/ /_/ / /_/ / /_     by Robin Andeer
# /____/\___/\____/\__,_/\__/
#
from __future__ import print_function, division
from flask import Flask

__version__ = '0.0.1'
__title__ = 'scout'
__author__ = 'Robin Andeer'
__licence__ = 'MIT'
__copyright__ = 'Copyright 2014 Robin Andeer'

app = Flask(__name__, static_url_path='/static')
app.config.from_object('scout.settings')

import scout.core
import scout.models
import scout.views
