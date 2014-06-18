NewRESTAdapter = require 'adapters/new-rest'
MomentDate = require 'helpers/moment-date'

App.Family = Ember.Model.extend
  id: Em.attr()
  family_id: Em.attr()
  familyId: (->
    return parseInt(@get('id'))
  ).property 'id'
  updateDate: Em.attr(MomentDate)
  updateDateRaw: (->
    return @get('updateDate').toDate()
  ).property 'updateDate'
  database: Em.attr()
  databases: (->
    return (@get('database') or '').split(',')
  ).property 'database'
  firstDatabase: (->
    return @get('databases.0')
  ).property 'databases'

  sampleModel: Ember.Object.extend
    clinical_db: undefined
    capture_personnel: undefined
    sequencing_kit: undefined
    cmmsid: undefined
    isolation_personnel: undefined
    medical_doctor: undefined
    capture_date: undefined
    sex: undefined
    idn: undefined
    isolation_kit: undefined
    clustering_date: undefined
    inheritance_model: undefined
    inheritanceModels: (->
      return (@get('inheritance_model') or '')
              .slice(1,-1).split(',')
              .map((item) ->
                return item.trim().slice(1,-1)
              )
    ).property 'inheritance_model'
    inheritanceModelString: (->
      return @get('inheritanceModels').join(' | ')
    ).property 'inheritanceModels'
    isolation_date: undefined
    cmms_seqid: undefined
    capture_kit: undefined
    scilifeid: undefined
    phenotype_terms: undefined
    phenotype: undefined

  samples: Em.attr()
  altSamples: (->
    samples = Em.A()
    for sample in (@get('samples') or [])
      samples.pushObject @sampleModel.create sample
    return samples
  ).property 'samples'

  isResearch: (->
    return 'research' in (@get('databases') or '')
  ).property 'databases'

  hide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set 'isDirtyHidden', yes
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.save 'family', @get('id'), moment().format('YYYY-MM-DD')

  unhide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set 'isDirtyHidden', yes
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.delete 'family', @get('id')

  isDirtyHidden: no

  isHidden: (->
    return Ember.ls.exists 'family', @get('id')
  ).property 'id', 'hide', 'unhide', 'isDirtyHidden'

  hiddenAt: (->
    return Ember.ls.find 'family', @get('id')
  ).property 'id'

App.Family.camelizeKeys = yes
App.Family.primaryKey = 'id'
App.Family.url = '/api/v1/families'
App.Family.adapter = NewRESTAdapter.create()

module.exports = App.Family
