'use strict';

/**
 * @ngdoc service
 * @name whodeliversApp.photos
 * @description
 * # photos
 * Factory in the whodeliversApp.
 */
angular.module('whodeliversApp')
  .factory('PhotosService', function ($http) {

    var client_id = "NIVPQHGRVGDXDF01DNIG1VBEV0QFFMCN5HH3XIBBX3RIHZYH";
    var client_secret = "1LRSXS4DWKMI5VVK5MKUGJ03YBROKGSL55TVJM3W2QUIXGRK";

    function searchForPhotos(foursquareId){
      var fsidPhotoSearchUrl = 'https://api.foursquare.com/v2/venues/'+foursquareId+'?&client_id='+client_id+'&client_secret='+client_secret+'&v=20160118';
      return $http({
        method: 'GET',
        url:fsidPhotoSearchUrl
      }).then(function(response){
        // console.log('response: ', response.status);
        if(response.status === 200){
          var savedPhotos = [];
          var data = response.data;
          var photos = data.response.venue.photos;
          var groups = photos.groups;
          for(var i = 0; i < groups.length; i++){
            for(var j = 0; j < groups[i].items.length; j++){
              var photo = groups[i].items[j];
              // console.log('photo: ', photo);
              var newPhoto = photo.prefix + photo.height.toString() +'x'+ photo.width.toString() + photo.suffix
              savedPhotos.push(newPhoto);
            }
          }
          return savedPhotos;
        }
        return null;
      })
    }

    function searchByName(restaurantName){
      var searchByNameUrl = 'https://api.foursquare.com/v2/venues/search?near=AUSTIN,TX&query='+restaurantName+'&limit=5&categoryId=4d4b7105d754a06374d81259&client_id='+client_id+'&client_secret='+client_secret+'&v=20160118';
      return $http({
        method: 'GET',
        url:searchByNameUrl
      }).then(function(response){
        console.log('response: ', response.status);
        if(response.status === 200){
          try{
            var data = response.data;
            var venues = data.response.venues;
            for(var i = 0; i < venues.length; i++){
              if(venues[i].name.toLowerCase() === restaurantName.toLowerCase()){
                return searchForPhotos(venues[i].id);
                break;
              }
            }
          }
          catch(e){
            console.log('e: ', e);
          }

          // return searchForPhotos()
          return null;
        }
      })
    }

    // Public API here
    return {
      getPhotos: function(restaurantName){
        return searchByName(restaurantName);        
      }
      
    };
  });
