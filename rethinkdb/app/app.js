angular.module('topcat.app', [])
	.controller('MainCtrl', function ($http, $window) {
		var vm = this;

		function loadData() {
			$http.get('/api/cats').success(function (result) {
				vm.cats = result;
			});
		}

		var socket = $window.io();
		socket.on('change', function (change) {
			loadData();
		});

		this.likeCat = function (cat) {
			cat.votes = cat.votes + 1;
			$http.post('/api/cats/' + cat.id, {votes: cat.votes});
		};

		this.unlikeCat = function (cat) {
			cat.votes = cat.votes - 1;
			$http.post('/api/cats/' + cat.id, {votes: cat.votes});
		};

		loadData();
	});
