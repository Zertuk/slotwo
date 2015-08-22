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
        vm.count = 0;

        activate();

        ////////////////

        function activate() {
            mainLoop();
        }

        function mainLoop() {
            vm.count = vm.count + 1;
            console.log(vm.count);
            setTimeout(mainLoop, 1000);
        }
    }
})();