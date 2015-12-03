(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .controller('DialogueController', DialogueController);

    DialogueController.$inject = ['dialogueService', 'progressService', 'mainService'];

    /* @ngInject */
    function DialogueController(dialogueService, progressService, mainService) {
        console.log(mainService);
        var vm = this;
        vm.switchDialogue = function(input, master) {
            vm.currentMaster = dialogueService[master];
            vm.currentDialogue = vm.currentMaster.dialogue[input];
            vm.locationText = vm.currentDialogue.text;
            special();
        }

        function special() {
            if (typeof vm.currentDialogue.special !== 'undefined') {
                vm.currentDialogue.special();
                console.log('special');
            }
            else {
                console.log(vm.currentDialogue);
            }
        }


        activate();

        ////////////////


        function activate() {
            var initDialogue = mainService.currentLocation.dialogue;
            var key = initDialogue.initDialogue();
            vm.currentDialogue = initDialogue.dialogue[key];
            vm.locationText = vm.currentDialogue.text;
            special();
        }
    }
})();