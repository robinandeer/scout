ReplaceNull =
  deserialize: (value) ->
    if value is 'Na' or value is '-'
      return null
    else
      return value

App.Variant = Ember.Model.extend
  id: attr()
  rankScore: attr()
  rating: attr()

  chr: attr()
  startBp: attr()
  stopBp: attr()
  refNt: attr()
  altNt: attr()

  hgncSymbol: attr()
  hgncSynonyms: attr()
  hgncApprovedName: attr()
  hgncTranscriptId: attr()
  ensemblGeneid: attr()

  siftWholeExome: attr()
  polyphenDivHuman: attr()
  gerpWholeExome: attr()
  mutationTaster: attr()

  thousandG: attr()
  dbsnpId: attr()
  dbsnp: attr()
  dbsnp129: attr()
  dbsnp132: attr()
  esp6500: attr()

  phylopWholeExome: attr()
  lrtWholeExome: attr()
  phastConstElements: attr()
  gerpElement: attr()

  hgmd: attr(ReplaceNull)
  omimGeneDesc: attr()
  diseaseGroup: attr()

  locationReliability: attr()
  functionalAnnotation: attr(ReplaceNull)
  snornaMirnaAnnotation: attr()
  pseudogene: attr()
  mainLocation: attr()
  geneAnnotation: attr()
  otherLocation: attr()
  gwasCatalog: attr()
  expressionType: attr()
  geneModel: attr(ReplaceNull)
  variantCount: attr()
  database: attr()
  genomicSuperDups: attr()

  isInOtherFamilies: (->
    return @get('variantCount') > 1
  ).property('variantCount')

  otherFamiliesCount: (->
    # Subtract this
    return @get('variantCount') - 1
  ).property('variantCount')

  chrom: (->
    if @get('chr')
      return @get('chr').slice(3)
  ).property("chr")

  chromPosString: (->
    return "#{@get('chr')}: #{@get('startBp')}-#{@get('stopBp')}"
  ).property 'chr', 'startBp', 'stopBp'

  geneModels: (->
    if @get('geneModel')
      return @get('geneModel').split(';').slice(0,-1)
    else
      return []
  ).property('geneModel')

  geneModelString: (->
    return @get('geneModels').join(' – ')
  ).property('geneModels')

  severity: (->
    sum = @get('polyphenDivHuman') + @get('siftWholeExome') + @get("mutationTaster")

    return Math.round(sum/3 * 100)
  ).property 'polyphenDivHuman', 'siftWholeExome', 'mutationTaster'

  frequency: (->
    sum = @get('lrtWholeExome') + @get('phylopWholeExome')

    return Math.round(sum/2 * 100)
  ).property 'lrtWholeExome', 'phylopWholeExome'

  gt: (->
    return App.GTCall.find @get('id')
  ).property 'id'

  gtString: (->
    calls = []
    for call in @get('gt.gtCalls')
      calls.push "#{call.get('idn')}: #{call.get('gt')}"

    return calls.join('\n')
  ).property 'gt.gtCalls.@each.idn', 'gt.gtCalls.@each.gt'

  hide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set('isDirtyHidden', yes)
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.save('variant', @get('id'))

  unhide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set('isDirtyHidden', yes)
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.delete('variant', @get('id'))

  isDirtyHidden: no

  isHidden: (->
    return Ember.ls.exists('variant', @get('id'))
  ).property('id', 'hide', 'unhide', 'isDirtyHidden')

  hiddenAt: (->
    return Ember.ls.find('variant', @get('id'))
  ).property('id')

App.Variant.camelizeKeys = yes

App.VariantAdapter = Ember.Object.extend
  host: 'http://localhost:5000/api/v1'

  buildQueryString: (queryParams) ->
    queryString = '?'
    for key, value of queryParams
      # If there is a value for other than 'true'
      if value is yes
        queryString += "#{key}&"
      else
        queryString += "#{key}=#{value}&"

    # Return the query string after removing trailing '&'
    return queryString.substring(0, queryString.length - 1)

  find: (record, id) ->
    $.getJSON("#{@get('host')}/variants/#{id}").then (data) ->
      record.load(id, data)

  findQuery: (klass, records, params) ->
    url = "#{@get('host')}/families/#{params.family_id}/variants"

    # Add optional query parameters
    if params.queryParams
      queryString = @buildQueryString(params.queryParams)

      url += queryString

    $.getJSON(url).then (data) ->
      records.load(klass, data.slice(0, 100))

App.Variant.adapter = App.VariantAdapter.create()