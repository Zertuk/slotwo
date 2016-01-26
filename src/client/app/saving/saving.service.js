(function() {
    'use strict';

    angular
        .module('app.saving')
        .service('savingService', savingService);

    savingService.$inject = ['progressService', 'playerService', 'inventoryService', 'resourcesService'];

    /* @ngInject */
    function savingService(progressService, playerService, inventoryService, resourcesService) {
        var vm = this;
        vm.player = playerService.player;
        vm.progress = progressService.progress;        
        vm.resources = resourcesService.resources
        vm.itemDictionary = inventoryService.itemDictionary;

        function saveItems() {
            var keys = inventoryService.keys;
            var items = [];
            for (var i = 0; i < keys.length; i++) {
                var val = [keys[i], vm.itemDictionary[keys[i]][1][1]];
                items.push(val);
            }
            return items;
        }

        vm.saveGame = function() {
            console.log('saving...');
            localStorage['playerSave'] = btoa(JSON.stringify(vm.player));
            localStorage['progressSave'] = btoa(JSON.stringify(vm.progress));
            localStorage['resourcesSave'] = btoa(JSON.stringify(vm.resources));
            localStorage['itemSave'] = btoa(JSON.stringify(saveItems()));
        };
    }
})();