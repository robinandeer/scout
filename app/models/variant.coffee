VariantAdapter = require 'adapters/variant'
ReplaceNull = require 'helpers/replace-null'

App.Variant = Ember.Model.extend
  id: Em.attr()
  individualRankScore: Em.attr()
  rankScore: Em.attr()
  GTCallFilter: Em.attr()
  clinicalDbGeneAnnotation: Em.attr()

  chr: Em.attr({ defaultValue: '' })
  chromosome: (->
    return (@get('chr') or '').replace('chr', '')
  ).property 'chr'
  chromosomePositionString: (->
    return "#{@get('chr')}: #{@get('startBp')}-#{@get('stopBp')}"
  ).property 'chr', 'startBp', 'stopBp'
  startBp: Em.attr()
  stopBp: Em.attr()
  isMultiBase: (->
    return @get('startBp') != @get('stopBp')
  ).property 'startBp', 'stopBp'
  refNt: Em.attr()
  altNt: Em.attr()
  uniqueId: (->
    "#{@get('chr')}-#{@get('startBp')}-#{@get('stopBp')}-#{@get('altNt')}"
  ).property 'chr', 'startBp', 'stopBp', 'altNt'

  hgncSymbol: Em.attr()
  hgncSynonyms: Em.attr({ defaultValue: '' })
  hgncSynonymsString: (->
    return (@get('hgncSynonyms') or '').split(';').slice(0, -1).join(', ')
  ).property 'hgncSynonyms'
  hgncApprovedName: Em.attr()
  ensemblGeneid: Em.attr({ defaultValue: '' })
  ensemblGeneIdString: (->
    return (@get('ensemblGeneid') or '').split(';').join(', ')
  ).property 'ensemblGeneid'

  hgncTranscriptId: Em.attr({ defaultValue: '' })
  variantFunctions: (->
    return (@get('hgncTranscriptId') or '').split(',').slice(0,-1)
  ).property 'hgncTranscriptId'

  # Severity predictions
  siftWholeExome: Em.attr()
  polyphenDivHuman: Em.attr()
  polyphenVarHuman: Em.attr()
  mutationTaster: Em.attr()
  severities: (->
    severities = []
    properties = ['siftWholeExome', 'polyphenDivHuman', 'polyphenVarHuman',
                  'mutationTaster']
    for property in properties
      if @get property
        severities.push
          id: property
          name: property.capitalize()
          value: @get property

    return severities
  ).property('siftWholeExome', 'polyphenDivHuman', 'polyphenVarHuman',
             'mutationTaster')
  scaledCscoreThousandG: Em.attr()
  unscaledCscoreThousandG: Em.attr()
  unscaledCscoreSnv: Em.attr()
  scaledCscoreSnv: Em.attr()

  cScores: (->
    scores = []
    properties = ['unscaledCscoreThousandG', 'scaledCscoreThousandG',
                  'unscaledCscoreSnv', 'scaledCscoreSnv']
    for property in properties
      if @get property
        scores.push
          id: property
          name: property.capitalize()
          value: @get property

    return scores
  ).property('unscaledCscoreThousandG', 'scaledCscoreThousandG',
             'unscaledCscoreSnv', 'scaledCscoreSnv')

  # Frequencies
  thousandG: Em.attr()
  dbsnpId: Em.attr()
  dbsnp: Em.attr({ defaultValue: '' })
  dbsnpFlag: (->
    return (@get('dbsnp') or '').replace('snp137', '')
  ).property 'dbsnp'
  dbsnp129: Em.attr()
  dbsnp132: Em.attr()
  esp6500: Em.attr()
  variantCount: Em.attr()
  hbvdb: Em.attr()
  hbvdbHuman: (->
    freq = @get('variantCount')
    if freq
      if freq > 10
        return 'is-common'
      return 'is-found'
    return 'is-not-found'
  ).property 'variantCount'
  frequencies: (->
    frequencies = []
    for property in ['thousandG', 'esp6500', 'dbsnp129', 'variantCount']
      if @get property
        frequencies.push
          id: property
          name: property.capitalize()
          value: @get property

    return frequencies
  ).property 'thousandG', 'esp6500', 'dbsnp129', 'variantCount'

  # Conservation
  phylopWholeExome: Em.attr()
  lrtWholeExome: Em.attr()
  phastConstElements: Em.attr()
  phastConstElementsScore: (->
    return parseInt((@get('phastConstElements') or '').split(';')[0].replace(/Score=/, ''))
  ).property 'phastConstElements'
  gerpElement: Em.attr()
  gerpWholeExome: Em.attr()

  conservations: (->
    conservations = []
    for property in ['phylopWholeExome', 'lrtWholeExome',
                     'phastConstElementsScore', 'gerpElement',
                     'gerpWholeExome']
      if @get property
        conservations.push
          id: property
          name: property.capitalize()
          value: @get property

    return conservations
  ).property 'phylopWholeExome', 'lrtWholeExome', 'phastConstElementsScore',
             'gerpElement', 'gerpWholeExome'

  # Disease gene annotations
  hgmd: Em.attr(ReplaceNull)
  hgmdAccession: Em.attr()
  hgmdVariantType: Em.attr()
  hgmdVariantPmid: Em.attr({ defaultValue: '' })
  hgmdVariantPmidLinks: (->
    # Separated by ';' and trailing ';'
    links = Em.A()
    for pmid in (@get('hgmdVariantPmid') or '').split(';').slice(0, -1)
      links.pushObject
        id: pmid
        link: "http://www.ncbi.nlm.nih.gov/pubmed/#{pmid}"
    return links
  ).property 'hgmdVariantPmid'
  omimGeneDesc: Em.attr()
  diseaseGroup: Em.attr()

  # Inheritance models
  geneModel: Em.attr(ReplaceNull)
  hasCompounds: (->
    return (@get('geneModel') or '').indexOf('compound') != -1
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
  diseaseGeneModel: Em.attr({ defaultValue: '' })
  diseaseGeneModels: (->
    return (@get('diseaseGeneModel') or '').split(',')
  ).property 'diseaseGeneModel'

  reducedPenetrance: Em.attr()

  otherFamilies: (->
    if @get 'isFoundInOtherFamilies'
      return App.OtherFamily.find { variant_id: @get('id') }
    else
      return Em.A()
  ).property 'id', 'isFoundInOtherFamilies'

  isFoundInOtherFamilies: (->
    return @get('variantCount') > 1
  ).property('variantCount')

  otherFamiliesCount: (->
    # Subtract this
    return @get('variantCount') - 1
  ).property('variantCount')

  gtcalls: (->
    return App.GtCall.find { variant_id: @get('id') }
  ).property 'id'

  gtcallsBySampleId: (->
    return @get('gtcalls').sortBy 'sampleId'
  ).property 'gtcalls.@each.id'

  gtData: (->
    # Suppose same order as compounds
    gts = Em.A()
    @get('gtcallsBySampleId').forEach (gtcall) ->
      gts.pushObject gtcall.get('gt')

    data =
      combinedScore: '-'
      rankScore: @get('rankScore')
      gtcalls: gts
      geneModel: @get('geneModel')
      geneAnnotation: @get('geneAnnotation')
      functionalAnnotation: @get('functionalAnnotation')

    return data
  ).property 'gtcalls.length', 'rankScore', 'geneModel', 'geneAnnotation',
             'functionalAnnotation'

  compounds: (->
    return App.Compound.find { variant_id: @get('id') }
  ).property 'id'

  # Misc.
  locationReliability: Em.attr()
  functionalAnnotation: Em.attr(ReplaceNull)
  snornaMirnaAnnotation: Em.attr()
  pseudogene: Em.attr()
  mainLocation: Em.attr()
  geneAnnotation: Em.attr()
  isProbablyBenign: (->
    return @get('geneAnnotation') is 'intronic'
  ).property 'geneAnnotation'
  otherLocation: Em.attr()
  gwasCatalog: Em.attr()
  expressionType: Em.attr()
  genomicSuperDups: Em.attr()

  hide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set 'isDirtyHidden', yes
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.save 'variant', @get('id'), @get('uniqueId')

  unhide: ->
    # Do this first block to trigger property changes
    # that otherwise only happens in localStorage
    @set 'isDirtyHidden', yes
    Ember.run.later @, =>
      @set 'isDirtyHidden', no
    , 1

    return Ember.ls.delete 'variant', @get('id')

  isDirtyHidden: no

  isHidden: (->
    return Ember.ls.exists 'variant', @get('id')
  ).property 'id', 'hide', 'unhide', 'isDirtyHidden'

  hiddenAt: (->
    return Ember.ls.find 'variant', @get('id')
  ).property 'id'

App.Variant.camelizeKeys = yes
App.Variant.adapter = VariantAdapter.create()

module.exports = App.Variant
