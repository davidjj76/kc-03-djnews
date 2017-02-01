var $ = require('jquery');

module.exports = {

    menuMobileShown: false,
    headerFixed: false,
    searchShown: false,

    fixHeader: function() {
        var height = $('.header-top').height();
        if ($(window).scrollTop() > height) {
            $('.header-bottom').addClass('fixed');
            this.headerFixed = true;
        } else {
            $('.header-bottom').removeClass('fixed');
            this.headerFixed = false;
        }
    },

    toggleMobileMenu: function() {
        if (this.menuMobileShown) {
            $('#menu-list').removeClass();
            $('#menu-toggle-icon').removeClass('fa-times').addClass('fa-bars');
            this.menuMobileShown = false;
        } else {
            $('#menu-list').removeClass().addClass('menu-mobile-shown');
            $('#menu-toggle-icon').removeClass('fa-bars').addClass('fa-times');
            this.menuMobileShown = true;
        }
    },

    toggleSearch: function() {
        if (this.searchShown) {
            $('.search-area').fadeOut();
            this.searchShown = false;
        } else {
            $('.search-area').fadeIn();
            $('.search-area input').focus();
            this.searchShown = true;
        }
    },

    showScrollUp: function() {
        if (this.headerFixed) {
            $('#scrollUp').fadeIn();
        } else {
            $('#scrollUp').fadeOut();
        }
    },

    scrollUp: function() {
        $('body, html').animate({scrollTop : 0}, 800);
    }

}
