App.OrderModalController = Ember.ObjectController.extend
  actions:
    close: ->
      return @send('closeOrderModal')
