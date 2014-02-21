attr = Ember.attr
hasMany = Ember.hasMany
belongsTo = Ember.belongsTo

MomentDate =
  deserialize: (raw_date) ->
    return moment raw_date

  serialize: (date) ->
    return date.toJSON()

App.Family = Ember.Model.extend
  id: attr()
  updateDate: attr(MomentDate)
  pedigree: attr()
  database: attr()
  samples: attr()
  
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
  host: "http://localhost:8081/api/v1"

  find: (record, id) ->
    $.getJSON("#{@get('host')}/families/#{id}").then (data) ->
      family = data[0].family[0]
      family.database = family.iem
      family.id = family.family
      family.samples = data[1].samples
      record.load(id, family)

  findAll: (klass, records) ->
    $.getJSON("#{@get('host')}/families").then (data) ->
      records.load(klass, data)

App.Family.adapter = App.FamilyAdapter.create()
