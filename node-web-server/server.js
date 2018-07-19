const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  })
});
app.listen(3000);
