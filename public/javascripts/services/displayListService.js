angular.module("MeanApp").service('ListService', listServiceFunction);
listServiceFunction.$inject = ['$rootScope', '$http'];

function listServiceFunction ($rootScope, $http){
	var self = this;
	
	this.getList = function(){
		var url = 'http://localhost:3000/users/List';
		return $http.get(url);
	}
	
	this.createPageList = function (pages){
		var pageList = [];
		for(i=1; i <= pages; i++){
			pageList.push(i);
		}
		return pageList;
	}
	
	this.updateListForDisplay = function(userList,start){
		var startPoint =  start *10 - 10;
		userList.forEach(function(user, index){
			if(index >= startPoint && index < startPoint+10)
				user.display = true;
			else
				user.display = false;
		});
	}
	
	this.getSearchData = function(user){
		var url = 'http://localhost:3000/users/search/'+ user;
		return $http.get(url);
	}	
	
}