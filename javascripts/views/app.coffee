define [
	'jquery'
	'underscore'
	'backbone'
	'collections/posts'
	'routers/router'
	'views/index'
	'views/main'
	'views/loading'
	'text!templates/tag-link.html'
	'text!templates/post-title.html'
], ($, _, Backbone, posts, router, Index, Main, Loading, tagLink, postTitle) ->
	'use strict'

	Backbone.View.extend
		el: '#main_content_wrap'

		tagLinkTemplate: _.template tagLink
		postTitleTemplate: _.template postTitle

		initialize: ->
			@$title = $('#post_title')
			@$tags = $('#header_wrap #tags')

			@items =
				main: new Main
				index: new Index
					tagLinkTemplate: @tagLinkTemplate
				loading: new Loading

			_.each @items, (item, mode) =>
				item.$el.hide()
				@$el.append item.el

			@listenTo(posts, 'render', @render)
			posts.load()

		render: ->
			newMode = if !posts.ready then 'loading' else if posts.activeId then 'main' else 'index'
			view = @items[newMode].render()

			if newMode != @currentMode
				@currentMode = newMode
				_.each @items, (item, mode) =>
					item.$el.hide()
				view.$el.show()
				switch @currentMode
					when 'main'
						@$title.show()
					when 'index'
						@$title.hide()

			@headRender()
			@

		headRender: ->
			@$tags.empty()

			post = posts.currentPost()

			if post
				@$title.html @postTitleTemplate
					title: post.get('title')
					time: post.getTime().toLocaleString()
				tags = post.getTags()
			else
				tags = posts.getTags()

			_.each tags, (tag) =>
				@$tags.append @tagLinkTemplate
					name: tag
					link: '#/tags/' + tag