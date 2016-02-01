(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', 'playerService', 'mainService', '$timeout', '$compile', 'levelService', 'shopService', 'messageService', 'templateService', 'dialogueService', 'resourcesService', 'progressService', 'savingService'];

    /* @ngInject */
    function MainController($rootScope, $scope, playerService, mainService, $timeout, $compile, levelService, shopService, messageService, templateService, dialogueService, resourcesService, progressService, savingService) {
        var vm = this;
        vm.count = 0;
        vm.player = playerService.player;
        vm.progress = progressService.progress;
        vm.currentLocation = mainService.currentLocation;
        initShop();
        vm.locationDictionary = mainService.locationDictionary;
        vm.levelDictionary = levelService.levelDictionary;
        vm.currentLocation.specFunc();
        vm.reset = '';
        vm.switchLocation = function(location) {
            var check = mainService.switchLocation(location);
            if (check) {
                vm.currentLocation = mainService.switchLocation(location);
                removeAscii();
                if (location === 'treeShop') {
                    initShop();
                }
            }
        };
        vm.switchLevel = function(level) {
            var check = mainService.switchLevel(level);
            if (check) {
                vm.currentLocation = mainService.switchLevel(level);
            }
        };

        vm.switchTemplate = function(template) {
            mainService.switchTemplate(template);
        };

        vm.buyItem = function(item) {
            shopService.initPurchase(item);
            vm.money = resourcesService.resources.money;
            $timeout(function() {
                vm.itemList = [shopService.shopList];
            }, 50);
        };

        vm.calculateTotlMoneyRate = function() {
            return resourcesService.calculateTotlMoneyRate();
        }

        vm.resetGame = function() {
            vm.reset = vm.reset.toUpperCase();
            if (vm.reset === 'RESET') {
                savingService.resetGame();
            }
            else {
                messageService.updateMainMessage('You must send "RESET" to delete your save!', true);
            }
        }

        function initShop() {
            shopService.initShop();
            vm.itemDictionary = shopService.grabItemDictionary();
            vm.itemList = [shopService.shopList];
            console.log(vm.itemList[0]);
        }


        //if ascii isnt deleted before, can cause issues with different size ascii
        function removeAscii() {
            var elements = angular.element('#locationwrap').children();
            elements.remove();
            sanitizeAscii();
        }

        //add pre tags and $compile to angular code so ng-click works
        function sanitizeAscii() {
            //dont run twice, adds double pre tags
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

        //ascii append check, if it didnt work lengths wont matchup, rerun append
        function verifyAscii() {
            var length = angular.element('#locationwrap').children().length;
            if (length !== vm.currentLocation.ascii.length) {
                appendAscii();
            }
        }

        function wizardCheck() {
            if (vm.currentLocation.slug === 'wizard') {
                var asciiCheck = vm.currentLocation.asciiCheck();
                if  (asciiCheck !== vm.currentLocation.currentAscii) {
                    vm.currentLocation.currentAscii = asciiCheck;
                    vm.currentLocation.ascii = vm.currentLocation[asciiCheck];
                    vm.currentLocation.formatted = false;
                    removeAscii();
                    sanitizeAscii();
                } 
            }
        }

        //all resource info here
        function increaseResources() {
            vm.money = resourcesService.moneyTick();
            vm.resources = resourcesService.resources;
        }

        function updatePlayer() {
            vm.player.damage = vm.player.calculateTotalDamage();
            vm.player.armorValue = vm.player.calculateTotalArmor();
            vm.player.maxHealth = vm.player.calculateTotalHealth();
        }

        function lichCheck() {
            if (vm.player.lichKilled) {
                vm.player.lichKilled = false;
                vm.switchLocation('ending');
            }
        }
        function saveCheck() {
            if (vm.count % 30 === 0) {
                savingService.saveGame();
            }
        }
        //1s loop
        function mainLoop() {
            vm.count = vm.count + 1;
            vm.player.healthRegen();
            increaseResources();
            updatePlayer();
            lichCheck();
            saveCheck();
            $timeout(mainLoop, 1000);
        }
        //quicker loop
        function quickLoop() {
            vm.player.healthBarUpdate();
            vm.activeTemplate = templateService.activeTemplate;
            vm.messageError = messageService.messageError;
            vm.mainMessage = messageService.mainMessage;
            wizardCheck();
            $timeout(quickLoop, 125);
        }

        ////////////////////

        function activate() {
            sanitizeAscii();
            mainLoop();
            quickLoop();
        }

        activate();
    }
})();