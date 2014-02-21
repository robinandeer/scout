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
  GTCallFilter: attr()

  chr: attr()
  startBp: attr()
  stopBp: attr()
  isSingleBase: (->
    return @get('startBp') == @get('stopBp')
  ).property 'startBp', 'stopBp'
  refNt: attr()
  altNt: attr()

  hgncSymbol: attr()
  hgncSynonyms: attr()
  hgncSynonymsString: (->
    if @get('hgncSynonyms')
      return @get('hgncSynonyms').split(';').slice(0, -1).join(', ')
  ).property 'hgncSynonyms'
  hgncApprovedName: attr()
  hgncTranscriptId: attr()
  variantFunctions: (->
    if @get('hgncTranscriptId')
      return @get("hgncTranscriptId").split(',').slice(0,-1)
    else
      return []
  ).property 'hgncTranscriptId'
  ensemblGeneid: attr()
  ensemblGeneIdString: (->
    if @get('ensemblGeneid')
      return @get('ensemblGeneid').split(';').slice(0, -1).join(', ')
  ).property 'ensemblGeneid'

  siftWholeExome: attr()
  polyphenDivHuman: attr()
  gerpWholeExome: attr()
  mutationTaster: attr()

  thousandG: attr()
  dbsnpId: attr()
  dbsnp: attr()
  dbsnpFlag: (->
    if @get('dbsnp')
      return @get('dbsnp').replace('snp137', '')
  ).property 'dbsnp'
  dbsnp129: attr()
  dbsnp132: attr()
  esp6500: attr()

  phylopWholeExome: attr()
  lrtWholeExome: attr()
  phastConstElements: attr()
  gerpElement: attr()
  polyphenVarHuman: attr()

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
  clinicalDbGeneAnnotation: attr()
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
    modelString = @get('geneModel')
    if modelString
      delimiter = ':'
      sliceEnd = 1
      unless modelString.indexOf(';') is -1
        delimiter = ';'
        sliceEnd = -1
      return @get('geneModel').split(delimiter).slice(0, sliceEnd)
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

  uniqueId: (->
    "#{@get('chr')}-#{@get('startBp')}-#{@get('stopBp')}-#{@get('alt_nt')}"
  ).property 'chr', 'startBp', 'stopBp', 'alt_nt'

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
  host: 'http://localhost:8081/api/v1'

  buildQueryString: (queryParams) ->
    queryString = '?'
    for key, value of queryParams
      # If there is a value (other than undefined)
      if value
        # If boolean query parameter
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
