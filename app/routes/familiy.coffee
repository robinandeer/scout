module.exports = App.FamilyRoute = Ember.Route.extend
  model: (params) ->
    return App.Family.find(params.family_id)

  redirect: ->
    family = @controllerFor 'family'
    if family.get('content')
      family.setProperties
        clinicalActivityContent: null
        researchActivityContent: null
