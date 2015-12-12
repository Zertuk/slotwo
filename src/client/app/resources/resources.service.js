(function() {
    'use strict';

    angular
        .module('app.resources')
        .service('resourcesService', resourcesService);

    resourcesService.$inject = ['messageService', 'inventoryService', 'progressService'];

    function resourcesService(messageService, inventoryService, progressService) {
    	var vm = this;
        vm.itemDictionary = inventoryService.itemDictionary;
        vm.progress = progressService.progress;

    	vm.moneyTick = function() {
    		vm.resources.money = vm.resources.money + vm.resources.moneyRate;
    		return vm.resources.money;
    	};

    	vm.assignWorker = function(type) {
    		if (vm.resources.workers > 0) {
    			vm.resources[type] = vm.resources[type] + 1;
    			vm.resources['workers'] = vm.resources['workers'] - 1;
    			messageService.updateMainMessage('');
    		}
    		else {
    			messageService.updateMainMessage('No workers available.', true);
    		}
    	};

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
    	};

        vm.craftables = {
            sword: {
                unlock: '',
                active: !vm.progress.woodSwordCrafted,
                text: 'Carve Wooden Sword',
                cost: '50 Wood',
                key: 'sword'
            },
            bridge: {
                unlock: '',
                active: vm.progress.bridgePrompt && !vm.progress.bridgeBuilt,
                text: 'Build Bridge',
                cost: '500 Wood 250 Ore',
                key: 'bridge'
            }
        };

        vm.craftablesKeys = ['sword', 'bridge'];
        
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
    	};

    	vm.resources = {
    		money: 0,
    		moneyRate: 1,
    		workers: 10,
    		lumberjacks: 0,
    		farmers: 0,
    		miners: 0,
    		overseers: 0,
    		food: vm.itemDictionary['food'][1][1],
    		foodUp: 0,
    		foodDown: 0,
    		ore: vm.itemDictionary['ore'][1][1],
    		oreUp: 0,
    		oreDown: 0,
    		wood: vm.itemDictionary['wood'][1][1],
    		woodUp: 0,
    		woodDown: 0,
    		keys: ['farmers', 'miners', 'overseers', 'lumberjacks'],
    		resKeys: ['food', 'wood', 'ore'],
    		updateAmounts: function() {
    			activeWorkers();
    		}
    	};

        vm.regrabAmounts = function() {
            vm.resources.wood = vm.itemDictionary['wood'][1][1];
            vm.resources.food = vm.itemDictionary['food'][1][1];
            vm.resources.ore = vm.itemDictionary['ore'][1][1];
        };

        //init rates, only works if gain when resource > 0
    	vm.initRates = function() {
            //farmers
    		if (vm.workers['farmers'].active) {
    			raiseAmounts('food');
    		}
    		else {
    			vm.resources.foodRate = 0;
    		}
            //lumberjacks
			if (vm.workers['lumberjacks'].active) {
    			raiseAmounts('wood');
    		}
    		else {
    			vm.resources.woodRate = 0;
    		}
            //miners
    		if (vm.workers['miners'].active) {
				raiseAmounts('ore');
			}
			else {
				vm.resources.oreRate = 0;
			}
    	};

        //resource up/down rate calculate
    	function raiseAmounts(resource) {
    		var gainRate = resource + 'Up';
    		var downRate = resource + 'Down';
    		var rate = vm.resources[gainRate] + vm.resources[downRate];
    		vm.resources[resource] = vm.resources[resource] + rate;
    		var totalRate = resource + 'Rate';
    		vm.resources[totalRate] = rate;
    		vm.resources[downRate] = 0;
    		vm.resources[gainRate] = 0;
    	}

        //checks if there are active workers of each type
    	function activeWorkers() {
    		var activeWorkersArray = [];
    		for (var i = 0; i < vm.resources.keys.length; i++) {
    			if (vm.resources[vm.resources.keys[i]] > 0) {
    				activeWorkersArray.push(vm.resources.keys[i]);
    			}
    		}
    		gainsLossesAssign(activeWorkersArray);
    	}

        //checks whether resource is gained or lost for each worker type, based on pos/neg value
    	function gainsLossesAssign(activeWorkersArray) {
    		var keys = activeWorkersArray;
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
    			var totals  = [];
    			var canProduce = checkAmounts(gains, losses, keys[i]);
    		}
    	}

        //checks if enough resources are available for worker to be active
    	function checkAmounts(gains, losses, key) {
    		var error = 0;
    		var canProduce = false;
    		for (var i = 0; i < losses.length; i++) {
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
            //if error, then some resource doesnt have enough, so dont run
            console.log(gains);
    		if (error === 0) {
    			vm.workers[key].active = true;
    			for (var j = 0; j < gains.length; j++) {
    				var gainRate = gains[j] + 'Up';
    				vm.resources[gainRate] = vm.resources[gainRate] + vm.workers[key][gains[j]]*vm.resources[key];
    			}
    		}
    		else {
    			vm.workers[key].active = false;
    		}
            vm.itemDictionary['wood'][1][1] = vm.resources.wood;
            vm.itemDictionary['ore'][1][1] = vm.resources.ore;
            vm.itemDictionary['food'][1][1] = vm.resources.food;
    		vm.initRates();
    	}
  	
    }
})();