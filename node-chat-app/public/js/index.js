const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('welcomeMessage', function(message) {
    console.log('welcomeMessage', message);
  });

  socket.on('newUserJoin', function(message) {
    console.log('newUserJoin', message);
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('Got it', data);
});
