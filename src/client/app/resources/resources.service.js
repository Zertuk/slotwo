(function() {
    'use strict';

    angular
        .module('app.resources')
        .service('resourcesService', resourcesService);

    // Service.$inject = ['dependencies'];

    function resourcesService() {
    	this.moneyTick = function() {
    		this.resources.money = this.resources.money + this.resources.moneyRate;
    	}
    	this.resources = {
    		money: 0,
    		moneyRate: 1,
    		workers: 10,
    		lumberjacks: 0,
    		farmers: 0,
    		miners: 0,
    		overseers: 0
    	}
    }
})();