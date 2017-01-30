var moment = require('moment');
var es = require('moment/locale/es');

console.log(moment());
moment.locale('es');
console.log(moment("2017-01-30 00:41:00").fromNow());
console.log(moment("2017-01-30 00:40:00").fromNow());
console.log(moment("2017-01-30 00:35:00").fromNow());
console.log(moment("2017-01-30 00:00:00").fromNow());
console.log(moment("2017-01-29 23:00:00").fromNow());
console.log(moment("2017-01-29 20:00:00").fromNow());
console.log(moment("2017-01-29 16:00:00").fromNow());
console.log(moment("2017-01-29 06:00:00").fromNow());
console.log(moment("2017-01-29 01:00:00").fromNow());
console.log(moment("2017-01-27 01:00:00").fromNow());
console.log(moment("2017-01-20 01:00:00"));

console.log(moment("2017-01-27 01:00:00").format("dddd"));
console.log(moment("2017-01-27 01:00:00").format("LL"));

// diferencias
var now = moment();
var b = moment("2017-01-30 01:00:00");
var c = moment("2017-01-30 00:40:00");
var d = moment("2017-01-29 20:40:00");
var e = moment("2017-01-23 01:00:00");
console.log(now.diff(b, 'seconds', true));
console.log(now.diff(c, 'minutes', true));
console.log(now.diff(d, 'hours', true));
console.log(now.diff(e, 'days', true));
