var pmongo = require('promised-mongo');
var fs = require('fs');

var photos = JSON.parse(fs.readFileSync('cats.json')).photos.photo;

var db = pmongo('localhost:3001/meteor', ['cats']);

db.cats.remove({})
	.then(() => {
		db.cats.insert(photos.map(photo => ({
			photo: photo.url_s,
			owner: photo.ownername,
			title: photo.title,
			votes: 0
		})));
	})
	.then(() => console.log('import completed !'))
	.catch(err => console.error('Failed', err));
