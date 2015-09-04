(function () {
    'use strict';

    angular
        .module('app.battle')
        .controller('BattleController', BattleController);

    BattleController.$inject = ['$scope'];


    /* @ngInject */
    function BattleController($scope) {
        var vm = this;
        vm.count = 0;
        vm.level = [];

        vm.level = [' ', ' ', ' ', ' ', '_', 'S', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
                    '_', '_', '_', '_', '_', '_', '_', '_', '_', 'S', '_', '_', 'S', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'T']


        vm.test = [
        
        "           _______    ____                                                                             ",
        "-----------------------------\\                                                                                           ",
        "                              \\__                                                                                        ",
        "    __        ..         __      \\__        ..        __        __        ..        __--------------------------111111111",
        "                                    `--..--`  `--..--`  `--..--`  `--..--`  `--..--`  `                                   "
        ];

        vm.test2 = ["                                                                                                                                  ",
                    "                                                                                                                                  ",
                    "=================================================================================================================================="]
        // x, y
        var player = [0, 0];
        var playerOld = [0, 0];
        var grounded = false;
        console.log(player[1])

        function updatePosition(unit, unitOld, x, y) {
            unitOld[0] = unit[0];
            unitOld[1] = unit[1];
            unit[1] = unit[1] + y;
            unit[0] = unit[0] + x;
        }


        function updateMap(unit, unitOld, map, unitSymbol) {
            map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
            map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
        }

        function prevTile(unitOld, map) {
            map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
        }

        function checkLevelEnd(unit, map) {
            if (map[unit[1]].length <= unit[0]) {
                console.log('level end');
                return true;
            }
        }

        function battle(unit, enemy, map) {
            if (count % enemy.attackSpeed) {
                unit.health = unit.health = enemy.damage;
                console.log(unit.health);
            }
            if (count % unit.attackSpeed == 0) {
                enemy.health = enemy.health - unit.damage;
                console.log(enemy.health);
            }
            if (enemy.health <= 0) {
                console.log('enemy dead');

            }
            if (unit.health <= 0) {
                console.log('player dead');
            }
            enemy.death(map);
        }
        var count = 0;

        function collisionCheck(map, unit) {
            if (unit.alive) {
                count = count + 1;
                if (checkLevelEnd(unit.position, map)) {
                    return;
                }
                if (grounded) {
                    grounded = false;
                    var groundedLastTurn = true;
                }
                //collission detection y
                if ((map[unit.position[1] + 1][unit.position[0]] == ' ') && !unit.prevCheck) {
                    updatePosition(unit.position, unit.positionOld, 0, 1);
                }
                 //collision detection x
                else if (map[unit.position[1]][unit.position[0] + unit.speed] == ' ') {
                    updatePosition(unit.position, unit.positionOld, unit.speed, 0);
                }
                //collision detection with replacable tiles
                else if (map[unit.position[1]][unit.position[0] + unit.speed] == '_') {
                    unit.prev = true;
                    updatePosition(unit.position, unit.positionOld, unit.speed, 0);
                }
                else if (map[unit.position[1]][unit.position[0] + unit.speed] == 'Y') {
                    battle(player, unit, map);
                    var inCombat = true;
                }
                else {
                    setTimeout(function() {
                        var wait = true;
                    }, 1000);
                }
                //move up and over if nothing else possible
                // else {
                //     updatePosition(unit.position, unit.positionOld, unit.speed, -1);
                // }
                if (!inCombat) {
                    updateMap(unit.position, unit.positionOld, map, unit.symbol);
                }
                if (unit.prevCheck) {
                    prevTile(unit.positionOld, map);
                }
                if (unit.prev) {
                    unit.prevCheck = true;
                    unit.prev = false;
                }
                else {
                    unit.prevCheck = false;
                }
                $scope.$apply();
                setTimeout(function() {
                    collisionCheck(map, unit);
                }, 120);
            }
            else {
                return;
            }
        }


        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }
        var player = {
            alive: true,
            damage: 5,
            position: [0, 0],
            positionOld: [0, 0],
            speed: 1,
            symbol: 'Y',
            prev: false,
            prevCheck: false,
            attackSpeed: 3
        }


        var Unit = function() {
            //combat
            this.attackSpeed = 1;
            this.health = 10,
            this.maxHealth = 10,
            this.damage = 1,
            this.alive = true,
            //movement
            this.prev = false;
            this.prevCheck = false;
            this.speed = 1;
            this.position = [0, 0];
            this.positionOld = [0, 0];
            this.initPosition = function() {
                this.positionOld = this.position;
            },
            //other
            this.name = 'default',
            this.desc = 'default desc'
        };

        var Player = function Player() {
            this.name = 'Player',
            this.desc = 'This is you'
        };
        Player.prototype = new Unit();
        console.log(Player.name);
        

        var Enemy = function Enemy() {
            this.speed = -1
        };
        Enemy.prototype = new Unit();


        var Snake = function Snake() {
            this.fullHealth = 25;
            this.health = 25;
            this.damage = 1;
            this.name = 'Snake';
            this.desc = "A scary snake";
            this.symbol = 'S';
        };
        Snake.prototype = new Enemy();
        
        var snake = new Snake();
        console.log(snake);





        var Enemy = function() {
            this.attackSpeed = 1;
            this.big = false;
            this.yCollision = 0;
            this.xCollision = 0;
            this.enemy = true;
            this.prev = false,
            this.prevCheck = false,
            this.speed = -1;
            this.position = [90, 0];
            this.positionOld = [90, 0];
            this.fullHealth = 10;
            this.health = 10;
            this.damage = 1;
            this.name = 'Default Name';
            this.desc = "Default Description";
            this.symbol = 'DEF';
            this.move = true;
            this.moneyMult = 1;
            this.itemChance = 10;
            this.movetest = function() {
                collisionCheck(vm.test2, this);
            },
            this.itemDrop = function() {
                var random = Math.round(Math.random()*100);
                if (random <= this.itemChance) {
                    console.log('item dropped');
                }
            }
            this.moneyDrop = function() {
                var cash = Math.round(this.moneyMult * ( Math.random() + 1));
                console.log(cash);
            },
            this.moveInLevel = function() {
                for (var i = 0; i < vm.level.length; i++) {
                    if (vm.level[i] == this.symbol) {
                        if (vm.level[i - 1] == '_') {
                            vm.level[i - 1] = this.symbol;
                            vm.level[i] = '_';
                        }
                        else if (vm.level[i - 1] == 'Y') {
                            this.health = this.health - 5;
                            this.death();
                            this.itemDrop();
                            if (!this.alive) {
                                vm.level[i] = '_';
                                this.moneyDrop();
                                this.health = this.fullHealth;
                                this.alive = true;
                            }
                        }
                    }
                }
            }
            this.alive = true;
            this.death = function(map) {
                if (this.health <= 0) {
                    this.alive = false;
                    this.itemDrop();
                    this.moneyDrop();
                    this.health = this.fullHealth;
                    console.log(map[this.position[1]][this.position[0]])
                    map[this.position[1]] =  setCharAt(map[this.position[1]], this.position[0], '');
                    console.log(map[this.position[1]][this.position[0]]);
                } 
            }
        }
        var Test = function Test() {};
        Test.prototype = new Enemy();
        var test = new Test();
        console.log(test);
        
        test.big = true;
        test.symbol = '|';
        test.art = ['0.--. ',  
                    ' |  |`' ];

        function enemyArt(enemy) {
            for (var i = 0; i < enemy.art.length; i++) {
                var row = enemy.art[i].split("");
                for (var j = 0; j < row.length; j++) {
                    map[enemy[1]] =  setCharAt(map[enemy[1]], enemy[0], '');
                }
            }
        }


        test.position = [90, 1];
        test.positionOld = [90, 1];

        vm.test2[test.position[1]] = setCharAt(vm.test2[test.position[1]], vm.test2[0], test.art[1]);
        // vm.test2[test.position[1] - 1] = setCharAt(vm.test2[test.position[1]], vm.test2[0], test.art[0]);
        console.log(test.art[0]);
        var snake = new Enemy();
        snake.fullHealth = 25;
        snake.health = 25;
        snake.damage = 1;
        snake.name = 'Snake';
        snake.desc = "A scary snake";
        snake.symbol = 'S';

        var mushroom = new Enemy();
        mushroom.move = false;
        mushroom.health = 25;
        mushroom.damage = 1;
        mushroom.desc = 'Releases a poisonous aura';
        mushroom.symbol = "T";
        mushroom.position = [85, 0];
        mushroom.positionOld = [85, 0];

        activate();



        function moveInLevel() {
            var player = "Y";
            if (vm.level[vm.count + 1] == '_') {
                vm.level[vm.count + 1] = 'Y';
                vm.level[vm.count] = '_';
                vm.count = vm.count + 1;
            }
            if(!$scope.$$phase) {
                $scope.$apply();
            }
            snake.moveInLevel();
            mushroom.moveInLevel();
            setTimeout(moveInLevel, 500);
        }


        ////////////////

        function activate() {
            moveInLevel();
        }
    }
})();