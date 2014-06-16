(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("adapters/filter", function(exports, require, module) {
module.exports = Ember.FilterAdapter = Ember.Adapter.extend({
  host: '/api/v1',
  find: function(record, id) {
    var familyId, institute, parts, url;
    parts = id.split(',');
    familyId = parts[0];
    institute = parts[1];
    url = "" + (this.get('host')) + "/families/" + familyId + "/filter?institute=" + institute;
    return $.getJSON(url).then(function(data) {
      var filter, filters, type, _i, _j, _len, _len1, _ref, _ref1;
      if (id) {
        _ref = ['functional_annotations', 'gene_annotations', 'inheritence_models'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          type = _ref[_i];
          filters = [];
          _ref1 = data[type];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            filter = _ref1[_j];
            filters.push("" + type + "_" + filter);
          }
          data[type] = filters;
        }
      }
      return record.load(id, data);
    });
  }
});
});

;require.register("adapters/local-storage", function(exports, require, module) {
var keyMaker;

keyMaker = function(klass, id) {
  return "" + klass + "-" + id;
};

module.exports = Ember.LocalStorage = Ember.Object.extend({
  init: function() {
    return this.set('length', localStorage.length);
  },
  exists: function(klass, id) {
    return keyMaker(klass, id) in localStorage;
  },
  find: function(klass, id) {
    var date, value;
    value = localStorage.getItem(keyMaker(klass, id));
    date = moment(value);
    if (date.isValid()) {
      return date;
    } else {
      return value;
    }
  },
  findAll: function(klass) {
    var index, key, results, value, _i, _ref;
    results = Em.A();
    for (index = _i = 0, _ref = localStorage.length; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
      key = localStorage.key(index);
      if ((key || '').startsWith(klass)) {
        value = moment(localStorage.getItem(key));
        if (!value.isValid()) {
          value = localStorage.getItem(key);
        }
        results.pushObject(Em.Object.create({
          id: key.split('-')[1],
          value: value
        }));
      }
    }
    return results;
  },
  deleteAll: function(klass) {
    var key, _, _results;
    _results = [];
    for (key in localStorage) {
      _ = localStorage[key];
      if (key.substring(0, klass.length) === klass) {
        _results.push(delete localStorage[key]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  save: function(klass, id, value) {
    localStorage[keyMaker(klass, id)] = value;
    return this.incrementProperty('length');
  },
  "delete": function(klass, id) {
    delete localStorage[keyMaker(klass, id)];
    return this.incrementProperty('length', -1);
  }
});

Ember.ls = Ember.LocalStorage.create();
});

;require.register("adapters/new-rest", function(exports, require, module) {
module.exports = Ember.NewRESTAdapter = Ember.RESTAdapter.extend({
  buildURL: function(klass, id) {
    var urlRoot;
    urlRoot = Ember.get(klass, 'url');
    if (!urlRoot) {
      throw new Error('Ember.RESTAdapter requires a `url` property to be specified');
    }
    if (!Ember.isEmpty(id)) {
      return "" + urlRoot + "/" + id;
    } else {
      return urlRoot;
    }
  }
});
});

;require.register("adapters/omim", function(exports, require, module) {
module.exports = Ember.OmimAdapter = Ember.Adapter.extend({
  host: '/api/v1',
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
});

;require.register("adapters/variant", function(exports, require, module) {
module.exports = App.VariantAdapter = Ember.Adapter.extend({
  host: '/api/v1',
  buildQueryString: function(queryParams) {
    var key, queryString, value;
    queryString = '?';
    for (key in queryParams) {
      value = queryParams[key];
      if (value) {
        if (value === true) {
          queryString += "" + key + "&";
        } else if (value !== 'undefined') {
          queryString += "" + key + "=" + value + "&";
        }
      }
    }
    return queryString.substring(0, queryString.length - 1);
  },
  find: function(record, id) {
    return $.getJSON("" + (this.get('host')) + "/variants/" + id).then(function(data) {
      return record.load(id, data);
    });
  },
  findQuery: function(klass, records, params) {
    var queryString, url;
    url = "" + (this.get('host')) + "/families/" + params.family_id + "/variants";
    if (params.queryParams) {
      queryString = this.buildQueryString(params.queryParams);
      url += queryString;
    }
    return $.getJSON(url).then(function(data) {
      return records.load(klass, data);
    });
  }
});
});

;require.register("components/a-popover", function(exports, require, module) {
module.exports = App.APopoverComponent = Ember.Component.extend({
  classNames: ['a-popover'],
  classNameBindings: ['direction'],
  triggerdBy: 'click',
  isVisible: false,
  didInsertElement: function() {
    this.$menu = this.$();
    if (this.$menu) {
      this.$parent = this.$menu.parent(':not(script)');
      this.$parent.addClass('a-popover__wrapper');
      if (this.get('triggerdBy') === 'click') {
        this.$parent.on('click', $.proxy(this.toggle, this));
      } else if (this.get('triggerdBy') === 'hover') {
        this.$parent.on('mouseenter', $.proxy(this.enter, this));
        this.$parent.on('mouseleave', $.proxy(this.leave, this));
      }
      return this.set('inserted', true);
    } else {
      return Ember.run.next(this, this.didInsertElement);
    }
  },
  toggle: function(event) {
    if ($(event.target).closest('.a-popover').length === 0) {
      return this.toggleProperty('isVisible');
    }
  },
  enter: function() {
    return this.set('isVisible', true);
  },
  leave: function() {
    return this.set('isVisible', false);
  },
  isVisibleObserver: (function() {
    var _this = this;
    if (this.get('direction')) {
      return Ember.run.scheduleOnce('afterRender', this, function() {
        return _this.$().css(_this.get('direction'), -(_this.$menu.outerWidth()));
      });
    }
  }).observes('isVisible')
});
});

;require.register("components/activity-form", function(exports, require, module) {
module.exports = App.ActivityFormComponent = Ember.Component.extend({
  classNames: ['a-activity__form__wrapper'],
  userId: null,
  content: null,
  currentUserId: null,
  userHasFullAccess: (function() {
    return (this.get('userId') || -1) === this.get('currentUserId');
  }).property('userId', 'currentUserId'),
  writePrompt: 'Write comment here...',
  submitPrompt: 'Submit',
  isEditing: false,
  hasTags: (function() {
    return this.get('tags.length') > 0;
  }).property('tags'),
  isFailingObserver: (function() {
    if (this.get('isFailing')) {
      this.set('writePromptBackup', this.get('writePrompt'));
      return this.set('writePrompt', 'You need to write something here...');
    } else {
      if (this.get('writePromptBackup')) {
        return this.set('writePrompt', this.get('writePromptBackup'));
      }
    }
  }).observes('isFailing'),
  clear: function() {
    this.set('content', null);
    return this.set('isFailing', false);
  },
  actions: {
    cancel: function() {
      this.set('content', this.get('contentBackup'));
      return this.set('isEditing', false);
    },
    submit: function() {
      if (this.get('content')) {
        this.sendAction('onSubmit', {
          createdAt: new Date(),
          content: this.get('content')
        });
        return this.clear();
      } else {
        return this.set('isFailing', true);
      }
    },
    startEditing: function() {
      this.set('contentBackup', this.get('content'));
      return this.set('isEditing', true);
    },
    remove: function() {
      return this.sendAction('onRemove', this.get('activityId'));
    }
  }
});
});

;require.register("config/app", function(exports, require, module) {
var env, options;

env = require('config/environment');

if (env.get('isDevelopment')) {
  options = {
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: false,
    LOG_STACKTRACE_ON_DEPRECATION: true,
    LOG_BINDINGS: true,
    LOG_VIEW_LOOKUPS: true,
    LOG_ACTIVE_GENERATION: true
  };
  Ember.RSVP.configure('onerror', function(error) {
    var message;
    if (Ember.typeOf(error) === 'object') {
      message = (error != null ? error.message : void 0) || 'No error message';
      Ember.Logger.error("RSVP Error: " + message);
      Ember.Logger.error(error != null ? error.stack : void 0);
      return Ember.Logger.error(error != null ? error.object : void 0);
    } else {
      return Ember.Logger.error('RSVP Error', error);
    }
  });
  Ember.STRUCTURED_PROFILE = true;
  Ember.Logger.debug("Running in the %c" + (env.get('name')) + "%c environment", 'color: red;', '');
} else {
  options = {};
}

module.exports = Ember.Application.create(options);
});

;require.register("config/environment", function(exports, require, module) {
var Environment;

window.require.list().filter(function(module) {
  if (new RegExp("^config/environments/").test(module)) {
    return require(module);
  }
});

Environment = Ember.Object.extend({
  isTest: Ember.computed.equal('name', 'test'),
  isDevelopment: Ember.computed.equal('name', 'development'),
  isProduction: Ember.computed.equal('name', 'production')
});

module.exports = Environment.create(window.TAPAS_ENV);
});

;require.register("config/router", function(exports, require, module) {
module.exports = App.Router.map(function() {
  this.resource('issues', function() {
    this.resource('issue', {
      path: '/:issue_id'
    });
    return this.route('new');
  });
  this.resource('settings');
  this.resource('institutes');
  this.resource('institute', {
    path: '/:institute_id'
  }, function() {
    return this.resource('family', {
      path: '/:family_id'
    });
  });
  return this.resource('variants', {
    path: '/variants/:institute_id/:family_id/:database_id'
  }, function() {
    return this.resource('variant', {
      path: '/:variant_id'
    });
  });
});
});

;require.register("controllers/application", function(exports, require, module) {
module.exports = App.ApplicationController = Ember.ObjectController.extend({
  actions: {
    toggleMenu: function() {
      this.toggleProperty('menuIsShowing');
      return false;
    },
    goToSettings: function() {
      return this.transitionToRoute('settings');
    },
    logout: function() {
      return window.location.replace('/logout');
    }
  },
  menuIsShowing: false
});
});

;require.register("controllers/families", function(exports, require, module) {
module.exports = App.FamiliesController = Ember.ArrayController.extend({
  needs: ['institute'],
  sortProperties: ['updateDateRaw'],
  sortAscending: false,
  instituteIdBinding: 'controllers.institute.id',
  actions: {
    hideFamily: function(family) {
      return family.get('model').hide();
    }
  },
  model: (function() {
    return App.Family.find({
      institute: this.get('instituteId')
    });
  }).property('instituteId')
});
});

;require.register("controllers/family", function(exports, require, module) {
module.exports = App.FamilyController = Ember.ObjectController.extend({
  needs: ['application', 'institute'],
  userBinding: 'controllers.application.model',
  instituteIdBinding: 'controllers.institute.id',
  queryParams: ['selectedClinicalActivityType', 'selectedResearchActivityType'],
  actions: {
    postClinicalActivity: function() {
      var activity,
        _this = this;
      activity = App.Activity.create({
        activityId: 'comment',
        context: 'family',
        contextId: this.get('id'),
        ecosystem: this.get('instituteId'),
        userId: this.get('user._id'),
        caption: "" + (this.get('user.firstName')) + " commented on <a class='activity-caption-link' href='/" + window.location.hash + "'>case " + (this.get('id')) + "</a>",
        content: this.get('clinicalActivityContent'),
        category: 'clinical',
        tags: [this.get('selectedClinicalTag')]
      });
      return activity.save().then(function(newObject) {
        return _this.get('clinicalActivities').insertAt(0, newObject);
      });
    },
    deleteActivity: function(category, activity) {
      if (this.isOwner(activity.get('userId'))) {
        this.get("" + category + "Activities").removeObject(activity);
        return activity.deleteRecord();
      } else {
        return alert("You can't delete " + (activity.get('user.givenName')) + "'s comment.");
      }
    },
    postResearchActivity: function() {
      var activity,
        _this = this;
      activity = App.Activity.create({
        activityId: 'comment',
        context: 'family',
        contextId: this.get('id'),
        ecosystem: this.get('instituteId'),
        userId: this.get('user._id'),
        caption: "" + (this.get('user.firstName')) + " commented on <a class='activity-caption-link' href='/" + window.location.hash + "'>case " + (this.get('id')) + "</a>",
        content: this.get('researchActivityContent'),
        category: 'research',
        tags: [this.get('selectedResearchTag')]
      });
      return activity.save().then(function(newObject) {
        return _this.get('researchActivities').insertAt(0, newObject);
      });
    }
  },
  isOwner: function(commentUserId) {
    return commentUserId === this.get('user._id');
  },
  activityTypes: ['finding', 'action', 'conclusion'],
  selectedClinicalActivityType: void 0,
  selectedResearchActivityType: void 0,
  clinicalActivityContent: null,
  researchActivityContent: null,
  selectedClinicalTag: 'finding',
  selectedResearchTag: 'finding',
  clinicalActivities: (function() {
    var queryParams;
    queryParams = {
      context: 'family',
      context_id: this.get('id'),
      category: 'clinical',
      ecosystem: this.get('instituteId')
    };
    return App.Activity.find(queryParams);
  }).property('id', 'instituteId'),
  selectedClinicalActivities: (function() {
    var activities, activityType;
    activities = this.get('clinicalActivities');
    activityType = this.get('selectedClinicalActivityType');
    if (activityType && activityType !== 'undefined') {
      return activities.filterProperty('firstTag', activityType);
    }
    return activities;
  }).property('clinicalActivities.@each', 'selectedClinicalActivityType'),
  researchActivities: (function() {
    var queryParams;
    queryParams = {
      context: 'family',
      context_id: this.get('id'),
      category: 'research',
      ecosystem: this.get('instituteId')
    };
    return App.Activity.find(queryParams);
  }).property('id', 'instituteId'),
  selectedResearchActivities: (function() {
    var activities, activityType;
    activities = this.get('researchActivities');
    activityType = this.get('selectedResearchActivityType');
    if (activityType && activityType !== 'undefined') {
      return activities.filterProperty('firstTag', activityType);
    }
    return activities;
  }).property('researchActivities.@each', 'selectedResearchActivityType')
});
});

;require.register("controllers/index", function(exports, require, module) {
module.exports = App.IndexController = Ember.ObjectController.extend();
});

;require.register("controllers/institute", function(exports, require, module) {
module.exports = App.InstituteController = Ember.ObjectController.extend({
  needs: ['application'],
  currentPathBinding: 'controllers.application.currentPath',
  actions: {
    hideFamily: function(menuItem) {
      return menuItem.get('model').hide();
    }
  },
  openFamilies: (function() {
    return this.get('content').filterProperty('status', 'open');
  }).property('content'),
  familyIsLoaded: (function() {
    if (this.get('currentPath')) {
      if (this.get('currentPath').match(/family/)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }).property('currentPath')
});
});

;require.register("controllers/institute/index", function(exports, require, module) {
module.exports = App.InstituteIndexController = Ember.Controller.extend();
});

;require.register("controllers/issues/new", function(exports, require, module) {
module.exports = App.IssuesNewController = Ember.ObjectController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  isConfirmingSubmit: false,
  actions: {
    saveIssue: function() {
      var _this = this;
      this.set('isConfirmingSubmit', false);
      return this.get('model').save().then(function(new_issue) {
        return _this.transitionToRoute('issue', new_issue);
      });
    }
  }
});
});

;require.register("controllers/settings", function(exports, require, module) {
module.exports = App.SettingsController = Ember.Controller.extend({
  actions: {
    resetHidden: function(klass) {
      return Ember.ls.deleteAll(klass);
    },
    resetItem: function(klass, item_id) {
      Ember.ls["delete"](klass, item_id);
      return false;
    }
  },
  hiddenFamiles: (function() {
    return Ember.ls.findAll('family');
  }).property('Ember.ls.length'),
  hiddenVariants: (function() {
    return Ember.ls.findAll('variant');
  }).property('Ember.ls.length')
});
});

;require.register("controllers/variant", function(exports, require, module) {
module.exports = App.VariantController = Ember.ObjectController.extend({
  needs: ['application', 'variants'],
  userBinding: 'controllers.application.model',
  instituteIdBinding: 'controllers.variants.instituteId',
  familyIdBinding: 'controllers.variants.familyId',
  databaseIdBinding: 'controllers.variants.database',
  isShowingActivity: true,
  hasActivityObserver: (function() {
    if (this.get('hasActivity')) {
      return this.set('isShowingActivity', true);
    }
  }).observes('hasActivity'),
  activityContent: void 0,
  logActivityContent: void 0,
  actions: {
    postActivity: function() {
      var activity,
        _this = this;
      activity = App.Activity.create({
        activityId: 'comment',
        context: 'variant',
        contextId: this.get('uniqueId'),
        ecosystem: this.get('instituteId'),
        userId: this.get('user._id'),
        caption: "" + (this.get('user.firstName')) + " commented on <a class='activity-caption-link' href='/" + window.location.hash + "'>" + (this.get('id')) + "</a>",
        content: this.get('activityContent')
      });
      return activity.save().then(function(newObject) {
        return _this.get('activities').pushObject(newObject);
      });
    },
    postLogActivity: function() {
      var activity,
        _this = this;
      activity = App.Activity.create({
        activityId: 'comment',
        context: 'family',
        contextId: this.get('familyId'),
        ecosystem: this.get('instituteId'),
        userId: this.get('user._id'),
        caption: "" + (this.get('user.firstName')) + " commented on family " + (this.get('familyId')),
        content: this.get('logActivityContent')
      });
      return activity.save().then(function(newObject) {
        return _this.get('logActivities').pushObject(newObject);
      });
    },
    deleteActivity: function(activity) {
      this.get('activities').removeObject(activity);
      return activity.deleteRecord();
    },
    submitSangerForm: function(modal, event) {
      var payload,
        _this = this;
      payload = {
        message: this.get('sangerEmailBody'),
        hgnc_symbol: this.get('hgncSymbol')
      };
      return event.returnValue = $.post('/api/v1/sanger', payload).then(function(data) {
        var activity, attributes, caption;
        caption = "" + (_this.get('user.firstName')) + " ordered Sanger for " + (_this.get('hgncSymbol')) + " <a class='activity-caption-link' href='/" + window.location.hash + "'>" + (_this.get('uniqueId')) + "</a>";
        attributes = {
          activityId: 'sanger',
          context: 'variant',
          contextId: _this.get('uniqueId'),
          ecosystem: _this.get('instituteId'),
          userId: _this.get('user._id'),
          caption: caption,
          content: caption
        };
        activity = App.Activity.create(attributes);
        return event.returnValue = activity.save().then(function(newObject) {
          var logActivity;
          _this.get('activities').pushObject(newObject);
          attributes['context'] = 'family';
          attributes['contextId'] = _this.get('familyId');
          attributes['tags'] = ['action'];
          attributes['category'] = _this.get('logActivityType').toLowerCase();
          logActivity = App.Activity.create(attributes);
          return event.returnValue = logActivity.save().then(function(newLogObject) {
            return _this.get('logActivities').pushObject(newLogObject);
          });
        });
      });
    },
    hideInList: function() {
      return this.get('model').hide();
    },
    unHideInList: function() {
      this.get('model').unhide();
      return null;
    }
  },
  gtString: (function() {
    var gtcall, gtcalls, _i, _len, _ref;
    gtcalls = [];
    _ref = this.get('gtcalls.content');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      gtcall = _ref[_i];
      gtcalls.push("" + (gtcall.get('idn')) + ": " + (gtcall.get('gt')));
    }
    return gtcalls;
  }).property('gtcalls.@each.idn', 'gtcalls.@each.gt'),
  sangerEmailBody: (function() {
    var body, func, functions, gtcall, gtcalls;
    functions = (function() {
      var _i, _len, _ref, _results;
      _ref = this.get('variantFunctions');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        func = _ref[_i];
        _results.push("<li>" + func + "</li>");
      }
      return _results;
    }).call(this);
    gtcalls = (function() {
      var _i, _len, _ref, _results;
      _ref = this.get('gtString');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        gtcall = _ref[_i];
        _results.push("<li>" + gtcall + "</li>");
      }
      return _results;
    }).call(this);
    return body = "<p>Case " + (this.get('familyId')) + ": <a class='activity-caption-link' href='/" + document.URL + "'>" + (this.get('uniqueId')) + "</a></p>\n\n<p>HGNC symbol: " + (this.get('hgncSymbol')) + "</p>\n\n<p>Database: " + (this.get('databaseId')) + "</p>\n\n<p>\n  Chr position: <br>\n  " + (this.get('chromosomePositionString')) + "\n</p>\n\n<p>\n  Amino acid change(s): <br>\n  <ul>" + (functions.join('') || '<li>No protein changes</li>') + "</ul>\n</p>\n\n<p>\n  GT-call: <br>\n  <ul>" + (gtcalls.join('')) + "</ul>\n</p>\n\n<p>Ordered by: " + (this.get('user.name')) + "</p>";
  }).property('familyId', 'uniqueId', 'hgncSymbol', 'chromosomePositionString', 'variantFunctions', 'gtString', 'databaseId', 'user.name'),
  predictions: (function() {
    var list_id;
    return (function() {
      var _i, _len, _ref, _results;
      _ref = ['cScores', 'severities', 'frequencies', 'conservations'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        list_id = _ref[_i];
        _results.push({
          name: list_id.capitalize(),
          values: this.get(list_id)
        });
      }
      return _results;
    }).call(this);
  }).property('cScores', 'severities', 'frequencies', 'conservations'),
  activities: (function() {
    return App.Activity.find({
      context: 'variant',
      context_id: this.get('uniqueId'),
      ecosystem: this.get('instituteId')
    });
  }).property('uniqueId', 'instituteId'),
  logActivities: (function() {
    return App.Activity.find({
      context: 'family',
      context_id: this.get('familyId'),
      category: this.get('logActivityType').toLowerCase(),
      ecosystem: this.get('instituteId')
    });
  }).property('familyId', 'logActivityType', 'instituteId'),
  hasActivity: (function() {
    if (this.get('activities.content.length') > 0) {
      return true;
    } else {
      return false;
    }
  }).property('activities'),
  logActivityType: (function() {
    if (this.get('databaseId') === 'research') {
      return 'Research';
    } else {
      return 'Clinical';
    }
  }).property('databaseId'),
  omim: (function() {
    if (this.get('hgncSymbol')) {
      return App.Omim.find(this.get('hgncSymbol'));
    }
  }).property('hgncSymbol'),
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
  }).property('omim.OMIM_ID'),
  igvLink: (function() {
    return "https://clinical-db.scilifelab.se:8081/api/v1/variants/" + (this.get('id')) + "/igv.xml";
  }).property('id'),
  hgmdLink: (function() {
    return "http://www.hgmd.cf.ac.uk/ac/gene.php?gene=" + (this.get('hgncSymbol')) + "&accession=" + (this.get('hgmdAccession'));
  }).property('hgncSymbol', 'hgmdAccession')
});
});

;require.register("controllers/variants", function(exports, require, module) {
module.exports = App.VariantsController = Ember.ArrayController.extend({
  needs: ['application'],
  queryParams: ['database', 'relation', 'hbvdb', 'thousand_g', 'dbsnp129', 'dbsnp132', 'esp6500', 'gene_name', 'priority', 'inheritence_models_AR_hom', 'inheritence_models_AR_compound', 'inheritence_models_AR_hom_denovo', 'inheritence_models_AR_denovo', 'inheritence_models_Na', 'inheritence_models_X', 'inheritence_models_X_dn', 'functional_annotations_-', 'functional_annotations_frameshift deletion', 'functional_annotations_frameshift insertion', 'functional_annotations_nonframeshift deletion', 'functional_annotations_nonframeshift insertion', 'functional_annotations_nonsynonymous SNV', 'functional_annotations_stopgain SNV', 'functional_annotations_stoploss SNV', 'functional_annotations_synonymous SNV', 'functional_annotations_unknown', 'gene_annotations_downstream', 'gene_annotations_exonic', 'gene_annotations_intergenic', 'gene_annotations_intronic', 'gene_annotations_ncRNA_exonic', 'gene_annotations_ncRNA_intronic', 'gene_annotations_ncRNA_splicing', 'gene_annotations_ncRNA_UTR3', 'gene_annotations_ncRNA_UTR5', 'gene_annotations_splicing', 'gene_annotations_upstream', 'gene_annotations_UTR3', 'gene_annotations_UTR5', 'offset'],
  currentPathBinding: 'controllers.application.currentPath',
  isShowingFilters: true,
  relation: 'LESSER',
  familyId: null,
  offset: 0,
  loadedVariants: 100,
  filterObj: Ember.Object.extend({
    id: null,
    property: false,
    name: null,
    self: null,
    propertyChanged: Em.observer('property', function() {
      return this.get('self').set(this.get('id'), this.get('property'));
    })
  }),
  actions: {
    doFilter: function() {
      return this.get('target').send('filtersWhereUpdated');
    },
    doClearFilters: function() {
      var filter, filters, group, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
      this.set('offset', 0);
      _ref = this.get('filterGroups');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        group = _ref[_i];
        _ref1 = group.filters;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          filter = _ref1[_j];
          filter.set('property');
        }
      }
      filters = ['relation', 'thousand_g', 'dbsnp129', 'dbsnp132', 'esp6500', 'gene_name', 'priority', 'hbvdb'];
      _results = [];
      for (_k = 0, _len2 = filters.length; _k < _len2; _k++) {
        filter = filters[_k];
        _results.push(this.set(filter));
      }
      return _results;
    },
    doFilterClinically: function() {
      var filter, filters, group, _i, _len, _ref, _results;
      this.setProperties({
        thousand_g: 0.01,
        relation: 'LESSER'
      });
      filters = {
        'functional_annotations_-': true,
        'functional_annotations_frameshift deletion': true,
        'functional_annotations_frameshift insertion': true,
        'functional_annotations_nonframeshift deletion': true,
        'functional_annotations_nonframeshift insertion': true,
        'functional_annotations_nonsynonymous SNV': true,
        'functional_annotations_stopgain SNV': true,
        'functional_annotations_stoploss SNV': true,
        'gene_annotations_exonic': true,
        'gene_annotations_splicing': true
      };
      _ref = this.get('filterGroups');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        group = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = group.filters;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            filter = _ref1[_j];
            if (filter.id in filters) {
              _results1.push(filter.set('property', true));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    },
    loadMore: function() {
      var moreVariants, queryParams;
      queryParams = jQuery.extend({}, this.get('latestQueryParams'));
      queryParams['offset'] = parseInt(this.get('offset')) + this.get('loadedVariants');
      moreVariants = App.Variant.find({
        family_id: this.get('familyId'),
        queryParams: queryParams
      });
      return moreVariants.addObserver('isLoaded', this, this.loadMoreVariants);
    },
    hideVariant: function(variant) {
      return variant.hide();
    }
  },
  loadMoreVariants: function(moreVariants) {
    var model;
    model = this.get('model').pushObjects(moreVariants.content);
    this.incrementProperty('loadedVariants', 100);
    return moreVariants.removeObserver('isLoaded', this, this.loadMoreVariants);
  },
  researchMode: (function() {
    return (this.get('database') || '').toLowerCase() === 'research';
  }).property('database'),
  filter: (function() {
    if (this.get('familyId')) {
      return App.Filter.find("" + (this.get('familyId')) + "," + (this.get('instituteId')));
    }
  }).property('familyId', 'instituteId'),
  variantIsLoaded: (function() {
    if (this.get('currentPath')) {
      if (this.get('currentPath').match(/variants.variant/)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }).property('currentPath'),
  filterGroups: (function() {
    var filter, filterObj, filters, group, groups, _i, _j, _len, _len1, _ref, _ref1;
    groups = Em.A();
    if (this.get('filter.groups')) {
      _ref = this.get('filter.groups');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        group = _ref[_i];
        filters = Em.A();
        _ref1 = this.get("filter." + group.id) || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          filter = _ref1[_j];
          filterObj = this.get('filterObj').create({
            id: filter,
            property: this.get(filter),
            name: filter.replace("" + group.id + "_", ""),
            self: this
          });
          filters.pushObject(filterObj);
        }
        groups.pushObject(Em.Object.create({
          id: group.id,
          name: group.name,
          filters: filters
        }));
      }
    }
    return groups;
  }).property('filter.functional_annotations.@each', 'filter.gene_annotations.@each', 'filter.inheritence_models.@each')
});
});

