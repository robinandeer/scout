module.exports = App.ApplicationRoute = Ember.Route.extend
  model: (params) ->
    return App.User.find('current')
