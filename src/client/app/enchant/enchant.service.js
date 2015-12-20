(function() {
    'use strict';

    angular
        .module('app.enchant')
        .service('enchantService', enchantService);

    enchantService.$inject = ['inventoryService', 'playerService'];

    /* @ngInject */
    function enchantService(inventoryService, playerService) {
        this.func = func;
        this.typeChoosen = '';

        this.enchant = function(type) {
        	console.log(playerService.weapon);
        }

        function healEnchant() {

        }

        function damageEnchant() {

        }

        function moneyEnchant() {

        }

        function speedEnchant() {

        }

        function slowEnchant() {

        }

        ////////////////

        function func() {
        }
    }
})();