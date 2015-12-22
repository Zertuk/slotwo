(function() {
    'use strict';

    angular
        .module('app.enemy')
        .service('enemyService', enemyService);


    enemyService.$inject = ['inventoryService', '$timeout', 'messageService'];



    /* @ngInject */
    function enemyService(inventoryService, $timeout, messageService) {
        var count = 0;
        var vm = this;
        vm.watch = false;
        vm.itemDictionary = inventoryService.itemDictionary;

        function battle(unit, enemy, map) {
            count = count + 1;
            vm.currentEnemy = enemy;
            vm.currentEnemy.percent = vm.currentEnemy.findHealthPercent();
            if (count % enemy.attackSpeed == 0) {
                var damageDealt = enemy.damage - (enemy.damage*unit.armorValue);
                unit.health = unit.health - damageDealt;
                unit.health = unit.health.toFixed(2);
            }
            if (count % unit.attackSpeed == 0) {
                enemy.health = enemy.health - unit.damage;
            }
            if (enemy.health <= 0) {
                vm.currentEnemy = '';
            }
            if (unit.health <= 0) {
                unit.alive = false;
                console.log('you have been slain');
                return;
            }
            enemy.death(map);
        }
        vm.Enemy = function() {
            this.ground = false,
            this.attackSpeed = 2,
            this.health = 10,
            this.maxHealth = 10,
            this.damage = 1,
            this.regularDamage = 1,
            this.alive = true,
            //movement
            this.move = true;
            this.prev = false,
            this.prevCheck = false,
            this.speed = -1,
            this.position = [0, 0],
            this.positionOld = [0, 0],
            this.itemMult = 1,
            this.test = false,
            this.inCombat = false,
            this.phases = false,
            this.phaseOne = false,
            this.phaseTwo = false,
            this.phaseThree = false,
            this.attackSpeedText = function() {
                if (this.attackSpeed === 2) {
                    return 'average';
                } 
                else if (this.attackSpeed > 2) {
                    return 'slow';
                }
                else if (this.attackSpeed < 2) {
                    return 'fast';
                }
            }
            this.findHealthPercent = function() {
                var percent = this.health / this.maxHealth;
                if (percent > 1) {
                    percent = 1;
                }
                this.phaseCheck(percent);
                return percent;
            },
            this.phaseCheck = function(percent) {
                percent = percent*100;
                if (this.phases) {
                    if (this.phaseOne) {
                        if (percent < 76) {
                            this.phaseOne = false;
                            this.phaseOneActivate();
                        }
                    }
                    else if (this.phaseTwo) {
                        if (percent < 51) {
                            this.phaseTwo = false;
                            this.phaseTwoActivate();
                        }
                    }
                    else if (this.phaseThree) {
                        if (percent < 26) {
                            this.phaseThree = false;
                            this.phaseThreeActivate();
                        }
                    }
                }
            };
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
                        var num = Math.round(this.itemMult * Math.random());
                        if (num === 0) {
                            num = 1;
                        }
                    }
                    else {
                        var num = 'some';
                    }
                    this.foundLoot = true;
                    this.lootMessage = 'You find ' + num + ' ' + this.items[0][0][1].name + '.';
                    if (num === 'some') {
                        num = 1;
                    }
                    if (this.items[0][0][1].lootOnce) {
                        console.log(this.items[0][1][1])
                        if (this.items[0][1][1] > 0) {
                            this.lootMessage = 'You find ' + this.items[0][0][1].name + '.';
                        }
                    }
                    else {
                        console.log('shouldnt run');
                        this.lootMessage = 'You find ' + num + ' ' + this.items[0][0][1].name + '.';
                        if (num === 'some') {
                            num = 1;
                        }
                        this.items[0][1][1] = this.items[0][1][1] + num;
                    }
                }
            },
            this.moneyDrop = function() {
                var cash = Math.round(this.moneyMult * ( Math.random() + 1));
            },
            //combat
            this.collisionCheck = function(map, enemyArray) {
                var current = this;
                if (current.alive && current.move) {
                    if ((map[current.position[1]][current.position[0] + current.speed] == 'Y') || current.inCombat) {
                        current.inCombat = true;
                    }
                    else {
                        console.log(map[current.position[1]][current.position[0] + current.speed])
                    }
                    if (current.checkLevelEnd(current.position, map)) {
                        return;
                    }
                    if (current.grounded) {
                        current.grounded = false;
                        var groundedLastTurn = true;
                    }
                    if (current.prev) {
                        if (!current.inCombat) {
                            current.prev = false;
                        }
                        current.prevCheck = true;
                    }
                    else {
                        current.prevCheck = false;
                    }
                    if ((map[current.position[1]][current.position[0] + current.speed] == 'Y')) {
                        if (current.symbol == 'Y') {
                            current.inCombat = false;
                            for (var i = 0; i < array.length; i++) {
                                if ((map[current.position[1]][current.position[0] + current.speed]) == (array[i].symbol)) {
                                    current.inCombat = true;
                                }
                            }
                            if (!current.inCombat) {
                                current.updatePosition(current.position, current.positionOld, current.speed, -1);
                            }
                        }
                        else {
                            vm.watch = true;
                            battle(enemyArray[0], current, map);
                            current.inCombat = true;
                        }
                    }
                    //collission detection y
                    else if ((map[current.position[1] + 1][current.position[0]] == ' ') && !current.prevCheck && !current.inCombat) {
                        current.updatePosition(current.position, current.positionOld, 0, 1);
                        console.log(current.inCombat)
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
                    else if (map[current.position[1] + 1][current.position[0]] == '_') {
                        current.prev = true;
                        this.updatePosition(current.position, current.positionOld, 0, 1);
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

        this.Tree = function Tree() {
            this.name = 'Tree';
            this.deathMessage = 'A Tree has been chopped!';
            this.symbol = '|';
            this.move = false;
            this.maxHealth = 20;
            this.health = 200;
            this.colBox = [3, 4];
            this.items = [vm.itemDictionary['wood']];
            this.itemChance = 100;
            this.itemMult = 3;
            this.damage = 0;
        }
        this.Tree.prototype = new this.Enemy();

        this.Bear = function Bear() {
            this.name = 'Bear';
            this.desc = 'A Wandering Bear';
            this.deathMessage = '';
            this.symbol = 'B';
            this.items = [vm.itemDictionary['bearClaws']];
            this.itemChance = 5;
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 2;
        }
        this.Bear.prototype = new this.Enemy();

        this.Deer = function Deer() {
            this.name = 'Deer';
            this.desc = 'A Cute Deer';
            this.items = [vm.itemDictionary['deerAntlers']];
            this.itemChance = 25;
            this.deathMessage = '';
            this.symbol = 'D';
            this.maxHealth = 10;
            this.health = 10;
            this.damage = 1;
        }
        this.Deer.prototype = new this.Enemy();

        this.TreeWarrior = function TreeWarrior() {
            this.name = 'Treeperson Warrior';
            this.deathMessage = 'A Treeperson Warrior has been slain!';
            this.symbol = 'T';
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 2;
        }
        vm.TreeWarrior.prototype = new vm.Enemy();

        vm.Minotaur = function Minotaur() {
            this.name = 'Minotaur';
            this.deathMessage = 'The Minotaur has been defeated!';
            this.symbol = ',';
            this.maxHealth = 100;
            this.health = 100;
            this.damage = 1;
            this.regularDamage = 1;
            this.attackSpeed = 0.125;
            this.colBox = [15, 15];
            this.move = false;
            this.phases = true;
            this.phaseOne = true;
            this.phaseTwo = true;
            this.phaseThree = true;
            this.phaseActive = function(phase) {
                var thisEnemy= this;
                this.damage = 2;
                messageService.addMessage('The ' + this.name + ' has enraged, dealing extra damage for a few seconds!');
                $timeout(function() {
                    var phaseCheck = thisEnemy[phase];
                    if (phaseCheck) {
                        thisEnemy.damage = 1;
                    }
                }, 2000);

            }
            this.phaseOneActivate = function() {
                this.phaseActive('phaseTwo');
            };
            this.phaseTwoActivate = function() {
                this.phaseActive('phaseThree');
            };
            this.phaseThreeActivate = function() {
                this.phaseActive();
            };
        };
        vm.Minotaur.prototype = new vm.Enemy();
        









    }

})();