/**
*topActivitiesNav MODULE
*see /templates/courses/topActivitiesNav.htm
*only shows Home, My Courses, Logout
*/
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/theNav.htm'
], function($, _, Backbone, Template){

  var NavBar = Backbone.View.extend({
    el: $('#topNav'),
	
    render: function(){		
		var compiledTemplate = _.template( Template );    
		this.$el.html(compiledTemplate);
    }

  });

  return NavBar;
  
});
