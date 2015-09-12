(function() {
    'use strict';

    angular
        .module('app.level')
        .controller('LevelController', LevelController);

    LevelController.$inject = ['levelService', 'playerService', 'enemyService', '$scope'];

    /* @ngInject */
    function LevelController(levelService, playerService, enemyService, $scope) {
        var vm = this;
        vm.title = 'LevelController';

        vm.currentLevel = levelService.treeOne;
        vm.unitArray = [playerService.player];

        function createEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 90) {
                var test = new vm.currentLevel.enemyArray[0];
                test.position = [30, 0];
                vm.unitArray.push(test);
            }
        }

        function updateMap(unit, unitOld, map, unitSymbol, prevCheck) {
            if (!prevCheck) {
                map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
                map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
            }
            else {
                map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
                map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
            }
            console.log(unitSymbol);
        }


        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }

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


        function levelLoop() {
            var dead = false;
            createEnemy();
            for (var i = 0; i < vm.unitArray.length; i++) {
                vm.unitArray[i].collisionCheck(vm.currentLevel.ascii, vm.unitArray);
                if (!vm.unitArray[i].alive) {
                    var newArray = [];
                    for (var j = 0; j < vm.unitArray.length; j++) {
                        if (j != i) {
                            newArray.push(vm.unitArray[j]);
                        }
                        else {
                            updateMap(vm.unitArray[i].position, vm.unitArray[i].positionOld, vm.currentLevel.ascii, ' ', vm.unitArray[i].prevCheck);
                            dead = true;
                        }
                    }
                    vm.unitArray = newArray;
                }
                if (typeof vm.unitArray[i] !== 'undefined') {
                    updateMap(vm.unitArray[i].position, vm.unitArray[i].positionOld, vm.currentLevel.ascii, vm.unitArray[i].symbol, vm.unitArray[i].prevCheck);
                }

            }
            $scope.$apply();
            setTimeout(levelLoop, 125);
        }



        function levelLoopOld() {
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