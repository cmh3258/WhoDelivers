'use strict';

/**
 * @ngdoc service
 * @name whodeliversApp.delivery
 * @description
 * # delivery
 * Factory in the whodeliversApp.
 */
angular.module('whodeliversApp')
  .factory('DeliveryService', function ($http, ProviderService, PhotosService) {

    var harvestInfo = null;

    function createHarvestLink(restaurantName){
      var nameString = restaurantName.split(' ').join('-') + '-Austin-TX';      
      var url = 'https://harvest-staging-app.herokuapp.com/#/'+nameString+'/menu/';
      harvestInfo = {'providerName':'Harvest', 'providerUrl':url, 'providerLogo':'../../images/harvest-logo.png'};
    }

    // Public API here
    return {
      retrieveMenu: function(restaurantName){
        var data = {'restaurant_name':restaurantName};
        return $http({
          method: 'POST',
          url:'http://squirtle-harvest.herokuapp.com/companybylocale/',
          data:JSON.stringify(data)
        }).then(function(response){
          console.log('[retrieveMenu] Success response: ', response);
          // menu = response;
          return response;
        })
        .catch(function(response){
          console.log('[retrieveMenu] Error response: ', response);
          return response;
        })
      },
      searchByName: function(name){
        var url = 'http://squirtle-harvest.herokuapp.com/locales/?fields=primary_name,url,company,name_flag&primary_name='+name;
        return $http({
          method: 'GET',
          url:url
        }).then(function(response){
          console.log('[searchByName] Success response: ', response);
          var results = response.data.results;
          var filteredResults = [];
          for(var i = 0; i < results.length; i++){
            var c = _.findIndex(filteredResults,{company:{id:results[i].company.id}});
            if(c > -1){
              //skip
            }
            else{
              try{
                var provider_menu_url = JSON.parse(results[i].company.provider_menu_url);
                var providersInfo = [];
                for(var i = 0; i < provider_menu_url.length; i++){
                  var info = ProviderService.getProviderInfo(provider_menu_url[i]);
                  providersInfo.push(info);
                }
                results[i].company.provider_menu_url = provider_menu_url;
                results[i].providersInfo = providersInfo;

                
              }
              catch(e){
                console.log('e: ', e);
              }

              createHarvestLink(results[i].company.name);
              filteredResults.push(results[i]);
            }
          }
          return filteredResults;
        })
        .catch(function(response){
          console.log('[searchByName] Error response: ', response);
          return null;
        })
      },
      createHarvestLinkByName: function(name){
        return createHarvestLink(name);
      },
      getHarvestInfo: function(){
        return harvestInfo;
      }
    };
  });
