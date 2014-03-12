from datetime import datetime
from mongoengine import *
import json

connect('scout', host='ds029979.mongolab.com', port=29979, username='admin', password='bBHnsxgr')

class Sample(EmbeddedDocument):
  sample_id = StringField(required=True, unique=True)
  father = ReferenceField('self')
  mother = ReferenceField('self')
  sex = StringField()
  phenotype = StringField()
  internal_id = StringField(unique=True)
  tissue_origin = StringField()
  isolation_kit = StringField()
  isolation_date = DateTimeField()
  isolation_personnel = StringField()
  physician = StringField()
  inheritance_models = ListField()
  phenotype_terms = ListField()
  seq_id = StringField()
  sequencing_provider_id = StringField(unique=True)
  capture_kit = StringField()
  capture_date = DateTimeField()
  capture_personnel = StringField()
  clustering_date = DateTimeField()
  sequencing_kit = StringField()
  clinical_db = StringField()


class Pedigree(Document):
  family_id = StringField(unique=True)
  update_date = DateTimeField()
  samples = ListField(EmbeddedDocumentField(Sample))
  databases = ListField()

data = json.load(open('/Users/robinandeer/Desktop/current_families.json', 'r'))

families = []
for family in data:
  family['family_id'] = family['id']
  family['update_date'] = datetime(*[int(part) for part in family['update_date'].split('-')])
  if family['database']:
    family['databases'] = family['database'].split(',')

  del family['database']
  del family['id']

  pedigree = Pedigree(**family)
  members = []
  for member in family['samples']:
    member['internal_id'] = member['cmmsid']
    member['physician'] = member['medical_doctor']
    member['sample_id'] = member['idn']
    if member['inheritance_model']:
      member['inheritance_models'] = eval(member['inheritance_model'])
    else:
      member['inheritance_models'] = []
    member['seq_id'] = member['cmms_seqid']
    member['sequencing_provider_id'] = member['scilifeid']
    member['phenotype_terms'] = member['phenotype_terms'] or []

    for field in ['capture_date', 'clustering_date', 'isolation_date']:
      if member[field]:
        member[field] = datetime(*[int(part) for part in member[field].split('-')])
      else:
        member[field] = None

    del member['cmmsid']
    del member['medical_doctor']
    del member['idn']
    del member['inheritance_model']
    del member['cmms_seqid']

    members.append(Sample(**member))

  pedigree.samples = members
  families.append(pedigree)
  pedigree.save()
