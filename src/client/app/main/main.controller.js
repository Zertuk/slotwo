(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$compile', 'levelService', 'shopService', 'messageService'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $compile, levelService, shopService, messageService) {
        shopService.initShop();
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;
        vm.itemList = [shopService.shopList];
        vm.player = playerService.player;
        vm.currentLocation = mainService.mainMap;
        vm.locationDictionary = mainService.locationDictionary;
        vm.levelDictionary = levelService.levelDictionary;
        vm.currentLocation.specFunc();
        vm.messageError = messageService.messageError;



        vm.buyItem = function(item) {
            shopService.initPurchase(item);
            $timeout(function() {
                vm.itemList = [shopService.shopList];
            }, 50);
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
            quickLoop();
        }

        function mainLoop() {
            vm.count = vm.count + 1;
            vm.player.healthRegen();
            $timeout(mainLoop, 1000);
        }
        function quickLoop() {
            vm.player.healthBarUpdate();
            vm.messageError = messageService.messageError;
            vm.mainMessage = messageService.mainMessage;
            $timeout(quickLoop, 125);
        }
    }
})();