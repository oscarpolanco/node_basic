console.log('Staring app.');

const fs = require('fs');
const os = require('os');

let user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username}!!!`, function(err) {
  if (err) {
    console.log('Unable to write to file');
  }
});
