var $ = require('jquery');

module.exports = {

	menuMobileShown: false,

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
    }

}
