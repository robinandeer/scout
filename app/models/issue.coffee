App.Issue = Ember.Model.extend
  id: attr()
  title: attr()
  body: attr()
  html: attr()
  created_at: attr(MomentDate)
  url: attr()

Ember.IssueAdapter = Ember.Object.extend
  host: 'https://localhost:5000/api/v1/issues'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/families/#{id}").then (data) ->
      record.load(id, data)

  findAll: (klass, records) ->
    $.getJSON(@get('host')).then (data) ->
      records.load(klass, data)

  createRecord: (record) ->
    return new Ember.RSVP.Promise (resolve, reject) ->
      resolve(record)
      record.didCreateRecord()

  saveRecord: (record) ->
    # Make the POST call to the server
    $.post "#{@get('host')}/new", record.toJSON(), (data) ->
      # Make nessesary updates to the client record
      record.setProperties data

      # Tell the world
      record.didSaveRecord()

  deleteRecord: (record) ->
    $.delete "#{@get('host')}/#{record.id}"

App.Issue.adapter = Ember.GTCallAdapter.create()
