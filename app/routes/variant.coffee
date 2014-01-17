App.VariantRoute = Ember.Route.extend
  model: (params) ->
    return App.Variant.find(params.variant_id)
