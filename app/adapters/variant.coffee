module.exports = App.VariantAdapter = Ember.Adapter.extend
  host: '/api/v1'

  buildQueryString: (queryParams) ->
    queryString = '?'
    for key, value of queryParams
      # If there is a value (other than undefined)
      if value
        # If boolean query parameter
        if value is yes
          queryString += "#{key}&"
        else if value not in ['undefined', 'false']
          queryString += "#{key}=#{value}&"

    # Return the query string after removing trailing '&'
    return queryString.substring(0, queryString.length - 1)

  find: (record, id) ->
    $.getJSON("#{@get('host')}/variants/#{id}").then (data) ->
      record.load(id, data)

  findQuery: (klass, records, params) ->
    url = "#{@get('host')}/families/#{params.family_id}/variants"

    # Add optional query parameters
    if params.queryParams
      queryString = @buildQueryString(params.queryParams)

      url += queryString

    $.getJSON(url).then (data) ->
      records.load(klass, data)
