/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $location) {
	
	//var data = Submissions.all();

	// $scope.addNew = function() {
	// 	var newInfo = {test: true, value: 1};
	// 	data.$add(newInfo);
	// };

	$scope.newSubmission = 
		{
			children: [
				{
					firstName: '',
					middleInitial: '',
					lastName: ''
				}
			],
			adults: []
		};

	$scope.addChild = function() {

		var newChild = {
			firstName: '',
			middleInitial: '',
			lastName: ''
		};

		$scope.newSubmission.children.push(newChild);
	};

	$scope.goBack = function() {
		window.history.back();
	};

	$scope.goNext = function(isValid) {
		if(isValid) {
			$location.path("/child-individual");
		}
	};

});