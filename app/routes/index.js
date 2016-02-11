'use strict';

var Searches = require('../models/history.js');
var ImgSearchHandler = require(process.cwd() + '/app/controllers/imgSearchHandler.js');

module.exports = function (app) {

	var imgSearchHandler = new ImgSearchHandler();

	app.route('/')
		.get(imgSearchHandler.retrieveSearchResults);
}