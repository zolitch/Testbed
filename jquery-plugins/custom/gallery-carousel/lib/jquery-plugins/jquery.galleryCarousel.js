/*jslint browser:true, white:false*/
/*global window, jQuery */
/*
	Authors: David Taylor/Stephen Zsolnai http://the-taylors.org/
	ver: 1.0
	Requires: 
	jQuery v1.5.2 or later: http://docs.jquery.com/Downloading_jQuery#Download_jQuery
	jQuery cycle plugin: https://raw.github.com/malsup/cycle/master/jquery.cycle.all.js
	jQuery jCarousel: http://sorgalla.com/jcarousel
	
	Usage:
	$(function(){
        $('#targetElement').galleryCarousel({});
    });
	
	Options (defaults):
	{
		activeItemClass: 'scroller-image-selected',
		height: 280,
		width:null,
		auto:false,
		cycleSettings: {}
    }
	
*/
(function ($) {

    var SETTINGS_KEY            = 'gallerySettings',
        GAL_WRAPPER_CLASS        = 'galleryCarouselParent',
        GAL_NEXT_DISABLED       = 'gallery-next-image-disabled',
        GAL_PREV_DISABLED       = 'gallery-prev-image-disabled',
        GAL_PAUSED_ICON_CLASS      = 'carouselControl-paused',
        GAL_PLAYING_ICON_CLASS      = 'carouselControl-playing',

        DEFAULTS = {
            activeItemClass: 'scroller-image-selected',
			height: 280,
			width:null,
			showControls: true,
			allowFullScreen: true,
			auto:true,
			cycleSettings: {
				fx:'fade',
				speed: 600,
				timeout: 3000,
				pause: false,
				cleartype:true
			}
        };
    $.fn.galleryCarousel = function (options) {
        
        return this.each(function(){
			var settings = $.extend(true, {}, DEFAULTS, options),
				beforeFullscreen = {}; //this will contain details of the gallery element before detachment and full screen
	
			var getSettings = function($elem){
				return $elem.closest('.'+ GAL_WRAPPER_CLASS).data(SETTINGS_KEY);
			},
			playSlideShow = function($elem){
				var settings = getSettings($elem);
				settings.$imageWrapper.cycle('resume');
				settings.$carouselControl.addClass(GAL_PLAYING_ICON_CLASS).removeClass(GAL_PAUSED_ICON_CLASS);
			},
			pauseSlideShow = function($elem){
				var settings = getSettings($elem);
				settings.$imageWrapper.cycle('pause');
				settings.$carouselControl.addClass(GAL_PAUSED_ICON_CLASS).removeClass(GAL_PLAYING_ICON_CLASS);
			},
			showControls = function($elem){
				var elemSettings = getSettings($elem);
				$elem.append('<a class="carouselControl" href="#"></a>');
				elemSettings.$carouselControl = $elem.find('.carouselControl');
				if (elemSettings.auto){
					elemSettings.$carouselControl.addClass(GAL_PLAYING_ICON_CLASS);
				}
				elemSettings.$carouselControl.toggle(function(e){
					playSlideShow($(this));
					e.preventDefault();
				}, function(e){
					pauseSlideShow($(this));
					e.preventDefault();
				});
			},
			removeFullScreen = function(elemSettings){
				var $gallery = elemSettings.$carousel.closest('.'+ GAL_WRAPPER_CLASS);
				$gallery.detach();
				$gallery.removeClass('galleryCarouselTfullScreen');
				$gallery.height(beforeFullscreen.height);
				$('html').css({'overflow':'auto'});
				window.scroll(beforeFullscreen.x,beforeFullscreen.y);
				if (beforeFullscreen.index >= beforeFullscreen.parentElement.children().length) {
					beforeFullscreen.parentElement.append($gallery);
				 } else {
					$gallery.insertBefore(beforeFullscreen.parentElement.children().get(beforeFullscreen.index));
				 }
			},
			goFullScreen = function(elemSettings){
				var $gallery = elemSettings.$carousel.closest('.'+ GAL_WRAPPER_CLASS);
				beforeFullscreen = {
					parentElement: $gallery.parent(),
					index: $gallery.parent().children().index($gallery),
					height: $gallery.outerHeight(),
					x: $(window).scrollLeft(), 
					y: $(window).scrollTop()
				};
				$gallery.detach();
				$gallery.addClass('galleryCarouselTfullScreen').appendTo('body');
				$gallery.height($(window).height());
				$('html').css({'overflow':'hidden'});
				window.scroll(0,0);
				$(document).keyup(function(e) {
					if (e.keyCode === 27) {
						removeFullScreen(elemSettings);
						elemSettings.$carousel.find('.carouselControl-fullScreen').removeClass('fullScreen-active');
					}
				});

			},
			initFullScreen = function(){
				settings.$carousel.append('<a href="#" class="carouselControl-fullScreen"></a>');
				settings.$carousel.find('.carouselControl-fullScreen').click(function(e){
					if($(this).hasClass('fullScreen-active')){
						removeFullScreen(getSettings($(this)));
						$(this).removeClass('fullScreen-active');
					}else{
						goFullScreen(getSettings($(this)));
						$(this).addClass('fullScreen-active');
					}
					e.preventDefault();
				});
				
			},
			showContent = function(elementID, slideSpeed){
				var $elem = $('#' + elementID),

				//show the content. Animate the height based on the height of the inner div
				hgt = $elem
					.children()
					.children('.images-caption-content')
					.outerHeight();
				
				$elem
					.children('.galleryCarousel-images-caption')
					.stop(true, true)
					.animate({height: hgt}, slideSpeed);
			}, 
			hideContent = function(elementID, slideSpeed){
				var $elem = $('#' + elementID);
				//hide the content
				$elem
					.children('.galleryCarousel-images-caption')
					.stop(true,false)
					.animate({height: 0}, slideSpeed);
			},
			showSlide = function(elemId){
				var $slide = $('#' + elemId),
					slideIndex = $slide.index(),
					settings = getSettings($slide);
				settings.$imageWrapper.cycle(slideIndex);
				settings.$currentSlide = $slide;

				// de-activate the next button
				if (slideIndex >= settings.totalSlides) {
					settings.$galleryNextLink.addClass(GAL_NEXT_DISABLED);   
				} else {
					settings.$galleryNextLink.removeClass(GAL_NEXT_DISABLED);
				}

				// de-activate the prev button
				if (slideIndex <= 0) {
					settings.$galleryPrevLink.addClass(GAL_PREV_DISABLED);
				} else {
					settings.$galleryPrevLink.removeClass(GAL_PREV_DISABLED);
				}
			},
			activateSlide = function($elem){
				var settings = getSettings($elem);
				$elem.siblings().removeClass(settings.activeItemClass);
				$elem.addClass(settings.activeItemClass);
			},
			carousel_initCallback = function(carousel) {
				var settings = carousel.container.data(SETTINGS_KEY);    

				settings.$galleryNextLink.bind('click', function() {
					if (!$(this).hasClass(GAL_NEXT_DISABLED)){
						showSlide(settings.$currentSlide.next().attr('id'));
						carousel.scroll($.jcarousel.intval(settings.$currentSlide.index()));
					}
					return false;
				});
				settings.$galleryPrevLink.bind('click', function() {
					if (!($(this).hasClass(GAL_PREV_DISABLED))){
						showSlide(settings.$currentSlide.prev().attr('id'));
						carousel.scroll($.jcarousel.intval(settings.$currentSlide.index()));
					}
					return false;
				});
			},
			initialiseCarousel = function($carousel, settings){
				$carousel
				.data(SETTINGS_KEY, settings)
				.jcarousel({
					auto: 0,
					scroll:5,
					initCallback: carousel_initCallback
				});
				if(settings.showControls){showControls($carousel);}
				if(settings.allowFullScreen){initFullScreen();}
			},
			initialiseCycle = function($wrapper, $imageWrapper, settings){
				
				var beforeCycle = function(currSlideElement, nextSlideElement, options, forwardFlag) {
					hideContent(currSlideElement.id, settings.cycleSettings.speed);
					$wrapper.find('.jcarousel-item').each(function(){
						if ($(this).index() === $(nextSlideElement).index()){
							activateSlide($(this));
						}
					});
				},
				afterCycle = function(currSlideElement, nextSlideElement, options, forwardFlag)  {
					showContent(nextSlideElement.id, settings.cycleSettings.speed);
				};

				$.extend(settings.cycleSettings, {
						before: beforeCycle,
						after: afterCycle
				});
				$imageWrapper.cycle(settings.cycleSettings);
				if(!settings.auto){$imageWrapper.cycle('pause');}
			},
			// interactions
			initialiseInteractions = function($wrapper){
				$wrapper.find('.carousel-item-link').click(function(e){
					var href = $(this).attr('href');
					href = href.substr(href.lastIndexOf("#")+1); //replace one or more hash tags passed in the href.
					//activateSlide($(this).parent());
					showSlide(href);
					e.preventDefault();
				});
			},
			// positioning, element settings
			setPositioning = function($wrapper, settings){
				//var $nextPrevBtn = $wrapper.find('>div>a');
				$wrapper.height(settings.height + 'px').width(settings.width + 'px');
				//$nextPrevBtn.each(function(){
				//	$(this).css('top', (($wrapper.find('>div>ul').outerHeight() / 2) - ($wrapper.find('>div>a').outerHeight() / 2)) + 'px');
				//});
			},
			buildImageGallery = function($elem, settings){
				var imageData = [],
					index = 1,
					imageItem,
					carouselItem;
				$elem.append('<div class="galleryCarousel-images"><ul class="galleryCarousel-cycle"></ul><a href="#" class="gallery-prev-image gallery-prev-image-disabled">Previous Image</a><a href="#" class="gallery-next-image">Next Image</a></div><div class="carousel-wrapper cc"><ul class="galleryCarousel-scroller"></ul></div>');
				
				settings.$imageWrapper = $elem.find('.galleryCarousel-cycle');
				settings.$carousel = $elem.find('.carousel-wrapper');
				$('.galleryCarousel ul li').each(function(){
					imageItem = '<li id="carousel-item-' + index + '"><div class="galleryCarousel-images-caption"><div class="images-caption-content"><h3>' + $(this).find('a img').attr('title') + '</h3><p>' + $(this).find('a p').html() + '</p></div><div class="images-caption-trans">&nbsp;</div></div><img src="' + $(this).find('a').attr('href') + '" title="' + $(this).find('a img').attr('title') + '" alt="' + $(this).find('a img').attr('title') + '" /></li>';
					carouselItem = '<li><a class="carousel-item-link" href="#carousel-item-' + index + '" ><img src="' + $(this).find('a img').attr('src') + '" title="view image 1" alt="view image ' + index + '" /></a><span class="scroller-overLay"></span></li>';
					settings.$imageWrapper.append(imageItem);
					settings.$carousel.find('.galleryCarousel-scroller').append(carouselItem);
					index += 1;
				});
				$elem.find('> ul').remove();
			},
			initialiseGallery = function(settings){
			
				var $self = $(this);
				buildImageGallery($self, settings);
				$self.addClass(GAL_WRAPPER_CLASS);

				//assign initial variables
				
				
				settings.$currentSlide           = settings.$imageWrapper.children('li:first-child');
				settings.$carouselItem           = $self.find('.jcarousel-item a');
				settings.totalSlides             = (settings.$imageWrapper.children().size() - 1); //-1 to account for the zero index
				settings.$carouselScroller       = $self.find('.galleryCarousel-scroller');
				settings.$galleryNextLink        = $self.find('.gallery-next-image');
				settings.$galleryPrevLink        = $self.find('.gallery-prev-image');
				

				$self.data(SETTINGS_KEY, settings);

				
				setPositioning($self, settings);
				initialiseCarousel(settings.$carousel, settings);
				initialiseCycle($self, settings.$imageWrapper, settings);
				initialiseInteractions($self);
			};
			
			
            initialiseGallery.call(this, settings);
        });
    }; 
	
} (jQuery));
