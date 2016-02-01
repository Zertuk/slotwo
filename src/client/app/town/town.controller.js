(function () {
    'use strict';

    angular
        .module('app.town')
        .controller('TownController', TownController);

    TownController.$inject = ['$scope'];

    /* @ngInject */
    function TownController($scope) {
        var vm = this;
        vm.structures = {
            campfire: 0,
            tent: 0
        }
        activate(console.log($scope));

        ////////////////

        function activate() {
        }
    }
})();