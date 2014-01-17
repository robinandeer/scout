App.FamiliesRoute = Ember.Route.extend
  model: ->
    return App.Family.find()
