/* global Mongo, Meteor */

var Cats = new Mongo.Collection('cats');

if (Meteor.isClient) {
	angular.module('topcat.app', ['angular-meteor'])
		.controller('MainCtrl', function ($meteor) {
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
