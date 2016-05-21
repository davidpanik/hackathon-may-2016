(function () {
    "use strict";

    var PlaceSearch = require("../node_modules/googleplaces/lib/PlaceSearch.js");
    var RadarSearch = require("../node_modules/googleplaces/lib/RadarSearch.js");
    var TextSearch = require("../node_modules/googleplaces/lib/TextSearch.js");
    var PlaceDetailsRequest = require("../node_modules/googleplaces/lib/PlaceDetailsRequest.js");
    var PlaceAutocomplete = require("../node_modules/googleplaces/lib/PlaceAutocomplete.js");
    var AddEvent = require("../node_modules/googleplaces/lib/AddEvent.js");
    var DeleteEvent = require("../node_modules/googleplaces/lib/DeleteEvent.js");
    var EventDetails = require("../node_modules/googleplaces/lib/EventDetails.js");
    var ImageFetch = require("../node_modules/googleplaces/lib/ImageFetch.js");
    var NearBySearch = require('../node_modules/googleplaces/lib/NearBySearch.js');

    module.exports = function (apiKey, outputFormat) {
        return {
            placeSearch: new PlaceSearch(apiKey, outputFormat),
            radarSearch: new RadarSearch(apiKey, outputFormat),
            textSearch: new TextSearch(apiKey, outputFormat),
            placeDetailsRequest: new PlaceDetailsRequest(apiKey, outputFormat),
            placeAutocomplete: new PlaceAutocomplete(apiKey, outputFormat),
            addEvent: new AddEvent(apiKey, outputFormat),
            deleteEvent: new DeleteEvent(apiKey, outputFormat),
            eventDetails: new EventDetails(apiKey, outputFormat),
            imageFetch: new ImageFetch(apiKey),
            nearBySearch: new NearBySearch(apiKey, outputFormat)

        };
    };

})();