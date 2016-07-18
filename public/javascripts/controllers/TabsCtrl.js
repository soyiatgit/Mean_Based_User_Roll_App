angular.module("MeanApp").controller("TabsCtrl", tabsCtrlFunction);
tabsCtrlFunction.$inject = ['$scope', '$rootScope', '$http', '$state'];

function tabsCtrlFunction($scope, $rootScope, $http, $state){
	var vm = this;
	vm.goToAdd = goToAdd;
	vm.goToDelete = goToDelete;
	vm.goToUpdate = goToUpdate;
	vm.goToUsers = goToUsers;
	vm.goToSnL = goToSnL;
	
	function goToAdd(){
		$state.go('add');
	}
	
	function goToDelete(){
		$state.go('delete');
	}
	
	function goToUpdate(){
		$state.go('update');
	}
	
	function goToUsers(){
		$state.go('display');
	}
	
	function goToSnL(){
		$state.go('snl');
	}
}