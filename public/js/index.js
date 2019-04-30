	var socket = io();

	socket.on('connect', () => {
		console.log('connected');
	});

	socket.on('disconnect', () => {
		console.log('disconnect')
	});

	socket.on('newMessage', (message) => {
		console.log('new Message', message);
		var li = jQuery('<li></li>');
		li.text(`${message.from}: ${message.text}`);

		jQuery('#messages').append(li);
	});

	socket.on('newLocationMessage', (message) => {
		var li = jQuery('<li></li>'); 
		var a = jQuery('<a target="_blank">My Location</a>');

		li.text(`${message.from}:`);
		a.attr('href', message.url);
		li.append(a);
		jQuery('#messages').append(li);

	})

	jQuery('#message-form').on('submit', function (e) {
		e.preventDefault();

		var messsageTextbox = jQuery('[name=message]');

		socket.emit('createMessage', {
			from: 'User',
			text: messsageTextbox.val()
		},	function () {
			messsageTextBox.val();
		});
	});

	var locationButton = jQuery('#send-location');
	locationButton.on('click', function () {
		if (!navigator.geolocation) {
			return alert('Geolocation not suppurt your browser');
		}

		locationButton.attr('disabled', 'disabled').text('send location..');

		navigator.geolocation.getCurrentPosition(function (position) {
			locationButton.removeAttr('disabled').text('send location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});

		}, function () {
			locationButton.removeAttr('disabled').text('send location');
			alert('enable to fetch location');
		})
	})