(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .service('dialogueService', dialogueService);

    // Service.$inject = ['dependencies'];

    /* @ngInject */
    function dialogueService() {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();