module.exports = function(lat, lon) {
	var response = {
		'latitide': lat,
		'longitude': lon
	};

	if (!lat || !lon) {
		response.error = 'No latitude or longitude supplied';
	} else {
		// Do stuff here!
	}

	return response;
};