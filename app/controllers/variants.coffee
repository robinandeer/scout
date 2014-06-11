module.exports = App.VariantsController = Ember.ArrayController.extend
  needs: ['application']
  queryParams: ['database', 'relation', 'hbvdb', 'thousand_g', 'dbsnp129',
                'dbsnp132', 'esp6500', 'gene_name', 'priority',
                'inheritence_models_AR_hom', 'inheritence_models_AR_compound',
                'inheritence_models_AR_hom_denovo',
                'inheritence_models_AR_denovo', 'inheritence_models_Na',
                'inheritence_models_X', 'inheritence_models_X_dn',
                'functional_annotations_-',
                'functional_annotations_frameshift deletion',
                'functional_annotations_frameshift insertion',
                'functional_annotations_nonframeshift deletion',
                'functional_annotations_nonframeshift insertion',
                'functional_annotations_nonsynonymous SNV',
                'functional_annotations_stopgain SNV',
                'functional_annotations_stoploss SNV',
                'functional_annotations_synonymous SNV',
                'functional_annotations_unknown',
                'gene_annotations_downstream', 'gene_annotations_exonic',
                'gene_annotations_intergenic', 'gene_annotations_intronic',
                'gene_annotations_ncRNA_exonic',
                'gene_annotations_ncRNA_intronic',
                'gene_annotations_ncRNA_splicing',
                'gene_annotations_ncRNA_UTR3', 'gene_annotations_ncRNA_UTR5',
                'gene_annotations_splicing', 'gene_annotations_upstream',
                'gene_annotations_UTR3', 'gene_annotations_UTR5', 'offset']

  currentPathBinding: 'controllers.application.currentPath'

  # Static content stuff
  isShowingFilters: yes
  relation: 'LESSER'
  familyId: null

  offset: 0
  loadedVariants: 100

  filterObj: Ember.Object.extend
    id: null
    property: no
    name: null
    self: null

    propertyChanged: Em.observer 'property', ->
      @get('self').set @get('id'), @get('property')

  actions:
    doFilter: ->
      # Tell the route to refresh model
      @get('target').send 'filtersWhereUpdated'

    doClearFilters: ->
      @set 'offset', 0

      for group in @get('filterGroups')
        for filter in group.filters
          filter.set 'property'

      filters = ['relation', 'thousand_g', 'dbsnp129', 'dbsnp132', 'esp6500',
                 'gene_name', 'priority', 'hbvdb']
      for filter in filters
        @set filter

    doFilterClinically: ->
      # Set clinical filter properties
      @setProperties
        thousand_g: 0.01
        relation: 'LESSER'

      filters =
        'functional_annotations_-': yes
        'functional_annotations_frameshift deletion': yes
        'functional_annotations_frameshift insertion': yes
        'functional_annotations_nonframeshift deletion': yes
        'functional_annotations_nonframeshift insertion': yes
        'functional_annotations_nonsynonymous SNV': yes
        'functional_annotations_stopgain SNV': yes
        'functional_annotations_stoploss SNV': yes
        'gene_annotations_exonic': yes
        'gene_annotations_splicing': yes

      for group in @get('filterGroups')
        for filter in group.filters
          if filter.id of filters
            filter.set 'property', yes

    loadMore: ->
      # Load and push more variants into the list
      queryParams = jQuery.extend {}, @get('latestQueryParams')
      queryParams['offset'] = parseInt(@get('offset')) + @get('loadedVariants')

      moreVariants = App.Variant.find(
        family_id: @get 'familyId'
        queryParams: queryParams
      )

      moreVariants.addObserver 'isLoaded', @, @loadMoreVariants

    hideVariant: (variant) ->
      # Add variant to the list of hidden elements (localStorage)
      variant.hide()

  loadMoreVariants: (moreVariants) ->
    model = @get('model').pushObjects moreVariants.content
    @incrementProperty 'loadedVariants', 100

    moreVariants.removeObserver 'isLoaded', @, @loadMoreVariants

  researchMode: (->
    return (@get('database') or '').toLowerCase() is 'research'
  ).property 'database'

  filter: (->
    if @get 'familyId'
      return App.Filter.find "#{@get('familyId')},#{@get('instituteId')}"
  ).property 'familyId', 'instituteId'

  # Route checker
  variantIsLoaded: (->
    if @get('currentPath')
      if @get('currentPath').match(/variants.variant/)
        return yes
      else
        return no
    else
      # Switching betweeen variants
      return yes
  ).property('currentPath')

  # +------------------------------------------------------------------+
  # | Filters and query params
  # +------------------------------------------------------------------+
  filterGroups: (->
    groups = Em.A()
    if @get('filter.groups')
      for group in @get('filter.groups')

        filters = Em.A()
        for filter in @get("filter.#{group.id}") or []
          filterObj = @get('filterObj').create
            id: filter
            property: @get filter  # Initial value sync
            name: filter.replace("#{group.id}_", "")
            self: @

          filters.pushObject filterObj

        groups.pushObject Em.Object.create
          id: group.id
          name: group.name
          filters: filters

    return groups
  ).property('filter.functional_annotations.@each',
             'filter.gene_annotations.@each',
             'filter.inheritence_models.@each')
