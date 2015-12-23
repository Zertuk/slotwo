(function() {
    'use strict';

    angular
        .module('app.book')
        .service('bookService', bookService);

    bookService.$inject = [];

    /* @ngInject */
    function bookService() {
        this.func = func;

        ////////////////

        function func() {
        }
    }
})();