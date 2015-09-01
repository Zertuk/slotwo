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
        "                              ",
        "                              ",
        "                              ",
        "    __        ..        __    ",
        ".--`  `--..--`  `--..--`  `--."
        ];
        // x, y
        var player = [0, 0];
        var playerOld = [0, 0];
        var grounded = false;
        console.log(player[1])
        function testMove() {
            console.log(vm.test);
            vm.test[playerOld[1]] = setCharAt(vm.test[playerOld[1]], playerOld[0], ' ');
            vm.test[player[1]] = setCharAt(vm.test[player[1]], player[0], 'Y');
            if (grounded) {
                grounded = false;
                var groundedLastTurn = true;
            }
            if ((vm.test[player[1] + 1][player[0]] == ' ') && !groundedLastTurn) {
                playerOld[1] = player[1];
                player[1] = player[1] + 1;
            }
            else if (vm.test[player[1]][player[0] + 1] == ' ') {
                playerOld[0] = player[0];
                player[0] = player[0] + 1;
                if (!groundedLastTurn) {
                    grounded = true;
                }
            }
            else {
                playerOld[1] = player[1];
                playerOld[0] = player[0];
                player[1] = player[1] - 1;
                player[0] = player[0] + 1;
            }
            $scope.$apply();
            setTimeout(testMove, 125);
        }
        testMove();

        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }











        var Enemy = function() {
            this.fullHealth = 10;
            this.health = 10;
            this.damage = 1;
            this.name = 'Default Name';
            this.desc = "Default Description";
            this.symbol = 'DEF';
            this.move = true;
            this.moneyMult = 1;
            this.itemChance = 10;
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
            this.death = function() {
                if (this.health <= 0) {
                    this.alive = false;
                } 
            }
        }

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