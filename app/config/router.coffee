module.exports = App.Router.map ->
  @resource 'issues', ->
    @resource 'issue', { path: '/:issue_id' }
    @route 'new'
  @resource 'settings'
  @resource 'institutes'
  @resource 'institute', { path: '/:institute_id' }, ->
    @resource 'family', { path: '/:family_id' }
  @resource 'variants', { path: '/variants/:institute_id/:family_id/:database_id' }, ->
    @resource 'variant', { path: '/:variant_id' }
  @resource 'new'
