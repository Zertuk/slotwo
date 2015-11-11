(function() {
    'use strict';

    angular
        .module('app.template')
        .service('templateService', templateService);

    function templateService() {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();