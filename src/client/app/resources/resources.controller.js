(function() {
    'use strict';

    angular
        .module('app.resources')
        .controller('ResourcesController', ResourcesController);

    ResourcesController.$inject = ['resourcesService', 'inventoryService', 'messageService'];

    /* @ngInject */
    function ResourcesController(resourcesService, inventoryService, messageService) {
        var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;
        vm.craftables = resourcesService.craftables;

        vm.assignWorker = function(type) {
        	resourcesService.assignWorker(type);
        };

        vm.removeWorker = function(type) {
        	resourcesService.removeWorker(type);
        };

        vm.craft = function(itemInput) {
            console.log(itemInput)
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
        }

        vm.forgeMessage = resourcesService.forgeMessage();

        function activate() {
            vm.resources = resourcesService.resources;
            vm.workers = resourcesService.workers;
        }

        ////////////////

        activate();

    }
})();