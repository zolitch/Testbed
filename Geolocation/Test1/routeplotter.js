

/*global window, jQuery */

(function ($) {

	
	var mapContainer = document.getElementById('contactMap'),
	dirService = new google.maps.DirectionsService(),
	dirRenderer = new google.maps.DirectionsRenderer(),
	map = null,
	userLatlng,
	aqueLatlng,
	marker,
	showDirections = function(dirResult, dirStatus) {
		if (dirStatus !== google.maps.DirectionsStatus.OK) {
			alert('Directions failed: ' + dirStatus);
			return;
		}
		// Show directions
		dirRenderer.setMap(map);
		dirRenderer.setDirections(dirResult);
	},
	getSelectedTravelMode = function() {
		return google.maps.DirectionsTravelMode.WALKING;
	},
	getSelectedUnitSystem = function() {
		return google.maps.DirectionsUnitSystem.IMPERIAL;
	},
	getDirections = function(from) {
		var dirRequest = {
			origin: userLatlng,
			destination: aqueLatlng,
			travelMode: getSelectedTravelMode(),
			unitSystem: getSelectedUnitSystem(),
			provideRouteAlternatives: true
		};
		dirService.route(dirRequest, showDirections);
		
		//clear the marker that had already been set
		marker({
			visible: false
		});
	},
	initializeUser = function(userPosition) {
		userLatlng = new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude);    
		console.log('initializeUser position: ' + userLatlng);
	},
	
	processLocation = function(userPosition) {
		initializeUser(userPosition);
	},
	initialiseMap = function(){
		if (document.getElementById("contactMap")) {
			aqueLatlng = new google.maps.LatLng(51.519559, -0.100486);
			var myOptions = {
				zoom: 16,
				center: aqueLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("contactMap"), myOptions);

			marker = new google.maps.Marker({
				position: aqueLatlng,
				map: map,
				title: "Aqueduct"
			});
		}
	},
	AqueMap = {
	  init: function() {
		aqueLatlng = new google.maps.LatLng(51.519559, -0.100486);
		map = new google.maps.Map(mapContainer, {
		  zoom: 16,
		  center: aqueLatlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		marker = new google.maps.Marker({
			position: aqueLatlng,
			map: map,
			title: "Aqueduct"
		});
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(processLocation);
			//show the get directions button
			$('.getDirections').css({display:block});
		} else {
			//load standard map
			initialiseMap();
		}
	  }
	};
	
	$('.getDirections').click(function(){
		getDirections();
		return false;
	});
	
	
	
	
	
	
	
	
	
	google.maps.event.addDomListener(window, 'load', AqueMap.init);
	
})(jQuery);