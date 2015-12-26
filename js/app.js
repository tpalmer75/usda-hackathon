// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var lunchApp = angular.module('lunchApp', ['ngRoute', 'ngAnimate']);

// configure our routes
lunchApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'templates/landing.html'
        })
        .when('/add-children', {
            templateUrl : 'templates/add-children.html'
        })
        .when('/legal', {
            templateUrl : 'templates/legal.html'
        });

});

// create the controller and inject Angular's $scope
lunchApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

lunchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

lunchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});