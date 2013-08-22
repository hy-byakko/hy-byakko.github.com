var app = app || {};

$(function () {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#main_content_wrap',

		events: {
			'click #page-switcher-pre': 'preSwitch',
			'click #page-switcher-next': 'nextSwitch'
		},

		switcherTemplate: _.template($('#post-switcher').html()),
		indexBarTemplate: _.template($('#index-bar').html()),
		tagLinkTemplate: _.template($('#tag-link').html()),
		postTitleTemplate: _.template($('#post-title').html()),

		initialize: function () {
			var me = this,
				$el = me.$el;

			$el.append(me.switcherTemplate({
				location: 'left',
				content: '‹',
				id: 'pre'
			}));

			$el.append(me.switcherTemplate({
				location: 'right',
				content: '›',
				id: 'next'
			}));

			me.$preSwitcher = me.$('#page-switcher-pre');
			me.$nextSwitcher = me.$('#page-switcher-next');
			me.$title = $('#post_title');
			me.$main = me.$('#main_content');
			me.$index = me.$('#index_content');
			me.$tags = $('#header_wrap #tags');
			me.$loading = me.$('#loading');

			me.listenTo(app.Posts, 'render', me.render);

			if (app.Posts.ready) {
				me.render();
			}
		},

		render: function() {
			var me = this;

			if (app.Posts.activeId) {
				me.mainRender();
			} else {
				me.indexRender();
			}

			me.tagRender();

			return me;
		},

		indexRender: function() {
			var me = this,
				bar;

			me.$preSwitcher.hide();
			me.$nextSwitcher.hide();
			me.$title.hide();
			me.$main.hide();

			me.$index.empty();

			if (app.Posts.ready) {
				me.$loading.hide();
				app.Posts.each(function(post) {
					bar = $($.parseHTML(me.indexBarTemplate({
						title: post.get('title'),
						link: post.getLink(),
						time: post.getTime().toLocaleDateString()
					}))[1]);

					_.each(post.getTags(), function(tag) {
						bar.append(me.tagLinkTemplate({
							name: tag,
							link: '#/tags/' + tag
						}));
					});
					me.$index.append(bar);
				});

				me.$index.show();
			} else {
				me.$loading.show();
			};

		},

		mainRender: function() {
			var me = this,
				posts = app.Posts,
				post = posts.currentPost(),
				content = posts.getContent();

			me.$index.hide();

			if (post) {
				if (content) {
					me.$loading.hide();
					me.$main.html(content);
					me.$title.html(post.get('title'));
					me.$preSwitcher.toggle(!!posts.offsetPost(-1));
					me.$nextSwitcher.toggle(!!posts.offsetPost(1));
					me.$title.html(me.postTitleTemplate({
						title: post.get('title'),
						time: post.getTime().toLocaleString()
					}));

					me.$title.show();
					me.$main.show();
				} else {
					me.$main.hide();
					me.$loading.show();
				}
			}

		},

		tagRender: function() {
			var me = this,
				posts = app.Posts,
				post = posts.currentPost(),
				tags;

			me.$tags.empty();

			tags = (post) ? post.getTags() : posts.getTags();

			_.each(tags, function(tag) {
				me.$tags.append(me.tagLinkTemplate({
					name: tag,
					link: '#/tags/' + tag
				}));
			});
		},

		preSwitch: function () {
			app.Router.navigate('//posts/' + app.Posts.offsetPost(-1).get('id'));
		},

		nextSwitch: function () {
			app.Router.navigate('//posts/' + app.Posts.offsetPost(1).get('id'));
		}

	});
});