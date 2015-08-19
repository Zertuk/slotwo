(function() {
    'use strict';

    angular
        .module('app.inventory')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'inventory',
                config: {
                    url: '/inventory',
                    templateUrl: 'app/inventory/inventory.html',
                    controller: 'InventoryController',
                    controllerAs: 'vm',
                    title: 'inventory'
                }
            }
        ];
    }
})();
