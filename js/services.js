/*global angular:true */ // Codekit fix 

angular.module('lunch.services', [])

.factory('Submissions', function($firebaseArray, $firebase) {
	var ref = new Firebase("https://lunchux.firebaseIO.com/submissions");
	var submissions = $firebaseArray(ref);

	return {
		all: function() {
		  return submissions;
		}
	};
});