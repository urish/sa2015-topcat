var Firebase = require('firebase');
var fs = require('fs');

var fbRef = new Firebase('https://topcat.firebaseio.com/cats');
// https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=can_comment%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z&per_page=125&page=1&lang=en-US&text=cat&license=4%2C5%2C9%2C10&color_codes=2%2C8&view_all=1&viewerNSID=&method=flickr.photos.search&csrf=&api_key=b6386c139dfa88173692ab96594628c5&format=json&hermes=1&hermesClient=1&reqId=k66aggg&nojsoncallback=1
var photos = JSON.parse(fs.readFileSync('cats.json'));
photos.photos.photo.forEach(function(photo) {
	fbRef.child(photo.id).set({
		photo: photo.url_s,
		owner: photo.ownername,
		title: photo.title,
		votes: 0
	});
});
