MomentDate =
  deserialize: (raw_date) ->
    return moment raw_date

  serialize: (date) ->
    return date.toJSON()

Ember.NewRESTAdapter = Ember.RESTAdapter.extend
  buildURL: (klass, id) ->
    urlRoot = Ember.get(klass, 'url')
    if !urlRoot
      throw new Error('Ember.RESTAdapter requires a `url` property to be specified');

    if !Ember.isEmpty(id)
      return "#{urlRoot}/#{id}"
    else
      return urlRoot

App.Comment = Ember.Model.extend
  _id: Em.attr()
  context: Em.attr()
  ecosystem: Em.attr()
  contextId: Em.attr()
  email: Em.attr()
  createdAt: Em.attr(MomentDate)
  updatedAt: Em.attr(MomentDate)
  body: Em.attr()
  category: Em.attr()
  tags: Em.attr()
  priority: Em.attr()

  tag: (->
    return @get 'tags.0'
  ).property 'tags'

  firstName: (->
    email = @get('email')
    return email.slice(0, email.indexOf('.')).capitalize()
  ).property 'email'

  isDiagnostic: (->
    return @get('category') in ['IEM', 'EP']
  ).property 'category'

  isResearch: (->
    return @get('category') is 'research'
  ).property 'category'

  isFamilyComment: (->
    return @get('context') is 'family'
  ).property 'context'

App.Comment.camelizeKeys = yes
App.Comment.primaryKey = '_id'
App.Comment.collectionKey = 'comments'
App.Comment.url = 'http://localhost:8081/v1/comments'
App.Comment.adapter = Ember.NewRESTAdapter.create()
