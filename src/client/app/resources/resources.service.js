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

        vm.canBuyMilk = function() {
            if (vm.resources.money > vm.resources.milkPrice) {
                return true;
            }
            else {
                return false;
            }
        };

        vm.raiseMilkPrice = function() {
            var price = vm.resources.milkPrice;
            price = price + price/2;
            price = Math.floor(price);
            vm.resources.milkPrice = price;
        };

    	vm.defaultResources = {
    		money: 0,
    		moneyRate: 1,
            milkPrice: 500
        };

        function loadResources() {
            var resources;
            if (localStorage['resourcesSave']) {
                resources = JSON.parse(atob(localStorage['resourcesSave']));
            }
            else {
                resources = vm.defaultResources;
            }
            console.log(resources);
            return resources;
        }
        vm.resources = loadResources();

        vm.calculateTotlMoneyRate = function() {
            var rate = totalMoneyRate();
            return rate;
        };  

        vm.moneyTick = function() {
            vm.resources.money = vm.resources.money + vm.calculateTotlMoneyRate();
            return vm.resources.money;
        };

        function totalMoneyRate() {
            var moneyRate = 1 + inventoryService.stats.money;
            return moneyRate;
        }
    }
})();