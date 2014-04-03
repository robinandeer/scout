App.User = Ember.Model.extend
  _id: Em.attr()
  givenName: Em.attr()
  familyName: Em.attr()
  name: Em.attr()
  locale: Em.attr()
  email: Em.attr()
  createdAt: Em.attr(MomentDate)
  loggedInAt: Em.attr(MomentDate)
  googleId: Em.attr()
  institutes: Em.attr()
  accessToken: Em.attr()

  firstName: (->
    email = @get('email')
    return email.slice(0, email.indexOf('.')).capitalize()
  ).property 'email'


App.UserAdapter = Ember.Object.extend
  find: (record, id) ->
    $.getJSON record.get('constructor.url'), (data) ->
      record.load(id, data)


App.User.camelizeKeys = yes
App.User.primaryKey = '_id'
App.User.collectionKey = 'users'
App.User.url = 'http://localhost:8083/v1/user'
App.User.adapter = App.UserAdapter.create()
