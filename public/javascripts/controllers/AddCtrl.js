angular.module("MeanApp").controller("AddCtrl", addCtrlFunction);
addCtrlFunction.$inject = ['$scope', '$rootScope', '$http', '$state'];

function addCtrlFunction($scope, $rootScope, $http, $state){
	var vm = this;
	vm.addUser = addUser;
	
	function addUser(user){
		var url = 'http://localhost:3000/users/add';
		$http.post(url, user).then(function(data){
			$state.go('display')
			//$scope.$apply();
		},function(error){
			alert("User addition failed");
			throw error;
		});
	}
}