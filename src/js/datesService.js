var moment = require('moment');
var es = require('moment/locale/es');
moment.locale('es');

function pluralize(amount) {
	return (amount == 1) ? "" : "s";
}

function timeAgo(amount, unit) {
	amount = Math.floor(amount);
	return "hace " + amount + " " + unit + pluralize(amount);
}

module.exports = {

    formatDate: function(date, succesCallback, errorCallback) {
        try {
        	var formatedDate = '';
        	var now = moment();
        	var momentDate = moment(date);
        	var dateDiff = now.diff(momentDate, 'seconds', true);
        	if (dateDiff < 60) {
        		formatedDate = timeAgo(dateDiff, 'segundo');
        	} else {
        		dateDiff = now.diff(momentDate, 'minutes', true);
        		if (dateDiff < 60) {
        		formatedDate = timeAgo(dateDiff, 'minuto');
        		} else {
        			dateDiff = now.diff(momentDate, 'hours', true);
        			if (dateDiff < 24) {
		        		formatedDate = timeAgo(dateDiff, 'hora');
        			} else {
	        			dateDiff = now.diff(momentDate, 'days', true);
	        			if (dateDiff < 7) {
			        		formatedDate = moment(date).format('dddd');
	        			} else {
	        				formatedDate = moment(date).format('LL');
	        			}
        			}
        		}
        	}
            succesCallback(formatedDate);
        }
        catch(error) {
            errorCallback(error);
        }
    },
};
