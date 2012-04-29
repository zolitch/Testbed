/**
 * Main
 * ====
 * This is the main js initialiser for the page
 * it is triggered by the data-main attribute on the
 * require script tag.
 * <script data-main="/js/main" src="/lib/require.js"></script>
 * for more information see <http://requirejs.org>
*/
/*jslint browser: true, vars: true, white: false, forin: true, nomen: true */
/*global define,require */
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
                'jquery/core',
                'jquery-plugin/jquery.easing',
                'jquery-plugin/jquery.viewport',
                'jquery-plugin/jquery.appear',
                'jquery-plugin/jquery.parallaxify'
                 
            ], 
            function($) {

                var $window = $(window)
                ,   $body               = $('body')
                ,   windowWidth  = $window.width()
                ;
                var $parallaxElem = $('.parralax');
                if($parallaxElem.length){
                    $parallaxElem.each(function(){
                        $(this).parralaxify();
                    });
                }

            });
}());

