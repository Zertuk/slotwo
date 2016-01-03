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
		vm.weapons = [];
		vm.armor = [];
		vm.trinkets = [];
		vm.helm = [];
		vm.otherItems = inventoryService.otherItems;
		vm.equippedWeapon = vm.player.weapon;
		vm.equippedArmor = vm.player.armor;
		activate();
		

		function createItemList(items, list) {
			for (var i = 0; i < items.length; i++) {
				if (items[i][1][1] !== 0) {
					list.push(items[i]);
				}
			}
		}

		vm.equipArmor = function() {
			vm.player.armor = vm.itemDictionary[vm.equippedArmor][0][1];
            vm.player.armorValue = vm.player.armor.armor;
			// toSlug(vm.test);
		};

		vm.equipWeapon = function() {
			vm.player.weapon = vm.itemDictionary[vm.equippedWeapon][0][1];
			vm.player.damage = vm.player.weapon.damage;
		};

		function activate() {
			createItemList(inventoryService.armor, vm.armor);
			createItemList(inventoryService.weapons, vm.weapons);
		}
	}
})();
