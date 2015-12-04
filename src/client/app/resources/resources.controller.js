(function() {
    'use strict';

    angular
        .module('app.resources')
        .controller('ResourcesController', ResourcesController);

    ResourcesController.$inject = ['resourcesService'];

    /* @ngInject */
    function ResourcesController(resourcesService) {
        var vm = this;
        vm.money = resourcesService.resources.money;

        activate();

        ////////////////

        function activate() {
        }
    }
})();