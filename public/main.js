angular.module("MeanApp", ["ui.router"]);

angular.module("MeanApp").controller("MeanCtrl", meanCtrlFunction);
meanCtrlFunction.$inject = ['$scope', '$rootScope', '$http'];

function meanCtrlFunction($scope, $rootScope, $http){
	var vm = this;
	vm.appName = "MeanApp";
	vm.devName = "Saurabh";
	vm.tutName = "Nithin";
	vm.addUser = addUser;
	vm.deleteUser = deleteUser;
	vm.updateUser = updateUser;
	
	function getDataFromMongo(){
		var url = 'http://localhost:3000/users/List';
		$http.get(url).then(function(data){
			vm.userList = data.data;
		},function(error){
			throw error;
		});
	}
	
	function addUser(){
		var url = 'http://localhost:3000/users/add';
		$http.post(url, $scope.newUser).then(function(data){
			vm.userList.push($scope.newUser);
			//$scope.$apply();
		},function(error){
			alert("User addition failed");
			throw error;
		});
	}
	
	function deleteUser(user){
		var url = 'http://localhost:3000/users/delete/'+user._id;
		$http.delete(url).then(function(data){
			var index = vm.userList.indexOf(user);
			vm.userList.splice(index,1);
			//$scope.$apply();
		},function(error){
			alert("User deletion failed");
			throw error;
		});
	}
	
	function updateUser(user){
		var url = 'http://localhost:3000/users/update';
		$http.put(url, user).then(function(data){
			
		},function(error){
			alert("User addition failed");
			throw error;
		});
	}
	
	getDataFromMongo();
}