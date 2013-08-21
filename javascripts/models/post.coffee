define [
	'jquery'
	'underscore'
	'backbone'
], ($, _, Backbone) ->
	'use strict'

	Backbone.Model.extend
		url: '/posts'
		getLink: ->
			'#/posts/' + @get('id')

		getTags: ->
			if !@get('tags') then [] else @get('tags').split(',')

		getTime: ->
			new Date @get('date')