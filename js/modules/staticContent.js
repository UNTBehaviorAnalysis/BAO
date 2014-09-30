/**
*staticContent MODULE
*retrieves static content from database
*@param ID
*@return static content
*/
define([
	'jquery',
	'underscore',
	'backbone',
	'modules/theNav',
	'text!templates/staticContent.htm'
], function($, _, Backbone, TheNav, Template){
	
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
			var staticContentModel = new StaticContentModel({'id': this.id});
			staticContentModel.fetch().done(function(staticContentModel){
				var compiledTemplate = _.template( Template, {staticContentModel: staticContentModel[0]} );  
				that.$el.html(compiledTemplate);	
				var theNav = new TheNav();
				theNav.render();	
			});	
		}
	});

	return StaticContentView;
  
});
