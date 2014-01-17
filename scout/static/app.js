var App, MomentDate, ReplaceNull, attr, belongsTo, hasMany;

Ember.OmimAdapter = Ember.Object.extend({
  host: "http://localhost:5000/api/v1",
  find: function(record, id) {
    return $.getJSON("" + (this.get('host')) + "/omim/" + id).then(function(data) {
      var syn;
      data.SYNDROMS = (function() {
        var _i, _len, _ref, _results;
        _ref = data.SYNDROMS;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          syn = _ref[_i];
          _results.push(syn.toLowerCase().capitalize());
        }
        return _results;
      })();
      return record.load(id, data);
    });
  }
});

Ember.FEATURES["query-params"] = true;

App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

App.family = "1";

App.ApplicationView = Ember.View.extend({
  classNames: ["app"]
});

Ember.Handlebars.registerBoundHelper("fromNow", function(date) {
  return date.fromNow();
});

Ember.Handlebars.registerBoundHelper("cap", function(str) {
  return str.toLowerCase().capitalize();
});

String.prototype.capitalize = function() {
  var lower_case;
  lower_case = this.toLowerCase();
  return lower_case.charAt(0).toUpperCase() + lower_case.slice(1);
};

App.EmberHintComponent = Ember.Component.extend({
  mouseEnter: function() {
    return this.set('hovered', true);
  },
  mouseLeave: function() {
    return this.set('hovered', false);
  }
});

App.HintBubbleComponent = Ember.Component.extend({
  classNames: ['ember-hint'],
  classNameBindings: ['position', 'hovered:in:out'],
  hovered: (function() {
    return this.get('parentView.hovered');
  }).property('parentView.hovered')
});

App.MyGaugeComponent = Ember.Component.extend({
  classNames: ["gauge"],
  classNameBindings: ["isMaxValueExceeded:exceeded"],
  isMaxValueExceeded: (function() {
    var maxValue, value;
    value = parseInt(this.get("value"), 10);
    maxValue = parseInt(this.get("maxValue"), 10);
    return value > maxValue;
  }).property("value", "maxValue"),
  computedAngle: (function() {
    var angle, maxValue, styles, value;
    value = parseInt(this.get("value"), 10);
    maxValue = parseInt(this.get("maxValue"), 10);
    angle = Math.floor(180 * value / maxValue - 90);
    if (this.get('isMaxValueExceeded')) {
      styles = "-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);";
    } else {
      styles = "-webkit-transform: rotate(" + angle + "deg); -2moz-transform: rotate(" + angle + "deg); -ms-transform: rotate(" + angle + "deg); transform: rotate(" + angle + "deg);";
    }
    return styles;
  }).property("value", "maxValue", "isMaxValueExceeded")
});

App.ApplicationController = Ember.Controller.extend({});

App.AuthController = Ember.Controller.extend({
  model: Ember.Object.create({
    id: 2,
    institute: 'iem',
    email: 'anna.wedell@ki.se',
    name: 'Anna Wedell',
    createdAt: moment()
  })
});

App.FamilyIndexController = Ember.Controller.extend({
  needs: ["family"],
  familyBinding: "controllers.family",
  actions: {
    submit: function() {
      return console.log('Successfully submitted modal');
    },
    cancel: function() {
      return this.toggleProperty('show');
    },
    toggleProperty: function(target) {
      return this.toggleProperty(target);
    }
  },
  comments: (function() {
    return App.FamilyComment.find({
      family_id: this.get("family.id")
    });
  }).property("family.id")
});

App.FamilyController = Ember.ObjectController.extend({
  needs: ["application"],
  currentPathBinding: "controllers.application.currentPath",
  changeFamily: (function() {
    return App.family = this.get('id');
  }).observes('id')
});

