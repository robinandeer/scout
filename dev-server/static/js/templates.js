Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"menu__item__icon\"><img src=\"/static/img/icon_8199.svg\"></div>\n        <div class=\"menu__item__label\">Families</div>\n      ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"menu__item__icon\"><img src=\"/static/img/icon_19741.svg\"></div>\n        <div class=\"menu__item__label\">Settings</div>\n      ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"menu__item__icon\"><img src=\"/static/img/icon_4240.svg\"></div>\n        <div class=\"menu__item__label\">Issue</div>\n      ");
  }

  data.buffer.push("\n<div class=\"panel__wrapper\">\n\n  <div class=\"panel--menu\">\n    <div class=\"panel__menu--footer\">");
  stack1 = helpers._triageMustache.call(depth0, "user.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n\n    <div class=\"panel__body\">\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("menu__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("menu__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings", options) : helperMissing.call(depth0, "link-to", "settings", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("menu__item")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "issue", options) : helperMissing.call(depth0, "link-to", "issue", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      <a href=\"/logout\" class=\"menu__item\">\n        <div class=\"menu__item__icon\"><img src=\"/static/img/icon_4930.svg\"></div>\n        <div class=\"menu__item__label\">Logout</div>\n      </a>\n    </div>\n  </div>\n\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES['dashboard'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"panel variant\">\n\n  <div class=\"panel__overlay--header\">\n    <div class=\"panel__overlay__title\">Dashboard</div>\n  </div>\n\n  <div class=\"panel__body\">\n\n    <div class=\"box\">\n      <h3>Family 1</h3>\n\n      <div class=\"progress__wrapper\">\n        <div class=\"progress__bar\"></div>\n\n        <div class=\"progress__well\">\n          <div class=\"progress__mark\">\n            <div class=\"progress__bar__dot\"></div>\n            <div class=\"progress__mark__label\">Sequenced</div>\n          </div>\n          <div class=\"progress__mark\">\n            <div class=\"progress__bar__dot\"></div>\n            <div class=\"progress__mark__label\">Candidate gene</div>\n          </div>\n          <div class=\"progress__mark\">\n            <div class=\"progress__bar__dot\"></div>\n            <div class=\"progress__mark__label\">Sanger ordered</div>\n          </div>\n          <div class=\"progress__mark\">\n            <div class=\"progress__bar__dot\"></div>\n            <div class=\"progress__mark__label\">Solved</div>\n          </div>\n        </div>\n      </div>        \n    </div>\n\n  </div>\n</div>\n");
  
});
Ember.TEMPLATES['families'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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
Ember.TEMPLATES['family'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES['gt-call'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <th class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "idn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</th>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <tr>\n    <td class=\"predict__part center-text\">\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variant", "compound.vpk", options) : helperMissing.call(depth0, "link-to", "variant", "compound.vpk", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </td>\n\n    ");
  stack1 = helpers.each.call(depth0, "call", "in", "compound.gtCalls", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "compound.gene_annotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n    <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "compound.functional_annotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n    <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "compound.gene_model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n    </tr>\n  ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        ");
  stack1 = helpers._triageMustache.call(depth0, "compound.rank_score", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n    ");
  return buffer;
  }

  data.buffer.push("<table style=\"width: 100%\">\n  <thead>\n  <tr>\n    <th class=\"predict__part\">Rank score</th>\n    ");
  stack1 = helpers.each.call(depth0, "idn", "in", "gt.compounds.1.idns", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <th class=\"predict__part\">Gene annotation</th>\n    <th class=\"predict__part\">Func. annotation</th>\n    <th class=\"predict__part\">Inheritance</th>\n  </tr>\n  </thead>\n\n  ");
  stack1 = helpers.each.call(depth0, "compound", "in", "gt.compounds", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</table>");
  return buffer;
  
});
Ember.TEMPLATES['index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      ");
  stack1 = helpers.unless.call(depth0, "family.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div class=\"list__item\">\n          <div class=\"list__column\">\n            <div class=\"btn-group\">\n              <div class=\"btn\">\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "family", "family", options) : helperMissing.call(depth0, "link-to", "family", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              </div>\n              <div class=\"btn\">\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variants", "family", options) : helperMissing.call(depth0, "link-to", "variants", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              </div>\n              <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideFamily", "family", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"btn\">\n                <div class=\"btn__body\">Hide</div>\n              </div>\n            </div>\n          </div>\n          \n          <div class=\"list__column right-text\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "family.analyzedDate", options) : helperMissing.call(depth0, "fromNow", "family.analyzedDate", options))));
  data.buffer.push("\n          </div>\n        </div>\n      ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                  <div class=\"btn__body\">Family ");
  stack1 = helpers._triageMustache.call(depth0, "family.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                  <div class=\"btn__body\">Variants</div>\n                ");
  }

  data.buffer.push("<div class=\"panel families\">\n\n  <div class=\"panel__overlay--header\">\n    <div class=\"panel__overlay__title\">Families</div>\n    \n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        <div class=\"list__column\">Links</div>\n        <div class=\"list__column right-text\">NGS update</div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body\">\n    <div class=\"list--vertical\">\n      ");
  stack1 = helpers.each.call(depth0, "family", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n\n</div>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES['issue'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <div class=\"list__item\">\n        <div class=\"list__column fixed\">\n          <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("issue.url")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" target=\"_blank\">");
  stack1 = helpers._triageMustache.call(depth0, "issue.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n        </div>\n        <div class=\"list__column--small fixed\">\n          ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "issue.createdAt", options) : helperMissing.call(depth0, "fromNow", "issue.createdAt", options))));
  data.buffer.push("\n        </div>\n      </div>\n      ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n      <div class=\"center-center no-comments\"><small>No open issues.</small></div>\n      ");
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n    ");
  stack1 = helpers['if'].call(depth0, "newIssue.isSaving", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  return buffer;
  }
function program6(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"issue-sending\">Sending issue...</div>\n\n    ");
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <form class=\"issue-form\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmIssue", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n      <h4>Submit a new issue</h4>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("newIssue.title"),
    'type': ("text"),
    'placeholder': ("Title"),
    'classNames': ("text-input")
  },hashTypes:{'value': "ID",'type': "STRING",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'value': depth0,'type': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("newIssue.body"),
    'placeholder': ("Describe your problem/request"),
    'classNames': ("text-input")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n\n      ");
  stack1 = helpers.unless.call(depth0, "isConfirmingIssue", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </form>\n    ");
  return buffer;
  }
function program9(depth0,data) {
  
  
  data.buffer.push("\n        <button type=\"submit\" class=\"btn\">\n          <div class=\"btn__body\">Submit</div>\n        </button>\n      ");
  }

function program11(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createIssue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n          <div class=\"btn__body\">Are you sure?</div>\n        </div>\n      ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n    \n    <div class=\"issue-form\">\n      <h4>Your issue</h4>\n      <p>Click the title to provide additional information and upload a screenshot.</p>\n      <a ");
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
  data.buffer.push(" class=\"btn\">\n        <div class=\"btn__body\">New issue</div>\n      </div>\n    </div>    \n\n  ");
  return buffer;
  }

  data.buffer.push("<div class=\"panel--sidebar issue-sidebar\">\n  <div class=\"panel__body\">\n    <div class=\"list--vertical\">\n      ");
  stack1 = helpers.each.call(depth0, "issue", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n</div>\n\n<div class=\"panel\">\n\n  <div class=\"center-center\">\n  ");
  stack1 = helpers['if'].call(depth0, "newIssue.isNew", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES['order-modal'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n  <h5>Order Sanger sequencing</h5>\n\n  <form class=\"form--complex\">\n    <label for=\"famil-id\">Family</label>\n    <div class=\"form__input-wrapper\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("family_id"),
    'id': ("famil-id"),
    'classNames': ("text-input")
  },hashTypes:{'valueBinding': "STRING",'id': "STRING",'classNames': "STRING"},hashContexts:{'valueBinding': depth0,'id': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n\n    <label for=\"hgnc-symbol\">HGNC symbol</label>\n    <div class=\"form__input-wrapper\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("hgnc_symbol"),
    'id': ("hgnc-symbol"),
    'classNames': ("text-input")
  },hashTypes:{'valueBinding': "STRING",'id': "STRING",'classNames': "STRING"},hashContexts:{'valueBinding': depth0,'id': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n\n    <label for=\"chr-pos\">Chromosome position</label>\n    <div class=\"form__input-wrapper\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'valueBinding': ("chr_pos"),
    'id': ("chr-pos"),
    'classNames': ("text-input")
  },hashTypes:{'valueBinding': "STRING",'id': "STRING",'classNames': "STRING"},hashContexts:{'valueBinding': depth0,'id': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n\n    <label for=\"amino-change\">Amino acid change</label>\n    <div class=\"form__input-wrapper\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'valueBinding': ("amino_change"),
    'id': ("amino-change"),
    'classNames': ("text-input")
  },hashTypes:{'valueBinding': "STRING",'id': "STRING",'classNames': "STRING"},hashContexts:{'valueBinding': depth0,'id': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n\n    <label for=\"gt-call\">GT Call</label>\n    <div class=\"form__input-wrapper\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'valueBinding': ("gt_call"),
    'id': ("gt-call"),
    'classNames': ("text-input")
  },hashTypes:{'valueBinding': "STRING",'id': "STRING",'classNames': "STRING"},hashContexts:{'valueBinding': depth0,'id': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n\n    <div class=\"btn-group\">\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendForm", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n        <div class=\"btn__body\">Confirm</div>\n      </button>\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n        <div class=\"btn__body\">Cancel</div>\n      </button>\n    </div>\n  </form>\n");
  return buffer;
  }

  stack1 = (helper = helpers['modal-dialog'] || (depth0 && depth0['modal-dialog']),options={hash:{
    'action': ("close")
  },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "modal-dialog", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});
Ember.TEMPLATES['settings'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"panel settings\">\n  <div class=\"panel__body settings-body\">\n    <div class=\"center-center box\">\n      <div class=\"btn-group\">\n        <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetHidden", "family", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n          <div class=\"btn__body\">Reset hidden families</div>\n        </div>\n        <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetHidden", "variant", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n          <div class=\"btn__body\">Reset hidden variants</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES['variant'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n            ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "hgncApprovedName", options) : helperMissing.call(depth0, "capitalize", "hgncApprovedName", options))));
  data.buffer.push("\n          ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers._triageMustache.call(depth0, "hgncSymbol", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <small>");
  stack1 = helpers._triageMustache.call(depth0, "hgncSynonymsString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n          ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" - ");
  stack1 = helpers._triageMustache.call(depth0, "stopBp", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n              ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "functionalAnnotation", options) : helperMissing.call(depth0, "capitalize", "functionalAnnotation", options))));
  data.buffer.push("\n            ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n              No functional annotation\n            ");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("All variants");
  }

function program13(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n            <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideInList", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n              <div class=\"btn__body\">Hide</div>\n            </div>\n            ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n            <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unhideInList", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n              <div class=\"btn__body\">Unhide</div>\n            </div>\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              <div>");
  stack1 = helpers._triageMustache.call(depth0, "syn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <tr>\n            <td class=\"predict__main predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "call.idn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
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

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <div class=\"box compounds\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "gt-call", "", options) : helperMissing.call(depth0, "render", "gt-call", "", options))));
  data.buffer.push("\n    </div>\n    ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"comment-box__wrapper\">\n              <div class=\"comment-box\">\n                <div class=\"comment-box__header\">\n                  <div class=\"comment-box__header__body\">\n                    <b>");
  stack1 = helpers._triageMustache.call(depth0, "comment.userName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</b> commented 3 days ago\n                  </div>\n                  <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteComment", "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"comment-box__header__action\">Delete</div>\n                </div>\n                <div class=\"comment-box__body\">");
  stack1 = helpers._triageMustache.call(depth0, "comment.userComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n              </div>\n            </div>\n            ");
  return buffer;
  }

function program27(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"center-center no-comments\"><small>No comments added yet.</small></div>\n            ");
  }

  data.buffer.push("<div class=\"panel variant\">\n\n  <div class=\"panel__overlay--header variant-header\">\n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        <div class=\"list__column--small fixed center-text\">\n          <div class=\"rank-score\">");
  stack1 = helpers._triageMustache.call(depth0, "rankScore", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        </div>\n        <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingFullGeneName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\"list__column fixed\">\n          ");
  stack1 = helpers['if'].call(depth0, "isShowingFullGeneName", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          <br>\n          <small>");
  stack1 = helpers._triageMustache.call(depth0, "ensemblGeneIdString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n        </div>\n        <div class=\"list__column fixed\">\n          Chr ");
  stack1 = helpers._triageMustache.call(depth0, "chrom", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" | ");
  stack1 = helpers._triageMustache.call(depth0, "startBp", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  stack1 = helpers.unless.call(depth0, "isSingleBase", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" |\n          ");
  stack1 = helpers._triageMustache.call(depth0, "refNt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" &rarr; ");
  stack1 = helpers._triageMustache.call(depth0, "altNt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          <br>\n\n          <small>\n            ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "geneAnnotation", options) : helperMissing.call(depth0, "capitalize", "geneAnnotation", options))));
  data.buffer.push(" |\n            ");
  stack1 = helpers['if'].call(depth0, "functionalAnnotation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </small>\n        </div>\n        <div class=\"list__column fixed\">\n          <div class=\"btn-group\">\n            <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openOrderModal", "sangerData", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"btn\">\n              <div class=\"btn__body\">Order Sanger</div>\n            </div>\n\n            <div class=\"btn\">\n              <div class=\"btn__body\">");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variants", "currentFamily", options) : helperMissing.call(depth0, "link-to", "variants", "currentFamily", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            </div>\n\n            ");
  stack1 = helpers.unless.call(depth0, "isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n          \n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body\">\n    <div class=\"box predictions\">\n      <table class=\"predict\">\n        <tr class=\"predict__top\">\n          <td class=\"predict__main predict__part\">Severity</td>\n          <td ");
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
  data.buffer.push("</div>\n            <div class=\"predict__text\">PolyPhen Div</div>\n          </td>\n\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part polyphenVarHuman::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "polyphenVarHuman", options) : helperMissing.call(depth0, "fallback", "polyphenVarHuman", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">PolyPhen Var</div>\n          </td>\n\n          <td ");
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
  data.buffer.push("</div>\n            <div class=\"predict__text\">GERP exome</div>\n          </td>\n\n        </tr>\n\n        <tr>\n          <td class=\"predict__main predict__part\">Frequency</td>\n          <td ");
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
  stack1 = helpers._triageMustache.call(depth0, "dbsnpFlag", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            <div class=\"predict__text\">dbSNP 137</div>\n          </td>\n        </tr>\n\n        <tr class=\"conservation-row\">\n          <td class=\"predict__main predict__part\">Conservation</td>\n          <td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":predict__part phylopWholeExome::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"predict__number\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "phylopWholeExome", options) : helperMissing.call(depth0, "fallback", "phylopWholeExome", options))));
  data.buffer.push("</div>\n            <div class=\"predict__text\">WE PhyloP</div>\n          </td>\n\n          <td ");
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
  data.buffer.push("</div>\n            <div class=\"predict__text\">WE LRT</div>\n          </td>\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"box annotations\">\n      <table class=\"predict annotate-table\">\n        <tr>\n          <td class=\"predict__main predict__part\">\n            <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("omimLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n              <div class=\"logo--omim\">OMIM</div>\n            </a>\n          </td>\n          <td class=\"predict__part\">\n            ");
  stack1 = helpers.each.call(depth0, "syn", "in", "omim.SYNDROMS", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </td>\n        </tr>\n        <tr>\n          <td class=\"predict__main predict__part\">\n            <a href=\"http://www.hgmd.cf.ac.uk/ac/index.php\" class=\"link\" target=\"_blank\">\n              <img src=\"/static/img/hgmd-logo.svg\">\n            </a>\n          </td>\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "hgmd", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        <tr>\n          <td class=\"predict__main predict__part\">Disease group</td>\n          <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "diseaseGroup", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"box gt-call\">\n      <table class=\"predict gt-call-table\">\n        <thead>\n          <tr>\n            <th class=\"predict__part\">IDN</th>\n            <th class=\"predict__part\">GT</th>\n            <th class=\"predict__part\">AD</th>\n            <th class=\"predict__part\">PL</th>\n            <th class=\"predict__part\">GQ</th>\n          </tr>\n        </thead>\n        <tbody>\n        ");
  stack1 = helpers.each.call(depth0, "call", "in", "gt.gtCalls", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <tr>\n          <td class=\"predict__main predict__part\">Inheritance models</td>\n          ");
  stack1 = helpers.each.call(depth0, "model", "in", "geneModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tr>\n        </tbody>\n      </table>\n\n    </div>\n\n    ");
  stack1 = helpers['if'].call(depth0, "hasCompounds", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"box list--horizontal external-links\">\n      <a ");
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
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/scout-logo-gray.svg\"></div>\n        <div class=\"link__text\">IDs</div>\n      </a>\n\n      <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("igvLink")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"link\" target=\"_blank\">\n        <div class=\"link__icon\"><img src=\"/static/img/igv-logo-gray.svg\"></div>\n        <div class=\"link__text\">IGV</div>\n      </a>\n    </div>\n\n    <div class=\"box variant-comments\">\n      <div class=\"panel__wrapper family-comments\">\n        <div class=\"panel\">\n          <div class=\"panel__overlay--header\">\n            <div class=\"panel__overlay__title\">Comments</div>\n          </div>\n          <div class=\"panel__body\">\n            ");
  stack1 = helpers.each.call(depth0, "comment", "in", "comments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n        </div>\n\n        <div class=\"panel\">\n          <div class=\"panel__overlay--header\">\n            <div class=\"panel__overlay__title\">Submit new comment</div>\n          </div>\n          <div class=\"panel__body\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers['comment-box'] || (depth0 && depth0['comment-box']),options={hash:{
    'submit': ("postComment"),
    'tags': ("variantPriorities"),
    'title': ("Variant comment"),
    'tagPrompt': ("Set priority")
  },hashTypes:{'submit': "STRING",'tags': "ID",'title': "STRING",'tagPrompt': "STRING"},hashContexts:{'submit': depth0,'tags': depth0,'title': depth0,'tagPrompt': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "comment-box", options))));
  data.buffer.push("\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n</div>");
  return buffer;
  
});
Ember.TEMPLATES['variants'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  <div class=\"v-panel filter-panel\">\n    <div class=\"panel__wrapper\">\n      \n      <div class=\"panel\">\n        <div class=\"panel__overlay--footer filter-footer\">\n          <div class=\"btn-group\">\n            <div class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "filter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n              <div class=\"btn__body\">Filter</div>\n            </div>\n            <div class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clinicalFilter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n              <div class=\"btn__body\">Clinical filter</div>\n            </div>\n            <div class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clearFilter", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n              <div class=\"btn__body\">Clear</div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"panel__body\">\n          <div class=\"list--vertical\">\n            <div class=\"divider\">Frequency cutoffs</div>\n            <div class=\"list__item\">\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("relation"),
    'selectionBinding': ("relation"),
    'value': ("LESSER")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" Lesser\n              </div>\n\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("relation"),
    'selectionBinding': ("relation"),
    'value': ("GREATER")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" Greater\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column space-between\">\n                <label for=\"genomes\">1000 Genomes</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("genomes"),
    'type': ("text"),
    'valueBinding': ("thousand_g"),
    'placeholder': ("0.1"),
    'classNames': ("text-input")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column space-between\">\n                <label for=\"dbSNP129\">dbSNP 129</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("dbSNP129"),
    'type': ("text"),
    'valueBinding': ("dbsnp129"),
    'placeholder': ("0.1"),
    'classNames': ("text-input")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column space-between\">\n                <label for=\"dbSNP132\">dbSNP 132</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("dbSNP132"),
    'type': ("text"),
    'valueBinding': ("dbsnp132"),
    'placeholder': ("0.1"),
    'classNames': ("text-input")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column space-between\">\n                <label for=\"esp6500\">esp6500</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("esp6500"),
    'type': ("text"),
    'valueBinding': ("esp6500"),
    'placeholder': ("0.1"),
    'classNames': ("text-input")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n            <div class=\"divider\">Database and gene search</div>\n            <div class=\"list__item\">\n              ");
  stack1 = helpers.each.call(depth0, "db", "in", "filter.databases", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n\n            <div class=\"list__item\">\n              <div class=\"list__column space-between\">\n                <label for=\"gene-name\">Gene name</label>\n                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("gene-name"),
    'type': ("text"),
    'valueBinding': ("gene_name"),
    'placeholder': ("ADK"),
    'classNames': ("text-input")
  },hashTypes:{'id': "STRING",'type': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'classNames': "STRING"},hashContexts:{'id': depth0,'type': depth0,'valueBinding': depth0,'placeholder': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div> \n\n      \n      ");
  stack1 = helpers.each.call(depth0, "group", "in", "filterGroups", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              <div class=\"list__column\">\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("database"),
    'selectionBinding': ("database"),
    'value': ("db")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "ID"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "db", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              </div>\n              ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"panel\">\n          <div class=\"panel__body\">\n            <div class=\"list--vertical\">\n              <div class=\"divider\">");
  stack1 = helpers._triageMustache.call(depth0, "group.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n\n              ");
  stack1 = helpers.each.call(depth0, "filter", "in", "group.filters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            </div>\n          </div>\n        </div>\n      ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                <div class=\"list__item\">\n                  <div class=\"list__column\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checkedBinding': ("filter.property"),
    'classNames': ("toggle-slider__input")
  },hashTypes:{'type': "STRING",'checkedBinding': "STRING",'classNames': "STRING"},hashContexts:{'type': depth0,'checkedBinding': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "filter.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                  </div>\n                </div>\n              ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n        <span class=\"panel__overlay__title\">\n          Variants <small>| ");
  stack1 = helpers._triageMustache.call(depth0, "database", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n        </span>\n\n        ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n\n        <div class=\"list__column--slim\">\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div class=\"list__column--slim\">\n          Variants <small>| ");
  stack1 = helpers._triageMustache.call(depth0, "database", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</small>\n        </div>\n\n        <div class=\"list__column--slim\">\n          <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingModal", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n            <div class=\"btn__body\">\n              ");
  stack1 = helpers['if'].call(depth0, "isShowingModal", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" filter\n            </div>\n          </div>\n        </div>\n\n        ");
  return buffer;
  }
