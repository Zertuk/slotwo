(function () {
    'use strict';

    angular
        .module('app.maps')
        .controller('MapController', MapController);

    MapController.$inject = ['$rootScope'];

    /* @ngInject */
    function MapController($rootScope) {
        var vm = this;
        
        var Location = function() {
            this.description = "default",
            this.name = "default",
            this.resources = ['test']
        }
        
        vm.forest = new Location();
        vm.forest.name = "Forest";
        vm.forest.description = "The forest";
        vm.forest.resources = ["wood"];



        vm.ascii =        ['||-------------------------------------------------------||',
                           '||.--.    .-._                        .----.             ||',
                           '|||==|____| |H|___            .---.___|""""|_____.--.___ ||',
                           '|||  |====| | |xxx|_          |+++|=-=|_  _|-=+=-|==|---|||',
                           '|||==|    | | |   | \\         |   |   |_\\/_|Black|  | ^ |||',
                           '|||  |    | | |   |\\ \\   .--. |   |=-=|_/\\_|-=+=-|  | ^ |||',
                           '|||  |    | | |   |_\\ \\_( oo )|   |   |    |Magus|  | ^ |||',
                           '|||==|====| |H|xxx|  \\ \\ |xx| |+++|=-=|""""|-=+=-|==|---|||',
                           '||`--^---- -^-^---    `-  xx   ---^---^----^-----^--^---^||',
                           '||-------------------------------------------------------||',
                           '||-------------------------------------------------------||',
                           '||               ___                   .-.__.-----. .---.||',
                           '||              |===| .---.   __   .---| |XX|<(*)>|_|^^^|||',
                           '||         ,  /(|   |_|III|__|  |__|:x:|=|  |     |=| Q |||',
                           '||      _a { / (|===|+|   |++|  |==|   | |  |Illum| | R |||',
                           '||       /\\\\/ _(|===|-|   |  |  |  |:x:|=|  |inati| | Y |||',
                           '||_____  -\\{___(|   |-|   |  |  |  |   | |  |     | | Z |||',
                           '||       _(____)|===|+|[I]|DK|  |==|:x:|=|XX|<(*)>|=|^^^|||',
                           '||              `---^-^---^--^-- --^---^-^--^-----^-^---^||',
                           '||-------------------------------------------------------||',
                           '||_______________________________________________________||']


        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }
        vm.click = function(x, y, xlength, ylength, info) {
            for (var i = 0; i < ylength; i++) {
                var before = '<span class = "click">' + vm.ascii[y + i][x];
                var after = vm.ascii[y + i][5] + '</span>';
                //after then before to not break order!
                vm.ascii[y + i] = setCharAt(vm.ascii[y + i], x + xlength, after);
                vm.ascii[y + i] = setCharAt(vm.ascii[y + i], x, before);
            }
        }
        vm.click(2, 1, 3, 8);

        vm.gatherResource = function(location, resource) {
            var resourceArray = resource.split('-');
            //will be used in future when linked
            // var duration = resourceArray[0].time * resourceArray[1];
            $rootScope.gather = true;
            var duration = 60 * resourceArray[1];

            console.log(duration)
        }


        activate();

        ////////////////

        function activate() {
            // vm.gatherResource(vm.forest, 'wood');
        }
    }
})();