'use strict';

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./app/routes/index.js');

var port = process.env.PORT || 5000;
var app = express();
var mongoUrl = 'mongodb://heroku_3sqdwhqq:bt2uc5rc50e746klblp498j68o@ds059185.mongolab.com:59185/heroku_3sqdwhqq';

mongoose.connect(mongoUrl);

routes(app);

app.listen(port, function() {
	console.log('listening to port '+ port + '...');
});

