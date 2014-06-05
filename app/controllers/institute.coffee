module.exports = App.InstituteController = Ember.ObjectController.extend
  # Objective: handle a single institute object
  needs: ['application']

  currentPathBinding: 'controllers.application.currentPath'

  actions:
    hideFamily: (menuItem) ->
      menuItem.get('model').hide()

  openFamilies: (->
    @get('content').filterProperty('status', 'open')
  ).property 'content'

  # Route checker
  familyIsLoaded: (->
    if @get('currentPath')
      if @get('currentPath').match(/family/)
        return yes
      else
        return no
    else
      # Switching betweeen families
      return yes
  ).property('currentPath')
