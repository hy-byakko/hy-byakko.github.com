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

			me.listenTo(app.Posts, 'pending', me.render);
		},

		render: function() {
			var me = this,
				currentIndex = app.CurrentPostIndex || 0,
				post;

			if (app.Posts.size() !== 0) {
				post = app.Posts.at(currentIndex);
				post.getHtml(function (content) {
					me.$('#main_content').html(content);
				});
				me.$preSwitcher.toggle(currentIndex > 0);
				me.$nextSwitcher.toggle(currentIndex < app.Posts.size() - 1);
				app.CurrentPostIndex = currentIndex;

			}

			return me;
		},

		preSwitch: function () {
			app.Router.navigate('//posts/' + app.Posts.at(app.CurrentPostIndex - 1).get('id'));
		},

		nextSwitch: function () {
			app.Router.navigate('//posts/' + app.Posts.at(app.CurrentPostIndex + 1).get('id'));
		}
		
	});
});