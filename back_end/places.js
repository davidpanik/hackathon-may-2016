module.exports = function(lat, lon, dist, callback) {

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

  radarSearch(parameters, function (error, response) {
      if (error) throw error;

      callback(response);
  });
}