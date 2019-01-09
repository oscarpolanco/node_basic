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
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  const messgeTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messgeTextbox.val()
  }, function () {
    messgeTextbox.val('');
  });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not suppored by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
