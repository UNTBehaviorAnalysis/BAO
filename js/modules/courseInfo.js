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
		
		events: {
			'click #coursesMenuDropDown' : 'toggle'
		},

		render: function(){ 
			var that = this;
			var model = new StaticContentModel({'id': this.id});
			model.fetch().done(function(model){ 
				that.$el.html(model[0].CONTENT);
				switch(that.id){
					case '133':
					case '136':
					case '137':
						this.courseCommonID = 135;
						break;
				}
				var courseCommon = new StaticContentModel({'id': this.courseCommonID});
				courseCommon.fetch().done(function(courseCommon){
					$('.courseCommon').html(courseCommon[0].CONTENT);
					var grp = window.location.hash.replace('#/courseInfo/','');					
					$('#courseInfoNavBar').find('.cinav[data-id="'+grp+'"]').addClass('cinavActive');
					var coursesMenu = new StaticContentModel({'id': 134});
					coursesMenu.fetch().done(function(coursesMenu){
						$('#courseMenu').html(coursesMenu[0].CONTENT);
						switch(that.id){
							case '136':
								break;
							case '137':
								this.addedPartsID = 138;
								break;
						};
						var addedParts = new StaticContentModel({'id': this.addedPartsID});
						addedParts.fetch().done(function(addedParts){
							switch(that.id){
								case '136':
									break;
								case '137':
									$('#requirements').html(addedParts[0].CONTENT);
									break;
							}
						});
					});
				});
			});	
		},
		
		setActive: function(ev){
			this.$el.find('.cnav').removeClass('cactive');
		},
		
		toggle: function(e){
			var e = document.getElementById('courses');
			if(e.style.display == 'block'){
				e.style.display = 'none';
			}else{
				e.style.display = 'block';
			}
		}
	});

	return StaticContentView;
  
});
