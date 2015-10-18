(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$compile'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $compile) {
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;
        vm.player = playerService.player;
        vm.currentLocation = mainService.treeCity;
        vm.locationDictionary = mainService.locationDictionary;
        if (!vm.currentLocation.formatted) {
            vm.currentLocation.initClicks();
        }

        vm.switchLocation = function(location) {
            console.log(location);
            vm.currentLocation = vm.locationDictionary[location];
            console.log(vm.currentLocation);
            if (!vm.currentLocation.formatted) {
                vm.currentLocation.initClicks();
            }
            removeAscii();
        };

        function removeAscii() {
            var elements = angular.element(document.getElementById('levelwrap')).children();
            elements.remove();
            sanitizeAscii();
        }
        function sanitizeAscii() {
            for (var i = 0; i < vm.currentLocation.ascii.length; i++) {
                if (!vm.currentLocation.formatted) {
                    vm.currentLocation.ascii[i] = '<pre>' + vm.currentLocation.ascii[i] + '</pre>';
                }
                vm.currentLocation.ascii[i] = $compile(vm.currentLocation.ascii[i])($scope);
                angular.element(document.getElementById('levelwrap')).append(vm.currentLocation.ascii[i]);
            }
            vm.currentLocation.formatted = true;
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