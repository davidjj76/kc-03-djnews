var datesService = require('./datesService');
var $ = require('jquery');

function renderDate(element, date) {
	var previousDate = $(element).html();
	if (previousDate != date) {
		$(element).html(date);		
	}
}

module.exports = {

	loadDates: function(elements) {
		for (var i = 0; i < elements.length; i++) {
			var self = this;
			var element = elements[i];
			var date = $(element).attr('datetime');
			datesService.formatDate(date, 
				function(formatedDate) {
					renderDate(element, formatedDate);
				}, 
				function(error) {
					console.error(error);
				}
			)
		}
	},

}
