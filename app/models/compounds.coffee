NewRESTAdapter = require 'adapters/new-rest'
zip = require 'helpers/zip'

App.Compound = Ember.Model.extend
  variant: Em.attr()

  idn: Em.attr()
  samples: (->
    return (@get('idn') or '').split(',')
  ).property 'idn'

  gt: Em.attr()
  gts: (->
    return (@get('gt') or '').split(',')
  ).property 'gt'

  gtcalls: (->
    gtcalls = Em.A()
    for sample_gt in zip(@get('samples'), @get('gts'))
      gtcalls.pushObject Em.Object.create
        sampleId: sample_gt[0]
        genotype: sample_gt[1]

    return gtcalls.sortBy('sampleId')
  ).property 'samples', 'gts'

  rankScore: Em.attr()
  combinedScore: Em.attr()
  functionalAnnotation: Em.attr()
  geneAnnotation: Em.attr({ defaultValue: '' })
  geneAnnotations: (->
    return @get('geneAnnotation').split(';')
  ).property 'geneAnnotation'
  geneModel: Em.attr({ defaultValue: '' })
  geneModels: (->
    return @get('geneModel').split(';')
  ).property 'geneModel'

App.Compound.camelizeKeys = yes
App.Compound.primaryKey = 'variant'
App.Compound.collectionKey = 'compounds'
App.Compound.url = '/api/v1/compounds'
App.Compound.adapter = NewRESTAdapter.create()

module.exports = App.Compound
