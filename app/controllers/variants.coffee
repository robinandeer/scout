App.VariantsController = Ember.ArrayController.extend
  needs: ['application', 'family']

  currentPathBinding: 'controllers.application.currentPath'
  currentFamilyModelBinding: 'controllers.family.model'
  filtersBinding: 'controllers.family.filters'

  isShowingModal: no

  staticFilters: Ember.Object.create
    relation: 'LESSER'
    '1000 Genomes': null
    dbsnp129: null
    dbsnp132: null
    esp6500: null
    gene_name: null

  init: ->
    # Force load of family model
    @get('family')

  actions:
    clinicalFilter: ->
      # Set the clinical default query paramaters
      groups =
        inheritence_models:
          'AD': yes
        functional_annotations:
          '-': yes
          'frameshift deletion': yes
          'frameshift insertion': yes
          'nonframeshift deletion': yes
          'nonframeshift insertion': yes
          'nonsynonymous SNV': yes
          'stopgain SNV': yes
          'stoploss SNV': yes
        gene_annotations:
          'exonic': yes
          'splicing': yes

      for key, filters of groups
        for filter, _ of filters
          @activateFilter(key, filter)

      # Set additional filters
      @get('staticFilters').set '1000 Genomes', 0.01

    filter: ->
      activeFilters = {}

      # Get static filters
      staticKeys = ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'gene_name']
      for key, value of @get('staticFilters').getProperties(staticKeys)
        if value
          activeFilters[key] = value

      # Get dynamic filters 
      for group in @get('filters')
        for key in group.get('keys')
          activeFilters[key.get('id')] = key.get('isActive')

      @transitionToRoute queryParams: activeFilters

    clearFilter: ->
      for key in ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'gene_name']
        @get('staticFilters').set(key, null)

      for group in @get('filters')
        for key in group.get('keys')
          key.set('isActive', no)

  activateFilter: (group_id, filter) ->
    filters = @get("filters")
    filters.findBy('id', group_id).get('keys')
           .findBy('id', filter).set('isActive', yes)

  variantLoaded: (->
    if @get('currentPath').match(/variants.variant/)
      return yes
    else
      return no
  ).property('currentPath')

  modalObserver: (->
    if @get('variantLoaded')
      @set 'isShowingModal', no
  ).observes('variantLoaded')
