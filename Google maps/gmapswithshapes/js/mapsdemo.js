
/*global window, jQuery, google, InfoBox*/
/*jslint browser: true, nomen: false*/
var globalObj = {};
(function ($, gm) {
	
	if (gm !== 'undefined'){
		var agentsData = {
			"locations": [{
				"agentName": "Bordeaux Branch",
				"areaName": "Bordeaux, France",
				"address": "100 some street, Bordeaux, France",
				"url": "http://www.lloyds.com",
				"subLocations": [{
					"agentName": "La Rochelle Branch",
					"areaName": "La Rochelle, France",
					"address": "100 some street, La Rochelle, France",
					"url": "http://www.lloyds.com"
				},{
					"agentName": "Bergerac Branch",
					"areaName": "Bergerac, France",
					"address": "100 some street, Bergerac, France",
					"url": "http://www.lloyds.com"
				}]
			}, 
			{
				"agentName": "Paris Branch",
				"areaName": "Paris, France",
				"address": "100 some street, Paris, France",
				"url": "http://www.lloyds.com",
				"subLocations": [{
					"agentName": "Strasbourg Branch",
					"areaName": "Strasbourg, France",
					"address": "100 some street, Strasbourg, France",
					"url": "http://www.lloyds.com"
				},{
					"agentName": "Reims Branch",
					"areaName": "Reims, France",
					"address": "100 some street, Reims 2, France",
					"url": "http://www.lloyds.com"
				}]
			},
			{
				"agentName": "Marseille Branch",
				"areaName": "Marseille,France",
				"address": "100 some street, Marseille, France",
				"url": "http://www.lloyds.com",
				"subLocations": [{
					"agentName": "Toulon Branch",
					"areaName": "Toulon, France",
					"address": "100 some street, Toulon, France",
					"url": "http://www.lloyds.com"
				},{
					"agentName": "Montpellier Branch",
					"areaName": "Montpellier, France",
					"address": "100 some street, Montpellier, France",
					"url": "http://www.lloyds.com"
				}]
			}]
		
		},
	
			map,
			Location,
			locations = [],
			
			createMap = function(elem){
				var myOptions = {
				  zoom: 7,
				  mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				
			},
			infoBox = new InfoBox({
				pixelOffset: new gm.Size(30, -70),
				boxStyle: { 
					opacity: 0.80
				},
				closeBoxMargin: "10px 2px 2px 2px",
				closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			}),
			showLocationInfo = function(header, area, address, url, target){
				infoBox.setContent('<h3>' + header + '</h3><p>Area: ' + area + '</p><p>Address: ' + address + '</p><p></p><p>Url: <a href="' + url + '">' + url + '</a></p>');	
				infoBox.open(map,target);
			};
		
		window.globalObj.branchLocations = {
			init: function (reqLocation) {
				//load the google map
				createMap();
				
				//get collection of data from json
				//load each location into a location object
				var i;
				for (i = 0; i < agentsData.locations.length; i+=1) {
					if(reqLocation === agentsData.locations[i].areaName){
						//load as requested location and center the map to the coords
						locations.push(new Location(agentsData.locations[i], true));
					}else{
						//load as other location
						locations.push(new Location(agentsData.locations[i], false));
					}
				}
				
				gm.event.addListener(map, 'idle', function() {
					var i,j,k,
						bounds = map.getBounds(),
						ne = bounds.getNorthEast(),
						sw = bounds.getSouthWest();
					
					//loop through all parent locations and find any matches in json object and load sublocations
					for (i = 0; i < locations.length; i+=1) {
						//if location is in viewport then create the sub location markers if there are any and apply the location border overlay
						if(locations[i].lat <= ne.lat() && locations[i].lat >= sw.lat() && locations[i].lng <= ne.lng() && locations[i].lng >= sw.lng()){
							for (j = 0; j < agentsData.locations.length; j+=1) {
								if(agentsData.locations[j].areaName.replace(" ","") === locations[i].areaName.replace(" ","")){
									for (k = 0; k < agentsData.locations[j].subLocations.length; k+=1) {
										locations[i].loadSubLocation(agentsData.locations[j].subLocations[k]);
									}
								}
							}
							locations[i].subLocationsShowing = true;
						}
					}
				});
			}
		};	
		Location = function (agentData, isCurrent) {
			var self = this,
				i;
			this.isActive = isCurrent;
			this.areaName = agentData.areaName;
			this.agentUrl = agentData.url;
			this.agentName = agentData.agentName;
			this.agentAddress = agentData.address;
			this.loadLocation(agentData.areaName);
			
		};
		Location.prototype = {
			marker: null,
			areaName: '',
			agentName: '',
			agentAddress: '',
			agentUrl: '',
			isActive: false,
			lat: '',
			lng: '',
			subLocationsShowing: false,
			loadLocation: function(loc){
				var self = this,
					geocoder = new gm.Geocoder();
				geocoder.geocode( { 'address': loc}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						self.lat = results[0].geometry.location.lat();
						self.lng = results[0].geometry.location.lng();
						if(self.isActive){map.setCenter(results[0].geometry.location);}
						self.createMarker(results[0].geometry.location);
					}
				});
			},
			loadSubLocation: function(subLocation){
				if(!this.subLocationsShowing){
					var self = this,
						geocoder = new gm.Geocoder();
					geocoder.geocode( { 'address': subLocation.areaName}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							self.createSubLocationMarker(results[0].geometry.location, subLocation);
						}
					});
				}
			},
			showAreaOverlay: function(){
				
			},
			createMarker: function(position){
				var self = this,
					marker = new gm.Marker({
					map: map,
					position: position,
					title:self.agentName
				});
				gm.event.addListener(marker, 'click', function() {
					showLocationInfo(self.agentName,self.areaName,self.agentAddress,self.agentUrl,marker);
				});
				if (self.isActive){
					showLocationInfo(self.agentName,self.areaName,self.agentAddress,self.agentUrl,marker);
				}
			},
			createSubLocationMarker: function(position, subLocDetails){
				var self = this,
					marker = new gm.Marker({
					map: map,
					position: position,
					animation: gm.Animation.DROP,
					title: subLocDetails.agentName
				});
				gm.event.addListener(marker, 'click', function() {
					showLocationInfo(subLocDetails.agentName,subLocDetails.areaName,subLocDetails.address,subLocDetails.url,marker);
				});
			}
		};
	}
	

})(jQuery, google.maps);

jQuery(document).ready(function() {
	globalObj.branchLocations.init("Paris, France");
});