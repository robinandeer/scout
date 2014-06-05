module.exports = App.InstituteRoute = Ember.Route.extend
  model: (params) ->
    return { id: params.institute_id }

  renderTemplate: ->
    @render 'institute'

    @render 'families',
      into: 'institute'
      outlet: 'second-panel'
