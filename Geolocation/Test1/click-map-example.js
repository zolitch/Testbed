var Demo = {
  // HTML Nodes
  mapContainer: document.getElementById('contactMap'),
  dirContainer: document.getElementById('dir-container'),
  fromInput: document.getElementById('from-input'),
  toInput: document.getElementById('to-input'),
  travelModeInput: document.getElementById('travel-mode-input'),
  unitInput: document.getElementById('unit-input'),

  // API Objects
  dirService: new google.maps.DirectionsService(),
  dirRenderer: new google.maps.DirectionsRenderer(),
  map: null,

  showDirections: function(dirResult, dirStatus) {
    if (dirStatus !== google.maps.DirectionsStatus.OK) {
      alert('Directions failed: ' + dirStatus);
      return;
    }

    // Show directions
    Demo.dirRenderer.setMap(Demo.map);
    Demo.dirRenderer.setPanel(Demo.dirContainer);
    Demo.dirRenderer.setDirections(dirResult);
  },

  getSelectedTravelMode: function() {
    var value =
        Demo.travelModeInput.options[Demo.travelModeInput.selectedIndex].value;
    if (value == 'driving') {
      value = google.maps.DirectionsTravelMode.DRIVING;
    } else if (value == 'bicycling') {
      value = google.maps.DirectionsTravelMode.BICYCLING;
    } else if (value == 'walking') {
      value = google.maps.DirectionsTravelMode.WALKING;
    } else {
      alert('Unsupported travel mode.');
    }
    return value;
  },

  getSelectedUnitSystem: function() {
    return Demo.unitInput.options[Demo.unitInput.selectedIndex].value == 'metric' ?
        google.maps.DirectionsUnitSystem.METRIC :
        google.maps.DirectionsUnitSystem.IMPERIAL;
  },

  getDirections: function() {
    var fromStr = Demo.fromInput.value;
    var toStr = Demo.toInput.value;
    var dirRequest = {
      origin: fromStr,
      destination: toStr,
      travelMode: Demo.getSelectedTravelMode(),
      unitSystem: Demo.getSelectedUnitSystem(),
      provideRouteAlternatives: true
    };
    Demo.dirService.route(dirRequest, Demo.showDirections);
  },

  init: function() {
    var latLng = new google.maps.LatLng(37.77493, -122.419415);
    Demo.map = new google.maps.Map(Demo.mapContainer, {
      zoom: 13,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Show directions onload
    Demo.getDirections();
  }
};

// Onload handler to fire off the app.
google.maps.event.addDomListener(window, 'load', Demo.init);