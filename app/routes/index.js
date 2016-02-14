'use strict';

var Searches = require('../models/history.js');
var ImgSearchHandler = require(process.cwd() + '/app/controllers/imgSearchHandler.js');

module.exports = function (app) {

	var imgSearchHandler = new ImgSearchHandler();

	app.route('/')
		.get(function(req, res){
			res.sendFile(process.cwd() + "/public/index.html");
		});

	app.route('/api/latest/imagesearch')
		.get(imgSearchHandler.retrieveLatestSearches);

	app.route('/api/imagesearch/:query')
		.get(imgSearchHandler.retrieveSearchResults);
}