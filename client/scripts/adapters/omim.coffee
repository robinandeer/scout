Ember.OmimAdapter = Ember.Object.extend
  host: "http://localhost:5000/api/v1"

  find: (record, id) ->
    $.getJSON("#{@get('host')}/omim/#{id}").then (data) ->
      data.SYNDROMS = (syn.toLowerCase().capitalize() for syn in data.SYNDROMS)
      record.load(id, data)
