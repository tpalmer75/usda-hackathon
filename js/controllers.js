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
	// to track the route history
	$scope.previousState = '';


	$scope.resetData = function() {
		$scope.newSubmission = {
			children: [
				{
					firstName: '',
					middleInitial: '',
					lastName: '',
				}
			],
			adults: [
				{
					firstName: '',
					middleInitial: '',
					lastName: ''
				}]
		};
	};

	$scope.addPerson = function(type) {

		var newPerson = {
			firstName: '',
			middleInitial: '',
			lastName: '',
		};

		switch(type) {
			case 'child':
				$scope.newSubmission.children.push(newPerson);
				break;
			case 'adult':
				$scope.newSubmission.adults.push(newPerson);
				break;
		}
		
	};

	$scope.goBack = function() {
		//window.history.back();
		switch($scope.previousState) {
			case 'programs':
				$state.go('programs');
				$scope.previousState = 'home';
				break;
			case 'child-add':
				$state.go('child-add');
				$scope.previousState = 'programs';
				break;
			case 'child-individual':
				$scope.currentPerson = parseInt($stateParams.idx);
				$scope.currentPerson--;
				if( $scope.newSubmission.children[$scope.currentPerson] ) {
					$state.go('child-individual', {idx: $scope.currentPerson });
					$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
					$scope.previousState = 'child-individual';
				} else {
					$state.go('child-add');
					$scope.previousState = 'programs';
				}
				break;
		}
	};

	$scope.goNext = function(isValid) {
		if(isValid) {

			$scope.previousState = $state.current.name;

			switch($scope.previousState) {
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
					} else {
						$state.go('adult-add');
					}
					break;
				case 'adult-add':
					$state.go('adult-individual', {idx: 0 });
					$scope.currentPersonInfo = $scope.newSubmission.adults[0];
					break;
			}

			$scope.formSubmitted = false;

		} else {
			return;
		}
	};

});