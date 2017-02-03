var likesService = require('./likesService');
var $ = require('jquery');

module.exports = {

	loadLikes: function() {
		var self = this;
		var buttonsLike = $('.button-like');
		for (var i = 0; i < buttonsLike.length; i++) {
			var buttonLike = buttonsLike[i];
			var articleId = $(buttonLike).data('articleId');
			likesService.get(articleId, 
				function(likes) {
					self.renderLikes(buttonLike, likes);
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

	renderLikes: function(buttonLike, likes) {
		var likesText = likes == 0 ? '' : '(' + likes + ')';
		$(buttonLike).find('span').text(likesText);
	}

}
