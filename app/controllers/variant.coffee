App.VariantController = Ember.ObjectController.extend
  needs: ['family']

  currentFamilyBinding: 'controllers.family.model'
  maxValue: 100
  testValue: 35
  username: 'Anna'

  showGeneName: no

  actions:
    comment: ->
      console.log @get('comment')

    order: ->
      alert("Consider it done.")

  hasCompounds: (->
    return @get('gt.compounds.length') > 0
  ).property('gt.compounds')

  comments: (->
    return App.VariantComment.find({ variant_id: @get('id') })
  ).property('id')

  omim: (->
    return App.Omim.find @get('hgncSymbol')
  ).property 'hgncSymbol'

  gt: (->
    return App.GTCall.find @get('id')
  ).property 'id'

  ensemblLink: (->
    return "http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=#{@get('ensemblGeneid')}"
  ).property 'ensemblGeneid'

  hpaLink: (->
    return "http://www.proteinatlas.org/search/#{@get('ensemblGeneid')}"
  ).property 'ensemblGeneid'

  stringLink: (->
    return "http://string-db.org/newstring_cgi/show_network_section.pl?identifier=#{@get('ensemblGeneid')}"
  ).property 'ensemblGeneid'

  ucscLink: (->
    return "http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=#{@get('chr')}:#{@get('startBp')}-#{@get('stopBp')}&dgv=pack&knownGene=pack&omimGene=pack"
  ).property 'chr', 'startBp', 'stopBp'

  entrezLink: (->
    return "http://www.ncbi.nlm.nih.gov/sites/gquery/?term=#{@get('hgncSymbol')}"
  ).property 'hgncSymbol'

  idsLink: (->
    return "http://databases.scilifelab.se:8080/idLookup?data=#{@get('ensemblGeneid')}"
  ).property 'ensemblGeneid'

  omimLink: (->
    return "http://www.omim.org/entry/#{@get('omim.OMIM_ID')}"
  ).property 'omim.OMIM_ID'
