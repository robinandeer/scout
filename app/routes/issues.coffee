module.exports = App.IssuesRoute = Ember.Route.extend
  model: ->
    return App.Issue.find()
