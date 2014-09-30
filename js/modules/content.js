/**
*staticContent MODULE
*retrieves static content from database
*@param ID
*@return static content
*/
define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	
	var StaticContentModel = Backbone.Model.extend({
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
	
	var StaticContentView = Backbone.View.extend({	
		el: "#pageBlock",
		
		initialize: function(vars){
			this.id = vars.id;
		},

		render: function(){ 
			var that = this;
			var model = new StaticContentModel({'id': this.id});
			model.fetch().done(function(model){ 
				that.$el.html(model[0].CONTENT);	
			});	
		}
	});

	return StaticContentView;
  
});
