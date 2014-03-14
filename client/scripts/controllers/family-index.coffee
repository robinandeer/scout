App.FamilyIndexController = Ember.ObjectController.extend
  needs: ['application']
  queryParams: ['database']

  userBinding: 'controllers.application.user'
  database: 'IEM'

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
        parentId: @get('id')
        email: @get('user.email')
        body: comment.body
        category: @get('database')
        type: comment.type
        createdAt: moment()

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
      parent_id: @get('id')
      category: @get('database')
  ).property 'id', 'database'

  groupedComments: (->
    groups =
      finding: []
      action: []
      conclusion: []

    @get('comments').forEach (comment) ->
      if comment.get('type')
        groups[comment.get('type')].push(comment)

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
