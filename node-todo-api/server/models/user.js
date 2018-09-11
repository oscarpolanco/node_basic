const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function () {
  const user = this;
  const UserObject = user.toObject();

  return _.pick(UserObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
