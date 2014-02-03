App.Issue = Ember.Model.extend
  id: attr()
  title: attr()
  body: attr()
  html: attr()
  createdAt: attr(MomentDate)
  url: attr()

App.Issue.camelizeKeys = yes

Ember.IssueAdapter = Ember.Object.extend
  host: 'http://localhost:5000/issues'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/#{id}").then (data) ->
      record.load(id, data)

  findAll: (klass, records) ->
    $.getJSON(@get('host')).then (data) ->
      records.load(klass, data.issues)

  createRecord: (record) ->
    # This is called when saving a new record
    # Make the POST call to the server
    $.post "#{@get('host')}/new", record.toJSON(), (data) ->
      # Make nessesary updates to the client record
      record.setProperties data

      # Tell the world
      record.didCreateRecord()

  deleteRecord: (record) ->
    $.delete "#{@get('host')}/#{record.id}"

App.Issue.adapter = Ember.IssueAdapter.create()
