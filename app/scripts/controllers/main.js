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
    $scope.results = [];

    $scope.austinRestaurants = [
      {
        'name':'Cabo Bob\'s',
        'img':'../images/restaurant_images/cabobob.jpg',
        'fsid':''
      },
      {
        'name':'Chilantro BBQ',
        'img':'../images/restaurant_images/chi.jpg',
        'fsid':''
      },
      {
        'name':'Fat Sal\'s',
        'img':'../images/restaurant_images/fatsal.jpg',
        'fsid':''
      },
      {
        'name':'Fire Bowl Cafe',
        'img':'../images/restaurant_images/firebowl.jpg',
        'fsid':''
      },
      {
        'name':'Homeslice',
        'img':'../images/restaurant_images/homeslice.jpg',
        'fsid':''
      },
      {
        'name':'Austin Habibi',
        'img':'../images/restaurant_images/habibi.jpg',
        'fsid':''
      },
      {
        'name':'Juice Austin',
        'img':'../images/restaurant_images/juice.jpg',
        'fsid':''
      },
      {
        'name':'Koriente',
        'img':'../images/restaurant_images/korien.jpg',
        'fsid':''
      },
      {
        'name':'Milto\'s',
        'img':'../images/restaurant_images/milto.jpg',
        'fsid':''
      },
      {
        'name':'Noble Pig',
        'img':'../images/restaurant_images/noble.jpg',
        'fsid':''
      },
      {
        'name':'Pei Wei',
        'img':'../images/restaurant_images/pei.jpg',
        'fsid':''
      },
      {
        'name':'Qdoba',
        'img':'../images/restaurant_images/qdoba.jpg',
        'fsid':''
      },
      {
        'name':'Schlotzsky\'s',
        'img':'../images/restaurant_images/schlotz.jpg',
        'fsid':''
      },
      {
        'name':'Torchy\'s',
        'img':'../images/restaurant_images/torchy.jpg',
        'fsid':''
      },
      {
        'name':'Whataburger',
        'img':'../images/restaurant_images/whata.jpg',
        'fsid':''
      },
    ];

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
