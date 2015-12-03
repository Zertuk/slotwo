(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .controller('DialogueController', DialogueController);

    DialogueController.$inject = ['dialogueService', 'progressService'];

    /* @ngInject */
    function DialogueController(dialogueService, progressService) {
        var vm = this;
        vm.title = 'Controller';
        console.log(progressService.test);
        vm.switchDialogue = function(input, master) {
            vm.currentMaster = dialogueService[master];
            vm.currentDialogue = vm.currentMaster.dialogue[input];
            vm.locationText = vm.currentDialogue.text;
        }


        activate();

        ////////////////


        function activate() {
            vm.currentDialogue = dialogueService.treeKing.dialogue['introduction'];
            vm.locationText = vm.currentDialogue.text;
            console.log(dialogueService.treeKing.dialogue['question']);
        }
    }
})();