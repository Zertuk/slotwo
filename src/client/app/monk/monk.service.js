(function() {
    'use strict';

    angular
        .module('app.monk')
        .service('monkService', monkService);

    monkService.$inject = ['messageService'];

    /* @ngInject */
    function monkService(messageService) {
    	var vm = this;

    	vm.train = function(type) {
    		var check = trainCheck();
    		if (check) {
    			messageService.updateMainDialogue('train')
    		}
    		else {
    			messageService.updateMainDialogue('no train', true);
    		}
    	}

    	vm.trainBattle = function() {
    	}

    	vm.trainDefense = function() {
    		var check = trainCheck();

    	}

    	vm.trainMoney = function() {
    		var check = trainCheck();

    	}

    	function trainCheck() {

    	}
    }
})();