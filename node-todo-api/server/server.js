const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } );

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    require: true,
    minlenght: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo2 = new Todo({
  text: ' Edit this video '
});

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});

newTodo2.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});

// User
// email - require it - trim it - set type - set ming length of 1
const User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    trim: true,
    minlenght: 1
  }
});

const newUser = new User({
  email: ' hey@test.com '
});

newUser.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});
