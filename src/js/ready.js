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
        // Form validation
        $(this).find('input,textarea').each(function() {
            var input = this;
            if (input.checkValidity() == false) {
                alert(input.validationMessage);
                input.focus();
                return false;
            }
        }); 
        event.preventDefault();
        commentsManager.addComment(this);
    });

});
