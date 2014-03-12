App.VariantsRoute = Ember.Route.extend
  model: (params) ->
    familyModel = @modelFor('family')
    family_id = familyModel.get('family_id') or (familyModel.get('id') or familyModel.get('_id'))

    App.Variant.find
      family_id: family_id
      queryParams: params

  activate: ->
    @controllerFor('variants').send('clearFilter')

  actions:
    # Refresh the model after user commits new filters
    filtersWhereUpdated: ->
      @refresh()
