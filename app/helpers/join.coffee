Handlebars.registerHelper 'join', (val, delimiter, start, end) ->
  arry = [].concat(val)
  unless typeof(delimiter) is "string"
    delimiter = ','
  start = start or 0
  unless end
    end = arry.length
  return arry.slice(start, end).join(delimiter)
