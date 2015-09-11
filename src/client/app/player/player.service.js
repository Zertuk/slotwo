(function() {
    'use strict';

    angular
        .module('app.player')
        .service('playerService', playerService);

    playerService.$inject = ['dependencies'];

    /* @ngInject */
    function playerService(dependencies) {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();