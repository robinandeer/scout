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


class Sample(db.EmbeddedDocument):
  sample_id = db.StringField(required=True, unique=True)
  father = db.ReferenceField('self')
  mother = db.ReferenceField('self')
  sex = db.StringField()
  phenotype = db.StringField()
  internal_id = db.StringField(unique=True)
  tissue_origin = db.StringField()
  isolation_kit = db.StringField()
  isolation_date = db.DateTimeField()
  isolation_personnel = db.StringField()
  physician = db.StringField()
  inheritance_models = db.ListField()
  phenotype_terms = db.ListField()
  seq_id = db.StringField()
  sequencing_provider_id = db.StringField(unique=True)
  capture_kit = db.StringField()
  capture_date = db.DateTimeField()
  capture_personnel = db.StringField()
  clustering_date = db.DateTimeField()
  sequencing_kit = db.StringField()
  clinical_db = db.StringField()


class Pedigree(db.Document):
  family_id = db.StringField(unique=True)
  update_date = db.DateTimeField()
  samples = db.ListField(db.EmbeddedDocumentField(Sample))
