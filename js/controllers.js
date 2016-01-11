/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $state, $stateParams) {
	
	//var data = Submissions.all();

	// $scope.addNew = function() {
	// 	var newInfo = {test: true, value: 1};
	// 	data.$add(newInfo);
	// };

	// for form validation on /child-add
	$scope.formSubmitted = false;
	// for showing info for individuals
	$scope.currentPerson = $stateParams.idx;

	$scope.currentPersonInfo = {};

	

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

			if ( $state.is('child-add') ) {
				$state.go('child-individual', { idx: 0 });
				$scope.currentPersonInfo = $scope.newSubmission.children[0];
			}

			if ( $state.is('child-individual')) {
				$scope.currentPerson = parseInt($stateParams.idx);
				$scope.currentPerson++;
				if ( $scope.newSubmission.children[$scope.currentPerson] ) {
					$state.go('child-individual', { idx: $scope.currentPerson });
					$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
					console.log($scope.currentPersonInfo);
				} else{
					$state.go('programs');
				}
				
			}


			


			$scope.formSubmitted = false;

		} else {
			return;
		}
	};

});