App.IssueController = Ember.Controller.extend({
  isWritingMessage: true,
  hasSentMessage: false,
  message: null,
  isConfirmingIssue: false,
  actions: {
    confirmIssue: function() {
      return this.set('isConfirmingIssue', true);
    },
    createIssue: function() {
      var payload,
        _this = this;
      this.set('isConfirmingIssue', false);
      payload = {
        title: this.get('issueTitle'),
        body: this.get('issueBody')
      };
      this.set('isWritingMessage', false);
      return $.post('http://localhost:5000/issues/new', payload, function(data) {
        _this.set('hasSentMessage', true);
        return _this.set('message', data);
      });
    },
    reset: function() {
      this.set('isWritingMessage', true);
      this.set('hasSentMessage', false);
      this.set('title', '');
      this.set('body', '');
      this.set('message', null);
      return this.set('isConfirmingIssue', false);
    }
  }
});

App.VariantController = Ember.ObjectController.extend({
  needs: ['family'],
  currentFamilyBinding: 'controllers.family.model',
  maxValue: 100,
  testValue: 35,
  username: 'Anna',
  showGeneName: false,
  actions: {
    comment: function() {
      return console.log(this.get('comment'));
    },
    order: function() {
      return alert("Consider it done.");
    }
  },
  hasCompounds: (function() {
    return this.get('gt.compounds.length') > 0;
  }).property('gt.compounds'),
  comments: (function() {
    return App.VariantComment.find({
      variant_id: this.get('id')
    });
  }).property('id'),
  omim: (function() {
    return App.Omim.find(this.get('hgncSymbol'));
  }).property('hgncSymbol'),
  gt: (function() {
    return App.GTCall.find(this.get('id'));
  }).property('id'),
  ensemblLink: (function() {
    return "http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=" + (this.get('ensemblGeneid'));
  }).property('ensemblGeneid'),
  hpaLink: (function() {
    return "http://www.proteinatlas.org/search/" + (this.get('ensemblGeneid'));
  }).property('ensemblGeneid'),
  stringLink: (function() {
    return "http://string-db.org/newstring_cgi/show_network_section.pl?identifier=" + (this.get('ensemblGeneid'));
  }).property('ensemblGeneid'),
  ucscLink: (function() {
    return "http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=" + (this.get('chr')) + ":" + (this.get('startBp')) + "-" + (this.get('stopBp')) + "&dgv=pack&knownGene=pack&omimGene=pack";
  }).property('chr', 'startBp', 'stopBp'),
  entrezLink: (function() {
    return "http://www.ncbi.nlm.nih.gov/sites/gquery/?term=" + (this.get('hgncSymbol'));
  }).property('hgncSymbol'),
  idsLink: (function() {
    return "http://databases.scilifelab.se:8080/idLookup?data=" + (this.get('ensemblGeneid'));
  }).property('ensemblGeneid'),
  omimLink: (function() {
    return "http://www.omim.org/entry/" + (this.get('omim.OMIM_ID'));
  }).property('omim.OMIM_ID')
});

