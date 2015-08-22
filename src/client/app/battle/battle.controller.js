(function () {
    'use strict';

    angular
        .module('app.battle')
        .controller('BattleController', BattleController);

    BattleController.$inject = ['$rootScope'];

    /* @ngInject */
    function BattleController($rootScope) {
        var vm = this;

        vm.level = '__________________';




        activate();


        function moveInLevel(i) {
            var player = "Y";
            console.log(vm.level.split());
            if (vm.level[i] == '_') {
                console.log('floor');
            }
        }


        ////////////////

        function activate() {
            for (var i = 0; i < vm.level.length; i++) {
                moveInLevel(i);
            }
        }
    }
})();