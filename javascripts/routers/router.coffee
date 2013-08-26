define [
	'backbone'
	'collections/posts'
], (Backbone, posts) ->

	new (Backbone.Router.extend
		routes:
			'posts/*id': 'postShow'
			'tags/*tag': 'filterTag'
			'*interceptor': 'interceptor'

		postShow: (param) ->
			posts.show(param)

		filterTag: ->
			posts.index()

		interceptor: ->
			posts.index()
	)