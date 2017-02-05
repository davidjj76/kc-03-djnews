var $ = require('jquery');
var commentsManager = require('./commentsManager');
var MAX_WORDS = 120;

$('#new-comment-form').on('submit', function() {

    var inputName = $(this).find('input#name')[0];
    var inputEmail = $(this).find('input#email')[0];
    var inputMessage = $(this).find('textarea#message')[0];

    resetError(inputName);
    resetError(inputEmail);
    resetError(inputMessage);

    if (!validateText(inputName.value)) {
        showError(inputName, "Introduce tu nombre y apellidos");
    } else if (!validateEmail(inputEmail.value)) {
        showError(inputEmail, "Introduce un email válido");
    } else if (!validateMessage(inputMessage.value)) {
        showError(inputMessage, "Introduce un mensaje, pero no te pases de " + MAX_WORDS + " palabras");
    } else {
        $(this).find('button').text('ENVIANDO...').attr('disabled', true);
        commentsManager.addComment(this);
    }

    return false;

});

function resetError(input) {
    $(input).parent().removeClass().addClass('form-wrapper');    
}

function showError(input, message) {
    input.focus();
    $(input).parent().find('span').text(message);
    $(input).parent().removeClass().addClass("form-wrapper error");    
}

function validateText(value) {
    return !(value == null || value.length == 0 || /^\s+$/.test(value));
}

function validateEmail(value) {
    // Expresion regular sencilla para el email
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
}

function validateMessage(value) {
    return validateText(value) && countWords(value) <= MAX_WORDS;
}

function countWords(text) {
    // Excluir espacio en blanco inicial y final
    text = text.replace(/(^\s*)|(\s*$)/gi, '');
    // Convertir dos espacios consecutivos en uno
    text = text.replace(/[ ]{2,}/gi, ' ');
    // Excluir espacio al inicio de nueva linea
    text = text.replace(/\n /, '\n');
    // Devolver el numero de palabras
    return text.split(' ').length;
}
