(function() {
    'use strict';

    angular
        .module('app.player')
        .service('playerService', playerService);


    playerService.$inject = ['inventoryService', 'messageService', 'progressService'];

    /* @ngInject */
    function playerService(inventoryService, messageService, progressService) {

        ////////////////
        var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;
        vm.progress = progressService.progress;
        this.Player = function() {
            this.rest = function() {
                if (!this.active) {
                    this.health = this.maxHealth;
                    messageService.updateMainMessage('You feel well rested!');
                }
                else {
                    messageService.updateMainMessage('You cant rest right now!', true);
                }
            },
            this.abilities = {
                keys: ['berserk', 'block', 'heal'],
                berserk: {
                    name: 'Berserk',
                    slug: 'berserk',
                    text: 'Attacks deal double damage',
                    checkUnlock: function() {
                        return vm.progress.berserk;
                    },
                    active: false,
                    timer: 0,
                    max: 100,
                    cd: 0,
                    cdMax: 200,
                    special: function() {
                        this.timer = this.max;
                        this.active = true;
                    }
                },
                block: {
                    name: 'Block',
                    slug: 'block',
                    text: 'Blocks incoming damage',
                    checkUnlock: function() {
                        return vm.progress.shield;
                    },
                    active: false,
                    timer: 0,
                    max: 50,
                    cd: 0,
                    cdMax: 200,
                    special: function() {
                        this.timer = this.max;
                        this.active = true;
                    }
                },
                heal: {
                    name: 'Heal',
                    slug: 'heal',
                    text: 'Heals over few seconds',
                    checkUnlock: function() {
                        return vm.progress.healing;
                    },
                    active: false,
                    timer: 0,
                    max: 50,
                    cd: 0,
                    cdMax: 400,
                    special: function() {
                        this.timer = this.max;
                        this.active = true;
                    }
                },
                resetAbilities: function() {
                    for (var i = 0; i < this.keys.length; i++) {
                        this[this.keys[i]].active = false;
                        this[this.keys[i]].cd = 0;
                        this[this.keys[i]].timer = 0;
                    }
                }
            },
            this.findDPS = function() {
                var dps = this.damage*8/this.attackSpeed;
                return dps;
            },
            this.specialEnd = undefined,
            this.money = 1000,
            this.usePotion = function() {
                if (inventoryService.itemDictionary.potion[1][1] > 0) {
                    if (this.potionCD <= 0) {
                        var health = parseFloat(this.health);                
                        this.health = (health + this.maxHealth/2).toFixed(2);
                        inventoryService.itemDictionary.potion[1][1] = inventoryService.itemDictionary.potion[1][1] - 1;
                        this.potionCD = 300;
                        return true;
                    }
                    else {
                        messageService.updateMainMessage('Potions are on cooldown!', true);
                    }
                }
                else {
                    messageService.updateMainMessage('You have no potions.', true);
                }
            },
            this.potionCD = 0,
            this.healthPercent = function() {
                var percent = (this.health / this.maxHealth)*100;
                return percent;
            },
            this.checkMaxHealth = function() {
                if (this.health > this.maxHealth) {
                    this.health = this.maxHealth;
                }
            },
            this.healthRegen = function() {
                if (this.health < 0) {
                    this.health = 0;
                }
                if (this.health < this.maxHealth) {
                    var health = parseFloat(this.health);
                    this.health = (health + this.regen).toFixed(2);
                    //if healing ability active then extra hp regen
                    if (this.abilities.heal.active) {
                        health = parseFloat(this.health);
                        this.health = (health + (this.maxHealth * 0.25)).toFixed(2);
                    }
                }
                this.checkMaxHealth();
            },
            this.healthBarUpdate = function(enemy) {
                this.checkMaxHealth();
                var percent = this.healthPercent();
                if (percent > 65) {
                    this.healthWidth = {'background-color': 'green', 'width': percent + '%'};
                }
                else if (40 < percent) {
                    this.healthWidth = {'background-color': 'orange', 'width': percent + '%'};
                }
                else {
                    this.healthWidth = {'background-color': 'red', 'width': percent + '%'};
                }
            },
            this.updatePosition = function(unit, unitOld, x, y) {
                unitOld[0] = unit[0];
                unitOld[1] = unit[1];
                unit[1] = unit[1] + y;
                unit[0] = unit[0] + x;
            },
            this.prevTile = function(unitOld, map) {
                map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
            },
            this.endLevel = function() {
                messageService.addMessage('You have reached the end of the level');
                this.active = false;
                this.levelComplete = true;
                messageService.updateMainMessage('You finish the level.');
                return true;
            },
            this.checkLevelEnd = function(unit, map) {
                if (map[unit[1]].length <= unit[0]) {
                    this.endLevel();
                }
                else if (typeof this.specialEnd !== 'undefined') {
                    if (this.specialEnd <= unit[0]) {
                        this.endLevel();
                    }
                }
            },
            this.checkGrounded = function(current) {
                if (current.grounded) {
                    current.grounded = false;
                    return true;
                }
                else {
                    return false;
                }
            },
            this.prevCheckFunc = function(current) {
                if (current.prev) {
                    current.prevCheck = true;
                    current.prev = false;
                }
                else {
                    current.prevCheck = false;
                }
            },
            this.checkForEnemy = function(current, enemyArray, map) {
                current.inCombat = false;
                for (var i = 0; i < enemyArray.length; i++) {
                    if ((map[current.position[1]][current.position[0] + current.speed]) === (enemyArray[i].symbol)) {
                        current.inCombat = true;
                    }
                }
            },
            //needs rework
            this.collisionCheck = function(map, enemyArray) {
                var current = this;
                current.levelComplete = false;
                if (current.alive) {
                    current.checkLevelEnd(current.position, map);
                    var groundedLastTurn = current.checkGrounded(current);
                    var enemyLastTurn = false;
                    current.prevCheckFunc(current);
                    current.checkForEnemy(current, enemyArray, map);
                    //collission detection y
                    if (((map[current.position[1] + 1][current.position[0]] === ' ')||(map[current.position[1] + 1][current.position[0]] === '_')) && !current.prevCheck) {
                        current.updatePosition(current.position, current.positionOld, 0, 1);
                        //check for replaceable tiles when falling
                        if (map[current.position[1]][current.position[0]] === '_') {
                            current.prev = true;
                        }
                    }
                     //collision detection x
                    else if (map[current.position[1]][current.position[0] + current.speed] === ' ') {
                        if (current.prevCheck&&current.enemyLastTurn) {
                            current.prev = true;
                        }
                        current.updatePosition(current.position, current.positionOld, current.speed, 0);
                        //when enemy is killed on tile, space left over so prev breaks.
                        //need to check that prev was active last turn and enemy was active last turn
                    }
                    //collision detection with replacable tiles
                    else if (map[current.position[1]][current.position[0] + current.speed] === '_') {
                        current.prev = true;
                        current.updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    else if (current.inCombat) {
                        current.enemyLastTurn = true;
                        enemyLastTurn = true;
                        if (current.prevCheck) {
                            current.prev = true;
                        }
                    }
                    //move up and over if not in combat
                    else if (!current.inCombat) {
                        current.updatePosition(current.position, current.positionOld, current.speed, -1);                            
                    }
                    if (!enemyLastTurn) {
                        current.enemyLastTurn = false;
                    }
                }   
                else {
                    messageService.updateMainMessage('You have been slain.', true);
                    return;
                }
            },
            this.calculateTotalDamage = function() {
                this.attackSpeed = this.weapon.attackSpeed;
                var damage = this.weapon.damage;
                if (this.abilities.berserk.active) {
                    damage = this.weapon.damage*2;
                }
                if (inventoryService.statReset) {
                    this.armorCheck = false;
                    inventoryService.statReset = false;
                }
                if ((typeof this.armor.damageMult !== 'undefined') && (!this.armorCheck)) {
                    this.armorCheck = true;
                    inventoryService.stats.damageMult = this.armor.damageMult + inventoryService.stats.damageMult;
                }
                else if (!this.armorCheck) {
                    inventoryService.findVal();
                }
                damage = damage + inventoryService.stats.damage;
                damage = damage + damage*(inventoryService.stats.damageMult/100);
                return damage;
            },
            this.calculateTotalArmor = function() {
                var armor = this.armor.armor + inventoryService.stats.defense;
                armor = armor + armor*(inventoryService.stats.defenseMult/100);
                if (this.abilities.block.active) {
                    armor = 1;
                }
                return armor;
            },
            this.calculateTotalHealth = function() {
                var health = this.baseHealth + inventoryService.stats.health;
                health = health + health*(inventoryService.stats.healthMult/100);
                return health;
            },
            this.calculateTotalEvasion = function() {
                var evasion = inventoryService.stats.evade;
                return evasion;
            },
            this.trueSelf = function(self) {
                vm.itemDictionary[self][1][1] = 1;
            },
            this.armorCheck = false,
            this.inCombat = false,
            this.active = false,
            this.ground = false,
            this.evade = this.calculateTotalEvasion(),
            this.health = 10000,
            this.baseHealth = 10000,
            this.maxHealth = this.calculateTotalHealth(),
            this.regen = 1,
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
            this.position = [0, 0],
            this.positionOld = [0, 0],
            this.name = 'Player',
            this.symbol = 'Y',
            this.desc = 'This is you',
            //armor
            this.armor = vm.itemDictionary.clothArmor[0][1],
            this.armorValue = this.calculateTotalArmor(),

            //attack
            this.weapon = vm.itemDictionary.fists[0][1],
            this.damage = this.calculateTotalDamage(),
            this.attackSpeed = this.weapon.attackSpeed
        };
        this.player = new this.Player();
        this.player.calculateTotalDamage();
        this.player.calculateTotalHealth();
        this.player.calculateTotalArmor();
    }
})();