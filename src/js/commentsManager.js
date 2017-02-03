var commentsService = require('./commentsService');
var $ = require('jquery');

module.exports = {

    setCommentsList: function() {
        $('#article-comments').removeClass().addClass('container list');
    },

    setCommentsBlank: function() {
        $('#article-comments').removeClass().addClass('container blank');
    },

    setCommentsError: function() {
        $('#article-comments').removeClass().addClass('container error');
    },

    setCommentsLoading: function() {
        $('#article-comments').removeClass().addClass('container loading');
    },


	loadComments: function() {
		var self = this;
		self.setCommentsLoading();
		commentsService.list(
			function(comments) {
				if (window.location.pathname === '/index.html') {
					$('.link-comments').find('span').text('(' + comments.length + ')');
				} else {
					if(comments.length == 0) {
						self.setCommentsBlank();
					} else {
						self.renderComments(comments);
						self.setCommentsList();
					}
				}
			}, 
			function(error) {
				self.setCommentsError();
			}
		)
	},

	addComment: function(form) {
		var self = this;

		// Comment object
		var comment = {
			name: form.name.value,
			email: form.email.value,
			message: form.message.value,
		}
		commentsService.save(comment, 
			function(comment) {
				var position = $('.comment').length;
				$('.article-comments-list').append(self.renderComment(comment, position));
				self.setCommentsList();
				self.animateComment($('.comment:last'));
				form.reset();
			}, 
			function(error) {
			}
		)
	},

	renderComments: function(comments) {
		var self = this;
		// order comments by id
		comments.sort(function(a, b) {
			return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
		});
		var html = '';
		for (var i = 0; i < comments.length; i++) {
			html += this.renderComment(comments[i], i);
		}
		$('.article-comments-list').html(html);
	},

	renderComment: function(comment, position) {
		var html = '';
		var positionClass = (position % 2 == 0) ? 'left' : 'right';
		html += '<div class="comment ' + positionClass + '">';
		html += '<div class="comment-wrapper">';
		html += '<h6 class="comment-name">' + comment.name + '</h6>';
		html += comment.message;
		html += '<em><span class="comment-email">' + comment.email + '</span></em>';
		html += '</div>';
		html += '</div>';
		return html;
	},

	scrollComments: function() {
		var self = this;
        $('.comment').each(function() {
            var commentBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > commentBottom) {
                self.animateComment(this);
            }
        });
	},

	animateComment: function(comment) { 
		var animation = { 'opacity': '1' };			
		if($(comment).hasClass('left')) {
			animation['margin-left'] = 0;
		} else {
			animation['margin-right'] = 0;
		}
        $(comment).animate(animation, 500);
	}

}
