// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'modules/courses/coursesHome',
  'modules/courses/myCourses',
  'modules/courses/courseActivitiesByCID',
  'modules/courses/courseActivityByExID',
  'modules/activityTemplates/activityFeedback', 
  'modules/content',
  'modules/courseInfo',
  'modules/contentCN',
  'modules/staticContent',
  'modules/editContent',
  'modules/newContent',
  'modules/topNav',
  'modules/header',
  'modules/footer'
], function($, _, Backbone, CoursesHome, myCourses, CourseActivitiesByCID, CourseActivityByExID, ActivityFeedback, Content, CourseInfo, ContentCN, StaticContent, EditContent, NewContent, TopNav, Header, Footer) {
		
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
	  'courses/home': 'showCoursesHome',
	  'courses/myCourses': 'showCourses',
	  'courses/myCourses/:id': 'showCourses',
	  'courses/courseActivitiesByCID/:id': 'showActivities',
	  'courses/courseActivityByExID/:id': 'initActivity',
	  'activityTemplates/activityFeedback/:id': 'showActivityFeedback',
	  'content/:id': 'content',
	  'courseInfo/:id': 'courseInfo',
	  'contentCN/:id': 'contentCN',
	  'staticContent/:id': 'showContent',	  
	  'editContent/:id': 'editContent',
	  'newContent': 'newContent',
      
      // Default
      '*actions': 'defaultAction'
    },
	
	hashChange : function(evt) {
		if(this.cancelNavigate) { // cancel out if just reverting the URL
			evt.stopImmediatePropagation();
			this.cancelNavigate = false;
			return;
		}
		if(this.view && this.view.dirty) {
			var dialog = confirm("You have unsaved changes. To stay on the page, press cancel. To discard changes and leave the page, press OK");
			if(dialog == true)
				return;
			else {
				evt.stopImmediatePropagation();
				this.cancelNavigate = true;
				window.location.href = evt.originalEvent.oldURL;
			}
		}
	},
	
	beforeUnload : function() {
		if(this.view && this.view.dirty)
			return "You have unsaved changes. If you leave or reload this page, your changes will be lost.";
	}
	
  });
  
  var initialize = function(){
	
	var app_router = new AppRouter;
    
	app_router.on('route:content', function (id) {
	
		var content = new Content({'id': id});
        content.render();
		var topNav = new TopNav({'id': 72});
		topNav.render();
		
    });
	
	app_router.on('route:courseInfo', function (id) {
		
		var content = new CourseInfo({'id': id});
        content.render();
		var topNav = new TopNav({'id': 72});
		topNav.render();
		
    });
	
	app_router.on('route:contentCN', function (id) {
	
		var content = new ContentCN({'id': id});
        content.render();
		var topNav = new TopNav({'id': 72});
		topNav.render();
		
    });
	
	app_router.on('route:showContent', function (id) {
	
		var content = new StaticContent({'id': id});
        content.render();
		
    });
	
	app_router.on('route:editContent', function (id) {

		var content = new EditContent({'id': id});
        content.render();
		
    });
	
	app_router.on('route:newContent', function () {

		var content = new NewContent();
        content.render();
		
    });
	
	app_router.on('route:showCoursesHome', function () {
		
		var coursesHome = new CoursesHome();
        coursesHome.render();
		
    });
	
	app_router.on('route:showActivityFeedback', function (id) {
		
		var activityFeedback = new ActivityFeedback();
        activityFeedback.render();
		
    });
	
	app_router.on('route:initActivity', function (id) {
		
		var courseActivityByExID = new CourseActivityByExID({'id': id});
        courseActivityByExID.render();
		
    });
	
	app_router.on('route:showActivities', function (id) {
		
		var courseActivitiesByCID = new CourseActivitiesByCID({'id': id});
        courseActivitiesByCID.render();
		
    });
    
	app_router.on('route:showCourses', function(){
   
        var courses = new myCourses();
        courses.render();

    });

    app_router.on('route:defaultAction', function (actions) {
		
		var content = new Content({'id': 1});
        content.render();
		var topNav = new TopNav({'id': 72});
		topNav.render();
		
    });
	
	var header = new Header({'id': 3});
	header.render();
	var footer = new Footer({'id': 5});
	footer.render();
	
	$(window).on("hashchange", app_router.hashChange);
	$(window).on("beforeunload", app_router.beforeUnload);
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
