(function () {
	'use strict';

	angular
		.module('app.inventory')
		.controller('InventoryController', InventoryController);


	InventoryController.$inject = ['$scope', 'inventoryService', 'playerService'];
	/* @ngInject */
	function InventoryController($scope, inventoryService, playerService) {
		var vm = this;
		vm.itemDictionary = inventoryService.itemDictionary;
		vm.player = playerService.player;
		vm.weapons = inventoryService.weapons;
		vm.armor = inventoryService.armor;

		vm.equipArmor = function() {
			vm.player.armor = vm.itemDictionary[vm.test][0][1],
            vm.player.armorValue = vm.itemDictionary[vm.test][0][1].armor
			// toSlug(vm.test);
		}

		// function toSlug(input) {
		// 	var formatted = input.split(' ');
		// 	console.log(formatted)
		// 	formatted[0] = formatted[0].toLowerCase();
		// 	formatted = formatted.join('');
		// 	console.log(formatted);
		// }

		inventoryService.tent.amountCheck();

		function activate() {
		}
		activate();
	}
})();
