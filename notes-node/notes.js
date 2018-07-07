console.log('Starting notes.js');

var addNote = (title, body) => {
  console.log('Adding note', title, body);
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  console.log('Geting this note', title);
};

var removeNote = (title) => {
  console.log('Removing this note', title);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
