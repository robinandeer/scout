App.ApplicationRoute = Ember.Route.extend
  model: (params) ->
    return App.User.find('NA')

  actions:
    openModal: (modalName, model) ->
      @controllerFor(modalName).set('model', model)
      @render modalName,
        into: 'application'
        outlet: 'modal'

    closeModal: ->
      @disconnectOutlet
        outlet: 'modal'
        parentView: 'application'
