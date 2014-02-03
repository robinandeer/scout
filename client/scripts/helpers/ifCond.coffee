Handlebars.registerHelper 'ifCond', (v1, v2) ->
  if v1 or v2
    return yes
  else
    return no
