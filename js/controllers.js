/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($scope, Submissions, $firebaseArray) {
	
	var data = Submissions.all();

	$scope.addNew = function() {

		var newInfo = {test: true, value: 1};
		data.$add(newInfo);
	};

});