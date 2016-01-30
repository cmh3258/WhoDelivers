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
        'fsid':'',
        'link':"https://www.harvestd.com/cabo-bob's-austin-tx/menu/",
        'categories':['tacos','burritos']
      },
      {
        'name':'Chi\'lantro BBQ',
        'img':'../images/restaurant_images/chi.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/chilantro-bbq-austin-tx/menu/',
        'categories':['barbeque']
      },
      {
        'name':'Fat Sal\'s',
        'img':'../images/restaurant_images/fatsal.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/fat-sal\'s-austin-tx/menu/',
        'categories':['sandwhiches']
      },
      {
        'name':'Fire Bowl Cafe',
        'img':'../images/restaurant_images/firebowl.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/fire-bowl-cafe-austin-tx/menu/',
        'categories':['chinese']
      },
      {
        'name':'Homeslice',
        'img':'../images/restaurant_images/homeslice.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/home-slice-pizza-austin-tx/menu/',
        'categories':['pizza']
      },
      {
        'name':'Austin\'s Habibi',
        'img':'../images/restaurant_images/habibi.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/austin\'s-habibi-austin-tx/menu/',
        'categories':['meditteranean']
      },
      {
        'name':'Juice Austin',
        'img':'../images/restaurant_images/juice.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/juice-austin-austin-tx/menu/',
        'categories':['juice']
      },
      {
        'name':'Koriente',
        'img':'../images/restaurant_images/korien.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/Koriente-austin-tx/menu/',
        'categories':['asian']
      },
      {
        'name':'Milto\'s',
        'img':'../images/restaurant_images/milto.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/milto\'s-austin-tx/menu/',
        'categories':['meditteranean','pizza']
      },
      {
        'name':'Noble Pig',
        'img':'../images/restaurant_images/noble.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/noble-pig-austin-tx/menu/',
        'categories':['sandwhiches']
      },
      {
        'name':'Pei Wei',
        'img':'../images/restaurant_images/pei.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/pei-wei-austin-tx/menu/',
        'categories':['asian']
      },
      {
        'name':'Qdoba',
        'img':'../images/restaurant_images/qdoba.jpg',
        'fsid':'',
        'categories':['burritos','tacos'],
        'link':'https://www.harvestd.com/qdoba-austin-tx/menu/'
      },
      {
        'name':'Schlotzsky\'s',
        'img':'../images/restaurant_images/schlotz.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/Schlotzsky\'s-austin-tx/menu/',
        'categories':['sandwhiches']
      },
      {
        'name':'Torchy\'s',
        'img':'../images/restaurant_images/torchy.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/torchy\'s-tacos-austin-tx/menu/',
        'categories':['tacos']
      },
      {
        'name':'Whataburger',
        'img':'../images/restaurant_images/whata.jpg',
        'fsid':'',
        'link':'https://www.harvestd.com/whataburger-austin-tx/menu/',
        'categories':['burgers']
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
