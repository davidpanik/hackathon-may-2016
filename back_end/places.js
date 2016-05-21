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

  var detailsRequest = function(reference, detailCallback) {
  	var detailsDeferred = Q.defer();

    placeDetailsRequest({reference: reference}, function (error, response) {
        if (error) throw error;

        detailCallback(response);
    });

    return detailsDeferred;
  }

  var parameters = {
      location: [lat, lon],
      types: "locality",
      radius: params.dist || 10000
  };

  radarSearch(parameters, function (error, response) {
    if (error) throw error;

    var formatted = [];

    for (var i = 0; i < 10; i++) {

    	if(!response.results[i]) {
    		continue;
    	}

    	detailsRequest(response.results[i].reference, function(details) {

    		formatted.push(details);

    		if(i === 10) {
		      callback(formatted);
    		}
    	});
    };

  });
}