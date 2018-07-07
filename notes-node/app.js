console.log('Staring app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes.js');

// Array of arrguments of node
console.log(process.argv);
const command = process.argv[2];
console.log('Command: ', command);

if (command === 'add') {
  console.log('Adding new note');
} else if (command === 'list') {
  console.log('Listing all note');
} else if (command === 'read') {
  console.log('Fetching note');
} else if (command === 'remove') {
  console.log('Removing note');
} else {
  console.log('Command not recognized');
}
