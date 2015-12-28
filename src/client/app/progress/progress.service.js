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
            woodArmorCrafted: false,
            bridgePrompt: false,
            bridgeBuilt: false,
            forgeActive: false,
            campFireActive: true,
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
                ruins: true,
                desert: true,
                bridge: true,
                snow: true,
                shroom: true,
                wizard: true
            },
            items : {
                winterSweater: false
            }
        }

        function func() {
        }
    }
})();