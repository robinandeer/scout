App.ApplicationController = Ember.Controller.extend
  needs: ['variants', 'variant']

  actions:
    keyup: (event) ->
      if @get('controllers.variants.variantLoaded')
        if event.which in [38, 40]
          event.preventDefault()

          # Up arrow
          if event.which is 38
            direction = 'prev'
          else if event.which is 40
            # ... down arrow
            direction = 'next'

          nextVariant = @get('controllers.variant').adjacentVariant(direction)

          @transitionToRoute 'variant', nextVariant

  instanceTagOptions: (->
    tags = Em.A()
    for tag in (@get('model.institutes') or [])
      tags.pushObject({ label: tag, id: tag })
    return tags
  ).property 'model.institutes'

  instanceTagOptionsObserver: (->
    @set 'institute', @get('instanceTagOptions.0.id')
  ).observes 'instanceTagOptions.@each'

  institute: null
