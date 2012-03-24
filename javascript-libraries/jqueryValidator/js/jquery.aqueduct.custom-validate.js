/**
* @Stephen Zsolnai
* @Description: 	An extension to the jQuery validator (http://bassistance.de/jquery-plugins/jquery-plugin-validation/)
							jquery.validate
*/

(function($) {

    $.fn.aquevalidate = function() {
       
	   var self = $(this);

        $.extend(jQuery.validator.messages, {
			required: "<span>This is a required field</span>",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date (ISO).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			accept: "Please enter a value with a valid extension.",
			maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
			minlength: jQuery.validator.format("Please enter at least {0} characters."),
			rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
			range: jQuery.validator.format("Please enter a value between {0} and {1}."),
			max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
			min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
		});
		$.extend(jQuery.validator.defaults, {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "label-error-msg",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		});
		$(this).validate();
    };
})(jQuery);