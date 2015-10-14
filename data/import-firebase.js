var Firebase = require('firebase');
var cats = require('./cats');

var fbRef = new Firebase('https://topcat.firebaseio.com/cats');
cats.getCatArray().forEach(function(cat) {
	fbRef.child(cat.id).set({
		photo: cat.photo,
		owner: cat.owner,
		title: cat.title,
		votes: cat.votes
	});
});
