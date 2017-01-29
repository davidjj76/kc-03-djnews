var $ = require('jquery');
var uiManager = require('./uiManager');

$(document).ready(function() {

	$('#menu-toggle').click(function() {
		uiManager.toggleMobileMenu();
	});

});
