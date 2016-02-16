/*global angular:true */ // Codekit fix 

angular.module('lunch.controllers', [])

.controller('MainCtrl', function($rootScope, $scope, $state, $stateParams, $filter, Submissions) {

	// the entire object for our user data
	$scope.newSubmission = {};
	// for form validation on /child-add
	$scope.formSubmitted = false;
	// when going through children and adults
	$scope.currentPersonInfo = {};
	// for showing pop ups
	$scope.showModal = false;
	// grab the date
	var currentDate = new Date();
	// formate it with Angular
	$scope.filteredDate = $filter('date')(currentDate, "MMM dd, y");
	// the formatted data
	var formattedData = [];
	// the Firebase connection
	$scope.firebaseRef = Submissions.all();
	// the values for the income drop downs
	$scope.frequencyValues = [
        {name : "Weekly", id : 52},
        {name : "Bi-weekly", id : 26},
        {name : "2x per month", id : 24},
        {name : "Monthly", id : 12},
        {name : "Yearly", id : 1}
    ];

    // The starter object for each application
    var resetData = function() {
    	formattedData = [];
    	$scope.newSubmission = {
			children: [
				{
					firstName: '',
					middleInitial: '',
					lastName: '',
					fosterChild: null,
					homelessMigrantRunaway: null,
					student: null
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
			primaryWageEarner: null,
			totalIncome: 0,
			signature: null,
			programs: null,
			caseNumber: null,
			ssn: '',
			contact: {
				address: '',
				apt: '',
				city: '',
				state: '',
				zip: '',
				phone: '',
				email: ''
			},
			latino: false,
			indianOrAlaskan: false,
			asian: false,
			blackOrAfrican: false,
			hawaiianOrIslander: false,
			white: false
		};
    };
    resetData();
	

	// adding children or adults to the starter object 
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

	// restructure the data to be CSV friendly (happens at the end)
	var formatData = function() {
		// format the data from each child
		var temp = {};
		var sub = $scope.newSubmission;

		// format each child
		for(var i=0; i < $scope.newSubmission.children.length; i++) {
			
			var ref = $scope.newSubmission.children[i];
			temp = {
				signature: sub.signature,
				type: "child",
				programs: sub.programs,
				caseNumber: sub.caseNumber,
				firstName: ref.firstName,
				middleInitial: ref.middleInitial,
				lastName: ref.lastName,
				income: sub.totalIncome,
				student: ref.student,
				homelessMigrantRunaway: ref.homelessMigrantRunaway,
				fosterChild: ref.fosterChild,
				street: sub.contact.address,
				apt: sub.contact.apt,
				city: sub.contact.city,
				state: sub.contact.state,
				zip: sub.contact.zip,
				phone: sub.contact.phone,
				date: sub.date,
				hispanic: sub.latino,
				indianOrAlaskan: sub.indianOrAlaskan,
				asian: sub.asian,
				blackOrAfrican: sub.blackOrAfrican,
				hawaiianOrIslander: sub.hawaiianOrIslander,
				white: sub.white,
				social: sub.ssn
			};

			formattedData.push(temp);
		}

		// format each adult, but adults are only included if there are no other programs
		if (sub.programs === false) {
			for(var i=0; i < $scope.newSubmission.adults.length; i++) {
				var ref = $scope.newSubmission.adults[i];
				temp = {
					signature: sub.signature,
					type: "adult",
					programs: sub.programs,
					caseNumber: sub.caseNumber,
					firstName: ref.firstName,
					middleInitial: ref.middleInitial,
					lastName: ref.lastName,
					income: sub.totalIncome,
					student: '',
					homelessMigrantRunaway: '',
					fosterChild: '',
					street: sub.contact.address,
					apt: sub.contact.apt,
					city: sub.contact.city,
					state: sub.contact.state,
					zip: sub.contact.zip,
					phone: sub.contact.phone,
					date: sub.date,
					hispanic: '',
					indianOrAlaskan: '',
					asian: '',
					blackOrAfrican: '',
					hawaiianOrIslander: '',
					white: '',
					social: sub.ssn
				};
				formattedData.push(temp);
			}
		}
	};

	// to move back in the app
	$scope.goBack = function() {
		window.history.back();
	};

	// used for managing the data for individuals on state change
	$rootScope.$on('$stateChangeSuccess', function(toState, toParams, fromState, fromParams) {
		$scope.currentPerson = $stateParams.idx;
		var incoming = toParams.name;
		var leaving = fromParams.name;
		if (incoming === 'adult-individual') {
			$scope.currentPersonInfo = $scope.newSubmission.adults[$scope.currentPerson];
		} else if (incoming === 'child-individual') {
			$scope.currentPersonInfo = $scope.newSubmission.children[$scope.currentPerson];
		// making sure data can't be altered after submission	
		} else if (leaving === 'finish' && !(incoming == 'export')) {
			$state.go('home');
			resetData();
		}
	});

	// dynamic routing in the app
	$scope.goNext = function(isValid) {

		// isValid refers to the form validation
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
					if ($scope.newSubmission.programs === true) {
						// these values can't be left empty, but the user won't see them, so let's fill them in
						for (i=0; i < $scope.newSubmission.children.length; i++) {
							$scope.newSubmission.children[i].fosterChild = '';
							$scope.newSubmission.children[i].homelessMigrantRunaway = '';
						}
					}
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
								// skip adults, go to contact
								$state.go('contact');
								// remove the empty adult object
								$scope.newSubmission.adults.splice(0, 1);
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
						// Add up the children's income
						for (var i=0;i<$scope.newSubmission.children.length;i++) {
							var personalIncome = ($scope.newSubmission.children[i].incomeAmount * $scope.newSubmission.children[i].incomeFrequency);
							if (personalIncome) {
								$scope.newSubmission.totalIncome = personalIncome;
							}
							
						}// Add up the adult's income
						for (var i=0;i<$scope.newSubmission.adults.length;i++) {
							var workIncome = ($scope.newSubmission.adults[i].workIncomeAmount * $scope.newSubmission.adults[i].workIncomeFrequency);
							var secondIncome = ($scope.newSubmission.adults[i].secondIncomeAmount * $scope.newSubmission.adults[i].secondIncomeFrequency);
							if (workIncome) {
								$scope.newSubmission.totalIncome += workIncome;
							}
							if (secondIncome) {
								$scope.newSubmission.totalIncome += secondIncome;
							}
							// If there was no income found, set it to 0.
							if(!$scope.newSubmission.totalIncome) {
								$scope.newSubmission.totalIncome = 0;
							}
						}
						console.log($scope.newSubmission.totalIncome);
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
					formatData();
					console.log(formattedData);
					for(var i=0; i < formattedData.length; i++) {
						$scope.firebaseRef.$add(formattedData[i]);
					}
					break;
			}

			$scope.formSubmitted = false;
			document.body.scrollTop = 85;

		} else {
			return;
		}
	};


	/// For exporting data

	var tempData = Submissions.all();
	$scope.dataReady = false;
	$scope.exportButton = "Loading...";

	tempData.$loaded().then(function() {
		$scope.dataReady = true;
		$scope.exportButton = "Download CSV";
	});


});
