App.VariantController = Ember.ObjectController.extend
  needs: ['family', 'variants']

  currentFamilyBinding: 'controllers.family.model'
  maxValue: 100
  testValue: 35
  username: 'Anna'

  showGeneName: no

  actions:
    comment: ->
      console.log @get('comment')

    hideInList: ->
      # Add variant to the list of hidden elements (localStorage)
      @get('model').hide()

    unhideInList: ->
      # Add back variant to the list of hidden elements (localStorage)
      @get('model').unhide()

      return null

  adjacentVariant: (direction) ->
    # Get variants controller
    variantsCtrl = @get("controllers.variants")
    indexOf = variantsCtrl.indexOf(@get('model'))

    if direction is 'next'
      # If we are already at the last variant
      if indexOf + 1 is variantsCtrl.get('length')
        model = variantsCtrl.objectAt(0)
      else
        model = variantsCtrl.objectAt(indexOf + 1)

    else if direction is 'prev'
      # If we are at the topmost variant
      if indexOf - 1 < 0
        model = variantsCtrl.objectAt(variantsCtrl.get('length') - 1)
      else
        model = variantsCtrl.objectAt(indexOf - 1)

    else
      # Error
      model = @get('model')

    return model

  hasCompounds: (->
    return @get('gt.compounds.length') > 1
  ).property('gt.compounds')

  comments: (->
    return App.VariantComment.find({ variant_id: @get('id') })
  ).property('id')

  omim: (->
    if @get('hgncSymbol')
      return App.Omim.find @get('hgncSymbol')
  ).property 'hgncSymbol'

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

  igvLink: (->
    return "http://www.broadinstitute.org/igv/projects/current/igv.php?sessionURL=http://localhost:5000/api/v1/variants/#{@get('id')}/igv.xml"
  ).property 'id'
