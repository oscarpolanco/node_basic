const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey. This is Andrew'
  })
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('New email', email);
});
