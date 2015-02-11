 // jshint camelcase:false 
 // jshint unused:false
 
(function(window, undefined){

  'use strict';

  var appDependencies = [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'myExampleService'
  ];

  // Initialize the app
  var app = angular.module('app', appDependencies);

  // Add the configurations
  app.config( [ '$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: false
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

})(window);