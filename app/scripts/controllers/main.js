'use strict';

/**
 * @ngdoc function
 * @name whodeliversApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whodeliversApp
 */
angular.module('whodeliversApp')
  .controller('MainCtrl', function ($scope, DeliveryService, PhotosService, $location) {
    $scope.address = null;
    $scope.showRestaurantBox = false;
    $scope.viewOtherOptions = false;
    $scope.results = [];

    $scope.austinRestaurants = [
      {
        'name':'Cabo Bob\'s',
        'img':'../images/restaurant_images/cabobob.jpg',
        'fsid':'',
        'description':'Assembly line burritos, tacos, etc.',
        'deferintiator':'Tortillas made fresh when you order',
        'link':"https://www.harvestd.com/cabo-bob's-austin-tx/menu/",
        'categories':['tacos','burritos']
      },
      {
        'name':'Chi\'lantro BBQ',
        'img':'../images/restaurant_images/chi.jpg',
        'fsid':'',
        'description':'Mix of Korean and BBQ - flavors, flavors, flavors.',
        'deferintiator':'Home of the original kimchi fries',
        'link':'https://www.harvestd.com/chilantro-bbq-austin-tx/menu/',
        'categories':['barbeque']
      },
      {
        'name':'Fat Sal\'s',
        'img':'../images/restaurant_images/fatsal.jpg',
        'fsid':'',
        'description':'Crazy foods on sandwhiches',
        'deferintiator':'Similar to BigBite, but feels a bit healthier',
        'link':'https://www.harvestd.com/fat-sal\'s-austin-tx/menu/',
        'categories':['sandwhiches']
      },
      {
        'name':'Fire Bowl Cafe',
        'img':'../images/restaurant_images/firebowl.jpg',
        'fsid':'',
        'description':'Many bowls of stir fry, however you like it',
        'deferintiator':'Fast, Fresh and Healthy',
        'link':'https://www.harvestd.com/fire-bowl-cafe-austin-tx/menu/',
        'categories':['chinese']
      },
      {
        'name':'Homeslice',
        'img':'../images/restaurant_images/homeslice.jpg',
        'fsid':'',
        'description':'Large, crispy, thin crust pizza',
        'deferintiator':'A town favorite',
        'link':'https://www.harvestd.com/home-slice-pizza-austin-tx/menu/',
        'categories':['pizza']
      },
      {
        'name':'Austin\'s Habibi',
        'img':'../images/restaurant_images/habibi.jpg',
        'fsid':'',
        'description':'Classic meditteranean meals - gyro,falafel,etc.',
        'deferintiator':'Quick but amazing meal',
        'link':'https://www.harvestd.com/austin\'s-habibi-austin-tx/menu/',
        'categories':['meditteranean']
      },
      {
        'name':'Juice Austin',
        'img':'../images/restaurant_images/juice.jpg',
        'fsid':'',
        'description':'Healthy juice that brings the body to life',
        'deferintiator':'Healthy means yummy',
        'link':'https://www.harvestd.com/juice-austin-austin-tx/menu/',
        'categories':['juice']
      },
      {
        'name':'Koriente',
        'img':'../images/restaurant_images/korien.jpg',
        'fsid':'',
        'description':'Fresh ingredients, healthy choices and always plenty of food to get you full',
        'deferintiator':'Free soup and salad',
        'link':'https://www.harvestd.com/Koriente-austin-tx/menu/',
        'categories':['asian']
      },
      // {
      //   'name':'Milto\'s',
      //   'img':'../images/restaurant_images/milto.jpg',
      //   'fsid':'',
      //   'description':'',
      //   'deferintiator':'',
      //   'link':'https://www.harvestd.com/milto\'s-austin-tx/menu/',
      //   'categories':['meditteranean','pizza']
      // },
      {
        'name':'Noble Pig',
        'img':'../images/restaurant_images/noble.jpg',
        'fsid':'',
        'description':'Sandwhiches that will have you cheering. One of the top rated places in Austin.',
        'deferintiator':'Yes, they have a Knuckle Sandwich',
        'link':'https://www.harvestd.com/noble-pig-austin-tx/menu/',
        'categories':['sandwhiches']
      },
      // {
      //   'name':'Pei Wei',
      //   'img':'../images/restaurant_images/pei.jpg',
      //   'fsid':'',
      //   'description':'',
      //   'deferintiator':'',
      //   'link':'https://www.harvestd.com/pei-wei-austin-tx/menu/',
      //   'categories':['asian']
      // },
      {
        'name':'Qdoba',
        'img':'../images/restaurant_images/qdoba.jpg',
        'fsid':'',
        'description':'Assembly line burritos, tacos, etc.',
        'deferintiator':'Queso',
        'categories':['burritos','tacos'],
        'link':'https://www.harvestd.com/qdoba-austin-tx/menu/'
      },
      {
        'name':'Schlotzsky\'s',
        'img':'../images/restaurant_images/schlotz.jpg',
        'fsid':'',
        'description':'Sandwhiches. The original is all you need.',
        'deferintiator':'The buns are off the chain',
        'link':'https://www.harvestd.com/Schlotzsky\'s-austin-tx/menu/',
        'categories':['sandwhiches']
      },
      {
        'name':'Torchy\'s',
        'img':'../images/restaurant_images/torchy.jpg',
        'fsid':'',
        'description':'Tacos, Queso, and Happiness',
        'deferintiator':'Taco of the month - try them all',
        'link':'https://www.harvestd.com/torchy\'s-tacos-austin-tx/menu/',
        'categories':['tacos']
      },
      {
        'name':'Whataburger',
        'img':'../images/restaurant_images/whata.jpg',
        'fsid':'',
        'description':'Gotta love the ol\' Texan favorite.',
        'deferintiator':'HBCB',
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

    $scope.viewDetails = function(){
      $location.path('/details/tempur-la-bu');
    }

  });
