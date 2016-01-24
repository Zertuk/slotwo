(function() {
    'use strict';

    angular
        .module('app.progress')
        .service('progressService', progressService);

    // Service.$inject = ['dependencies'];

    /* @ngInject */
    function progressService() {
        this.progress = {
            hasMap: true,
            hasSleepingBag: false,
            hasSweater: false,
            introComplete: false,
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
            trainBattle: false,
            trainDefense: false,
            trainMoney: false,
            canLearn: 0,
            elderMet: false,
            pieEaten: false,
            innIntro: false,
            quizTaken: false,
            berserk: false,
            shield: false,
            healing: false,
            freeSample: false,
            signedNDA: false,
            wizardMet: false,
            wizardTask: false,
            vialTaken: false,
            lichReveal: true,
            passCode: false,
            levels: {
                cabin: true,
                treeCity: true,
                treeOne: true,
                treeTwo: false,
                dungeon: false,
                ruins: false,
                desert: false,
                sea: false,
                bridge: false,
                snow: false,
                snowNorth: false,
                shroom: true,
                shroomFinish: false,
                wizard: true,
                robot: false,
                arena: false,
                monk: false,
                lich: false,
                theEnd: true
            },
            enemies: {

            },
            looted: {
                
            }
        };
    }
})();