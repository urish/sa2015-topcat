angular.module('topcat.app', ['firebase'])
	.controller('MainCtrl', function ($scope, Firebase, $firebaseArray) {
		var vm = this;

		var fbRef = new Firebase('https://topcat.firebaseio.com/cats').orderByChild('votes');
		vm.cats = $firebaseArray(fbRef);

		this.likeCat = function (cat) {
			cat.votes = cat.votes + 1;
			vm.cats.$save();
		};

		this.unlikeCat = function (cat) {
			cat.votes = cat.votes - 1;
			vm.cats.$save();
		};
	});
