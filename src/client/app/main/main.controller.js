(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$compile', 'levelService', 'shopService'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $compile, levelService, shopService) {
        shopService.initShop();
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;
        vm.itemList = [shopService.shopList];
        vm.player = playerService.player;
        vm.currentLocation = mainService.treeShop;
        vm.locationDictionary = mainService.locationDictionary;
        vm.levelDictionary = levelService.levelDictionary;
        vm.currentLocation.specFunc();
        vm.buyItem = function(item) {
            console.log(item.slug);
        }
        if (!vm.currentLocation.formatted) {
            vm.currentLocation.initClicks();
        }
        vm.switchLevel = function(level) {
            console.log(vm.levelDictionary[level]);
        }
        vm.switchLocation = function(location) {
            console.log(location);
            vm.currentLocation = vm.locationDictionary[location];
            console.log(vm.currentLocation);
            if (!vm.currentLocation.formatted) {
                console.log('test');
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