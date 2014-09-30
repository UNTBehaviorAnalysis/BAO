define([
  'jquery',
  'underscore',
  'backbone',
  'modules/subNav'
], function($, _, Backbone, SubNav){

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
		el: $('#topNav'),

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
					
					switch(grp){
						case '1':
							that.$el.find('.nav').removeClass('active');
							break;
						case '2':
						case '4':
						case '6':
						case '89':
						case '100':
						case '104':
						case '130':
						case '131':
							$('#topNav').find('.nav[data-id="2"]').addClass('active');
							var subNav = new SubNav({'id': 87});
							subNav.render();
							break;
						case '47':
						case '111':
						case '118':
						case '119':
							$('#topNav').find('.nav[data-id="47"]').addClass('active');
							var subNav = new SubNav({'id': 108});
							subNav.render();
							break;
						case '84':
						case '121':
							$('#topNav').find('.nav[data-id="84"]').addClass('active');
							var subNav = new SubNav({'id': 120});
							subNav.render();
							break;
						case '85':
						case '124':
						case '125':
						case '127':
							$('#topNav').find('.nav[data-id="85"]').addClass('active');
							var subNav = new SubNav({'id': 122});
							subNav.render();
							break;
					}
				});
			});	
		},
		
		setActive: function(ev){
			this.$el.find('.nav').removeClass('active');
		}

	});

	return NavBar;
  
});
