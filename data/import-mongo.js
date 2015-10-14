var pmongo = require('promised-mongo');
var cats = require('./cats');
var db = pmongo('client-ab870cd2:5c34ce81-779a-00ed-2451-63d04bf1ea64@production-db-a2.meteor.io:27017/topcat_meteor_com', ['cats']);
var _ = require('lodash');

db.cats.remove({})
	.then(() => {
		db.cats.insert(cats.getCatArray().map(function (cat) {
			return _.extend({_id: cat.id}, cat);
		}));
	})
	.then(() => console.log('import completed !'))
	.catch(err => console.error('Failed', err));
