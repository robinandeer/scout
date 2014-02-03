App = Ember.Application.create()

App.family = "1"

App.ApplicationView = Ember.View.extend
  classNames: ["app"]

  didInsertElement: ->
    $(document).keyup (event) =>
      @get('controller').send 'keyup', event

# fromNow - The time since a date and now
#   [IN]  date    - A javascript date object
#   [OUT] returns - A human readable date string
Ember.Handlebars.registerBoundHelper "fromNow", (date) ->
  return date.fromNow()

# cap - Capitalizes strings
#   [IN]  string  - Simple string
#   [OUT] returns - Capitalized version of string
Ember.Handlebars.registerBoundHelper "cap", (str) ->
  return str.toLowerCase().capitalize()

String.prototype.capitalize = ->
  lower_case = this.toLowerCase()
  return lower_case.charAt(0).toUpperCase() + lower_case.slice(1)
