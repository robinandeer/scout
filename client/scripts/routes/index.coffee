App.IndexRoute = Ember.Route.extend
  model: (params) ->
    return App.Family.find(params)

  actions:
    # Refresh the model after user commits new filters
    instanceWasUpdated: ->
      @refresh()
