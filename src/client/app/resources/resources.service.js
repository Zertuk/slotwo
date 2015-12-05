(function() {
    'use strict';

    angular
        .module('app.resources')
        .service('resourcesService', resourcesService);

    resourcesService.$inject = ['messageService'];

    function resourcesService(messageService) {
    	var vm = this;
    	vm.moneyTick = function() {
    		vm.resources.money = vm.resources.money + vm.resources.moneyRate;
    		return vm.resources.money;
    	}
    	vm.assignWorker = function(type) {
    		if (vm.resources.workers > 0) {
    			vm.resources[type] = vm.resources[type] + 1;
    			vm.resources['workers'] = vm.resources['workers'] - 1;
    			messageService.updateMainMessage('');
    			vm.initRates();
    		}
    		else {
    			messageService.updateMainMessage('No workers available.', true);
    		}
    	}
    	vm.removeWorker = function(type) {
    		if (vm.resources[type] > 0) {
    			vm.resources[type] = vm.resources[type] - 1;
    			vm.resources['workers'] = vm.resources['workers'] + 1;
    			messageService.updateMainMessage('');
    			vm.initRates();
    		}
    		else {
    			var errorMessage = 'No ' + type + ' are currently working.';
    			messageService.updateMainMessage(errorMessage, true);
    		}
    	}
    	vm.workers = {
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


    	vm.resources = {
    		money: 0,
    		moneyRate: 1,
    		workers: 10,
    		lumberjacks: 0,
    		farmers: 0,
    		miners: 0,
    		overseers: 0,
    		food: 0,
    		ore: 0,
    		wood: 0,
    		produce: function(resource) {
    			var keys = ['farmers', 'miners', 'overseers', 'lumberjacks'];
    			var amount = 0;
    			for (var i = 0; i < keys.length; i++) {
    				if ((vm.resources[keys[i]] > 0) && (typeof vm.workers[keys[i]][resource] !== 'undefined')) {
    					amount = amount + vm.workers[keys[i]][resource]*vm.resources[keys[i]];
    				}
    			}
    			return amount;
    		},
    		foodProduction: function() {
    			var foodUp = vm.workers.farmers.food*vm.resources.farmers;
	    		console.log(foodUp + ' : up');
	    		var foodDown = vm.workers.miners.food*vm.resources.miners
	    		             + vm.workers.lumberjacks.food*vm.resources.lumberjacks
	    		             + vm.workers.overseers.food*vm.resources.overseers;
	    		console.log(foodDown + ' : down');
	    		var foodProduced = foodUp + foodDown;
	    		console.log(foodProduced + ' : produced')
	    		return foodProduced;
    		},
    		oreProduction: function() {
    			var oreUp = vm.workers
    		}
    	}
    	vm.initRates = function() {
    		vm.resources.foodRate = vm.resources.produce('food');
    		vm.resources.oreRate = vm.resources.produce('ore');
    		vm.resources.woodRate = vm.resources.produce('wood');
    	}

    	
    }
})();