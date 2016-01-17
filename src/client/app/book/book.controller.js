(function() {
    'use strict';

    angular
        .module('app.book')
        .controller('BookController', BookController);

    BookController.$inject = ['progressService', 'bookService'];

    /* @ngInject */
    function BookController(progressService, bookService) {
        var vm = this;
        vm.enemyArray = bookService.enemyArray;
        vm.enemyProgress = progressService.progress.enemies;
        vm.enemyLooted = progressService.progress.looted;
    }
})();