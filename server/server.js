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
	console.log('new connection')
})

server.listen(1998, () => {
	console.log(`connect to port ${port}`);
});