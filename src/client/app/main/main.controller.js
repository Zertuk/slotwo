(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', 'playerService'];

    /* @ngInject */
    function MainController($rootScope, playerService) {
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;
        vm.player = playerService.player;

        activate();

        ////////////////

        function activate() {
            mainLoop();
        }

        function mainLoop() {
            vm.count = vm.count + 1;
            setTimeout(mainLoop, 1000);
        }
    }
})();