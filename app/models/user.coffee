NewRESTAdapter = require 'adapters/new-rest'
MomentDate = require 'helpers/moment-date'

App.User = Ember.Model.extend
  id: Em.attr()
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


App.User.camelizeKeys = yes
App.User.primaryKey = '_id'
App.User.collectionKey = 'users'
App.User.url = '/api/v1/users'
App.User.adapter = NewRESTAdapter.create()

module.exports = App.User
