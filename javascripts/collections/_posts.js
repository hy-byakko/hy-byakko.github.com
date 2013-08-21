var app = app || {};

(function () {
	'use strict';

	var PostList = Backbone.Collection.extend({
		model: app.Post,
		url: '/posts',
		index: function() {
			var me = this;

			me.deactive();
			me.trigger('render');
		},

		show: function(id) {
			var me = this;

			me.active(id);
			me.trigger('render');
		},

		active: function(id) {
			this.activeId = id;
		},

		deactive: function() {
			this.activeId = undefined;
		},

		getContent: function() {
			var me = this,
				currentPost = me.currentPost();

			if (currentPost) {
				if (currentPost.htmlContent) {
					return currentPost.htmlContent;
				} else {
					me.ready = false;
					currentPost.getHtml(function() {
						me.ready = true;
						me.trigger('render');
					})
				};
			}
		},

		currentPost: function() {
			return this.get(this.activeId);
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
			posts.trigger('render');
		}
	});

	app.Posts = posts;
})();