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
    		keys: ['farmers', 'miners', 'overseers', 'lumberjacks'],
    		resKeys: ['food', 'wood', 'ore'],
    		produce: function(resource) {
    			var keys = vm.resources.keys;
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
    			var oreUp = vm.workers;
    		},
    		updateAmounts: function() {
    			gainsLossesAssign();
    			var keys = vm.resources.keys;
    			var err = 0;
    			for (var i = 0; i < keys.length; i++) {
    				var food = vm.resources.food;
    				var rate = vm.resources.foodRate;
    				var workers = vm.resources[keys[i]];
    				var total = food + workers*rate;
    				console.log(total);
    				if (total <= 0 ) {
    					err = err + 1;
    				}
    			}
    			if (err === 0) {
    				var resKeys = ['food', 'wood', 'ore'];
    				raiseAmounts(resKeys);
    			}
    			else {
    				var resKeys = ['food']
    				raiseAmounts(resKeys);
    			}
    		}
    	}
    	vm.initRates = function() {
    		vm.resources.foodRate = vm.resources.produce('food');
    		vm.resources.oreRate = vm.resources.produce('ore');
    		vm.resources.woodRate = vm.resources.produce('wood');
    	}

    	function gainsLossesAssign() {
    		console.log('runs ok')
    		var keys = vm.resources.keys;
    		var resKeys = vm.resources.resKeys;
    		for (var i = 0; i < keys.length; i++) {
    			var gains = [];
    			var losses = [];
    			for (var j = 0; j < resKeys.length; j++) {
    				if (vm.workers[keys[i]][resKeys[j]] >= 0) {
    					gains.push(resKeys[j]);
    				}
    				else if (vm.workers[keys[i]][resKeys[j]] < 0) {
    					losses.push(resKeys[j]);
    				}
    			}
    			checkAmounts(gains, losses, keys[i]);
    		}
    	}

    	function checkAmounts(gains, losses, key) {
    		var error = 0;
    		for (var i = 0; i < losses.length; i++) {
    			var rate = losses[i] + 'Rate';
    			if (vm.resources[losses[i]] > 0) {
    				console.log(vm.resources[losses[i]] + ' ' + losses[i])
    				vm.resources[losses[i]] = vm.resources[losses[i]] + vm.resources[rate]*vm.resources[key];
    			}
    			else {
    				error = error + 1;
    				console.log('error ' + losses[i]);
    			}
    		}
    		console.log(error + ' errors');
    		if (error === 0) {
    			console.log(error + 'zero errors')
    			for (var i = 0; i < gains.length; i++) {
	    			var rate = gains[i] + 'Rate';
	    			vm.resources[gains[i]] = vm.resources[gains[i]] + vm.resources[rate]*vm.resources[key];
	    		}
    		}
    		vm.resources[key]
    	}

    	function raiseAmounts(keys) {
    		for (var i = 0; i < keys.length; i ++) {    
		        var rate = keys[i] + 'Rate';
		        vm.resources[keys[i]] = vm.resources[keys[i]] + vm.resources[rate];
		        if (vm.resources[keys[i]] < 0) {
		        	vm.resources[keys[i]] = 0;
		        	messageService.updateMainMessage('Not enough food' ,true);
		        }
		        else {
		        	messageService.updateMainMessage('');
		        }
		   	} 
    	}
   	
    }
})();