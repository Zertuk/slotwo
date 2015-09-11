(function() {
    'use strict';

    angular
        .module('app.battle')
        .service('battleService', battleService);

    // levelService.$inject = ['dependencies'];

    /* @ngInject */
    function battleService() {
    	this.level = {
    		level1: 'test',
    		level2: 'test2'
    	}

    }
})();