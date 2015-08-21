(function() {
    'use strict';

    angular
        .module('app.town')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'town',
                config: {
                    url: '/town',
                    templateUrl: 'app/town/town.html',
                    controller: 'MapController',
                    controllerAs: 'vm',
                    title: 'town'
                }
            }
        ];
    }
})();
