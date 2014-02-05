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
        family: @get('family.id')
        userComment: comment.body
        logColumn: comment.type
        positionInColumn: comment.tag
        email: @get('user.email')

      newComment.save()

    deleteComment: (commentModel) ->
      # Delete the record from the server
      commentModel.destroy()
      commentModel.deleteRecord()

  comments: (->
    return App.FamilyComment.find({ record_id: @get("family.id") })
  ).property 'family.id'

  diagnosticComments: (->
    comments = Em.A()
    if @get('comments.isLoaded')
      @get('comments').forEach (comment) ->
        if comment.get('isDiagnostic')
          comments.pushObject(comment)
    
    return comments
  ).property 'comments.isLoaded', 'comments'

  researchComments: (->
    comments = Em.A()
    if @get('comments.isLoaded')
      @get('comments').forEach (comment) ->
        if comment.get('isResearch')
          comments.pushObject(comment)
    
    return comments
  ).property 'comments.isLoaded', 'comments'

  commentCategories: [
    { label: 'Finding', id: 'finding' },
    { label: 'Action', id: 'action' },
    { label: 'Conclusion', id: 'conclusion' }
  ]
