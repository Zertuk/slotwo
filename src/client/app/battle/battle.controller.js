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

        vm.level = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '-',
                    '_', '_', '_', '_', '_', '_', '_', '_', '_', 'E', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'E']




        activate();

        function moveEnemy() {
            for (var j = 0; j < vm.level.length; j++) {
                if (vm.level[j] == 'E') {
                    if (vm.level[j - 1] == '_') {
                        vm.level[j - 1] = 'E';
                        vm.level[j] = '_';
                    }
                }
            }
        }

        function moveInLevel() {
            var player = "Y";
            if (vm.level[vm.count + 1] == '_') {
                vm.level[vm.count + 1] = 'Y';
                vm.level[vm.count] = '_';
                vm.count = vm.count + 1;
                console.log(vm.level);
            }
            else {
                console.log(vm.count + ' count')
            }
            if(!$scope.$$phase) {
                $scope.$apply();
            }
            moveEnemy();
            setTimeout(moveInLevel, 500);
        }


        ////////////////

        function activate() {
            moveInLevel();
        }
    }
})();