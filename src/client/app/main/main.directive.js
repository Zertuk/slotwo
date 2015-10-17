(function() {
    'use strict';

    angular
        .module('app.main')
        .directive('compile', compile);

    compile.$inject = ['$compile'];

    /* @ngInject */
    function compile($compile) {

        var directive = {
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
            element.append(attrs.compile);        
        }
    }

    /* @ngInject */
    function Controller() {

    }
})();