App.VariantsController = Ember.ArrayController.extend({
  needs: ['application', 'family'],
  currentPathBinding: 'controllers.application.currentPath',
  currentFamilyModelBinding: 'controllers.family.model',
  filtersBinding: 'controllers.family.filters',
  isShowingModal: false,
  staticFilters: Ember.Object.create({
    relation: 'LESSER',
    '1000 Genomes': null,
    dbsnp129: null,
    dbsnp132: null,
    esp6500: null,
    gene_name: null
  }),
  init: function() {
    return this.get('family');
  },
  actions: {
    clinicalFilter: function() {
      var filter, filters, groups, key, _;
      groups = {
        inheritence_models: {
          'AD': true
        },
        functional_annotations: {
          '-': true,
          'frameshift deletion': true,
          'frameshift insertion': true,
          'nonframeshift deletion': true,
          'nonframeshift insertion': true,
          'nonsynonymous SNV': true,
          'stopgain SNV': true,
          'stoploss SNV': true
        },
        gene_annotations: {
          'exonic': true,
          'splicing': true
        }
      };
      for (key in groups) {
        filters = groups[key];
        for (filter in filters) {
          _ = filters[filter];
          this.activateFilter(key, filter);
        }
      }
      return this.get('staticFilters').set('1000 Genomes', 0.01);
    },
    filter: function() {
      var activeFilters, group, key, staticKeys, value, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      activeFilters = {};
      staticKeys = ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'gene_name'];
      _ref = this.get('staticFilters').getProperties(staticKeys);
      for (key in _ref) {
        value = _ref[key];
        if (value) {
          activeFilters[key] = value;
        }
      }
      _ref1 = this.get('filters');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        group = _ref1[_i];
        _ref2 = group.get('keys');
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          key = _ref2[_j];
          activeFilters[key.get('id')] = key.get('isActive');
        }
      }
      return this.transitionToRoute({
        queryParams: activeFilters
      });
    },
    clearFilter: function() {
      var group, key, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'gene_name'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.get('staticFilters').set(key, null);
      }
      _ref1 = this.get('filters');
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        group = _ref1[_j];
        _results.push((function() {
          var _k, _len2, _ref2, _results1;
          _ref2 = group.get('keys');
          _results1 = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            key = _ref2[_k];
            _results1.push(key.set('isActive', false));
          }
          return _results1;
        })());
      }
      return _results;
    }
  },
  activateFilter: function(group_id, filter) {
    var filters;
    filters = this.get("filters");
    return filters.findBy('id', group_id).get('keys').findBy('id', filter).set('isActive', true);
  },
  variantLoaded: (function() {
    if (this.get('currentPath').match(/variants.variant/)) {
      return true;
    } else {
      return false;
    }
  }).property('currentPath'),
  modalObserver: (function() {
    if (this.get('variantLoaded')) {
      return this.set('isShowingModal', false);
    }
  }).observes('variantLoaded')
});

Ember.Handlebars.registerBoundHelper("capitalize", function(str) {
  if (str) {
    return str.capitalize();
  }
});

Ember.Handlebars.registerBoundHelper("fallback", function(obj, options) {
  var roundedNum;
  if (obj) {
    roundedNum = Math.round(obj * 1000) / 1000;
    if (isNaN(roundedNum)) {
      return obj;
    } else {
      return roundedNum;
    }
  } else {
    return options.fallback || 'undefined';
  }
});

MomentDate = {
  deserialize: function(raw_date) {
    return moment(raw_date, "YYYY-MM-DD");
  },
  serialize: function(date) {
    return date.format("YYYY-MM-DD");
  }
};

App.FamilyComment = Ember.Model.extend({
  id: Em.attr(),
  userComment: Em.attr(),
  logDate: Em.attr(MomentDate),
  logComment: Em.attr(),
  positionInColumn: Em.attr(),
  userName: Em.attr(),
  email: Em.attr(),
  firstLetter: (function() {
    return this.get('userName')[0].capitalize();
  }).property('userName')
});

App.FamilyComment.camelizeKeys = true;

App.FamilyCommentAdapter = Ember.Object.extend({
  host: "http://localhost:5000/api/v1/families",
  findQuery: function(klass, records, params) {
    var url;
    url = "" + (this.get('host')) + "/" + params.family_id + "/comments";
    return $.getJSON(url).then(function(data) {
      var comment, i, updatedData, _i, _len;
      updatedData = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        comment = data[i];
        comment.id = comment.family + i;
        updatedData.push(comment);
      }
      return records.load(klass, updatedData);
    });
  }
});

App.FamilyComment.adapter = App.FamilyCommentAdapter.create();

App.VariantComment = Ember.Model.extend({
  id: Em.attr(),
  rating: Em.attr(),
  commentDate: Em.attr(MomentDate),
  name: Em.attr(),
  variantComment: Em.attr(),
  variantid: Em.attr(),
  email: Em.attr()
});

App.VariantComment.camelizeKeys = true;

App.VariantCommentAdapter = Ember.Object.extend({
  host: "http://localhost:5000/api/v1/variants",
  findQuery: function(klass, records, params) {
    var url;
    url = "" + (this.get('host')) + "/" + params.variant_id + "/comments";
    return $.getJSON(url).then(function(data) {
      var comment, i, updatedData, _i, _len;
      updatedData = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        comment = data[i];
        comment.id = comment.variantid + i;
        updatedData.push(comment);
      }
      return records.load(klass, updatedData);
    });
  }
});

