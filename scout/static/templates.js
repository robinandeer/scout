Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n      <div class=\"menu__item__icon\"><img src=\"/static/img/icon_8199.svg\"></div>\n      <div class=\"menu__item__label\">Families</div>\n    ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n      <div class=\"menu__item__icon\"><img src=\"/static/img/icon_19741.svg\"></div>\n      <div class=\"menu__item__label\">Dashboard</div>\n    ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n      <div class=\"menu__item__icon\"><img src=\"/static/img/icon_4240.svg\"></div>\n      <div class=\"menu__item__label\">Submit issue</div>\n    ");
  }

  data.buffer.push("\n<div class=\"panel__wrapper\">\n\n  <div class=\"panel--menu\">\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("menu__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("menu__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "dashboard", options) : helperMissing.call(depth0, "link-to", "dashboard", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("menu__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "issue", options) : helperMissing.call(depth0, "link-to", "issue", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <a href=\"/logout\" class=\"menu__item\">\n      <div class=\"menu__item__icon\"><img src=\"/static/img/icon_4930.svg\"></div>\n      <div class=\"menu__item__label\">Logout</div>\n    </a>\n  </div>\n\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/ember-hint"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers['hint-bubble'] || (depth0 && depth0['hint-bubble']),options={hash:{
    'title': ("title"),
    'position': ("position")
  },hashTypes:{'title': "ID",'position': "ID"},hashContexts:{'title': depth0,'position': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "hint-bubble", options))));
  return buffer;
  
});

Ember.TEMPLATES["components/hint-bubble"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"tooltip-arrow\"></div>\n<div class=\"tooltip-inner\">");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  return buffer;
  
});

Ember.TEMPLATES["components/my-gauge"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <p class=\"value-exceeded\">maxValue exceeded</p>\n");
  }

  data.buffer.push("<div class=\"frame\">\n  <div class=\"labels\">\n    <span class=\"min\">0</span>\n    <span class=\"max\">");
  stack1 = helpers._triageMustache.call(depth0, "maxValue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </div>\n  <span class=\"pointer\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("computedAngle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    <span class=\"pointer-cap\"></span>\n    <span class=\"value\">");
  stack1 = helpers._triageMustache.call(depth0, "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </span>\n</div>\n\n");
  stack1 = helpers['if'].call(depth0, "isMaxValueExceeded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["dashboard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Dashboard</h2>");
  
});

