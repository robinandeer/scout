App.VariantsRoute = Ember.Route.extend
  model: (params) ->
    family_id = @modelFor('family').get('family_id')

    App.Variant.find
      family_id: family_id
      queryParams: params

  activate: ->
    @controllerFor('variants').send('clearFilter')

  actions:
    # Refresh the model after user commits new filters
    filtersWhereUpdated: ->
      @refresh()
