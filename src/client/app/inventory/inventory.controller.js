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

		inventoryService.tent.amountCheck();

		function activate() {
		}
		activate();
	}
})();
