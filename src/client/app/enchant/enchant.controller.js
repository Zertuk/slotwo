(function() {
    'use strict';

    angular
        .module('app.enchant')
        .controller('EnchantController', en);

    EnchantController.$inject = ['enchantService'];

    /* @ngInject */
    function enchantService(enchantService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();