(function() {
    'use strict';

    angular
        .module('app.shop')
        .service('shopService', shopService);

    // shopService.$inject = ['dependencies'];

    /* @ngInject */
    function Service() {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();