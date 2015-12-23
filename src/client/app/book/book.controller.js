(function() {
    'use strict';

    angular
        .module('app.book')
        .controller('BookController', BookController);

    BookController.$inject = ['bookService'];

    /* @ngInject */
    function BookController(bookService) {
        var vm = this;

        bookService.func();

        activate();

        ////////////////

        function activate() {
            console.log('book')
        }
    }
})();