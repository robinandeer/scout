App.Omim = Ember.Model.extend
  CHR: attr()
  NT_START: attr()
  NT_STOP: attr()
  OMIM_ID: attr()
  OMIM_TITLE: attr()
  SYNDROMS: attr()

App.Omim.adapter = Ember.OmimAdapter.create()
