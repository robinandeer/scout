App.User = Ember.Model.extend
  id: attr()
  institute: attr()
  email: attr()
  name: attr()
  createdAt: attr(MomentDate)

App.User.camelizeKeys = yes

App.UserAdapter = Ember.Object.extend
  host: "http://localhost:5000"

  find: (record, id) ->
    $.getJSON("#{@get('host')}/user").then (data) ->
      record.load(data.id, data)

App.User.adapter = App.UserAdapter.create()
