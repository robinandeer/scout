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
      newComment = App.Comment.create
        context: 'variant'
        parentId: @get 'uniqueId'
        email: @get 'user.email'
        body: comment.body
        type: comment.type
        createdAt: moment()

      newComment.save().then((newObject) =>
        @get('comments').pushObject(newObject)
      )

    deleteComment: (commentId) ->
      comment = App.Comment.find(commentId)
      # Delete the record from the server
      @get('comments').removeObject(comment)
      comment.deleteRecord()

  adjacentVariant: (direction) ->
    # Get variants controller
    variantsCtrl = @get 'controllers.variants'
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

  gtString: (->
    gtcalls = []
    for gtcall in @get('gtcalls.content')
      gtcalls.push "#{gtcall.get('idn')}: #{gtcall.get('gt')}"

    return gtcalls.join('\n')
  ).property 'gtcalls.@each.idn', 'gtcalls.@each.gt'

  sangerData: (->
    return Ember.Object.create
      family_id: App.family
      variant_id: @get('uniqueId')
      variant_link: document.URL
      database: @get 'controllers.variants.database'
      hgnc_symbol: @get 'hgncSymbol'
      chr_pos: @get 'chromPosString'
      amino_change: @get 'hgncTranscriptId'
      gt_call: @get 'gtString'
  ).property('App.Family', 'hgncSymbol', 'chromPosString', 'hgncTranscriptId',
             'gtString', 'controllers.variants.database')

  comments: (->
    return App.Comment.find
      context: 'variant'
      parent_id: @get 'uniqueId'
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
    return "https://clinical-db.scilifelab.se:8081/api/v1/variants/#{@get('id')}/igv.xml"
  ).property 'id'

  hgmdLink: (->
    return "http://www.hgmd.cf.ac.uk/ac/gene.php?gene=#{@get('hgncSymbol')}&accession=#{@get('hgmdAccession')}"
  ).property 'hgncSymbol', 'hgmdAccession'
