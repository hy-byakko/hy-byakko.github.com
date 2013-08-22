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

			@mainView = new Main
			@indexView = new Index
				tagLinkTemplate: @tagLinkTemplate
			@loadingView = new Loading

			@listenTo(posts, 'render', @render)
			posts.load()

		render: ->
			newMode = if !posts.ready then 'loading' else if posts.activeId then 'main' else 'index'

			if newMode != @currentMode
				@currentMode = newMode
				@$el.empty()
				switch @currentMode
					when 'loading'
						@$el.append @loadingView.render().el
					when 'main'
						@$title.show()
						@$el.append @mainView.render().el
					when 'index'
						@$title.hide()
						@$el.append @indexView.render().el

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