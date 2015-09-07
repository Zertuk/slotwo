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
                           '||<span class = "click">.--.</span>    .-._                        .----.             ||',
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


        vm.click = function(x, y, xlength, ylength) {

        }


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