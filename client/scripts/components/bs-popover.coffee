App.BsPopoverComponent = Ember.Component.extend
  classNames: ['bs-popover']
  classNameBindings: ['direction']

  direction: 'right'
  title: ''
  content: null
  html: no
  isVisible: no
  isLocked: no

  actions:
    close: ->
      @set 'isLocked', no

  click: ->
    @toggleProperty 'isLocked'

  didInsertElement: ->
    @$tip = @$()
    if @$tip
      @$element = @$tip.parent(':not(script)')

      eventIn = 'mouseenter'
      eventOut = 'mouseleave'

      @$element.on eventIn, $.proxy(@enter, @)
      @$element.on eventOut, $.proxy(@leave, @)

      @set 'inserted', yes
    else
      Ember.run.next @, @didInsertElement

  enter: ->
    @set 'isVisible', yes
 
  leave: ->
    unless @get('isLocked')
      @set 'isVisible', no

  isVisibleObserver: (->
    Ember.run.next @, =>
      @$().css(@get('direction'), -@$().outerWidth())
  ).observes 'isVisible'
