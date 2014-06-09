module.exports = App.VariantRoute = Ember.Route.extend
  model: (params) ->
    return App.Variant.find(params.variant_id)

  redirect: ->
    # Reset the activity input when switching variant
    variant = @controllerFor 'variant'
    if variant.get('content')
      variant.setProperties
        activityContent: null
        logActivityContent: null