App.VariantComment.adapter = App.VariantCommentAdapter.create();

attr = Ember.attr;

hasMany = Ember.hasMany;

belongsTo = Ember.belongsTo;

MomentDate = {
  deserialize: function(raw_date) {
    return moment(raw_date, "YYYY-MM-DD");
  },
  serialize: function(date) {
    return date.format("YYYY-MM-DD");
  }
};

App.Sample = Ember.Object.extend({
  id: '',
  captureKit: '',
  inheritanceModels: '',
  type: '',
  gender: '',
  affected: (function() {
    return this.get('id').endsWith('A');
  }).property('id')
});

App.Family = Ember.Model.extend({
  id: attr(),
  analyzedDate: attr(MomentDate),
  pedigree: attr(),
  database: attr(),
  functional_annotations: attr(),
  inheritence_models: attr(),
  gene_annotations: attr(),
  filters: (function() {
    var groupName, groups, item, key, keys, name, value, _i, _j, _len, _len1, _ref, _ref1;
    groups = Ember.A();
    if (this.get('inheritence_models')) {
      _ref = ['inheritence_models', 'functional_annotations', 'gene_annotations'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        keys = Ember.A();
        _ref1 = this.get(name);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          for (key in item) {
            value = item[key];
            keys.pushObject(Ember.Object.create({
              id: key,
              isActive: false
            }));
          }
        }
        if (name === 'inheritence_models') {
          groupName = 'Inheritance models';
        } else if (name === 'functional_annotations') {
          groupName = 'Functional annotations';
        } else {
          groupName = 'Gene annotations';
        }
        groups.pushObject(Ember.Object.create({
          id: name,
          name: groupName,
          keys: keys
        }));
      }
    }
    return groups;
  }).property('inheritence_models', 'functional_annotations', 'gene_annotations').cacheable(),
  samples: (function() {
    var data, gender, row, rows, sample, samples, type, _i, _len;
    samples = Em.A();
    rows = $(this.get("pedigree")).find("tr").slice(1);
    for (_i = 0, _len = rows.length; _i < _len; _i++) {
      row = rows[_i];
      data = $(row).find("td");
      if ($(data[0]).text()[0] === "#") {
        break;
      }
      if (parseInt($(data[2]).text())) {
        type = "mother";
      } else if (parseInt($(data[3]).text())) {
        type = "father";
      } else if (parseInt($(data[4]).text())) {
        type = "child";
      }
      if (parseInt($(data[0]).text().slice(-2, -1)) % 2 === 0) {
        gender = "female";
      } else {
        gender = "male";
      }
      sample = App.Sample.create({
        id: $(data[0]).text(),
        captureKit: $(data[data.length - 1]).text().split(";").slice(-1)[0],
        inheritanceModels: $(data[10]).text().split(";"),
        type: type,
        gender: gender
      });
      samples.pushObject(sample);
    }
    return samples;
  }).property("pedigree").cacheable()
});

App.Family.camelizeKeys = true;

App.FamilyAdapter = Ember.Object.extend({
  host: "http://localhost:5000/api/v1",
  url: "",
  find: function(record, id) {
    return $.getJSON("" + (this.get('host')) + "/families/" + id).then(function(data) {
      return record.load(id, data[0]);
    });
  },
  findAll: function(klass, records) {
    return $.getJSON("" + (this.get('host')) + "/families").then(function(data) {
      return records.load(klass, data);
    });
  }
});

App.Family.adapter = App.FamilyAdapter.create();

App.GTCall = Ember.Model.extend({
  gtCalls: attr(),
  compounds: attr()
});

Ember.GTCallAdapter = Ember.Object.extend({
  host: 'http://localhost:5000/api/v1',
  find: function(record, id) {
    return $.getJSON("" + (this.get('host')) + "/variants/" + id + "/gtcall").then(function(data) {
      var call, item, objects;
      objects = {
        gtCalls: (function() {
          var _i, _len, _ref, _results;
          _ref = data.GT;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            call = _ref[_i];
            _results.push(App.Call.create(call));
          }
          return _results;
        })(),
        compounds: (function() {
          var _i, _len, _ref, _results;
          _ref = data.COMPOUNDS;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            _results.push(App.Compound.create(item));
          }
          return _results;
        })()
      };
      return record.load(id, objects);
    });
  }
});

