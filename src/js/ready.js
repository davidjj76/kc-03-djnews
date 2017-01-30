var $ = require('jquery');
var uiManager = require('./uiManager');
var likesManager = require('./likesManager');
var datesService = require('./datesService');

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

	$('.button-like').click(function(){
		likesManager.addLike(this);
	});

	likesManager.loadLikes($('.button-like'));

});
