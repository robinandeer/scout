NewRESTAdapter = require 'adapters/new-rest'

App.OtherFamily = Ember.Model.extend
  pk: Em.attr()
  family: Em.attr()
  id: (->
    return @get 'family'
  ).property 'family'


App.OtherFamily.camelizeKeys = yes
App.OtherFamily.collectionKey = 'other_families'
App.OtherFamily.url = '/api/v1/other_families'
App.OtherFamily.adapter = NewRESTAdapter.create()

module.exports = App.OtherFamily
