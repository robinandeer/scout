# -*- coding: utf-8 -*-
"""
  server.frontend.models
  ~~~~~~~~~~~~~~~~~~~~~~~
  Flask-Login enabled User-model.
"""
from flask.ext.login import UserMixin


class User(dict, UserMixin):
  def __init__(self, **kwargs):
    super(User, self).__init__()
    self.update(kwargs)

  def to_dict(self):
    return self

  def is_active(self):
    return True

  def get_id(self):
    user_id = self.get('_id')

    if user_id is None:
      raise NotImplementedError('No, `id` attribute - override `get_id`')

    return str(user_id)
