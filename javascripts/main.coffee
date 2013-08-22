'use strict'
require.config
	paths:
		jquery: 'lib/jquery-2.0.3.min'
		underscore: 'lib/underscore-min'
		backbone: 'lib/backbone-min'
		bootstrap: 'lib/bootstrap.min'
		text: 'lib/text'
	shim:
		underscore:
			exports: '_'
		backbone:
			deps: [
				'underscore'
				'jquery'
			]
			exports: 'Backbone'
		bootstrap: ['jquery']

require [
	'backbone'
	'views/app'
], (Backbone, AppView) ->
	Backbone.history.start()
	new AppView