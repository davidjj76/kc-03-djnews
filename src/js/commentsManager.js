var commentsService = require('./commentsService');
var $ = require('jquery');

module.exports = {

	commentsLoaded: false,
	loadingComments: false,

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
		console.log("Cargamos comentarios...")
		var self = this;
		self.loadingComments = true;
		self.setCommentsLoading();
		commentsService.list(
			function(comments) {
				if(comments.length == 0) {
					self.setCommentsBlank();
				} else {
					self.renderComments(comments);
					self.setCommentsList();
		            self.scrollComments();
				}
				self.loadingComments = false;
				self.commentsLoaded = true;				
			}, 
			function(error) {
				self.setCommentsError();
				self.loadingComments = false;
				self.commentsLoaded = true;
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
				form.reset();
				$(form).find('button').text('ENVIAR').attr('disabled', false);
				if($('#article-comments').hasClass('error')) {
					// Si el estado era error recargamos todos los comentarios
					// porque no podemos saber si había o no comentarios
					self.loadComments();
				} else {
					// Si el estado era distinto de error cargamos sólo el último
					// En este caso sabemos cuantos comentarios había
					// Aunque en una situación real con varios usuarios no podríamos saberlo
					// Y tendríamos que recargar todos los comentarios
					var position = $('.comment').length;
					$('.article-comments-list').append(self.renderComment(comment, position));
					self.setCommentsList();
					self.animateComment($('.comment:last'));					
				}
			}, 
			function(error) {
				alert('Se ha producido un al enviar el comentario.\n Inténtalo de nuevo, por favor.');
				$(form).find('button').text('ENVIAR').attr('disabled', false);
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
		html += '<div class="comment clearfix">';
		html += '<div class="comment-wrapper ' + positionClass + '"">';
		html += '<h6 class="comment-name">' + comment.name + '</h6>';
		html += comment.message;
		html += '<em><span class="comment-email">' + comment.email + '</span></em>';
		html += '</div>';
		html += '</div>';
		return html;
	},

	scrollComments: function() {
		var self = this;
		var commentsSection = $('#article-comments');

		// Controlamos cuando cargamos los comentarios
		if(commentsSection.length) {
	        var commentsBottom = $(commentsSection).offset().top + $(commentsSection).outerHeight();
	        var scrollBottom = $(window).scrollTop() + $(window).height();
	        if (scrollBottom > commentsBottom && !self.loadingComments && !self.commentsLoaded) {
	            self.loadComments();
	        }
		}

		// Controlamos cuando mostramos cada comentario
        $('.comment').each(function() {
            var commentBottom = $(this).offset().top + $(this).outerHeight() / 2;
            var scrollBottom = $(window).scrollTop() + $(window).height();
            if (scrollBottom > commentBottom) {
                self.animateComment(this);
            }
        });
    },

	animateComment: function(comment) {
		var commentWrapper = $(comment).find('.comment-wrapper');
		if ($(commentWrapper).css('opacity') == 0) {
			var animation = { 'opacity': '1' };			
			if($(commentWrapper).hasClass('left')) {
				animation['margin-left'] = 0;
			} else {
				animation['margin-right'] = 0;
			}
			console.log("Mostramos comentario...", commentWrapper)
	        $(commentWrapper).animate(animation, 500);
		}
	}

}
