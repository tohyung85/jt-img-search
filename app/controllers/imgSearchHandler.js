'use strict';

var Searches = require('../models/history.js');

var GoogleSearch = require('google-search');
var googleSearch = new GoogleSearch({
	key: "AIzaSyBWMUM8BIWcCuvaSJ5YjJPJ-vyYjpxBOzg",
	cx: "016910765349500541567:wzjfmdo0uvu"
});	

//var googleImages = require('google-images');

//var client = googleImages('016910765349500541567:wzjfmdo0uvu', 'AIzaSyBWMUM8BIWcCuvaSJ5YjJPJ-vyYjpxBOzg');

function ImgSearchHandler () {

	this.retrieveSearchResults = function (req, res) {
			
		console.log("handler called");
		googleSearch.build({
		  q: "lolcats funny",
		  fileType: "png jpg bmp svg",
		  num: 2, // Number of search results to return between 1 and 10, inclusive	
		}, function(error, response) {		  
			var results = [];
			response.items.forEach(function (element){
				var url = element.pagemap.cse_image[0].src;
				var context = element.link;
				var snippet = element.snippet;
				var thumbnail = element.pagemap.cse_thumbnail[0].src;

				var result = {url: url, snippet: snippet, thumbnail: thumbnail, context: context};
				results.push(result);
				
			});
			res.json(results);
		  //res.json(response.items);
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