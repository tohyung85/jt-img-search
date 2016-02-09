'use strict';

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./app/routes/index.js');

var port = process.env.PORT || 8080;
var app = express();

routes(app);

app.listen(port, function() {
	console.log('listening to port '+ port + '...');
});

