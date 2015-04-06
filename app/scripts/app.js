'use strict';

/**
 * @ngdoc overview
 * @name slotwoApp
 * @description
 * # slotwoApp
 *
 * Main module of the application.
 */
angular
  .module('slotwoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: "MainCtrl"
      })
      .when('/title', {
        templateUrl: 'views/title.html',
        controller: "MainCtrl"
      })
      .when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'MainCtrl'
      })
      .when('/level', {
        templateUrl: 'views/level.html',
        controller: 'MainCtrl'
      })
      .when('/battle', {
        templateUrl: 'views/battle.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
