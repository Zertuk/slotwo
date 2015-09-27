(function () {
	'use strict';

	angular
		.module('app.inventory')
		.controller('InventoryController', InventoryController);


	InventoryController.$inject = ['$scope', 'inventoryService'];
	/* @ngInject */
	function InventoryController($scope, inventoryService) {
		var vm = this;
		vm.itemDictionary = inventoryService.itemDictionary;
		vm.weapons = inventoryService.weapons;
		vm.armor = inventoryService.armor;

		inventoryService.tent.amountCheck();

		function activate() {
		}
		activate();
	}
})();
