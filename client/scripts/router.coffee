App.Router.map ->
  @resource 'dashboard' # Status board
  @resource 'issue'
  @resource 'settings'
  @resource 'family', { path: 'family/:family_id' }, ->
    @route 'status'
    @resource 'variants', ->
      @resource 'variant', { path: '/:variant_id' }
