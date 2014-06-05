module.exports = App.IssuesNewController = Ember.ObjectController.extend
  needs: ['application']

  userBinding: 'controllers.application.model'

  isConfirmingSubmit: no

  actions:
    saveIssue: ->
      @set 'isConfirmingSubmit', no
      @get('model').save().then (new_issue) =>
        # Manually push into the stack?
        # Redirect user to the new issue page
        @transitionToRoute 'issue', new_issue
