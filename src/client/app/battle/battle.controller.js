(function () {
    'use strict';

    angular
        .module('app.battle')
        .controller('BattleController', BattleController);

    BattleController.$inject = ['$rootScope'];

    /* @ngInject */
    function BattleController($rootScope) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            
        }
    }
})();