App.VariantsRoute = Ember.Route.extend
  model: (params) ->
    family_id = @modelFor('family').get('id')
    database = @controllerFor('variants').get('database') or 'IEM'

    App.Variant.find
      family_id: family_id
      queryParams:
        database: database

  actions:
    # Refresh the model after user commits new filters
    filtersWhereUpdated: ->
      @refresh()
