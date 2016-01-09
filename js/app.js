/*global angular:true */ // Codekit fix 

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
//var lunchApp = angular.module('lunchApp', ['ngRoute', 'ngAnimate', 'lunch.services', 'lunch.controllers', 'firebase']);
var lunchApp = angular.module('lunchApp', ['ngRoute', 'ngAnimate', 'lunch.controllers']);

// configure our routes
lunchApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'templates/landing.html',
        })
        .when('/child-add', {
            templateUrl : 'templates/child-add.html'
        })
        .when('/child-individual', {
            templateUrl : 'templates/child-individual.html'
        })
        .when('/legal', {
            templateUrl : 'templates/legal.html'
        });

});