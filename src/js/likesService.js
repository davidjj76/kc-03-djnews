var likesStorageName = "article-likes-";

module.exports = {

    get: function(articleId, succesCallback, errorCallback) {
        var likes = localStorage.getItem(likesStorageName + articleId);
        if (likes != null) {
            succesCallback(likes);
        } else {
            errorCallback();
        }
    },

    add: function(articleId, succesCallback, errorCallback) {
        var likes = localStorage.getItem(likesStorageName + articleId);
        if (likes != null) {
            likes = parseInt(likes) + 1;
        } else {
            likes = 1;
        }
        localStorage.setItem(likesStorageName + articleId, likes);
        this.get(articleId, succesCallback, errorCallback);
    }

};
