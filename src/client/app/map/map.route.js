(function() {
    'use strict';

    angular
        .module('app.maps')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'map',
                config: {
                    url: '/map',
                    templateUrl: 'app/map/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm',
                    title: 'map'
                }
            }
        ];
    }
})();
