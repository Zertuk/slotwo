(function() {
    'use strict';

    angular
        .module('app.message')
        .service('messageService', messageService);

    messageService.$inject = [];

    /* @ngInject */
    function messageService() {
        this.addMessage = function(message) {
			vm.messageLog.push(message);
			var elem = document.getElementById('log');
  			elem.scrollTop = elem.scrollHeight;
		}
        ////////////////

        function func() {
        }
    }
})();