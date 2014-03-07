App.CommentBoxComponent = Ember.Component.extend
  classNames: ['comment-box__wrapper']
  # Username for curretly logged in user to compare with 'username'
  currentUsername: null
  username: null
  # Used to determine edit/delete permissions
  hasFullAccess: (->
    return @get('username') is @get('currentUsername')
  ).property 'username', 'currentUsername'

  isConfirming: no
  comment: {}

  # Used when editing a comment
  commentId: null
  bodyPrompt: 'Write your words here...'
  submitPrompt: 'Submit'
  date: null

  # This can be used to distingish between multiple comments
  # on the same controller.
  type: null

  tag: null
  tags: []
  # Check whether to show the 'Tag comment' select box
  hasTags: (->
    return @get('tags.length') > 0
  ).property 'tags'

  isWriteMode: no
  isZenMode: no
  isEditing: no

  actions:
    # Clear the comment fields
    clear: ->
      @setProperties
        body: null
        tag: null

    # Cancel editing
    cancel: ->
      # Revert to old content
      @set 'tag', @get('tagBackup')
      @set 'body', @get('bodyBackup')

      # Turn off editing + write mode
      @set 'isEditing', no
      @set 'isWriteMode', no

    submit: ->
      if @get('isEditing')
        @sendAction 'edit', @get('comment')
      else
        @sendAction 'submit', @get('comment')

      @sendAction 'clear'

    startEditing: ->
      # Store old body/tag to be able to revert
      @set 'tagBackup', @get('tag')
      @set 'bodyBackup', @get('body')
      @set 'isWriteMode', yes
      @set 'isEditing', yes

    remove: ->
      @sendAction 'remove', @get('commentId')
