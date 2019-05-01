	var socket = io();
	function scrollToBottom() {
		//selectors
		var messages = jQuery('#messages');
		var newMessage = messages.children('li:last-child')
		//Height
		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessagesHeight = newMessage.prev().innerHeight();

		if (clientHeight + scrollTop + newMessageHeight + lastMessagesHeight  >= scrollHeight) {
			messages.scrollTop(scrollHeight);
		}
	} 


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
		scrollToBottom();
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
		scrollToBottom();
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