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
	'text!templates/ceTitles.htm'
], function($, _, Backbone, Template){
	
	var ContentCNModel = Backbone.Model.extend({
		urlRoot: '/rest/DATABASE/calls/content',
		
		initialize: function(vars) {		
			//console.log(vars);
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
	
	var TitlesModel = Backbone.Model.extend({
		
		defaults: {
			EXID: '',
			TITLE: ''
		}
		
	});
	
	var TitlesCollection = Backbone.Collection.extend({
		model: TitlesModel,	
		
		initialize: function(){
			//console.log($('#qs').val());
		},
		
		url: function() {
			return '/rest/DATABASE/calls/cetitles?qs=' + escape($('#qs').val());
		}
	});
	
	var TitlesListView = Backbone.View.extend({
		el: '.twoThirds',
		
		initialize: function() {			
			this.collection = new TitlesCollection({collection: TitlesCollection});
			var that = this;
			this.collection.fetch().done(function(){
				that.render();
			});
		},
		
		render: function(){
			
			var data = {
				titles: this.collection.models,
				_: _ 
			};	

			var compiledTemplate = _.template( Template, data );
			this.$el.html( compiledTemplate );
			
		}
		
	});
	
	var ContentCNView = Backbone.View.extend({	
		el: "#pageBlock",
		
		initialize: function(vars){
			this.str_difficult = '';
			this.str_format = '';
			this.str_topic = '';
			this.id = vars.id;
		},
		
		events: {
			'change select' : 'changeCall',
			'keydown #search' : 'filterTitles'
		},

		render: function(){ 
			var that = this;
			var model = new ContentCNModel({'id': this.id});
			model.fetch().done(function(model){ 
				that.$el.html(model[0].CONTENT);
				var titlesListView = new TitlesListView({ collection: TitlesCollection });
				titlesListView.render();
			});	
		},
		
		filterTitles: function(e){
			//console.log(e.type, e.keyCode);
			if(e.keyCode === 13){
				//console.log($('#qs').val());
			}
		},
		
		changeCall: function(obj){
			this.changedValue = obj.currentTarget.name;
			console.log('name: '+ obj.currentTarget.name + ' | value: ' + obj.currentTarget.value);			
			this.formatDifficulty($('#difficulty').val());
			this.formatFormat($('#format').val());
			this.formatTopic($('#topic').val());			
			//this.tryThis();
		},
		
		formatDifficulty: function (val){
			this.str_difficult = '';
			switch(val){
				case 'entry':
					this.str_difficult +=  ' and a.Rating=1 ';					
					break;
				case 'intermediate':
					this.str_difficult +=  ' and a.Rating=2 ';
					break;
				case 'advanced':
					this.str_difficult +=  ' and a.Rating=3 ';
					break;
			};
		},
		
		formatFormat: function (val){
			this.str_format = '';
			switch(val){
				case 'lecture':
					this.str_format +=  ' and t.CID=1 ';					
					break;
			};
			//finish code
		},
		
		formatTopic: function (val){
			this.str_topic = '';
			//finish code
			this.insertQSandFilter();
		},
		
		insertQSandFilter: function () {
			var qstring = this.str_difficult + this.str_format + this.str_topic;
			$('#qs').val($.trim(qstring.replace(/\s+/g, ' ')));
			var titlesListView = new TitlesListView({ collection: TitlesCollection });
			titlesListView.render();
		},
		
		tryThis: function (){
			//console.log(this.changedValue);
		}
		
	});

	return ContentCNView;
  
});
