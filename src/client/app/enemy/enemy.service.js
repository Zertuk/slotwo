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
                var random;
                if (unit.evade > 0) {
                    random = Math.floor((Math.random()*100));
                }
                else {
                    random = 100;
                }
                if (random > unit.evade) {
                    var damageDealt = enemy.damage - (enemy.damage*unit.armorValue);
                    unit.health = unit.health - damageDealt;
                    unit.health = unit.health.toFixed(2);
                }
                else {
                    messageService.addMessage('You evade an attack thanks to your [Pocket Sand]!');
                }
            }
            if (count % unit.attackSpeed === 0) {
                enemy.health = enemy.health - unit.damage;
                enemy.health = enemy.health.toFixed(1);
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
            this.logSeen = function() {
                if (typeof vm.progress.enemies[this.slug] === 'undefined') {
                    vm.progress.enemies[this.slug] = 1;
                }
                else {
                    vm.progress.enemies[this.slug] = vm.progress.enemies[this.slug] + 1;
                }
            },
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
                    return true;
                }
            },
            this.death = function(map) {
                if (this.health <= 0) {
                    this.logSeen();
                    this.alive = false;
                    this.itemDrop();
                    this.health = this.fullHealth;
                    if (this.prevCheck) {
                        this.symbol = '_';
                    }
                    else {
                        this.symbol = '';
                    }
                } 
            },
            this.itemDrop = function() {
                var random = Math.round(Math.random()*100);
                var cash = this.moneyDrop();
                resourcesService.resources.money = resourcesService.resources.money + cash;
                if (random <= this.itemChance&&this.items[0][1][1] === 0) {
                    this.lootMessage = 'You find [' + this.items[0][0][1].name + '] and ' + cash + ' gold.';
                    this.items[0][1][1] = 1;
                    inventoryService.findVal();
                    vm.progress.looted[this.slug] = true;
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
                        vm.watch = true;
                        battle(enemyArray[0], current, map);
                        current.inCombat = true;
                    }
                    //collission detection y
                    else if (((map[current.position[1] + 1][current.position[0]] === ' ')||(map[current.position[1] + 1][current.position[0]] === '_'))&& !current.prevCheck && !current.inCombat) {
                        if (map[current.position[1] + 1][current.position[0]] === '_') {
                            current.prev = true;
                        }
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
                        current.prev = false;
                        this.updatePosition(current.position, current.positionOld, 0, 1);
                    }
                    //move up and over if nothing else possible
                    else {
                        var cantMove = false;
                        for (var i = 0; i < enemyArray.length; i++) {
                            if (map[current.position[1]][current.position[0] + current.speed] === enemyArray[i].symbol) {
                                cantMove = true;
                            }
                        }
                        if (current.prevCheck) {
                            current.prev = true;
                        }
                        if (!cantMove) {
                            current.prev = false;
                            this.updatePosition(current.position, current.positionOld, current.speed, -1);                            
                        }
                    }
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
            this.slug = 'Tree';
            this.desc = 'Just a Tree';
            this.moneyMult = 2;
            this.deathMessage = 'A Tree has been chopped!';
            this.symbol = '|';
            this.move = false;
            this.maxHealth = 10;
            this.health = 10;
            this.colBox = [3, 5];
            this.items = [vm.itemDictionary['bigHeavyWood']];
            this.itemChance = 75;
            this.damage = 0;
        };
        vm.Tree.prototype = new vm.Enemy();

        vm.Penguin = function Penguin() {
            this.name = 'Penguin';
            this.slug = 'Penguin';
            this.moneyMult = 1;
            this.deathMessage = 'A penguin has been demolished!';
            this.symbol = 'P';
            this.maxHealth = '60';
            this.health = 60;
            this.items = [vm.itemDictionary['polarArmor']];
            this.itemChance = 25;
            this.damage = 20;
            this.attackSpeed = 1;
            this.moneyMult = 500;
        };
        vm.Penguin.prototype = new vm.Enemy();

        vm.Bear = function Bear() {
            this.name = 'Bear';
            this.slug = 'Bear';
            this.desc = 'A Wandering Bear';
            this.deathMessage = 'The Bear has died!';
            this.symbol = 'B';
            this.items = [vm.itemDictionary['bearClaws']];
            this.itemChance = 25;
            this.moneyMult = 30;
            this.maxHealth = 30;
            this.health = 30;
            this.damage = 20;
            this.attackSpeed = 7;
        };
        vm.Bear.prototype = new vm.Enemy();

        vm.Mantis = function Mantis() {
            this.name = 'Giant Mantis';
            this.slug = 'Mantis';
            this.desc = 'Pretty scary';
            this.deathMessage = 'The Giant Mantis has been squashed!';
            this.symbol = 'M';
            this.items = [vm.itemDictionary['mantisClaw']];
            this.itemChance = 8;
            this.maxHealth = 60;
            this.health = 60;
            this.damage = 30;
            this.attackSpeed = 2;
            this.moneyMult = 200;
        };
        vm.Mantis.prototype = new vm.Enemy();

        vm.StickBug = function StickBug() {
            this.name = 'Giant Stick Bug';
            this.slug = 'StickBug';
            this.desc = 'AKA Walking Stick';
            this.deathMessage = 'A Giant Stick Bug has been snapped!';
            this.symbol = 'T';
            this.items = [vm.itemDictionary['bugExoskeleton']];
            this.itemChance = 8;
            this.maxHealth = 80;
            this.health = 80;
            this.damage = 20;
            this.attackSpeed = 3;
            this.moneyMult = 200;
        };
        vm.StickBug.prototype = new vm.Enemy();

        vm.Yeti = function Yeti() {
            this.name = 'Abominable Snowman';
            this.slug = 'Yeti';
            this.symbol = 'A';
            this.desc = 'desc';
            this.items = [vm.itemDictionary['abomItem']];
            this.itemChance = 35;
            this.deathMessage = 'The Yeti has went extinct!';
            this.move = false;
            this.damage = 50;
            this.attackSpeed = 3;
            this.health = 1000;
            this.maxHealth = 1000;
            this.moneyMult = 600;
        };
        vm.Yeti.prototype = new vm.Enemy();

        vm.King = function King() {
            this.name = 'Vampire King';
            this.slug = 'King';
            this.desc = 'Weak, but respected';
            this.deathMessage = 'The Vampire King has been dethroned!';
            this.move = false;
            this.symbol = 'K';
            this.desc = 'desc';
            this.items = [vm.itemDictionary['kingCrown']];
            this.itemChance = 50;
            this.damage = 5;
            this.health = 50;
            this.moneyMult = 300;
            this.maxHealth = 50;
            this.attackSpeed = 3;
        };
        vm.King.prototype = new vm.Enemy();

        vm.Vampire = function Vampire() {
            this.move = false;
            this.name = 'Vampire';
            this.slug = 'Vampire';
            this.desc = 'Dont get bit!';
            this.deathMessage = 'A Vampire has been staked!';
            this.symbol = 'V';
            this.items = [vm.itemDictionary['vampireTeeth']];
            this.itemChance = 20;
            this.damage = 50;
            this.health = 200;
            this.maxHealth = 200;
            this.moneyMult = 100;
            this.attackSpeed = 2;
        };
        vm.Vampire.prototype = new vm.Enemy();

        vm.Gorilla = function Gorilla() {
            this.name = 'Desert Gorilla';
            this.slug = 'Gorilla';
            this.desc = 'They come from under the sand!';
            this.deathMessage = 'A Desert Gorilla has been crushed!';
            this.symbol = 'G';
            this.items = [vm.itemDictionary['gorillaFoot']];
            this.moneyMult = 100;
            this.itemChance = 20;
            this.maxHealth = 50;
            this.health = 50;
            this.damage = 10;
            this.attackSpeed = 4;
        };
        vm.Gorilla.prototype = new vm.Enemy();

        vm.GorillaSnow = function GorillaSnow() {
            this.name = 'Snow Gorilla';
            this.slug = 'GorillaSnow';
            this.desc = 'Fuzzier than regular Gorillas';
            this.deathMessage = 'A Snow Gorilla has been stomped!';
            this.symbol = 'G';
            this.items = [vm.itemDictionary['frozenBanana']];
            this.moneyMult = 1000;
            this.itemChance = 20;
            this.maxHealth = 300;
            this.health = 300;
            this.damage = 50;
            this.attackSpeed = 4;
        };
        vm.GorillaSnow.prototype = new vm.Enemy();

        vm.Mammoth = function Mammoth() {
            this.name = 'Mini Mammoth';
            this.slug = 'Mammoth';
            this.desc = 'Like a Mammoth, but smaller';
            this.deathMessage = 'A Mini Mammoth has collapsed!';
            this.symbol = 'M';
            this.items = [vm.itemDictionary['mammothFur']];
            this.moneyMult = 1000;
            this.itemChance = 25;
            this.maxHealth = 400;
            this.health = 400;
            this.damage = 75;
            this.attackspeed = 5;
        };
        vm.Mammoth.prototype = new vm.Enemy();

        vm.DustDevil = function DustDevil() {
            this.name = 'Dust Devil';
            this.slug = 'DustDevil';
            this.desc = 'Sand Attack!';
            this.deathMessage = 'The Dust Devil was blown away!';
            this.symbol ='V';
            this.items = [vm.itemDictionary['pocketSand']];
            this.moneyMult = 50;
            this.itemChance = 5;
            this.maxHealth = 40;
            this.health = 40;
            this.damage = 5;
            this.attackSpeed = 2;
        };
        vm.DustDevil.prototype = new vm.Enemy();

        vm.Deer = function Deer() {
            this.name = 'Deer';
            this.slug = 'Deer';
            this.desc = 'A Cute Deer';
            this.items = [vm.itemDictionary['deerAntlers']];
            this.deathMessage = 'A Deer has been killed.';
            this.itemChance = 35;
            this.moneyMult = 10;
            this.symbol = 'D';
            this.maxHealth = 15;
            this.health = 15;
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

        vm.Crab = function Crab() {
            this.move = false;
            this.name = 'Huge Crab';
            this.slug = 'Crab';
            this.deathMessage = 'RIP the crab is toast.';
            this.desc = 'Loves money';
            this.items = [vm.itemDictionary['moneyGenerator']];
            this.symbol = ';';
            this.moneyMult = 1500;
            this.maxHealth = 500;
            this.health = 500;
            this.damage = 50;
            this.colBox = [10, 5];
            this.attackSpeed = 4;
        };
        vm.Crab.prototype = new vm.Enemy();

        vm.Oyster = function Oyster() {
            this.move = false;
            this.name ='Oyster?';
            this.slug = 'Oyster';
            this.moneyMult = 100;
            this.symbol = 'o';
            this.desc = 'Or is it a Clam?!';
            this.deathMessage = 'An Oyster? has been shucked!';
            this.maxHealth = 100;
            this.health = 100;
            this.damage = 20;
        };
        vm.Oyster.prototype = new vm.Enemy();

        vm.Ghost = function Ghost() {
            this.name = 'Ghost of a Prisoner';
            this.slug = 'Ghost';
            this.desc = 'A lost soul';
            this.deathMessage = 'The prisoners soul has been freed.';
            this.items = [vm.itemDictionary['ghostArmor']];
            this.itemChance = 10;
            this.symbol = '@';
            this.maxHealth = 15;
            this.health = 15;
            this.damage = 1;
            this.attackSpeed = 1;
            this.moneyMult = 70;
        };
        vm.Ghost.prototype = new vm.Enemy();

        vm.Undead = function Undead() {
            this.name = 'Undead Husk';
            this.slug = 'undead';
            this.desc = '';
            this.deathMessage = 'An Undead Husk haas been destroyed!';
            this.items = [vm.itemDictionary['undeadItem']];
            this.itemChance = 10;
            this.symbol = 'U';
            this.damage = 50;
            this.attackSpeed = 2;
            this.health = 150;
            this.maxHealth = 150;
            this.moneyMult = 5000;
        };
        vm.Undead.prototype = new vm.Enemy();

        vm.Robot = function Robot() {
            this.name = 'Robot';
            this.slug = 'Robot';
            this.deathMessage = 'The Robot has been shutdown!';
            this.items = [vm.itemDictionary['robotArmor']];
            this.itemChance = 100;
            this.symbol = 'c';
            this.moneyMult = 5000;
            this.maxHealth = '3000';
            this.health = 3000;
            this.damage = 20;
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
                    thisEnemy.health = thisEnemy.health + 100;
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
                var count = 2;
                var thisEnemy = this;
                function selfDestructMessage(thisEnemy) {
                    messageService.addMessage('"CRITICAL DAMAGE. SELF DESTRUCT INITIALIZING IN ' + count + ' SECONDS"');
                    count = count - 1;
                    $timeout(function() {
                        //check if enemy is alive
                        if (thisEnemy.alive) {
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
                    thisEnemy.damage = 999999;
                    thisEnemy.health = 10;
                }
                selfDestructMessage(thisEnemy);

            }
        };
        vm.Robot.prototype = new vm.Enemy();

        vm.Minotaur = function Minotaur() {
            this.name = 'Minotaur';
            this.slug = 'Minotaur';
            this.desc = 'Smells of death';
            this.items = [vm.itemDictionary['minotaurHammer']];
            this.itemChance = 100;
            this.moneyMult = 250;
            this.deathMessage = 'The Minotaur has been defeated!';
            this.symbol = ',';
            this.maxHealth = 800;
            this.health = 800;
            this.damage = 20;
            this.regularDamage = 22;
            this.attackSpeed = 9;
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
                }, 3500);
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

        vm.Lich = function Lich() {
            this.name = 'The Lich';
            this.slug = 'The Lich';
            this.desc = '';
            this.items = [];
            this.itemChance = 0;
            this.deathMessage = '';
            this.symbol = '|';
            this.moneyMult = 25000;
            this.damage = 30;
            this.attackspeed = 2;
            this.colBox = [35, 25];
            this.move = false;
            this.health = 500;
            this.maxHealth = 500;
            this.playerWarp = false;
            this.spawnBuddies = false;
            this.phases = true;
            this.phaseOne = true;
            this.phaseTwo = true;
            this.phaseThree = true;
            this.phaseOneActivate = function() {
                this.playerWarp = true;
                messageService.addMessage('The Lich teleports you backwards and summons some friends!');
            };
            this.phaseTwoActivate = function() {
                var thisEnemy = this;
                var count = 2;
                this.powerBuild(count, thisEnemy);
            };
            this.powerBuild = function(count, thisEnemy) {
                if (thisEnemy.alive){
                    if (count > 0) {
                        thisEnemy.damage = 0;
                        messageService.addMessage('The Lich is building up energy...');
                        count = count - 1;
                        $timeout(function() {
                            thisEnemy.powerBuild(count, thisEnemy);
                        }, 1000);
                    }
                    else if (count === 0) {
                        thisEnemy.damage = 9;
                        messageService.addMessage('The Lich unleashes a huge attack!');
                        $timeout(function() {
                            thisEnemy.damage = 30;
                        }, 4000);
                    }
                }
            },
            this.phaseThreeActivate = function() {
                this.playerWarp = true;
                this.attackSpeed = 1;
                messageService.addMessage('The Lich teleports you backwards and summons some friends!');
            }
        };
        vm.Lich.prototype = new vm.Enemy();

        vm.Snowman = function Snowman() {
            this.name = 'Snowman';
            this.slug = 'Snowman';
            this.desc = 'Part snow, part man.';
            this.items = [vm.itemDictionary['snowmanHat']];
            this.itemChance = 25;
            this.deathMessage = 'A Snowman has been turned to slush!';
            this.moneyMult = 750;
            this.symbol = '(';
            this.damage = 30;
            this.attackSpeed = 2;
            this.colBox = [5, 3];
            this.move = false;
            this.health = 150;
            this.maxHealth = 150;
        };
        vm.Snowman.prototype = new vm.Enemy();

        vm.SnowmanBoss = function SnowmanBoss() {
            this.name = 'Gary the Snowman';
            this.slug = 'SnowmanBoss';
            this.moneyMult = 1500;
            this.desc = 'Just a regular giant guy made of snow.';
            this.items = [vm.itemDictionary['giantCarrot']];
            this.itemChance = 100;
            this.deathMessage = 'Gary the Snowman has been melted!';
            this.symbol = '\\';
            this.damage = 40;
            this.maxHealth = 2000;
            this.health = 2000;
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

        vm.keys = ['Tree', 'Deer', 'Bear', 'Gorilla', 'DustDevil', 'Ghost', 'Minotaur',
                   'Mantis', 'StickBug', 'Oyster', 'Crab', 'Penguin', 'Yeti',
                   'Snowman', 'SnowmanBoss', 'GorillaSnow', 'Mammoth', 'Robot', 'Lich'];
    }

})();