'use strict';

/**
 * @ngdoc function
 * @name whodeliversApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the whodeliversApp
 */
angular.module('whodeliversApp')
  .controller('DetailsCtrl', function ($scope, $routeParams) {
    
    if('restaurant' in $routeParams){
      var v = $routeParams.restaurant;
      console.log('v: ', v);
    }


  });
