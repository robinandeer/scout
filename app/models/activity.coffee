NewRESTAdapter = require 'adapters/new-rest'
MomentDate = require 'helpers/moment-date'

App.Activity = Ember.Model.extend
  _id: Em.attr()
  activityId: Em.attr()
  category: Em.attr()
  context: Em.attr()
  contextId: Em.attr()

  ecosystem: Em.attr()
  userId: Em.attr()

  createdAt: Em.attr(MomentDate)
  updatedAt: Em.attr(MomentDate)

  title: Em.attr()
  caption: Em.attr()
  content: Em.attr()
  tags: Em.attr()

  firstTag: (->
    return @get 'tags.0'
  ).property 'tags'

App.Activity.camelizeKeys = yes
App.Activity.primaryKey = '_id'
App.Activity.collectionKey = 'activities'
App.Activity.url = '/api/v1/activities'
App.Activity.adapter = NewRESTAdapter.create()

module.exports = App.Activity
