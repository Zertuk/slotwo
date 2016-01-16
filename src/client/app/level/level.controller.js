(function() {
	'use strict';

	angular
		.module('app.level')
		.controller('LevelController', LevelController);

	LevelController.$inject = ['levelService', 'playerService', 'enemyService', '$scope', '$timeout', 'messageService', 'progressService', 'inventoryService'];

	/* @ngInject */
	function LevelController(levelService, playerService, enemyService, $scope, $timeout, messageService, progressService, inventoryService) {
		var vm = this;
		vm.title = 'LevelController';

		vm.currentLevel = levelService.treeOne;
		vm.currentLevel.checkLength();
		vm.player = playerService.player;
		vm.enemySpawn = false;
		vm.mainMessage = messageService.mainMessage;
		vm.abilities = vm.player.abilities;
		vm.itemDictionary = inventoryService.itemDictionary;

		vm.activateAbility = function(ability) {
			var message = '';
			if (!vm.abilities[ability].active && vm.abilities[ability].cd === 0) {
				vm.abilities[ability].special();
				message = vm.abilities[ability].name + ' has been used.';
				messageService.updateMainMessage(message);
				var id = '#' + vm.abilities[ability].slug;
				var elem = id + ' .abilitybg';
				angular.element(elem).css('width', '100%');
				abilityTimer(ability, elem);
			}
			else if (vm.abilities[ability].cd > 0) {
				message = vm.abilities[ability].name + ' is on cooldown!';
				messageService.updateMainMessage(message, true)
			}
			else {
				message = vm.abilities[ability].name + ' already active!';
				messageService.updateMainMessage(message, true)
			}
		}

		function abilityTimer(ability, elem) {
			if (vm.abilities[ability].active) {
				vm.player.damage = vm.player.calculateTotalDamage();
				vm.player.armorValue = vm.player.calculateTotalArmor();
				if (vm.abilities[ability].timer > 0) {
					vm.abilities[ability].timer = vm.abilities[ability].timer - 1;
					var percent = (vm.abilities[ability].timer / vm.abilities[ability].max)*100;
					angular.element(elem).css('width', percent + '%');
					$timeout(function() {
						abilityTimer(ability, elem);
					}, 125);
				}
				else {
					angular.element(elem).css('width', '0%');
					vm.abilities[ability].timer = 0;
					vm.abilities[ability].active = false;
					abilityCooldown(ability, elem);
				}
			}
		}

		function abilityCooldown(ability, elem) {
			var cdMax = vm.abilities[ability].cdMax;
			vm.abilities[ability].cd = cdMax;
			angular.element(elem).addClass('abilitycooldown');
			abilityCooldownLoop(ability, elem);
		}

		function abilityCooldownLoop(ability, elem) {
			if (vm.abilities[ability].cd > 0) {
				vm.abilities[ability].cd = vm.abilities[ability].cd - 1;
				var percent = (vm.abilities[ability].cd / vm.abilities[ability].cdMax)*100;
				angular.element(elem).css('width', percent + '%');
				$timeout(function() {
					abilityCooldownLoop(ability, elem);
				}, 125);
			}
			else {
				vm.abilities[ability].cd = 0;
				angular.element(elem).removeClass('abilitycooldown');
				angular.element(elem).css('width', '0%');
			}
		}

		function resetAbilities() {
			vm.abilities.resetAbilities();
		}

		function prevReset() {
			vm.player.prev = false;
			vm.player.prevCheck = false;
		}

		//sets everything to default when called
		vm.resetLevel = function() {
			enemyService.currentEnemy = undefined;
			vm.currentLevel = levelService.currentLevel;
			prevReset();
			resetAbilities();
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
			messageService.emptyLog();
			resetRenderArea();
			//runs if enemies are immobile and spawn at start, like the trees lvl 1
			if (typeof vm.currentLevel.spawnAtStart != 'undefined') {
				for (var i = 0; i < vm.currentLevel.spawnAtStart.length; i++) {
					if (i + 1 === vm.currentLevel.spawnAtStart.length) {
						if (vm.currentLevel.enemyArray.length > 1) {
							spawnEnemyAtStart(vm.currentLevel.spawnAtStart[i], true);
						}
						else {
							spawnEnemyAtStart(vm.currentLevel.spawnAtStart[i]);
						}
					} else {
						spawnEnemyAtStart(vm.currentLevel.spawnAtStart[i]);
					}
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
			var width = window.innerWidth;
			var value = 50;
			if (width < 500) {
				value = 10;
			}
			else if (width < 1000) {
				value = 30;
			}
			if (vm.player.position[0] > value && vm.player.position[0] < length - value) {
				var left = (vm.player.position[0] - value)*8;
				var elem = document.getElementById('levelwrap');
				elem.style.left = '-' + left + 'px';
			}
		}

		function resetRenderArea() {
			var elem = document.getElementById('levelwrap');
			elem.style.left = 'auto';
		}

		//function for default spawning, runs if rng works
		var enemyCount = 0;
		function createEnemy() {
			var random = Math.round(Math.random()*100);
			if ((random > vm.currentLevel.spawnChance) && (enemyCount < vm.currentLevel.enemyMax)) {
				enemyCount = enemyCount + 1;
				var random = Math.floor(Math.random()*100);
				for (var i = 0; i < vm.currentLevel.unitSpawnChance.length; i++) {
					if (random < vm.currentLevel.unitSpawnChance[i]) {
						var unit = new vm.currentLevel.enemyArray[i];
						if (typeof vm.currentLevel.specialSpawn !== 'undefined') {
							if (vm.player.position[0] < vm.currentLevel.specialSpawn[0]) {
								var specialCheck = Math.floor(Math.random()*100);
								if (specialCheck < vm.currentLevel.specialSpawnChance) {
									regularSpawn(unit, 'specialSpawn');
								}
								else {
									regularSpawn(unit, 'enemySpawn');
								}
							}
							else {
								regularSpawn(unit, 'enemySpawn');
							}
						}
						else {
							console.log('special undefined');
							regularSpawn(unit, 'enemySpawn');
						}
						return;
					}
				}
			}
		}

		//spawn
		function regularSpawn(unit, type) {
			var spawn = [];
			spawn[0] = vm.currentLevel[type][0];
			spawn[1] = vm.currentLevel[type][1];
			unit.position = spawn;
			vm.unitArray.push(unit);
		}

		//function for spawning immobile enemies at start of level
		function spawnEnemyAtStart(position, extra) {
			var entity;
			if (extra) {
				entity = new vm.currentLevel.enemyArray[1];
			}
			else {
				entity = new vm.currentLevel.enemyArray[0];
			}
			var spawn = [];
			var currentTile = vm.currentLevel.ascii[position[1]][position[0]];
			if (currentTile === '_') {
				entity.prev = true;
				entity.prevCheck = true;
			}
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
			vm.messageLog = messageService.messageLog;
			vm.player.attackSpeed  = vm.player.weapon.attackSpeed;
			vm.player.damage = vm.player.calculateTotalDamage();
			vm.player.armorValue = vm.player.calculateTotalArmor();
			if (vm.player.active) {
				if (!vm.player.alive) {
					vm.player.alive = true;
					messageService.updateMainMessage('You have been slain.', true);
					return;
				}
				for (var i = 0; i < vm.unitArray.length; i++) {
					vm.unitArray[i].collisionCheck(vm.currentLevel.ascii, vm.unitArray);
					if (i > 0) {
						autoKill(vm.unitArray[i]);
					}
					if (!vm.unitArray[i].alive) {
						checkBig(vm.unitArray[i]);

						if (vm.unitArray[i].foundLoot) {
							var lootMessage = vm.unitArray[i].deathMessage + ' ' + vm.unitArray[i].lootMessage;
						}
						else {
							var lootMessage = vm.unitArray[i].deathMessage;
						}
						messageService.addMessage(lootMessage);


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
			else if (vm.player.levelComplete && vm.player.alive) {
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