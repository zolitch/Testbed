

(function ($, google) {
var AqueMap = {
  // HTML Nodes
  mapContainer: document.getElementById('map-container'),

  // API Objects
  dirService: new google.maps.DirectionsService(),
  dirRenderer: new google.maps.DirectionsRenderer(),
  map: null,

  showDirections: function(dirResult, dirStatus) {
    if (dirStatus != google.maps.DirectionsStatus.OK) {
      alert('Directions failed: ' + dirStatus);
      return;
    }

    // Show directions
    AqueMap.dirRenderer.setMap(AqueMap.map);
    AqueMap.dirRenderer.setDirections(dirResult);
  },

  getSelectedTravelMode: function() {
      return google.maps.DirectionsTravelMode.DRIVING;
  },

  getSelectedUnitSystem: function() {
        return google.maps.DirectionsUnitSystem.IMPERIAL;
  },

  getDirections: function() {
    var fromStr = 'sw24xd';
    var toStr = 'sw23tu';
    var dirRequest = {
      origin: fromStr,
      destination: toStr,
      travelMode: AqueMap.getSelectedTravelMode(),
      unitSystem: AqueMap.getSelectedUnitSystem(),
      provideRouteAlternatives: true
    };
    AqueMap.dirService.route(dirRequest, AqueMap.showDirections);
  },

  init: function() {
    var latLng = new google.maps.LatLng(51.529559, -0.120486);
    AqueMap.map = new google.maps.Map(AqueMap.mapContainer, {
      zoom: 13,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Show directions onload
    AqueMap.getDirections();
  }
};

// Onload handler to fire off the app.
google.maps.event.addDomListener(window, 'load', AqueMap.init);
})(window.jQuery, window.google);