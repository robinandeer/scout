App.OtherFamily = Ember.Model.extend
  pk: attr()
  family: attr()
  id: (->
    return @get 'family'
  ).property 'family'


App.OtherFamily.camelizeKeys = yes
App.OtherFamily.collectionKey = 'other_families'
App.OtherFamily.url = 'http://localhost:8081/api/v1/other_families'

App.OtherFamily.adapter = Ember.NewRESTAdapter.create()