;require.register("helpers/capitalize", function(exports, require, module) {
Ember.Handlebars.registerBoundHelper('capitalize', function(str) {
  if (str) {
    return str.capitalize();
  } else {
    return 'Undefined';
  }
});
});

;require.register("helpers/fallback", function(exports, require, module) {
Ember.Handlebars.registerBoundHelper('fallback', function(obj, options) {
  var roundedNum;
  if (obj) {
    roundedNum = Math.round(obj * 1000) / 1000;
    if (isNaN(roundedNum)) {
      return obj;
    } else {
      return roundedNum;
    }
  } else {
    return options.fallback || 'null';
  }
});
});

;require.register("helpers/from-now", function(exports, require, module) {
Ember.Handlebars.registerBoundHelper('fromNow', function(date) {
  return date.fromNow();
});
});

;require.register("helpers/moment-date", function(exports, require, module) {
module.exports = {
  deserialize: function(raw_date) {
    return moment(raw_date);
  },
  serialize: function(date) {
    return date.toJSON();
  }
};
});

;require.register("helpers/replace-null", function(exports, require, module) {
module.exports = {
  deserialize: function(value) {
    if (value === 'Na' || value === '-') {
      return null;
    } else {
      return value;
    }
  }
};
});

;require.register("helpers/zip", function(exports, require, module) {
var zip;

module.exports = zip = function() {
  var arr, i, length, lengthArray, _i, _results;
  lengthArray = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      arr = arguments[_i];
      _results.push(arr.length);
    }
    return _results;
  }).apply(this, arguments);
  length = Math.min.apply(Math, lengthArray);
  _results = [];
  for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
    _results.push((function() {
      var _j, _len, _results1;
      _results1 = [];
      for (_j = 0, _len = arguments.length; _j < _len; _j++) {
        arr = arguments[_j];
        _results1.push(arr[i]);
      }
      return _results1;
    }).apply(this, arguments));
  }
  return _results;
};
});

