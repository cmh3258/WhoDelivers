'use strict';

/**
 * @ngdoc overview
 * @name whodeliversApp
 * @description
 * # whodeliversApp
 *
 * Main module of the application.
 */
angular
  .module('whodeliversApp', [
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
      .when('/details/:restaurant', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
