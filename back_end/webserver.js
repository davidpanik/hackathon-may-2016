// DESCRIPTION: Launches a simple web-server for hosting the app's front-end

var express = require('express')();
var http    = require('http').Server(express);

var port = process.env.PORT || 5000;
var frontEndDir  = 'front_end';

module.exports = function(rootPath) {
	// Listen for query call
	express.get('/getinfo', function(req, res){
		res.send('Getting info...');
	});

	// Serve up everything else
	express.get(/^(.+)$/, function(req, res) {
		res.sendFile(rootPath + '/' + frontEndDir + '/' + req.params[0]);
	});

	http.listen(port, function() {
		console.log('Web server running on http://localhost:' + port);
	});
};