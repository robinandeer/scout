App.IndexController = Ember.Controller.extend
  actions:
    hideFamily: (family) ->
      # Add variant to the list of hidden elements (localStorage)
      family.hide()
