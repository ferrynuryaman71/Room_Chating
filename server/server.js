const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 1998;
var app = express();
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new connection');

	// socket.emit from Admin text welcome to the chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// socket.broadcast.emit from Admin text New User joined
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

	socket.on('createMessage', (message) => {
		console.log('create Message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
	});


	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});



});

server.listen(1998, () => {
	console.log(`connect to port ${port}`);
});