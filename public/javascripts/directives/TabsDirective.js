angular.module("MeanApp").directive("tabs",function(){
	return{
		restrict : "E",
		scope : true,
		templateUrl : "partials/tabs.html",
		controller : "TabsCtrl",
		controllerAs : "tabs"
		}
});
