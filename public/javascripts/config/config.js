angular.module("MeanApp").config(configFunction);
configFunction.$inject = ['$stateProvider', '$urlRouterProvider']
function configFunction($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/list');
	$stateProvider.state("display",{
		url: "/list",
		templateUrl : "partials/displayList.html",
		controller: 'DisplayCtrl',
		controllerAs : 'dsp'
	})
	.state("add",{
		url: "/addUser",
		templateUrl : "partials/addToList.html",
		controller: 'AddCtrl',
		controllerAs : 'add'
	})
	.state("delete",{
		url: "/deleteUser",
		templateUrl : "partials/deleteFromList.html",
		controller: 'DeleteCtrl',
		controllerAs : 'del',
		params: {
                params: []
            }
	})
	.state("update",{
		url: "/updateUser",
		templateUrl : "partials/updateList.html",
		controller: 'UpdateCtrl',
		controllerAs : 'upd'
	})
	.state("snl",{
		url: "/snl",
		templateUrl : "partials/snl.html",
		controller: 'SnLCtrl',
		controllerAs : 'snl'
	})
}
