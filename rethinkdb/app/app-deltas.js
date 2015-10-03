angular.module('topcat.app', [])
	.controller('MainCtrl', function ($http, $rootScope, $window) {
		var vm = this;

		var socket = $window.io();

		socket.on('data', function (data) {
			$rootScope.$apply(function () {
				vm.cats = data;
			});
		});

		socket.on('change', function (change) {
			$rootScope.$apply(function () {

				if (change.old_val) {
					// delete
					vm.cats = vm.cats.filter(function (cat) {
						return cat.id !== change.old_val.id;
					});
				}

				if (change.new_val) {
					// insert
					vm.cats = vm.cats.concat([change.new_val]);
				}
			});
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