;require.register("initialize", function(exports, require, module) {
var folderOrder;

window.App = require('config/app');

require('config/router');

Ember.TextField.reopen({
  attributeBindings: ['autofocus', 'required', 'step']
});

folderOrder = ['initializers', 'utils', 'mixins', 'adapters', 'serializers', 'routes', 'models', 'views', 'controllers', 'helpers', 'templates', 'components'];

folderOrder.forEach(function(folder) {
  return window.require.list().filter(function(module) {
    return new RegExp("^" + folder + "/").test(module);
  }).forEach(function(module) {
    return require(module);
  });
});
});

;require.register("initializers/environment", function(exports, require, module) {
var env;

env = require('config/environment');

module.exports = Ember.Application.initializer({
  name: 'environment',
  initialize: function(container, application) {
    application.register('environment:main', env, {
      instantiate: false,
      singleton: true
    });
    return application.inject('controller', 'env', 'environment:main');
  }
});
});

;require.register("models/activity", function(exports, require, module) {
var ActivityAdapter, MomentDate, NewRESTAdapter;

NewRESTAdapter = require('adapters/new-rest');

MomentDate = require('helpers/moment-date');

App.Activity = Ember.Model.extend({
  _id: Em.attr(),
  activityId: Em.attr(),
  category: Em.attr(),
  context: Em.attr(),
  contextId: Em.attr(),
  ecosystem: Em.attr(),
  userId: Em.attr(),
  user: Em.belongsTo('App.User', {
    key: 'user_id'
  }),
  createdAt: Em.attr(MomentDate),
  updatedAt: Em.attr(MomentDate),
  title: Em.attr(),
  caption: Em.attr(),
  content: Em.attr(),
  tags: Em.attr(),
  firstTag: (function() {
    return this.get('tags.0');
  }).property('tags'),
  entypoIcon: (function() {
    var tag;
    tag = this.get('firstTag');
    if (tag === 'action') {
      return 'new';
    } else if (tag === 'conclusion') {
      return 'check';
    } else {
      return 'search';
    }
  }).property('firstTag')
});

ActivityAdapter = NewRESTAdapter.extend({
  find: function(record, id) {
    var url,
      _this = this;
    url = this.buildURL(record.constructor, id);
    return this.ajax(url).then(function(data) {
      _this.didFind(record, id, data);
      return record;
    });
  },
  didFind: function(record, id, data) {
    Ember.run(record, record.load, id, data.activities);
    return Ember.run(App.User, App.User.load, data.user);
  }
});

App.Activity.camelizeKeys = true;

App.Activity.primaryKey = '_id';

App.Activity.collectionKey = 'activities';

App.Activity.url = '/api/v1/activities';

App.Activity.adapter = ActivityAdapter.create();

module.exports = App.Activity;
});

;require.register("models/compounds", function(exports, require, module) {
var NewRESTAdapter, zip;

NewRESTAdapter = require('adapters/new-rest');

zip = require('helpers/zip');

App.Compound = Ember.Model.extend({
  variant: Em.attr(),
  idn: Em.attr(),
  samples: (function() {
    return (this.get('idn') || '').split(',');
  }).property('idn'),
  gt: Em.attr(),
  gts: (function() {
    return (this.get('gt') || '').split(',');
  }).property('gt'),
  gtcalls: (function() {
    var gtcalls, sample_gt, _i, _len, _ref;
    gtcalls = Em.A();
    _ref = zip(this.get('samples'), this.get('gts'));
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      sample_gt = _ref[_i];
      gtcalls.pushObject(Em.Object.create({
        sampleId: sample_gt[0],
        genotype: sample_gt[1]
      }));
    }
    return gtcalls.sortBy('sampleId');
  }).property('samples', 'gts'),
  rankScore: Em.attr(),
  combinedScore: Em.attr(),
  functionalAnnotation: Em.attr(),
  geneAnnotation: Em.attr({
    defaultValue: ''
  }),
  geneAnnotations: (function() {
    return this.get('geneAnnotation').split(';');
  }).property('geneAnnotation'),
  geneModel: Em.attr({
    defaultValue: ''
  }),
  geneModels: (function() {
    return this.get('geneModel').split(';');
  }).property('geneModel')
});

App.Compound.camelizeKeys = true;

App.Compound.primaryKey = 'variant';

App.Compound.collectionKey = 'compounds';

App.Compound.url = '/api/v1/compounds';

App.Compound.adapter = NewRESTAdapter.create();

module.exports = App.Compound;
});

;require.register("models/family", function(exports, require, module) {
var MomentDate, NewRESTAdapter,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

NewRESTAdapter = require('adapters/new-rest');

MomentDate = require('helpers/moment-date');

App.Family = Ember.Model.extend({
  id: Em.attr(),
  family_id: Em.attr(),
  familyId: (function() {
    return parseInt(this.get('id'));
  }).property('id'),
  updateDate: Em.attr(MomentDate),
  updateDateRaw: (function() {
    return this.get('updateDate').toDate();
  }).property('updateDate'),
  database: Em.attr(),
  databases: (function() {
    return (this.get('database') || '').split(',');
  }).property('database'),
  firstDatabase: (function() {
    return this.get('databases.0');
  }).property('databases'),
  samples: Em.attr(),
  isResearch: (function() {
    return __indexOf.call(this.get('databases') || '', 'research') >= 0;
  }).property('databases'),
  hide: function() {
    var _this = this;
    this.set('isDirtyHidden', true);
    Ember.run.later(this, function() {
      return _this.set('isDirtyHidden', false);
    }, 1);
    return Ember.ls.save('family', this.get('id'), moment().format('YYYY-MM-DD'));
  },
  unhide: function() {
    var _this = this;
    this.set('isDirtyHidden', true);
    Ember.run.later(this, function() {
      return _this.set('isDirtyHidden', false);
    }, 1);
    return Ember.ls["delete"]('family', this.get('id'));
  },
  isDirtyHidden: false,
  isHidden: (function() {
    return Ember.ls.exists('family', this.get('id'));
  }).property('id', 'hide', 'unhide', 'isDirtyHidden'),
  hiddenAt: (function() {
    return Ember.ls.find('family', this.get('id'));
  }).property('id')
});

App.Family.camelizeKeys = true;

App.Family.primaryKey = 'id';

App.Family.url = '/api/v1/families';

App.Family.adapter = NewRESTAdapter.create();

module.exports = App.Family;
});

;require.register("models/filter", function(exports, require, module) {
var FilterAdapter;

FilterAdapter = require('adapters/filter');

App.Filter = Ember.Model.extend({
  id: Em.attr(),
  clinical_db_gene_annotation: Em.attr(),
  functional_annotations: Em.attr(),
  gene_annotations: Em.attr(),
  inheritence_models: Em.attr(),
  groups: [
    {
      id: 'functional_annotations',
      name: 'Functional annotations'
    }, {
      id: 'gene_annotations',
      name: 'Gene annotations'
    }, {
      id: 'inheritence_models',
      name: 'Inheritence models'
    }
  ]
});

App.Filter.adapter = FilterAdapter.create();

module.exports = App.Filter;
});

