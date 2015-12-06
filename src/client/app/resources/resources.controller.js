(function() {
    'use strict';

    angular
        .module('app.resources')
        .controller('ResourcesController', ResourcesController);

    ResourcesController.$inject = ['resourcesService', '$timeout'];

    /* @ngInject */
    function ResourcesController(resourcesService, $timeout) {
        var vm = this;
        vm.assignWorker = function(type) {
        	resourcesService.assignWorker(type);
        };
        vm.removeWorker = function(type) {
        	resourcesService.removeWorker(type);
        }
        activate();

        ////////////////

        function activate() {
        	vm.resources = resourcesService.resources;
        	vm.workers = resourcesService.workers;
        }
    }
})();