console.log('Staring app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');


console.log(_.isString(true));
console.log(_.isString('Andrew'));

var filteredArray = _.uniq(['O', 1, 'O', 1, 2, 3, 4]);
console.log(filteredArray);
// console.log(notes.add(1, 2));

// let user = os.userInfo();
//
// fs.appendFile('greetings.txt', `Hello ${user.username}!!! You are ${notes.age}.`, function(err) {
//   if (err) {
//     console.log('Unable to write to file');
//   }
// });
