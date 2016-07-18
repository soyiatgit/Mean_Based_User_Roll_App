angular.module("MeanApp").controller("SnLCtrl", SnLCtrlFunction);
SnLCtrlFunction.$inject = ['$scope'];

function SnLCtrlFunction($scope){
	var vm = this;
	 vm.currentUser = 1;
	 vm.currentComp = 1;
	 vm.turn = 0; 
	 vm.rollTheDice = rollTheDice;
	 vm.rollTheDiceForComp = rollTheDiceForComp;
	 vm.rollTheDiceForUser = rollTheDiceForUser;
	 
	function createNumbers (){
		vm.numbers=[];
		for (i=0; i<100;i++){
			var obj = {};
			obj.value = i+1;
			obj.ladderStart = 0;
			obj.ladderEnd = 0;
			obj.snakeStart = 0;
			obj.snakeEnd = 0;
			vm.numbers.push(obj);
		}
	}
	
	function createLadders(){
		var ladders = [5,11,21,29,34,56,63,79];
		vm.numbers.forEach(function(n,i){
			if(ladders.indexOf(i) !== -1){
				n.ladderStart = i;
				n.ladderEnd = i+13;
			}
		});
	}
	
	function createSnakes(){
		var snakes = [99,84,65,47,33,28,20];
		vm.numbers.forEach(function(n,i){
			if(snakes.indexOf(i) !== -1){
				n.snakeStart = i;
				n.sankeEnd = i-11;
			}
		});
	}
	
	function rollTheDiceForUser(){
			var i = Math.floor(Math.random()*(6-1+1)+1);
			vm.diceValue = i;
			var currentUser = vm.currentUser + i;
			if(currentUser >= 100){
				alert("User Won. Game Over");
				return;
			}else if(vm.numbers[currentUser].ladderEnd != 0){
			 currentUser = vm.numbers[currentUser].ladderEnd;
			}else if(vm.numbers[currentUser].snakeEnd != 0){
			 currentUser = vm.numbers[currentUser].snakeEnd;
			}
			vm.currentUser = currentUser;
			vm.turn++;
			console.log(vm.turn + "Player: User" + "Currently at: " + vm.currentUser );
			if(i==6 && currentUser > vm.currentUser){
				rollTheDiceForUser();
			}
			else{
				//rollTheDiceForComp();
			}
		}
	
	
	function rollTheDiceForComp(){
			var i = Math.floor(Math.random()*(6-1+1)+1);
			vm.diceValue = i;
			var currentComp = vm.currentComp + i;
			if(currentComp >= 100){
				alert("Computer Won. Game Over");
				return;
			}else if(vm.numbers[currentComp].ladderEnd != 0){
			 currentComp = vm.numbers[currentComp].ladderEnd;
			}else if(vm.numbers[currentComp].snakeEnd != 0){
			 currentComp = vm.numbers[currentComp].snakeEnd;
			}
			vm.currentComp = currentComp;
			vm.turn++;
			console.log(vm.turn + "Player: Comp" + "Currently at: " + vm.currentComp );
			if(i==6 && currentComp > vm.currentComp)
				rollTheDiceForComp();
			else{
				//alert("next");
				//rollTheDiceForUser();	
			}				
		}
		
	function rollTheDice(){
		vm.currentComp=0;
		vm.currentUser=0;
		vm.turn=0;
		rollTheDiceForComp();	
	}	
		
		
	createNumbers();
	createLadders();
	createSnakes();
	
	
}