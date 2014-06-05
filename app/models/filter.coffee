FilterAdapter = require 'adapters/filter'

App.Filter = Ember.Model.extend
  id: Em.attr()
  clinical_db_gene_annotation: Em.attr()
  functional_annotations: Em.attr()
  gene_annotations: Em.attr()
  inheritence_models: Em.attr()

  groups: [
    id: 'functional_annotations'
    name: 'Functional annotations'
  ,
    id: 'gene_annotations'
    name: 'Gene annotations'
  ,
    id: 'inheritence_models'
    name: 'Inheritence models'
  ]

App.Filter.adapter = FilterAdapter.create()

module.exports = App.Filter
