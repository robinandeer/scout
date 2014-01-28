App.FamilyIndexController = Ember.Controller.extend
  needs: ["family"]

  familyBinding: "controllers.family"

  actions:
    # Submit the modal
    submit: ->
      console.log 'Successfully submitted modal'

    # Cancel the modal
    cancel: ->
      @toggleProperty('show')

    toggleProperty: (target) ->
      @toggleProperty(target)

  comments: (->
    return App.FamilyComment.find({ family_id: @get("family.id") })
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
