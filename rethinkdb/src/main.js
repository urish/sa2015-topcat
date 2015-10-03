var APP_PORT = process.env.TOPCAT_PORT || 8090;
var DBHOST = process.env.TOPCAT_RETHINKDB || '192.168.99.100';

var path = require('path');
var sockio = require('socket.io');
var r = require('rethinkdb');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, '../app')));
app.use(bodyParser.json());

function onConnected(conn) {
	var table = r.db('topcat').table('cats');
	var io = sockio.listen(app.listen(APP_PORT), {log: false});
	console.log(`Listening on port ${APP_PORT}`);

	app.get('/api/cats', function (req, res) {
		table.coerceTo('array').run(conn).then(result => res.json(result));
	});

	app.post('/api/cats/:id', function (req, res) {
		table.filter({'id': req.params.id}).update({votes: req.body.votes}).run(conn)
			.then(result => res.send('OK'));
	});

	io.on('connection', function (socket) {
		console.log('User connected:', socket.handshake.address);

		table.coerceTo('array').run(conn).then(data => socket.emit('data', data));

		table.changes().run(conn).then(cursor => {
			cursor.each((err, change) => {
				socket.emit('change', change);
			});
		});

		socket.on('disconnect', function () {
			console.log('User disconnected:', socket.handshake.address);
		});
	});
}

r.connect(DBHOST, function (err, conn) {
	if (err) {
		console.error(err);
	} else {
		onConnected(conn);
	}
});
