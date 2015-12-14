(function() {
    'use strict';

    angular
        .module('app.enchant')
        .service('enchantService', enchantService);

    enchantService.$inject = ['inventoryService'];

    /* @ngInject */
    function enchantService(inventoryService) {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();