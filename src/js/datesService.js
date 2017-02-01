var moment = require('moment');
var es = require('moment/locale/es');
moment.locale('es');

module.exports = {

    formatDate: function(date, succesCallback, errorCallback) {
        var self = this;
        try {
        	var formatedDate = '';
        	var now = moment();
        	var momentDate = moment(date);
        	var dateDiff = now.diff(momentDate, 'seconds', true);
        	if (dateDiff < 60) {
        		data = self.timeAgo(dateDiff, 'segundo');
        	} else {
        		dateDiff = now.diff(momentDate, 'minutes', true);
        		if (dateDiff < 60) {
            		formatedDate = self.timeAgo(dateDiff, 'minuto');
        		} else {
        			dateDiff = now.diff(momentDate, 'hours', true);
        			if (dateDiff < 24) {
		        		formatedDate = self.timeAgo(dateDiff, 'hora');
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
            console.error("datesService: ", error);
        }
    },

    pluralize: function(amount) {
        return (amount == 1) ? "" : "s";
    },

    timeAgo: function(amount, unit) {
        var self = this;
        amount = Math.floor(amount);
        return "hace " + amount + " " + unit + this.pluralize(amount);
    }

};
