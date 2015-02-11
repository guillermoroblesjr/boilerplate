 // jshint camelcase:false 
 // jshint unused:false
 
 (function(window, undefined){
  angular.module('app').directive('myExampleDirective', function() {

    'use strict';

    var _ = window._,
        $ = window.jQuery;

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<button id=\"showMenu\" class=\"typcn typcn-th-menu\"></button>',
      link: function (scope, element, attrs) {
       
        var $scope = scope,
            $el = $(element),
            attr = attrs;


      } 
    };
  });
 })(window);