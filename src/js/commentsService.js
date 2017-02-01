var $ = require('jquery');

var API_URL = "/api/comments/";

module.exports = {

    // get all comments
    list: function(successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get",
            success: function(comments) {
                successCallback(comments);
            },
            error: function(error) {
                errorCallback(error);
                console.error("commentsService: ", error);
            }
        })
    },

    // get one comment

    // delete a comment

    // save a comment
    save: function(comment, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "post",
            data: comment,
            success: function(comment) {
                successCallback(comment);
            },
            error: function(error) {
                errorCallback(error);
                console.error("SongsServiceError", error);
            }
        });
    }

};
