# -*- coding: utf-8 -*-
from datetime import datetime
import json
import os

from bson import ObjectId
from flask import Response


# Instance folder path, make it independent.
INSTANCE_FOLDER_PATH = os.path.expanduser('~/instance')

HTTP_METHODS = ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
PLURAL_METHODS = ['OPTIONS', 'GET', 'POST']
SINGLE_METHODS = ['OPTIONS', 'GET', 'PUT', 'DELETE']


def get_current_time():
  return datetime.utcnow()


def make_dir(dir_path):
  try:
    if not os.path.exists(dir_path):
      os.mkdir(dir_path)
  except Exception, e:
    raise e


# +--------------------------------------------------------------------+
# | JSON + MongoDB
# +--------------------------------------------------------------------+
class MongoDocumentEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, datetime):
      return str(o)

    elif isinstance(o, ObjectId):
      return str(o)

    return json.JSONEncoder(self, o)


def jsonify_mongo(*args, **kwargs):
  payload = json.dumps(dict(*args, **kwargs), cls=MongoDocumentEncoder,
                       separators=(',', ':'), ensure_ascii=False)

  return Response(payload, mimetype='application/json; charset=utf-8')
