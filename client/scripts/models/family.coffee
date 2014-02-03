attr = Ember.attr
hasMany = Ember.hasMany
belongsTo = Ember.belongsTo

MomentDate =
  deserialize: (raw_date) ->
    return moment raw_date, "YYYY-MM-DD"

  serialize: (date) ->
    return date.format "YYYY-MM-DD"

App.Sample = Ember.Object.extend
  id: ''
  captureKit: ''
  inheritanceModels: ''
  type: ''
  gender: ''
  affected: (->
    # Check if the second position in the ID is 'A'
    return @get('id').endsWith('A')
  ).property('id')

App.Family = Ember.Model.extend
  id: attr()
  analyzedDate: attr(MomentDate)
  pedigree: attr()
  database: attr()

  samples: (->
    samples = Em.A()

    # All rows
    rows = $(@get("pedigree")).find("tr").slice(1)

    # Loop over everthing but the first row
    for row in rows

      # This is an array of data values
      data = $(row).find("td")

      # If we get to additional comment lines, let's quit
      if $(data[0]).text()[0] is "#"
        break

      # Determine mother father child
      if parseInt($(data[2]).text())
        type = "mother"
      else if parseInt($(data[3]).text())
        type = "father"
      else if parseInt($(data[4]).text())
        type = "child"

      # Determine gender
      if parseInt($(data[0]).text().slice(-2,-1)) % 2 == 0
        gender = "female"
      else
        gender = "male"

      sample = App.Sample.create
        id: $(data[0]).text()
        captureKit: $(data[data.length-1]).text().split(";").slice(-1)[0]
        inheritanceModels: $(data[10]).text().split(";")
        type: type
        gender: gender

      samples.pushObject(sample)

    return samples

  ).property("pedigree").cacheable()
  
  hide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set('isDirtyHidden', yes)
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.save('family', @get('id'))

  unhide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set('isDirtyHidden', yes)
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.delete('family', @get('id'))

  isDirtyHidden: no

  isHidden: (->
    return Ember.ls.exists('family', @get('id'))
  ).property('id', 'hide', 'unhide', 'isDirtyHidden')

  hiddenAt: (->
    return Ember.ls.find('family', @get('id'))
  ).property('id')

App.Family.camelizeKeys = yes

App.FamilyAdapter = Ember.Object.extend
  host: "http://localhost:5000/api/v1"

  find: (record, id) ->
    $.getJSON("#{@get('host')}/families/#{id}").then (data) ->
      record.load(id, data[0])

  findAll: (klass, records) ->
    $.getJSON("#{@get('host')}/families").then (data) ->
      records.load(klass, data)

App.Family.adapter = App.FamilyAdapter.create()
