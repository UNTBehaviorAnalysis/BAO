define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

	var FooterModel = Backbone.Model.extend({
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
	
	var Footer = Backbone.View.extend({
		el: $("#footer"),

		initialize: function(vars){
				this.id = vars.id;
			},

		render: function(){ 
			var that = this;
			var model = new FooterModel({'id': this.id});		
			model.fetch().done(function(model){ 
				that.$el.html(model[0].CONTENT);
			});	
		}

	});

	return Footer;
  
});