App.GTCall.adapter = Ember.GTCallAdapter.create();

App.Call = Ember.Object.extend({
  filter: null,
  gt: null,
  ad: null,
  gq: null,
  idn: null,
  pl: null,
  variantid: null,
  pk: null,
  dp: null,
  ok: (function() {
    if (this.get('filter') === 'PASS') {
      return true;
    } else {
      return false;
    }
  }).property('filter'),
  gender: (function() {
    var identifier;
    identifier = this.get('idn').split('-')[2].slice(0, -1);
    if (identifier % 2 === 0) {
      return 'female';
    } else {
      return 'male';
    }
  }).property('idn'),
  memberType: (function() {
    var gender, generation;
    generation = this.get('idn').split('-')[1];
    gender = this.get('gender');
    if (generation === 1) {
      if (gender === 'male') {
        return 'boy';
      } else {
        return 'girl';
      }
    } else if (generation === 2) {
      if (gender === 'male') {
        return 'father';
      } else {
        return 'mother';
      }
    } else {
      return 'unknown';
    }
  }).property('idn', 'gender')
});

App.Compound = Ember.Object.extend({
  functional_annotation: null,
  gt: null,
  gene_model: null,
  idn: null,
  gene_annotation: null,
  vpk: null,
  rank_score: null,
  gtCalls: (function() {
    return this.get('gt').split(',');
  }).property('gt'),
  geneModels: (function() {
    return this.get('gene_model').split(';');
  }).property('gene_model'),
  idns: (function() {
    return this.get('idn').split(',');
  }).property('idn')
});

App.Omim = Ember.Model.extend({
  CHR: attr(),
  NT_START: attr(),
  NT_STOP: attr(),
  OMIM_ID: attr(),
  OMIM_TITLE: attr(),
  SYNDROMS: attr()
});

App.Omim.adapter = Ember.OmimAdapter.create();

App.User = Ember.Model.extend({
  id: attr(),
  institute: attr(),
  email: attr(),
  name: attr(),
  createdAt: attr(MomentDate)
});

App.User.camelizeKeys = true;

App.UserAdapter = Ember.Object.extend({
  host: "http://localhost:5000",
  find: function(record, id) {
    return $.getJSON("" + (this.get('host')) + "/user").then(function(data) {
      return record.load(data.id, data);
    });
  }
});

App.User.adapter = App.UserAdapter.create();

ReplaceNull = {
  deserialize: function(value) {
    if (value === 'Na' || value === '-') {
      return null;
    } else {
      return value;
    }
  }
};

App.Variant = Ember.Model.extend({
  id: attr(),
  rankScore: attr(),
  rating: attr(),
  chr: attr(),
  startBp: attr(),
  stopBp: attr(),
  refNt: attr(),
  altNt: attr(),
  hgncSymbol: attr(),
  hgncSynonyms: attr(),
  hgncApprovedName: attr(),
  hgncTranscriptId: attr(),
  ensemblGeneid: attr(),
  siftWholeExome: attr(),
  polyphenDivHuman: attr(),
  gerpWholeExome: attr(),
  mutationTaster: attr(),
  thousandG: attr(),
  dbsnpId: attr(),
  dbsnp: attr(),
  dbsnp129: attr(),
  dbsnp132: attr(),
  esp6500: attr(),
  phylopWholeExome: attr(),
  lrtWholeExome: attr(),
  phastConstElements: attr(),
  gerpElement: attr(),
  hgmd: attr(ReplaceNull),
  omimGeneDesc: attr(),
  diseaseGroup: attr(),
  locationReliability: attr(),
  functionalAnnotation: attr(ReplaceNull),
  snornaMirnaAnnotation: attr(),
  pseudogene: attr(),
  mainLocation: attr(),
  geneAnnotation: attr(),
  otherLocation: attr(),
  gwasCatalog: attr(),
  expressionType: attr(),
  geneModel: attr(ReplaceNull),
  variantCount: attr(),
  database: attr(),
  genomicSuperDups: attr(),
  chrom: (function() {
    if (this.get('chr')) {
      return this.get('chr').slice(3);
    }
  }).property("chr"),
  geneModels: (function() {
    if (this.get('geneModel')) {
      return this.get('geneModel').split(';').slice(0, -1);
    } else {
      return [];
    }
  }).property('geneModel'),
  severity: (function() {
    var sum;
    sum = this.get('polyphenDivHuman') + this.get('siftWholeExome') + this.get("mutationTaster");
    return Math.round(sum / 3 * 100);
  }).property('polyphenDivHuman', 'siftWholeExome', 'mutationTaster'),
  frequency: (function() {
    var sum;
    sum = this.get('lrtWholeExome') + this.get('phylopWholeExome');
    return Math.round(sum / 2 * 100);
  }).property('lrtWholeExome', 'phylopWholeExome')
});

