var lunchApp=angular.module("lunchApp",["ngRoute","ngAnimate","lunch.controllers"]);lunchApp.config(function(l){l.when("/",{templateUrl:"templates/landing.html"}).when("/child-add",{templateUrl:"templates/child-add.html"}).when("/child-individual",{templateUrl:"templates/child-individual.html"}).when("/legal",{templateUrl:"templates/legal.html"})});