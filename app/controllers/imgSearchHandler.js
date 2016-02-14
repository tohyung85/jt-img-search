'use strict';

var Search = require('../models/history.js');

var GoogleSearch = require('./google-search.js');
var googleSearch = new GoogleSearch({
	key: process.env.CUSTOM_SEARCH_KEY,
	cx: process.env.CUSTOM_SEARCH_CSE
});	

function ImgSearchHandler () {

	this.retrieveSearchResults = function (req, res) {
		var newSearch = new Search();
		newSearch.term = req.params.query;
		newSearch.when = new Date();

		newSearch.save(function (err){
			console.log("saving...");
			if (err) {throw err;}
			var offset;
			if (req.query.offset) {
				offset = req.query.offset;
			} else {
				offset = 1;
			}

			googleSearch.build({
			  q: req.params.query,
			  searchType: "image",
			  fileType:'png jpg gif jpeg',
			  num: 10, // Number of search results to return between 1 and 10, inclusive	
			  start: offset,
			}, function(error, response) {		
				if (error)  {
					throw error;
				}
				
				var results = [];
				response.items.forEach(function (element){
					var url = element.link;
					var context = element.image.contextLink;
					var snippet = element.snippet;
					var thumbnail = element.image.thumbnailLink;

					var result = {url: url, snippet: snippet, thumbnail: thumbnail, context: context};
					results.push(result);
					
				});

				res.json(results);
			});
			
		});

	}

	this.retrieveLatestSearches = function (req, res) {
		Search
			.find({}, {'_id': false})
			.exec(function (err, search){
				if (err) {throw err;}

				if (search) {
					res.json(search);
				} else {
					res.send("No searches done yet!");
				}
			});
	}

}

module.exports = ImgSearchHandler;