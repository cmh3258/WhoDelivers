'use strict';

/**
 * @ngdoc function
 * @name whodeliversApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whodeliversApp
 */
angular.module('whodeliversApp')
  .controller('MainCtrl', function ($scope, DeliveryService, PhotosService) {
    $scope.address = null;
    $scope.showRestaurantBox = false;
    $scope.viewOtherOptions = false;

    $scope.searchForRestaurants = function(){
      console.log('hi');
      if($scope.address === 'Success'){
        console.log('show grue');
        $scope.showRestaurantBox = true;
      }
    }

    $scope.getRestaurant = function(restaurant){
      DeliveryService.searchByName(restaurant).then(function(response){
        $scope.harvestInfo = DeliveryService.getHarvestInfo();

        $scope.results = response;
        for(var i = 0; i < response.length; i++){
          PhotosService.getPhotos(response[i].company.name).then(function(results){
            $scope.photos = results;
          })  
        }

        
      })
    }
  });
