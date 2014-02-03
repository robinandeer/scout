App.FamilyRoute = Ember.Route.extend
  model: (params) ->
    return App.Family.find(params.family_id)
