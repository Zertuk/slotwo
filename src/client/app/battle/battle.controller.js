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



        vm.test2 = ["                                    ",
                    "------------------------------------"];


        vm.test3 = ["     /         \\   .^.               .'                          \\/                                                                                                  ",        
                    "      .'           './   \\    .'\\      /                            /                                                                                                ",
                    "    /               \\    \\ .'   \\    /                            /                                                                                                  ",
                    "  .'                      /      '../               //\\\\        .'                                                                                                   ",
                    " /                 .     /         /               ///\\\\\\    . /                                                                                                     ",
                    "/      ^           T    /                        /////\\\\\\\\   T       ^                                                                                               ",
                    "   ^   T    .    ^               .       ^      //////\\\\\\\\\\      .   T                                                                                               ",
                    "   T        T    T     ^     .   T       T  //////////\\\\\\\\\\\\\\\\\\  T            ^                                                                                      ",
                    "     / \\              / \\   / \\     / \\       /// -- /\\ -- \\\\\\                T                                                                                      ",
                    ".     |      / \\       |     |       |    ////////////\\\\\\\\\\\\\\\\\\\\\\     / \\                                                                                            ",
                    " \\            |             ^     .       ////////////\\\\\\\\\\\\\\\\\\\\\\\   . |    ^                                                                                        ",
                    " \\    / \\                  / \\   / \\        //////////\\\\\\\\\\\\\\\\\\\\    / \\    / \\                                                                                       ",
                    "| .   / \\  / \\   / \\      . |    / \\      //////////    \\\\\\\\\\\\\\\\\\    |      |                                                                                        ",
                    " / \\   |    |    / \\     / \\      |     //////// |        | \\\\\\\\\\\\\\\\ .      .                                                                                        ",
                    " /\ \   .          |     /   \\                   ,|   __   |.        / \\    / \\                                                                                       ",
                    "  |   / \\         .     /   \\      .        __.'_|  /__\\. | \\__     / \\    / \\                                                                                       ",
                    "^     / \\        / \\      |       / \\     ,'__.'.  \\ \\ / \\|__  \\,.   |    . |                                                                                        ",
                    " \\     |    /\\   / \\   .          / \\    .     / \\ / / / \\   \\___ \\      / \                                                                                         ",
                    " \\    ^    /  \\   |   / \\          |    / \\    / \\ \\/   |     ^  \\/      / \                                                                                         ",
                    "|    / \\   /  \\  .    / \\      ^        / \\     |            / \\      .   |  .^.                     .                                       ^                       ",
                    "     / \\    ||  / \\    |      / \\        |           .       / \\     / \\    /   \\                   / \\                                     / \                      ",
                    "      |         / \\          /   \\                  / \\       |     /   \\   /   \\                   / \\                                     / \                      ",
                    "                / \\          /   \\                  / \\             /   \\     |             _________|___________         --------------  ___|_                      ",
                    "_________________|_____________|_____________________|________________|___________----------------------------------------              ----------                   ",
                    "------------------------------------------------------------------------------------                                                                -----------------"];





        // x, y
        var player = [0, 0];
        var playerOld = [0, 0];
        var grounded = false;

        function updatePosition(unit, unitOld, x, y) {
            unitOld[0] = unit[0];
            unitOld[1] = unit[1];
            unit[1] = unit[1] + y;
            unit[0] = unit[0] + x;
        }
        var testage = false;
        function updateMap(unit, unitOld, map, unitSymbol, prevCheck) {
            if (!prevCheck) {
                map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
                map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
            }
            else {
                map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
                map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
                testage = '2';
            }
        }

        function prevTile(unitOld, map) {
            map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
            testage = 3;
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

        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }

        function spawnEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 95) {
                console.log('hello');
            }

        }

        var Unit = function() {
            //combat
            this.collisionCheck = function(map) {
                var current = this;
                if (current.alive) {
                    if (checkLevelEnd(current.position, map)) {
                        return;
                    }
                    if (current.grounded) {
                        current.grounded = false;
                        var groundedLastTurn = true;
                    }
                    if (current.prev) {
                        current.prevCheck = true;
                        current.prev = false;
                    }
                    else {
                        current.prevCheck = false;
                    }

                    //collission detection y
                    if ((map[current.position[1] + 1][current.position[0]] == ' ') && !current.prevCheck) {
                        updatePosition(current.position, current.positionOld, 0, 1);
                    }
                     //collision detection x
                    else if (map[current.position[1]][current.position[0] + current.speed] == ' ') {
                        updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    //collision detection with replacable tiles
                    else if (map[current.position[1]][current.position[0] + current.speed] == '_') {
                        current.prev = true;
                        updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    else if ((map[current.position[1]][current.position[0] + current.speed] == 'Y')) {
                        if (current.symbol == 'Y') {
                            var inCombat = false;
                            for (var i = 0; i < array.length; i++) {
                                if ((map[current.position[1]][current.position[0] + current.speed]) == (array[i].symbol)) {
                                    inCombat = true;
                                }
                            }
                            if (!inCombat) {
                                updatePosition(current.position, current.positionOld, current.speed, -1);
                            }
                        }
                        else {
                            battle(player, current, map);
                            var inCombat = true;
                        }
                    }
                    // else {
                    //     setTimeout(function() {
                    //         var wait = true;
                    //     }, 1000);
                    // }
                    //move up and over if nothing else possible
                    else {
                        var cantMove = false;
                        for (var i = 0; i < array.length; i++) {
                            if (map[current.position[1]][current.position[0] + current.speed] == array[i].symbol) {
                                cantMove = true;
                            }
                        }
                        if (!cantMove) {
                            updatePosition(current.position, current.positionOld, current.speed, -1);                            
                        }
                    }
                    // if (current.prevCheck) {
                    //     console.log('test');
                    //     prevTile(current.positionOld, map);
                    // }
                    $scope.$apply();
                }   
                else {
                    return;
                }
            },
            this.ground = false,
            this.attackSpeed = 1,
            this.health = 10,
            this.maxHealth = 10,
            this.damage = 1,
            this.alive = true,
            //movement
            this.prev = false,
            this.prevCheck = false,
            this.speed = 1,
            this.position = [0, 0],
            this.positionOld = [0, 0],
            this.initPosition = function() {
                this.positionOld = this.position;
            },
            //other
            this.name = 'default',
            this.desc = 'default desc'
        };

        var Player = function Player() {
            this.position = [0, 0];
            this.positionOld = [0, 0];
            this.damage = 2,
            this.name = 'Player',
            this.symbol = 'Y',
            this.desc = 'This is you'
        };
        Player.prototype = new Unit();
        var player = new Player();

        var Enemy = function Enemy() {
            this.speed = -1,
            this.death = function(map) {
                if (this.health <= 0) {
                    this.alive = false;
                    this.itemDrop();
                    this.moneyDrop();
                    this.health = this.fullHealth;
                    // map[this.position[1]] = setCharAt(map[this.position[1]], this.position[0], '');
                    this.symbol = '';
                } 
            },
            this.itemDrop = function() {
                var random = Math.round(Math.random()*100);
                if (random <= this.itemChance) {
                }
            }
            this.moneyDrop = function() {
                var cash = Math.round(this.moneyMult * ( Math.random() + 1));
            }
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

        var Cat = function Cat() {
            this.name = 'Cat';
            this.symbol = 'C';
        }

        Cat.prototype = new Enemy();
        
        var snake = new Snake();
        snake.fullHealth = 20;
        snake.health = 20;
        snake.damage = 1;
        snake.name = 'Snake';
        snake.desc = "A scary snake";
        snake.symbol = 'S';
        snake.position = [30, 0];
        snake.positionOld = [30, 0];

        var snake2 = new Cat();
        snake2.position = [75, 0];
        snake2.positionOld = [75, 0];


        var Dog = function Dog() {
            this.name = 'Dog',
            this.symbol = 'D'
        };
        Dog.prototype = new Enemy();
        var dog = new Dog();
        dog.position = [100, 0];

        var Tree = function Tree() {
            this.name = "Tree",
            this.symbol = '|',
            this.move = false
        }
        Tree.prototype = new Enemy();
        var tree = new Tree();
        tree.position = [100, 10];

        var array = [player, tree];
        var array = [player];

        vm.level = {
            ascii: vm.test4,
            asciiOriginal: vm.test2,
            playerSpawn: [0, 0],
            enemySpawn: [30, 0],
            enemyArray: [Dog, Snake]
        }



        function spawnEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 80) {
                createEnemy();
            }
        }

        function createEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 50) {
                var test = new vm.level.enemyArray[0];
            } else {
                var test = new vm.level.enemyArray[1];
            }
            test.position = vm.level.enemySpawn;
            array.push(test);
        }


        function levelLoop() {
            var dead = false;
            spawnEnemy()
            for (var i = 0; i < array.length; i++) {
                array[i].collisionCheck(vm.test2);
                if (!array[i].alive) {
                    var newArray = [];
                    for (var j = 0; j < array.length; j++) {
                        if (j != i) {
                            newArray.push(array[j]);
                        }
                        else {
                            updateMap(array[i].position, array[i].positionOld, vm.test2, ' ', array[i].prevCheck);
                            dead = true;
                        }
                    }
                    array = newArray;
                }
                if (typeof array[i] !== 'undefined') {
                    updateMap(array[i].position, array[i].positionOld, vm.test2, array[i].symbol, array[i].prevCheck);
                }
            }
            setTimeout(levelLoop, 125);
        }
        levelLoop();


        activate();






        ////////////////

        function activate() {
        }
    }
})();