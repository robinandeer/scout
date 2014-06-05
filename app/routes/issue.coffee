module.exports = App.IssueRoute = Ember.Route.extend
  model: (params) ->
    return App.Issue.find(params.issue_id)
