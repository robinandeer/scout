App.FamilyIndexController = Ember.ObjectController.extend
  needs: ['application']
  queryParams: ['database']

  userBinding: 'controllers.application.model'
  database: 'IEM'
  instituteBinding: 'controllers.application.institute'

  hasGeneModels: (->
    return @get('samples.1.inheritanceModels.length') > 0
  ).property 'samples.1.inheritanceModels'
  isShowingRawPedigree: no

  filter: (->
    return App.Filter.find @get('id')
  ).property 'id'

  actions:
    toggleProperty: (target) ->
      @toggleProperty(target)
      return null

    postComment: (comment) ->
      newComment = App.Comment.create
        context: 'family'
        contextId: @get('id')
        email: @get('user.email')
        ecosystem: @get('institute')
        body: comment.body
        category: @get('database')
        tags: [comment.type]

      newComment.save().then((newObject) =>
        @get('comments').pushObject(newObject)
      )

    editComment: (comment) ->
      @get('comments').removeObject(comment)
      comment.save().then (updatedComment) =>
        @get('comments').pushObject(updatedComment)

    deleteComment: (commentId) ->
      comment = App.Comment.find(commentId)
      # Delete the record from the server
      @get('comments').removeObject(comment)
      comment.deleteRecord()

  comments: (->
    return App.Comment.find
      context: 'family'
      context_id: @get('id')
      category: @get('database')
      ecosystem: @get('institute')
  ).property 'id', 'database', 'institute'

  groupedComments: (->
    groups =
      finding: []
      action: []
      conclusion: []

    @get('comments').forEach (comment) ->
      if comment.get('tags')
        groups[comment.get('tags')[0]].push(comment)

    return [
      id: 'Findings'
      comments: groups.finding
    ,
      id: 'Actions'
      comments: groups.action
    ,
      id: 'Conclusions'
      comments: groups.conclusion
    ]

  ).property 'comments.isLoaded', 'comments.length'

  commentCategories: [
    { label: 'Finding', id: 'finding' },
    { label: 'Action', id: 'action' },
    { label: 'Conclusion', id: 'conclusion' }
  ]
