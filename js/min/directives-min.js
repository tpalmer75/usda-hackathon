angular.module("lunch.directives",[]).directive("formOnChange",function(n){return{require:"form",link:function(e,r,i){var o=n(i.formOnChange);r.on("change",function(){o(e)})}}});