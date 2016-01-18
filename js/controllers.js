/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $state, $stateParams) {
	
	//var data = Submissions.all();

	// $scope.addNew = function() {
	// 	var newInfo = {test: true, value: 1};
	// 	data.$add(newInfo);
	// };


	// the entire object for our user data
	$scope.newSubmission = {};
	// for form validation on /child-add
	$scope.formSubmitted = false;
	// for showing info for individuals
	$scope.currentPerson = $stateParams.idx;
	// when going through children and adults
	$scope.currentPersonInfo = {};


	$scope.resetData = function() {
		$scope.newSubmission = {
			children: [
				{
					firstName: '',
					middleInitial: '',
					lastName: '',
				}
			],
			adults: []
		};
	};

	$scope.addChild = function() {

		var newChild = {
			firstName: '',
			middleInitial: '',
			lastName: '',
		};

		$scope.newSubmission.children.push(newChild);
	};

	$scope.goBack = function() {
		window.history.back();
	};

	$scope.goNext = function(isValid) {
		if(isValid) {

			var currentState = $state.current.name;

			switch(currentState) {
				case 'programs':
					$state.go('child-add');
					break;
				case 'child-add': 
					$state.go('child-individual', { idx: 0 });
					$scope.currentPersonInfo = $scope.newSubmission.children[0];
					break;
				case 'child-individual':
					$scope.currentPerson = parseInt($stateParams.idx);
					$scope.currentPerson++;
					if ( $scope.newSubmission.children[$scope.currentPerson] ) {
						$state.go('child-individual', { idx: $scope.currentPerson });
						$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
					} else{
						$state.go('programs');
					}
					break;
			}


			


			$scope.formSubmitted = false;

		} else {
			return;
		}
	};

});