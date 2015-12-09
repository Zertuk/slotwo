(function() {
	'use strict';

	angular
		.module('app.level')
		.controller('LevelController', LevelController);

	LevelController.$inject = ['levelService', 'playerService', 'enemyService', '$scope', '$timeout', 'messageService', 'progressService'];

	/* @ngInject */
	function LevelController(levelService, playerService, enemyService, $scope, $timeout, messageService, progressService) {
		var vm = this;
		vm.title = 'LevelController';

		vm.currentLevel = levelService.treeOne;
		vm.currentLevel.checkLength();
		vm.player = playerService.player;
		vm.enemySpawn = false;
		vm.messageLog = messageService.messageLog;
		vm.mainMessage = messageService.mainMessage;

		//sets everything to default when called
		vm.resetLevel = function() {
			vm.currentLevel = levelService.currentLevel;
			specialEnd();
			vm.unitArray = [playerService.player];
			vm.player.active = true;
			createAscii();
			initLevel();
			var spawn = [];
			spawn[0] = vm.currentLevel.playerSpawn[0];
			spawn[1] = vm.currentLevel.playerSpawn[1];
			vm.player.position = spawn;
		}
		vm.resetLevel();

		//used for levels that end early
		function specialEnd() {
			if (vm.currentLevel.specialEnd) {
				vm.player.specialEnd = vm.currentLevel.specialEnd;
			} else {
				vm.player.specialEnd = undefined;
			}
		}

		//init level
		function initLevel() {
			//runs if enemies are immobile and spawn at start, like the trees lvl 1
			if (typeof vm.currentLevel.spawnAtStart != 'undefined') {
				for (var i = 0; i < vm.currentLevel.spawnAtStart.length; i++) {
					spawnEnemyAtStart(vm.currentLevel.spawnAtStart[i]);
				}
			}
			//otherwise default spawn is on
			else {
				vm.enemySpawn = true;
			}
		}

		function createAscii() {
			var ascii = [];
			for (var i = 0; i < vm.currentLevel.defaultAscii.length; i++) {
				ascii[i] = vm.currentLevel.defaultAscii[i];
			}
			console.log(vm.currentLevel.defaultAscii);
			vm.currentLevel.ascii = ascii;
			levelRenderArea();
		}

		//moves level to left after certain distance has been travelled
		function levelRenderArea() {
			var length = vm.currentLevel.ascii[0].length;
			if (vm.player.position[0] > 50 && vm.player.position[0] < length - 50) {
				var left = (vm.player.position[0] - 50)*8;
				var elem = document.getElementById('levelwrap');
				elem.style.left = '-' + left + 'px';
			}
		}

		//function for default spawning, runs if rng works
		var enemyCount = 0;
		function createEnemy() {
			var random = Math.round(Math.random()*100);
			if ((random > vm.currentLevel.spawnChance) && (enemyCount < vm.currentLevel.enemyMax)) {
				enemyCount = enemyCount + 1;
				var random = Math.floor(Math.random()*vm.currentLevel.enemyArray.length);
				var unit = new vm.currentLevel.enemyArray[random];
				var spawn = [];
				spawn[0] = vm.currentLevel.enemySpawn[0];
				spawn[1] = vm.currentLevel.enemySpawn[1];
				unit.position = spawn;
				vm.unitArray.push(unit);
			}
		}

		//function for spawning immobile enemies at start of level
		function spawnEnemyAtStart(position) {
			var entity = new vm.currentLevel.enemyArray[0];
			var spawn = [];
			spawn[0] = position[0];
			spawn[1] = position[1];
			entity.position = spawn;
			vm.unitArray.push(entity);
		}

		//updates map when units move/die
		function updateMap(unit, unitOld, map, unitSymbol, prevCheck) {
			//checks if previous title unit was on is replaceable so it can replace with correct char
			if (!prevCheck) {
				map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
				map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
			}
			else {
				map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
				map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
			}
		}

		//sets character based on function arguments
		function setCharAt(str,index,chr) {
			if (typeof str !== 'undefined') {
				if(index > str.length-1) return str;
				return str.substr(0,index) + chr + str.substr(index+1);
			}
		}

		//if it has an extra collission box for large ascii art, delete the extra on death as well
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

		//kills unit that reach end
		function autoKill(unit) {
			if (unit.position[0] == 0) {
				unit.alive = false;
			}
		}

		//master loop for levels
		function levelLoop() {
			var dead = false;
			if (vm.player.active) {
				for (var i = 0; i < vm.unitArray.length; i++) {
					vm.unitArray[i].collisionCheck(vm.currentLevel.ascii, vm.unitArray);
					if (i > 0) {
						autoKill(vm.unitArray[i]);
					}
					if (!vm.unitArray[i].alive) {
						messageService.addMessage(vm.unitArray[i].deathMessage);
						checkBig(vm.unitArray[i]);
						enemyCount = enemyCount - 1;
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
				}
				if (vm.enemySpawn) {
					createEnemy();
				}
				levelRenderArea();
				$timeout(levelLoop, 125);
			}
			else if (vm.player.levelComplete) {
				if (vm.currentLevel.unlock) {
					progressService.progress.levels[vm.currentLevel.unlock] = true;
				}
			}
			else if (vm.player.levelComplete) {
				if (vm.currentLevel.unlock) {
					progressService.progress.levels[vm.currentLevel.unlock] = true;
				}
			}
		}

		activate();

		////////////////

		function activate() {
			levelLoop();
		}
	}
})();