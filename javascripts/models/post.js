var app = app || {};

(function () {
	'use strict';

	app.Post = Backbone.Model.extend({
		url: '/posts',
		getHtml: function(callback) {
			var me = this;

			if (me.htmlContent === undefined) {
				$.get(me.get('uri'), function(context) {
					me.htmlContent = context;
					callback.call(me, me.htmlContent);
				});
			}
			else {
				callback.call(me, me.htmlContent);
			}
		}
	});

})();