/**
 * Before running this script, make sure to create the necessary database and table on RethinkDB's Data Explorer, by
 * running the following commands:
 *
 * 		r.dbCreate('topcat')
 *
 * 		r.db('topcat').tableCreate('cats')
 *
 * 		r.db('topcat').table('cats').indexCreate('votes')
 *
 */

var DBHOST = process.env.TOPCAT_RETHINKDB || '192.168.99.100';

var r = require('rethinkdb');
var cats = require('./cats');

function onConnected(conn) {
	var table = r.db('topcat').table('cats');
	return Promise.all(cats.getCatArray().map(function (cat) {
		console.log('Insert', cat.id);
		return table.insert(cat).run(conn);
	}));
}

r.connect(DBHOST, function (err, conn) {
	if (err) {
		console.error(err);
	} else {
		onConnected(conn)
			.then(() => console.log('done!'))
			.catch(err => console.error('error', err));
	}
});
