'use strict';

/**
 * @ngdoc function
 * @name slotwoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slotwoApp
 */
angular.module('slotwoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
