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
        vm.currentLevel.checkLength();
        vm.unitArray = [playerService.player];

        function createEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 90) {
                var test = new vm.currentLevel.enemyArray[0];
                var spawn = [];
                spawn[0] = vm.currentLevel.enemySpawn[0];
                spawn[1] = vm.currentLevel.enemySpawn[1];
                test.position = spawn;
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
        }


        function setCharAt(str,index,chr) {
            if (typeof str !== 'undefined') {
                if(index > str.length-1) return str;
                return str.substr(0,index) + chr + str.substr(index+1);
            }
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

        activate();

        ////////////////

        function activate() {
            levelLoop();
        }
    }
})();