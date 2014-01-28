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
