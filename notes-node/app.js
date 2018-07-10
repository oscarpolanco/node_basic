console.log('Staring app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
// Array of arrguments of node
console.log('Process', process.argv);
console.log('Yargs', argv);

// const command = process.argv[2];
const command = argv._[0];
console.log('Command: ', command);

if (command === 'add') {
var note = notes.addNote(argv.title, argv.body);
if (note) {
  console.log("Note created");
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
} else {
  console.log("Note title already taken");
}
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  notes.removeNote(argv.title);
} else {
  console.log('Command not recognized');
}
