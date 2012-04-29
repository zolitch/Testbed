/**
 * Main
 * ====
 * This is the main js initialiser for the page
 * it is triggered by the data-main attribute on the
 * require script tag.
 * <script data-main="/js/main" src="/lib/require.js"></script>
 * for more information see <http://requirejs.org>
*/
/*jslint browser: true, vars: true, white: true, forin: true, nomen: true */
/*global define,require,_ga */
(function(){
    'use strict';

    var options = { 
        paths: { 
            jquery: '../lib/jquery-core',
            lib: '../lib', 
            'jquery-plugin': '../lib/jquery-plugins' 
        } 
    }
    ;
    require(options, 
            [ 
                'jquery/core' 
            ], 
            function($) {

                var $window = $(window)
                ,   $body               = $('body')
                ,   windowWidth  = $window.width()
                ;

                // load some functionality after page has initialised
                $window.load(function(){
					
					//Need a better way of implementing if it is needed
					$('.nav-parent').hover(function() {
						$(this).children('div').stop('true','true').fadeIn('fast');
					}, function() {
						$(this).children('div').stop('true','true').fadeOut('fast');
					});
                    // _ga.trackSocial(); include this if you also include lib/socialtracking.js
                });


            });
}());

