var $ = require('jquery');
var uiManager = require('./uiManager');

$(document).ready(function() {

	$(window).scroll(function(){
		uiManager.fixHeader();
		uiManager.showScrollUp();
  	});

	$('#menu-toggle').click(function() {
		uiManager.toggleMobileMenu();
	});

	$('#scrollUp').click(function(){
		uiManager.scrollUp();
	});

});