function program10(depth0,data) {
  
  
  data.buffer.push("\n            <div class=\"btn__body\">Families</div>\n          ");
  }

function program12(depth0,data) {
  
  
  data.buffer.push("Close");
  }

function program14(depth0,data) {
  
  
  data.buffer.push("Open");
  }

function program16(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"list__column--small fixed\">1000 Genomes</div>\n        <div class=\"list__column--small fixed\">PolyPhen</div>\n        <div class=\"list__column--small fixed\">Gene annotation</div>\n        <div class=\"list__column fixed\">Functional annotation</div>\n        <div class=\"list__column fixed\">Inheritance models</div>\n        <div class=\"list__column fixed\">Disease group</div>\n        <div class=\"list__column--small fixed\">HGMD</div>\n        <div class=\"list__column--small fixed\">Hide</div>\n        ");
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      ");
  stack1 = helpers.unless.call(depth0, "variant.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <div class=\"list__item\">\n\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("list__column--small fixed rank-score-column")
  },hashTypes:{'classNames': "STRING"},hashContexts:{'classNames': depth0},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variant", "variant", options) : helperMissing.call(depth0, "link-to", "variant", "variant", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        <div class=\"list__column--small fixed\">\n          <div class=\"hgnc-symbol\">");
  stack1 = helpers._triageMustache.call(depth0, "variant.hgncSymbol", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        </div>\n\n        ");
  stack1 = helpers.unless.call(depth0, "variantLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n      </div>\n      ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          ");
  stack1 = helpers._triageMustache.call(depth0, "variant.rankScore", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n          ");
  stack1 = helpers['if'].call(depth0, "variant.rating", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":notification--bubble variant.rating")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            ");
  stack1 = helpers._triageMustache.call(depth0, "variant.rating", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n          ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column--small :fixed variant.thousandG::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n          <div class=\"float-left\">");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "variant.thousandG", options) : helperMissing.call(depth0, "fallback", "variant.thousandG", options))));
  data.buffer.push("</div>\n\n          ");
  stack1 = helpers['if'].call(depth0, "variant.isInOtherFamilies", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column--small :fixed variant.polyphenDivHuman::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n          ");
  data.buffer.push(escapeExpression((helper = helpers.fallback || (depth0 && depth0.fallback),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "variant.polyphenDivHuman", options) : helperMissing.call(depth0, "fallback", "variant.polyphenDivHuman", options))));
  data.buffer.push("\n        </div>\n\n        <div class=\"list__column--small fixed\">");
  stack1 = helpers._triageMustache.call(depth0, "variant.geneAnnotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed variant.functionalAnnotation::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n          ");
  stack1 = helpers['if'].call(depth0, "variant.functionalAnnotation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed :scrollable variant.geneModel::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n          ");
  stack1 = helpers['if'].call(depth0, "variant.geneModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column :fixed :scrollable variant.diseaseGroup::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n          ");
  stack1 = helpers['if'].call(depth0, "variant.diseaseGroup", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":list__column--small :fixed variant.hgmd::undef")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n          ");
  stack1 = helpers['if'].call(depth0, "variant.hgmd", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n\n        <div class=\"list__column--small fixed hide-variant\">\n          <div class=\"btn\">\n            <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideVariant", "variant", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"btn__body\">Hide</div>\n          </div>\n        </div>\n        \n        ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <div class=\"notification float-right\">");
  stack1 = helpers._triageMustache.call(depth0, "variant.otherFamiliesCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n          ");
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers._triageMustache.call(depth0, "variant.functionalAnnotation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }

function program28(depth0,data) {
  
  
  data.buffer.push("\n            Nada\n          ");
  }

function program30(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n            ");
  data.buffer.push(escapeExpression((helper = helpers['pop-over'] || (depth0 && depth0['pop-over']),options={hash:{
    'title': ("variant.geneModelString"),
    'variant': ("variant"),
    'show': ("showPopOver"),
    'hide': ("hidePopOver")
  },hashTypes:{'title': "ID",'variant': "ID",'show': "STRING",'hide': "STRING"},hashContexts:{'title': depth0,'variant': depth0,'show': depth0,'hide': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "pop-over", options))));
  data.buffer.push("\n          ");
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers._triageMustache.call(depth0, "variant.diseaseGroup", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers._triageMustache.call(depth0, "variant.hgmd", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      <div class=\"fixed-tooltip\">\n        ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "gt-call", "hoveredVariant", options) : helperMissing.call(depth0, "render", "gt-call", "hoveredVariant", options))));
  data.buffer.push("\n      </div>\n      ");
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
  stack1 = helpers['if'].call(depth0, "variantLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        \n      </div>\n\n      <div class=\"list__item\">\n        <div class=\"list__column--small fixed\">Rank score</div>\n        <div class=\"list__column--small fixed\">Gene</div>\n        ");
  stack1 = helpers.unless.call(depth0, "variantLoaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body v-panel\">\n    <div class=\"list--vertical\">\n      ");
  stack1 = helpers.each.call(depth0, "variant", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n      ");
  stack1 = helpers['if'].call(depth0, "isShowingGtCall", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n</div>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES['components/comment-box'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("tags"),
    'value': ("selectedTag"),
    'optionValuePath': ("content.id"),
    'optionLabelPath': ("content.label"),
    'prompt': ("tagPrompt")
  },hashTypes:{'content': "ID",'value': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'prompt': "ID"},hashContexts:{'content': depth0,'value': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'prompt': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"comment-box\">\n  ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'valueBinding': ("body"),
    'classNames': ("comment-box__body--input"),
    'placeholder': ("Write your words here...")
  },hashTypes:{'valueBinding': "STRING",'classNames': "STRING",'placeholder': "STRING"},hashContexts:{'valueBinding': depth0,'classNames': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n  <div class=\"comment-box__footer\">\n    <div class=\"comment-box__footer__body\">");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n    ");
  stack1 = helpers['if'].call(depth0, "hasTags", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"comment-box__submit\">Submit</div>\n  </div>\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES['components/modal-dialog'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal__overlay\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n  <div class=\"modal__wrapper\">\n    <div class=\"modal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n      ");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES['components/pop-over'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES['family/index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Variants");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n                Show raw pedigree\n                ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n                Hide raw pedigree\n                ");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <div class=\"box raw-pedigree\">\n      ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "family.pedigree", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n    </div>\n\n    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"box family\">\n      <table class=\"predict gt-call-table\">\n\n        ");
  stack1 = helpers.each.call(depth0, "sample", "in", "family.samples", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </table>\n    </div>\n\n    ");
  stack1 = helpers['if'].call(depth0, "hasGeneModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <div class=\"box panel__wrapper family-comments\">\n      <div class=\"panel\">\n        <div class=\"panel__overlay--header\">\n          <div class=\"panel__overlay__title\">Diagnostic comments</div>\n        </div>\n        <div class=\"panel__body\">\n          ");
  stack1 = helpers.each.call(depth0, "comment", "in", "diagnosticComments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n      </div>\n\n      <div class=\"panel\">\n        <div class=\"panel__overlay--header\">\n          <div class=\"panel__overlay__title\">Research comments</div>\n        </div>\n        <div class=\"panel__body\">\n\n          ");
  stack1 = helpers.each.call(depth0, "comment", "in", "researchComments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </div>\n      </div>\n    </div>\n\n    <div class=\"box panel__wrapper family-submit-comment\">\n\n      <div class=\"panel\">\n        <div class=\"panel__body\">\n          ");
  data.buffer.push(escapeExpression((helper = helpers['comment-box'] || (depth0 && depth0['comment-box']),options={hash:{
    'submit': ("postComment"),
    'tags': ("commentCategories"),
    'type': ("IEM"),
    'title': ("IEM Comment")
  },hashTypes:{'submit': "STRING",'tags': "ID",'type': "STRING",'title': "STRING"},hashContexts:{'submit': depth0,'tags': depth0,'type': depth0,'title': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "comment-box", options))));
  data.buffer.push("\n        </div>\n      </div>\n\n      <div class=\"panel\">\n        <div class=\"panel__body\">\n          ");
  data.buffer.push(escapeExpression((helper = helpers['comment-box'] || (depth0 && depth0['comment-box']),options={hash:{
    'submit': ("postComment"),
    'tags': ("commentCategories"),
    'type': ("research"),
    'title': ("Research Comment")
  },hashTypes:{'submit': "STRING",'tags': "ID",'type': "STRING",'title': "STRING"},hashContexts:{'submit': depth0,'tags': depth0,'type': depth0,'title': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "comment-box", options))));
  data.buffer.push("\n        </div>\n      </div>\n\n    </div>\n    ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <tr>\n            <td class=\"predict__main predict__part\">");
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

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <div class=\"box\">\n      <table class=\"predict\">\n        <tr>\n          <td class=\"predict__main predict__part\">Possible gene models</td>\n          ");
  stack1 = helpers.each.call(depth0, "model", "in", "family.samples.1.inheritanceModels", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tr>\n      </table>\n    </div>\n    ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <td class=\"predict__part\">");
  stack1 = helpers._triageMustache.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <div class=\"comment-box__wrapper\">\n            <div class=\"comment-box\">\n              <div class=\"comment-box__header\">\n                <div class=\"comment-box__header__body\">\n                  <b>");
  stack1 = helpers._triageMustache.call(depth0, "comment.userName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</b> commented 3 days ago\n                </div>\n                <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteComment", "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"comment-box__header__action\">Delete</div>\n              </div>\n              <div class=\"comment-box__body\">");
  stack1 = helpers._triageMustache.call(depth0, "comment.userComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n            </div>\n          </div>\n          ");
  return buffer;
  }

function program17(depth0,data) {
  
  
  data.buffer.push("\n          <div class=\"center-center no-comments\"><small>No comments added yet.</small></div>\n          ");
  }

  data.buffer.push("<div class=\"panel family\">\n\n  <div class=\"panel__overlay--header family-header\">\n\n    <div class=\"list--vertical\">\n      <div class=\"list__item\">\n        <div class=\"list__column fixed center-text\">\n          <div class=\"family-id\">Family ");
  stack1 = helpers._triageMustache.call(depth0, "family.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n        </div>\n        <div class=\"list__column fixed center-text\">\n          Last update: ");
  data.buffer.push(escapeExpression((helper = helpers.fromNow || (depth0 && depth0.fromNow),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "family.analyzedDate", options) : helperMissing.call(depth0, "fromNow", "family.analyzedDate", options))));
  data.buffer.push("\n        </div>\n        <div class=\"list__column fixed\">\n          <div class=\"btn-group\">\n            <div class=\"btn\">\n              <div class=\"btn__body\">\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "variants", "family", options) : helperMissing.call(depth0, "link-to", "variants", "family", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              </div>\n            </div>\n\n            <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleProperty", "isShowingRawPedigree", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\"btn\">\n              <div class=\"btn__body\">\n                ");
  stack1 = helpers.unless.call(depth0, "isShowingRawPedigree", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel__body family-body\">\n\n    ");
  stack1 = helpers['if'].call(depth0, "isShowingRawPedigree", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  </div>\n</div>\n");
  return buffer;
  
});