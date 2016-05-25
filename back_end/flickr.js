var request = require('request');

module.exports = function(lat, lon, radius, callback) {
	var response = {};
	var maxImageToReturn = 9;

	request
		.post({
			url: 'https://api.flickr.com/services/rest/',
			qs: {
				'method': 'flickr.photos.search',
				'api_key': '802ec51eec414c27bd05096065529c11',
				'lat': lat,
				'lon': lon,
				'radius': Math.round(radius / 1000),
				'format': 'json',
				'safe_search': 1,
				'sort': 'interestingness-desc',
				'radius_units': 'km',
				'nojsoncallback': 1
			}},
			function(err, httpResponse, body) {
				if (err) {
					response.error = err;
				} else {
					var data = JSON.parse(body);
					var photos = [];

					if (data.photos && data.photos.photo) {
						data.photos.photo = data.photos.photo.slice(0, maxImageToReturn);

						data.photos.photo.forEach(function(photo) {
							photos.push({
								title: photo.title,
								url: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg'
							});
						});
					}

					response = photos;
				}

				callback(response);
			}
		);

};




55.9591232,-3.2006673