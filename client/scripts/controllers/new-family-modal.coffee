App.NewFamilyModalController = Ember.Controller.extend
  actions:
    close: ->
      return @send('closeModal')

    removeTag: (tag) ->
      @get('databases').removeObject(tag)

  familyId: 1
  database: null
  databases: Em.A()

  # Tag input functionality for splitting by ','
  databaseObserver: (->
    database = @get 'database'
    if database and ',' in database
      @get('databases').pushObject(database.split(',')[0])
      @set 'database', null
  ).observes 'database'
