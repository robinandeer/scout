OmimAdapter = require 'adapters/omim'

App.Omim = Ember.Model.extend
  CHR: Em.attr()
  NT_START: Em.attr()
  NT_STOP: Em.attr()
  OMIM_ID: Em.attr()
  OMIM_TITLE: Em.attr()
  SYNDROMS: Em.attr()

App.Omim.adapter = OmimAdapter.create()

module.exports = App.Omim
