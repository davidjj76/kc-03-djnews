var $ = require('jquery');
var uiManager = require('./uiManager');
var likesManager = require('./likesManager');
var datesManager = require('./datesManager');

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

	setInterval(function() {
		datesManager.loadDates($('time.article-date'));
	}, 1000);

});
