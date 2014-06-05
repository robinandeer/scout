module.exports =
  deserialize: (value) ->
    if value is 'Na' or value is '-'
      return null
    else
      return value
