// Geolocation API Samples


///////////////
// Test that the browser supports the GeoLocation object
/*global window, jQuery */

(function ($, google) {

	
  var mapContainer = document.getElementById('contactMap'),

  // API Objects
  dirService = new google.maps.DirectionsService(),
  dirRenderer = new google.maps.DirectionsRenderer(),
  map = null,
  
  showDirections = function(dirResult, dirStatus) {
    if (dirStatus !== google.maps.DirectionsStatus.OK) {
      alert('Directions failed: ' + dirStatus);
      return;
    }

    // Show directions
    dirRenderer.setMap(map);
  },
	getSelectedTravelMode = function() {
		return google.maps.DirectionsTravelMode.DRIVING;
	},
	getSelectedUnitSystem = function() {
		return google.maps.DirectionsUnitSystem.IMPERIAL;
	},
	getDirections = function() {
		var fromStr = '345 Spear St, San Francisco, CA',
			toStr = '1600 Amphitheatre Pkwy, Mountain View, CA',
			dirRequest = {
				origin: fromStr,
				destination: toStr,
				travelMode: getSelectedTravelMode(),
				unitSystem: getSelectedUnitSystem(),
				provideRouteAlternatives: true
			};
		dirService.route(dirRequest, showDirections);
	},

  initialise = function() {
    var latLng = new google.maps.LatLng(37.77493, -122.419415);
    map = new google.maps.Map(mapContainer, {
      zoom: 9,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Show directions onload
    getDirections();
  };
  
  
	// Onload handler to fire off the app.
	google.maps.event.addDomListener(window, 'load', initialise());
})(window.jQuery, window.google);