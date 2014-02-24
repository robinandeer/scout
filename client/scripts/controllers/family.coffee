App.FamilyController = Ember.ObjectController.extend
  needs: ['application']
  currentPathBinding: 'controllers.application.currentPath'
  userBinding: 'controllers.application.user'

  changeFamily: (->
    App.family = @get('id')
  ).observes('id')

  filter: (->
    return App.Filter.find @get('id')
  ).property 'id'

  # +------------------------------------------------------------------+
  # |  Route checker
  # +------------------------------------------------------------------+
  variantsLoaded: (->
    if @get('currentPath').match(/variants/)
      return yes
    else
      return no
  ).property 'currentPath'
