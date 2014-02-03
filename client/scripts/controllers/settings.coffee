App.SettingsController = Ember.Controller.extend
  needs: ['application', 'index']

  # Bind to the current user object
  userBinding: 'controllers.application.user'

  actions:
    resetHidden: (klass) ->
      # We never hold on to all variants, so for this to take
      # effect we will require a reload.
      Ember.ls.deleteAll(klass)
