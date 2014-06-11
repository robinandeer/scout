module.exports = App.SettingsController = Ember.Controller.extend
  actions:
    resetHidden: (klass) ->
      # We never hold on to all variants, so for this to take
      # effect we will require a reload.
      Ember.ls.deleteAll(klass)

    resetItem: (klass, item_id) ->
      Ember.ls.delete klass, item_id

      return no

  hiddenFamiles: (->
    return Ember.ls.findAll 'family'
  ).property 'Ember.ls.length'

  hiddenVariants: (->
    return Ember.ls.findAll 'variant'
  ).property 'Ember.ls.length'
