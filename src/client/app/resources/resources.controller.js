(function() {
    'use strict';

    angular
        .module('app.resources')
        .controller('ResourcesController', ResourcesController);

    ResourcesController.$inject = ['resourcesService', 'inventoryService', 'messageService', 'progressService', '$timeout'];

    /* @ngInject */
    function ResourcesController(resourcesService, inventoryService, messageService, progressService, $timeout) {
        var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;
        vm.craftables = resourcesService.craftables;
        vm.fireDuration = 0;

        resourcesService.regrabAmounts();

        function fireLoop() {
            var buttonBG = angular.element('.campfire .button .bg');
            if (vm.fireDuration > 0) {
                vm.fireDuration = vm.fireDuration - 0.05;
                buttonBG.css('width', vm.fireDuration + '%');
                $timeout(fireLoop, 100);
            }
            else {
                vm.fireDuration = 0;
                buttonBG.css('width', '0%');
            }
        }

        vm.fuelFire = function() {
            //subtract 1 wood
            var woodCheck = resourcesService.addLogToFire();
            if (woodCheck) {
                messageService.updateMainMessage('A log has been added to the fire.');
                if (vm.fireDuration === 0) { 
                    vm.fireDuration = 100;
                    fireLoop();
                }
                else {
                    vm.fireDuration = 100;
                }
            }
            else {
                messageService.updateMainMessage('No wood available', true);
            }
        };

        vm.checkActive = function(input) {
            var check = input + 'Active';
            if (progressService.progress[check]) {
                return true;
            }
        };

        vm.assignWorker = function(type) {
        	resourcesService.assignWorker(type);
        };

        vm.removeWorker = function(type) {
        	resourcesService.removeWorker(type);
        };

        vm.craft = function(itemInput) {
            var item = vm.itemDictionary[itemInput][0][1];
            var crafted = item.craft();
            if (crafted) {
                resourcesService.regrabAmounts();
                messageService.updateMainMessage(item.name + ' has been created.');
                vm.craftables[itemInput].special();
            }
            else {
                messageService.updateMainMessage('Not enough resources to craft.', true);
            }
        };

        vm.toggleForge = function() {
            resourcesService.toggleForge();
            vm.forgeMessage = resourcesService.forgeMessage();
        };

        vm.forgeMessage = resourcesService.forgeMessage();

        function activate() {
            vm.resources = resourcesService.resources;
            vm.workers = resourcesService.workers;
        }

        ////////////////

        activate();

    }
})();