;require.register("models/gt-call", function(exports, require, module) {
var NewRESTAdapter;

NewRESTAdapter = require('adapters/new-rest');

App.GtCall = Ember.Model.extend({
  pk: Em.attr(),
  variantid: Em.attr(),
  variantId: (function() {
    return this.get('variantid');
  }).property('variantid'),
  idn: Em.attr({
    defaultValue: ''
  }),
  sampleId: (function() {
    return this.get('idn');
  }).property('idn'),
  filter: Em.attr(),
  gt: Em.attr(),
  gq: Em.attr(),
  dp: Em.attr(),
  pl: Em.attr({
    defaultValue: ''
  }),
  pls: (function() {
    return this.get('pl').split(',');
  }).property('pl'),
  ad: Em.attr({
    defaultValue: ''
  }),
  ads: (function() {
    return this.get('ad').split(',');
  }).property('ad'),
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

App.GtCall.camelizeKeys = true;

App.GtCall.primaryKey = 'pk';

App.GtCall.collectionKey = 'gtcalls';

App.GtCall.url = '/api/v1/gtcalls';

App.GtCall.adapter = NewRESTAdapter.create();

module.exports = App.GtCall;
});

;require.register("models/issue", function(exports, require, module) {
var MomentDate, NewRESTAdapter;

NewRESTAdapter = require('adapters/new-rest');

MomentDate = require('helpers/moment-date');

App.Issue = Ember.Model.extend({
  id: Em.attr(),
  title: Em.attr(),
  body: Em.attr(),
  html: Em.attr(),
  createdAt: Em.attr(MomentDate),
  url: Em.attr()
});

App.Issue.camelizeKeys = true;

App.Issue.collectionKey = 'issues';

App.Issue.url = '/api/v1/issues';

App.Issue.adapter = NewRESTAdapter.create();

module.exports = App.Issue;
});

;require.register("models/omim", function(exports, require, module) {
var OmimAdapter;

OmimAdapter = require('adapters/omim');

App.Omim = Ember.Model.extend({
  CHR: Em.attr(),
  NT_START: Em.attr(),
  NT_STOP: Em.attr(),
  OMIM_ID: Em.attr(),
  OMIM_TITLE: Em.attr(),
  SYNDROMS: Em.attr()
});

App.Omim.adapter = OmimAdapter.create();

module.exports = App.Omim;
});

;require.register("models/other-family", function(exports, require, module) {
var NewRESTAdapter;

NewRESTAdapter = require('adapters/new-rest');

App.OtherFamily = Ember.Model.extend({
  pk: Em.attr(),
  family: Em.attr(),
  id: (function() {
    return this.get('family');
  }).property('family')
});

App.OtherFamily.camelizeKeys = true;

App.OtherFamily.collectionKey = 'other_families';

App.OtherFamily.url = '/api/v1/other_families';

App.OtherFamily.adapter = NewRESTAdapter.create();

module.exports = App.OtherFamily;
});

;require.register("models/user", function(exports, require, module) {
var MomentDate, NewRESTAdapter;

NewRESTAdapter = require('adapters/new-rest');

MomentDate = require('helpers/moment-date');

App.User = Ember.Model.extend({
  id: Em.attr(),
  _id: Em.attr(),
  givenName: Em.attr(),
  familyName: Em.attr(),
  name: Em.attr(),
  locale: Em.attr(),
  email: Em.attr(),
  createdAt: Em.attr(MomentDate),
  loggedInAt: Em.attr(MomentDate),
  googleId: Em.attr(),
  institutes: Em.attr(),
  accessToken: Em.attr(),
  firstName: (function() {
    var email;
    email = this.get('email');
    return email.slice(0, email.indexOf('.')).capitalize();
  }).property('email')
});

App.User.camelizeKeys = true;

App.User.primaryKey = '_id';

App.User.collectionKey = 'users';

App.User.url = '/api/v1/users';

App.User.adapter = NewRESTAdapter.create();

module.exports = App.User;
});

;require.register("models/variant", function(exports, require, module) {
var ReplaceNull, VariantAdapter,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

VariantAdapter = require('adapters/variant');

ReplaceNull = require('helpers/replace-null');

App.Variant = Ember.Model.extend({
  id: Em.attr(),
  individualRankScore: Em.attr(),
  rankScore: Em.attr(),
  GTCallFilter: Em.attr(),
  clinicalDbGeneAnnotation: Em.attr(),
  chr: Em.attr({
    defaultValue: ''
  }),
  chromosome: (function() {
    return (this.get('chr') || '').replace('chr', '');
  }).property('chr'),
  chromosomePositionString: (function() {
    return "" + (this.get('chr')) + ": " + (this.get('startBp')) + "-" + (this.get('stopBp'));
  }).property('chr', 'startBp', 'stopBp'),
  startBp: Em.attr(),
  stopBp: Em.attr(),
  isMultiBase: (function() {
    return this.get('startBp') !== this.get('stopBp');
  }).property('startBp', 'stopBp'),
  refNt: Em.attr(),
  altNt: Em.attr(),
  uniqueId: (function() {
    return "" + (this.get('chr')) + "-" + (this.get('startBp')) + "-" + (this.get('stopBp')) + "-" + (this.get('altNt'));
  }).property('chr', 'startBp', 'stopBp', 'altNt'),
  hgncSymbol: Em.attr(),
  hgncSynonyms: Em.attr({
    defaultValue: ''
  }),
  hgncSynonymsString: (function() {
    return (this.get('hgncSynonyms') || '').split(';').slice(0, -1).join(', ');
  }).property('hgncSynonyms'),
  hgncApprovedName: Em.attr(),
  ensemblGeneid: Em.attr({
    defaultValue: ''
  }),
  ensemblGeneIdString: (function() {
    return (this.get('ensemblGeneid') || '').split(';').join(', ');
  }).property('ensemblGeneid'),
  hgncTranscriptId: Em.attr({
    defaultValue: ''
  }),
  variantFunctions: (function() {
    return (this.get('hgncTranscriptId') || '').split(',').slice(0, -1);
  }).property('hgncTranscriptId'),
  siftWholeExome: Em.attr(),
  polyphenDivHuman: Em.attr(),
  gerpWholeExome: Em.attr(),
  mutationTaster: Em.attr(),
  severities: (function() {
    var properties, property, severities, _i, _len;
    severities = [];
    properties = ['siftWholeExome', 'polyphenDivHuman', 'gerpWholeExome', 'mutationTaster'];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      property = properties[_i];
      if (this.get(property)) {
        severities.push({
          id: property,
          name: property.capitalize(),
          value: this.get(property)
        });
      }
    }
    return severities;
  }).property('siftWholeExome', 'polyphenDivHuman', 'gerpWholeExome', 'mutationTaster'),
  scaledCscoreThousandG: Em.attr(),
  unscaledCscoreThousandG: Em.attr(),
  unscaledCscoreSnv: Em.attr(),
  scaledCscoreSnv: Em.attr(),
  cScores: (function() {
    var properties, property, scores, _i, _len;
    scores = [];
    properties = ['unscaledCscoreThousandG', 'scaledCscoreThousandG', 'unscaledCscoreSnv', 'scaledCscoreSnv'];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      property = properties[_i];
      if (this.get(property)) {
        scores.push({
          id: property,
          name: property.capitalize(),
          value: this.get(property)
        });
      }
    }
    return scores;
  }).property('unscaledCscoreThousandG', 'scaledCscoreThousandG', 'unscaledCscoreSnv', 'scaledCscoreSnv'),
  thousandG: Em.attr(),
  dbsnpId: Em.attr(),
  dbsnp: Em.attr({
    defaultValue: ''
  }),
  dbsnpFlag: (function() {
    return (this.get('dbsnp') || '').replace('snp137', '');
  }).property('dbsnp'),
  dbsnp129: Em.attr(),
  dbsnp132: Em.attr(),
  esp6500: Em.attr(),
  variantCount: Em.attr(),
  hbvdb: Em.attr(),
  hbvdbHuman: (function() {
    var freq;
    freq = this.get('variantCount');
    if (freq) {
      if (freq > 10) {
        return 'is-common';
      }
      return 'is-found';
    }
    return 'is-not-found';
  }).property('variantCount'),
  frequencies: (function() {
    var frequencies, property, _i, _len, _ref;
    frequencies = [];
    _ref = ['thousandG', 'esp6500', 'dbsnp129', 'variantCount'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      if (this.get(property)) {
        frequencies.push({
          id: property,
          name: property.capitalize(),
          value: this.get(property)
        });
      }
    }
    return frequencies;
  }).property('thousandG', 'esp6500', 'dbsnp129', 'variantCount'),
  phylopWholeExome: Em.attr(),
  lrtWholeExome: Em.attr(),
  phastConstElements: Em.attr(),
  phastConstElementsScore: (function() {
    return parseInt((this.get('phastConstElements') || '').split(';')[0].replace(/Score=/, ''));
  }).property('phastConstElements'),
  gerpElement: Em.attr(),
  polyphenVarHuman: Em.attr(),
  conservations: (function() {
    var conservations, property, _i, _len, _ref;
    conservations = [];
    _ref = ['phylopWholeExome', 'lrtWholeExome', 'phastConstElementsScore', 'gerpElement', 'polyphenVarHuman'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      property = _ref[_i];
      if (this.get(property)) {
        conservations.push({
          id: property,
          name: property.capitalize(),
          value: this.get(property)
        });
      }
    }
    return conservations;
  }).property('phylopWholeExome', 'lrtWholeExome', 'phastConstElementsScore', 'gerpElement', 'polyphenVarHuman'),
  hgmd: Em.attr(ReplaceNull),
  hgmdAccession: Em.attr(),
  hgmdVariantType: Em.attr(),
  hgmdVariantPmid: Em.attr({
    defaultValue: ''
  }),
  hgmdVariantPmidLinks: (function() {
    var links, pmid, _i, _len, _ref;
    links = Em.A();
    _ref = (this.get('hgmdVariantPmid') || '').split(';').slice(0, -1);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pmid = _ref[_i];
      links.pushObject({
        id: pmid,
        link: "http://www.ncbi.nlm.nih.gov/pubmed/" + pmid
      });
    }
    return links;
  }).property('hgmdVariantPmid'),
  omimGeneDesc: Em.attr(),
  diseaseGroup: Em.attr(),
  geneModel: Em.attr(ReplaceNull),
  hasCompounds: (function() {
    return (this.get('geneModel') || '').indexOf('compound') !== -1;
  }).property('geneModel'),
  geneModels: (function() {
    var delimiter, modelString, sliceEnd;
    modelString = this.get('geneModel');
    if (modelString) {
      delimiter = ':';
      sliceEnd = 10;
      if (__indexOf.call(modelString, ';') >= 0) {
        delimiter = ';';
        sliceEnd = -1;
      }
      return modelString.split(delimiter).slice(0, sliceEnd);
    } else {
      return [];
    }
  }).property('geneModel'),
  geneModelString: (function() {
    return this.get('geneModels').join(' – ');
  }).property('geneModels'),
  diseaseGeneModel: Em.attr({
    defaultValue: ''
  }),
  diseaseGeneModels: (function() {
    return (this.get('diseaseGeneModel') || '').split(',');
  }).property('diseaseGeneModel'),
  otherFamilies: (function() {
    if (this.get('isFoundInOtherFamilies')) {
      return App.OtherFamily.find({
        variant_id: this.get('id')
      });
    } else {
      return Em.A();
    }
  }).property('id', 'isFoundInOtherFamilies'),
  isFoundInOtherFamilies: (function() {
    return this.get('variantCount') > 1;
  }).property('variantCount'),
  otherFamiliesCount: (function() {
    return this.get('variantCount') - 1;
  }).property('variantCount'),
  gtcalls: (function() {
    return App.GtCall.find({
      variant_id: this.get('id')
    });
  }).property('id'),
  gtcallsBySampleId: (function() {
    return this.get('gtcalls').sortBy('sampleId');
  }).property('gtcalls.@each.id'),
  gtData: (function() {
    var data, gts;
    gts = Em.A();
    this.get('gtcallsBySampleId').forEach(function(gtcall) {
      return gts.pushObject(gtcall.get('gt'));
    });
    data = {
      combinedScore: '-',
      rankScore: this.get('rankScore'),
      gtcalls: gts,
      geneModel: this.get('geneModel'),
      geneAnnotation: this.get('geneAnnotation'),
      functionalAnnotation: this.get('functionalAnnotation')
    };
    return data;
  }).property('gtcalls.length', 'rankScore', 'geneModel', 'geneAnnotation', 'functionalAnnotation'),
  compounds: (function() {
    return App.Compound.find({
      variant_id: this.get('id')
    });
  }).property('id'),
  locationReliability: Em.attr(),
  functionalAnnotation: Em.attr(ReplaceNull),
  snornaMirnaAnnotation: Em.attr(),
  pseudogene: Em.attr(),
  mainLocation: Em.attr(),
  geneAnnotation: Em.attr(),
  isProbablyBenign: (function() {
    return this.get('geneAnnotation') === 'intronic';
  }).property('geneAnnotation'),
  otherLocation: Em.attr(),
  gwasCatalog: Em.attr(),
  expressionType: Em.attr(),
  genomicSuperDups: Em.attr(),
  hide: function() {
    var _this = this;
    this.set('isDirtyHidden', true);
    Ember.run.later(this, function() {
      return _this.set('isDirtyHidden', false);
    }, 1);
    return Ember.ls.save('variant', this.get('id'), this.get('uniqueId'));
  },
  unhide: function() {
    var _this = this;
    this.set('isDirtyHidden', true);
    Ember.run.later(this, function() {
      return _this.set('isDirtyHidden', false);
    }, 1);
    return Ember.ls["delete"]('variant', this.get('id'));
  },
  isDirtyHidden: false,
  isHidden: (function() {
    return Ember.ls.exists('variant', this.get('id'));
  }).property('id', 'hide', 'unhide', 'isDirtyHidden'),
  hiddenAt: (function() {
    return Ember.ls.find('variant', this.get('id'));
  }).property('id')
});

App.Variant.camelizeKeys = true;

App.Variant.adapter = VariantAdapter.create();

module.exports = App.Variant;
});

;require.register("routes/application", function(exports, require, module) {
module.exports = App.ApplicationRoute = Ember.Route.extend({
  model: function(params) {
    return App.User.find('current');
  }
});
});

;require.register("routes/families", function(exports, require, module) {
module.exports = App.FamiliesRoute = Ember.Route.extend({
  model: function(params) {
    return App.Family.find({
      institute: params.institute_id
    });
  }
});
});

;require.register("routes/familiy", function(exports, require, module) {
module.exports = App.FamilyRoute = Ember.Route.extend({
  model: function(params) {
    return App.Family.find(params.family_id);
  },
  redirect: function() {
    var family;
    family = this.controllerFor('family');
    if (family.get('content')) {
      return family.setProperties({
        clinicalActivityContent: null,
        researchActivityContent: null
      });
    }
  }
});
});

;require.register("routes/index", function(exports, require, module) {
module.exports = App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.User.find('current');
  },
  afterModel: function(user, transition) {
    var _this = this;
    return user.addObserver('isLoaded', this, function() {
      var institutes;
      institutes = _this.model().get('institutes');
      if (institutes.get('length') === 1) {
        return _this.transitionTo('institute', institutes[0]);
      }
    });
  }
});
});

;require.register("routes/institute", function(exports, require, module) {
module.exports = App.InstituteRoute = Ember.Route.extend({
  model: function(params) {
    return {
      id: params.institute_id
    };
  },
  renderTemplate: function() {
    this.render('institute');
    return this.render('families', {
      into: 'institute',
      outlet: 'second-panel'
    });
  }
});
});

;require.register("routes/issue", function(exports, require, module) {
module.exports = App.IssueRoute = Ember.Route.extend({
  model: function(params) {
    return App.Issue.find(params.issue_id);
  }
});
});

;require.register("routes/issues", function(exports, require, module) {
module.exports = App.IssuesRoute = Ember.Route.extend({
  model: function() {
    return App.Issue.find();
  }
});
});

;require.register("routes/issues/new", function(exports, require, module) {
module.exports = App.IssuesNewRoute = Ember.Route.extend({
  model: function() {
    return App.Issue.create();
  }
});
});

;require.register("routes/variant", function(exports, require, module) {
module.exports = App.VariantRoute = Ember.Route.extend({
  model: function(params) {
    return App.Variant.find(params.variant_id);
  },
  redirect: function() {
    var variant;
    variant = this.controllerFor('variant');
    if (variant.get('content')) {
      return variant.setProperties({
        activityContent: null,
        logActivityContent: null
      });
    }
  }
});
});

;require.register("routes/variants", function(exports, require, module) {
module.exports = App.VariantsRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var newFamilyId, variantsController;
    variantsController = this.controllerFor('variants');
    newFamilyId = transition.params.variants.family_id;
    if ((variantsController.get('familyId') || newFamilyId) !== newFamilyId) {
      return variantsController.send('doClearFilters');
    }
  },
  model: function(params) {
    var newFamilyId, queryParams, variantsController;
    this.set('params', params);
    variantsController = this.controllerFor('variants');
    newFamilyId = params.family_id;
    if ((variantsController.get('familyId') || newFamilyId) !== newFamilyId) {
      queryParams = {};
    } else {
      queryParams = jQuery.extend({}, params);
    }
    $.extend(queryParams, {
      institute_id: params.institute_id,
      institute: params.institute_id,
      family_id: null,
      database: params.database_id,
      database_id: null
    });
    return App.Variant.find({
      family_id: params.family_id,
      queryParams: queryParams
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    return controller.setProperties({
      instituteId: this.get('params.institute_id'),
      familyId: this.get('params.family_id'),
      database: this.get('params.database_id')
    });
  },
  actions: {
    filtersWhereUpdated: function() {
      return this.refresh();
    }
  }
});
});

