(function() {
    'use strict';

    angular
        .module('app.resources')
        .service('resourcesService', resourcesService);

    resourcesService.$inject = ['messageService'];

    function resourcesService(messageService) {
    	this.moneyTick = function() {
    		this.resources.money = this.resources.money + this.resources.moneyRate;
    	}
    	this.assignWorker = function(type) {
    		if (this.resources.workers > 0) {
    			this.resources[type] = this.resources[type] + 1;
    			this.resources[workers] = this.resources[workers] - 1;
    		}
    		else {

    		}
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