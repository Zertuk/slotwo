(function() {
    'use strict';

    angular
        .module('app.level')
        .controller('levelController', levelController);

    levelController.$inject = ['dependencies'];

    /* @ngInject */
    function levelController(dependencies) {
        var vm = this;
        vm.title = 'levelController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();