App.FamilyController = Ember.ObjectController.extend
  needs: ['application']
  currentPathBinding: 'controllers.application.currentPath'
  userBinding: 'controllers.application.model'

  changeFamily: (->
    App.family = @get('id')
  ).observes('id')

  filter: (->
    if @get 'id'
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
