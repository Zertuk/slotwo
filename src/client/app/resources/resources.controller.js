(function() {
    'use strict';

    angular
        .module('app.resources')
        .controller('ResourcesController', ResourcesController);

    ResourcesController.$inject = ['resourcesService', '$timeout'];

    /* @ngInject */
    function ResourcesController(resourcesService, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        	vm.resources = resourcesService.resources;
        }
    }
})();