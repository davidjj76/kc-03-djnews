var $ = require('jquery');
var uiManager = require('./uiManager');
var likesManager = require('./likesManager');
var datesManager = require('./datesManager');
var commentsManager = require('./commentsManager');

$(document).ready(function() {

    $(window).scroll(function() {
        uiManager.fixHeader();
        uiManager.showScrollUp();
    });

    $('#menu-toggle').click(function() {
        uiManager.toggleMobileMenu();
    });

    $('.search-toggle, .search-close').click(function() {
        uiManager.toggleSearch();
    });

    $('#scrollUp').click(function() {
        uiManager.scrollUp();
    });

    $('.button-like').click(function() {
        likesManager.addLike(this);
    });

    likesManager.loadLikes($('.button-like'));
    commentsManager.loadComments($('.link-comments'));

    setInterval(function() {
        datesManager.loadDates($('time.article-date'));
    }, 1000);

   	// TODO
    $(window).scroll(function() {
        $('.comment').each(function() {
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > objectBottom) {
                var animation = { 'opacity': '1', 'margin-left': '0' };
                $(this).animate(animation, 500);
            }
        });
    });

    $('.new-comment-form').on('submit', function(event) {
        commentsManager.addComment(this);
        event.preventDefault();
    });

});
