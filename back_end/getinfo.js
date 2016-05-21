var Q = require('q');


module.exports = function(lat, lon, callback) {
	var radius = 10;
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
		var deferred = Q.defer();

		require('./places')(lat, lon, radius, function(data) {
			response.places = data;

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