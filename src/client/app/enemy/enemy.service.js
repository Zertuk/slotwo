(function() {
    'use strict';

    angular
        .module('app.enemy')
        .service('enemyService', enemyService);


    enemyService.$inject = ['inventoryService'];



    /* @ngInject */
    function enemyService(inventoryService) {
        var count = 0;
        var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;

        function battle(unit, enemy, map) {
            if (count % enemy.attackSpeed) {
                unit.health = unit.health = enemy.damage;
            }
            if (count % unit.attackSpeed == 0) {
                enemy.health = enemy.health - unit.damage;
            }
            if (enemy.health <= 0) {
                console.log('enemy dead');

            }
            if (unit.health <= 0) {
                console.log('player dead');
            }
            enemy.death(map);
        }
        this.Enemy = function() {
            this.ground = false,
            this.attackSpeed = 1,
            this.health = 10,
            this.maxHealth = 10,
            this.damage = 1,
            this.alive = true,
            //movement
            this.move = true;
            this.prev = false,
            this.prevCheck = false,
            this.speed = -1,
            this.position = [0, 0],
            this.positionOld = [0, 0],
            this.itemMult = 1,
            this.battleCheck = function(enemyArray, current, map) {
                if ((map[current.position[1]][current.position[0] + current.speed] == 'Y')) {
                    battle(enemyArray, current, map);
                }
            },
            this.initPosition = function() {
                this.positionOld = this.position;
            },
            //other
            this.name = 'default',
            this.desc = 'default desc',
            //methods
            this.updatePosition = function(unit, unitOld, x, y) {
                unitOld[0] = unit[0];
                unitOld[1] = unit[1];
                unit[1] = unit[1] + y;
                unit[0] = unit[0] + x;
            },
            this.prevTile = function(unitOld, map) {
                map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
                testage = 3;
            },
            this.checkLevelEnd = function(unit, map) {
                if (map[unit[1]].length <= unit[0]) {
                    console.log('level end');
                    return true;
                }
            },
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
                    
                    if (this.itemMult > 1) {
                        var num = Math.round(this.itemMult * (Math.random() + 1));
                    }
                    else {
                        var num = 1;
                    }
                    console.log('you found ' + num + ' ' + this.items[0][0][1].name)
                    console.log(this.items[0][1][1]);
                    this.items[0][1][1] = this.items[0][1][1] + num;
                }
            },
            this.moneyDrop = function() {
                var cash = Math.round(this.moneyMult * ( Math.random() + 1));
            },
            //combat
            this.collisionCheck = function(map, enemyArray) {
                var current = this;
                count = count + 1;
                if (current.alive && current.move) {
                    if (this.checkLevelEnd(current.position, map)) {
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
                        this.updatePosition(current.position, current.positionOld, 0, 1);
                    }
                     //collision detection x
                    else if (map[current.position[1]][current.position[0] + current.speed] == ' ') {
                        this.updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    //collision detection with replacable tiles
                    else if (map[current.position[1]][current.position[0] + current.speed] == '_') {
                        current.prev = true;
                        this.updatePosition(current.position, current.positionOld, current.speed, 0);
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
                                this.updatePosition(current.position, current.positionOld, current.speed, -1);
                            }
                        }
                        else {
                            battle(enemyArray[0], current, map);
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
                        for (var i = 0; i < enemyArray.length; i++) {
                            if (map[current.position[1]][current.position[0] + current.speed] == enemyArray[i].symbol) {
                                cantMove = true;
                            }
                        }
                        if (!cantMove) {
                            this.updatePosition(current.position, current.positionOld, current.speed, -1);                            
                        }
                    }
                    // if (current.prevCheck) {
                    //     console.log('test');
                    //     prevTile(current.positionOld, map);
                    // }
                    // $scope.$apply();
                }
                else if (current.alive) {
                    this.battleCheck(enemyArray[0], current, map);
                }
                else {
                    return;
                }
            }
        }

        this.Cat = function Cat() {
            this.name = "Cat";
            this.symbol = 'C';
        }
        this.Cat.prototype = new this.Enemy();

        this.Tree = function Tree() {
            this.name = "Tree";
            this.symbol = '|';
            this.move = false;
            this.health = 5;
            this.colBox = [3, 4];
            this.items = [vm.itemDictionary['wood']];
            this.itemChance = 100;
            this.itemMult = 3;
        }
        this.Tree.prototype = new this.Enemy();









    }

})();