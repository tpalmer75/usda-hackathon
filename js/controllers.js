/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $state, $stateParams, $filter, Submissions) {
	
	var data = Submissions.all();

	// the entire object for our user data
	$scope.newSubmission = {};
	// for form validation on /child-add
	$scope.formSubmitted = false;
	// when going through children and adults
	$scope.currentPersonInfo = {};
	// grab the date
	var currentDate = new Date();
	// formate it with Angular
	$scope.filteredDate = $filter('date')(currentDate, "MMM dd, y");
	// so we don't submit more than once
	var dataPushed = false;

	$scope.frequencyValues = [
        {name : "Weekly", id : 52},
        {name : "Bi-weekly", id : 26},
        {name : "2x per month", id : 24},
        {name : "Monthly", id : 12},
        {name : "Yearly", id : 1}];

	// this loads on the first step
	// $scope.resetData = function() {
	// 	$scope.newSubmission = {
	// 		children: [
	// 			{
	// 				firstName: '',
	// 				middleInitial: '',
	// 				lastName: '',
	// 			}
	// 		],
	// 		adults: [
	// 			{
	// 				firstName: '',
	// 				middleInitial: '',
	// 				lastName: ''
	// 			}
	// 		],
	// 		date: $scope.filteredDate,
	// 		primaryWageEarner: null
	// 	};
	// };

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
				}
			],
			date: $scope.filteredDate,
			primaryWageEarner: null
		};

	$scope.showTooltip = function() {
		
	};

	// adding children or adults
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

			switch($state.current.name) {
				case 'intro':
					$state.go('legal');
					break;
				case 'legal':
					$state.go('sign');
					break;
				case 'sign':
					$state.go('programs');
					break;
				case 'programs':
					$state.go('child-add');
					break;
				case 'child-add': 
					$state.go('child-individual', { idx: 0 });
					break;
				case 'child-individual':
					$scope.currentPerson++;
					// if there is another child
					if ( $scope.newSubmission.children[$scope.currentPerson] ) {
						$state.go('child-individual', { idx: $scope.currentPerson });
					// otherwise move to next step
					} else {
						// if participating in assistance program go to contact info
						if ( $scope.newSubmission.programs ) {
							$state.go('contact');
						// otherwise go to adults
						} else {
							// check for eligibility
							var meetsCriteria = true;
							for(var i = 0;i < $scope.newSubmission.children.length ;i++) {
								var status1 = $scope.newSubmission.children[i].fosterChild;
								var status2 = $scope.newSubmission.children[i].homelessMigrantRunaway;

								if (!status1 && !status2) {
									meetsCriteria = false;
								}
							}
							// if eligible
							if (meetsCriteria) {
								$state.go('contact');
							} else {
								$state.go('adult-add');
							}	
						}
					}

					break;
				case 'adult-add':
					$state.go('adult-individual', {idx: 0 });
					break;
				case 'adult-individual':
					$scope.currentPerson++;
					if ( $scope.newSubmission.adults[$scope.currentPerson] ) {
						$state.go('adult-individual', { idx: $scope.currentPerson });
					} else {
						var mostWages = 0;
						for(var x = 0;x < $scope.newSubmission.adults.length ;x++) {
							var currentWageEarner = $scope.newSubmission.adults[x];
							var currentWages = ($scope.newSubmission.adults[x].workIncomeAmount * $scope.newSubmission.adults[x].workIncomeFrequency);
							if (currentWages > mostWages && currentWages > 0) {
								mostWages = currentWages;
								$scope.newSubmission.primaryWageEarner = currentWageEarner.firstName;
							}

						}
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
				case 'contact':
					$state.go('ethnicity');
					break;
				case 'ethnicity':
					$state.go('finish');
					console.log('should be starting');
					if (dataPushed) {
						data.$update($scope.newSubmission);
						console.log('updated');
					} else {
						data.$add($scope.newSubmission);
						console.log('pushed', $scope.newSubmission);
					}
					break;
			}

			$scope.formSubmitted = false;
			document.body.scrollTop = 85;

		} else {
			return;
		}
	};

});