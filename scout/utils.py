#!/usr/bin/env python
# -*- coding: utf-8 -*-
import arrow
from bson import ObjectId
from datetime import datetime
from flask import Response
import json


# +--------------------------------------------------------------------+
# |  JSON related
# +--------------------------------------------------------------------+
class MongoDocumentEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, datetime):
      # Return a string like "2 hours ago"
      return arrow.get(o).format('YYYY-MM-DD HH:mm:ss ZZ')

    elif isinstance(o, ObjectId):
      return str(o)

    return json.JSONEncoder(self, o)


def jsonify_mongo(*args, **kwargs):
  payload = json.dumps(dict(*args, **kwargs), cls=MongoDocumentEncoder,
                       separators=(',', ':'), ensure_ascii=False)

  return Response(payload, mimetype='application/json; charset=utf-8')
