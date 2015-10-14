var fs = require('fs');
var _ = require('lodash');

var catalog = JSON.parse(fs.readFileSync('cats.json'));

exports.getCatArray = function () {
	return Object.keys(catalog).map(function (id) {
		return _.extend({id: id}, catalog[id]);
	}).filter(function(cat) {
		return cat.votes > 0;
	});
};
