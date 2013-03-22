var app = app || {};

(function () {
	'use strict';

	var Router = Backbone.Router.extend({
		routes: {
			'posts/*id': 'postShow',
			'tags/*tag': 'filterTag',
			'*interceptor': 'interceptor'
		},

		postShow: function (param) {
			app.Posts.show(param);
		},

		filterTag: function() {
			app.Posts.index();
		},

		interceptor: function() {
			app.Posts.index();
		}
	});

	app.Router = new Router();
	Backbone.history.start();
})();
