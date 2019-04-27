const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 1998;
var app = express();
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new connection');

	// socket.emit from Admin text welcome to the chat app
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'welcome to the chat app',
		createAd: new Date().getTime()
	});
	// socket.broadcast.emit from Admin text New User joined
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createAd: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('create Message', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createAd: new Date().getTime()
		});

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createAd: new Date().getTime()
		// });
	});
});

server.listen(1998, () => {
	console.log(`connect to port ${port}`);
});