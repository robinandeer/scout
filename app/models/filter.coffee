App.Filter = Ember.Model.extend
  id: attr()
  database: attr()
  groups: attr()

Ember.FilterAdapter = Ember.Object.extend
  host: 'https://localhost:5000/api/v1'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/families/#{id}/filter").then (data) ->
      groups = Ember.A()
      for group in ['functional_annotations', 'gene_annotations', 'inheritence_models']

        keys = Ember.A()
        for anno in data[group]
          for key, _ of anno
            keys.pushObject(Em.Object.create 
              id: "#{group}_#{key}"
              isActive: no
              name: key
            )

        if group is 'inheritence_models'
          groupName = 'Inheritance models'
        else if group is 'functional_annotations'
          groupName = 'Functional annotations'
        else
          groupName = 'Gene annotations'

        groups.pushObject Ember.Object.create
          id: group
          name: groupName
          keys: keys

      newData = {
        id: data.id
        database: data.database
        groups: groups
      }

      record.load(id, newData)

App.Filter.adapter = Ember.FilterAdapter.create()
