module.exports = App.IssuesNewRoute = Ember.Route.extend
  model: ->
    return App.Issue.create()
