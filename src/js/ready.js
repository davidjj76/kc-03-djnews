var $ = require('jquery');
var uiManager = require('./uiManager');
var likesManager = require('./likesManager');
var datesManager = require('./datesManager');
var commentsManager = require('./commentsManager');

$(document).ready(function() {

    // Control del scroll para fijar la cabecera y mostrar el Scroll Up
    $(window).scroll(function() {
        uiManager.fixHeader();
        uiManager.showScrollUp();
        commentsManager.scrollComments();
    });

    // Control del menú en mobile
    $('#menu-toggle').click(function() {
        uiManager.toggleMobileMenu();
    });

    // Control del formulario de búsqueda
    $('.search-toggle, .search-close').click(function() {
        uiManager.toggleSearch();
    });

    // Control del Scroll Up
    $('#scrollUp').click(function() {
        uiManager.scrollUp();
    });

    // Crear un like para un artículo
    $('.button-like').click(function() {
        likesManager.addLike(this);
    });

    // Carga de los likes de la página
    likesManager.loadLikes();

    // Actualización dinámica de fechas
    setInterval(function() {
        datesManager.loadDates();
    }, 1000);

    // Al cargar simulamos un scroll para cargar los comentarios si caemos en la zona de comentarios
    commentsManager.scrollComments();

});
