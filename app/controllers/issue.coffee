App.IssueController = Ember.Controller.extend
  isWritingMessage: yes
  hasSentMessage: no
  message: null
  isConfirmingIssue: no

  actions:
    confirmIssue: ->
      @set 'isConfirmingIssue', yes

    createIssue: ->
      @set 'isConfirmingIssue', no

      payload =
        title: @get('issueTitle')
        body: @get('issueBody')

      @set 'isWritingMessage', no

      $.post 'http://localhost:5000/issues/new', payload, (data) =>

        @set 'hasSentMessage', yes
        @set 'message', data

    reset: ->
      @set 'isWritingMessage', yes
      @set 'hasSentMessage', no
      @set 'title', ''
      @set 'body', ''
      @set 'message', null
      @set 'isConfirmingIssue', no
