attr = Ember.attr
hasMany = Ember.hasMany
belongsTo = Ember.belongsTo

MomentDate =
  deserialize: (raw_date) ->
    return moment raw_date

  serialize: (date) ->
    return date.toJSON()

# App.Sample = Ember.Model.extend
#   _id: attr()
#   sampleId: attr()
#   internalId: attr()
#   sex: attr()
#   father: attr()
#   mother: attr()
#   physicians: attr()
#   clinicalDb: attr()
#   inheritanceModels: attr()
#   phenotype: attr()
#   phenotypeTerms: attr()
#   tissueOrigin: attr()
#   isolation: attr()
#   capture: attr()
#   clustering: attr()
#   sequencing: attr()

# App.Family = Ember.Model.extend
#   _id: attr()
#   family_id: attr()
#   updateDate: attr(MomentDate)
#   database: attr()
#   samples: hasMany(App.Sample)
#   id: (->
#     return @get 'family_id'
#   ).property 'family_id'

#   hide: ->
#     # Do this first block to trigger property changes
#     # that otherwise only happens in localStorage
#     @set('isDirtyHidden', yes)
#     Ember.run.later @, =>
#       @set 'isDirtyHidden', no
#     , 1

#     return Ember.ls.save('family', @get('id'))

#   unhide: ->
#     # Do this first block to trigger property changes
#     # that otherwise only happens in localStorage
#     @set('isDirtyHidden', yes)
#     Ember.run.later @, =>
#       @set 'isDirtyHidden', no
#     , 1

#     return Ember.ls.delete('family', @get('id'))

#   isDirtyHidden: no

#   isHidden: (->
#     return Ember.ls.exists('family', @get('id'))
#   ).property('id', 'hide', 'unhide', 'isDirtyHidden')

#   hiddenAt: (->
#     return Ember.ls.find('family', @get('id'))
#   ).property('id')

App.Family = Ember.Model.extend
  id: attr()
  family_id: attr()
  familyId: (->
    return parseInt(@get('id'))
  ).property 'id'
  updateDate: attr(MomentDate)
  database: attr()
  databases: (->
    return (@get('database') or '').split(',')
  ).property 'database'
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
      data['family_id'] = data.id
      record.load(id, data)

  findAll: (klass, records) ->
    $.getJSON("#{@get('host')}/families").then (data) ->
      for family in data
        family['family_id'] = family.id

      records.load(klass, data)

# App.Family.adapter = App.FamilyAdapter.create()

App.Family.camelizeKeys = yes
App.Family.primaryKey = 'id'
App.Family.url = 'http://localhost:8081/api/v1/families'

App.Family.adapter = Ember.NewRESTAdapter.create()

# App.Sample.camelizeKeys = yes
# App.Sample.primaryKey = '_id'
# App.Sample.collectionKey = 'samples'
# App.Sample.url = 'http://localhost:8081/v1/samples'

# App.Sample.adapter = Ember.NewRESTAdapter.create()
