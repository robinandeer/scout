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
      payload = orderModel.getProperties('family_id', 'hgnc_symbol', 'chr_pos'
        'database', 'amino_change', 'gt_call', 'variant_link')

      $.post 'http://localhost:5000/sanger', payload, (data) ->
        @send 'closeOrderModal'
        console.log data
