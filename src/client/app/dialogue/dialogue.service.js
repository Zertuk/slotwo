(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .service('dialogueService', dialogueService);

    // Service.$inject = ['dependencies'];

    /* @ngInject */
    function dialogueService() {
        var vm = this;
        vm.locationText = '';

        vm.Dialogue = function() {
        };

        vm.treeKing = new vm.Dialogue;

        vm.treeKing.dialogue = {
            question: {
                text: 'Now, what can I do for you?',
                buttons : {
                    workAccepted: {
                        text: 'Missing travelers',
                        next: 'askWorkAccepted',
                        master: 'treeKing'
                    },
                    work: {
                        text: 'Any work you need done?',
                        next: 'askWork',
                        master: 'treeKing'
                    },
                    rumor: {
                        text: 'Rumors in the area',
                        next: 'askRumor',
                        master: 'treeKing'
                    },
                    compliment: {
                        text: 'Compliment',
                        next: 'askCompliment',
                        master: 'treeKing'
                    }
                },
                continue: false
            },
            introduction: {
                text: 'Greetings, I am King Treemaster.  Welcome to our city, outsider.',
                next: 'question',
                master: 'treeKing',
                continue: true
            },
            askWork: {
                text: 'Yes, there are some things we need done.  Lately we have had an issue with travelers going missing in the forest. It has caused our trade to slow down and people are starting to feel the shortage of goods.  One of our scouts reported seeing something to the desert north of the forest, perhaps you can start there?',
                buttons: {
                    accept: {
                        text: 'I will find the missing villagers',
                        next: 'askWorkAccept',
                        master: 'treeKing'
                    },
                    refuse: {
                        text: 'This type of work is beneath me',
                        next: 'askWorkRefuse',
                        master: 'treeKing'
                    }
                }
            },
            askWorkAccept: {
                text: 'Great! Please let me know if you find anything.',
                next: 'question',
                master: 'treeKing',
                continue: true
            },
            askWorkRefuse: {
                text: 'Well.  It is unfortunate you feel that way, however, this is the only work I have for an outsider.',
                buttons: {
                    accept: {
                        text: 'Alright.. I will search the desert.',
                        next: 'askWorkAccept',
                        master: 'treeKing'
                    }
                }
            },
            askWorkAccepted: {
                text: 'Any news from your search in the desert?',
                buttons: {
                    yes: {
                        text: 'news',
                        next: 'askWorkComplete',
                        master: 'treeKing'
                    },
                    no: {
                        text: 'Not yet',
                        next: 'askWork',
                        master: 'treeKing'
                    }
                }
            }
        }



        vm.locationMessage = function(message) {
            vm.locationText = vm.treeKing.dialogue['introduction'].text;
        }


        ////////////////

        function func() {
        }
    }
})();