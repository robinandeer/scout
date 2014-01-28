App.PopOverComponent = Ember.Component.extend
  classNames: ['pop-over']
  variant: null
  title: null
  show: null
  hide: null
  lock: null
  isLocked: no

  mouseEnter: ->
    @sendAction 'show', @get('variant')

  mouseLeave: ->
    if not @get('isLocked')
      @sendAction 'hide'

  click: ->
    @set 'isLocked', yes

    Ember.run.later(@, =>
      $(document).on 'click', =>
        @toggleProperty 'isLocked'
        # Remove event handler
        $(document).off()
    , 1)
