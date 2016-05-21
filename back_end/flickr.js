var request = require('request');

module.exports = function(lat, lon, radius, callback) {
	var response = {};

	request
		.post({
			url: 'https://api.flickr.com/services/rest/',
			qs: {
				'method': 'flickr.photos.search',
				'api_key': '97064c0d86c4b4f7a518c783aee67e11',
				'lat': lat,
				'lon': lon,
				'radius': radius,
				'format': 'json',
				'nojsoncallback': 1
			}},
			function(err, httpResponse, body) {
				console.log(JSON.stringify(body, null, 4));

				if (err) {
					response.error = err;
				} else {
					response = body;
				}

				callback(response);
			}
		);

};




55.9591232,-3.2006673