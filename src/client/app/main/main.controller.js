(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$sce', '$compile'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $sce, $compile) {
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;
        vm.player = playerService.player;
        vm.currentLocation = mainService.treeCity;
        vm.currentLocation.initClicks();
        vm.test2 = '<p>test1</p>';

        function test() {
            vm.test2 = '<p ng-click = "vm.test = vm.test + 1">test</p>';
            vm.test2 = $compile(vm.test2)(vm);
        }
        test();
        function sanitizeAscii() {
            for (var i = 0; i < vm.currentLocation.ascii.length; i++) {
                var before = '<pre>';
                var after = '</pre>';
                vm.currentLocation.ascii[i] = before + vm.currentLocation.ascii[i] + after;
                // vm.currentLocation.ascii[i] = $sce.trustAsHtml(vm.currentLocation.ascii[i]);
                vm.currentLocation.ascii[i] = $compile(vm.currentLocation.ascii[i])(vm);
            }
            console.log(vm.currentLocation.ascii[9][0]);
        }
        vm.test = 0;
        function testFunction() {
            console.log('test');
        }
        activate();

        ////////////////

        function activate() {
            sanitizeAscii();
            mainLoop();
        }

        function mainLoop() {
            console.log(vm.test);
            vm.count = vm.count + 1;
            vm.player.healthUpdate();
            $timeout(mainLoop, 1000);
        }
    }
})();