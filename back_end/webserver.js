// DESCRIPTION: Launches a simple web-server for hosting the app's front-end

var express = require('express')();
var http    = require('http').Server(express);

var port = process.env.PORT || 5000;
var frontEndDir  = 'front_end';

module.exports = function(rootPath) {
	// Listen for query call
	express.get('/getinfo', function(request, response){
		var url = require('url');
		var urlParts = url.parse(request.url, true);
		var query = urlParts.query;

		console.log('Getting information for ' + query.lat + ', ' + query.lon);

		require('./getinfo')(query.lat, query.lon, function(data) {
			response.setHeader('Content-Type', 'application/json');
			response.send(JSON.stringify(data, null, 4));
		});
	});

	// Serve up everything else
	express.get(/^(.+)$/, function(request, response) {
		console.log('Serving static content');
		response.sendFile(rootPath + '/' + frontEndDir + '/' + request.params[0]);
	});

	http.listen(port, function() {
		console.log('Web server running on http://localhost:' + port);
	});
};