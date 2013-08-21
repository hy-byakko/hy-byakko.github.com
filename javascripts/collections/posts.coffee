define [
	'underscore'
	'backbone'
	'models/post'
], (_, Backbone, Post) ->
	'use strict'

	Backbone.Collection.extend
		model: Post
		url: '/posts'
		index: ->
			@deactive()
			@trigger('render')

		show: (id) ->
			@active(id)
			@trigger('render')

		active: (@activeId) ->

		deactive: (@activeId = undefined) ->

		currentPost: ->
			@get(@activeId)

		currentIndex: ->
			@indexOf @currentPost()

		offsetPost: (offset) ->
			index = @currentIndex() + offset
			@at(index) if index > -1 and index < @size()

		getTags: ->
			if !@tagCollection
				@tagCollection = []
				@each (post) =>
					@tagCollection = _.union @tagCollection, post.getTags() if post.get('tags')
			@tagCollection