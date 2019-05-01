	var socket = io();

	socket.on('connect', () => {
		console.log('connected');
	});

	socket.on('disconnect', () => {
		console.log('disconnect')
	});

	socket.on('newMessage', (message) => {
		var formattedTime = moment(message.createdAt).format('dddd, kk:mm');
		var formatTime = moment(message.createdAt).format('dddd, d MMMM YYYY, kk:mm:ss');
			console.log(formatTime);
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template, {
			text: message.text,
			from: message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
	});

	socket.on('newLocationMessage', (message) => {
		var formattedTime = moment(message.createdAt).format('dddd, kk:mm');
		var formatTime = moment(message.createdAt).format('dddd, d MMMM YYYY, kk:mm:ss');
			console.log(formatTime);
		var template = jQuery('#location-message-template').html();
		var html = Mustache.render(template, {
			from: message.from,
			url: message.url,
			createdAt: formattedTime
		})
		jQuery('#messages').append(html);
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