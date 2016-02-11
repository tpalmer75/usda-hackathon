/*global angular:true */ // Codekit fix 
/*global Firebase */

angular.module('lunch.services', [])

.factory('Submissions', function($firebaseArray) {
	var ref = new Firebase("https://lunchux.firebaseIO.com/testSubmissions");
	var submissions = $firebaseArray(ref);

	return {
		all: function() {
		  return submissions;
		},
		test: function() {
			var testData = {
				0: "Bob",
				1: "Joe",
				2: "Dan"
			};
			return testData;
		}
	};
});