App.Filter = Ember.Model.extend
  id: attr()
  clinical_db_gene_annotation: attr()
  functional_annotations: attr()
  gene_annotations: attr()
  inheritence_models: attr()

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

Ember.FilterAdapter = Ember.Object.extend
  host: 'http://localhost:8081/api/v1'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/families/#{id}/filter").then (data) ->

      if id
        # I don't want lists of hashes
        for type in ['functional_annotations', 'gene_annotations',
                     'inheritence_models']
          filters = []
          for filter in data[type]
            filters.push("#{type}_#{filter}")

          data[type] = filters

      record.load(id, data)

App.Filter.adapter = Ember.FilterAdapter.create()
