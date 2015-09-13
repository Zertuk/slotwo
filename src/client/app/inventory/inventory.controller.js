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

		inventoryService.tent.amountCheck();

		function activate() {
		}
		activate();
	}
})();
