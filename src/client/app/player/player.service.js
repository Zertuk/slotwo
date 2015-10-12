(function() {
    'use strict';

    angular
        .module('app.player')
        .service('playerService', playerService);


    playerService.$inject = ['inventoryService'];

    /* @ngInject */
    function playerService(inventoryService) {

        ////////////////
        var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;
        console.log(vm.itemDictionary.club[0][1]);

        this.Player = function() {
            this.healthPercent = function() {
                var percent = (this.health / this.maxHealth)*100;
                return percent;
            },
            this.healthUpdate = function() {
                if (this.health < this.maxHealth) {
                    var health = parseFloat(this.health);
                    this.health = (health + this.regen).toFixed(2);
                }
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
                testage = 3;
            },
            this.checkLevelEnd = function(unit, map) {
                if (map[unit[1]].length <= unit[0]) {
                    console.log('level end');
                    this.active = false;
                    return true;
                }
            },
            //combat
            this.collisionCheck = function(map, enemyArray) {
                var current = this;
                if (current.alive) {
                    if (current.checkLevelEnd(current.position, map)) {
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
                    if (((map[current.position[1] + 1][current.position[0]] == ' ')||(map[current.position[1] + 1][current.position[0]] == '_')) && !current.prevCheck) {
                        current.updatePosition(current.position, current.positionOld, 0, 1);
                        if (map[current.position[1]][current.position[0]] == '_') {
                            current.prev = true;
                        }
                    }
                     //collision detection x
                    else if (map[current.position[1]][current.position[0] + current.speed] == ' ') {
                        current.updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    //collision detection with replacable tiles
                    else if (map[current.position[1]][current.position[0] + current.speed] == '_') {
                        current.prev = true;
                        current.updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    else if ((map[current.position[1]][current.position[0] + current.speed] == 'Y')) {
                        if (current.symbol == 'Y') {
                            var inCombat = false;
                            for (var i = 0; i < enemyArray.length; i++) {
                                if ((map[current.position[1]][current.position[0] + current.speed]) == (enemyArray[i].symbol)) {
                                    inCombat = true;
                                }
                            }
                            if (!inCombat) {
                                current.updatePosition(current.position, current.positionOld, current.speed, -1);
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
                        for (var i = 0; i < enemyArray.length; i++) {
                            if (map[current.position[1]][current.position[0] + current.speed] == enemyArray[i].symbol) {
                                cantMove = true;
                            }
                        }
                        if (!cantMove) {
                            current.updatePosition(current.position, current.positionOld, current.speed, -1);                            
                        }
                    }
                    // if (current.prevCheck) {
                    //     console.log('test');
                    //     prevTile(current.positionOld, map);
                    // }
                    // $scope.$apply();
                }   
                else {
                    return;
                }
            },
            this.active = true,
            this.ground = false,
            this.health = 90,
            this.maxHealth = 100,
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
            this.position = [0, 0];
            this.positionOld = [0, 0];
            this.name = 'Player',
            this.symbol = 'Y',
            this.desc = 'This is you'
            //attack
            this.weapon = vm.itemDictionary.club[0][1],
            this.damage = this.weapon.damage,
            this.attackSpeed = this.weapon.attackSpeed,
            //armor
            this.armor = vm.itemDictionary.woodArmor[0][1],
            this.armorValue = this.armor.armor
        };
        this.player = new this.Player();
    }
})();