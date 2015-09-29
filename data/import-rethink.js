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
var fs = require('fs');

var photos = JSON.parse(fs.readFileSync('cats.json')).photos.photo;

function onConnected(conn) {
	var table = r.db('topcat').table('cats');
	return Promise.all(photos.map(function (photo) {
		console.log('Insert', photo.id);
		return table.insert({
			id: photo.id,
			photo: photo.url_s,
			owner: photo.ownername,
			title: photo.title,
			votes: 0
		}).run(conn);
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
