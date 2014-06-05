module.exports = App.FamiliesRoute = Ember.Route.extend
  model: (params) ->
    return App.Family.find({institute: params.institute_id})
