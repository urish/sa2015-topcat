angular.module('topcat.app', ['firebase'])
	.controller('MainCtrl', function (Firebase, $firebaseArray) {
		var vm = this;

		var fbRef = new Firebase('https://topcat.firebaseio.com/cats').orderByChild('votes');
		vm.cats = $firebaseArray(fbRef);

		this.likeCat = function (cat) {
			cat.votes = cat.votes + 1;
			vm.cats.$save(cat);
		};

		this.unlikeCat = function (cat) {
			cat.votes = cat.votes - 1;
			vm.cats.$save(cat);
		};
	});
