'use strict';

/**
 * @ngdoc service
 * @name whodeliversApp.provider
 * @description
 * # provider
 * Factory in the whodeliversApp.
 */
angular.module('whodeliversApp')
  .factory('ProviderService', function () {

    var providerLogoList = [
      {
        'logoUrl': '../../images/Bringmethat_2x.png', 
        'name': 'bringmethat',
        'providerID': 1
      },{
        'logoUrl': '../../images/dineondemand_2x.png', 
        'name': 'dineondemand', 
        'providerID': 4,
      },{
        'logoUrl': '../../images/Eatstreet_2x.png', 
        'name': 'eatstreet', 
        'providerID': 5
      },{
        'logoUrl': '../../images/Eat24_2x.png', 
        'name': 'eat24', 
        'providerID': 6
      },{
        'logoUrl': '../../images/eatoutin_2x.png', 
        'name': 'eatoutin', 
        'providerID': 7
      },{
        'logoUrl': '../../images/Favor_2x.png', 
        'name': 'favor', 
      },{
        'logoUrl': '../../images/grubhub_2x.png', 
        'name': 'GrubHub', 
        'providerID': 9
      },{
        'logoUrl': '../../images/MrDelivery_2x.png', 
        'name': 'mrdelivery', 
        'providerID': 10
      },{
        'logoUrl': '../../images/Postmates_2x.png', 
        'name': 'postmates', 
        'providerID': 11, 
      },{
        'logoUrl': '../../images/Seamless_2x.png', 
        'name': 'seamless', 
      },{
        'logoUrl':'../../images/Snapfinger_2x.png.png',
        'name':'Snapfinger',
    },{
        'logoUrl':'../../images/bite_squad.png',
        'name':'bitesquad',
        'providerID': 14
    }];

    function getProviderLogo(providerName){
      var provider = _.findIndex(providerLogoList, function(o){
        return o.name.toLowerCase() === providerName.toLowerCase();
      });
      console.log('provider: ', providerName, provider);
      if(provider > -1){
        return providerLogoList[provider].logoUrl;
      }
      else{
        return null;
      }
    }

    // Public API here
    return {
      getProviderInfo: function(provider){
        var providerName;
        for(providerName in provider){
        }
        var logoUrl = getProviderLogo(providerName);
        console.log('logoUrl: ', logoUrl);
        return {'providerName':providerName, 'providerUrl':provider[providerName], 'providerLogo':logoUrl};
      }
    };
  });
