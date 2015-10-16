(function() {
    'use strict';

    angular
        .module('app.main')
        .directive('mainDirective', mainDirective);

    mainDirective.$inject = ['MainController'];

    /* @ngInject */
    function mainDirective(MainController) {

        var directive = {
            bindToController: true,
            controller: MainController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
       		console.log('test');
        }
    }

    /* @ngInject */
    function Controller() {

    }
})();