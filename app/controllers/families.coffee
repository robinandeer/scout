module.exports = App.FamiliesController = Ember.ArrayController.extend
  # Objective: handle a list of families
  needs: ['institute']
  sortProperties: ['familyId']
  sortAscending: no

  instituteIdBinding: 'controllers.institute.id'

  model: (->
    App.Family.find({institute: @get('instituteId')})
  ).property('instituteId')
