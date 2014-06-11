module.exports = App.VariantController = Ember.ObjectController.extend
  needs: ['application', 'variants']

  userBinding: 'controllers.application.model'
  instituteIdBinding: 'controllers.variants.instituteId'
  familyIdBinding: 'controllers.variants.familyId'
  databaseIdBinding: 'controllers.variants.database'

  isShowingActivity: yes
  hasActivityObserver: (->
    if @get('hasActivity')
      @set 'isShowingActivity', yes
  ).observes 'hasActivity'

  activityContent: null
  logActivityContent: null

  # +------------------------------------------------------------------+
  # | Actions
  # +------------------------------------------------------------------+
  actions:
    postActivity: ->
      activity = App.Activity.create
        activityId: 'comment'
        context: 'variant'
        contextId: @get 'uniqueId'
        ecosystem: @get 'instituteId'
        userId: @get 'user._id'
        caption: "#{@get('user.firstName')} commented on <a class='activity-caption-link' href='/#{window.location.hash}'>#{@get('id')}</a>"
        content: activityContent

      activity.save().then((newObject) =>
        @get('activities').pushObject(newObject)
      )

    postLogActivity: ->
      activity = App.Activity.create
        activityId: 'comment'
        context: 'family'
        contextId: @get 'familyId'
        ecosystem: @get 'instituteId'
        userId: @get 'user._id'
        caption: "#{@get('user.firstName')} commented on family #{@get('familyId')}"
        content: activityContent

      activity.save().then((newObject) =>
        @get('logActivities').pushObject(newObject)
      )

    deleteActivity: (activity) ->
      # Delete the record from the server
      @get('activities').removeObject(activity)
      activity.deleteRecord()

    submitSangerForm: (modal, event) ->
      payload =
        message: @get('sangerEmailBody')
        hgnc_symbol: @get('hgncSymbol')

      event.returnValue = $.post('/api/v1/sanger', payload)
      .then( (data) =>
        activity = App.Activity.create
          activityId: 'sanger'
          context: 'variant'
          contextId: @get 'uniqueId'
          ecosystem: @get 'instituteId'
          userId: @get 'user._id'
          caption: "#{@get('user.firstName')} ordered Sanger for #{@get('hgncSymbol')} <a class='activity-caption-link' href='/#{window.location.hash}'>#{@get('uniqueId')}</a>"
          content: data.message

        event.returnValue = activity.save().then (newObject) =>
          @get('activities').pushObject newObject
      )

    hideInList: ->
      # Add variant to the list of hidden elements (localStorage)
      @get('model').hide()

    unHideInList: ->
      # Add back variant to the list of hidden elements (localStorage)
      @get('model').unhide()

      return null

  # +------------------------------------------------------------------+
  # | Computed properties
  # +------------------------------------------------------------------+
  gtString: (->
    gtcalls = []
    for gtcall in @get('gtcalls.content')
      gtcalls.push "#{gtcall.get('idn')}: #{gtcall.get('gt')}"

    return gtcalls
  ).property 'gtcalls.@each.idn', 'gtcalls.@each.gt'

  sangerEmailBody: (->
    functions = ("<li>#{func}</li>" for func in @get('variantFunctions'))
    gtcalls = ("<li>#{gtcall}</li>" for gtcall in @get('gtString'))
    body = """
    <p>Case #{@get('familyId')}: <a class='activity-caption-link' href='/#{document.URL}'>#{@get('uniqueId')}</a></p>

    <p>HGNC symbol: #{@get('hgncSymbol')}</p>

    <p>Database: #{@get('databaseId')}</p>

    <p>
      Chr position: <br>
      #{@get('chromosomePositionString')}
    </p>

    <p>
      Amino acid change(s): <br>
      <ul>#{(functions.join('') or '<li>No protein changes</li>')}</ul>
    </p>

    <p>
      GT-call: <br>
      <ul>#{gtcalls.join('')}</ul>
    </p>

    <p>Ordered by: #{@get('user.name')}</p>
    """
  ).property('familyId', 'uniqueId', 'hgncSymbol', 'chromosomePositionString',
             'variantFunctions', 'gtString', 'databaseId', 'user.name')

  predictions: (->
    return ({name: list_id.capitalize(), values: @get(list_id)} for list_id in ['cScores', 'severities', 'frequencies', 'conservations'])
  ).property 'cScores', 'severities', 'frequencies', 'conservations'

  activities: (->
    return App.Activity.find
      context: 'variant'
      context_id: @get('uniqueId')
      ecosystem: @get('instituteId')
  ).property 'uniqueId', 'instituteId'

  logActivities: (->
    return App.Activity.find
      context: 'family'
      context_id: @get('familyId')
      category: @get('logActivityType').toLowerCase()
      ecosystem: @get('instituteId')
  ).property 'familyId', 'logActivityType', 'instituteId'

  hasActivity: (->
    if @get('activities.content.length') > 0
      return yes
    else
      return no
  ).property 'activities'

  logActivityType: (->
    if @get('databaseId') is 'research'
      return 'Research'
    else
      return 'Clinical'
  ).property 'databaseId'

  # +------------------------------------------------------------------+
  # | External resources
  # +------------------------------------------------------------------+
  omim: (->
    if @get 'hgncSymbol'
      return App.Omim.find @get 'hgncSymbol'
  ).property 'hgncSymbol'

  # +------------------------------------------------------------------+
  # | Links
  # +------------------------------------------------------------------+
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
