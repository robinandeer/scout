module.exports = Ember.FilterAdapter = Ember.Adapter.extend
  host: '/api/v1'

  find: (record, id) ->
    parts = id.split(',')
    familyId = parts[0]
    institute = parts[1]

    url = "#{@get('host')}/families/#{familyId}/filter?institute=#{institute}"
    $.getJSON(url).then (data) ->

      if id
        # I don't want lists of hashes
        for type in ['functional_annotations', 'gene_annotations',
                     'inheritence_models']
          filters = []
          for filter in data[type]
            filters.push("#{type}_#{filter}")

          data[type] = filters

      record.load(id, data)
