angular.module('topcat.app', [])
	.controller('MainCtrl', function ($http) {
		var vm = this;

		$http.get('/api/cats').success(function (result) {
			vm.cats = result;
		});

		this.likeCat = function (cat) {
			cat.votes = cat.votes + 1;
			$http.post('/api/cats/' + cat.id, {votes: cat.votes});
		};

		this.unlikeCat = function (cat) {
			cat.votes = cat.votes - 1;
			$http.post('/api/cats/' + cat.id, {votes: cat.votes});
		};
	});
