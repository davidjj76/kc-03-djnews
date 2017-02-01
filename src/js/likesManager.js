var likesService = require('./likesService');
var $ = require('jquery');

module.exports = {

	loadLikes: function(articles) {
		for (var i = 0; i < articles.length; i++) {
			var self = this;
			var article = articles[i];
			articleId = $(article).data('articleId');
			likesService.get(articleId, 
				function(likes) {
					self.renderLikes(article, likes);
				}, 
				function(error) {
				}
			)
		}
	},

	addLike: function(article) {
		var self = this;
		articleId = $(article).data('articleId');
		likesService.add(articleId, 
			function(likes) {
				self.renderLikes(article, likes);
			}, 
			function(error) {
			}
		)
	},

	renderLikes: function(article, likes) {
		var likesText = likes == 0 ? '' : '(' + likes + ')';
		$(article).find('span').text(likesText);
	}

}