;require.register("templates/application", function(exports, require, module) {
module.exports = Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"a-button__body\">Institutes</div>\n      ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"a-button__body\">Issues</div>\n      ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-trigger'] || (depth0 && depth0['ic-menu-trigger'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-trigger", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("expand-right")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-list'] || (depth0 && depth0['ic-menu-list'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-list", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"a-button__icon entypo user a-icon\"></div>\n        <div class=\"a-button__body\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "model.name", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n      ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n            Login\n          ");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n        ");
  hashContexts = {'on-select': depth0};
  hashTypes = {'on-select': "STRING"};
  options = {hash:{
    'on-select': ("goToSettings")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-item'] || (depth0 && depth0['ic-menu-item'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashContexts = {'on-select': depth0};
  hashTypes = {'on-select': "STRING"};
  options = {hash:{
    'on-select': ("logout")
  },inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-item'] || (depth0 && depth0['ic-menu-item'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("Settings");
  }

function program14(depth0,data) {
  
  
  data.buffer.push("<a href=\"/logout\">Logout</a>");
  }

  data.buffer.push("<div class=\"a-layout--vertical\">\n  <header class=\"a-toolbar slim bb\">\n    <nav class=\"a-toolbar__group a-button__group\">\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "issues", options) : helperMissing.call(depth0, "link-to", "issues", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </nav>\n\n    <div class=\"logo\">Scout</div>\n\n    ");
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  if (stack2 = helpers['ic-menu']) { stack2 = stack2.call(depth0, options); }
  else { stack2 = (depth0 && depth0['ic-menu']); stack2 = typeof stack2 === functionType ? stack2.call(depth0, options) : stack2; }
  hashTypes = {};
  hashContexts = {};
  if (!helpers['ic-menu']) { stack2 = blockHelperMissing.call(depth0, 'ic-menu', options); }
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </header>\n\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});
});

