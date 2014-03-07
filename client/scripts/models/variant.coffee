ReplaceNull =
  deserialize: (value) ->
    if value is 'Na' or value is '-'
      return null
    else
      return value

App.Variant = Ember.Model.extend
  id: attr()
  individualRankScore: attr()
  rankScore: attr()
  GTCallFilter: attr()
  clinicalDbGeneAnnotation: attr()

  chr: attr()
  chrom: (->
    if @get('chr')
      return @get('chr').slice(3)
  ).property('chr')
  chromPosString: (->
    return "#{@get('chr')}: #{@get('startBp')}-#{@get('stopBp')}"
  ).property 'chr', 'startBp', 'stopBp'
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
  ensemblGeneid: attr()
  ensemblGeneIdString: (->
    if @get('ensemblGeneid')
      return @get('ensemblGeneid').split(';').slice(0, -1).join(', ')
  ).property 'ensemblGeneid'

  hgncTranscriptId: attr()
  variantFunctions: (->
    if @get('hgncTranscriptId')
      return @get("hgncTranscriptId").split(',').slice(0,-1)
    else
      return []
  ).property 'hgncTranscriptId'

  # Severity predictions
  siftWholeExome: attr()
  polyphenDivHuman: attr()
  gerpWholeExome: attr()
  mutationTaster: attr()
  severities: (->
    severities = []
    properties = ['siftWholeExome', 'polyphenDivHuman', 'gerpWholeExome',
                  'mutationTaster']
    for property in properties
      if @get property
        severities.push
          id: property
          name: property.capitalize()
          value: @get property

    return severities
  ).property('siftWholeExome', 'polyphenDivHuman', 'gerpWholeExome',
             'mutationTaster')
  scaledCscoreThousandG: attr()
  unscaledCscoreThousandG: attr()
  unscaledCscoreSnv: attr()
  scaledCscoreSnv: attr()

  # Frequencies
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
  variantCount: attr()
  hbvdb: attr()
  hbvdbHuman: (->
    freq = @get('hbvdb')
    if freq
      if freq > 0.1
        return 'is-common'
      return 'is-found'
    return 'is-not-found'
  ).property 'hbvdb'
  frequencies: (->
    frequencies = []
    for property in ['thousandG', 'esp6500', 'dbsnp129', 'hbvdb']
      if @get property
        frequencies.push
          id: property
          name: property.capitalize()
          value: @get property

    return frequencies
  ).property 'thousandG', 'esp6500', 'dbsnp129', 'hbvdb'

  # Conservation
  phylopWholeExome: attr()
  lrtWholeExome: attr()
  phastConstElements: attr()
  gerpElement: attr()
  polyphenVarHuman: attr()

  # Disease gene annotations
  hgmd: attr(ReplaceNull)
  hgmdAccession: attr()
  hgmdVariantType: attr()
  hgmdVariantPmid: attr()
  hgmdVariantPmidLinks: (->
    # Separated by ';' and trailing ';'
    links = Em.A()
    if @get('hgmdVariantPmid')
      for pmid in @get('hgmdVariantPmid').split(';').slice(0, -1)
        links.pushObject
          id: pmid
          link: "http://www.ncbi.nlm.nih.gov/pubmed/#{pmid}"
    return links
  ).property 'hgmdVariantPmid'
  omimGeneDesc: attr()
  diseaseGroup: attr()

  # Inheritance models
  geneModel: attr(ReplaceNull)
  hasComounds: (->
    return @get('geneModel').indexOf('compound') != -1
  ).property 'geneModel'
  geneModels: (->
    modelString = @get('geneModel')
    if modelString
      delimiter = ':'
      sliceEnd = 10
      if ';' in modelString
        delimiter = ';'
        sliceEnd = -1
      return modelString.split(delimiter).slice(0, sliceEnd)
    else
      return []
  ).property('geneModel')
  geneModelString: (->
    return @get('geneModels').join(' – ')
  ).property('geneModels')
  diseaseGeneModel: attr()
  diseaseGeneModels: (->
    if @get('diseaseGeneModel')
      return @get('diseaseGeneModel').split(',')
    return []
  ).property 'diseaseGeneModel'

  locationReliability: attr()
  functionalAnnotation: attr(ReplaceNull)
  snornaMirnaAnnotation: attr()
  pseudogene: attr()
  mainLocation: attr()
  geneAnnotation: attr()
  otherLocation: attr()
  gwasCatalog: attr()
  expressionType: attr()
  genomicSuperDups: attr()

  isInOtherFamilies: (->
    return @get('variantCount') > 1
  ).property('variantCount')

  otherFamiliesCount: (->
    # Subtract this
    return @get('variantCount') - 1
  ).property('variantCount')

  uniqueId: (->
    "#{@get('chr')}-#{@get('startBp')}-#{@get('stopBp')}-#{@get('altNt')}"
  ).property 'chr', 'startBp', 'stopBp', 'altNt'

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
      records.load(klass, data)

App.Variant.camelizeKeys = yes
App.Variant.adapter = App.VariantAdapter.create()
