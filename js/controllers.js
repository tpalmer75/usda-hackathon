/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $state) {
	
	//var data = Submissions.all();

	// $scope.addNew = function() {
	// 	var newInfo = {test: true, value: 1};
	// 	data.$add(newInfo);
	// };

	// for form validation on /child-add
	$scope.formSubmitted = false;
	// for showing info for individuals
	var currentPerson = 0;

	

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

$scope.currentPersonInfo = $scope.newSubmission.children[currentPerson];

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
				$state.go('child-individual');
			}

			if ( $state.is('child-individual')) {
				console.log('here');
				currentPerson++;
				if ( $scope.currentPersonInfo ) {
					console.log('second');
					$state.go('child-individual');
				}
				
			}


			

			$scope.formSubmitted = false;






		} else {
			return;
		}
	};

});