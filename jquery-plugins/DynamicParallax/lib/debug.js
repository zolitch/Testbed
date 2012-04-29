/**
 * Basic debug AMD module 
 */
/*jslint browser: true, vars: true, white: true, forin: true */
/*global define, require */
define(function(){
    'use strict';

    var history = [];

    return {
        // usage: log('inside coolFunc',this,arguments);
        // paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
        log: function () {
            history.push(arguments);
            if (window.console) {
                window.console.log({ log: Array.prototype.slice.call(arguments) });
            }
        },
        error: function () {
            history.push(arguments);
            if (window.console) {
                window.console.error({ log: Array.prototype.slice.call(arguments) });
            }
        }
    };
});

