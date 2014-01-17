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

  chrom: (->
    if @get('chr')
      return @get('chr').slice(3)
  ).property("chr")

  geneModels: (->
    if @get('geneModel')
      return @get('geneModel').split(';').slice(0,-1)
    else
      return []
  ).property('geneModel')

  severity: (->
    sum = @get('polyphenDivHuman') + @get('siftWholeExome') + @get("mutationTaster")

    return Math.round(sum/3 * 100)
  ).property 'polyphenDivHuman', 'siftWholeExome', 'mutationTaster'

  frequency: (->
    sum = @get('lrtWholeExome') + @get('phylopWholeExome')

    return Math.round(sum/2 * 100)
  ).property 'lrtWholeExome', 'phylopWholeExome'

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
      record.load(id, data[0])

  findQuery: (klass, records, params) ->
    url = "#{@get('host')}/families/#{params.family_id}/iem"

    # Add optional query parameters
    if params.queryParams
      queryString = @buildQueryString(params.queryParams)

      url += queryString

    $.getJSON(url).then (data) ->
      records.load(klass, data.slice(0, 100))

App.Variant.adapter = App.VariantAdapter.create()