;require.register("templates/components/a-popover", function(exports, require, module) {
module.exports = Ember.TEMPLATES['components/a-popover'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n<div class=\"ui-popover__content\">\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isVisible", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
});

;require.register("templates/components/activity-form", function(exports, require, module) {
module.exports = Ember.TEMPLATES['components/activity-form'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      ");
  hashContexts = {'content': depth0,'valueBinding': depth0};
  hashTypes = {'content': "ID",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("tagOptions"),
    'valueBinding': ("selectedTag")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-activity__form\">\n  ");
  hashContexts = {'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'classBinding': depth0};
  hashTypes = {'valueBinding': "STRING",'placeholder': "ID",'classNames': "STRING",'classBinding': "STRING"};
  options = {hash:{
    'valueBinding': ("content"),
    'placeholder': ("writePrompt"),
    'classNames': ("a-textarea"),
    'classBinding': ("isFailing")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || (depth0 && depth0.textarea)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n\n  <div class=\"a-bar--space-between\">\n    <button class=\"a-button mr--listed\" type=\"submit\">\n      <span class=\"a-button__icon a-icon\">&#59160;</span>\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "submitPrompt", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </button>\n    \n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "tagOptions", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n</form>\n");
  return buffer;
  
});
});

;require.register("templates/families", function(exports, require, module) {
module.exports = Ember.TEMPLATES['families'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        \n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "family.isHidden", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n\n          <div class=\"a-card a-bar--space-between regular mb\">\n          ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-bar__item")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "family", "family", options) : helperMissing.call(depth0, "link-to", "family", "family", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n          ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-bar__item")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variants", "instituteId", "family.id", "family.firstDatabase", options) : helperMissing.call(depth0, "link-to", "variants", "instituteId", "family.id", "family.firstDatabase", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n          <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("familyIsLoaded:a-bar__item--half:a-bar__item familyIsLoaded:a-bar--end:a-bar--space-between :stretch-self")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "familyIsLoaded", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n            ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button--naked")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu'] || (depth0 && depth0['ic-menu'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n          </div>\n\n        ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "family.id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n            Variants\n          ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n              <div class=\"a-button--naked mr\">\n                <small>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "family.updateDate", options) : helperMissing.call(depth0, "fromNow", "family.updateDate", options))));
  data.buffer.push("</small>\n              </div>\n            ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n              ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button__icon entypo three-dots a-icon")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-trigger'] || (depth0 && depth0['ic-menu-trigger'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-trigger", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("expand-right")
  },inverse:self.noop,fn:self.program(12, program12, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-list'] || (depth0 && depth0['ic-menu-list'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-list", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                ");
  hashContexts = {'on-select': depth0,'model': depth0};
  hashTypes = {'on-select': "STRING",'model': "ID"};
  options = {hash:{
    'on-select': ("hideFamily"),
    'model': ("family")
  },inverse:self.noop,fn:self.program(13, program13, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-item'] || (depth0 && depth0['ic-menu-item'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashContexts = {'on-select': depth0,'model': depth0};
  hashTypes = {'on-select': "STRING",'model': "ID"};
  options = {hash:{
    'on-select': ("moveFamily"),
    'model': ("family")
  },inverse:self.noop,fn:self.program(15, program15, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-item'] || (depth0 && depth0['ic-menu-item'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                ");
  hashContexts = {'on-select': depth0,'model': depth0};
  hashTypes = {'on-select': "STRING",'model': "ID"};
  options = {hash:{
    'on-select': ("closeFamily"),
    'model': ("family")
  },inverse:self.noop,fn:self.program(17, program17, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-menu-item'] || (depth0 && depth0['ic-menu-item'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-menu-item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              ");
  return buffer;
  }
function program13(depth0,data) {
  
  
  data.buffer.push("\n                  Archive\n                ");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("\n                  Move to research\n                ");
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\n                  Mark as closed\n                ");
  }

function program19(depth0,data) {
  
  
  data.buffer.push("\n        <h2 class=\"text-center\">Loading...</h2>\n      ");
  }

  data.buffer.push("<div class=\"a-layout__wrapper a-layout__panel--full br--listed\">\n\n  <div class=\"a-layout--vertical\">\n\n    <div class=\"header-style slim bb text-center\">Open cases</div>\n    \n    <div class=\"a-layout__panel--full is-scrollable loose\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "family", "in", "controller", {hash:{},inverse:self.program(19, program19, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n\n  </div>\n\n</div>");
  return buffer;
  
});
});

;require.register("templates/family", function(exports, require, module) {
module.exports = Ember.TEMPLATES['family'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n              Go to variants\n            ");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <div class=\"a-list__item mr--listed\">\n              <div class=\"a-card a-list\">\n                <div class=\"a-list__item--header slim\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sample.idn", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                <div class=\"a-list__item small slim\">Sex: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sample.sex", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                <div class=\"a-list__item small slim\">\n                  Phenotype: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sample.phenotype", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </div>\n                <div class=\"a-list__item small slim\">\n                  Inheritance models: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sample.inheritance_model", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </div>\n              </div>\n            </div>\n          ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                    <div class=\"a-activity__feed mb--big\">\n                      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "activity", "in", "selectedClinicalActivities", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </div>\n                  ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                        <div class=\"a-activity__divider\">\n                          <div class=\"a-activity__divider__time\">\n                            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "activity.createdAt", options) : helperMissing.call(depth0, "fromNow", "activity.createdAt", options))));
  data.buffer.push("\n                          </div>\n                        </div>\n\n                        <div class=\"a-activity__wrapper\">\n                          <div class=\"a-activity\">\n                            <div class=\"full-width\">\n                              <div class=\"a-bar--space-between regular--stretched\">\n                                <div class=\"a-activity__caption a-bar\">\n                                  <span ");
  hashContexts = {'class': depth0,'title': depth0};
  hashTypes = {'class': "STRING",'title': "STRING"};
  options = {hash:{
    'class': (":a-icon :entypo activity.entypoIcon :mr--slim"),
    'title': ("activity.firstTag")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></span>\n                                  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" commented\n                                </div>\n\n                                <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteActivity", "clinical", "activity", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button--naked\">\n                                  <div class=\"a-button__icon entypo circled-cross a-icon\"></div>\n                                </div>\n                              </div>\n\n                              <div class=\"a-activity__body regular--stretched\">\n                                ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.content", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\n                    <p class=\"text-center\">No activity.</p>\n                  ");
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n          <div class=\"a-layout__panel--full a-layout__wrapper br--listed\">\n            <div class=\"a-layout--vertical\">\n              <div class=\"a-layout__panel a-toolbar header-style slim\">\n                <div>Research activity</div>\n                <div>\n                  <small>Show only</small>\n                  ");
  hashContexts = {'prompt': depth0,'content': depth0,'valueBinding': depth0};
  hashTypes = {'prompt': "STRING",'content': "ID",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'prompt': ("Select activity type"),
    'content': ("activityTypes"),
    'valueBinding': ("selectedResearchActivityType")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              </div>\n\n              <div class=\"a-layout__wrapper a-layout__panel--full\">\n  \n                <div class=\"a-layout--vertical\">\n\n                  <div class=\"a-layout__panel--full is-scrollable bb\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "selectedResearchActivities", {hash:{},inverse:self.program(14, program14, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                  </div>\n\n                  <div class=\"a-layout__panel is-fixed regular\">\n                    ");
  hashContexts = {'contentBinding': depth0,'onSubmit': depth0,'tagOptions': depth0,'selectedTagBinding': depth0};
  hashTypes = {'contentBinding': "STRING",'onSubmit': "STRING",'tagOptions': "ID",'selectedTagBinding': "STRING"};
  options = {hash:{
    'contentBinding': ("researchActivityContent"),
    'onSubmit': ("postResearchActivity"),
    'tagOptions': ("activityTypes"),
    'selectedTagBinding': ("selectedResearchTag")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['activity-form'] || (depth0 && depth0['activity-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "activity-form", options))));
  data.buffer.push("\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n          </div>\n        ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                      <div class=\"a-activity__feed mb--big\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "activity", "in", "selectedResearchActivities", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      </div>\n                    ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                          <div class=\"a-activity__divider\">\n                            <div class=\"a-activity__divider__time\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "activity.createdAt", options) : helperMissing.call(depth0, "fromNow", "activity.createdAt", options))));
  data.buffer.push("\n                            </div>\n                          </div>\n\n                          <div class=\"a-activity__wrapper\">\n                            <div class=\"a-activity\">\n                              <div class=\"full-width\">\n                                <div class=\"a-bar--space-between regular--stretched\">\n                                  <div class=\"a-activity__caption a-bar\">\n                                    <span ");
  hashContexts = {'class': depth0,'title': depth0};
  hashTypes = {'class': "STRING",'title': "STRING"};
  options = {hash:{
    'class': (":a-icon :entypo activity.entypoIcon :mr--slim"),
    'title': ("activity.firstTag")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></span>\n                                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" commented\n                                  </div>\n\n                                  <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteActivity", "research", "activity", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button--naked\">\n                                    <div class=\"a-button__icon entypo circled-cross a-icon\"></div>\n                                  </div>\n                                </div>\n\n                                <div class=\"a-activity__body regular--stretched\">\n                                  ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.content", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        ");
  return buffer;
  }

function program14(depth0,data) {
  
  
  data.buffer.push("\n                      <p class=\"text-center\">No activity.</p>\n                    ");
  }

  data.buffer.push("<div class=\"a-layout__panel--double a-layout__wrapper\">\n  <div class=\"a-layout--vertical\">\n    <div class=\"a-layout__panel--full bb\">\n      <div class=\"variant-page-wrapper\">\n        <div class=\"a-toolbar header-style slim b\">\n          <div class=\"a-button\">\n            <div class=\"a-button__icon entypo pencil a-icon\"></div>\n            Edit case\n          </div>\n\n          <div class=\"a-button\">\n            <div class=\"a-button__icon entypo add-user a-icon\"></div>\n            <div>Add sample</div>\n          </div>\n\n          <div class=\"a-button\">\n            <div class=\"a-button__icon entypo archive a-icon\"></div>\n            <div>Archive case</div>\n          </div>\n        </div>\n\n        <div class=\"a-card a-bar--space-between mb--big\">\n          <div class=\"a-bar__item br--listed center__wrapper regular\">\n            <span class=\"a-icon entypo users mr--slim\"></span>\n            Case ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "familyId", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </div>\n\n          <div class=\"a-bar__item br--listed center__wrapper regular\">\n            <span class=\"a-icon entypo clock mr--slim\"></span>\n            Last updated ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "updateDate", options) : helperMissing.call(depth0, "fromNow", "updateDate", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"a-bar__item br--listed center__wrapper regular\">\n            <span class=\"a-icon entypo numbered-list mr--slim\"></span>\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variants", "instituteId", "model.id", "model.firstDatabase", options) : helperMissing.call(depth0, "link-to", "variants", "instituteId", "model.id", "model.firstDatabase", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n        </div>\n\n        <div class=\"a-list--horizontal a-well regular mb--big\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "sample", "in", "samples", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n      </div>\n    </div>\n\n    <div class=\"a-layout__panel--full a-layout__wrapper\">\n      <div class=\"a-layout\">\n        <div class=\"a-layout__panel--full a-layout__wrapper br--listed\">\n          <div class=\"a-layout--vertical\">\n            <div class=\"a-layout__panel a-toolbar header-style slim\">\n              <div>Clinical activity</div>\n              <div>\n                <small>Show only</small>\n                ");
  hashContexts = {'prompt': depth0,'content': depth0,'valueBinding': depth0};
  hashTypes = {'prompt': "STRING",'content': "ID",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'prompt': ("Select activity type"),
    'content': ("activityTypes"),
    'valueBinding': ("selectedClinicalActivityType")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n            </div>\n\n            <div class=\"a-layout__wrapper a-layout__panel--full\">\n  \n              <div class=\"a-layout--vertical\">\n\n                <div class=\"a-layout__panel--full is-scrollable bb\">\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "selectedClinicalActivities", {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n\n                <div class=\"a-layout__panel is-fixed regular\">\n                  ");
  hashContexts = {'contentBinding': depth0,'onSubmit': depth0,'tagOptions': depth0,'selectedTagBinding': depth0};
  hashTypes = {'contentBinding': "STRING",'onSubmit': "STRING",'tagOptions': "ID",'selectedTagBinding': "STRING"};
  options = {hash:{
    'contentBinding': ("clinicalActivityContent"),
    'onSubmit': ("postClinicalActivity"),
    'tagOptions': ("activityTypes"),
    'selectedTagBinding': ("selectedClinicalTag")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['activity-form'] || (depth0 && depth0['activity-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "activity-form", options))));
  data.buffer.push("\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n        </div>\n        \n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isResearch", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
});
});

;require.register("templates/index", function(exports, require, module) {
module.exports = Ember.TEMPLATES['index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-card is-clickable loose mr--listed")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "institute", "institute", options) : helperMissing.call(depth0, "link-to", "institute", "institute", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <div class=\"mb\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "institute", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n      <div class=\"a-progress\">\n        <div class=\"a-progress__bar\" style=\"width: 0%\">0%</div>\n      </div>\n    ");
  return buffer;
  }

  data.buffer.push("<main class=\"a-layout__panel--full center__wrapper\">\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "institute", "in", "model.institutes", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</main>\n");
  return buffer;
  
});
});

;require.register("templates/institute", function(exports, require, module) {
module.exports = Ember.TEMPLATES['institute'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"mb\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n      ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <div class=\"a-progress mb\">\n        <div class=\"a-progress__bar\" style=\"width: 0%\">0%</div>\n      </div>\n\n      <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createFamily", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button regular\">\n        <div class=\"a-button__icon entypo plus a-icon\"></div>\n        <div class=\"a-button__body\">Open new case</div>\n      </div>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout__wrapper a-layout__panel--full\">\n\n  <div class=\"a-layout\">\n\n    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("familyIsLoaded:a-layout__panel--minimal:a-layout__panel--full :loose :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n      ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "institute", "id", options) : helperMissing.call(depth0, "link-to", "institute", "id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n      ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "familyIsLoaded", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet || (depth0 && depth0.outlet)),stack1 ? stack1.call(depth0, "second-panel", options) : helperMissing.call(depth0, "outlet", "second-panel", options))));
  data.buffer.push("\n\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n  </div>\n\n</div>\n");
  return buffer;
  
});
});

;require.register("templates/issue", function(exports, require, module) {
module.exports = Ember.TEMPLATES['issue'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"center__wrapper\">\n      <img src=\"/static/img/loader.gif\">\n    </div>\n  ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    <h2>\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("url")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n      <small>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "createdAt", options) : helperMissing.call(depth0, "fromNow", "createdAt", options))));
  data.buffer.push("</small>\n    </h2>\n    ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "html", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  return buffer;
  }

  data.buffer.push("<div class=\"issue-box\">\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "model.isLoading", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});
});

;require.register("templates/issues", function(exports, require, module) {
module.exports = Ember.TEMPLATES['issues'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"a-button__body\">Submit new issue</div>\n          ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-list__item regular")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "issue", "issue.id", options) : helperMissing.call(depth0, "link-to", "issue", "issue.id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "issue.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n              <small>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "issue.createdAt", options) : helperMissing.call(depth0, "fromNow", "issue.createdAt", options))));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout__panel--full a-layout__panel__wrapper\">\n  <div class=\"a-layout\">\n    <div class=\"a-layout__panel--full a-layout__wrapper br--listed\">\n      \n      <div class=\"a-layout--vertical\">\n        <div class=\"a-layout__panel slim header-style bb\">\n          ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "issues.new", options) : helperMissing.call(depth0, "link-to", "issues.new", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n\n        <div class=\"a-layout__panel--full a-list\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "issue", "in", "model", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n      </div>\n    </div>\n    \n    <div class=\"a-layout__panel--double is-scrollable\">\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
});
});

;require.register("templates/issues/new", function(exports, require, module) {
module.exports = Ember.TEMPLATES['issues/new'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n      <button type=\"submit\" class=\"a-button\">\n        <div class=\"a-button__icon a-icon\">&#59140;</div>\n        <div class=\"a-button__body\">Are you sure?</div>\n      </button>\n    ");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isConfirmingSubmit", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n        <div class=\"a-button__icon a-icon\">&#128319;</div>\n        <div class=\"a-button__body\">Send</div>\n      </button>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"issue-box center__wrapper\">\n  <form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveIssue", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <h2>Submit new issue</h2>\n    ");
  hashContexts = {'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'valueBinding': ("model.title"),
    'placeholder': ("Title"),
    'classNames': ("a-form__input mb"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  hashContexts = {'valueBinding': depth0,'placeholder': depth0,'classNames': depth0};
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING"};
  options = {hash:{
    'valueBinding': ("model.body"),
    'placeholder': ("Describe your problem/request"),
    'classNames': ("a-textarea mb")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || (depth0 && depth0.textarea)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isConfirmingSubmit", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </form>\n</div>");
  return buffer;
  
});
});

;require.register("templates/settings", function(exports, require, module) {
module.exports = Ember.TEMPLATES['settings'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n        <div class=\"a-list__item a-bar--space-between bb loose\">\n\n          <div>Case ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "family.id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n\n          <div>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "family.value", options) : helperMissing.call(depth0, "fromNow", "family.value", options))));
  data.buffer.push("</div>\n\n          <div class=\"a-button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetItem", "family", "family.id", {hash:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            Unarchive\n          </div>\n\n        </div>\n      ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"a-list__item a-bar--space-between bb loose\">\n\n          <div>Variant ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n\n          <div class=\"a-button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetItem", "variant", "variant.id", {hash:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            Unarchive\n          </div>\n\n        </div>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout__panel--full a-layout__wrapper\">\n  <div class=\"a-layout\">\n\n    <div class=\"a-layout__panel--full a-list br\">\n\n      <div class=\"a-list__item header-style bb slim text-center\">\n        Archived families\n      </div>\n\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "family", "in", "hiddenFamiles", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n      <div class=\"a-list__item a-bar--center loose\">\n        <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetHidden", "family", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n          <div class=\"a-button__body\">Unarchive all families</div>\n        </div>\n      </div>\n\n      <div class=\"a-list__item text-center bb slim\">\n        <small>You might have to reload the browser for the unarchived items to return.</small>\n      </div>\n\n    </div>\n\n    <div class=\"a-layout__panel--full a-list br\">\n\n      <div class=\"a-list__item header-style bb slim text-center\">\n        Archived variants\n      </div>\n\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "variant", "in", "hiddenVariants", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n      <div class=\"a-list__item a-bar--center loose\">\n        <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetHidden", "variant", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n          <div class=\"a-button__body\">Unarchive all variants</div>\n        </div>\n      </div>\n\n      <div class=\"a-list__item text-center bb slim\">\n        <small>You might have to reload the browser for the unarchived items to return.</small>\n      </div>\n\n    </div>\n\n  </div>\n</div>");
  return buffer;
  
});
});

;require.register("templates/variant", function(exports, require, module) {
module.exports = Ember.TEMPLATES['variant'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            <div>Variants</div>\n          ");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unHideInList", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n            <div class=\"a-button__icon a-icon entypo archive\"></div>\n            <div class=\"a-button__body\">Unarchive</div>\n          </div>\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideInList", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n            <div class=\"a-button__icon a-icon entypo archive\"></div>\n            <div class=\"a-button__body\">Archive</div>\n          </div>\n        ");
  return buffer;
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n          <div class=\"a-button__icon a-icon entypo cart\"></div>\n          <div class=\"a-button__body\">Sanger</div>\n        ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n              Hide\n            ");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\n              Show\n            ");
  }

function program13(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("-");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "stopBp", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.capitalize || (depth0 && depth0.capitalize)),stack1 ? stack1.call(depth0, "functionalAnnotation", options) : helperMissing.call(depth0, "capitalize", "functionalAnnotation", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\n          No functional annotation\n        ");
  }

function program19(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <strong class=\"big-font\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "hgncSymbol", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong> <small>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "hgncSynonymsString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n              ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.capitalize || (depth0 && depth0.capitalize)),stack1 ? stack1.call(depth0, "hgncApprovedName", options) : helperMissing.call(depth0, "capitalize", "hgncApprovedName", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item--header center__wrapper slim\">\n            <span class=\"entypo users\"></span>\n            Other familes\n          </div>\n          <div class=\"max-height-135 is-scrollable\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "family", "in", "otherFamilies", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n        ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n              <div class=\"a-list__item slim\">\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variant", "family.pk", options) : helperMissing.call(depth0, "link-to", "variant", "family.pk", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </div>\n            ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "family.id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item slim\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n        ");
  return buffer;
  }

function program29(depth0,data) {
  
  
  data.buffer.push("\n          <div class=\"a-list__item slim\">No predicted protein changes.</div>\n        ");
  }

function program31(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item--header text-center slim\">Disease group:</div>\n          <div class=\"a-list__item slim\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "diseaseGroup", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n        ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item--header text-center logo--omim slim\">OMIM</div>\n          <div class=\"max-height-135 is-scrollable\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "syndrome", "in", "omim.SYNDROMS", {hash:{},inverse:self.noop,fn:self.program(34, program34, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n        ");
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <div class=\"a-list__item slim\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "syndrome", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n            ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item--header text-center slim\">HGMD</div>\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "link", "in", "hgmdVariantPmidLinks", {hash:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program37(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "ID"};
  options = {hash:{
    'href': ("link.link")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-list__item is-clickable slim\" target=\"_blank\">\n              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "link.id", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </a>\n          ");
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        <div class=\"a-bar__item mr--listed\">\n          <div class=\"a-card a-list\">\n            <div class=\"a-list__item--header text-center slim\">\n              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "prediction.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            </div>\n\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "property", "in", "prediction.values", {hash:{},inverse:self.program(43, program43, data),fn:self.program(40, program40, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n        </div>\n      ");
  return buffer;
  }
function program40(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n              ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "property.value", {hash:{},inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program41(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                <div class=\"a-list__item a-bar--space-between\">\n                  <div class=\"slim mr dotdotdot\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "property.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                  </div>\n                  <div class=\"slim\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "property.value", options) : helperMissing.call(depth0, "fallback", "property.value", options))));
  data.buffer.push("</div>\n                </div>\n              ");
  return buffer;
  }

function program43(depth0,data) {
  
  
  data.buffer.push("\n              <div class=\"a-list__item slim\">\n                <span class=\"mr\">No predictions.</span>\n              </div>\n            ");
  }

function program45(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <tr class=\"a-table__row\">\n                <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.idn", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.gt", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.ad", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.pl", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n                <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.gq", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              </tr>\n            ");
  return buffer;
  }

function program47(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item slim\">\n            <div class=\"dotdotdot big-font\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          </div>\n        ");
  return buffer;
  }

function program49(depth0,data) {
  
  
  data.buffer.push("\n          <div class=\"a-list__item slim\">No models.</div>\n        ");
  }

function program51(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-list__item slim\">\n            <div class=\"dotdotdot\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n          </div>\n        ");
  return buffer;
  }

function program53(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      <table class=\"a-table small mb--big\">\n        <thead class=\"a-table__head\">\n          <tr class=\"a-table__row\">\n            <th class=\"a-table__cell--header\">Combined score</th>\n            <th class=\"a-table__cell--header\">Rank score</th>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "gtcall", "in", "compounds.content.0.gtcalls", {hash:{},inverse:self.noop,fn:self.program(54, program54, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <th class=\"a-table__cell--header\">Inheritance models</th>\n            <th class=\"a-table__cell--header\">Gene annotations</th>\n            <th class=\"a-table__cell--header\">Functional annotation</th>\n          </tr>\n        </thead>\n\n        <tbody class=\"a-table__body\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "compound", "in", "compounds", {hash:{},inverse:self.noop,fn:self.program(56, program56, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tbody>\n      </table>\n    ");
  return buffer;
  }
function program54(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <th class=\"a-table__cell--header\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.sampleId", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</th>\n            ");
  return buffer;
  }

function program56(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n            <tr class=\"a-table__row\">\n              <td class=\"a-table__cell text-center\">\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.combinedScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n              </td>\n              <td class=\"text-center\">\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(57, program57, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variant", "compound.variant", options) : helperMissing.call(depth0, "link-to", "variant", "compound.variant", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              </td>\n              ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "gtcall", "in", "compound.gtcalls", {hash:{},inverse:self.noop,fn:self.program(59, program59, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.geneModel", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.geneAnnotation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              <td class=\"a-table__cell\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.functionalAnnotation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n            </tr>\n          ");
  return buffer;
  }
function program57(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.rankScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  return buffer;
  }

function program59(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <td class=\"a-table__cell text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.genotype", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n              ");
  return buffer;
  }

function program61(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n  ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("mb")
  },inverse:self.noop,fn:self.program(62, program62, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-modal-title'] || (depth0 && depth0['ic-modal-title'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-modal-title", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  \n  <div class=\"email__wrapper mb\">\n    ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sangerEmailBody", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n\n  <div class=\"center__wrapper\">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "saving", {hash:{},inverse:self.program(66, program66, data),fn:self.program(64, program64, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n");
  return buffer;
  }
function program62(depth0,data) {
  
  
  data.buffer.push("Order Sanger sequencing");
  }

function program64(depth0,data) {
  
  
  data.buffer.push("\n      sending ...\n    ");
  }

function program66(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n      <div class=\"a-button__group\">\n        ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(67, program67, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-modal-trigger'] || (depth0 && depth0['ic-modal-trigger'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-modal-trigger", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        <button type=\"submit\" class=\"a-button\">\n          <div class=\"a-button__icon a-icon entypo paper-plane\"></div>\n          <div class=\"a-button__body\">Send</div>\n        </button>\n      </div>\n    ");
  return buffer;
  }
function program67(depth0,data) {
  
  
  data.buffer.push("\n          <div class=\"a-button__icon a-icon entypo circled-cross\"></div>\n          <div class=\"a-button__body\">Cancel</div>\n        ");
  }

function program69(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n  <div class=\"a-layout__panel--full a-layout__wrapper\">\n    <div class=\"a-layout--vertical\">\n\n      <div class=\"a-layout__panel is-fixed slim header-style text-center bb\">\n        Variant Activity\n      </div>\n\n      <div class=\"a-layout__panel--full is-scrollable small loose bb\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "activities", {hash:{},inverse:self.noop,fn:self.program(70, program70, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  hashContexts = {'content': depth0,'onSubmit': depth0};
  hashTypes = {'content': "ID",'onSubmit': "STRING"};
  options = {hash:{
    'content': ("activityContent"),
    'onSubmit': ("postActivity")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['activity-form'] || (depth0 && depth0['activity-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "activity-form", options))));
  data.buffer.push("\n      </div>\n\n      <div class=\"a-layout__panel is-fixed slim header-style text-center bb\">\n         ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "logActivityType", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" Activity\n      </div>\n\n      <div class=\"a-layout__panel--full is-scrollable small loose\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "logActivities", {hash:{},inverse:self.noop,fn:self.program(73, program73, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n        ");
  hashContexts = {'content': depth0,'onSubmit': depth0};
  hashTypes = {'content': "ID",'onSubmit': "STRING"};
  options = {hash:{
    'content': ("logActivityContent"),
    'onSubmit': ("postLogActivity")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['activity-form'] || (depth0 && depth0['activity-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "activity-form", options))));
  data.buffer.push("\n      </div>      \n\n    </div>\n  </div>\n");
  return buffer;
  }
function program70(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n          <div class=\"a-activity__feed mb--big\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "activity", "in", "activities", {hash:{},inverse:self.noop,fn:self.program(71, program71, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n        ");
  return buffer;
  }
function program71(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n\n              <div class=\"a-activity__divider\">\n                <div class=\"a-activity__divider__time\">\n                  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "activity.createdAt", options) : helperMissing.call(depth0, "fromNow", "activity.createdAt", options))));
  data.buffer.push("\n                </div>\n              </div>\n\n              <div class=\"a-activity__wrapper\">\n                <div class=\"a-activity\">\n                  <div class=\"full-width\">\n                    <div class=\"a-bar--space-between regular--stretched\">\n                      <div class=\"a-activity__caption\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" commented\n                      </div>\n\n                      <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteActivity", "activity", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button--naked\">\n                        <div class=\"a-button__icon entypo circled-cross a-icon\"></div>\n                      </div>\n                    </div>\n\n                    <div class=\"a-activity__body regular\">\n                      ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.content", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n            ");
  return buffer;
  }

function program73(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n          <div class=\"a-activity__feed mb--big\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "activity", "in", "logActivities", {hash:{},inverse:self.noop,fn:self.program(74, program74, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n\n        ");
  return buffer;
  }
function program74(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n\n              <div class=\"a-activity__divider\">\n                <div class=\"a-activity__divider__time\">\n                  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fromNow || (depth0 && depth0.fromNow)),stack1 ? stack1.call(depth0, "activity.createdAt", options) : helperMissing.call(depth0, "fromNow", "activity.createdAt", options))));
  data.buffer.push("\n                </div>\n              </div>\n\n              <div class=\"a-activity__wrapper\">\n                <div class=\"a-activity\">\n                  <div class=\"full-width\">\n                    <div class=\"a-bar--space-between regular--stretched\">\n                      <div class=\"a-activity__caption\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.user.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" commented\n                      </div>\n                    </div>\n\n                    <div class=\"a-activity__body regular\">\n                      ");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activity.content", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"variant-page a-layout__panel--double is-scrollable br--listed\">\n  <div class=\"variant-page-wrapper\">\n    <div class=\"a-toolbar header-style slim b\">\n      <div class=\"a-toolbar__group a-button__group\">\n        <div class=\"a-button\">\n          <div class=\"a-button__icon a-icon entypo chevron-left\"></div>\n          ");
  hashContexts = {'title': depth0};
  hashTypes = {'title': "STRING"};
  options = {hash:{
    'title': ("Back to all variants")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variants", "instituteId", "familyId", "databaseId", options) : helperMissing.call(depth0, "link-to", "variants", "instituteId", "familyId", "databaseId", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isHidden", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n\n      <div class=\"center__wrapper big-font\" title=\"rank score\">\n        <span class=\"a-icon entypo network mr--slim\"></span>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "rankScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n\n        (Family ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "familyId", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\n      </div>\n\n      <div class=\"a-toolbar__group a-button__group\">\n        ");
  hashContexts = {'controls': depth0,'tagName': depth0,'classNames': depth0};
  hashTypes = {'controls': "STRING",'tagName': "STRING",'classNames': "STRING"};
  options = {hash:{
    'controls': ("order-sanger-form"),
    'tagName': ("div"),
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-modal-trigger'] || (depth0 && depth0['ic-modal-trigger'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-modal-trigger", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n        <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingActivity", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\" title=\"Toggle activity panel\">\n          <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":a-button__icon :a-icon :entypo :chat hasActivity:is-notifying")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></div>\n          <div class=\"a-button__body\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isShowingActivity", {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            Activity\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"a-card a-bar--space-between mb--big\">\n      <div class=\"a-bar__item br center__wrapper regular\" title=\"chromosome + position\">\n        <span class=\"a-icon entypo location mr--slim\"></span>\n        <span ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("isMultiBase:small")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n          Chr");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "chromosome", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("-");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "startBp", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isMultiBase", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </span>\n      </div>\n\n      <div class=\"a-bar__item br center__wrapper regular\" title=\"change\">\n        <span class=\"a-icon entypo shuffle mr--slim\"></span>\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "refNt", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" &rarr; ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "altNt", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n      </div>\n\n      <div class=\"a-bar__item br center__wrapper regular\" title=\"annotations\">\n        <span ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":a-icon :entypo isProbablyBenign:circled-info:warning :mr--slim")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></span>\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.capitalize || (depth0 && depth0.capitalize)),stack1 ? stack1.call(depth0, "geneAnnotation", options) : helperMissing.call(depth0, "capitalize", "geneAnnotation", options))));
  data.buffer.push("\n      </div>\n\n      <div class=\"a-bar__item center__wrapper regular\" title=\"annotations\">\n        <span class=\"a-icon entypo tools mr--slim\"></span>\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "functionalAnnotation", {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n    </div>\n\n    <div class=\"a-bar flex-start small mb--big\">\n      <div class=\"a-bar__item a-card a-list br mr\">\n        <div class=\"a-list__item--header text-center slim\">General</div>\n        <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingFullGeneName", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-list__item a-bar--space-between slim dotdotdot is-clickable\">\n          <div>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "isShowingFullGeneName", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n\n          <div class=\"a-icon--small entypo cycle\"></div>\n        </div>\n\n        <div class=\"a-list__item slim\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "ensemblGeneIdString", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isFoundInOtherFamilies", {hash:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n\n      <div class=\"a-bar__item a-card a-list br mr\">\n        <div class=\"a-list__item--header text-center slim\">Predicted protein changes</div>\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "item", "in", "variantFunctions", {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n\n      <div class=\"a-bar__item a-card a-list\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "diseaseGroup", {hash:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "omim", {hash:{},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hgmdAccession", {hash:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("      \n      </div>\n    </div>\n\n    <div class=\"a-bar--space-between flex-start small mb--big\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "prediction", "in", "predictions", {hash:{},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </div>\n\n    <div class=\"a-bar flex-start small mb--big\">\n      <div class=\"a-bar__item--double mr\">\n        <table class=\"a-table\">\n          <thead class=\"a-table__head\">\n            <tr class=\"a-table__row\">\n              <th class=\"a-table__cell--header\">Sample</th>\n              <th class=\"a-table__cell--header\">GT</th>\n              <th class=\"a-table__cell--header\">AD</th>\n              <th class=\"a-table__cell--header\">PL</th>\n              <th class=\"a-table__cell--header\">GQ</th>\n            </tr>\n          </thead>\n          <tbody class=\"a-table__body\">\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "gtcall", "in", "gtcallsBySampleId", {hash:{},inverse:self.noop,fn:self.program(45, program45, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </tbody>\n        </table>\n      </div>\n    \n      <div class=\"a-bar__item a-card a-list mr\">\n        <div class=\"a-list__item--header text-center slim dotdotdot\">\n          <strong>Disease gene models</strong>\n        </div>\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "model", "in", "diseaseGeneModels", {hash:{},inverse:self.program(49, program49, data),fn:self.program(47, program47, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n\n      <div class=\"a-bar__item a-card a-list\">\n        <div class=\"a-list__item--header text-center slim\">\n          Inheritance models\n        </div>\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "model", "in", "geneModels", {hash:{},inverse:self.program(49, program49, data),fn:self.program(51, program51, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n    </div>\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hasCompounds", {hash:{},inverse:self.noop,fn:self.program(53, program53, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  \n    \n    <div class=\"a-bar--space-between external-links\">\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("ensemblLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__body\">Ensembl</div>\n      </a>\n\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("hpaLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__icon a-icon entypo map\"></div>\n        <div class=\"a-button__body\">HPA</div>\n      </a>\n\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("stringLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__body\">STRING</div>\n      </a>\n\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("ucscLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__body\">UCSC</div>\n      </a>\n\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("entrezLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__body\">Entrez</div>\n      </a>\n\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("idsLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__body\">IDs</div>\n      </a>\n\n      <a ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "STRING"};
  options = {hash:{
    'href': ("igvLink")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"a-button\" target=\"_blank\">\n        <div class=\"a-button__icon a-icon entypo open-book\"></div>\n        <div class=\"a-button__body\">IGV</div>\n      </a>\n    </div>\n\n  </div>\n</div>\n\n");
  hashContexts = {'id': depth0,'on-submit': depth0,'awaiting-return-value': depth0};
  hashTypes = {'id': "STRING",'on-submit': "STRING",'awaiting-return-value': "ID"};
  options = {hash:{
    'id': ("order-sanger-form"),
    'on-submit': ("submitSangerForm"),
    'awaiting-return-value': ("saving")
  },inverse:self.noop,fn:self.program(61, program61, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['ic-modal-form'] || (depth0 && depth0['ic-modal-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "ic-modal-form", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isShowingActivity", {hash:{},inverse:self.noop,fn:self.program(69, program69, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  
});
});

;require.register("templates/variants", function(exports, require, module) {
module.exports = Ember.TEMPLATES['variants'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n              <div class=\"dotdotdot slim a-bar__item--half br--listed\">1000 Genomes</div>\n              <div class=\"dotdotdot slim a-bar__item--half br--listed\">PolyPhen</div>\n              <div class=\"dotdotdot slim a-bar__item br--listed\">Gene annotation</div>\n              <div class=\"dotdotdot slim a-bar__item br--listed\">Func. annotation</div>\n              ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "researchMode", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              <div class=\"dotdotdot slim a-bar__item--double br--listed\">Inheritance models</div>\n              <div class=\"dotdotdot slim a-bar__item--half br--listed\">HGMD</div>\n              <div class=\"dotdotdot slim a-bar__item--half br--listed\">Archive</div>\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                <div class=\"dotdotdot slim a-bar__item--double br--listed\">Disease group</div>\n                <div class=\"dotdotdot slim a-bar__item--half br--listed\">Disease gene model</div>\n              ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "variant.isHidden", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n            <div class=\"a-list__item a-bar--space-between variant-list-item\">\n              \n              ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("dotdotdot slim a-bar__item--half a-bar--space-around rank-score-column br")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variant", "variant", options) : helperMissing.call(depth0, "link-to", "variant", "variant", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              \n              \n              <div class=\"dotdotdot slim a-bar__item--half br--listed\">\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.hgncSymbol", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n              </div>\n              \n              ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "variantIsLoaded", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n            ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <div>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.rankScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "variant.hasCompounds", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                  <div class=\"a-notify\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.individualRankScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                  </div>\n                ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                  \n                  <div class=\"a-notify--fake\"></div>\n                ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                \n                <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":slim :a-bar__item--half variant.isFoundInOtherFamilies:a-bar--space-between variant.thousandG::undef :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "variant.isFoundInOtherFamilies", {hash:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                  <div class=\"text-right\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "variant.thousandG", options) : helperMissing.call(depth0, "fallback", "variant.thousandG", options))));
  data.buffer.push("\n                  </div>\n\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "variant.frequencies", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n\n                \n                <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":slim :a-bar__item--half variant.polyphenDivHuman::undef :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                  <div class=\"text-right\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "variant.polyphenDivHuman", options) : helperMissing.call(depth0, "fallback", "variant.polyphenDivHuman", options))));
  data.buffer.push("\n                  </div>\n\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "variant.severities", {hash:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n\n                \n                <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":dotdotdot :slim :a-bar__item variant.geneAnnotation::undef :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "variant.geneAnnotation", options) : helperMissing.call(depth0, "fallback", "variant.geneAnnotation", options))));
  data.buffer.push("\n                </div>\n\n                \n                <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":dotdotdot :slim :a-bar__item variant.functionalAnnotation::undef :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "variant.functionalAnnotation", options) : helperMissing.call(depth0, "fallback", "variant.functionalAnnotation", options))));
  data.buffer.push("\n                </div>\n\n                ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "researchMode", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                \n                <div class=\"a-bar__item--double slim--squashed a-bar br--listed\">\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "model", "in", "variant.geneModels", {hash:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "variant.hasCompounds", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                </div>\n\n                \n                <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":dotdotdot :slim :a-bar__item--half variant.hgmdVariantType::undef :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "variant.hgmdVariantType", options) : helperMissing.call(depth0, "fallback", "variant.hgmdVariantType", options))));
  data.buffer.push("\n                </div>        \n\n                \n                <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideVariant", "variant", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-bar__item--half a-bar--center slim--squashed br--listed is-clickable\">\n                  <div class=\"a-icon entypo archive\"></div>\n                </div>\n              ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":a-notify--bubble variant.hbvdbHuman")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                      &nbsp;\n                    </div>\n                  ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'triggerdBy': depth0,'direction': depth0,'classNames': depth0};
  hashTypes = {'triggerdBy': "STRING",'direction': "STRING",'classNames': "STRING"};
  options = {hash:{
    'triggerdBy': ("hover"),
    'direction': ("right"),
    'classNames': ("slim")
  },inverse:self.noop,fn:self.program(15, program15, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['a-popover'] || (depth0 && depth0['a-popover'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "a-popover", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                      <div class=\"always-visible-text\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "property", "in", "variant.frequencies", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      </div>\n                    ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n                          <div class=\"a-bar--space-between\">\n                            <div class=\"dotdotdot slim\">\n                              <strong>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "property.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong>\n                            </div>\n                            <div class=\"slim text-right\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "property.value", options) : helperMissing.call(depth0, "fallback", "property.value", options))));
  data.buffer.push("\n                            </div>\n                          </div>\n                        ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'triggerdBy': depth0,'direction': depth0,'classNames': depth0};
  hashTypes = {'triggerdBy': "STRING",'direction': "STRING",'classNames': "STRING"};
  options = {hash:{
    'triggerdBy': ("hover"),
    'direction': ("right"),
    'classNames': ("slim")
  },inverse:self.noop,fn:self.program(19, program19, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['a-popover'] || (depth0 && depth0['a-popover'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "a-popover", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                      <div class=\"always-visible-text\">\n                        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "property", "in", "variant.severities", {hash:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                      </div>\n                    ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                  \n                  <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":dotdotdot :slim :a-bar__item--double :br--listed variant.diseaseGroup::undef")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.fallback || (depth0 && depth0.fallback)),stack1 ? stack1.call(depth0, "variant.diseaseGroup", options) : helperMissing.call(depth0, "fallback", "variant.diseaseGroup", options))));
  data.buffer.push("\n                  </div>\n\n                  \n                  <div class=\"dotdotdot slim a-bar__item--half br--listed\">\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.diseaseGeneModel", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                  </div>\n                ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                    <div ");
  hashContexts = {'title': depth0};
  hashTypes = {'title': "STRING"};
  options = {hash:{
    'title': ("model")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" class=\"dotdotdot br--listed slim\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n                  ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                    ");
  hashContexts = {'triggerdBy': depth0,'direction': depth0,'classNames': depth0};
  hashTypes = {'triggerdBy': "STRING",'direction': "STRING",'classNames': "STRING"};
  options = {hash:{
    'triggerdBy': ("hover"),
    'direction': ("left"),
    'classNames': ("slim")
  },inverse:self.noop,fn:self.program(26, program26, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['a-popover'] || (depth0 && depth0['a-popover'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "a-popover", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                      <table class=\"a-table\">\n                        <thead class=\"a-table__head\">\n                          <tr class=\"a-table__row\">\n                            <th class=\"a-table__cell--header\">\n                              Combined score\n                            </th>\n                            <th class=\"a-table__cell--header\">Rank score</th>\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "sample", "in", "variant.compounds.content.0.samples", {hash:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                            <th class=\"a-table__cell--header\">\n                              Inheritance models\n                            </th>\n                            <th class=\"a-table__cell--header\">\n                              Gene annotations\n                            </th>\n                            <th class=\"a-table__cell--header\">\n                              Functional annotation\n                            </th>\n                          </tr>\n                        </thead>\n\n                        <tbody class=\"a-table__body\">\n                          <tr class=\"a-table__row is-highlighted\">\n                            <td class=\"a-table__cell dotdotdot\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.gtData.combinedScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            </td>\n\n                            <td class=\"a-table__cell dotdotdot\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variant", "variant.gtData.variant", options) : helperMissing.call(depth0, "link-to", "variant", "variant.gtData.variant", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                            </td>\n                            \n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "gtcall", "in", "variant.gtData.gtcalls", {hash:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                            <td class=\"a-table__cell dotdotdot\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.gtData.geneModel", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            </td>\n\n                            <td class=\"a-table__cell dotdotdot\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.gtData.geneAnnotation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            </td>\n\n                            <td class=\"a-table__cell dotdotdot\">\n                              ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.gtData.functionalAnnotation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                            </td>\n                          </tr>\n\n                          ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "compound", "in", "variant.compounds", {hash:{},inverse:self.noop,fn:self.program(33, program33, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                        </tbody>\n                      </table>\n                    ");
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                              <th class=\"a-table__cell--header dotdotdot\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "sample", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </th>\n                            ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "variant.gtData.rankScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                              <td class=\"a-table__cell dotdotdot text-center\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </td>\n                            ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                            <tr class=\"a-table__row\">\n                              <td class=\"a-table__cell dotdotdot\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.combinedScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </td>\n\n                              <td class=\"a-table__cell dotdotdot\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(34, program34, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variant", "compound.variant", options) : helperMissing.call(depth0, "link-to", "variant", "compound.variant", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                              </td>\n\n                              ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "gtcall", "in", "compound.gtcalls", {hash:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n                              <td class=\"a-table__cell dotdotdot\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.geneModel", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </td>\n\n                              <td class=\"a-table__cell dotdotdot\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.geneAnnotation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </td>\n\n                              <td class=\"a-table__cell dotdotdot\">\n                                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.functionalAnnotation", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                              </td>                              \n                            </tr>\n                          ");
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "compound.rankScore", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                                <td class=\"a-table__cell dotdotdot text-center\">\n                                  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "gtcall.genotype", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                                </td>\n                              ");
  return buffer;
  }

function program38(depth0,data) {
  
  
  data.buffer.push("\n            <h2 class=\"text-center\">Loading...</h2>\n          ");
  }

function program40(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n          \n          <div class=\"a-layout__footer a-toolbar slim bt\">\n            <div class=\"a-button__group\">\n              ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "institute", "instituteId", options) : helperMissing.call(depth0, "link-to", "institute", "instituteId", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n              ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-button")
  },inverse:self.noop,fn:self.program(43, program43, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "family", "instituteId", "familyId", options) : helperMissing.call(depth0, "link-to", "family", "instituteId", "familyId", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n\n            <div class=\"center__wrapper\">Database: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "database", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n\n            <div class=\"a-button__group\">\n              <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doFilter", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n                <div class=\"a-button__icon a-icon entypo ccw\"></div>\n                <div class=\"a-button__body\">Update variants</div>\n              </div>\n\n              <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingFilters", {hash:{},contexts:[depth0,depth0],types:["STRING","STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n                <div class=\"a-button__icon a-icon entypo hair-cross\"></div>\n                <div class=\"a-button__body\">\n                  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "isShowingFilters", {hash:{},inverse:self.program(47, program47, data),fn:self.program(45, program45, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                  filters\n                </div>\n              </div>\n            </div>\n          </div>\n        ");
  return buffer;
  }
function program41(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <div class=\"a-button__body\">\n                  Institue: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "instituteId", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </div>\n              ");
  return buffer;
  }

function program43(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <div class=\"a-button__body\">Case: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "familyId", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n              ");
  return buffer;
  }

function program45(depth0,data) {
  
  
  data.buffer.push(" Show ");
  }

function program47(depth0,data) {
  
  
  data.buffer.push(" Hide ");
  }

function program49(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      \n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isShowingFilters", {hash:{},inverse:self.noop,fn:self.program(50, program50, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program50(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <div class=\"filter-panel a-layout__panel--quarter a-list br--listed\">\n          <div class=\"a-bar--space-between slim bb\">\n            <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doFilterClinically", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n              <div class=\"a-button__icon a-icon entypo lifebuoy\"></div>\n              <div class=\"a-button__body\">Clinical filter</div>\n            </div>\n\n            <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doClearFilters", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button\">\n              <div class=\"a-button__icon a-icon entypo circled-cross\"></div>\n              <div class=\"a-button__body\">Clear</div>\n            </div>\n          </div>\n          <form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submitdiv", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n            <div class=\"a-list__item--header slim text-center\">\n              Frequency cutoffs\n            </div>\n\n            <div class=\"a-list__item a-choice__wrapper regular\">\n              <div class=\"a-choice\">\n                ");
  hashContexts = {'name': depth0,'selectionBinding': depth0,'value': depth0};
  hashTypes = {'name': "STRING",'selectionBinding': "STRING",'value': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("relation"),
    'selectionBinding': ("relation"),
    'value': ("LESSER")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                <div class=\"a-choice__label\">Less than</div>\n              </div>\n\n              <div class=\"a-choice\">\n                ");
  hashContexts = {'name': depth0,'selectionBinding': depth0,'value': depth0};
  hashTypes = {'name': "STRING",'selectionBinding': "STRING",'value': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("relation"),
    'selectionBinding': ("relation"),
    'value': ("GREATER")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                <div class=\"a-choice__label\">Greater than</div>\n              </div>\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'step': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'step': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("hbvdb"),
    'type': ("number"),
    'step': ("0.01"),
    'valueBinding': ("hbvdb"),
    'placeholder': ("HBVdb"),
    'classNames': ("a-form__input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'step': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'step': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("genomes"),
    'type': ("number"),
    'step': ("0.01"),
    'valueBinding': ("thousand_g"),
    'placeholder': ("1000 Genomes"),
    'classNames': ("a-form__input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'step': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'step': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("dbSNP129"),
    'type': ("number"),
    'step': ("0.01"),
    'valueBinding': ("dbsnp129"),
    'placeholder': ("dbSNP 129"),
    'classNames': ("a-form__input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'step': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'step': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("dbSNP132"),
    'type': ("number"),
    'step': ("0.01"),
    'valueBinding': ("dbsnp132"),
    'placeholder': ("dbSNP 132"),
    'classNames': ("a-form__input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'step': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'step': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("esp6500"),
    'type': ("number"),
    'step': ("0.01"),
    'valueBinding': ("esp6500"),
    'placeholder': ("esp6500"),
    'classNames': ("a-form__input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"a-list__item--header bt slim text-center\">\n              Database and gene search\n            </div>\n\n            <div class=\"a-list__item a-bar--space-between\">\n              ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "db", "in", "filter.clinical_db_gene_annotation", {hash:{},inverse:self.noop,fn:self.program(51, program51, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("gene-name"),
    'type': ("text"),
    'valueBinding': ("gene_name"),
    'placeholder': ("HGNC gene symbol"),
    'classNames': ("a-form__input"),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"regular\">\n              ");
  hashContexts = {'id': depth0,'type': depth0,'valueBinding': depth0,'classNames': depth0,'placeholder': depth0,'required': depth0};
  hashTypes = {'id': "STRING",'type': "STRING",'valueBinding': "STRING",'classNames': "STRING",'placeholder': "STRING",'required': "STRING"};
  options = {hash:{
    'id': ("offset"),
    'type': ("number"),
    'valueBinding': ("offset"),
    'classNames': ("a-form__input"),
    'placeholder': ("Skip first..."),
    'required': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            \n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "group", "in", "filterGroups", {hash:{},inverse:self.noop,fn:self.program(54, program54, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n          </form>\n        </div>\n      ");
  return buffer;
  }
function program51(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n                ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("a-bar__item regular br--listed")
  },inverse:self.noop,fn:self.program(52, program52, data),contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "variants", "instituteId", "familyId", "db", options) : helperMissing.call(depth0, "link-to", "variants", "instituteId", "familyId", "db", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n              ");
  return buffer;
  }
function program52(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "db", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                ");
  return buffer;
  }

function program54(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n              <div class=\"a-list__item--header bt slim text-center\">\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "group.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n              </div>\n\n              ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "filter", "in", "group.filters", {hash:{},inverse:self.noop,fn:self.program(55, program55, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program55(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                <div class=\"regular\">\n                  <div class=\"a-checkbox__wrapper\">\n                    <div class=\"a-checkbox__box\">\n                      ");
  hashContexts = {'type': depth0,'checkedBinding': depth0,'classNames': depth0};
  hashTypes = {'type': "STRING",'checkedBinding': "STRING",'classNames': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'checkedBinding': ("filter.property"),
    'classNames': ("toggle-slider__input")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                    </div>\n                    <div class=\"a-checkbox__caption dotdotdot\">\n                      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "filter.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    </div>\n                  </div>\n                </div>\n              ");
  return buffer;
  }

  data.buffer.push("<div class=\"a-layout__wrapper a-layout__panel--full\">\n\n  <div class=\"a-layout\">\n    <div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":a-layout__wrapper variantIsLoaded:a-layout__panel--quarter:a-layout__panel--full :a-floater__wrapper :br--listed")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n      <div class=\"a-layout--vertical\">\n\n        \n        <div class=\"variants-header a-list__item--header bb\">\n\n          <div class=\"a-bar--space-between\">\n            <div class=\"dotdotdot slim a-bar__item--half br--listed\">Rank score</div>\n            <div class=\"dotdotdot slim a-bar__item--half br--listed\">Gene</div>\n\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "variantIsLoaded", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n        </div>\n\n        <div class=\"a-layout__panel--full is-scrollable variants-main\">\n          ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "variant", "in", "controller", {hash:{},inverse:self.program(38, program38, data),fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n          <div class=\"a-list__item slim\">\n            <div ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loadMore", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"a-button center__wrapper\">\n              <div class=\"a-button__icon a-icon entypo infinity\"></div>\n              <div class=\"a-button__body big-font\">Load more...</div>\n            </div>\n          </div>\n        </div>\n        \n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "variantIsLoaded", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      </div>\n\n    </div>\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.unless.call(depth0, "variantIsLoaded", {hash:{},inverse:self.noop,fn:self.program(49, program49, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n\n</div>\n");
  return buffer;
  
});
});

;require.register("views/application", function(exports, require, module) {
module.exports = App.ApplicationView = Ember.View.extend({
  classNames: ['wrapper']
});
});

;require.register("views/radio-button", function(exports, require, module) {
module.exports = Ember.RadioButton = Ember.View.extend({
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
});

;require.register("config/environments/development", function(exports, require, module) {
window.TAPAS_ENV = {
  name: 'development'
};
});

;
//# sourceMappingURL=app.js.map