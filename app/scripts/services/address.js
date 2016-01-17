'use strict';

/**
 * @ngdoc service
 * @name harvestWebApp.address
 * @description
 * # address
 * Factory in the harvestWebApp.
 */
angular.module('whodeliversApp')
  .factory('AddressService', function ($q) {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var lat = null;
    var lng = null;
    var zipcode = null;
    var formatted_address = null;
    var austinZips = ['73301','73344','78701','78702','78703','78704','78705',
              '78708','78709','78710','78711','78712','78713','78714','78715',
              '78716','78717','78718','78719','78720','78721','78722','78723',
              '78724','78725','78726','78727','78728','78729','78730','78731',
              '78732','78733','78734','78735','78736','78737','78738','78739',
              '78741','78742','78744','78745','78746','78747','78748','78749',
              '78750','78751','78752','78753','78754','78755','78756','78757',
              '78758','78759','78760','78761','78762','78763','78764','78765',
              '78766','78767','78768','78769','78772','78773','78774','78778',
              '78779','78780','78781','78783','78785','78789','78799','78664',
              '78665','78680','78681','78682','78683','78626','78627','78628',
              '78633','78666','78667','78610','78640','78620','78660','78691',
              '78613','78630'];

    function checkAvailableZips(zip){
      console.log('zip: ', typeof zip);
      for(var i = 0; i < austinZips.length; i++){
        if(austinZips[i] === zip){
          return zip;
        }
      }
      return false;
    }

    function getZip(place){
      var zipcode = '';
      if ('address_components' in place){
        for(var i = 0; i < place.address_components.length; i++){
          var types = place.address_components[i].types;
          for(var j = 0; j < types.length; j++){
            if(types[j] === 'postal_code'){
              zipcode = place.address_components[i].long_name;
              if(zipcode === ''){
                zipcode = place.address_components[i].short_name;
              }
              return checkAvailableZips(zipcode);
            }
          }
          if(zipcode !== ''){
            return checkAvailableZips(zipcode);
          }
        }
      }

      return null;
    }

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      checkAddress: function(address) {
        var defer = $q.defer();
        if(address){
          formatted_address = 'formatted_address' in address ? address.formatted_address : null;
          lat = 'geometry' in address ? address.geometry.location.lat() : null;
          lng = 'geometry' in address ? address.geometry.location.lng() : null;
          // console.log(formatted_address, ' : ', lat , ': ',lng);
          zipcode = getZip(address);
        }

        if(formatted_address === null){
          defer.reject('Formatted address not found.');
        }
        if(lat === null || lng === null){
          defer.reject('Address has bad lat and lng.');
        }
        if(zipcode === null){
          defer.reject('Address has bad zipcode.');
        }
        if(zipcode === false){
          defer.reject('Not in area.');
        }

        defer.resolve('Success');

        return defer.promise;
      },
      getAddressAttrs: function(){
        return {'address':formatted_address, 'lat':lat, 'long': lng, 'zipcode': zipcode};
      }
    };
  });
