(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .controller('DialogueController', DialogueController);

    DialogueController.$inject = ['dialogueService', 'progressService', 'mainService'];

    /* @ngInject */
    function DialogueController(dialogueService, progressService, mainService) {
        var vm = this;
        dialogueService.initAllDialogues();
        activate();


        vm.switchDialogue = function(input, master) {
            vm.currentMaster = dialogueService[master];
            vm.currentDialogue = vm.currentMaster.dialogue[input];
            vm.locationText = vm.currentDialogue.text;
            special();
        };

        vm.switchLevel = function(level) {
            vm.currentLocation = mainService.switchLevel(level);
        };

        function special() {
            if (typeof vm.currentDialogue.special !== 'undefined') {
                vm.currentDialogue.special();
            }
        }

        ////////////////


        function activate() {
            var location = mainService.currentLocation;
            var initDialogue = location.dialogue;
            var key = initDialogue.initDialogue();
            vm.currentDialogue = initDialogue.dialogue[key];
            vm.locationText = vm.currentDialogue.text;
            special();
        }
    }
})();