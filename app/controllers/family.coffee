App.FamilyController = Ember.ObjectController.extend
  needs: ["application"]

  currentPathBinding: "controllers.application.currentPath"

  changeFamily: (->
    App.family = @get('id')
  ).observes('id')

  filter: (->
    return App.Filter.find @get('id')
  ).property 'id'
