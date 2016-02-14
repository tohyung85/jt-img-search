'use strict';

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./app/routes/index.js');

var port = process.env.PORT || 5000;
var app = express();
var mongoUrl = process.env.MONGOLAB_URI;

mongoose.connect(mongoUrl);

routes(app);

app.listen(port, function() {
	console.log('listening to port '+ port + '...');
});

