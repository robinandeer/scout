App.IssueController = Ember.ArrayController.extend
  isWritingMessage: yes
  isConfirmingIssue: no

  init: ->
    @set 'newIssue', App.Issue.create()

  actions:
    confirmIssue: ->
      @set 'isConfirmingIssue', yes

    createIssue: ->
      @set 'isConfirmingIssue', no

      @get('newIssue').save().then (newObject) =>
        @set 'newIssue', newObject
        @get('model').pushObject(newObject)

    reset: ->
      @set 'isWritingMessage', yes
      @set 'isConfirmingIssue', no
      @set 'newIssue', App.Issue.create()