App.Variant.camelizeKeys = true;

App.VariantAdapter = Ember.Object.extend({
  host: 'http://localhost:5000/api/v1',
  buildQueryString: function(queryParams) {
    var key, queryString, value;
    queryString = '?';
    for (key in queryParams) {
      value = queryParams[key];
      if (value === true) {
        queryString += "" + key + "&";
      } else {
        queryString += "" + key + "=" + value + "&";
      }
    }
    return queryString.substring(0, queryString.length - 1);
  },
  find: function(record, id) {
    return $.getJSON("" + (this.get('host')) + "/variants/" + id).then(function(data) {
      return record.load(id, data[0]);
    });
  },
  findQuery: function(klass, records, params) {
    var queryString, url;
    url = "" + (this.get('host')) + "/families/" + params.family_id + "/iem";
    if (params.queryParams) {
      queryString = this.buildQueryString(params.queryParams);
      url += queryString;
    }
    return $.getJSON(url).then(function(data) {
      return records.load(klass, data.slice(0, 100));
    });
  }
});

App.Variant.adapter = App.VariantAdapter.create();

App.Router.map(function() {
  this.resource('dashboard');
  this.resource('issue');
  return this.resource('family', {
    path: 'family/:family_id'
  }, function() {
    this.route('status');
    return this.resource('variants', {
      queryParams: ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'AD', 'AD_denovo', 'AR', 'AR_compound', 'AR_denovo', 'Na', 'X', 'X_denovo', 'priority', '-', 'frameshift deletion', 'frameshift insertion', 'nonframeshift deletion', 'nonframeshift insertion', 'nonsynonymous SNV', 'stopgain SNV', 'stoploss SNV', 'synonymous SNV', 'unknown', 'downstream', 'exonic', 'intergenic', 'intronic', 'ncRNA_exonic', 'ncRNA_intronic', 'ncRNA_splicing', 'ncRNA_UTR3', 'ncRNA_UTR5', 'splicing', 'upstream', 'UTR3', 'UTR5', 'gene_name']
    }, function() {
      return this.resource('variant', {
        path: '/:variant_id'
      });
    });
  });
});

App.FamiliesRoute = Ember.Route.extend({
  model: function() {
    return App.Family.find();
  }
});

App.FamilyRoute = Ember.Route.extend({
  model: function(params) {
    return App.Family.find(params.family_id);
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Family.find();
  }
});

App.VariantRoute = Ember.Route.extend({
  model: function(params) {
    return App.Variant.find(params.variant_id);
  }
});

App.VariantsRoute = Ember.Route.extend({
  model: function(params, queryParams) {
    var family_id;
    family_id = this.modelFor('family').get('id');
    return App.Variant.find({
      family_id: family_id,
      queryParams: queryParams
    });
  }
});

Ember.RadioButton = Ember.View.extend({
  tagName: 'input',
  type: 'radio',
  attributeBindings: ['name', 'type', 'value', 'checked:checked:'],
  click: function() {
    return this.set('selection', this.$().val());
  },
  checked: (function() {
    return this.get('value') === this.get('selection');
  }).property()
});

/*
//@ sourceMappingURL=app.js.map
*/