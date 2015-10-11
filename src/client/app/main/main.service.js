(function() {
    'use strict';

    angular
        .module('app.main')
        .service('mainService', mainService);

    mainService.$inject = [];

    /* @ngInject */
    function Service() {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();