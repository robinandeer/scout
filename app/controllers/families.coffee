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

  searchText: undefined
  filteredModel: (->
    model = @get('model')
    searchText = @get('searchText')
    if searchText
      return model.filter (item, index, self) ->
        return item.get('id').toString().startsWith(searchText)
    else
      return model
  ).property 'model.@each.id', 'searchText'
