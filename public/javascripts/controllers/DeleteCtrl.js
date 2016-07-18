angular.module("MeanApp").controller("DeleteCtrl", deleteCtrlFunction);
deleteCtrlFunction.$inject = ['$scope', '$rootScope', '$http', '$state', 'ListService'];

function deleteCtrlFunction($scope, $rootScope, $http, $state, ListService){
	var vm = this;
	vm.found = false;
	vm.deleteUser = deleteUser;
	vm.findUser = findUser;
	vm.getNextPage = updateListForDisplay;

	
	function deleteUser(user){
		var url = 'http://localhost:3000/users/delete/'+user._id;
		$http.delete(url).then(function(data){
			var index = vm.userList.indexOf(user);
			vm.userList.splice(index,1);
			$state.go('display')
		},function(error){
			alert("User deletion failed");
			throw error;
		});
	}
	
	function findUser(user){
		var url = 'http://localhost:3000/users/find';
		$http.post(url, user).then(function(data){
			vm.findList = data.data;
			vm.found = true;
		},function(error){
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