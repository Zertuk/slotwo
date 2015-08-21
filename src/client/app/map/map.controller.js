(function () {
    'use strict';

    angular
        .module('app.map')
        .controller('MapController', MapController);

    MapController.$inject = [];

    /* @ngInject */
    function MapController() {
        var vm = this;
        vm.title = 'MapController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();