(function() {
    'use strict';

    angular
        .module('app.enemy')
        .service('enemyService', enemyService);


    /* @ngInject */
    function enemyService() {
        this.Enemy = function() {
            this.ground = false,
            this.attackSpeed = 1,
            this.health = 10,
            this.maxHealth = 10,
            this.damage = 1,
            this.alive = true,
            //movement
            this.prev = false,
            this.prevCheck = false,
            this.speed = -1,
            this.position = [0, 0],
            this.positionOld = [0, 0],
            this.initPosition = function() {
                this.positionOld = this.position;
            },
            //other
            this.name = 'default',
            this.desc = 'default desc',
            //methods
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
            }
        }

        this.Cat = function Cat() {
            this.name = "Cat";
        }
        this.Cat.prototype = new this.Enemy();









    }

})();