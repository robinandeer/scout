keyMaker = (klass, id) ->
  return "#{klass}-#{id}"

Ember.LocalStorage = Ember.Object.extend
  exists: (klass, id) ->
    return `keyMaker(klass, id) in localStorage`

  find: (klass, id) ->
    value = localStorage.getItem(keyMaker(klass, id))
    return moment(value)

  save: (klass, id) ->
    localStorage[keyMaker(klass, id)] = moment().format('YYYY-MM-DD')

  delete: (klass, id) ->
    delete localStorage[keyMaker(klass, id)]

Ember.ls = Ember.LocalStorage.create()
