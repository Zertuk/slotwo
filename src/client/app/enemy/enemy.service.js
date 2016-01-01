(function() {
    'use strict';

    angular
        .module('app.enemy')
        .service('enemyService', enemyService);


    enemyService.$inject = ['inventoryService', '$timeout', 'messageService', 'progressService'];



    /* @ngInject */
    function enemyService(inventoryService, $timeout, messageService, progressService) {
        var count = 0;
        var vm = this;
        vm.watch = false;
        vm.progress = progressService.progress;
        vm.itemDictionary = inventoryService.itemDictionary;

        function battle(unit, enemy, map) {
            count = count + 1;
            vm.currentEnemy = enemy;
            vm.currentEnemy.percent = vm.currentEnemy.findHealthPercent();
            if (count % enemy.attackSpeed === 0) {
                var damageDealt = enemy.damage - (enemy.damage*unit.armorValue);
                unit.health = unit.health - damageDealt;
                unit.health = unit.health.toFixed(2);
            }
            if (count % unit.attackSpeed === 0) {
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
            this.move = true,
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
            this.moneyMult = 1,
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
            },
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
            },
            this.battleCheck = function(enemyArray, current, map) {
                if ((map[current.position[1]][current.position[0] + current.speed] === 'Y')) {
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
                var cash = this.moneyDrop();
                this.lootMessage ='You find ' + cash + ' gold.';
                if (random <= this.itemChance) {
                    var num;
                    if (this.itemMult > 1) {
                        num = Math.round(this.itemMult * Math.random());
                        if (num === 0) {
                            num = 1;
                        }
                    }
                    else {
                        num = 'some';
                    }
                    this.foundLoot = true;
                    this.lootMessage = 'You find ' + num + ' ' + this.items[0][0][1].name + ' and ' + cash + ' gold.';
                    if (num === 'some') {
                        num = 1;
                    }
                    if (this.items[0][0][1].lootOnce) {
                        if (this.items[0][1][1] > 0) {
                            this.lootMessage = 'You find ' + this.items[0][0][1].name + ' and ' + cash + ' gold.';
                        }
                    }
                    else {
                        this.lootMessage = 'You find ' + num + ' ' + this.items[0][0][1].name + ' and ' + cash + ' gold.';
                        if (num === 'some') {
                            num = 1;
                        }
                        this.items[0][1][1] = this.items[0][1][1] + num;
                    }
                }
            },
            this.moneyDrop = function() {
                var cash = Math.round(this.moneyMult * ( Math.random() + 1));
                return cash;
            },
            //combat
            this.collisionCheck = function(map, enemyArray) {
                var current = this;
                if (current.alive && current.move) {
                    if ((map[current.position[1]][current.position[0] + current.speed] === 'Y') || current.inCombat) {
                        current.inCombat = true;
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
                    if ((map[current.position[1]][current.position[0] + current.speed] === 'Y')) {
                        if (current.symbol === 'Y') {
                            current.inCombat = false;
                            for (var i = 0; i < array.length; i++) {
                                if ((map[current.position[1]][current.position[0] + current.speed]) === (array[i].symbol)) {
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
                    else if ((map[current.position[1] + 1][current.position[0]] === ' ') && !current.prevCheck && !current.inCombat) {
                        current.updatePosition(current.position, current.positionOld, 0, 1);
                    }
                     //collision detection x
                    else if (map[current.position[1]][current.position[0] + current.speed] === ' ') {
                        this.updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    //collision detection with replacable tiles
                    else if (map[current.position[1]][current.position[0] + current.speed] === '_') {
                        current.prev = true;
                        this.updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    else if (map[current.position[1] + 1][current.position[0]] === '_') {
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
                            if (map[current.position[1]][current.position[0] + current.speed] === enemyArray[i].symbol) {
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
        };

        vm.Tree = function Tree() {
            this.name = 'Tree';
            this.deathMessage = 'A Tree has been chopped!';
            this.symbol = '|';
            this.move = false;
            this.maxHealth = 20;
            this.health = 20;
            this.colBox = [3, 4];
            this.items = [vm.itemDictionary['wood']];
            this.itemChance = 100;
            this.itemMult = 3;
            this.damage = 0;
        };
        vm.Tree.prototype = new vm.Enemy();

        vm.Bear = function Bear() {
            this.name = 'Bear';
            this.desc = 'A Wandering Bear';
            this.deathMessage = '';
            this.symbol = 'B';
            this.items = [vm.itemDictionary['bearClaws']];
            this.itemChance = 5;
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 10;
            this.attackSpeed = 5;
        };
        vm.Bear.prototype = new vm.Enemy();

        vm.Mantis = function Mantis() {
            this.name = 'Giant Mantis';
            this.desc = '';
            this.deathMessage = '';
            this.symbol = 'M';
            this.items = [];
            this.itemChance = 5;
            this.maxHealth = 5;
            this.health = 5;
            this.damage = 5;
            this.attackSpeed = 5;
        };
        vm.Mantis.prototype = new vm.Enemy();

        vm.StickBug = function StickBug() {
            this.name = 'Giant Stick Bug';
            this.desc = '';
            this.deathMessage = '';
            this.symbol = '';
            this.items = [];
            this.itemChance = 5;
            this.maxHealth = 5;
            this.health = 5;
            this.damage = 5;
            this.attackSpeed = 5;
        };
        vm.StickBug.prototype = new vm.Enemy();

        vm.Gorilla = function Gorilla() {
            this.name = 'Desert Gorilla';
            this.desc = 'They come from under the sand!';
            this.deathMessage = '';
            this.symbol = 'G';
            this.items = [vm.itemDictionary['gorillaFoot']];
            this.itemChance = 20;
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 10;
            this.attackSpeed = 5;
        }
        vm.Gorilla.prototype = new vm.Enemy();

        vm.DustDevil = function DustDevil() {
            this.name = 'Dust Devil';
            this.desc = '';
            this.deathMessage = '';
            this.symbol ='V';
            this.items = [vm.itemDictionary['pocketSand']];
            this.itemChance = 10;
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 10;
            this.attackSpeed = 5;
        }
        vm.DustDevil.prototype = new vm.Enemy();

        vm.Deer = function Deer() {
            this.name = 'Deer';
            this.desc = 'A Cute Deer';
            this.items = [vm.itemDictionary['deerAntlers']];
            this.itemChance = 25;
            this.deathMessage = '';
            this.symbol = 'D';
            this.maxHealth = 10;
            this.health = 10;
            this.damage = 1;
            this.attackSpeed = 1;
        };
        this.Deer.prototype = new vm.Enemy();

        vm.TreeWarrior = function TreeWarrior() {
            this.name = 'Treeperson Warrior';
            this.deathMessage = 'A Treeperson Warrior has been slain!';
            this.symbol = 'T';
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 2;
        };
        vm.TreeWarrior.prototype = new vm.Enemy();

        vm.Ghost = function Ghost() {
            this.name = 'Ghost of a Prisoner';
            this.deathMessage = '';
            this.symbol = '@';
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 2;
        };
        vm.Ghost.prototype = new vm.Enemy();

        vm.Robot = function Robot() {
            this.name = 'Robot';
            this.deathMessage = '';
            this.symbol = 'c';
            this.maxHealth = '30';
            this.health = 30;
            this.damage = 2;
        };
        vm.Robot.prototype = vm.Enemy();

        vm.Minotaur = function Minotaur() {
            this.name = 'Minotaur';
            this.items = [vm.itemDictionary['minotaurHammer']];
            this.itemChance = 50;
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
            };
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

        vm.Snowman = function Snowman() {
            this.name = 'Snowman';
            this.desc = 'Part snow, part man.'
            this.items = [vm.itemDictionary['snowmanHat']];
            this.itemChance = 25;
            this.deathMessage = 'A Snowman has been turned to slush!';
            this.symbol = '(';
            this.damage = 1;
            this.attackSpeed = 2;
            this.colBox = [5, 3];
            this.move = false;
        };
        vm.Snowman.prototype = new vm.Enemy();

        vm.SnowmanBoss = function SnowmanBoss() {
            this.name = 'Gary the Snowman';
            this.desc = 'Just a regular giant guy made of snow.'
            this.items = [vm.itemDictionary['giantCarrot']];
            this.itemChance = 50;
            this.deathMessage = 'The Snowman Boss has been defeeated!';
            this.symbol = '\\';
            this.damage = 1;
            this.maxHealth = 30;
            this.health = 30;
            this.attackSpeed = 2;
            this.colBox = [20, 20];
            this.move = false;
            this.phases = true;
            this.phaseOne = true;
            this.phaseOneActivate = function() {
                var thisEnemy = this;
                messageService.addMessage(this.name + ' charges a freezing attack! Stay warm!');
                $timeout(function() {
                    if (vm.progress.items.winterSweater) {
                        messageService.addMessage('You stay toasty in your Winter Sweater!');
                    }
                    else {
                        thisEnemy.damage = 1000;
                        messageService.addMessage(thisEnemy.name + 's freezing attack is super cold!');
                    }
                }, 1500);
            };
        }
        vm.SnowmanBoss.prototype = new vm.Enemy();

    
        vm.keys = ['Tree', 'Minotaur', 'TreeWarrior', 'Bear', 'Deer', 'Snowman', 'SnowmanBoss'];
    }

})();