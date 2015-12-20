(function() {
    'use strict';

    angular
        .module('app.enchant')
        .controller('EnchantController', EnchantController);

    EnchantController.$inject = ['enchantService'];

    /* @ngInject */
    function EnchantController(enchantService) {
        var vm = this;
        vm.typeChoosen = '';
        
        vm.enchant = function(type) {
        	vm.typeChoosen = type;
        	enchantService.enchant(type);
        }

        activate();

        ////////////////

        function activate() {
        }
    }
})();