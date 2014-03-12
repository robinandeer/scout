App.OrderModalController = Ember.ObjectController.extend
  classNameBindings: ['wasSent']

  actions:
    close: ->
      return @send 'closeOrderModal'

    sendForm: ->
      return @send 'sendOrderForm', @get('model')
