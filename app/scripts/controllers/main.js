'use strict';

/**
 * @ngdoc function
 * @name slotwoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slotwoApp
 */
angular.module('slotwoApp')
	.controller('MainCtrl', function ($scope, $interval) {
		var Item = function() {
			this.recipe = ['Uncraftable'],
			this.quant = 1,
			this.spawn = ['Craft'],
			this.effect = function() {
				console.log('you cant do that');
			},
			this.craft = function() {
				var recipe = [];
				var testAmt = 5;
				var err = 0;
				for (var i = 0; i < this.recipe.length; i++) {
					recipe[i] = this.recipe[i].split('-');
					if (recipe[i][1] > testAmt) {
						console.log('not enough items');
						err = err + 1;
					}
				}
				if (err === 0) {
					console.log('create');
					for (var i = 0; i < recipe.length; i++) {
						testAmt = testAmt - recipe[i][0];
					}
				}
			}
			this.use = function() {
				this.effect();
			},
			this.desc = 'No description ;-;',
			this.name = 'default'
		}

		//item initialization

		var grass   = new Item();
		grass.spawn = ['Forest'];
		grass.desc  = 'A bundle of grass';
		grass.name = 'Grass';


		var wood  = new Item();
		wood.desc = 'A slab of wood';
		wood.name = 'Wood';


		var campfire    = new Item();
		campfire.recipe = ['wood-2', 'grass-2'];
		campfire.desc   = 'A warm fire';
		campfire.name   = "Campfire";
		campfire.craft();

		var stick    = new Item();
		stick.recipe = ['wood-1'];
		stick.quant  = 5;
		stick.desc   = 'It used to be part of a log';
		stick.name   = "Stick";


		$scope.inventory = {
			grass: 0,
			wood: 0,
			stick: 0
		}
		$scope.base = {
			campfire: null,
			house: null
		}






	$scope.rotate = false;
	var hidden = true;

	$scope.dropDown = function() {
	  if (hidden) {
		$scope.drop = {"display": "block"};
		hidden = false;
	  }
	  else {
		$scope.drop = {"display": "none"};
		hidden = true;
	  }
	}





	var Monster = function() {
	  this.isPlayer = false,
	  this.armor =  0,
	  this.damage = 5,
	  this.armorPen = 0,
	  this.health = 30,
	  this.maxHealth = 100,
	  this.cashDrop = 1,
	  this.cashDropBase = 1,
	  this.lootTable = ['gold'],
	  this.alive = true,
	  this.cashDropCalculate = function() {
		var random = Math.random() + 1;
		this.cashDrop = this.cashDropBase + (random * this.cashDropBase);
	  },
	  this.damageDealtCall = function() {
		$scope.battle.damageDealth(this.monster, $scope.player);
	  };
	};

	var test = new Monster();
	test.cashDrop = 5;
	console.log(test);

	 var battle = {
	  'active': false,
	  damageDealt: function(unit, enemy) {
		var effectiveArmor = enemy.armor - unit.armorPen;
		if (effectiveArmor <= 0) {
		  effectiveArmor = 0;
		}
		var damage = unit.damage - effectiveArmor;
		return damage;
	  },
	  isDead: function(unit) {
		if (unit.health <= 0) {
		  unit.alive = false;
		  if (unit.isPlayer) {
			console.log('player is dead');
		  }
		  else {
			console.log('monster is dead');
		  }
		}
	  }
	};

	$scope.moves = {
	  'resourcesUsed': 0,
	  'damage': 5,
	  'name': 'Attack',
	  'description': 'This is a basic attack',
	  attack: function() {
		this.resourcesUsed = 0;
		this.damage = 5;
		this.name = "Attack"
	  },
	  fireball: function() {
		this.resourcesUsed = 10;
		this.damage = 10;
		this.name = "Fireball";
		this.description = "A fiery blast dealing small damage"
	  },
	  block: function() {
		this.resourcesUsed = 10;
		this.damage = 5;
		this.name = "Block";
		this.description = "Blocks half of the enemys next attac dealing minimal damage."
	  }
	}










	$scope.player = {
	  'isPlayer': true,
		'armor': 0,
	  'alive': true,
		'health': 75,
	  'maxHealth': 100,
		'damage': 5,
		'cash': 0,
	  'cashPerTick': 1,
	  moveOne: $scope.moves.attack,
	  moveTwo: $scope.moves.fireball,
	  'moveThree': $scope.moves.block,
	  cashUpdate: function() {
		this.cash = this.cash + this.cashPerTick;
	  },
	  damageDealtCall: function(currentMonster) {
		$scope.battle.damageDealth(this.player, currentMonster);
	  },
	  healthPercent: function() {
		var percent = (this.health / this.maxHealth)*100;
		return percent;
	  },
	  healthUpdate: function() {
		if (this.health < this.maxHealth) {
		  this.health = this.health + 1;

		  var percent = this.healthPercent();
		  if (percent > 65) {
			$scope.healthWidth = {'background-color': 'green', 'width': percent + '%'};
			console.log('green');
		  }
		  else if (40 < percent) {
			$scope.healthWidth = {'background-color': 'orange', 'width': percent + '%'};
			console.log('orange');
		  }
		  else {
			$scope.healthWidth = {'background-color': 'red', 'width': percent + '%'};
			console.log('red');
		  }
		}
	  }
	};

	$scope.player.moveTwo
	console.log($scope.moves.damage);

	var testX;
	var testY;

	function update()  {
	  $scope.player.cashUpdate();
	  $scope.player.healthUpdate();
	  if ($scope.rotate === true) {
		$scope.ascii.house = $scope.ascii.house2;
		$scope.rotate = false;
	  }
	  else {
		$scope.ascii.house = $scope.ascii.house1;
		$scope.rotate = true;
	  }
	}
	$interval(update, 1000);




	$scope.ascii = {};
	$scope.ascii.shopKeep = '                   \/\/\/\/^\\\\\\\\                     +\r\n                   + ^   ^ +                     |\r\n                  @ (o) (o) @                    |\r\n                   +   ^   +                     |\r\n                   +  ___  +                     |\r\n                    \\_____\/                      |\r\n                  ____+  +____                   |\r\n                 \/    \\__\/    \\                  |\r\n                \/              \\                 |\r\n               \/\\_\/+        +\\_\/\\                |\r\n              \/ \/  |        |  \\ \\               |\r\n             ( ^   |        |   ^ )              |\r\n+--------------+---+--------+---+----------------+\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n+------------------------------------------------+\r\n';
	$scope.ascii.level = '_ n ok';
	$scope.ascii.mainTitle = '   ____                    __   _     __     \r\n  \/ __\/__  ___ ________   \/ \/  (_)___\/ \/     \r\n _\\ \\\/ _ \\\/ _ `\/ __\/ -_) \/ \/__\/ \/ __\/ _ \\    \r\n\/___\/ .__\/\\_,_\/\\__\/\\__\/ \/____\/_\/\\__\/_\/\/_\/    \r\n   \/_\/____                        ___        \r\n     \/ __ \\__ _  ___ ___ ____ _  |_  |       \r\n    \/ \/_\/ \/  \' \\\/ -_) _ `\/ _ `\/ \/ __\/        \r\n    \\____\/_\/_\/_\/\\__\/\\_, \/\\_,_\/ \/____\/        \r\n                   \/___\/          ';

	$scope.ascii.house = $scope.ascii.house1;

	$scope.ascii.house1 = '                           (   )     )                     \r\n                                                           \r\n                                                           \r\n                          (     )                          \r\n                             )                   \/\\        \r\n                            (                   \/  \\  \/\\   \r\n                    ________[_]________      \/\\\/    \\\/  \\  \r\n           \/\\      \/\\        ______    \\    \/   \/\\\/\\  \/\\\/\\ \r\n          \/  \\    \/\/_\\       \\    \/\\    \\  \/\\\/\\\/    \\\/    \\\r\n   \/\\    \/ \/\\\/\\  \/\/___\\       \\__\/  \\    \\\/                \r\n  \/  \\  \/\\\/    \\\/\/_____\\       \\ +[]+     \\                \r\n \/\\\/\\\/\\\/       \/\/_______\\       \\+__+      \\               \r\n\/      \\      \/XXXXXXXXXX\\                  \\              \r\n        \\    \/_I_II  I__I_\\__________________\\             \r\n               I_I+  I__I_____[]_+_[]_____I                \r\n               I_II  I__I_____[]_+_[]_____I                \r\n               I II__I  I     XXXXXXX     I                \r\n            ~~~~~\"   \"~~~~~~~~~~~~~~~~~~~~~~~~             \r\n';
	$scope.ascii.house2 = '                       (   )     \n                          \r\n                         (                                 \r\n                          (  )                             \r\n                               )                 \/\\        \r\n                            (                   \/  \\  \/\\   \r\n                    ________[_]________      \/\\\/    \\\/  \\  \r\n           \/\\      \/\\        ______    \\    \/   \/\\\/\\  \/\\\/\\ \r\n          \/  \\    \/\/_\\       \\    \/\\    \\  \/\\\/\\\/    \\\/    \\\r\n   \/\\    \/ \/\\\/\\  \/\/___\\       \\__\/  \\    \\\/                \r\n  \/  \\  \/\\\/    \\\/\/_____\\       \\ +[]+     \\                \r\n \/\\\/\\\/\\\/       \/\/_______\\       \\+__+      \\               \r\n\/      \\      \/XXXXXXXXXX\\                  \\              \r\n        \\    \/_I_II  I__I_\\__________________\\             \r\n               I_I+  I__I_____[]_+_[]_____I                \r\n               I_II  I__I_____[]_+_[]_____I                \r\n               I II__I  I     XXXXXXX     I                \r\n            ~~~~~\"   \"~~~~~~~~~~~~~~~~~~~~~~~~             \r\n';
 


	   $scope.ascii.testing = [
"Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ",
"‡                                                                          ‡‡‡‡‡‡",
"‡‡                                                                          ‡‡‡‡‡",
"‡‡                               ______       /////  /////                   ‡‡‡ ",
"‡‡                              /-\\\\\\\\\\\\     /////  /////                   ‡‡‡  ",
"‡‡‡                             |H|____|    /////  /////                  ‡‡‡    ",
"‡‡‡                                                                     ‡‡‡      ",
" ‡‡‡                                                                  ‡‡‡        ",
"  ‡‡‡‡                                                                ‡‡‡        ",
"     ‡‡‡‡‡                                                          ‡‡‡          ",
"        ‡‡‡‡‡‡                                                 ‡‡‡‡‡‡            ",
"            ‡‡‡‡                                              ‡‡‡                ",
"               ‡‡‡‡                                        ‡‡‡                   ",
"                 ‡‡‡‡‡‡‡‡‡                           ‡‡‡‡‡‡‡‡                    ",
"                    ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡\\O/‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡                       "];

	function makeArray(rows, cols) {
	  var asciiArray = [];
	  for (var i = 0; i < rows; i++) {
		asciiArray.push([]);
	  }
	  for (var i = 0; i < rows; i++) {
		for (var j = asciiArray[i].length; j < cols; j++) {
		  if (i == rows - 1) {
			asciiArray[i].push('_');
		  }
		  else {
			asciiArray[i].push("'");
		  }
		}
	  }
	  asciiArray[rows - 2][4] = 'Y';
	  testX = 4;
	  testY = rows - 2;
	  console.log(asciiArray);
	  $scope.testArray = asciiArray;
	}

	$scope.move = function() {
	  //up
	  $scope.testArray[testY][testX] = "'";
	  $scope.testArray[testY - 1][testX] = 'Y';

	}

	// document.onkeydown = function(e) {
	//     e = e || window.event;
	//     switch(e.which || e.keyCode) {
	//         case 37: // left
	//           console.log('left');
	//           if ($scope.testArray[testY][testX - 1] == "'") {
	//             $scope.testArray[testY][testX] = "'";
	//             $scope.testArray[testY][testX - 1] = "Y";
	//             testX = testX - 1;
	//           }
	//           else {
	//             console.log('cnat move that way')
	//           }
	//           break;

	//         case 38: // up
	//           console.log('up');
	//           if ($scope.testArray[testY - 1][testX] == "'") {
	//             $scope.testArray[testY][testX] = "'";
	//             $scope.testArray[testY - 1][testX] = "Y";
	//             testY = testY - 1;
	//           }
	//           else {
	//             console.log('cnat move that way')
	//           }
	//           break;

	//         case 39: // right
	//           console.log('right');
	//           if ($scope.testArray[testY][testX + 1] == "'") {
	//             $scope.testArray[testY][testX] = "'";
	//             $scope.testArray[testY][testX + 1] = "Y";
	//             testX = testX + 1;
	//           }
	//           else {
	//             console.log('cnat move that way')
	//           }
	//           break;

	//         case 40: // down
	//           console.log('down');
	//           if ($scope.testArray[testY + 1][testX] == "'") {
	//             $scope.testArray[testY][testX] = "'";
	//             $scope.testArray[testY + 1][testX] = "Y";
	//             testY = testY + 1;
	//           }
	//           else {
	//             console.log('cnat move that way')
	//           }
	//           break;

	//         default: return; // exit this handler for other keys
	//     }
	//     e.preventDefault(); // prevent the default action (scroll / move caret)
	// };

	makeArray(11,120);
	$scope.textBoxArray = function(input) {
	  $scope.textbox[3] = $scope.textbox[2];
	  $scope.textbox[2] = $scope.textbox[1];
	  $scope.textbox[1] = $scope.textbox[0];
	  $scope.textbox[0] = input;
	}








	$scope.makeLevel = function() {
	  $scope.levelArray = new Array();
	  var j = 0;
	  for (var i = 0; i < $scope.ascii.level.length; i++) {
		var test = $scope.ascii.level[i][j] + $scope.ascii.level[i+1];
		if (test == 'n') {
		  j = j + 1;
		}
		else {
		  $scope.levelArray[i] = $scope.ascii.level[i]
		}
	  }
	   console.log($scope.levelArray);
	}
	$scope.makeLevel();

	$scope.textbox = ['hello', 'ok', 'no', 'yes'];
  });


  