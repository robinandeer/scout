# fromNow - The time since a date and now
#   [IN]  date    - A javascript date object
#   [OUT] returns - A human readable date string
Ember.Handlebars.registerBoundHelper 'fromNow', (date) ->
  return date.fromNow()
