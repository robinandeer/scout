#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scout.core import db
from datetime import datetime


class User(db.Document):
  given_name = db.StringField()
  family_name = db.StringField()
  name = db.StringField()
  locale = db.StringField()
  email = db.EmailField(required=True, unique=True)
  created_at = db.DateTimeField(default=datetime.now())
  logged_in_at = db.DateTimeField(default=datetime.now())
  google_id = db.StringField()
  name = db.StringField()
  institutes = db.ListField()
  access_token = db.StringField()

  def is_active(self):
    return True

  def is_authenticated(self):
    return True

  def is_anonymous(self):
    return False

  def get_id(self):
    try:
      return str(self.id)
    except AttributeError:
      raise NotImplementedError('No `id` attribute - override `get_id`')


class Comment(db.Document):
  user = db.ReferenceField(User)
  email = db.StringField(required=True)
  # 'variantid' or 'family'
  parent_id = db.StringField(required=True)
  body = db.StringField()
  created_at = db.DateTimeField(default=datetime.now())
  # 'column' or 'rating'
  category = db.StringField()
  # 'position_in_column'
  type = db.StringField()
  # 'family' or 'variant'
  context = db.StringField()


class Process(db.EmbeddedDocument):
  """Single lab process step (isolation, sequencing, capture)
  """
  key = db.StringField(required=True)
  kit = db.StringField()
  date = db.DateTimeField()
  personnel = db.StringField()
  process_id = db.StringField(unique=True)
  provider_id = db.StringField(unique=True)


class Sample(db.Document):
  sample_id = db.StringField(required=True, unique=True)
  internal_id = db.StringField(unique=True)
  sex = db.StringField()
  father = db.ReferenceField('self')
  mother = db.ReferenceField('self')
  physicians = db.ListField(db.StringField(), default=list)
  clinical_db = db.StringField()
  inheritance_models = db.ListField(db.StringField(), default=list)
  phenotype = db.StringField()
  phenotype_terms = db.ListField(db.StringField(), default=list)

  tissue_origin = db.StringField()
  isolation = db.ListField(db.EmbeddedDocumentField(Process), default=list)
  capture = db.ListField(db.EmbeddedDocumentField(Process), default=list)
  clustering = db.ListField(db.EmbeddedDocumentField(Process), default=list)
  sequencing = db.ListField(db.EmbeddedDocumentField(Process), default=list)


class Pedigree(db.Document):
  family_id = db.StringField(unique=True)
  update_date = db.DateTimeField()
  samples = db.ListField(db.ReferenceField(Sample), default=list)
  database = db.StringField()
