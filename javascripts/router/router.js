var app = app || {};

(function () {
	'use strict';

	var Router = Backbone.Router.extend({
		routes: {
			'posts/*id': 'postShow'
		},

		postShow: function (param) {
			app.Posts.show(param);
		}
	});

	app.Router = new Router();
	Backbone.history.start();
})();
