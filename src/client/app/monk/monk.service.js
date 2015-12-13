(function() {
    'use strict';

    angular
        .module('app.monk')
        .service('monkService', monkService);

    monkService.$inject = ['messageService', 'progressService'];

    /* @ngInject */
    function monkService(messageService, progressService) {
    	var vm = this;
    	vm.progress = progressService.progress;

    	vm.train = function(type) {
    		var check = trainCheck();
    		if (check) {
    			//firt letter capital always just in case
    			type = type[0].toUpperCase() + type.slice(1);
    			var key = 'train' + type;
    			vm.progress[key] = true;
    			messageService.updateMainMessage('train');
    		}
    		else {
    			messageService.updateMainMessage('no train', true);
    		}
    	}

    	function trainCheck() {
    		return true;
    	}
    }
})();