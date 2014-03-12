import arrow
import json
from scout.models import Pedigree, Sample, Process
from scout.secrets import mongo_uri
from mongoengine import connect, ValidationError

connect('scout', host=mongo_uri)
json_path = '/Users/robinandeer/Desktop/current_families.json'


def convert_date(raw_date):
  if raw_date:
    return arrow.get(raw_sample[date_id]).datetime
  else:
    return None


def build_process(raw_sample, process_key):
  process = Process(
    key=process_key,
    kit=raw_sample.get('{}_kit'.format(process_key), None),
    date=convert_date(raw_sample.get('{}_date'.format(process_key), None)),
    personnel=raw_sample.get('{}_personnel'.format(process_key), None)
  )

  if process_key == 'sequencing':
    process.provider_id = raw_sample['scilifeid']
    process.process_id = raw_sample['cmms_seqid']

  return process


def build_sample(raw_sample):
  if raw_sample['cmmsid'] == 'Na':
    internal_id = None
  else:
    internal_id = raw_sample['cmmsid']

  if raw_sample['medical_doctor']:
    physicians = raw_sample['medical_doctor'].split('/')
  else:
    physicians = None

  return Sample.objects.get_or_create(
      sample_id=raw_sample['idn'],
      defaults={
        'sample_id': raw_sample['idn'],
        'internal_id': internal_id,
        'sex': raw_sample['sex'],
        'physicians': physicians,
        'clinical_db': raw_sample['clinical_db'],
        'inheritance_models': eval(raw_sample['inheritance_model'] or '[]'),
        'phenotype': raw_sample['phenotype'],
        'phenotype_terms': raw_sample['phenotype_terms'],
        'isolation': [build_process(raw_sample, 'isolation')],
        'capture': [build_process(raw_sample, 'capture')],
        'clustering': [build_process(raw_sample, 'clustering')],
        'sequencing': [build_process(raw_sample, 'sequencing')]
      }
    )


with open(json_path, 'r') as handle:
  dump = json.load(handle)

  pedigrees = []
  samples = []
  failed = []
  for raw_pedigree in dump:
    pedigree, pedigree_was_created = Pedigree.objects.get_or_create(
      family_id=raw_pedigree['id'],
      defaults={
        'family_id': raw_pedigree['id'],
        'update_date': arrow.get(raw_pedigree['update_date']).datetime,
        'database': raw_pedigree['database']
      }
    )

    for raw_sample in raw_pedigree['samples']:
      try:
        sample, sample_was_created = build_sample(raw_sample)

        if sample_was_created:
          sample.save()
        samples.append(sample)

        # Add sample to pedigree
        pedigree.samples.append(sample)

      except ValidationError, e:
        print(e)
        failed.append(raw_sample)

    if pedigree_was_created:
      pedigrees.append(pedigree.save())
