/**
* @author Stephen Zsolnai
* @url ""
*/
/*jslint browser: true, vars: true, white: false, forin: true, nomen: true */
/*global window,console,jQuery */

(function($) {
    var DEFAULTS = {
            parallaxAssetClass: 'parallaxAsset',
            parralaxItemAssetClass: 'parallaxItemAsset'

        },
        $window = $(window),
        currentScrollTop = $(window).scrollTop(),
        $body = $('body'),
        windowHeight = $window.outerHeight(true),
        centerPage = Math.round(windowHeight/2),
        parallaxWrappers = [],
        $parallaxWrapper;

    $.fn.parralaxify = function(o) {
        var parallaxElem = this,
            settings = $.extend({}, DEFAULTS, o || {});
        return this.each(function() {
            var inView = function(elem){
                var $elem = $(elem),
                    docViewTop = $window.scrollTop(),
                    docViewBottom = docViewTop + windowHeight,
                    //elemHeight = ($elem.outerHeight(true)>windowHeight) ? windowHeight : $elem.outerHeight(true),
                    elemHeight = $elem.outerHeight(true),
                    elemTop = $elem.offset().top,
                    elemBottom = elemTop + elemHeight;
                

                /*
                    If top of element is visible,
                    Or bottom of element is visible,
                    Or top of element above top fold and bottom of element below bottom fold
                */
                return(((elemTop <= docViewBottom)&& (elemTop >= docViewTop)) || ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop))|| ((elemBottom >= docViewBottom) && (elemTop <= docViewTop)));
               
            },
            ParallaxItem = function (elem) {
                // declare variables
                var self = this,
                    $self = $(self),
                    $elem = $(elem);

                this.$relatedAsset = $elem.find('.' + settings.parralaxItemAssetClass);
                this.isInView = inView(elem);
                this.domElement = elem;
            },
            ParallaxWrapper = function (elem) {
                // declare variables
                var self = this,
                    $self = $(self),
                    $elem = $(elem);

                this.$relatedAsset = $elem.find('.' + settings.parallaxAssetClass);
                this.isInView = inView(elem);
                this.domElement = elem;
                $elem.find('ul>li').each(function () {
                    self.parallaxItems.push(new ParallaxItem(this));
                });
            };
            ParallaxItem.prototype = {
                $relatedAsset: null,
                domElement:null,
                isInView:false,
                positionAboveFold: function(){
                    
                },
                positionBelowFold: function(){
                    
                },
                attachScroll: function(speed){
                    
                },
                positionAsset: function () {
                    if(this.isInView){
                        
                    }
                }
            };
            ParallaxWrapper.prototype = {
                parallaxItems: [],
                domElement:null,
                $relatedAsset: null,
                isInView:false
            };
            
            var positionAsset = function($elem){
                var scrollTop = $window.scrollTop(),
                    elemFromTop = $elem.offset().top,
                    multiple = $elem.data(speed);
            },
            animateAsset = function($elem, dir, value){
                var scrollTop = $window.scrollTop(),
                    elemFromTop = $elem.offset().top,
                    multiple = $elem.data('speed'),
                    currentTop = $elem.position().top;

                console.log('currentScrollTop: ' + currentScrollTop);
                console.log('scrollTop: ' + scrollTop);
                console.log('currentTop: ' + currentTop);
                console.log('value: ' + value);
                $elem.css({"top":currentTop + value});
            },
            checkPositions = function(){
                var i,
                    dir = (currentScrollTop>$window.scrollTop())? 'DOWN':'UP',
                    value = currentScrollTop - $window.scrollTop();
                for (i = 0; i < parallaxWrappers.length; i+=1) {
                    parallaxWrappers[i]
                    parallaxWrappers[i].isInView = inView(parallaxWrappers[i].domElement);
                    if(parallaxWrappers[i].isInView){
                        animateAsset(parallaxWrappers[i].$relatedAsset, dir, value);
                    }
                };
                currentScrollTop = $window.scrollTop();
            },
            attachHandlers = function(){
                $(window).scroll(function (e) { 
                    checkPositions();
                });
            },
            init = function(elem){
                parallaxWrappers.push(new ParallaxWrapper(elem));
                
                attachHandlers();
            };
            init(parallaxElem);
        });
    };

})(jQuery);