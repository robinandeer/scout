App.Comment = Ember.Model.extend
  _id: Em.attr()
  context: Em.attr()
  parentId: Em.attr()
  email: Em.attr()
  createdAt: Em.attr(MomentDate)
  body: Em.attr()
  category: Em.attr()
  type: Em.attr()

  firstLetter: (->
    return @get('userName')[0].capitalize()
  ).property('userName')


App.FamilyComment = App.Comment.extend
  isDiagnostic: (->
    return @get('category') in ['IEM', 'EP']
  ).property('category')

  isResearch: (->
    return @get('category') is 'research'
  ).property('category')

App.FamilyComment.camelizeKeys = yes
App.FamilyComment.primaryKey = '_id'
App.FamilyComment.collectionKey = 'comments'
App.FamilyComment.url = 'http://localhost:8081/v1/comments'
App.FamilyComment.adapter = Ember.NewRESTAdapter.create()

App.VariantComment = App.Comment.extend()
App.VariantComment.camelizeKeys = yes
App.VariantComment.primaryKey = '_id'
App.VariantComment.collectionKey = 'comments'
App.VariantComment.url = 'http://localhost:8081/v1/comments'
App.VariantComment.adapter = Ember.NewRESTAdapter.create()
