module.exports = Ember.RadioButton = Ember.View.extend
  tagName: 'input'
  type: 'radio'
  attributeBindings: ['name', 'type', 'value', 'checked:checked:']

  click: ->
    @set 'selection', @$().val()

  checked: (->
    return @get('value') is @get('selection')
  ).property()
