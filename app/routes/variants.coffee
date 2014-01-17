App.VariantsRoute = Ember.Route.extend
  model: (params, queryParams) ->
    family_id = @modelFor('family').get('id')

    App.Variant.find
      family_id: family_id
      queryParams: queryParams
