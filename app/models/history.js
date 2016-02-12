'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Search = new Schema(
	{
		term: String,
		when: String
	}, 
	{versionKey: false}
	);

module.exports = mongoose.model('Search', Search);