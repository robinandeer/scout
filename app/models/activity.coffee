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
  user: Em.belongsTo 'App.User', {key: 'user_id'}

  createdAt: Em.attr(MomentDate)
  updatedAt: Em.attr(MomentDate)

  title: Em.attr()
  caption: Em.attr()
  content: Em.attr()
  tags: Em.attr()

  firstTag: (->
    return @get 'tags.0'
  ).property 'tags'

  entypoIcon: (->
    tag = @get 'firstTag'
    if tag is 'action'
      return 'icon-alert'
    else if tag is 'conclusion'
      return 'icon-check'
    else  # 'finding' by default
      return 'icon-search'
  ).property 'firstTag'


ActivityAdapter = NewRESTAdapter.extend
  find: (record, id) ->
    url = @buildURL record.constructor, id

    return @ajax(url).then (data) =>
      @didFind record, id, data
      return record

  didFind: (record, id, data) ->
    Ember.run record, record.load, id, data.activities
    Ember.run App.User, App.User.load, data.user


App.Activity.camelizeKeys = yes
App.Activity.primaryKey = '_id'
App.Activity.collectionKey = 'activities'
App.Activity.url = '/api/v1/activities'
App.Activity.adapter = ActivityAdapter.create()

module.exports = App.Activity
