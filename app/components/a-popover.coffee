module.exports = App.APopoverComponent = Ember.Component.extend
  classNames: ['a-popover']
  classNameBindings: ['direction']

  triggerdBy: 'click'
  isVisible: no

  didInsertElement: ->
    @$menu = @$()

    if @$menu
      @$parent = @$menu.parent(':not(script)')
      @$parent.addClass('a-popover__wrapper')

      # Trigger/show on 'click'
      if @get('triggerdBy') is 'click'
        @$parent.on 'click', $.proxy(@toggle, @)

      else if @get('triggerdBy') is 'hover'
        # Trigger/show on 'hover'
        @$parent.on 'mouseenter', $.proxy(@enter, @)
        @$parent.on 'mouseleave', $.proxy(@leave, @)

      @set 'inserted', yes

    else
      Ember.run.next @, @didInsertElement

  toggle: (event) ->
    # Avoid toggle when clicking inside pop-over
    if $(event.target).closest('.a-popover').length == 0
      @toggleProperty 'isVisible'

  enter: ->
    @set 'isVisible', yes

  leave: ->
    @set 'isVisible', no

  isVisibleObserver: (->
    if @get('direction')
      Ember.run.scheduleOnce 'afterRender', @, =>
        @$().css @get('direction'), -(@$menu.outerWidth())
  ).observes 'isVisible'
