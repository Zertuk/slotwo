(function() {
    'use strict';

    angular
        .module('module')
        .service('levelService', levelService);

    levelService.$inject = ['dependencies'];

    /* @ngInject */
    function levelService(dependencies) {
    	this.levels = {
    		level1: 'test',
    		level2: 'test2'
    	}

    }
})();