App.Issue = Ember.Model.extend
  id: attr()
  title: attr()
  body: attr()
  html: attr()
  createdAt: attr(MomentDate)
  url: attr()

App.Issue.camelizeKeys = yes
App.Issue.collectionKey = 'issues'
App.Issue.url = 'http://localhost:8083/v1/issues'

App.Issue.adapter = Ember.NewRESTAdapter.create()
