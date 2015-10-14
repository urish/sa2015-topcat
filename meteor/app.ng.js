/* global Mongo, Meteor */

if (Meteor.isClient) {
	angular.module('topcat.app', ['angular-meteor'])
		.controller('MainCtrl', function ($meteor) {

			var Cats = Mongo.Collection.get('cats');

			var vm = this;

			vm.cats = $meteor.collection(Cats);

			this.likeCat = function (cat) {
				cat.votes = cat.votes + 1;
			};

			this.unlikeCat = function (cat) {
				cat.votes = cat.votes - 1;
			};
		});
}
