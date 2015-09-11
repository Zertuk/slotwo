(function() {
    'use strict';

    angular
        .module('app.level')
        .service('levelService', levelService);

    levelService.$inject = ['dependencies'];

    /* @ngInject */
    function levelService(dependencies) {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();