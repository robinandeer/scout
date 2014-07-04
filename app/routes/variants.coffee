module.exports = App.VariantsRoute = Ember.Route.extend
  beforeModel: (transition) ->
    variantsController = @controllerFor('variants')

    newFamilyId = transition.params.variants.family_id
    if (variantsController.get('familyId') or newFamilyId) isnt newFamilyId
      # Reset filter when switching families
      variantsController.send('doClearFilters')

  model: (params) ->
    # Make available to setupController
    @set 'params', params

    variantsController = @controllerFor('variants')
    newFamilyId = params.family_id
    if (variantsController.get('familyId') or newFamilyId) isnt newFamilyId
      queryParams = {}
    else
      # Remove unwanted params before model fetch
      queryParams = jQuery.extend {}, params

    $.extend queryParams,
      institute_id: params.institute_id
      institute: params.institute_id
      family_id: null
      database: params.database_id
      database_id: null

    variantsController.set 'latestQueryParams', queryParams

    App.Variant.find
      family_id: params.family_id
      queryParams: queryParams


  setupController: (controller, model) ->
    # Keep default behavior
    @_super controller, model

    # Make available to controller
    controller.setProperties
      instituteId: @get 'params.institute_id'
      familyId: @get 'params.family_id'
      database: @get 'params.database_id'


  actions:
    # Refresh the model after user commits new filters
    filtersWhereUpdated: ->
      @refresh()
