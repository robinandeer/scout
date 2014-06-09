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
  samples: Em.attr()

  isResearch: (->
    return 'research' in (@get('databases') or '')
  ).property 'databases'

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
App.Family.primaryKey = 'id'
App.Family.url = '/api/v1/families'
App.Family.adapter = NewRESTAdapter.create()

module.exports = App.Family
