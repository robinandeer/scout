App.IndexRoute = Ember.Route.extend
  queryParams:
    institute:
      refreshModel: yes

  model: (params) ->
    return App.Family.find(params)
