(function() {
    'use strict';

    angular
        .module('app.battle')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'battle',
                config: {
                    url: '/',
                    templateUrl: 'app/battle/battle.html',
                    controller: 'BattleController',
                    controllerAs: 'vm',
                    title: 'battle'
                }
            }
        ];
    }
})();
