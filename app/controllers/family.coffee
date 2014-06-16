module.exports = App.FamilyController = Ember.ObjectController.extend
  needs: ['application', 'institute']

  userBinding: 'controllers.application.model'
  instituteIdBinding: 'controllers.institute.id'

  queryParams: ['selectedClinicalActivityType', 'selectedResearchActivityType']

  actions:
    postClinicalActivity: ->
      activity = App.Activity.create
        activityId: 'comment'
        context: 'family'
        contextId: @get 'id'
        ecosystem: @get 'instituteId'
        userId: @get 'user._id'
        caption: "#{@get('user.firstName')} commented on <a class='activity-caption-link' href='/#{window.location.hash}'>case #{@get('id')}</a>"
        content: @get 'clinicalActivityContent'
        category: 'clinical'
        tags: [@get('selectedClinicalTag')]

      activity.save().then((newObject) =>
        @get('clinicalActivities').insertAt(0, newObject)
      )

    deleteActivity: (category, activity) ->
      if @isOwner activity.get('userId')
        # Delete the record from the server
        @get("#{category}Activities").removeObject(activity)
        activity.deleteRecord()
      else
        alert("You can't delete #{activity.get('user.givenName')}'s comment.")

    postResearchActivity: ->
      activity = App.Activity.create
        activityId: 'comment'
        context: 'family'
        contextId: @get 'id'
        ecosystem: @get 'instituteId'
        userId: @get 'user._id'
        caption: "#{@get('user.firstName')} commented on <a class='activity-caption-link' href='/#{window.location.hash}'>case #{@get('id')}</a>"
        content: @get 'researchActivityContent'
        category: 'research'
        tags: [@get('selectedResearchTag')]

      activity.save().then((newObject) =>
        @get('researchActivities').insertAt(0, newObject)
      )

  isOwner: (commentUserId) ->
    # Matches a given user id against user currently logged in
    return commentUserId is @get('user._id')

  activityTypes: ['finding', 'action', 'conclusion']
  selectedClinicalActivityType: undefined
  selectedResearchActivityType: undefined
  clinicalActivityContent: null
  researchActivityContent: null
  selectedClinicalTag: 'finding'
  selectedResearchTag: 'finding'

  clinicalActivities: (->
    queryParams =
      context: 'family'
      context_id: @get('id')
      category: 'clinical'
      ecosystem: @get('instituteId')

    return App.Activity.find queryParams
  ).property 'id', 'instituteId'

  selectedClinicalActivities: (->
    # Optionally filter the activities by type
    activities = @get 'clinicalActivities'
    activityType = @get('selectedClinicalActivityType')
    if activityType and activityType isnt 'undefined'
      return activities.filterProperty 'firstTag', activityType

    return activities
  ).property 'clinicalActivities.@each', 'selectedClinicalActivityType'

  researchActivities: (->
    queryParams =
      context: 'family'
      context_id: @get('id')
      category: 'research'
      ecosystem: @get('instituteId')

    return App.Activity.find queryParams
  ).property 'id', 'instituteId'

  selectedResearchActivities: (->
    # Optionally filter the activities by type
    activities = @get 'researchActivities'
    activityType = @get('selectedResearchActivityType')
    if activityType and activityType isnt 'undefined'
      return activities.filterProperty 'firstTag', activityType

    return activities
  ).property 'researchActivities.@each', 'selectedResearchActivityType'
