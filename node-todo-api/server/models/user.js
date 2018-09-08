const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    trim: true,
    minlenght: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{Value} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlenght: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

module.exports = {User};
