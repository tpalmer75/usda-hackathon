angular.module("lunch.controllers",[]).controller("MainCtrl",function(i,n,l){n.newSubmission={children:[{firstName:"",middleInitial:"",lastName:""}],adults:[]},n.addChild=function(){var i={firstName:"",middleInitial:"",lastName:""};n.newSubmission.children.push(i)},n.goBack=function(){window.history.back()},n.goNext=function(i){i&&l.path("/child-individual")}});