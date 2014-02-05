MomentDate =
  deserialize: (raw_date) ->
    return moment raw_date, "YYYY-MM-DD"

  serialize: (date) ->
    return date.format "YYYY-MM-DD"

Ember.CommentAdapter = Ember.Object.extend
  host: ''

  findQuery: (klass, records, params) ->
    url = "#{@get('host')}/#{params.record_id}/comments"

    $.getJSON url, (data) ->
      for record, i in data
        record['id'] = record['pk']

      records.load(klass, data)

  createRecord: (record) ->
    klass = record.constructor
    klass_id = record.get(Em.get(klass, 'klassIdField'))

    # This is called when saving a new record
    # Make the POST call to the server
    $.ajax({
      type: 'POST'
      url: "#{@get('host')}/#{klass_id}/comments"
      data: record.toJSON()
      dataType: 'json'
    }).done((data) ->
      # Make nessesary updates to the client record
      for key, value of data[0]
        record.setProperties data[0]

      # Tell the world
      record.didCreateRecord()
    ).fail((error) ->
      console.log error
    )

  deleteRecord: (record) ->
    klass = record.constructor
    klass_id = record.get(Em.get(klass, 'klassIdField'))

    $.ajax
      url: "#{@get('host')}/#{klass_id}/comments/#{record.get('id')}"
      type: 'DELETE'
      dataType: 'json'
      success: (data) ->
        record.didDeleteRecord()
      error: (error) ->
        throw new Error(error)

App.FamilyComment = Ember.Model.extend
  id: Em.attr()
  family: Em.attr()
  userComment: Em.attr()
  createdDate: Em.attr(MomentDate)
  logColumn: Em.attr()
  positionInColumn: Em.attr()
  userName: Em.attr()
  email: Em.attr()

  firstLetter: (->
    return @get('userName')[0].capitalize()
  ).property('userName')

  isDiagnostic: (->
    return @get('logColumn') in ['IEM', 'EP']
  ).property('logColumn')

  isResearch: (->
    return @get('logColumn') is 'research'
  ).property('logColumn')

App.FamilyComment.camelizeKeys = yes
App.FamilyComment.klassIdField = 'family'

App.FamilyComment.adapter = Ember.CommentAdapter.create
  host: "http://localhost:5000/api/v1/families"

App.VariantComment = Ember.Model.extend
  id: Em.attr()
  rating: Em.attr()
  createdDate: Em.attr(MomentDate)
  userName: Em.attr()
  userComment: Em.attr()
  variantid: Em.attr()
  email: Em.attr()

  firstLetter: (->
    return @get('userName')[0].capitalize()
  ).property('userName')

App.VariantComment.camelizeKeys = yes
App.VariantComment.klassIdField = 'variantid'

App.VariantComment.adapter = Ember.CommentAdapter.create
  host: "http://localhost:5000/api/v1/variants"
