'use strict';

/**
 * @ngdoc function
 * @name whodeliversApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whodeliversApp
 */
angular.module('whodeliversApp')
  .controller('MainCtrl', function ($scope, DeliveryService) {
    $scope.address = null;
    $scope.showRestaurantBox = false;

    $scope.searchForRestaurants = function(){
      console.log('hi');
      if($scope.address === 'Success'){
        console.log('show grue');
        $scope.showRestaurantBox = true;
      }
    }

    $scope.getRestaurant = function(restaurant){
      DeliveryService.searchByName(restaurant).then(function(response){
        $scope.results = response;
      })
    }
  });
