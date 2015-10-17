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
        vm.trustAsHtml = $sce.trustAsHtml;
        $rootScope.test = 0;

        function test() {
            vm.test2 = '<p ng-click = "console.log(\'hello\')">test</p>';
            vm.test2 = $compile(vm.test2)(vm);
        }

        function sanitizeAscii() {
            for (var i = 0; i < vm.currentLocation.ascii.length; i++) {
                vm.currentLocation.ascii[i] = '<pre>' + vm.currentLocation.ascii[i] + '</pre>';
                console.log(vm.currentLocation.ascii[i])
                vm.currentLocation.ascii[i] = $compile(vm.currentLocation.ascii[i])($scope);
                angular.element(document.getElementById('levelwrap')).append(vm.currentLocation.ascii[i]);
            }                    
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