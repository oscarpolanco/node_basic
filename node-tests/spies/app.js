var deb = require('./db.js');

module.exports.handleSingup = (email, password) => {
  // Check if email already exist
  // Save the user to the database
  db.saveUser({email, password});
  // Send the welcome email
}
