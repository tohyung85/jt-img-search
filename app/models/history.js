'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Search = new Schema({
	term: String,
	when: String
});

module.exports = mongoose.model('Search', Search);