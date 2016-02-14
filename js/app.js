/*global angular:true */ // Codekit fix 

var lunchApp = angular.module('lunchApp', ['ui.router', 'ngAnimate', 'lunch.services', 'lunch.controllers', 'firebase','ngCsv', 'ngSanitize']);
//var lunchApp = angular.module('lunchApp', ['ui.router', 'ngAnimate', 'lunch.controllers']);

lunchApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl : 'templates/landing.html',
        })
        .state('intro', {
            url: '/intro',
            templateUrl : 'templates/intro.html',
        })
        .state('sign', {
            url: '/sign',
            templateUrl : 'templates/sign.html',
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
        })
        .state('household', {
            url: '/household',
            templateUrl : 'templates/household.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl : 'templates/contact.html'
        })
        .state('ethnicity', {
            url: '/ethnicity',
            templateUrl : 'templates/ethnicity.html'
        })
        .state('finish', {
            url: '/finish',
            templateUrl : 'templates/finish.html'
        })
        .state('export', {
            url: '/export',
            templateUrl : 'templates/export.html'
        });
})


.directive("formOnChange", function(){
  return {
    require: "form",
    link: function(scope){

    scope.$watch("newSubmission", function(){
        scope.formSubmitted = false;
        }, true);
    }
  };
})

.animation('.ng-slide-down', function() {
  return {
    enter: function(element) {
      element.hide().slideDown(300).addClass('showing').removeClass('hiding');
      //return function(cancelled) {};
    },
    leave: function(element) { 
      element.slideUp(300).removeClass('showing').addClass('hiding');
    },
  };
});


