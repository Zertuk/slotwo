(function() {
    'use strict';

    angular
        .module('app.enchant')
        .controller('EnchantController', EnchantController);

    EnchantController.$inject = ['enchantService'];

    /* @ngInject */
    function EnchantController(enchantService) {
        var vm = this;

        vm.enchant = function(type) {
        	console.log(type);
        }

        activate();

        ////////////////

        function activate() {
        }
    }
})();