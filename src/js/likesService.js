var likesStorageName = "article-likes-";

module.exports = {

    get: function(articleId, succesCallback, errorCallback) {
        try {
            var likes = localStorage.getItem(likesStorageName + articleId);
            likes = likes || 0;
            succesCallback(likes);
        }
        catch(error) {
            errorCallback(error);
        }
    },

    add: function(articleId, succesCallback, errorCallback) {
        try {
            var likes = localStorage.getItem(likesStorageName + articleId);
            likes = likes || 0;
            likes = parseInt(likes) + 1;
            localStorage.setItem(likesStorageName + articleId, likes);
            succesCallback(likes);
        }
        catch(error) {
            errorCallback(error);
        }
    }

};
