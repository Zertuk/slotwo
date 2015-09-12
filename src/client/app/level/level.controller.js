(function() {
    'use strict';

    angular
        .module('app.level')
        .controller('LevelController', LevelController);

    LevelController.$inject = ['levelService', 'playerService', 'enemyService'];

    /* @ngInject */
    function LevelController(levelService, playerService, enemyService) {
        var vm = this;
        vm.title = 'LevelController';


        function createEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 50) {
                var test = new vm.level.enemyArray[0];
            } else {
                var test = new vm.level.enemyArray[1];
            }
            test.position = [30, 0];
            array.push(test);
        }



        function levelLoop() {
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