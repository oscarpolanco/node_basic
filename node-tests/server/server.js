const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.get('/error', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'Todo App v1.0'
  });
});

// GET /users
// Give users a name prop and age prop
app.get('/users', (req, res) => {
  res.send([{
    name: 'Test',
    age: 20
  },
  {
    name: 'Test2',
    age: 21
  },
  {
    name: 'Test3',
    age: 23
  }]);
});

app.listen(3000);
module.exports.app = app;
