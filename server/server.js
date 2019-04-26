const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var app = express();

app.use(express.static(publicPath));

app.listen(1998, () => {
	console.log("connect to port 1998");
});