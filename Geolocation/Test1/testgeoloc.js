// Geolocation API Samples


///////////////
// Test that the browser supports the GeoLocation object
/*global window, jQuery */

(function ($, google) {

	var userLatlng,
		aqueLatlng;
	
	function initialize(userPosition) {
		//userLatlng = new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude);
		userLatlng = new google.maps.LatLng(51.529559, -0.120486);
		aqueLatlng = new google.maps.LatLng(51.519559, -0.100486);
                    
		
			
		var myOptions = {
			zoom: 14,
			center: userLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("contactMap"), myOptions);
		var userMarker = new google.maps.Marker({
			position: userLatlng,
			map: map,
			title: "You are here"
		});
		var aqueMarker = new google.maps.Marker({
			position: aqueLatlng,
			map: map,
			title: "Aqueduct"
		});
		
		//map.addOverlay(userMarker);
		//map.addOverlay(aqueMarker);
		
		//var directions = new GDirections(map);

		//directions.load("from:" + userMarker.getPoint().lat()+ ", " + 
        //                userMarker.getPoint().lng() + 
        //                 " to:" + aqueMarker.getPoint().lat() + "," + 
        //                 aqueMarker.getPoint().lng(), 
        //                 { getPolyline: true, getSteps: true }); 
    
	}
	function processLocation(userPosition) {
		console.log(("Your location is: Lng " + userPosition.coords.longitude + ", Lat " + userPosition.coords.latitude));
		initialize(userPosition);
	}
	
	
	if (document.getElementById("contactMap")) {
		navigator.geolocation.getCurrentPosition(processLocation);
	}


	///////////////
	// Request multiple updates, and handle any errors
	//trackMap = function (position) {
	   // Add code here to position the map and a pushpin at the new location
	   // at position.coords
	//},


	//errorHandler = function (error) {
		//alert("Location Error: " + error.message);
	//};


	//if (navigator.geolocation) {
		// Call your geolocation code, HERE
		//console.log('geolocation ready!');
		// Request the 		} else {
			//alert("Geolocation services are not supported by your browser.");
		//}


	// Request multiple location updates
	// watchID is a handler identifier for the request
	//var watchID = navigator.geolocation.watchPosition( trackMap, errorHandler );


	// Stop the updates
	//navigator.geolocation.clearWatch( watchID );

})(window.jQuery, window.google);