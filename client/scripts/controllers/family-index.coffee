App.FamilyIndexController = Ember.Controller.extend
  needs: ['family', 'application']

  userBinding: 'controllers.application.user'
  familyBinding: 'controllers.family'
  hasGeneModels: (->
    return @get('family.samples.1.inheritanceModels.length') > 0
  ).property 'family.samples.1.inheritanceModels'
  isShowingRawPedigree: no

  actions:
    toggleProperty: (target) ->
      @toggleProperty(target)
      return null

    postComment: (comment) ->
      newComment = App.FamilyComment.create
        context: 'family'
        parentId: @get('family.id')
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
      parent_id: @get("family.id")
  ).property 'family.id'

  diagnosticComments: (->
    comments = Em.A()
    if @get('comments.isLoaded')
      @get('comments').forEach (comment) ->
        if comment.get('isDiagnostic')
          comments.pushObject(comment)
    
    return comments
  ).property 'comments.isLoaded', 'comments.length'

  researchComments: (->
    comments = Em.A()
    if @get('comments.isLoaded')
      @get('comments').forEach (comment) ->
        if comment.get('isResearch')
          comments.pushObject(comment)
    
    return comments
  ).property 'comments.isLoaded', 'comments.length'

  commentCategories: [
    { label: 'Finding', id: 'finding' },
    { label: 'Action', id: 'action' },
    { label: 'Conclusion', id: 'conclusion' }
  ]
