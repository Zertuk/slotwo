(function() {
    'use strict';

    angular
        .module('app.message')
        .service('messageService', messageService);

    messageService.$inject = [];

    /* @ngInject */
    function messageService() {
        this.mainMessage = '';
        this.locationText = '';
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

        this.emptyLog = function() {
            this.messageLog = [];
        };

        this.addMessage = function(message) {
            if (this.messageLog.length > 2) {
                this.messageLog.shift();
            }
			this.messageLog.push(message);
            var elem = angular.element('#log');
            elem.scrollTop = elem.height;
        };
        ///////////////

        function func() {
        }
    }
})();