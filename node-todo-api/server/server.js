require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET/todos/1234
app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  // valid id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
  }

  // findById
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    // if not todo - send back 404 with empty body
    if (!todo) {
      return res.status(404).send();
    }
    // success
    // if todo - send it back
    res.send({todo});
  }).catch((e) => {
    // error
    // 400 - send empty body back
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    // get the id
    const id = req.params.id;

    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    // remove todo by id
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });

    // success
    // if not doc, send 404
    if (!todo) {
      return res.status(404).send();
    }
    // if doc, send doc back with 200
    res.send({todo});
  } catch(e) {
    res.status(400).send();
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // findOneAndUpdate
  Todo.findOneAndUpdate(
    {
      _id:id,
      _creator: req.user._id
    },
    {$set: body},
    {new: true}
  ).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
 app.post('/users', async (req, res) => {
   try {
     const body = _.pick(req.body, ['email', 'password']);
     const user = new User(body);
     await user.save();
     const token = await user.generateAuthToken();
     res.header('x-auth', token).send(user);
   } catch (e) {
     res.status(400).send(e);
   }
 });

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
