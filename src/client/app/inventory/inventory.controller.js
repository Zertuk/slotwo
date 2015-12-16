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
		vm.otherItems = inventoryService.otherItems;
		vm.equippedWeapon = vm.player.weapon;
		vm.equippedArmor = vm.player.armor;

		function armorList() {
			for (var i = 0; i < inventoryService.armor.length; i++) {
				if (inventoryService.armor[i][1][1] !== 0) {
					vm.armor.push(inventoryService.armor[i]);
				} 
			}
		}

		function weaponList() {
			for (var i = 0; i < inventoryService.weapons.length; i++) {
				if (inventoryService.weapons[i][1][1] !== 0) {
					vm.weapons.push(inventoryService.weapons[i]);
				} 
			}
		}

		vm.equipArmor = function() {
			vm.player.armor = vm.itemDictionary[vm.equippedArmor][0][1];
            vm.player.armorValue = vm.player.armor.armor;
			// toSlug(vm.test);
		}

		vm.equipWeapon = function() {
			vm.player.weapon = vm.itemDictionary[vm.equippedWeapon][0][1];
			vm.player.damage = vm.player.weapon.damage;
		}

		vm.equipTrinket = function() {

		}

		// function toSlug(input) {
		// 	var formatted = input.split(' ');
		// 	console.log(formatted)
		// 	formatted[0] = formatted[0].toLowerCase();
		// 	formatted = formatted.join('');
		// 	console.log(formatted);
		// }


		function activate() {
			armorList();
			weaponList();
		}
		activate();
	}
})();
