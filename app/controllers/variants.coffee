App.VariantsController = Ember.ArrayController.extend
  needs: ['application', 'family']

  currentPathBinding: 'controllers.application.currentPath'
  currentFamilyModelBinding: 'controllers.family.model'
  filtersBinding: 'controllers.family.filter.groups'

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
    showPopOver: (variant) ->
      @set 'hoveredVariant', variant
      @set 'isShowingGtCall', yes

    hidePopOver: ->
      @set 'isShowingGtCall', no

    clinicalFilter: ->
      # Set the clinical default query paramaters
      filters = [
        group: 'functional_annotations'
        id: 'functional_annotations_-'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_frameshift deletion'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_frameshift insertion'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_nonframeshift deletion'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_nonframeshift insertion'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_nonsynonymous SNV'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_stopgain SNV'
      ,
        group: 'functional_annotations'
        id: 'functional_annotations_stoploss SNV'
      ,
        group: 'gene_annotations'
        id: 'gene_annotations_exonic'
      ,
        group: 'gene_annotations'
        id: 'gene_annotations_splicing'
      ]
      for filter in filters
        @activateFilter filter.group, filter.id

      # Set additional static filters
      @get('staticFilters').set '1000 Genomes', 0.01

    filter: ->
      activeFilters = {}

      # Get static filters
      staticKeys = ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132',
                    'esp6500', 'gene_name']
      for key, value of @get('staticFilters').getProperties(staticKeys)
        if value
          activeFilters[key] = value

      # Get dynamic filters
      for group in @get('filters')
        for key in group.get('keys')
          activeFilters[key.get('id')] = key.get('isActive')

      @transitionToRoute queryParams: activeFilters

    clearFilter: ->
      for key in ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132',
                  'esp6500', 'gene_name']
        @get('staticFilters').set(key, null)

      for group in @get('filters')
        for key in group.get('keys')
          key.set('isActive', no)

    hideVariant: (variant) ->
      # Add variant to the list of hidden elements (localStorage)
      variant.hide()

  activateFilter: (group_id, filter) ->
    filters = @get("filters")
    filters.findBy('id', group_id).get('keys')
           .findBy('id', filter).set('isActive', yes)

  hoveredVariant: null
  isShowingGtCall: no

  variantLoaded: (->
    if @get('currentPath').match(/variants.variant/)
      return yes
    else
      return no
  ).property('currentPath')

  modalObserver: (->
    if @get('variantLoaded')
      @set 'isShowingGtCall', no
  ).observes('variantLoaded')
