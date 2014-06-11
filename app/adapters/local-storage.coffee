keyMaker = (klass, id) ->
  return "#{klass}-#{id}"

module.exports = Ember.LocalStorage = Ember.Object.extend
  init: ->
    @set 'length', localStorage.length

  exists: (klass, id) ->
    return `keyMaker(klass, id) in localStorage`

  find: (klass, id) ->
    value = localStorage.getItem(keyMaker(klass, id))

    # Attempt to create date
    date = moment(value)
    if date.isValid()
      return date
    else
      return value

  findAll: (klass) ->
    results = Em.A()
    for index in [0..localStorage.length]
      key = localStorage.key(index)
      if (key or '').startsWith(klass)
        # Attempt to create date
        value = moment(localStorage.getItem(key))
        if not value.isValid()
          value = localStorage.getItem(key)

        results.pushObject Em.Object.create
          id: key.split('-')[1]
          value: value

    return results

  deleteAll: (klass) ->
    # Delete all save instances of this klass/record type
    for key, _ of localStorage
      if key.substring(0, klass.length) is klass
        delete localStorage[key]

  save: (klass, id, value) ->
    localStorage[keyMaker(klass, id)] = value
    @incrementProperty 'length'

  delete: (klass, id) ->
    delete localStorage[keyMaker(klass, id)]
    @incrementProperty 'length', -1

Ember.ls = Ember.LocalStorage.create()
