/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $state, $stateParams, $filter) {
	
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
	//$scope.currentPerson = $stateParams.idx;
	// when going through children and adults
	$scope.currentPersonInfo = {};
	// to track the route history
	//$scope.previousState = '';
	var currentDate = new Date();
	$scope.filteredDate = $filter('date')(currentDate, "MMM dd, y");


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

	// to move back in the app
	$scope.goBack = function() {
		window.history.back();
		// switch($scope.previousState) {
		// 	case 'programs':
		// 		$state.go('programs');
		// 		$scope.previousState = 'home';
		// 		break;
		// 	case 'child-add':
		// 		$state.go('child-add');
		// 		$scope.previousState = 'programs';
		// 		break;
		// 	case 'child-individual':
		// 		if ($stateParams.idx) {
		// 			$scope.currentPerson = parseInt($stateParams.idx);
		// 			$scope.currentPerson--;
		// 		} else {
		// 			$scope.currentPerson = $scope.newSubmission.children.length;
		// 		}
		// 		if( $scope.newSubmission.children[$scope.currentPerson] ) {
		// 			$state.go('child-individual', {idx: $scope.currentPerson });
		// 			$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
		// 			$scope.previousState = 'child-individual';
		// 		} else {
		// 			$state.go('child-add');
		// 			$scope.previousState = 'programs';
		// 		}
		// 		break;
		// 	case 'adult-add':
		// 		$scope.currentPerson --;
		// 		$state.go('child-individual', {idx: $scope.currentPerson});
		// 		$scope.previousState = 'child-individual';
		// 		break;
		// 	case 'adult-individual':
		// 		if ($stateParams.idx) {
		// 			$scope.currentPerson = parseInt($stateParams.idx);
		// 			$scope.currentPerson--;
		// 		} else {
		// 			$scope.currentPerson = $scope.newSubmission.adults.length;
		// 		}
		// 		if( $scope.newSubmission.adults[$scope.currentPerson] ) {
		// 			$state.go('adult-individual', {idx: $scope.currentPerson });
		// 			$scope.currentPersonInfo = $scope.newSubmission.adults[$scope.currentPerson];
		// 			$scope.previousState = 'child-individual';
		// 		} else {
		// 			$state.go('adult-add');
		// 			$scope.previousState = 'child-individual';
		// 		}
		// 		break;

		// 	case 'household':

		// 		break;
		// }
	};
	// used for managing the data for individuals on state change
	$rootScope.$on('$stateChangeSuccess', function(toState, toParams) {
		$scope.currentPerson = $stateParams.idx;
		var incoming = toParams.name;
		if (incoming === 'adult-individual') {
			$scope.currentPersonInfo = $scope.newSubmission.adults[$scope.currentPerson];
		} else if (incoming === 'child-individual') {
			$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
		}
	});

	// to move forward in the app
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
					$scope.currentPerson++;
					if ( $scope.newSubmission.children[$scope.currentPerson] ) {
						$state.go('child-individual', { idx: $scope.currentPerson });
						$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
					} else {
						if ( $scope.newSubmission.programs ) {
							$state.go('contact');
						} else {
							$state.go('adult-add');
						}
					}
					break;
				case 'adult-add':
					$state.go('adult-individual', {idx: 0 });
					$scope.currentPersonInfo = $scope.newSubmission.adults[0];
					break;
				case 'adult-individual':
					$scope.currentPerson++;
					if ( $scope.newSubmission.adults[$scope.currentPerson] ) {
						$state.go('adult-individual', { idx: $scope.currentPerson });
						$scope.currentPersonInfo = $scope.newSubmission.adults[$scope.currentPerson];
					} else {
						$state.go('household');
					}
					break;
				case 'household':
					var total = $scope.newSubmission.children.length + $scope.newSubmission.adults.length;
					if ( $scope.newSubmission.household === total ) {
						$state.go('contact');
					} else {
						return;
					}
					break;
			}

			$scope.formSubmitted = false;

		} else {
			return;
		}
	};

});