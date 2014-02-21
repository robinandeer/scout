App.VariantsRoute = Ember.Route.extend
  model: (params) ->
    family_id = @modelFor('family').get('id')

    App.Variant.find
      family_id: family_id
      queryParams: params

  actions:
    # Refresh the model after user commits new filters
    filtersWhereUpdated: ->
      @refresh()
