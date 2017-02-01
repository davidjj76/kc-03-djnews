var commentsService = require('./commentsService');
var $ = require('jquery');

module.exports = {

	loadComments: function(commentsLinks) {
		var self = this;
		commentsService.list(
			function(comments) {
				self.renderComments(comments, commentsLinks);
			}, 
			function(error) {
			}
		)
	},

	addComment: function(form) {
		var self = this;
		var comment = {
			name: form.name.value,
			email: form.email.value,
			message: form.message.value,
		}
		commentsService.save(comment, 
			function(comment) {
				var position = $('.comment').length;
				$('#article-comments').append(self.renderComment(comment, position));
				var animation = { 'opacity': '1', 'margin-left': '0' };
                $('.comment:last').animate(animation, 500);
			}, 
			function(error) {
			}
		)
	},

	renderComments: function(comments, commentsLinks) {
		var self = this;
		// comments in index.html
		$(commentsLinks).find('span').text('(' + comments.length + ')');
		// comments in detail.html
		comments.sort(function(a, b) {
			return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
		});
		var html = '';
		for (var i = 0; i < comments.length; i++) {
			html += this.renderComment(comments[i], i);
		}
		$('#article-comments').html(html);
	},

	renderComment: function(comment, position) {
		var html = '';
		var positionClass = (position % 2 == 0) ? 'left' : 'right';
		html += '<div class="comment ' + positionClass + '">';
		html += comment.id + '-' + comment.name + '-' + comment.email + '-' + comment.message;
		html += '</div>';
		return html;
	},
}
