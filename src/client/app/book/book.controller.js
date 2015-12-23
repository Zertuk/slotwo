(function() {
    'use strict';

    angular
        .module('app.book')
        .controller('BookController', BookController);

    BookController.$inject = [];

    /* @ngInject */
    function BookController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();