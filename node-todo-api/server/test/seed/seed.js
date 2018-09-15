const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const UserOneId = new ObjectID();
const UserTwoId = new ObjectID();

const users = [{
  _id: UserOneId,
  email: 'foo@test.com',
  password: 'userOnePass',
  token: [{
    access: 'auth',
    token: jwt.sign({_id: UserOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: UserTwoId,
  email: 'foo2@test.com',
  password: 'UserTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
