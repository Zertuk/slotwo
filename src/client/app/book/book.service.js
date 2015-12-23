(function() {
    'use strict';

    angular
        .module('app.book')
        .service('bookService', bookService);

    bookService.$inject = ['enemyService'];

    /* @ngInject */
    function bookService(enemyService) {
        this.func = func;
        var keys = enemyService.keys;
        this.enemyArray = fakeEnemy();


        var test = new enemyService['Bear']();

        function fakeEnemy() {
            var enemyArray = [];
            for (var i = 0; i < keys.length; i++) {
                var enemy = new enemyService[keys[i]]();
                enemyArray.push(enemy);
            }
            console.log(enemyArray)
            return enemyArray;
        }
        function func() {

        }
    }
})();