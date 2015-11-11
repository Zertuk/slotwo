(function() {
    'use strict';

    angular
        .module('app.message')
        .directive('messageDirective', messageDirective);

    messageDirective.$inject = ['messageService', 'mainService'];

    /* @ngInject */
    function messageDirective(messageService, mainService) {
        // Usage:
        //
        // Creates:
        //
        var bad = messageService.bad;
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                messageerror: '@'
            }
        };
        return directive;



        function link(scope, element, attrs) {
	        scope.$watch('messageerror', function() {
                console.log(attrs.messageerror);
	        	if (attrs.messageerror == 'true') {
	        		element.addClass('error');
	        	}
	        	else {
	        		element.removeClass('error');
	        	}
			});
        }
    }



})();