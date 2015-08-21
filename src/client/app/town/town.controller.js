(function () {
    'use strict';

    angular
        .module('app.town')
        .controller('TownController', TownController);

    TownController.$inject = [];

    /* @ngInject */
    function TownController() {
        var vm = this;
        vm.title = 'TownController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();