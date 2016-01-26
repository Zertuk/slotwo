(function() {
    'use strict';

    angular
        .module('app.saving')
        .service('savingService', savingService);

    savingService.$inject = ['progressService', 'playerService', 'inventoryService'];

    /* @ngInject */
    function savingService(progressService, playerService, inventoryService) {
        var vm = this;
        vm.player = playerService.player;
        vm.progress = progressService.progress;        

        vm.saveGame = function() {
            console.log('saving...');
            localStorage['playerSave'] = btoa(JSON.stringify(vm.player));
            localStorage['progressSave'] = btoa(JSON.stringify(vm.progress));
        };
    }
})();