module.exports = App.ActivityFormComponent = Ember.Component.extend
  classNames: ['a-activity__form__wrapper']

  userId: null
  content: null

  # User Id for currently logged in user to compare with 'userId'
  currentUserId: null
  # ... used to toggle edit/delete permissions
  userHasFullAccess: (->
    return ((@get('userId') or -1) is @get('currentUserId'))
  ).property 'userId', 'currentUserId'

  # Used when editing an activity
  writePrompt: 'Write comment here...'
  submitPrompt: 'Submit'
  isEditing: no

  hasTags: (->
    # Check whether to show the 'Tag comment' select box
    return @get('tags.length') > 0
  ).property 'tags'

  isFailingObserver: (->
    if @get('isFailing')
      # Store the original prompt
      @set 'writePromptBackup', @get('writePrompt')
      # Change the prompt
      @set 'writePrompt', 'You need to write something here...'
    else
      # Reset the default
      if @get('writePromptBackup')
        @set 'writePrompt', @get('writePromptBackup')
  ).observes 'isFailing'

  # Clear the comment fields
  clear: ->
    @set 'content', null
    @set 'isFailing', no

  actions:
    # Cancel editing
    cancel: ->
      # Revert to old content
      @set 'content', @get('contentBackup')

      # Turn off editing
      @set 'isEditing', no

    submit: ->
      if @get('content')
        @sendAction 'onSubmit',
          createdAt: new Date()
          content: @get('content')

        @clear()

      else
        # Show fail message
        @set 'isFailing', yes

    startEditing: ->
      # Store old content/tag to be able to revert
      @set 'contentBackup', @get('content')
      @set 'isEditing', yes

    remove: ->
      @sendAction 'onRemove', @get('activityId')
