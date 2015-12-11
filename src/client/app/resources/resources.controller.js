(function() {
    'use strict';

    angular
        .module('app.resources')
        .controller('ResourcesController', ResourcesController);

    ResourcesController.$inject = ['resourcesService', 'inventoryService'];

    /* @ngInject */
    function ResourcesController(resourcesService, inventoryService) {
        var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;

        vm.assignWorker = function(type) {
        	resourcesService.assignWorker(type);
        };

        vm.removeWorker = function(type) {
        	resourcesService.removeWorker(type);
        };

        vm.craft = function(itemInput) {
            var item = vm.itemDictionary[itemInput][0][1];
            item.craft();
        };

        function activate() {
            vm.resources = resourcesService.resources;
            vm.workers = resourcesService.workers;
        }

        ////////////////

        activate();

    }
})();