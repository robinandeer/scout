module.exports = App.IndexRoute = Ember.Route.extend
  model: ->
    return App.User.find('current')

  afterModel: (user, transition) ->
    user.addObserver 'isLoaded', @, =>
      institutes = @model().get('institutes')
      if institutes.get('length') is 1
        @transitionTo 'institute', institutes[0]
