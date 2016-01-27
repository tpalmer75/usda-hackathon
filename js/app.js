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
        })
        .state('household', {
            url: '/household',
            templateUrl : 'templates/household.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl : 'templates/contact.html'
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


// .animation('.ng-slide-down', function() {
//     return {
//         beforeAddClass: function(element, className, done) {
//             if(className === 'ng-leave') {
//                 element.slideUp(done); 
//             } else if (className === 'ng-enter') {
//                 element.hide().slideDown(done);
//             }
//         }
//     };
// });


