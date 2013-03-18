var app = app || {};

(function () {
	'use strict';

	var PostList = Backbone.Collection.extend({
		model: app.Post,
		url: '/posts',
		show: function(id) {
			var me = this;

			me.currentId = id;
			if (me.ready) {
				me.currentIndex();
				me.trigger('pending');
			}
		},

		currentIndex: function () {
			var me = this;

			if (!me.currentId) {return;}
			app.CurrentPostIndex = me.indexOf(me.get(me.currentId));
		}
	});

	var posts = new PostList();
	posts.fetch({
		complete: function() {
			posts.ready = true;
			posts.currentIndex();
			posts.trigger('pending');
		}
	});

	app.Posts = posts;
})();