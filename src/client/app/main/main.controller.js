(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope'];

    /* @ngInject */
    function MainController($rootScope) {
        var vm = this;
        vm.title = 'MainController';
        vm.count = 0;

        activate();

        ////////////////

        function activate() {
            mainLoop();
        }

        function mainLoop() {
            vm.count = vm.count + 1;
            setTimeout(mainLoop, 500);
        }
    }
})();