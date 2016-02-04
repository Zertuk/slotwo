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
        vm.itemDictionary = inventoryService.itemDictionary;

    	vm.initShop = function() {
    		createShopList();
    	};

        vm.initPurchase = function(item) {
            checkBalance(item);
        };

        vm.grabItemDictionary = function() {
            return vm.itemDictionary;
        };

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

        function addToInventory(item) {
            if (typeof item.special !== 'undefined') {
                item.special();
            }
            inventoryService.findVal();
            messageService.updateMainMessage(item.name + ' has been purchased.');
        	inventoryService.itemDictionary[item.slug][1][1] = inventoryService.itemDictionary[item.slug][1][1] + 1;
            removeItem(item);
        }

    }
})();