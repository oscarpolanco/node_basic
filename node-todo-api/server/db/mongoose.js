const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODN_URI, { useNewUrlParser: true });

module.exports = {mongoose};
