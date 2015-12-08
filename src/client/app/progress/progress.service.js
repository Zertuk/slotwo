(function() {
    'use strict';

    angular
        .module('app.progress')
        .service('progressService', progressService);

    // Service.$inject = ['dependencies'];

    /* @ngInject */
    function progressService() {
        this.func = func;
        this.test = 'this is a test';
        ////////////////


        this.progress = {
        	treeKingWorkAccept: false,
        	treeKingCompliment: true,
        	ruinsCleared: false,
        	treeKingWorkHandIn: false,
        	treeKingIntro: false,
        	slumBossMet: false,
            levels: {
                //locations
                treeCity: true,
                //levels
                treeOne: true,
                treeTwo: false,
                dungeon: true,
                ruinsCleared: false,
                desert: false,
                bridge: false,
                snow: false,
                wizard: false
            }
        }

        function func() {
        }
    }
})();