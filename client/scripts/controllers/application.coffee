App.ApplicationController = Ember.Controller.extend
  needs: ['variants', 'variant']

  user: null
  init: ->
    $.getJSON 'http://localhost:5000/user', (data) =>
      @set 'user', Em.Object.create(data)

  actions:
    keyup: (event) ->
      if @get('controllers.variants.variantLoaded')
        if event.which in [38, 40]
          event.preventDefault()

          # Up arrow
          if event.which is 38
            model = @get('controllers.variant').adjacentVariant('prev')
          else if event.which is 40
            # ... down arrow
            model = @get('controllers.variant').adjacentVariant('next')

          @transitionToRoute 'variant', model
