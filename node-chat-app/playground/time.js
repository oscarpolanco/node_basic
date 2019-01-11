const moment = require('moment');

const date = new Date();
console.log(date.getMonth());

const date2 = moment();
console.log(date2.format('MMM'));
console.log(date2.format('MMM YYYY'));
console.log(date2.format('MMM Do, YYYY'));

date2.add(100, 'year');
console.log(date2.format('MMM Do, YYYY'));

date2.add(100, 'year').subtract(9, 'months');
console.log(date2.format('MMM Do, YYYY'));

// 10:35 am
// 6:01 am
const hour = moment();
console.log(hour.format('h:mm a'));
