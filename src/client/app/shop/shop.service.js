(function() {
    'use strict';

    angular
        .module('app.shop')
        .service('shopService', shopService);

    shopService.$inject = ['playerService', 'inventoryService', 'resourcesService', 'messageService'];

    /* @ngInject */
    function shopService(playerService, inventoryService, resourcesService, messageService) {
    	var vm = this;
        vm.resources = resourcesService.resources;

    	vm.initShop = function() {
    		createShopList();
    	}

        vm.initPurchase = function(item) {
            checkBalance(item);
        }

        ////////////////

        function createShopList() {
            vm.shopList = [];
        	for (var i = 0; i < inventoryService.buyableItems.length; i++) {
        		var key = inventoryService.buyableItems[i];
        		var thisItem = inventoryService.itemDictionary[key][0][1];
        		if (thisItem.buyable) {
        			vm.shopList.push(thisItem);
        		}
        	}
 		}

        function checkBalance(item) {
        	if (item.price > vm.resources.money) {
        		messageService.updateMainMessage('Not enough money.', true);
        	} else {
        		subtractCost(item);
        		addToInventory(item);
        	}
        }

        function subtractCost(item) {
        	vm.resources.money = vm.resources.money - item.price;
        }

        function addItem(item) {
        	if (typeof item.unlock !== 'undefined') {
        		inventoryService.itemDictionary[item.unlock][0][1].buyable = true;
        	}
        }

		function removeItem(item) {
			if (item.removeAfterBuy) {
				item.buyable = false;
                displayNextItem(item);
                createShopList();
			}
        }

        function displayNextItem(item) {
            if (typeof item.unlock !== 'undefined') {
                inventoryService.itemDictionary[item.unlock][0][1].buyable = true;
            }
        }

        function increasePrice(item) {

        }

        function addToInventory(item) {
            messageService.updateMainMessage(item.name + ' has been purchased.');
        	item.quantity = item.quantity + 1;
            removeItem(item);
        }

    }
})();