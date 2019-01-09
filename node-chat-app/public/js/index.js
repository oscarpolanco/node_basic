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
  const formattedTime = moment(message.createAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createAt).format('h:mm a');
  const template = jQuery('#location-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createAt: formattedTime
  });
  jQuery('#messages').append(html);
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
