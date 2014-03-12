App.GtCall = Ember.Model.extend
  pk: Em.attr()
  variantid: Em.attr()
  variantId: (->
    return @get('variantid')
  ).property 'variantid'
  idn: Em.attr({ defaultValue: '' })
  filter: Em.attr()
  gt: Em.attr()
  gq: Em.attr()
  dp: Em.attr()
  pl: Em.attr({ defaultValue: '' })
  pls: (->
    return @get('pl').split(',')
  ).property 'pl'
  ad: Em.attr({ defaultValue: '' })
  ads: (->
    return @get('ad').split(',')
  ).property 'ad'

  ok: (->
    if @get('filter') is 'PASS'
      return yes
    else
      return no
  ).property 'filter'

  gender: (->
    identifier = @get('idn').split('-')[2].slice(0,-1)

    # Identifier is even for females
    if identifier % 2 is 0
      return 'female'
    else
      return 'male'
  ).property 'idn'

  memberType: (->
    generation = @get('idn').split('-')[1]
    gender = @get('gender')

    if generation is 1
      if gender is 'male'
        return 'boy'
      else
        return 'girl'

    else if generation is 2
      if gender is 'male'
        return 'father'
      else
        return 'mother'

    else
      return 'unknown'

  ).property 'idn', 'gender'

App.GtCall.camelizeKeys = yes
App.GtCall.primaryKey = 'pk'
App.GtCall.collectionKey = 'gtcalls'
App.GtCall.url = 'http://localhost:8081/api/v1/gtcalls'
App.GtCall.adapter = Ember.NewRESTAdapter.create()
