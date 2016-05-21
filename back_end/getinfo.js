module.exports = function(lat, lon) {
	var radius = 10;
	var response = {
		'latitide': lat,
		'longitude': lon,
		'radius': radius
	};


	if (!lat || !lon) {
		response.error = 'No latitude or longitude supplied';
	} else {
		// Do stuff here!
	}

	return response;
};