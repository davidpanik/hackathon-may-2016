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
		// Do stuff here!
		require('./flickr')(lat, lon, radius, function(data) {
			response.flickr = data;

			callback(data);
		});
	}
};