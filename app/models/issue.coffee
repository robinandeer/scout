NewRESTAdapter = require 'adapters/new-rest'
MomentDate = require 'helpers/moment-date'

App.Issue = Ember.Model.extend
  id: Em.attr()
  title: Em.attr()
  body: Em.attr()
  html: Em.attr()
  createdAt: Em.attr(MomentDate)
  url: Em.attr()

App.Issue.camelizeKeys = yes
App.Issue.collectionKey = 'issues'
App.Issue.url = '/api/v1/issues'
App.Issue.adapter = NewRESTAdapter.create()

module.exports = App.Issue
