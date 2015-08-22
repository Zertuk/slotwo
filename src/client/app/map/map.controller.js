(function () {
    'use strict';

    angular
        .module('app.maps')
        .controller('MapController', MapController);

    MapController.$inject = [];

    /* @ngInject */
    function MapController() {
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


        vm.gatherResource = function(location, resource) {
            var resourceArray = resource.split('-');
            //will be used in future when linked
            // var duration = resourceArray[0].time * resourceArray[1];
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