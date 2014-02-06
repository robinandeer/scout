App.VariantController = Ember.ObjectController.extend
  needs: ['family', 'variants', 'application']

  currentPathBinding: 'controllers.application.currentPath'
  userBinding: 'controllers.application.user'

  currentFamilyBinding: 'controllers.family.model'

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

    postComment: (comment) ->
      newComment = App.VariantComment.create
        variantid: @get('id')
        rating: comment.tag
        userComment: comment.body
        email: @get('user.email')

      newComment.save().done((data) =>
        @get('comments').pushObject(newComment)
      ).fail (error) ->
        console.log error

    deleteComment: (commentModel) ->
      # Delete the record from the server
      commentModel.destroy()

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

  sangerData: (->
    # TODO: Fix database check!
    return Ember.Object.create
      family_id: App.family
      variant_link: "https://clinical-db.scilifelab.se/#{@get('currentPath')}"
      database: 'IEM'
      hgnc_symbol: @get 'hgncSymbol'
      chr_pos: @get 'chromPosString'
      amino_change: @get 'hgncTranscriptId'
      gt_call: @get 'gtString'
  ).property('App.Family', 'hgncSymbol', 'chromPosString', 'hgncTranscriptId',
             'gtString', 'currentPath')

  hasCompounds: (->
    return @get('gt.compounds.length') > 1
  ).property 'gt.compounds'

  comments: (->
    return App.VariantComment.find({ record_id: @get('id') })
  ).property 'id'

  variantPriorities: [
    { label: 'Top', id: 'TOP' },
    { label: 'Middle', id: 'MIDDLE' },
    { label: 'Low', id: 'LOW' }
  ]

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
