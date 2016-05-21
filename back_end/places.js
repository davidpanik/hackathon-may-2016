var Q = require('q');

module.exports = function(lat, lon, dist) {

	var apiKey = 'AIzaSyDznjpJXSiTygHy4zLNrqy-TMqZIPBtXWo',
		outputFormat = 'json';

	// var request = require('request');

  var GooglePlaces = require('./google.js');
  var googlePlaces = new GooglePlaces(apiKey, outputFormat);
  var parameters;

  var radarSearch = googlePlaces.radarSearch;

  var parameters = {
      location: [lat, lon],
      types: "locality",
      radius: dist
  };

	var deferred = Q.defer();

  radarSearch(parameters, function (error, response) {
      if (error) throw error;

      deferred.resolve(response);
  });

	return deferred.promise;
}