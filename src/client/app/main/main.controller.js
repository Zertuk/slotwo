(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$compile', 'levelService', 'shopService', 'messageService', 'templateService', 'dialogueService', 'resourcesService', 'progressService'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $compile, levelService, shopService, messageService, templateService, dialogueService, resourcesService, progressService) {
        shopService.initShop();
        var vm = this;
        vm.count = 0;
        resourcesService.initRates();
        vm.itemList = [shopService.shopList];
        vm.player = playerService.player;
        vm.currentLocation = mainService.mainMap;
        vm.locationDictionary = mainService.locationDictionary;
        vm.levelDictionary = levelService.levelDictionary;
        vm.currentLocation.specFunc();
        vm.messageError = messageService.messageError;
        vm.progress = progressService.progress;

        vm.switchLocation = function(location) {
            var check = mainService.switchLocation(location);
            if (check) {
                vm.currentLocation = mainService.switchLocation(location);
                removeAscii();
            }
        };
        vm.switchLevel = function(level) {
            vm.currentLocation = mainService.switchLevel(level);
        };


        


        vm.buyItem = function(item) {
            shopService.initPurchase(item);
            $timeout(function() {
                vm.itemList = [shopService.shopList];
            }, 50);
        }

        function removeAscii() {
            var elements = angular.element('#locationwrap').children();
            elements.remove();
            sanitizeAscii();
        }
        function sanitizeAscii() {
            if (!vm.currentLocation.formatted) {
                vm.currentLocation.initClicks();
            }
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

        function increaseResources() {
            vm.money = resourcesService.moneyTick();
            resourcesService.resources.updateAmounts();
            vm.resources = resourcesService.resources;
        }

        function activate() {
            sanitizeAscii();
            mainLoop();
            quickLoop();
        }

        function mainLoop() {
            vm.count = vm.count + 1;
            vm.player.healthRegen();
            increaseResources();
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