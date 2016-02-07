/*global angular:true */ // Codekit fix 
/*global Firebase */

angular.module('lunch.services', [])

.factory('Submissions', function($firebaseArray) {
	var ref = new Firebase("https://lunchux.firebaseIO.com/testSubmissions");
	var submissions = $firebaseArray(ref);

	return {
		all: function() {
		  return submissions;
		}
	};
});