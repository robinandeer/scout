App.Comment = Ember.Model.extend
  _id: Em.attr()
  context: Em.attr()
  parentId: Em.attr()
  email: Em.attr()
  createdAt: Em.attr(MomentDate)
  body: Em.attr()
  category: Em.attr()
  type: Em.attr()

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
