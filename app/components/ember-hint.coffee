App.EmberHintComponent = Ember.Component.extend
  mouseEnter: ->
    this.set 'hovered', yes

  mouseLeave: ->
    this.set 'hovered', no

App.HintBubbleComponent = Ember.Component.extend
  classNames: ['ember-hint']
  classNameBindings: ['position', 'hovered:in:out']

  hovered: (->
    return this.get 'parentView.hovered'
  ).property('parentView.hovered')
