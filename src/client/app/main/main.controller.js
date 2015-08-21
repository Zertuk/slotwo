(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = [];

    /* @ngInject */
    function MainController() {
        var vm = this;
        vm.title = 'MainController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();