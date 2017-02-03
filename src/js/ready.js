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

    likesManager.loadLikes();
    commentsManager.loadComments();

    setInterval(function() {
        datesManager.loadDates();
    }, 1000);

    $(window).scroll(function() {
        commentsManager.scrollComments();
    });

    $('#new-comment-form').on('submit', function(event) {
        commentsManager.addComment(this);
        event.preventDefault();
    });

});
