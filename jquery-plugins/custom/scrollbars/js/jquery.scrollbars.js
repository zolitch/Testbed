
/*jslint browser: true, vars: true, white: false, forin: true*/
/*global define,require */
(function($){

	$.fn.scrollbars = function(options){
		
		var settings = {
			'orientation': 'vertical'
		};
		
		
		
		
        return this.each(function() {
			var $this = $(this),
				$scrollContent = $this.find('> div'),
				difference = $scrollContent.height() - $this.outerHeight(),
				$sliderWrap,
				$slider,
				$sliderHandle,
				proportion = 0,
				handleHeight = 0;
		
		
			var loadSlider = function(){
				proportion = difference / $scrollContent.outerHeight(); //eg 200px/500px
				handleHeight = Math.round((1-proportion)*$this.height()); //set the proportional height - round it to make sure everything adds up correctly later on
				handleHeight -= handleHeight%2;
				
				$this.append('<div class="sliderWrap"><div class="slider"></div></div>');//append the necessary divs so they're only there if needed
				$sliderWrap = $this.find('.sliderWrap');
				$slider = $this.find('.slider');
				$sliderWrap.height($this.height());
				
				$slider.slider({
					orientation: "vertical",
					range: "min",
					min: 0,
					max: 100,
					value: 60,
					slide: function( event, ui ) {
						console.log(ui.value );
					}
				});
					$sliderHandle = $slider.find(".ui-slider-handle");
				   //set the handle height and bottom margin so the middle of the handle is in line with the slider
				   $sliderHandle.css({'height':handleHeight,'margin-bottom':-0.5*handleHeight});
			},
			scrollContent = function(){
				if ( options ) { 
					$.extend( settings, options );
				}
				$( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
			};
			
			
			
			if(difference > 0){
				$this.css({'overflow':'hidden'});
				loadSlider();
			}
			
		});
	};

})(jQuery);