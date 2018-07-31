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

app.listen(3000);
module.exports.app = app;
