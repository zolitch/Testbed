
/*global window, jQuery, google*/
/*jslint browser: true, nomen: false*/
var globalObj = {};
(function ($, go, g) {
	
	var map,
		currentLocationSet = false;

	var createMap = function(){
		var myOptions = {
				zoom: 10,
				mapTypeId: g.maps.MapTypeId.ROADMAP
			};
			map = new g.maps.Map(document.getElementById("map_canvas"),
			myOptions);
	},
	createPin = function(position){
		var infowindow = new google.maps.InfoWindow({
			content: "<h3>marker header</h3><p>Marker Content</p>"
		});
		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title:"the title string"
		});
		g.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});
	},
	loadPrimaryLocation = function(loc){
		var geocoder = new g.maps.Geocoder();
		geocoder.geocode( { 'address': loc}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				console.log(results);
				map.setCenter(results[0].geometry.location);
				createPin(results[0].geometry.location);
			}
		});
	},
	loadShape = function(loc){
		var shapeLayer = new g.maps.KmlLayer('Paris.kml');
		shapeLayer.setMap(map);
	},
	loadLocation = function(loc){
		var geocoder = new g.maps.Geocoder();
		geocoder.geocode( { 'address': loc}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				createPin(results[0].geometry.location);
			}
		});
	},
	getAgentData = function(currentLocation, locations){
		var geocoder = new g.maps.Geocoder(),
			agentData,
			i;
			
		//create new map
		createMap();
		
		//place map pin and center map for current location and load the infowindow
		loadPrimaryLocation(currentLocation);
		
		//Load the shape for the current location
		//loadShape(currentLocation);
		//place all other map pins
		//for (i = 0; i < locations.length; i+=1) {
		//	loadLocation(locations[i]);
		//}
	};

	go.demoMap = {
		init: function() {
			var currentLocation = 'Paris, France',
				locations = ['Le Havre, France','Bordeaux, France'];
			getAgentData(currentLocation, locations);
			
		}
	};
	$(document).ready(function() {
		go.demoMap.init();
	});
})(jQuery, globalObj, google);
