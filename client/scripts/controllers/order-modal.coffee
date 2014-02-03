App.OrderModalController = Ember.ObjectController.extend
  actions:
    close: ->
      return @send 'closeOrderModal'

    sendForm: ->
      return @send 'sendOrderForm', @get('model')
