angular.module("MeanApp").controller("DisplayCtrl", displayCtrlFunction);
displayCtrlFunction.$inject = ['$scope', '$rootScope', '$http', 'ListService'];

function displayCtrlFunction($scope, $rootScope, $http, ListService){
	var vm = this;
	vm.searchText= "";
	vm.noData = false;
	vm.search = getSearchData;
	vm.getNextPage = updateListForDisplay;
	
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
	
	function getSearchData(user){
		vm.noData = false;
		if(user && user!=""){
			var search = ListService.getSearchData(user);
			search.then(function(data){
				if(!data.data.length){
					vm.noData = true;
				}
				vm.userList = data.data;
				vm.pageList = ListService.createPageList(Math.ceil(vm.userList.length/10));
				ListService.updateListForDisplay(vm.userList,1);
			},function(error){
				throw error;
			});
		}else
			getDataFromMongo();
	}
	
	
	function updateListForDisplay(start){
		ListService.updateListForDisplay(vm.userList,start)
	}
	
	getDataFromMongo();
}
