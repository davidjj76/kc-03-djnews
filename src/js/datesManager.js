var datesService = require('./datesService');
var $ = require('jquery');

module.exports = {

	loadDates: function() {
		var datesElements = $('time.article-date');
		for (var i = 0; i < datesElements.length; i++) {
			var self = this;
			var dateElement = datesElements[i];
			var date = $(dateElement).attr('datetime');
			datesService.formatDate(date, 
				function(formatedDate) {
					self.renderDate(dateElement, formatedDate);
				}, 
				function(error) {
				}
			)
		}
	},

	renderDate: function (dateElement, date) {
		var previousDate = $(dateElement).html();
		if (previousDate != date) {
			$(dateElement).html(date);		
		}
	}

}
