App.IndexController = Ember.ArrayController.extend
  sortProperties: ['familyId']
  sortAscending: no

  actions:
    hideFamily: (family) ->
      # Add variant to the list of hidden elements (localStorage)
      family.hide()

  recentComments: (->
    return App.Comment.find()
  ).property()
