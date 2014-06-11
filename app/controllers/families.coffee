module.exports = App.FamiliesController = Ember.ArrayController.extend
  # Objective: handle a list of families
  needs: ['institute']
  sortProperties: ['updateDateRaw']
  sortAscending: no

  instituteIdBinding: 'controllers.institute.id'

  actions:
    hideFamily: (family) ->
      # Add variant to the list of hidden elements (localStorage)
      family.get('model').hide()

  model: (->
    return App.Family.find({institute: @get('instituteId')})
  ).property 'instituteId'
