(function() {
    'use strict';

    angular
        .module('app.saving')
        .service('savingService', savingService);

    savingService.$inject = [''];

    /* @ngInject */
    function Service() {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();