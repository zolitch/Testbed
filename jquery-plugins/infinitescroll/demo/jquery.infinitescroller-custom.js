(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Infinite-Scroller/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.1
    // Contributions by: 
	
	var timer;
	var filltimer;
	var pageLoaded = false;
	
	// Initialises the scroller
	var SetupInfiniteScroller = function (obj, config) {
		$(obj).html("<div id=\"" + config.innerscrollerid + "\">" + $(obj).html() + "</div>");
		$(obj).css({ width: config.width, height: config.height, overflow: config.overflow });

		FillContainerHeight(obj, config);
	};
	
	// Checks the scroll position and gets more items when required
	var FillContainerHeight = function (obj, config) {
		var containerHeight = $(obj).height();
		var height = $("#" + config.innerscrollerid).height();
		var windowHeight = $(window).height();
		var windowScroll = $(window).scrollTop();
		
		//position the page scroll to the top of the page on page load
		if(!pageLoaded){
			$(window).scrollTop(0);
			pageLoaded = true;
		}
		console.log('height - containerHeight - scrollTop - windowHeight - (scrollTop + windowHeight): ' + height + ' - ' + containerHeight + ' - ' + $(window).scrollTop() + ' - ' + windowHeight + ' - ' + ($(window).scrollTop() + windowHeight));
		if (containerHeight < (windowScroll + windowHeight)) {
			GetMoreContent(obj, config);
		}
		
		filltimer = window.setTimeout(function () { FillContainerHeight(obj, config); }, 1000);
	};

	// Displays content
	var ContentReceived = function (html, obj, config) {
		if (html.length === 0) {
			$(obj).unbind("scroll");
		} else {
			$("#" + config.innerscrollerid).append(html);
		}
	};

	// Requests more content
	var GetMoreContent = function (obj, config) {
		config.modifier++;
		var nextUri = config.uri.replace(/#MODIFIER#/g, config.modifier);

		$.ajax({
			url: nextUri,
			success: function(data){
				ContentReceived(data, obj, config)
			},
			error: function (xhr, ajaxOptions, thrownError){
                    alert(xhr.status);
                    alert(thrownError);
                }
		});
	};

	$.fn.infinitescroller = function (settings) {
	
		var config = {
			innerscrollerid: "innerscroller",
			uri: "infinitefakedata.html?Page=#MODIFIER#",
			modifier: 0,
			width: "500px",
			height: "300px",
			overflow: "auto",
			offset: 50
		};
		
		if (settings) {
			$.extend(config, settings);
		}

		return this.each(function () {
		
			SetupInfiniteScroller(this, config);
			
			/*
			$(this).bind("scroll", function (event) {
			
				$This = $(this);
				
				var containerHeight = $This.height();
				var windowHeight = $(window).height();
				var height = ($("#" + config.innerscrollerid).height() - containerHeight) - parseInt(config.offset);
				var scroll = $This.scrollTop();
				var windowScroll = $(window).scrollTop();
				
				console.log('scroll - height - windowHeight: ' + scroll + ' - ' + height + ' - ' + windowHeight);
				window.clearTimeout(timer);

				if (containerHeight < (windowScroll + windowHeight)) {
					
					timer = window.setTimeout(function () { GetMoreContent(this, config); }, 500);
				}
			});	
*/			
		});
	};
})(jQuery);