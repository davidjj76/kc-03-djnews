var $ = require('jquery');
var commentsManager = require('./commentsManager');

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
