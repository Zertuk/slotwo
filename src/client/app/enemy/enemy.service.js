(function() {
    'use strict';

    angular
        .module('app.enemy')
        .service('enemyService', enemyService);


    enemyService.$inject = ['inventoryService', '$timeout', 'messageService', 'progressService', 'resourcesService'];



    /* @ngInject */
    function enemyService(inventoryService, $timeout, messageService, progressService, resourcesService) {
        var count = 0;
        var vm = this;
        vm.watch = false;
        vm.progress = progressService.progress;
        vm.itemDictionary = inventoryService.itemDictionary;

        function battle(unit, enemy, map) {
            count = count + 1;
            vm.currentEnemy = enemy;
            vm.currentEnemy.percent = vm.currentEnemy.findHealthPercent();
            //higher attackspeed less attacks performed
            if (count % enemy.attackSpeed === 0) {
                var damageDealt = enemy.damage - (enemy.damage*unit.armorValue);
                unit.health = unit.health - damageDealt;
                unit.health = unit.health.toFixed(2);
            }
            if (count % unit.attackSpeed === 0) {
                enemy.health = enemy.health - unit.damage;
            }
            //kill current enemy
            if (enemy.health <= 0) {
                vm.currentEnemy = '';
            }
            //kill player
            if (unit.health <= 0) {
                unit.alive = false;
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
                    this.health = this.fullHealth;
                    // map[this.position[1]] = setCharAt(map[this.position[1]], this.position[0], '');
                    this.symbol = '';
                } 
            },
            this.itemDrop = function() {
                var random = Math.round(Math.random()*100);
                var cash = this.moneyDrop();
                resourcesService.resources.money = resourcesService.resources.money + cash;
                if (random <= this.itemChance&&this.items[0][1][1] === 0) {
                    this.lootMessage = 'You find [' + this.items[0][0][1].name + '] and ' + cash + ' gold.';
                    this.items[0][1][1] = 1;
                }
                else {
                    this.lootMessage = 'You find ' + cash + ' gold.';
                }
                this.foundLoot = true;
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
            this.moneyMult = 2;
            this.deathMessage = 'A Tree has been chopped!';
            this.symbol = '|';
            this.move = false;
            this.maxHealth = 10;
            this.health = 10;
            this.colBox = [3, 4];
            this.items = [vm.itemDictionary['bigHeavyWood']];
            this.itemChance = 75;
            this.damage = 0;
        };
        vm.Tree.prototype = new vm.Enemy();

        vm.Penguin = function Penguin() {
            this.name = 'Penguin';
            this.moneyMult = 1;
            this.deathMessage = '';
            this.symbol = 'P';
            this.maxHealth = '30';
            this.health = 30;
            this.items = [vm.itemDictionary['polarArmor']];
            this.itemChance = 50;
            this.damage = 10;
            this.attackSpeed = 1;
        };
        vm.Penguin.prototype = new vm.Enemy();

        vm.Bear = function Bear() {
            this.name = 'Bear';
            this.desc = 'A Wandering Bear';
            this.deathMessage = 'The Bear has died!';
            this.symbol = 'B';
            this.items = [vm.itemDictionary['bearClaws']];
            this.itemChance = 25;
            this.moneyMult = 30;
            this.maxHealth = 25;
            this.health = 25;
            this.damage = 15;
            this.attackSpeed = 5;
        };
        vm.Bear.prototype = new vm.Enemy();

        vm.Mantis = function Mantis() {
            this.name = 'Giant Mantis';
            this.desc = 'Pretty scary';
            this.deathMessage = 'The Giant Mantis has been squashed!';
            this.symbol = 'M';
            this.items = [vm.itemDictionary['mantisClaw']];
            this.itemChance = 10;
            this.maxHealth = 40;
            this.health = 40;
            this.damage = 10;
            this.attackSpeed = 2;
        };
        vm.Mantis.prototype = new vm.Enemy();

        vm.StickBug = function StickBug() {
            this.name = 'Giant Stick Bug';
            this.desc = 'AKA Walking Stick';
            this.deathMessage = 'A Giant Stick Bug has been snapped!';
            this.symbol = 'T';
            this.items = [vm.itemDictionary['bugExoskeleton']];
            this.itemChance = 10;
            this.maxHealth = 50;
            this.health = 50;
            this.damage = 10;
            this.attackSpeed = 3;
        };
        vm.StickBug.prototype = new vm.Enemy();

        vm.Yeti = function Yeti() {
            this.name = 'Abominable Snowman';
            this.symbol = 'A';
            this.desc = 'desc';
            this.items = [];
            this.deathMessage = '';
            this.move = false;
            this.damage = 15;
            this.attackSpeed = 3;
            this.health = 100;
            this.maxHealth = 100;
        }
        vm.Yeti.prototype = new vm.Enemy();

        vm.Alchemist = function Alchemist() {
            this.name = 'Unicorn Alchemist';
            this.symbol = 'E';
            this.desc = 'desc';
            this.items = [vm.itemDictionary['potionArmor']];
            this.itemChance = 25;
            this.deathMessage = '';
            this.damage = 1;
            this.health = 10;
            this.attackSpeed = 2;
        };
        vm.Alchemist.prototype = new vm.Enemy();

        vm.Unicorn = function Unicorn() {
            this.name = 'Unicorn';
            this.desc = 'desc';
            this.symbol = 'U';
            this.items = [vm.itemDictionary['unicornHorn']];
            this.itemChance = 0;
            this.damage = 1;
            this.health = 10;
            this.attackSpeed = 2;
        };
        vm.Unicorn.prototype = new vm.Enemy();

        vm.Gorilla = function Gorilla() {
            this.name = 'Desert Gorilla';
            this.desc = 'They come from under the sand!';
            this.deathMessage = 'A Desert Gorilla has been crushed!';
            this.symbol = 'G';
            this.items = [vm.itemDictionary['gorillaFoot']];
            this.moneyMult = 100;
            this.itemChance = 20;
            this.maxHealth = 50;
            this.health = 50;
            this.damage = 10;
            this.attackSpeed = 5;
        };
        vm.Gorilla.prototype = new vm.Enemy();

        vm.DustDevil = function DustDevil() {
            this.name = 'Dust Devil';
            this.desc = 'Sand Attack!';
            this.deathMessage = 'The Dust Devil was blown away!';
            this.symbol ='V';
            this.items = [vm.itemDictionary['pocketSand']];
            this.moneyMult = 50;
            this.itemChance = 10;
            this.maxHealth = 40;
            this.health = 40;
            this.damage = 5;
            this.attackSpeed = 3;
        };
        vm.DustDevil.prototype = new vm.Enemy();

        vm.Deer = function Deer() {
            this.name = 'Deer';
            this.desc = 'A Cute Deer';
            this.items = [vm.itemDictionary['deerAntlers']];
            this.deathMessage = 'A Deer has been killed.';
            this.itemChance = 50;
            this.moneyMult = 10;
            this.symbol = 'D';
            this.maxHealth = 10;
            this.health = 10;
            this.damage = 1;
            this.attackSpeed = 1;
        };
        vm.Deer.prototype = new vm.Enemy();

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
            this.deathMessage = 'The prisoners soul has been freed.';
            this.items = [vm.itemDictionary['ghostArmor']];
            this.itemChance = 20;
            this.symbol = '@';
            this.maxHealth = 15;
            this.health = 15;
            this.damage = 1;
            this.attackSpeed = 1;
            this.moneyMult = 70;
        };
        vm.Ghost.prototype = new vm.Enemy();

        vm.Robot = function Robot() {
            this.name = 'Robot';
            this.deathMessage = '';
            this.symbol = 'c';
            this.maxHealth = '1000';
            this.health = 1000;
            this.damage = 1;
            this.attackSpeed = 3;
            this.colBox = [15, 15];
            this.move = false;
            this.phases = true;
            this.phaseOne = true;
            this.phaseTwo = true;
            this.phaseThree = true;
            this.phaseOneActivate = function() {
                messageService.addMessage('"INITIALIZING REPAIR DRONES."');
                var thisEnemy = this;
                function heal() {
                    thisEnemy.health = thisEnemy.health + 50;
                    console.log(thisEnemy.health);
                    $timeout(function() {
                        heal();
                    }, 1000);
                }
                heal();
            },
            this.phaseTwoActivate = function() {
                messageService.addMessage('"TOUGH ENEMY DETECTED. INITIALIZING KILL RAY."');
                this.attackSpeed = 1;
            },
            this.phaseThreeActivate = function() {
                var count = 3;
                var thisEnemy = this;
                function selfDestructMessage(thisEnemy) {
                    messageService.addMessage('"CRITICAL DAMAGE. SELF DESTRUCT INITIALIZING IN ' + count + ' SECONDS"');
                    count = count - 1;
                    $timeout(function() {
                        //check if enemy is alive
                        if (typeof thisEnemy.alive !== 'undefined') {
                            if (count > 0) {
                                selfDestructMessage(thisEnemy);
                            }
                            else if (count === 0) {
                                selfDestructActivate(thisEnemy);
                            }
                        }
                    }, 1000);
                }
                function selfDestructActivate(thisEnemy) {
                    messageService.addMessage('"SELF DESTRUCT INTIALIZED. GOODBYE."');
                    thisEnemy.damage = 99999999999;
                    thisEnemy.health = 10;
                }
                selfDestructMessage(thisEnemy);

            }
        };
        vm.Robot.prototype = new vm.Enemy();

        vm.Minotaur = function Minotaur() {
            this.name = 'Minotaur';
            this.items = [vm.itemDictionary['minotaurHammer']];
            this.itemChance = 50;
            this.deathMessage = 'The Minotaur has been defeated!';
            this.symbol = ',';
            this.maxHealth = 500;
            this.health = 500;
            this.damage = 15;
            this.regularDamage = 15;
            this.attackSpeed = 10;
            this.colBox = [15, 15];
            this.move = false;
            this.phases = true;
            this.phaseOne = true;
            this.phaseTwo = true;
            this.phaseThree = true;
            this.phaseActive = function(phase) {
                var thisEnemy= this;
                this.damage = thisEnemy.regularDamage*2;
                messageService.addMessage('The ' + this.name + ' has enraged, dealing extra damage for a few seconds!');
                $timeout(function() {
                    var phaseCheck = thisEnemy[phase];
                    if (phaseCheck) {
                        thisEnemy.damage = thisEnemy.regularDamage;
                    }
                }, 3000);
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
            this.desc = 'Part snow, part man.';
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
            this.desc = 'Just a regular giant guy made of snow.';
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
                    if (vm.progress.hasSweater) {
                        messageService.addMessage('You stay toasty in your Winter Sweater!');
                    }
                    else {
                        thisEnemy.damage = 1000;
                        messageService.addMessage(thisEnemy.name + 's freezing attack is super cold!');
                    }
                }, 1500);
            };
        };
        vm.SnowmanBoss.prototype = new vm.Enemy();

    
        vm.keys = ['Tree', 'Minotaur', 'TreeWarrior', 'Bear', 'Deer', 'Snowman', 'SnowmanBoss'];
    }

})();