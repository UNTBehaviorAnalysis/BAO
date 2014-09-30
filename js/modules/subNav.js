define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

	var NavBarModel = Backbone.Model.extend({
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
	
	var NavBar = Backbone.View.extend({
		el: $('#topSubNav'),

		initialize: function(vars){
			this.id = vars.id;
		},
		
		events: {
			'click .nav': 'setActive'
		},

		render: function(){ 
			var that = this;
			var model = new NavBarModel({'id': this.id});
			model.fetch().done(function(model){ 
				that.$el.html(model[0].CONTENT).promise().done(function(){
					var grp = window.location.hash.replace('#/content/','');					
					$('#topSubNav').find('.cnav[data-id="'+grp+'"]').addClass('cactive');
				});
			});	
		},
		
		setActive: function(ev){
			this.$el.find('.cnav').removeClass('cactive');
		}

	});

	return NavBar;
  
});
