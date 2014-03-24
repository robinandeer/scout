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
  # Context describes in what context the comment was written
  # E.g. 'blog post' or 'article'
  context = db.StringField()

  # The context Id provides a specific end point within the context
  # to asscociate the comment with a unique record or set of records.
  context_id = db.StringField(required=True)

  # User is a pointer to the user, responsible for the actual comment
  user = db.ReferenceField(User)
  # ... as is email (for conveniance)
  email = db.EmailField(required=True)

  # Ecosystem can be used to restrict access to a subset of users
  ecosystem = db.StringField()

  # Body is the content of the comment which could be stored in e.g.
  # markdown.
  body = db.StringField()

  # The created at date records at what point in time the comment was
  # initially created
  created_at = db.DateTimeField(default=datetime.now())
  # And the update date describes the last time the comment was edited
  updated_at = db.DateTimeField(default=datetime.now())

  # Tags can be used to list multiple properties to associate the
  # comment with.
  tags = db.ListField(db.StringField(), default=list)

  # Category allows for a less fine grain filtering compared to tags for
  # grouping comments into discrete groups (non-overlapping)
  category = db.StringField()

  # Priority can be used to prioritize/rank comments based on some factor
  priority = db.IntField()


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
