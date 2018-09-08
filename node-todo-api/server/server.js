require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET/todos/1234
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  // valid id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
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

app.delete('/todos/:id', (req, res) => {
  // get the id
  const id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    // success
    // if not doc, send 404
    if (!todo) {
      return res.status(404).send();
    }
    // if doc, send doc back with 200
    res.send({todo});
  }).catch((e) => {
    // error
    // 400 with an empty body
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
 app.post('/users', (req, res) => {
   const body = _.pick(req.body, ['email', 'password']);
   const user = new User(body);

   user.save().then((user) => {
     res.send(user);
   }).catch((e) => {
     res.status(400).send(e);
   });
 });

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
