module.exports = Ember.NewRESTAdapter = Ember.RESTAdapter.extend
  buildURL: (klass, id) ->
    urlRoot = Ember.get(klass, 'url')
    if !urlRoot
      throw new Error('Ember.RESTAdapter requires a `url` property to be specified');

    if !Ember.isEmpty(id)
      return "#{urlRoot}/#{id}"
    else
      return urlRoot
