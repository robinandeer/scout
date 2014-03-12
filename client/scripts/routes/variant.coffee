App.VariantRoute = Ember.Route.extend
  model: (params) ->
    return App.Variant.find(params.variant_id)

  actions:
    openOrderModal: (model) ->
      @controllerFor('order-modal').set 'model', model
      return @render 'order-modal',
        into: 'variant'
        outlet: 'modal'

    closeOrderModal: ->
      return @disconnectOutlet
        outlet: 'modal'
        parentView: 'variant'

    sendOrderForm: (orderModel) ->
      orderModel.set 'isSending', yes
      payload = orderModel.getProperties('family_id', 'hgnc_symbol', 'chr_pos'
        'database', 'amino_change', 'gt_call', 'variant_link')

      $.post 'http://localhost:8081/v1/sanger', payload, (data) =>
        orderModel.set 'isSending', no
        orderModel.set 'wasSent', yes
        orderModel.set 'body', data.message
