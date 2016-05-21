var map, current;

function initMap() {
	// var myLatlng = new google.maps.LatLng(-25.363882,131.044922); // Ayers rock
	var myLatlng = new google.maps.LatLng(55.9587389,-3.1954316); // Edinburgh

	map = new google.maps.Map(document.getElementById('map'), {
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		center: myLatlng,
		zoom: 11
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: 'plane.png'
		// draggable: true
	});

	map.addListener('center_changed', debounce(function() {
		setPosition(map.getCenter());
	}, 500));

	function setPosition(position) {
		if (current) console.log(getDistance(current, position));
		marker.setPosition(position);
		if (!current || (getDistance(current, position) > 0.01)) {
			console.log('Updating');
			document.getElementById('details').innerHTML = 'Updating...';
			// map.setCenter(position);
			getInfo(position.lat(), position.lng());
			current = position;
		}
	}

	function getInfo(lat, lon) {
		ajax('/getinfo', { lat: lat, lon: lon }, function(data) {
			console.log(data);
			render('details', 'detailsTemplate', data);
		});
	}
}

function render(location, template, data) {
	template = Handlebars.compile(document.getElementById(template).innerHTML);
	document.getElementById(location).innerHTML = template(data);
}

function ajax(url, data, callback) {
	url += '?';

	for (var key in data) {
		url += key + '=' + data[key] + '&';
	}

	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			callback(JSON.parse(this.response));
		} else {
			console.log('AJAX error on ' + url);
		}
	};

	request.onerror = function() {
		console.log('AJAX error on ' + url);
	};

	request.send();
}

function getDistance(point1, point2) {
	var xs = 0;
	var ys = 0;

	xs = point2.lat() - point1.lat();
	xs = xs * xs;

	ys = point2.lng() - point1.lng();
	ys = ys * ys;

	return Math.sqrt(xs + ys);
}

function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}