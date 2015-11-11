(function() {
    'use strict';

    angular
        .module('app.message')
        .service('messageService', messageService);

    messageService.$inject = [];

    /* @ngInject */
    function messageService() {
    	this.messageLog = [];
        this.mainMessage = '';
        this.messageError = false;

        //first var = message, second var = whether message is good or bad
        this.updateMainMessage = function(messageInput, bad) {
            this.mainMessage = messageInput;
            if (bad) {
                this.messageError = true;
            }
            else {
                this.messageError = false;
            }
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