'use strict';

var Search = require('../models/history.js');

var GoogleSearch = require('./google-search.js');
var googleSearch = new GoogleSearch({
	key: "AIzaSyBWMUM8BIWcCuvaSJ5YjJPJ-vyYjpxBOzg",
	cx: "016910765349500541567:wzjfmdo0uvu"
});	

//var googleImages = require('google-images');

//var client = googleImages('016910765349500541567:wzjfmdo0uvu', 'AIzaSyBWMUM8BIWcCuvaSJ5YjJPJ-vyYjpxBOzg');

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

			//res.send('save and retrieve');

			googleSearch.build({
			  q: req.params.query,
			  searchType: "image",
			  fileType:'png jpg gif jpeg',
			  num: 1, // Number of search results to return between 1 and 10, inclusive	
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
			  //res.json(response.items);
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

//		res.send('check handler');

/*		
		client.search('google')
			.then (function (images){
				console.log('search complete');
				res.json(images);
			});
*/