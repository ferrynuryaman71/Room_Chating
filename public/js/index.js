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

	jQuery('#message-form').on('submit', function (e) {
		e.preventDefault();

		socket.emit('createMessage', {
			from: 'User',
			text: jQuery('[name=message]').val()
		},	function () {

		});
	});
