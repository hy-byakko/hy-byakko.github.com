define [
	'jquery'
	'backbone'
], ($, Backbone) ->
	'use strict'

	Backbone.View.extend
		tagName: 'div'

		initialize: ->
			@$el.append '<img src="images/loading.gif">'