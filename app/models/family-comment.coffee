MomentDate =
  deserialize: (raw_date) ->
    return moment raw_date, "YYYY-MM-DD"

  serialize: (date) ->
    return date.format "YYYY-MM-DD"

App.FamilyComment = Ember.Model.extend
  id: Em.attr()
  userComment: Em.attr()
  logDate: Em.attr(MomentDate)
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

App.FamilyCommentAdapter = Ember.Object.extend
  host: "https://localhost:5000/api/v1/families"

  findQuery: (klass, records, params) ->
    url = "#{@get('host')}/#{params.family_id}/comments"

    $.getJSON(url).then (data) ->
      # Add made up comment IDs
      updatedData = []
      for comment, i in data
        comment.id = comment.family + i
        updatedData.push(comment)

      records.load(klass, updatedData)

App.FamilyComment.adapter = App.FamilyCommentAdapter.create()

App.VariantComment = Ember.Model.extend
  id: Em.attr()
  rating: Em.attr()
  commentDate: Em.attr(MomentDate)
  name: Em.attr()
  variantComment: Em.attr()
  variantid: Em.attr()
  email: Em.attr()

App.VariantComment.camelizeKeys = yes

App.VariantCommentAdapter = Ember.Object.extend
  host: "https://localhost:5000/api/v1/variants"

  findQuery: (klass, records, params) ->
    url = "#{@get('host')}/#{params.variant_id}/comments"

    $.getJSON(url).then (data) ->
      # Add made up comment IDs
      updatedData = []
      for comment, i in data
        comment.id = comment.variantid + i
        updatedData.push(comment)

      records.load(klass, updatedData)

App.VariantComment.adapter = App.VariantCommentAdapter.create()
