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
	'text!templates/editContent.htm'
], function($, _, Backbone, TheNav, Template){
	
	var EditContentModel = Backbone.Model.extend({
		urlRoot: '/rest/DATABASE/calls/content',
		initialize: function(vars) {		
			this.id = vars.id;
		},
		
		defaults: {
			CONTENT: '',
			COURSE: '',
			NOTES: '',
			PAGETITLE: '',
			PATH: '',
			STYLE: ''
		},
		
		url: function() {
			return this.urlRoot + '?id=' + this.id;			
		}
	});
	
	var EditContentView = Backbone.View.extend({	
		el: "#pageBlock",
		
		initialize: function(vars){
			this.id = vars.id;
		},
		
		events: {
		'click': 'save'
		},

		render: function(){ 
			var that = this;
			var editContentModel = new EditContentModel({'id': this.id});
			editContentModel.fetch().done(function(editContentModel){
				var compiledTemplate = _.template( Template, {editContentModel: editContentModel[0]} );				
				that.$el.html(compiledTemplate);	
				var theNav = new TheNav();
				theNav.render();	
			});	
		},	
		
		save: function(args){
			//console.log($('textarea').html());			
		}
	});

	return EditContentView;
  
});
