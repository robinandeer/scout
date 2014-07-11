module.exports = App.ListVariantComponent = Ember.Component.extend
  actions:
    hide: ->
      # Add variant to the list of hidden elements (localStorage)
      @get('model').hide()

  compounds: (->
    return App.Compound.find
      variant_id: @get('model.id')
      institute: @get('instituteId')
  ).property 'model.id', 'instituteId'
