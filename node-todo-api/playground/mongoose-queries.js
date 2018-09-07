const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const todoId = '5b7dea0fbd0e4f342c2b0b0e';
const userId = '5b74a693c2374f38284b861a';

if (!ObjectID.isValid(todoId) && !ObjectID.isValid(userId)) {
  console.log('ID not valid');
}

Todo.find({
  _id: todoId
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: todoId
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(todoId).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));

// User.findById
User.find({
  _id: userId
}).then((users) => {
  console.log('Users', users);
});

User.findOne({
  _id: userId
}).then((user) => {
  console.log('Users', user);
});

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('User by id', user);
}).catch((e) => console.log(e));
