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
