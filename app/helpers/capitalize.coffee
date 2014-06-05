# capitalize - Capitalize string
#   [IN]  string
#   [OUT] returns - A modified string.
Ember.Handlebars.registerBoundHelper 'capitalize', (str) ->
  if str
    return str.capitalize()
  else
    return 'Undefined'
