module.exports = App.FamiliesController = Ember.ArrayController.extend
  # Objective: handle a list of families
  needs: ['institute']
  sortProperties: ['updateDateRaw']
  sortAscending: no

  instituteIdBinding: 'controllers.institute.id'
  searchText: undefined

  actions:
    hideFamily: (family) ->
      # Add variant to the list of hidden elements (localStorage)
      family.get('model').hide()

    goToFamily: ->
      familyId = @get('searchText')
      @transitionToRoute 'family', App.Family.find(familyId)

  model: (->
    return App.Family.find({institute: @get('instituteId')})
  ).property 'instituteId'
