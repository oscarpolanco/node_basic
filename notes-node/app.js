console.log('Staring app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

console.log(notes.add(1, 2));

// let user = os.userInfo();
//
// fs.appendFile('greetings.txt', `Hello ${user.username}!!! You are ${notes.age}.`, function(err) {
//   if (err) {
//     console.log('Unable to write to file');
//   }
// });
