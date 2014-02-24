App.CommentBoxComponent = Ember.Component.extend
  classNames: ['comment-box__wrapper']
  # Username for curretly logged in user to compare with 'username'
  currentUsername: null
  username: null
  # Used to determine edit/delete permissions
  hasFullAccess: (->
    return @get('username') is @get('currentUsername')
  ).property 'username', 'currentUsername'

  # Used when editing a comment
  commentId: null
  body: null
  bodyPrompt: 'Write your words here...'
  submitPrompt: 'Submit'
  createdAt: null

  # This can be used to distingish between multiple comments
  # on the same controller.
  type: null

  selectedTag: null
  tagPrompt: 'Tag comment'
  tags: []
  # Check whether to show the 'Tag comment' select box
  hasTags: (->
    return @get('tags.length') > 0
  ).property 'tags'

  isWriteMode: no
  isZenMode: yes

  actions:
    # Clear the comment fields
    clear: ->
      @setProperties
        body: null
        selectedTag: null

    submit: ->
      @sendAction 'submit',
        username: @get 'username'
        type: @get 'type'
        body: @get 'body'
        tag: @get 'selectedTag'

      @send 'clear'
