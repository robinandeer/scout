module.exports = App.VariantsRoute = Ember.Route.extend
  model: (params) ->
    # Make available to setupController
    @set 'params', params

    # Remove unwanted params before model fetch
    queryParams = jQuery.extend {}, params
    $.extend queryParams,
      institute_id: params.institute_id
      institute: params.institute_id
      family_id: null
      database: params.database_id
      database_id: null

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

  # activate: ->
  #   @controllerFor('variants').send('doClearFilters')
