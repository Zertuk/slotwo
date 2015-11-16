(function() {
    'use strict';

    angular
        .module('app.template')
        .service('templateService', templateService);

    function templateService() {
        this.func = func;
        this.activeTemplate = 'app/main/main.html';
        this.switchTemplate = function(template) {
        	if (this.activeTemplate !== template) {
        		this.activeTemplate = template;
        	}
        }

        ////////////////

        function func() {

        }
    }

})();