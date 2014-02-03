App.IndexRoute = Ember.Route.extend
  model: ->
    return App.Family.find()
