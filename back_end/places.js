var Q = require('q');

module.exports = function(lat, lon, params, callback) {

	var apiKey = 'AIzaSyDCy8P_lQ1gK5ppUGTs7bjfN4wTpPWd-ks',
		outputFormat = 'json';

	// var request = require('request');

  var GooglePlaces = require('./google.js');
  var googlePlaces = new GooglePlaces(apiKey, outputFormat);
  var parameters;

  var radarSearch = googlePlaces.radarSearch;
	var placeDetailsRequest = googlePlaces.placeDetailsRequest;

  var detailsRequest = function(reference, iteration, detailCallback) {
  	var detailsDeferred = Q.defer();

    placeDetailsRequest({reference: reference}, function (error, response) {
        if (error) throw error;

        detailCallback(response, iteration);
    });

    return detailsDeferred;
  }

 	var getPrimaryPlaceInfo = function(placeDetails) {
 		if(!placeDetails.address_components || !placeDetails.address_components.length) {
 			return {};
 		}

 		for (var i = 0;i < placeDetails.address_components.length; i++) {
 			if(placeDetails.address_components[i].types && placeDetails.address_components[i].types.length) {
	 			for(var j = 0; j < placeDetails.address_components[i].types.length; j++) {
	 				if(placeDetails.address_components[i].types[j] === 'country') {
	 					return placeDetails.address_components[i];
	 				}
	 			}
 			}
 		};

 		return {};
 	}

  var parameters = {
      location: [lat, lon],
      types: ['locality', 'natural_feature'],
      radius: params.dist || 10000
  };

  radarSearch(parameters, function (error, response) {
    if (error) throw error;

    var formatted = [],
    	primaryPlace = {},
    	count = 0,
    	limit = response.results.length < 10 ? response.results.length : 10,
     	i;

   	if(!response.results.length) {
   		callback([], {});
   		return;
   	}

    for (i = 0; i < limit; i++) {
    	if(!response.results[i]) {
    		continue;
    	}

    	detailsRequest(response.results[i].reference, i, function(details, iteration) {
    		count += 1;
    		formatted.push(details.result);

    		if(iteration === 0) {
    			// fill primary place
    			primaryPlace = getPrimaryPlaceInfo(details.result);
    		}

    		if(count === limit - 1) {
		      callback(formatted, primaryPlace);
    		}
    	});
    };

  });
}