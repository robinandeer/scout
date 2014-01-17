App.MyGaugeComponent = Ember.Component.extend
  classNames: ["gauge"]

  classNameBindings: ["isMaxValueExceeded:exceeded"]

  isMaxValueExceeded: (->
    value = parseInt @get("value"), 10
    maxValue = parseInt @get("maxValue"), 10
    return (value > maxValue)

  ).property "value", "maxValue"

  computedAngle: (->
    value = parseInt @get("value"), 10
    maxValue = parseInt @get("maxValue"), 10
  
    angle = Math.floor(180 * value/maxValue - 90)
  
    if @get('isMaxValueExceeded')
      styles = "-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);"

    else
      styles = "-webkit-transform: rotate(#{angle}deg); -2moz-transform: rotate(#{angle}deg); -ms-transform: rotate(#{angle}deg); transform: rotate(#{angle}deg);"

    return styles
  ).property "value", "maxValue", "isMaxValueExceeded"
