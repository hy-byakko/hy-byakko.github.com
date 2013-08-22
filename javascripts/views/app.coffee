define [
	'jquery'
	'underscore'
	'backbone'
	'collections/posts'
	'routers/router'
], ($, _, Backbone, posts, router) ->
	'use strict'

	Backbone.View.extend
		el: '#main_content_wrap'

		events:
			'click #page-switcher-pre': 'preSwitch'
			'click #page-switcher-next': 'nextSwitch'

		switcherTemplate: _.template $('#post-switcher').html()
		indexBarTemplate: _.template $('#index-bar').html()
		tagLinkTemplate: _.template $('#tag-link').html()
		postTitleTemplate: _.template $('#post-title').html()

		initialize: ->
			$el = @$el

			$el.append @switcherTemplate
				location: 'left',
				content: '‹',
				id: 'pre'

			$el.append @switcherTemplate
				location: 'right',
				content: '›',
				id: 'next'

			@$preSwitcher = @$('#page-switcher-pre')
			@$nextSwitcher = @$('#page-switcher-next')
			@$title = $('#post_title')
			@$main = @$('#main_content')
			@$index = @$('#index_content')
			@$tags = $('#header_wrap #tags')
			@$loading = @$('#loading')

			@listenTo(posts, 'render', @render)
			posts.load()

		render: ->
			if posts.activeId
				@mainRender()
			else
				@indexRender()

			@tagRender()
			@

		indexRender: ->
			@$preSwitcher.hide()
			@$nextSwitcher.hide()
			@$title.hide()
			@$main.hide()

			@$index.empty()

			if posts.ready
				@$loading.hide()
				posts.each (post) =>
					bar = $ $.parseHTML(@indexBarTemplate({
						title: post.get('title')
						link: post.getLink()
						time: post.getTime().toLocaleDateString()
					}))[1]

					_.each post.getTags(), (tag) =>
						bar.append @tagLinkTemplate({
							name: tag
							link: '#/tags/' + tag
						})
					@$index.append(bar)

				@$index.show()
			else
				@$loading.show()

		mainRender: ->
			post = posts.currentPost()
			content = posts.getContent()

			@$index.hide()

			if post
				if content
					@$loading.hide()
					@$main.html content
					@$title.html post.get('title')
					@$preSwitcher.toggle !!posts.offsetPost(-1)
					@$nextSwitcher.toggle !!posts.offsetPost(1)
					@$title.html @postTitleTemplate({
						title: post.get('title')
						time: post.getTime().toLocaleString()
					})

					@$title.show()
					@$main.show()
				else
					@$main.hide()
					@$loading.show()

		tagRender: ->
			post = posts.currentPost()

			@$tags.empty()

			tags = if post then post.getTags() else posts.getTags()

			_.each tags, (tag) =>
				@$tags.append @tagLinkTemplate({
					name: tag
					link: '#/tags/' + tag
				})

		preSwitch: ->
			router.navigate '//posts/' + posts.offsetPost(-1).get('id')

		nextSwitch: ->
			router.navigate '//posts/' + posts.offsetPost(1).get('id')
