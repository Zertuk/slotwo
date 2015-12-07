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
    		}
    		else {
    			var errorMessage = 'No ' + type + ' are currently working.';
    			messageService.updateMainMessage(errorMessage, true);
    		}
    	}
        
    	vm.workers = {
    		farmers: {
    			food: 1,
    			active: false
    		},
    		miners: {
    			food: -1,
    			wood: -1,
    			ore: 1,
    			active: false
    		},
    		lumberjacks: {
    			food: -1,
    			wood: 1,
    			active: false
    		},
    		overseers: {
    			food: -2,
    			active: false
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
    		foodUp: 0,
    		foodDown: 0,
    		ore: 0,
    		oreUp: 0,
    		oreDown: 0,
    		wood: 0,
    		woodUp: 0,
    		woodDown: 0,
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
    		updateAmounts: function() {
    			activeWorkers();
    		}
    	}
    	vm.initRates = function() {
    		if (vm.workers['farmers'].active) {
    			vm.resources.foodRate = vm.resources.produce('food');
    			raiseAmounts('food');
    		}
    		else {
    			vm.resources.foodRate = 0;
    		}
			if (vm.workers['lumberjacks'].active) {
    			vm.resources.woodRate = vm.resources.produce('wood');
    			raiseAmounts('wood');
    		}
    		else {
    			vm.resources.woodRate = 0;
    		}
    		if (vm.workers['miners'].active) {
				vm.resources.oreRate = vm.resources.produce('ore');
				raiseAmounts('ore');
			}
			else {
				vm.resources.oreRate = 0;
			}
    	}

    	function raiseAmounts(resource) {
    		var gainRate = resource + 'Up';
    		var downRate = resource + 'Down'
    		var rate = vm.resources[gainRate] + vm.resources[downRate];
    		vm.resources[resource] = vm.resources[resource] + rate;
    		var totalRate = resource + 'Rate';
    		vm.resources[totalRate] = rate;
    		vm.resources[downRate] = 0;
    		vm.resources[gainRate] = 0;
    	}

    	function activeWorkers() {
    		var activeWorkers = [];
    		for (var i = 0; i < vm.resources.keys.length; i++) {
    			if (vm.resources[vm.resources.keys[i]] > 0) {
    				activeWorkers.push(vm.resources.keys[i]);
    			}
    		}
    		gainsLossesAssign(activeWorkers);
    	}

    	function gainsLossesAssign(activeWorkers) {
    		var keys = activeWorkers;
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
    			var totals  = []
    			var canProduce = checkAmounts(gains, losses, keys[i]);
    		}
    	}

    	function checkAmounts(gains, losses, key) {
    		var error = 0;
    		var canProduce = false;
    		for (var i = 0; i < losses.length; i++) {
    			console.log(vm.resources[losses[i]]);
    			console.log(vm.resources[key])
    			if (vm.workers[key][losses[i]]*vm.resources[key]*-1 <= vm.resources[losses[i]]) {
    				var lossRate = losses[i] + 'Down';
    				vm.resources[lossRate] = vm.resources[lossRate] + vm.workers[key][losses[i]]*vm.resources[key];
    			}
    			else {
    				error = error + 1;
    				var errorMessage = 'Not enough ' + losses[i];
    				messageService.updateMainMessage(errorMessage, true);
    			}
    		}
    		if (error === 0) {
    			vm.workers[key].active = true;
    			for (var i = 0; i < gains.length; i++) {
    				var gainRate = gains[i] + 'Up';
    				vm.resources[gainRate] = vm.resources[gainRate] + vm.workers[key][gains[i]]*vm.resources[key];
    			}
    		}
    		else {
    			vm.workers[key].active = false;
    		}
    		vm.initRates();
    	}
  	
    }
})();