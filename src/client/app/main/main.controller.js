(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', 'playerService', 'mainService', '$timeout', '$sce'];

    /* @ngInject */
    function MainController($rootScope, playerService, mainService, $timeout, $sce) {
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;
        vm.player = playerService.player;
        vm.currentLocation = mainService.treeSlums;
        vm.currentLocation.initClicks();

        function sanitizeAscii() {
            for (var i = 0; i < vm.currentLocation.ascii.length; i++) {
                vm.currentLocation.ascii[i] = $sce.trustAsHtml(vm.currentLocation.ascii[i]);
            }
        }
        activate();

        ////////////////

        function activate() {
            sanitizeAscii();
            mainLoop();
        }

        function mainLoop() {
            vm.count = vm.count + 1;
            vm.player.healthUpdate();
            $timeout(mainLoop, 1000);
        }
    }
})();