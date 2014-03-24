App.IndexController = Ember.ArrayController.extend
  needs: ['application']
  sortProperties: ['familyId']
  sortAscending: no

  queryParams: ['institute']
  instituteBinding: 'controllers.application.institute'

  instituteObserver: (->
    if @get 'institute'
      @get('target').send 'instanceWasUpdated'
  ).observes 'institute'

  actions:
    hideFamily: (family) ->
      # Add variant to the list of hidden elements (localStorage)
      family.hide()

  recentComments: (->
    return App.Comment.find({ ecosystem: @get('institute') })
  ).property 'institute'
