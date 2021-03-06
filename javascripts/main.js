// Generated by CoffeeScript 1.6.3
'use strict';
require.config({
  baseUrl: '.',
  paths: {
    jquery: 'lib/jquery-2.0.3.min',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-min',
    bootstrap: 'lib/bootstrap.min',
    text: 'lib/text'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: ['jquery']
  }
});

require(['backbone', 'views/app'], function(Backbone, AppView) {
  new AppView;
  return Backbone.history.start();
});
