define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var HeaderModel = Backbone.Model.extend({
  
		urlRoot: '/rest/DATABASE/calls/content',
		
		initialize: function(vars) {		
			this.id = vars.id;
		},
		
		defaults: {
			CONTENT: '',
			COURSE: '',
			PAGETITLE: '',
			STYLE: ''
		},
		
		url: function() {
			return this.urlRoot + '?id=' + this.id;			
		}
	});
  
  var Header = Backbone.View.extend({
    el: $("#branding"),

    initialize: function(vars){
			this.id = vars.id;
		},

	render: function(){ 
		var that = this;
		var model = new HeaderModel({'id': this.id});		
		model.fetch().done(function(model){ 
			that.$el.html(model[0].CONTENT);
		});	
	}

  });

  return Header;
  
});
