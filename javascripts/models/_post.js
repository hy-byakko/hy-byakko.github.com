var app = app || {};

(function () {
	'use strict';

	app.Post = Backbone.Model.extend({
		url: '/posts',
		getHtml: function(callback) {
			var me = this;

			$.get(me.get('uri'), function(context) {
				me.htmlContent = context;
				callback.call(me);
			});
		},

		getLink: function() {
			return '#/posts/' + this.get('id');
		},

		getTags: function() {
			if (!this.get('tags')) {
				return [];
			}
			return this.get('tags').split(',');
		},

		getTime: function() {
			return new Date(this.get('date'));
		}
	});

})();