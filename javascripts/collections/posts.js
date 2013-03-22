var app = app || {};

(function () {
	'use strict';

	var PostList = Backbone.Collection.extend({
		model: app.Post,
		url: '/posts',
		index: function() {
			var me = this;

			me.currentId = undefined;
			if (me.ready) {
				me.trigger('pending');
			}
		},

		show: function(id) {
			var me = this;

			me.currentId = id;
			if (me.ready) {
				me.trigger('pending');
			}
		},

		currentPost: function() {
			return this.get(this.currentId);
		},

		currentIndex: function () {
			return this.indexOf(this.currentPost());
		},

		offsetPost: function(offset) {
			var me = this,
				currentIndex = me.currentIndex(),
				index = currentIndex + offset;

			if (index > -1 && index < me.size()) {
				return me.at(index);
			}
		},

		getTags: function() {
			var me = this;

			if (!me.tagCollection) {
				me.tagCollection = [];
				me.each(function(post) {
					if (post.get('tags')) {
						me.tagCollection = _.union(me.tagCollection, post.getTags());
					}
				});
			}

			return me.tagCollection;
		}
	});

	var posts = new PostList();
	posts.fetch({
		complete: function() {
			posts.ready = true;
			posts.trigger('pending');
		}
	});

	app.Posts = posts;
})();