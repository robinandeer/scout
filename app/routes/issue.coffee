App.IssueRoute = Ember.Route.extend
  model: ->
    return App.Issue.find()
