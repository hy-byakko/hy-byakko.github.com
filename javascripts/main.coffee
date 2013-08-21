'use strict'
require.config
	paths:
		jquery: 'lib/jquery-2.0.3.min'
		underscore: 'lib/underscore-min'
		backbone: 'lib/backbone.min'
		bootstrap: 'lib/bootstrap.min'
	shim:
		backbone: [
			'jquery'
			'underscore'
		]
		bootstrap: ['jquery']

require [
	'backbone'
	'views/app'
	'routers/router'
], (Backbone, AppView, Router) ->
	new Router()
	Backbone.history.start()

	new AppView()