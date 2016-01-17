'use strict';

/**
 * @ngdoc service
 * @name whodeliversApp.delivery
 * @description
 * # delivery
 * Factory in the whodeliversApp.
 */
angular.module('whodeliversApp')
  .factory('DeliveryService', function ($http) {

    var menu = {};

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
          // menu = response;
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
                results[i].company.provider_menu_url = provider_menu_url;
              }
              catch(e){
              }
              filteredResults.push(results[i]);
            }
          }
          return filteredResults;
        })
        .catch(function(response){
          console.log('[searchByName] Error response: ', response);
          return null;
        })
      }
    };
  });
