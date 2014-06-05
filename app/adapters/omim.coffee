module.exports = Ember.OmimAdapter = Ember.Adapter.extend
  host: '/api/v1'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/omim/#{id}").then (data) ->
      data.SYNDROMS = (syn.toLowerCase().capitalize() for syn in data.SYNDROMS)
      record.load(id, data)
