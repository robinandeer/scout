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
        content: @get 'researchActivityContent'
        category: 'clinical'
        tags: [@get('selectedClinicalTag')]

      activity.save().then((newObject) =>
        @get('clinicalActivities').pushObject(newObject)
      )

    deleteActivity: (category, activity) ->
      # Delete the record from the server
      @get("#{category}Activities").removeObject(activity)
      activity.deleteRecord()

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
        @get('researchActivities').pushObject(newObject)
      )

  activityTypes: ['finding', 'action', 'conclusion']
  selectedClinicalActivityType: null
  selectedResearchActivityType: null
  clinicalActivityContent: null
  researchActivityContent: null
  selectedClinicalTag: 'finding'
  selectedResearchTag: 'finding'

  clinicalActivities: (->
    return App.Activity.find
      context: 'family'
      context_id: @get('id')
      category: 'clinical'
      ecosystem: @get('instituteId')
  ).property 'id', 'instituteId'

  selectedClinicalActivities: (->
    # Optionally filter the activities by type
    activities = @get 'clinicalActivities'
    activityType = @get('selectedClinicalActivityType')
    if activityType
      return activities.filterProperty 'firstTag', activityType

    return activities
  ).property 'clinicalActivities.@each', 'selectedClinicalActivityType'

  researchActivities: (->
    return App.Activity.find
      context: 'family'
      context_id: @get('id')
      category: 'research'
      ecosystem: @get('instituteId')
  ).property 'id', 'instituteId'

  selectedClinicalActivities: (->
    # Optionally filter the activities by type
    activities = @get 'researchActivities'
    activityType = @get('selectedResearchActivityType')
    if activityType
      return activities.filterProperty 'firstTag', activityType

    return activities
  ).property 'researchActivities.@each', 'selectedResearchActivityType'
