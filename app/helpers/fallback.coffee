# fallback - provide a default if value resolves to 'null'
#   [IN]  object
#   [OUT] returns - object or default
Ember.Handlebars.registerBoundHelper "fallback", (obj, options) ->
  if obj
    roundedNum = Math.round(obj * 1000) / 1000
    if isNaN(roundedNum)
      return obj
    else
      return roundedNum
  else
    return options.fallback or 'undefined'
