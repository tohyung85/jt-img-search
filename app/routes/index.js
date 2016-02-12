'use strict';

var Searches = require('../models/history.js');
var ImgSearchHandler = require(process.cwd() + '/app/controllers/imgSearchHandler.js');

module.exports = function (app) {

	var imgSearchHandler = new ImgSearchHandler();

	app.route('/')
		.get(function(req, res){
			res.send("Imagesearch api.");
		});

	app.route('/imagesearch/:query')
		.get(imgSearchHandler.retrieveSearchResults);
}