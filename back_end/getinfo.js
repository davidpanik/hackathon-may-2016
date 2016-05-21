var Q = require('q');


module.exports = function(lat, lon, callback) {
	var radius = 5000;
	var limit = 10;
	var response = {
		'latitide': lat,
		'longitude': lon,
		'radius': radius
	};

	if (!lat || !lon) {
		response.error = 'No latitude or longitude supplied';
		callback(response);
	} else {
		getPlaces()
		.then(getFlickr)
		.then(allDone);
	}

	function getPlaces() {
		var deferred = Q.defer(),
			params = {
				radius: radius,
				limit: limit
			};

		require('./places')(lat, lon, params, function(data, place) {
			response.places = data;
			response.country = place;

			deferred.resolve();
		});

		return deferred.promise;
	}

	function getFlickr() {
		var deferred = Q.defer();

		require('./flickr')(lat, lon, radius, function(data) {
			response.flickr = data;

			deferred.resolve();
		});

		return deferred.promise;
	}

	function allDone() {
		callback(response);
	}
};