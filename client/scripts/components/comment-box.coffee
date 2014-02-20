App.CommentBoxComponent = Ember.Component.extend
  classNames: ['comment-box__wrapper', 'family-comment']
  # This can be used to distingish between multiple comments
  # on the same controller.
  type: null
  body: null
  title: 'Comment'

  selectedTag: null
  tagPrompt: 'Tag comment'
  tags: []
  hasTags: (->
    # Check whether to show the 'Tag comment' select box
    return @get('tags.length') > 0
  ).property 'tags'

  actions:
    # Clear the comment fields
    clear: ->
      @setProperties
        body: null
        selectedTag: null

    submit: ->
      @sendAction 'submit',
        type: @get 'type'
        body: @get 'body'
        tag: @get 'selectedTag'

      @setProperties
        body: null
        selectedTag: null
