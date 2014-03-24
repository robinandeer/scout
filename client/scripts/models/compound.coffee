App.Compound = Ember.Model.extend
  variant: Em.attr()
  idn: Em.attr()
  samples: (->
    return (@get('idn') or '').split(',')
  ).property 'idn'
  gt: Em.attr()
  gtcalls: (->
    return (@get('gt') or '').split(',')
  ).property 'gt'
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
App.Compound.url = 'http://localhost:8081/api/v1/compounds'
App.Compound.adapter = Ember.NewRESTAdapter.create()
