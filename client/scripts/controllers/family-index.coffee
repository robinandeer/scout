App.FamilyIndexController = Ember.ObjectController.extend
  needs: ['application']
  queryParams: ['database']

  database: 'research'

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
      newComment = App.FamilyComment.create
        context: 'family'
        parentId: @get('id')
        email: @get('user.email')
        body: comment.body
        category: comment.type
        type: comment.tag
        createdAt: moment()

      newComment.save().then((newObject) =>
        @get('comments').pushObject(newObject)
      )

    deleteComment: (commentModel) ->
      # Delete the record from the server
      commentModel.destroy()
      commentModel.deleteRecord()

  comments: (->
    return App.FamilyComment.find
      context: 'family'
      parent_id: @get('id')
      database: @get('database')
  ).property 'id', 'database'

  groupedComments: (->
    groups =
      finding: []
      action: []
      conclusion: []

    @get('comments').forEach (comment) ->
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

  ).property 'comments.isLoaded'

  commentCategories: [
    { label: 'Finding', id: 'finding' },
    { label: 'Action', id: 'action' },
    { label: 'Conclusion', id: 'conclusion' }
  ]
