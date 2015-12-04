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
    			this.resources['workers'] = this.resources['workers'] - 1;
    			messageService.updateMainMessage('');
    		}
    		else {
    			messageService.updateMainMessage('No workers available.', true);
    		}
    	}
    	this.removeWorker = function(type) {
    		if (this.resources[type] > 0) {
    			this.resources[type] = this.resources[type] - 1;
    			this.resources['workers'] = this.resources['workers'] + 1;
    			messageService.updateMainMessage('');
    		}
    		else {
    			var errorMessage = 'No ' + type + ' are currently working.';
    			messageService.updateMainMessage(errorMessage, true);
    		}
    	}
    	this.workers = {
    		farmers: {
    			food: 1
    		},
    		miners: {
    			food: -1,
    			wood: -1,
    			ore: 1,
    		},
    		lumberjacks: {
    			food: -1,
    			wood: 1
    		},
    		overseers: {
    			food: -2
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