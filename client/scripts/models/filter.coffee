App.Filter = Ember.Model.extend
  id: attr()
  database: attr()
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

  databases: (->
    if @get('database')
      dbs = @get('database').split(',')
    else
      dbs = []

    dbs.push('research')
    return dbs
  ).property 'database'

Ember.FilterAdapter = Ember.Object.extend
  host: 'http://localhost:8081/api/v1'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/families/#{id}/filter").then (data) ->

      if id
        # I don't want lists of hashes
        for group in ['functional_annotations', 'gene_annotations',
                      'inheritence_models']
          keys = []
          for filter in data[group]
            for key, value of filter
              keys.push("#{group}_#{key}")

          data[group] = keys

      record.load(id, data)

App.Filter.adapter = Ember.FilterAdapter.create()
