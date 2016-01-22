(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .controller('DialogueController', DialogueController);

    DialogueController.$inject = ['dialogueService', 'progressService', 'mainService', 'inventoryService'];

    /* @ngInject */
    function DialogueController(dialogueService, progressService, mainService, inventoryService) {
        var vm = this;
        dialogueService.initAllDialogues();
        activate();
        vm.passText = 'You have the passcode?';

        vm.switchDialogue = function(input, master) {
            vm.currentMaster = dialogueService[master];
            vm.currentDialogue = vm.currentMaster.dialogue[input];
            vm.locationText = vm.currentDialogue.text;
            special();
        };

        vm.switchLevel = function(level) {
            vm.currentLocation = mainService.switchLevel(level);
        };

        vm.passSubmit = function() {
            vm.passcode = vm.passcode.toUpperCase();
            if (vm.passcode === 'AQKX') {
                vm.passComplete = true;
                progressService.progress.passCode = true;
                inventoryService.itemDictionary['sweetJacket'][1][1] = 1;
                vm.passText = 'Nice!  Thats the passcode alright.  You solved my riddle, now here is your prize. *The man hands you a [Sweet Jacket]!*';
            }
            else {
                vm.passText = 'Hey! Thats not the passcode!';
            }
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
            vm.passcode = '';
            vm.currentDialogue = initDialogue.dialogue[key];
            vm.locationText = vm.currentDialogue.text;
            special();
        }
    }
})();