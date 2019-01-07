const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit from Admin text Welcome to the chat app
  socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newUserJoin', generateMessage('Admin', 'New user join'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //     text: newMessage.text,
    //     createAt: new Date().getTime()
    // })
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
