angular.module("MeanApp").controller("UpdateCtrl", updateCtrlFunction);
updateCtrlFunction.$inject = ['$scope', '$rootScope', '$http', '$state', 'ListService'];

function updateCtrlFunction($scope, $rootScope, $http, $state, ListService){
	var vm = this;
	vm.updateUser = updateUser;
	vm.getNextPage = updateListForDisplay;
	

	function updateUser(user){
		var url = 'http://localhost:3000/users/update';
		$http.put(url, user).then(function(data){
			$state.go("display");
		},function(error){
			alert("User updation failed");
			throw error;
		});
	}
	
	function getDataFromMongo(){
		vm.data = ListService.getList();
		vm.data.then(function(data){
			vm.userList = data.data;
			vm.pageList = ListService.createPageList(Math.ceil(vm.userList.length/10));
			ListService.updateListForDisplay(vm.userList,1);
		},function(error){
			alert("Error while fetching data");
		});
	}
	
	function updateListForDisplay(start){
		ListService.updateListForDisplay(vm.userList,start)
	}
	
	getDataFromMongo();
	
}