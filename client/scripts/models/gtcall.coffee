App.GTCall = Ember.Model.extend
  gtCalls: attr()
  compounds: attr()

Ember.GTCallAdapter = Ember.Object.extend
  host: 'http://localhost:8081/api/v1'

  find: (record, id) ->
    $.getJSON("#{@get('host')}/variants/#{id}/gtcall").then (data) ->

      compounds = []
      for compound in data.COMPOUNDS
        unless compound.vpk is id
          compounds.push(App.Compound.create(compound))

      objects = {
        gtCalls: (App.Call.create(call) for call in data.GT)
        # Only show the first 10 compounds
        compounds: compounds.slice(0,10)
      }

      record.load(id, objects)

App.GTCall.adapter = Ember.GTCallAdapter.create()

App.Call = Ember.Object.extend
  filter: null
  gt: null
  ad: null
  gq: null
  idn: null
  pl: null
  variantid: null
  pk: null
  dp: null

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

App.Compound = Ember.Object.extend
  functional_annotation: null
  gt: null
  gene_model: null
  idn: null
  gene_annotation: null
  vpk: null
  rank_score: null

  gtCalls: (->
    return @get('gt').split(',')
  ).property('gt')

  geneModels: (->
    return @get('gene_model').split(';')
  ).property('gene_model')

  idns: (->
    return @get('idn').split(',')
  ).property('idn')
