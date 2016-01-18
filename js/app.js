/*global angular:true */ // Codekit fix 

//var lunchApp = angular.module('lunchApp', ['ngRoute', 'ngAnimate', 'lunch.services', 'lunch.controllers', 'firebase']);
var lunchApp = angular.module('lunchApp', ['ui.router', 'ngAnimate', 'lunch.controllers']);

// configure our routes
lunchApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl : 'templates/landing.html',
        })
        .state('child-add', {
            url: '/children',
            templateUrl : 'templates/child-add.html'
        })
        .state('child-individual', {
            url: '/children/:idx',
            templateUrl : 'templates/child-individual.html'
        })
        .state('legal', {
            url: '/legal',
            templateUrl : 'templates/legal.html'
        })
        .state('programs', {
            url: '/programs',
            templateUrl: 'templates/programs.html'
        })
        .state('adult-add', {
            url: '/adults',
            templateUrl: 'templates/adult-add.html'
        })
        .state('adult-individual', {
            url: '/adults/:idx',
            templateUrl : 'templates/adult-individual.html'
        });

});