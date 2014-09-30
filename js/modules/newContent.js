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
	'text!templates/newContent.htm'
], function($, _, Backbone, TheNav, Template){
	
	var NewContentModel = Backbone.Model.extend({
		//urlRoot: '/rest/DATABASE/calls/content',
		initialize: function(vars) {		

		},
		defaults: {
			CONTENT: '',
			COURSE: '',
			PAGETITLE: '',
			STYLE: ''
		}/*,
		url: function() {
			return this.urlRoot + '?id=' + this.id;			
		}*/
	});
	
	var NewContentView = Backbone.View.extend({	
		el: "#pageBlock",
		
		initialize: function(vars){
		
		},
		
		events: {
		//'click': 'save'
		},

		render: function(){ 
			var that = this;
			var newContentModel = new NewContentModel();
			//editContentModel.fetch().done(function(editContentModel){
				var compiledTemplate = _.template( Template, {newContentModel: newContentModel[0]} );				
				that.$el.html(compiledTemplate);	
				var theNav = new TheNav();
				theNav.render();	
			//});	
		},	
		
		save: function(args){
			//console.log($('textarea').html()+":"+$('.pageTitle').val());			
		}
	});

	return NewContentView;
  
});
