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
            woodSwordCrafted: false,
            bridgePrompt: false,
            bridgeBuilt: false,
            forgeActive: true,
            trainBattle: false,
            trainDefense: false,
            trainMoney: false,
            canLearn: 1,
            levels: {
                //locations
                treeCity: true,
                //levels
                treeOne: true,
                treeTwo: true,
                dungeon: true,
                ruinsCleared: false,
                desert: false,
                bridge: false,
                snow: false,
                shroom: true,
                wizard: false
            }
        }

        function func() {
        }
    }
})();