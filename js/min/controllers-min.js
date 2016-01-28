angular.module("lunch.controllers",[]).controller("MainCtrl",function(e,n,i,s,a){n.newSubmission={},n.formSubmitted=!1,n.currentPersonInfo={};var r=new Date;n.filteredDate=a("date")(r,"MMM dd, y"),n.resetData=function(){n.newSubmission={children:[{firstName:"",middleInitial:"",lastName:""}],adults:[{firstName:"",middleInitial:"",lastName:""}],date:n.filteredDate}},n.addPerson=function(e){var i={firstName:"",middleInitial:"",lastName:""};switch(e){case"child":n.newSubmission.children.push(i);break;case"adult":n.newSubmission.adults.push(i)}},n.goBack=function(){window.history.back()},e.$on("$stateChangeSuccess",function(e,i){n.currentPerson=s.idx;var a=i.name;"adult-individual"===a?n.currentPersonInfo=n.newSubmission.adults[n.currentPerson]:"child-individual"===a&&(n.currentPersonInfo=n.newSubmission.children[n.currentPerson]),console.log(n.newSubmission)}),n.goNext=function(e){if(e){switch(i.current.name){case"legal":i.go("programs");break;case"programs":i.go("child-add");break;case"child-add":i.go("child-individual",{idx:0});break;case"child-individual":if(n.currentPerson++,n.newSubmission.children[n.currentPerson])i.go("child-individual",{idx:n.currentPerson});else if(n.newSubmission.programs)i.go("contact");else{for(var s=!0,a=0;a<n.newSubmission.children.length;a++){var r=n.newSubmission.children[a].fosterChild,o=n.newSubmission.children[a].homelessMigrantRunaway;r||o||(s=!1)}s?i.go("contact"):i.go("adult-add")}break;case"adult-add":i.go("adult-individual",{idx:0});break;case"adult-individual":n.currentPerson++,n.newSubmission.adults[n.currentPerson]?i.go("adult-individual",{idx:n.currentPerson}):i.go("household");break;case"household":var t=n.newSubmission.children.length+n.newSubmission.adults.length;if(n.newSubmission.household!==t)return;i.go("contact");break;case"contact":i.go("ethnicity");break;case"ethnicity":i.go("finish")}n.formSubmitted=!1,document.body.scrollTop=0}}});