/*jslint browser: true, nomen: true, white: true, sloppy: true, vars: true */
/*global window, jQuery, _ga, _gaq, FB, twttr, unescape, pageTracker */

// Copyright 2011 Google Inc. All Rights Reserved.

/**
 * @fileoverview A simple script to automatically track Facebook and Twitter
 * buttons using Google Analytics social tracking feature.
 * @author api.nickm@google.com (Nick Mihailovski)
 */


/**
 * Namespace.
 * @type {Object}.
 */
var _ga = _ga || {};


/**
 * Ensure global _gaq Google Anlaytics queue has be initialized.
 * @type {Array}
 */
var _gaq = _gaq || [];


_ga.trackSocialEvent = function(platform, action, url) {
    if (typeof(pageTracker) === "object") {
        pageTracker._trackEvent(platform, action, url);
    }
};

/**
 * Helper method to track social features. This assumes all the social
 * scripts / apis are loaded synchronously. If they are loaded async,
 * you might need to add the nextwork specific tracking call to the
 * a callback once the network's script has loaded.
 * @param {string} opt_pageUrl An optional URL to associate the social
 *     tracking with a particular page.
 * @param {string} opt_trackerName An optional name for the tracker object.
 */
_ga.trackSocial = function(opt_pageUrl) {
  _ga.trackFacebook(opt_pageUrl);
  _ga.trackTwitter(opt_pageUrl);
};


/**
 * Tracks Facebook likes, unlikes and sends by suscribing to the Facebook
 * JSAPI event model. Note: This will not track facebook buttons using the
 * iFrame method.
 * @param {string} opt_pageUrl An optional URL to associate the social
 *     tracking with a particular page.
 */
_ga.trackFacebook = function(opt_pageUrl) {
  try {
    if (FB && FB.Event && FB.Event.subscribe) {
      FB.Event.subscribe('edge.create', function(targetUrl) {
        _ga.trackSocialEvent('facebook', 'recommend', targetUrl);
        // _gaq.push(['_trackSocial', 'facebook', 'recommend', targetUrl, opt_pageUrl]);
      });
      FB.Event.subscribe('edge.remove', function(targetUrl) {
        _ga.trackSocialEvent('facebook', 'unlike', targetUrl);
        // _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl, opt_pageUrl]);
      });
      FB.Event.subscribe('message.send', function(targetUrl) {
        _ga.trackSocialEvent('facebook', 'send', targetUrl);
        // _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl, opt_pageUrl]);
      });
    }
  } catch (e) {}
};

/**
 * Tracks everytime a user clicks on a tweet button from Twitter.
 * This subscribes to the Twitter JS API event mechanism to listen for
 * clicks coming from this page. Details here:
 * http://dev.twitter.com/pages/intents-events#click
 * This method should be called once the twitter API has loaded.
 * @param {string} opt_pageUrl An optional URL to associate the social
 *     tracking with a particular page.
 */
_ga.trackTwitter = function(opt_pageUrl) {
  try {
    if (twttr && twttr.events && twttr.events.bind) {
      twttr.events.bind('tweet', function(event) {
        if (event) {
          var targetUrl; // Default value is undefined.
          if (event.target && event.target.nodeName === 'IFRAME') {
            targetUrl = _ga.extractParamFromUri_(event.target.src, 'url');
          }
          _ga.trackSocialEvent('twitter', 'tweet', targetUrl);
          // _gaq.push(['_trackSocial', 'twitter', 'tweet', targetUrl, opt_pageUrl]);
        }
      });
    }
  } catch (e) {}
};


/**
 * Extracts a query parameter value from a URI.
 * @param {string} uri The URI from which to extract the parameter.
 * @param {string} paramName The name of the query paramater to extract.
 * @return {string} The un-encoded value of the query paramater. underfined
 *     if there is no URI parameter.
 * @private
 */
_ga.extractParamFromUri_ = function(uri, paramName) {
  if (!uri) {
    return;
  }
  var i;
  uri = uri.split('#')[1];  // Remove anchor.
  var query = decodeURI(uri),
      param;
  // Find url param.
  paramName += '=';
  var params = query.split('&');
  for (i = 0, param; param = params[i]; i+=1) {
    if (param.indexOf(paramName) === 0) {
      return unescape(param.split('=')[1]);
    }
  }
  return;
};



