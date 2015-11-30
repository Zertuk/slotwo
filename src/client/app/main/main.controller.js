(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$compile', 'levelService', 'shopService', 'messageService', 'templateService'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $compile, levelService, shopService, messageService, templateService) {
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

        vm.switchTemplate = function(template) {
            vm.player.active = false;
            templateService.switchTemplate(template);
        }
        


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
            vm.switchTemplate('app/level/level.html');
            levelService.switchCurrentLevel(level);
            vm.currentLocation = vm.levelDictionary[level];
        }
        vm.switchLocation = function(location) {
            vm.switchTemplate('app/main/main.html');
            messageService.mainMessage = '';
            vm.currentLocation = vm.locationDictionary[location];
            if (!vm.currentLocation.formatted) {
                console.log('test');
                vm.currentLocation.initClicks();
            }
            removeAscii();
        };

        function removeAscii() {
            var elements = angular.element('#locationwrap').children();
            elements.remove();
            sanitizeAscii();
        }
        function sanitizeAscii() {
            for (var i = 0; i < vm.currentLocation.ascii.length; i++) {
                if (!vm.currentLocation.formatted) {
                    vm.currentLocation.ascii[i] = '<pre>' + vm.currentLocation.ascii[i] + '</pre>';
                }
                vm.currentLocation.ascii[i] = $compile(vm.currentLocation.ascii[i])($scope);
            }
            vm.currentLocation.formatted = true;
            appendAscii();
            verifyAscii();
        }

        function appendAscii() {
            for (var i = 0; i < vm.currentLocation.ascii.length; i++) {
                angular.element('#locationwrap').append(vm.currentLocation.ascii[i]);
            }
            $timeout(verifyAscii, 10);
        }

        function verifyAscii() {
            var length = angular.element('#locationwrap').children().length;
            if (length !== vm.currentLocation.ascii.length) {
                appendAscii();
            }
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
            vm.activeTemplate = templateService.activeTemplate;
            vm.messageError = messageService.messageError;
            vm.mainMessage = messageService.mainMessage;
            $timeout(quickLoop, 125);
        }
    }
})();