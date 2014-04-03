#!/usr/bin/env python
# -*- coding: utf-8 -*-
from bson import ObjectId
from datetime import datetime
from flask import Response
import json


# +--------------------------------------------------------------------+
# | JSON related
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


# +--------------------------------------------------------------------+
# | Conditional decorators
# +--------------------------------------------------------------------+
def conditionally(decorator, condition):
  def resdec(f):
    if not condition:
      # A failing condition returns the original function
      return f

    # ... else the decorated function
    return decorator(f)
  return resdec
