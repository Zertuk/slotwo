(function() {
    'use strict';

    angular
        .module('app.enemy')
        .service('enemyService', enemyService);

    enemyService.$inject = ['dependencies'];

    /* @ngInject */
    function enemyService(dependencies) {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();