Ember.TEMPLATES["families"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"panel__overlay__column\">NGS update</div>\n    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("list__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "family", "family", options) : helperMissing.call(depth0, "link-to", "family", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n          <div class=\"list__item__content\">\n            <div class=\"list__item__content__text\">\n              ");
  stack1 = helpers.unless.call(depth0, "familyLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              ");
  stack1 = helpers._triageMustache.call(depth0, "family.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n            ");
  stack1 = helpers.unless.call(depth0, "familyLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n\n        ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\n                Family\n              ");
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n            <div class=\"list__item__content__label\">\n              ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "family.analyzedDate", options) : helperMissing.call(depth0, "fromNow", "family.analyzedDate", options))));
  data.buffer.push("\n            </div>\n            ");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("familyLoaded:panel--sidebar:panel :families")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n\n  <div class=\"panel__overlay--header\">\n    <div class=\"panel__overlay__title\">Families</div>\n    \n    <div class=\"panel__overlay__column\">ID</div>\n    ");
  stack1 = helpers.unless.call(depth0, "familyLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n\n  <div class=\"panel__body\">\n    <div class=\"list--vertical\">\n      ");
  stack1 = helpers.each.call(depth0, "family", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n\n</div>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["family"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["family/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("Variants");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <tr>\n            <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("sample.affected:filter--blue :predict__main :predict__part")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "sample.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            <td class=\"predict__part affected\">\n              \n              <div class=\"family-member\">");
  stack1 = helpers._triageMustache.call(depth0, "sample.gender", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "sample.type", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            </td>\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "sample.captureKit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"comment__wrapper\">\n          <div class=\"comment__avatar\">\n            <div class=\"comment__letter\">");
  stack1 = helpers._triageMustache.call(depth0, "comment.firstLetter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n          </div>\n          <div class=\"comment\">\n            <div class=\"comment__header\">\n              <div class=\"comment__username\">");
  stack1 = helpers._triageMustache.call(depth0, "comment.userName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(":</div>\n            </div>\n\n            <div class=\"comment__body\">");
  stack1 = helpers._triageMustache.call(depth0, "comment.userComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            <div class=\"comment__meta\">\n              <div class=\"comment__date\">");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "comment.logDate", options) : helperMissing.call(depth0, "fromNow", "comment.logDate", options))));
  data.buffer.push("</div>\n              <div class=\"comment__tag\">");
  stack1 = helpers._triageMustache.call(depth0, "comment.positionInColumn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            </div>\n          </div>\n        </div>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"panel family\">\n\n  <div class=\"panel__overlay--header family-header\">\n\n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        <div class=\"list__column fixed center-text\">\n          <div class=\"family-id\">Family ");
  stack1 = helpers._triageMustache.call(depth0, "family.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        </div>\n        <div class=\"list__column fixed\">\n          Last update: ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "family.analyzedDate", options) : helperMissing.call(depth0, "fromNow", "family.analyzedDate", options))));
  data.buffer.push("\n        </div>\n        <div class=\"list__column fixed\">\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variants", "family", options) : helperMissing.call(depth0, "link-to", "variants", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body family-body\">\n\n    <div class=\"box family\">\n      <h5>Family members</h5>\n      <table class=\"predict gt-call-table\">\n\n        ");
  stack1 = helpers.each.call(depth0, "sample", "in", "family.samples", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n      </table>\n\n      <table class=\"predict\">\n        <tr>\n          <td class=\"predict__main predict__part\">Possible gene models</td>\n          ");
  stack1 = helpers.each.call(depth0, "model", "in", "family.samples.1.inheritanceModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"box\">\n      <h5>Comments</h5>\n\n      ");
  stack1 = helpers.each.call(depth0, "comment", "in", "comments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n\n  </div>\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"list__item\">\n          <div class=\"list__column\">\n            <div class=\"btn-group\">\n              ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "family", "family", options) : helperMissing.call(depth0, "link-to", "family", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variants", "family", options) : helperMissing.call(depth0, "link-to", "variants", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n          </div>\n          \n          <div class=\"list__column\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "family.analyzedDate", options) : helperMissing.call(depth0, "fromNow", "family.analyzedDate", options))));
  data.buffer.push("\n          </div>\n        </div>\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <div class=\"btn__body\">Family ");
  stack1 = helpers._triageMustache.call(depth0, "family.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n              ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                <div class=\"btn__body\">Variants</div>\n              ");
  }

  data.buffer.push("<div class=\"panel families\">\n\n  <div class=\"panel__overlay--header\">\n    <div class=\"panel__overlay__title\">Families</div>\n    \n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        <div class=\"list__column\">Links</div>\n        <div class=\"list__column\">NGS update</div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body\">\n    <div class=\"list--vertical\">\n      ");
  stack1 = helpers.each.call(depth0, "family", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n\n</div>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["issue"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n  <form class=\"issue-form\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmIssue", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n    <h4>Submit an issue</h4>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("issueTitle"),
    'type': ("text"),
    'placeholder': ("Title")
  },hashTypes:{'value': "ID",'type': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("issueBody"),
    'placeholder': ("Body")
  },hashTypes:{'value': "ID",'placeholder': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n\n    ");
  stack1 = helpers.unless.call(depth0, "isConfirmingIssue", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </form>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n      <button type=\"submit\" class=\"btn\">\n        <div class=\"btn__body\">Submit</div>\n      </button>\n    ");
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createIssue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n        <div class=\"btn__body\">Are you sure?</div>\n      </div>\n    ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n  ");
  stack1 = helpers['if'].call(depth0, "hasSentMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n    <div class=\"issue-form\">\n      <h4>Your issue</h4>\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("message.html_url")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"issue-title\">\n        ");
  stack1 = helpers._triageMustache.call(depth0, "message.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </a>\n      <div class=\"issue-body-wrapper\">");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "message.html", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\n\n      <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "reset", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n        <div class=\"btn__body\">New issue</div>\n      </div>\n    </div>\n\n  ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n\n    <div class=\"issue-sending\">Sending issue...</div>\n\n  ");
  }

  data.buffer.push("<div class=\"center-center login-screen\">\n\n");
  stack1 = helpers['if'].call(depth0, "isWritingMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["variant"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n              ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "functionalAnnotation", options) : helperMissing.call(depth0, "capitalize", "functionalAnnotation", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n              No functional annotation\n            ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("All variants");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <tr ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("call.ok:variant--pass:variant--fail")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <td class=\"predict__main predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.idn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.filter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.gt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.ad", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.pl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.gq", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n        ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      <table style=\"width: 100%\">\n        <thead>\n          <tr>\n            <th>Rank score</th>\n            ");
  stack1 = helpers.each.call(depth0, "idn", "in", "gt.compounds.1.idns", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <th>Gene annotation</th>\n            <th>Func. annotation</th>\n            <th>Inheritance</th>\n          </tr>\n        </thead>\n\n        ");
  stack1 = helpers.each.call(depth0, "compound", "in", "gt.compounds", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </table>\n\n      ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <th>");
  stack1 = helpers._triageMustache.call(depth0, "idn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</th>\n            ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <tr>\n          <td class=\"predict__part\">\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variant", "compound.vpk", options) : helperMissing.call(depth0, "link-to", "variant", "compound.vpk", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </td>\n\n          ");
  stack1 = helpers.each.call(depth0, "call", "in", "compound.gtCalls", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "compound.gene_annotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "compound.functional_annotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "compound.gene_model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              ");
  stack1 = helpers._triageMustache.call(depth0, "compound.rank_score", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          ");
  return buffer;
  }

function program19(depth0,data) {
  
  
  data.buffer.push("\n      <p>No compounds detected.</p>\n      ");
  }

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              <div>");
  stack1 = helpers._triageMustache.call(depth0, "syn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <p>");
  stack1 = helpers._triageMustache.call(depth0, "comment.variantComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n        <p>");
  stack1 = helpers._triageMustache.call(depth0, "comment.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" - ");
  stack1 = helpers._triageMustache.call(depth0, "comment.rating", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" - ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "comment.commentDate", options) : helperMissing.call(depth0, "fromNow", "comment.commentDate", options))));
  data.buffer.push("</p>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"panel variant\">\n\n  <div class=\"panel__overlay--header variant-header\">\n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        <div class=\"list__column fixed center-text\">\n          <div class=\"rank-score\">");
  stack1 = helpers._triageMustache.call(depth0, "rankScore", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        </div>\n        <div class=\"list__column fixed\">\n          ");
  stack1 = helpers._triageMustache.call(depth0, "hgncSymbol", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          <br>\n          <small>Chr ");
  stack1 = helpers._triageMustache.call(depth0, "chrom", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n        </div>\n        <div class=\"list__column fixed\">\n          ");
  stack1 = helpers._triageMustache.call(depth0, "refNt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" &rarr; ");
  stack1 = helpers._triageMustache.call(depth0, "altNt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<br>\n          <small>\n            ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "geneAnnotation", options) : helperMissing.call(depth0, "capitalize", "geneAnnotation", options))));
  data.buffer.push(" |\n            ");
  stack1 = helpers['if'].call(depth0, "functionalAnnotation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </small>\n        </div>\n        <div class=\"list__column fixed\">\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variants", "currentFamily", options) : helperMissing.call(depth0, "link-to", "variants", "currentFamily", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body\">\n    <div class=\"box predictions\">\n      <h6>Severity</h6>\n      <table class=\"predict\">\n        <tr class=\"predict__top\">\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part siftWholeExome::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "siftWholeExome", options) : helperMissing.call(depth0, "fallback", "siftWholeExome", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">Avsift</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part polyphenDivHuman::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "polyphenDivHuman", options) : helperMissing.call(depth0, "fallback", "polyphenDivHuman", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">PolyPhen</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part mutationTaster::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "mutationTaster", options) : helperMissing.call(depth0, "fallback", "mutationTaster", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">Mutation taster</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part gerpWholeExome::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "gerpWholeExome", options) : helperMissing.call(depth0, "fallback", "gerpWholeExome", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">GERP exome</div>\n          </td>\n        </tr>\n      </table>\n\n      <h6>Frequency</h6>\n      <table class=\"predict\">\n        <tr class=\"predict__top\">\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part thousandG::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "thousandG", options) : helperMissing.call(depth0, "fallback", "thousandG", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">1000 Genomes</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part esp6500::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "esp6500", options) : helperMissing.call(depth0, "fallback", "esp6500", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">ESP 6500</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part dbsnp129::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "dbsnp129", options) : helperMissing.call(depth0, "fallback", "dbsnp129", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">dbSNP 129</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part dbsnp::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  stack1 = helpers._triageMustache.call(depth0, "dbsnp", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            <div class=\"predict__text\">dbSNP</div>\n          </td>\n        </tr>\n      </table>\n\n      <h6>Conservation</h6>\n      <table class=\"predict\">\n        <tr class=\"predict__top\">\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part phylopWholeExome::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "phylopWholeExome", options) : helperMissing.call(depth0, "fallback", "phylopWholeExome", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">Whole-exome PhyloP</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part gerpElement::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "gerpElement", options) : helperMissing.call(depth0, "fallback", "gerpElement", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">GERP++ element</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part lrtWholeExome::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "lrtWholeExome", options) : helperMissing.call(depth0, "fallback", "lrtWholeExome", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">Whole-exome LRT</div>\n          </td>\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"box gt-call\">\n      <h6>GT call</h6>\n      <table class=\"predict gt-call-table\">\n        <thead>\n          <tr>\n            <th>IDN</th>\n            <th>Filter</th>\n            <th>GT</th>\n            <th>AD</th>\n            <th>PL</th>\n            <th>GQ</th>\n          </tr>\n        </thead>\n        <tbody>\n        ");
  stack1 = helpers.each.call(depth0, "call", "in", "gt.gtCalls", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tbody>\n      </table>\n\n      <table class=\"predict\">\n        <tr>\n          <td class=\"predict__main predict__part\">Possible gene models</td>\n          ");
  stack1 = helpers.each.call(depth0, "model", "in", "geneModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tr>\n      </table>\n\n      <h5>Compounds</h5>\n      ");
  stack1 = helpers['if'].call(depth0, "hasCompounds", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(19, program19, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </div>\n\n    <div class=\"box annotations\">\n      <h6>External annotations</h6>\n      <table class=\"predict annotate-table\">\n        <tr>\n          <td class=\"predict__main predict__part\">\n            <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("omimLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n              <div class=\"logo--omim\">OMIM</div>\n            </a>\n          </td>\n          <td class=\"predict__part\">\n            ");
  stack1 = helpers.each.call(depth0, "syn", "in", "omim.SYNDROMS", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </td>\n        </tr>\n        <tr>\n          <td class=\"predict__main predict__part\">\n            <a href=\"http://www.hgmd.cf.ac.uk/ac/index.php\" class=\"link\" target=\"_blank\">\n              <img src=\"/static/img/hgmd-logo.svg\">\n            </a>\n          </td>\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "hgmd", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        <tr>\n          <td class=\"predict__main predict__part\">Disease group</td>\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "diseaseGroup", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"box sanger\">\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "order", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">Order Sanger sequencing</button>\n\n      ");
  stack1 = helpers.each.call(depth0, "comment", "in", "comments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n\n    <div class=\"box list--horizontal external-links\">\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("ensemblLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/ensembl-logo-gray.svg\"></div>\n        <div class=\"link__text\">Ensembl</div>\n      </a>\n\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("hpaLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/hpa-logo-gray.svg\"></div>\n        <div class=\"link__text\">HPA</div>\n      </a>\n\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("stringLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/string-logo-gray.svg\"></div>\n        <div class=\"link__text\">STRING</div>\n      </a>\n\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("ucscLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/ucsc-logo-gray.svg\"></div>\n        <div class=\"link__text\">UCSC</div>\n      </a>\n\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("entrezLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/entrez-logo-gray.svg\"></div>\n        <div class=\"link__text\">Entrez</div>\n      </a>\n\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("idsLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/scout-logo-gray.svg\"></div>\n        <div class=\"link__text\">IDs</div>\n      </a>\n\n    </div>\n  </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["variants"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  <div class=\"v-panel filter-panel\">\n    <div class=\"panel__wrapper\">\n      \n      <div class=\"panel\">\n        <div class=\"panel__overlay--header\">\n          <div class=\"panel__overlay__title\">Frequency cutoffs</div>\n        </div>\n\n        <div class=\"panel__overlay--footer filter-footer\">\n          <div class=\"btn-group\">\n            <div class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "filter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n              <div class=\"btn__body\">Filter</div>\n            </div>\n            <div class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clinicalFilter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n              <div class=\"btn__body\">Clinical filter</div>\n            </div>\n            <div class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clearFilter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n              <div class=\"btn__body\">Clear</div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"panel__body\">\n          <div class=\"list--vertical\">\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("relation"),
    'selectionBinding': ("staticFilters.relation"),
    'value': ("LESSER")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" Lesser\n              </div>\n\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("relation"),
    'selectionBinding': ("staticFilters.relation"),
    'value': ("GREATER")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" Greater\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                <label for=\"genomes\">1000 Genomes</label>\n              </div>\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("genomes"),
    'type': ("text"),
    'valueBinding': ("staticFilters.1000 Genomes"),
    'placeholder': ("0.1")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                <label for=\"dbSNP129\">dbSNP 129</label>\n              </div>\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("dbSNP129"),
    'type': ("text"),
    'valueBinding': ("staticFilters.dbsnp129"),
    'placeholder': ("0.1")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                <label for=\"dbSNP132\">dbSNP 132</label>\n              </div>\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("dbSNP132"),
    'type': ("text"),
    'valueBinding': ("staticFilters.dbsnp132"),
    'placeholder': ("0.1")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                <label for=\"esp6500\">esp6500</label>\n              </div>\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("esp6500"),
    'type': ("text"),
    'valueBinding': ("staticFilters.esp6500"),
    'placeholder': ("0.1")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"divider\">Misc.</div>\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                <label for=\"gene-name\">Gene name</label>\n              </div>\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("gene-name"),
    'type': ("text"),
    'valueBinding': ("staticFilters.gene_name"),
    'placeholder': ("ADK")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div> \n\n      \n      ");
  stack1 = helpers.each.call(depth0, "group", "in", "filters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"panel\">\n          <div class=\"panel__overlay--header\">\n            <div class=\"panel__overlay__title\">");
  stack1 = helpers._triageMustache.call(depth0, "group.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n          </div>\n          <div class=\"panel__body\">\n            <div class=\"list--vertical\">\n\n              ");
  stack1 = helpers.each.call(depth0, "key", "in", "group.keys", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n          </div>\n        </div>\n      ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                <div class=\"list__item\">\n                  <div class=\"list__column\">");
  stack1 = helpers._triageMustache.call(depth0, "key.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n                  <div class=\"list__column\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checkedBinding': ("key.isActive"),
    'classNames': ("toggle-slider__input")
  },hashTypes:{'type': "STRING",'checkedBinding': "STRING",'classNames': "STRING"},hashContexts:{'type': depth0,'checkedBinding': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                  </div>\n                </div>\n              ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n\n        <span class=\"panel__overlay__title\">Variants</span>\n\n        ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n        <div class=\"list__column--slim\">\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div class=\"list__column--slim\">Variants</div>\n\n        <div class=\"list__column--slim\">\n          <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingModal", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n            <div class=\"btn__body\">\n              ");
  stack1 = helpers['if'].call(depth0, "isShowingModal", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" filter\n            </div>\n          </div>\n        </div>\n\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"btn__body\">Families</div>\n          ");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("Close");
  }

function program12(depth0,data) {
  
  
  data.buffer.push("Open");
  }

function program14(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"list__column fixed\">Inheritance</div>\n        <div class=\"list__column fixed\">1000 Genomes</div>\n        <div class=\"list__column fixed\">PolyPhen</div>\n        <div class=\"list__column fixed\">Gene annotation</div>\n        <div class=\"list__column fixed\">Functional annotation</div>\n        <div class=\"list__column fixed\">HGMD</div>\n        ");
  }

function program16(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("list__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variant", "variant", options) : helperMissing.call(depth0, "link-to", "variant", "variant", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n          <div class=\"list__column fixed\">");
  stack1 = helpers._triageMustache.call(depth0, "variant.rankScore", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n          <div class=\"list__column fixed\">\n            <div class=\"hgnc-symbol\">");
  stack1 = helpers._triageMustache.call(depth0, "variant.hgncSymbol", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n          </div>\n\n          ");
  stack1 = helpers.unless.call(depth0, "variantLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n          <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed :scrollable variant.geneModel::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  stack1 = helpers.each.call(depth0, "model", "in", "variant.geneModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n\n          <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed variant.thousandG::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "variant.thousandG", options) : helperMissing.call(depth0, "fallback", "variant.thousandG", options))));
  data.buffer.push("\n          </div>\n\n          <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed variant.polyphenDivHuman::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "variant.polyphenDivHuman", options) : helperMissing.call(depth0, "fallback", "variant.polyphenDivHuman", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"list__column fixed\">");
  stack1 = helpers._triageMustache.call(depth0, "variant.geneAnnotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n\n          <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed variant.functionalAnnotation::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  stack1 = helpers['if'].call(depth0, "variant.functionalAnnotation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n\n          <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed variant.hgmd::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  stack1 = helpers['if'].call(depth0, "variant.hgmd", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n          \n          ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              <span class=\"inheritance-model\">");
  stack1 = helpers._triageMustache.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n            ");
  return buffer;
  }

function program21(depth0,data) {
  
  
  data.buffer.push("\n              Nada\n            ");
  }

function program23(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              ");
  stack1 = helpers._triageMustache.call(depth0, "variant.functionalAnnotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              ");
  stack1 = helpers._triageMustache.call(depth0, "variant.hgmd", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("variantLoaded:panel--sidebar:panel :variants :v-panel__wrapper")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n\n  ");
  stack1 = helpers['if'].call(depth0, "isShowingModal", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  <div class=\"panel__overlay--header v-panel\">\n\n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        ");
  stack1 = helpers['if'].call(depth0, "variantLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        \n      </div>\n\n      <div class=\"list__item\">\n        <div class=\"list__column fixed\">Rank score</div>\n        <div class=\"list__column fixed\">Gene</div>\n        ");
  stack1 = helpers.unless.call(depth0, "variantLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body v-panel\">\n    <div class=\"list--vertical\">\n      ");
  stack1 = helpers.each.call(depth0, "variant", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n</div>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});