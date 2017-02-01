var $ = require('jquery');
var uiManager = require('./uiManager');
var likesManager = require('./likesManager');
var datesManager = require('./datesManager');

$(document).ready(function() {

    $(window).scroll(function() {
        uiManager.fixHeader();
        uiManager.showScrollUp();
    });

    $('#menu-toggle').click(function() {
        uiManager.toggleMobileMenu();
    });

    $('.search-toggle').click(function() {
        uiManager.toggleSearch();
    });

    $('.search-close').click(function() {
        uiManager.toggleSearch();
    });

    $('#scrollUp').click(function() {
        uiManager.scrollUp();
    });

    $('.button-like').click(function() {
        likesManager.addLike(this);
    });

    likesManager.loadLikes($('.button-like'));

    setInterval(function() {
        datesManager.loadDates($('time.article-date'));
    }, 1000);

   	// TODO
    $(window).scroll(function() {
        $('.hideme').each(function(i) {
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > objectBottom) {
                $(this).animate({ 'opacity': '1', 'margin-left': 0 }, 500);
            }
        });
    });

});
