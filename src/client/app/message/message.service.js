(function() {
    'use strict';

    angular
        .module('app.message')
        .service('messageService', messageService);

    messageService.$inject = [];

    /* @ngInject */
    function messageService() {
    	this.messageLog = [];
        this.mainMessage = 'default';

        this.updateMainMessage = function(messageInput) {
            this.mainMessage = messageInput;
        };

        this.addMessage = function(message) {
			this.messageLog.push(message);
			var elem = document.getElementById('log');
  			elem.scrollTop = elem.scrollHeight;
		};
        ///////////////

        function func() {
        }
    }
})();