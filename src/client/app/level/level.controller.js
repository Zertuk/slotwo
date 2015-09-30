(function() {
	'use strict';

	angular
		.module('app.level')
		.controller('LevelController', LevelController);

	LevelController.$inject = ['levelService', 'playerService', 'enemyService', '$scope', '$timeout'];

	/* @ngInject */
	function LevelController(levelService, playerService, enemyService, $scope, $timeout) {
		var vm = this;
		vm.title = 'LevelController';


		vm.currentLevel = levelService.treeOne;
		vm.currentLevel.checkLength();
		vm.player = playerService.player;
		playerService.player.position = vm.currentLevel.playerSpawn;
		vm.unitArray = [playerService.player];

		vm.messageLog = [];

		function addMessage(message) {
			vm.messageLog.push(message);
			var elem = document.getElementById('log');
  			elem.scrollTop = elem.scrollHeight;
		}

		var test = "test/test";
		test.split('//');
		function createEnemy() {
			var random = Math.round(Math.random()*100);
			if (random > 90) {
				var test = new vm.currentLevel.enemyArray[0];
				var spawn = [];
				spawn[0] = vm.currentLevel.enemySpawn[0];
				spawn[1] = vm.currentLevel.enemySpawn[1];
				test.position = spawn;
				vm.unitArray.push(test);
			}
		}

		function spawnEnemyAtStart(position) {
			var entity = new vm.currentLevel.enemyArray[0];
			var spawn = [];
			spawn[0] = position[0];
			spawn[1] = position[1];
			entity.position = spawn;
			vm.unitArray.push(entity);
		}
		function initLevel() {
			if (typeof vm.currentLevel.spawnAtStart != 'undefined') {
				console.log(vm.currentLevel.spawnAtStart);
				for (var i = 0; i < vm.currentLevel.spawnAtStart.length; i++) {
					spawnEnemyAtStart(vm.currentLevel.spawnAtStart[i]);
				}
			}
			else {
				console.log(vm.currentLevel.spawnAtStart);
			}
		}
		initLevel()

		function updateMap(unit, unitOld, map, unitSymbol, prevCheck) {
			if (!prevCheck) {
				map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
				map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
			}
			else {
				map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
				map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
			}
		}


		function setCharAt(str,index,chr) {
			if (typeof str !== 'undefined') {
				if(index > str.length-1) return str;
				return str.substr(0,index) + chr + str.substr(index+1);
			}
		}

		function checkBig(unit) {
			if (typeof unit.colBox !== 'undefined') {
				for (var j = 1; j < unit.colBox[1] + 1; j++) {
					for (var i = 0; i < unit.colBox[0]; i++) {
						setCharAt();
						vm.currentLevel.ascii[unit.position[1] - j] = setCharAt(vm.currentLevel.ascii[unit.position[1] - j], unit.position[0] + i, ' ');
						vm.currentLevel.ascii[unit.position[1] - j] = setCharAt(vm.currentLevel.ascii[unit.position[1] - j], unit.position[0] - i, ' ');
					}
				}
			}
		}
		vm.count = 0;
		function levelLoop() {
			var dead = false;
			vm.count = vm.count + 1;
			// createEnemy();
			for (var i = 0; i < vm.unitArray.length; i++) {
				vm.unitArray[i].collisionCheck(vm.currentLevel.ascii, vm.unitArray);
				if (!vm.unitArray[i].alive) {
					addMessage(vm.unitArray[i].deathMessage);
					checkBig(vm.unitArray[i]);
					var newArray = [];
					for (var j = 0; j < vm.unitArray.length; j++) {
						if (j !== i) {
							newArray.push(vm.unitArray[j]);
						}
						else {
							updateMap(vm.unitArray[i].position, vm.unitArray[i].positionOld, vm.currentLevel.ascii, ' ', vm.unitArray[i].prevCheck);
							dead = true;
						}
					}
					vm.unitArray = newArray;
				}
				if (typeof vm.unitArray[i] !== 'undefined') {
					updateMap(vm.unitArray[i].position, vm.unitArray[i].positionOld, vm.currentLevel.ascii, vm.unitArray[i].symbol, vm.unitArray[i].prevCheck);
				}
				vm.currentEnemy = enemyService.currentEnemy;
				vm.player.healthUpdate();
			}
			$timeout(levelLoop, 125);
		}

		activate();

		////////////////

		function activate() {
			levelLoop();
		}
	}
})();