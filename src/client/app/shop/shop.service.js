(function() {
    'use strict';

    angular
        .module('app.shop')
        .service('shopService', shopService);

    shopService.$inject = ['playerService', 'inventoryService'];

    /* @ngInject */
    function shopService(playerService, inventoryService) {
    	var vm = this;
    	vm.initShop = function() {
    		createShopList();
    	}

        // vm.buyItem = function(item) {
        //     console.log(item);
        // }

        vm.shopList = [];

        ////////////////
        vm.initPurchase = function(item) {
            checkBalance(item);
        }
        function createShopList() {
        	for (var i = 0; i < inventoryService.masterItemList.length; i++) {
        		var key = inventoryService.masterItemList[i];
        		var thisItem = inventoryService.itemDictionary[key][0][1];
        		if (thisItem.buyable) {
        			vm.shopList.push(thisItem);
        		}
        	}
 		}


        function checkBalance(item) {
            console.log(item.price);
            console.log(playerService.player.money);
        	if (item.price > playerService.money) {
        		console.log('not enough money');
        	} else {
                console.log('enough money');
        		// subtractCost(item);
        		// addToInventory(item);
        		// checkQuantity(item);
        	}
        }

        function subtractCost(item) {
        	playerService.money = playerService.money - item.price;
        }

        function addItem(item) {
        	if (typeof item.unlock !== 'undefined') {
        		inventoryService.itemDictionary[item.unlock][0][1].buyable = true;
        	}
        }

		function removeItem(item) {
			if (item.removeAfterBuy) {
				item.buyable = false;
			}
        }

        function displayNextItem(item) {

        }

        function checkQuantity(item) {

        }

        function increasePrice(item) {

        }

        function addToInventory(item) {
        	item.quantity = item.quantity + 1;
        }

    }
})();