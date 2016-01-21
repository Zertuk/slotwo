(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .service('dialogueService', dialogueService);

    dialogueService.$inject = ['progressService', 'monkService', 'playerService', 'resourcesService', 'inventoryService'];

    /* @ngInject */
    function dialogueService(progressService, monkService, playerService, resourcesService, inventoryService) {
        var vm = this;
        vm.locationText = '';
        vm.resources = resourcesService.resources;
        vm.progress = progressService.progress;
        vm.player = playerService.player;
        vm.itemDictionary = inventoryService.itemDictionary;

        vm.Dialogue = function() {
            //return intro by default
            this.initDialogue = function() {
                return 'introduction';
            };
        };

        //Dialogue function purposes

        //initDialogue : sets initial dialogue on location switch
        //setDialogue : set up for the dialogue, runs to grab conditional changes for dialogue


        //init&reset quiz results for elder quiz
        function initQuiz() {
            var results = {
                offense: 0,
                defense: 0,
                healing: 0
            };
            return results;
        }

        //arena dialogue
        vm.arena = new vm.Dialogue();
        vm.arena.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Welcome to the arena!  I am Abner; Owner, showman, and gentleman!  We are still taking contestants for tonights show if you are interested.  Defeat your opponent and win passage across The Bridge!  Or, if you just need to train, I can hook you up.',
                    buttons: {
                        fight: {
                            text: 'I am here to fight.',
                            next: 'fight',
                            active: true,
                            master: 'arena'
                        },
                        train: {
                            text: 'Hook me up with training!',
                            next: 'train',
                            active: !vm.progress.freeSample,
                            master: 'arena'
                        },
                        buy: {
                            text: 'I need some more training formula (' + resourcesService.resources.milkPrice + 'g)',
                            next: 'buy',
                            active: vm.progress.freeSample&&resourcesService.canBuyMilk(),
                            master: 'arena'
                        },
                        notEnoughMoney: {
                            text: 'I need some more training formula (' + resourcesService.resources.milkPrice + 'g)',
                            next: 'notEnoughMoney',
                            active: vm.progress.freeSample&&!resourcesService.canBuyMilk(),
                            master: 'arena'
                        },
                        secret: {
                            text: 'Whats the secret to the formula?',
                            next: 'secret',
                            active: vm.progress.freeSample&&!vm.progress.signedNDA,
                            master: 'arena'
                        },
                        skeleton: {
                            text: 'Are you a skeleton?',
                            next: 'skeleton',
                            active: true,
                            master: 'arena'
                        }
                    }
                },
                notEnoughMoney: {
                    text: 'Sorry! You are going to need more money than that.  Current price is ' + resourcesService.resources.milkPrice + 'g.',
                    continue: true,
                    next: 'introduction',
                    master: 'arena',
                    special: function() {
                        vm.initAllDialogues();
                    }
                },
                secret: {
                    text: 'I will only share my secret once you sign this NDA!  I cant risk a product this good.',
                    buttons: {
                        sign: {
                            text: 'Sign the NDA',
                            next: 'sign',
                            master: 'arena',
                            active: true
                        },
                        refuse: {
                            text: 'Im not signing anything.',
                            next: 'refuse',
                            master: 'arena',
                            active: true
                        }
                    }
                },
                buy: {
                    text: 'Alright one bottle coming up!',
                    next: 'introduction',
                    continue: true,
                    master: 'arena',
                    special: function() {
                        vm.player.baseHealth = vm.player.baseHealth + 50;
                        vm.player.maxHealth = vm.player.calculateTotalHealth();
                        resourcesService.resources.money = resourcesService.resources.money - resourcesService.resources.milkPrice;
                        resourcesService.raiseMilkPrice();
                        vm.initAllDialogues();
                    }
                },
                refuse: {
                    text: 'Your loss!  Ill keep this NDA handy if you change your mind.',
                    next: 'introduction',
                    master: 'arena',
                    active: true,
                    continue: true
                },
                sign: {
                    text: 'Alright heres the scoop.  You know the animal "cow" right?  Well I found that lady cows can excreet white fluid.  I took a drink of it and I was in utter shock!  Every glass of this stuff makes you healthier.  My bones have never been stronger!',
                    next: 'introduction',
                    continue: true,
                    master: 'arena',
                    special: function() {
                        vm.progress.signedNDA = true;
                        vm.initAllDialogues();
                    }
                },
                fight: {
                    text: 'The match tonight is against a swarm of Giant Bugs!  Win your match and you gain passage to The Bridge.  Its a fullhouse tonight, give them a show!',
                    continue: true,
                    level: 'arena'
                },
                train: {
                    text: 'Splendid! Here is a free sample of my special training formula, after that one I will have to charge you gold.  Drink up!',
                    continue: true,
                    next: 'introduction',
                    master: 'arena',
                    special: function() {
                        vm.player.baseHealth = vm.player.baseHealth + 50;
                        vm.player.maxHealth = vm.player.calculateTotalHealth();
                        vm.progress.freeSample = true;
                        vm.initAllDialogues();
                    }
                },
                skeleton: {
                    text: 'Why yes I am.  You dont have a problem with that do you?',
                    continue: true,
                    master: 'arena',
                    next: 'introduction'
                }
            };
            return dialogue;
        };

        //wizard in bear dialogue
        vm.wizard = new vm.Dialogue();
        vm.wizard.initDialogue = function() {
            if (vm.progress.lichReveal) {
                return 'lich';
            }
            else if (vm.progress.wizardMet) {
                return 'question';
            }
            else {
                return 'introduction';
            }
        };
        vm.wizard.ascii = 'regular';
        vm.wizard.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Oh hello.  If I had known you were coming I would have disabled my snowmen sentries!',
                    next: 'question',
                    special: function() {
                        vm.progress.levels.snowNorth = true;
                    },                    
                    buttons: {
                        kill: {
                            text: 'Dont worry, they were no problem.',
                            next: 'kill',
                            active: true,
                            master: 'wizard'
                        },
                        sorry: {
                            text: 'Sorry for killing your buddies...',
                            next: 'sorry',
                            active: true,
                            master: 'wizard'
                        }
                    }
                },
                kill: {
                    text: 'Wow! You must be pretty strong to withstand Garys chilly attack!',
                    next: 'introFinish',
                    continue: 'true',
                    master: 'wizard'
                },
                sorry: {
                    text: 'They arent my buddies.  They are magic!  You must be strong if you can take down Gary though!',
                    buttons: {
                        intel: {
                            text: 'What if they are intelligent and conscious?!',
                            next: 'intel',
                            active: true,
                            master: 'wizard'
                        },
                        cool: {
                            text: 'Cool! Guilt free killing!',
                            next: 'cool',
                            active: true,
                            master: 'wizard'
                        },
                        introFinish: {
                            text: 'Alright...',
                            next: 'introFinish',
                            active: true,
                            master: 'wizard'
                        }
                    }
                },
                cool: {
                    text: 'Yeah it is pretty great, although sometimes I run low on mana after killing too many! Oops~',
                    next: 'introFinish',
                    master: 'active,',
                    continue: true
                },
                intel: {
                    text: 'Oh man.  When a creature created by magic has gone rogue its a real problem.  It is wizard code to disable them.  Or maybe it is just my code?  Who cares!',
                    buttons: {
                        rip: {
                            text: 'I am sorry Gary and friends ;-;',
                            next: 'rip',
                            active: true,
                            master: 'wizard'
                        },
                        introFinish: {
                            text:'Oh, okay!',
                            next: 'introFinish',
                            active: true,
                            master: 'wizard'
                        }
                    }
                },
                rip: {
                    text: '* Gary and his friends cast Snowmens Blessing on you, as a thank you for acknowledging them ;-; *',
                    special: function() {
                        vm.itemDictionary['snowmenBlessing'][1][1] = 1;
                        inventoryService.findVal();
                        vm.player.maxHealth = vm.player.calculateTotalHealth();
                    },
                    continue: true,
                    next: 'introFinish',
                    master: 'wizard'
                },
                introFinish: {
                    text: 'Anyway, welcome to my home!  I am the wizard of this land.',
                    continue: true,
                    next: 'question',
                    master: 'wizard',
                    special: function() {
                        vm.progress.wizardMet = true;
                        vm.initAllDialogues();
                    }
                },
                question: {
                    text: 'Well, you came here for a reason right?  What do you need?',
                    buttons: {
                        whatsItLike: {
                            text: 'Whats it like to be a wizard?',
                            next: 'whatsItLike',
                            master: 'wizard',
                            active: true
                        },
                        sky: {
                            text: 'Whats the deal with the sky attack?',
                            next: 'sky',
                            master: 'wizard',
                            active: !vm.progress.wizardTask
                        },
                        task: {
                            text: 'What did you want me to do?',
                            next: 'task',
                            master: 'wizard',
                            active: vm.progress.wizardTask&&!vm.progress.vialTaken
                        },
                        bear: {
                            text: 'Why do you live in a giant bear?',
                            next: 'bear',
                            master: 'wizard',
                            active: true
                        },
                        vial: {
                            text: 'I found this in the meteorite',
                            next: 'vial',
                            master: 'wizard',
                            active: vm.progress.vialTaken
                        }                        
                    }
                },
                vial: {
                    text: 'Quick...  Hand that vial to me!',
                    next: 'giveVial',
                    master: 'wizard',
                    continue: true
                },
                giveVial: {
                    text: '*You hand the wizard the vial*',
                    next: 'doom',
                    master: 'wizard',
                    continue: true
                },
                doom: {
                    text: 'Yes...  THE PHYLACTERY! Finally!',
                    continue: true,
                    next: 'doom2',
                    master: 'wizard'
                },
                doom2: {
                    text: '*The wizard starts casting a strange spell on the vial*',
                    continue: true,
                    next: 'doom3',
                    master: 'wizard',
                    special: function() {
                        vm.wizard.ascii = 'spell';
                    }
                },
                doom3: {
                    text: 'I can feel the power!  The power of...',
                    continue: true,
                    next: 'doom4',
                    master: 'wizard'
                },
                doom4: {
                    text: 'THE LICH',
                    continue: true,
                    next: 'memory',
                    master: 'wizard',
                    special: function() {
                        vm.wizard.ascii = 'lich';
                        vm.progress.lichReveal = true;
                    }
                },
                memory: {
                    text: '*Flashes of your memory return, dark memories of THE LICH.*',
                    next: 'lich',
                    continue: true,
                    master: 'wizard'
                },
                lich: {
                    text: 'I am awoken.  KNEEL before me mortal filth.',
                    buttons: {
                        trick: {
                            text: 'You tricked me!',
                            next: 'trick',
                            master: 'wizard',
                            active: true
                        },
                        never: {
                            text: 'I will never kneel to you, LICH SCUM',
                            next: 'never',
                            master: 'wizard',
                            active: true
                        }
                    }
                },
                trick: {
                    text: 'No, the wizard tricked you.  His soul was an offering.  KNEEL before me or join him!',
                    buttons: {
                        never: {
                            text: 'I will never kneel to you, LICH SCUM',
                            next: 'never',
                            master: 'wizard',
                            active: true
                        }
                    }
                },
                never: {
                    text: 'FOOL.  This world will fall beneath my might, as many have before it!',
                    continue: true,
                    next: 'memory2',
                    master: 'wizard'
                },
                memory2: {
                    text: '*Memories of other worlds return, tainted by THE LICH...',
                    continue: true,
                    next: 'end',
                    master: 'wizard'
                },
                end: {
                    text: 'Y O U W I L L P E R I S H',
                    continue: true,
                    next: 'lichfight',
                    level: true
                },
                task: {
                    text: 'Head to the northern mountains, take out the giant robot, and bring me a sample of the meteorite!',
                    next: 'question',
                    continue: true,
                    master: 'wizard'
                },
                bear: {
                    text: 'Because I can!  It has been my dream since I was a wee wizard to live in a bear.  Maybe you can too someday! Probably not though.',
                    continue: true,
                    next: 'question',
                    master: 'wizard'
                },
                hair: {

                },
                whatsItLike: {

                },
                sky: {
                    text: 'Is that what the commoners are calling it?  Well it was a meteor of some sort.  However!  There is some type of giant robot protecting the meteor!',
                    continue: true,
                    next: 'robot',
                    master: 'wizard'
                },
                robot: {
                    text: 'Yeah thats right, a giant robot!  I need someone to take it out for me so I can do research on the meteor, are you interested?',
                    buttons: {
                        sure: {
                            text: 'Sure, I am interested.',
                            next: 'sure',
                            active: true,
                            master: 'wizard'
                        },
                        you: {
                            text: 'Why dont you kill it?',
                            next: 'you',
                            active: true,
                            master: 'wizard'
                        },
                        no: {
                            text: 'No thanks.',
                            next: 'no',
                            active: true,
                            master: 'wizard'
                        }
                    }
                },
                sure: {
                    text: 'Awesome!  You need to head to the mountains of the north and take out the robot.  Once he is taken care of, you need to take a sample from the meteorite and bring it back to me.',
                    next: 'counting',
                    continue: true,
                    master: 'wizard'
                },
                counting: {
                    text: 'You should check in with that monk in the mountains who trains people.  Maybe he can teach you another trick to get by.  I am counting on you, this is for very important wizard research!',
                    continue: true,
                    next: 'question',
                    master: 'wizard',
                    special: function() {
                        vm.progress.wizardTask = true;
                        vm.progress.canLearn = vm.progress.canLearn + 1;
                        vm.progress.levels.robot = true;
                        vm.initAllDialogues();
                    }
                },
                you: {
                    text: 'Wow!  Do you know anything?  Everyone knows robots are immune to magic, its the first lesson in wizard school! So will you kill the robot for me or what?',
                    buttons: {
                        no: {
                            text: 'No thanks.',
                            next: 'no',
                            active: true,
                            master: 'wizard'
                        },
                        sure: {
                            text: 'Alright, I will do it.',
                            next: 'no',
                            active: true,
                            master: 'wizard'
                        }
                    }
                }
            };
            return dialogue;
        };

        vm.cabin = new vm.Dialogue();
        vm.cabin.initDialogue = function() {
            if (vm.progress.passCode) {
                return 'complete';
            }
            else {
                return 'introduction';
            }
        };
        vm.cabin.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: '',
                    input: true
                },
                complete: {
                    text: 'Sorry, the riddle is over, please leave..'
                }
            };
            return dialogue;
        };

        vm.treeKing = new vm.Dialogue();
        vm.treeKing.initDialogue = function() {
            if (!vm.progress.treeKingIntro) {
                return 'introduction';
            }
            else {
                return 'question';
            }
        };
        vm.treeKing.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Greetings, I am King Treemaster.  Welcome to our city, outsider.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingIntro = true;
                    }
                },
                question: {
                    text: 'Now, what can I do for you?',
                    buttons : {
                        workAccepted: {
                            text: 'Missing travelers',
                            next: 'askWorkAccepted',
                            master: 'treeKing',
                            active: vm.progress.treeKingWorkAccept&&!vm.progress.treeKingWorkHandIn
                        },
                        work: {
                            text: 'Any work you need done?',
                            next: 'askWork',
                            master: 'treeKing',
                            active: !vm.progress.treeKingWorkAccept
                        },
                        rumor: {
                            text: 'Rumors in the area',
                            next: 'askRumor',
                            master: 'treeKing',
                            active: true
                        },
                        compliment: {
                            text: 'Compliment',
                            next: 'askCompliment',
                            master: 'treeKing',
                            active: vm.progress.treeKingCompliment
                        }
                    }
                },
                askRumor: {
                    text: 'Things have been weird since the sky attacked.  Scouts have been going missing and there is even word of weather change in the east.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true
                },
                askCompliment: {
                    text: 'Flattery will get you nowhere with me, outsider.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingCompliment = false;
                        vm.treeKing.dialogue = vm.treeKing.setDialogue();
                    }
                },
                askWork: {
                    text: 'Yes, there are some things we need done.  Lately we have had an issue with travelers going missing in the forest. It has caused our trade to slow down and people are starting to feel the shortage of goods.  One of our scouts reported seeing something to the desert north of the forest, perhaps you can start there?',
                    buttons: {
                        accept: {
                            text: 'I will find the missing villagers',
                            next: 'askWorkAccept',
                            master: 'treeKing',
                            active: true
                        },
                        refuse: {
                            text: 'This type of work is beneath me',
                            next: 'askWorkRefuse',
                            master: 'treeKing',
                            active: true
                        }
                    }
                },
                askWorkAccept: {
                    text: 'Great! Please return here if you find anything.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingWorkAccept = true;
                        vm.progress.levels.desert = true;
                        vm.treeKing.dialogue = vm.treeKing.setDialogue();
                    }
                },
                askWorkRefuse: {
                    text: 'Well.  It is unfortunate you feel that way, however, this is the only work I have for an outsider.',
                    buttons: {
                        accept: {
                            text: 'Alright.. I will search the desert.',
                            next: 'askWorkAccept',
                            master: 'treeKing',
                            active: true
                        }
                    }
                },
                askWorkAccepted: {
                    text: 'Any news from your search in the desert?',
                    buttons: {
                        yes: {
                            text: 'Yes, I killed the beast.',
                            next: 'askWorkComplete',
                            master: 'treeKing',
                            active: vm.progress.levels.ruinsCleared
                        },
                        no: {
                            text: 'Not yet.',
                            next: 'askWorkIncomplete',
                            master: 'treeKing',
                            active: !vm.progress.levels.ruinsCleared
                        }
                    }
                },
                askWorkComplete: {
                    text: 'I see.  That is unfortunate what happened to the missing people, but it was expected.  It seems this is more serious than expected.  You should seek the hermit in the mountains, he will be able to teach you more.  The path ahead will be harsh.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingWorkHandIn = true;
                        vm.progress.levels.monk = true;
                        vm.progress.canLearn = vm.progress.canLearn + 1;
                        vm.initAllDialogues();
                    }
                },
                askWorkIncomplete: {
                    text: 'I see.  Please act with haste, I dont want anyone else to go missing.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true
                }
            };
            return dialogue;
        };

        vm.enchant = new vm.Dialogue();
        vm.enchant.initDialogue = function() {
            if (vm.progress.elderMet) {
                return 'welcome';
            }
            else {
                return 'introduction';
            }
        };
        vm.enchant.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Welcome young one. As you may know, I am known as The Elder of Tresabor.  Come in, come in.  Let us have some tea and speak.',
                    continue: true,
                    next: 'choice',
                    master: 'enchant',
                    special: function() {
                        vm.progress.elderMet = true;
                    }
                },
                welcome: {
                    text: 'Welcome back, let us continue our discussion.',
                    continue: true,
                    next: 'choice',
                    master: 'enchant'
                },
                choice: {
                    text: 'What wisdom can I offer you?',
                    buttons: {
                        memory: {
                            text: 'I lost my memory.',
                            next: 'memory',
                            master: 'enchant',
                            active: !vm.progress.quizTaken
                        },
                        elder: {
                            text: 'Is "The Elder" a title?',
                            next: 'elder',
                            master: 'enchant',
                            active: true
                        },
                        train: {
                            text: 'How can I become stronger',
                            next: 'train',
                            master: 'enchant',
                            active: true
                        }
                    }
                },
                train: {
                    text: 'If you need to become stronger, you need to train.  An old monk friend of mine is living in the mountains.  He can help you learn new abilities.  If you just want to get tougher, the arena will get you in top shape.',
                    special: function() {
                        vm.progress.levels.arena = true;
                        vm.progress.levels.sea = true;
                        vm.progress.levels.monk = true;
                        vm.progress.canLearn = vm.progress.canLearn + 1;
                    },
                    next: 'choice',
                    master: 'enchant',
                    continue: 'true'
                },
                memory: {
                    text: 'I see.  Memory loss is very difficult to handle.  I can help you along but I cannot restore your memories.  What I can do is guide you to your true self.',
                    next: 'quizIntro',
                    continue: true,
                    master: 'enchant',
                    special: function() {
                        vm.quiz = initQuiz();
                    }
                },
                quizIntro: {
                    text: 'Very well.  I have a few questions that will help us find your true self.  The first question is: You are walking along when you see a man beating a child, what do you do?',
                    buttons: {
                        offense: {
                            text: 'I punch the man in the face!',
                            next: 'quizTwo',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        defense: {
                            text: 'I run in and block the mans next punch.',
                            next: 'quizTwo',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        },
                        health: {
                            text: 'I grab the child and find them a better home.',
                            next: 'quizTwo',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        }
                    }
                },
                quizTwo: {
                    text: 'Next question: If you had to choose an animal to be, which animal would you choose?',
                    buttons: {
                        turtle: {
                            text: 'A turtle of course!',
                            next: 'quizThree',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        },
                        lion: {
                            text: 'The Mountain Lion',
                            next: 'quizThree',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        elephant: {
                            text: 'An Elephant',
                            next: 'quizThree',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        }
                    }
                },
                quizThree: {
                    text: 'Only two more questions: A thief is running towards you down an alley, how do you stop him?',
                    buttons: {
                        healing: {
                            text: 'I chase the thief.  My stamina will beat his.',
                            next: 'quizFinal',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        },
                        offense: {
                            text: 'I catch the thief, I can outrun him.',
                            next: 'quizFinal',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        defense: {
                            text: 'I brace myself and block his path, he has nowhere to run.',
                            next: 'quizFinal',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        }
                    }
                },
                quizFinal: {
                    text: 'Last question: A destitute youth wanders your way, what lesson do you teach him to obtain a better life?',
                    buttons: {
                        offense: {  
                            text: 'The power of strength.  You can obtain anylife with enough power.',
                            next: 'result2',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        healing: {
                            text: 'Kindness, the knowledge that only compassion will bring happiness.',
                            next: 'result2',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        },
                        defense: {
                            text: 'Resolve.  No one can stop you if you are determined enough.',
                            next: 'result2',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        }
                    }
                },
                result2: {
                    continue: true,
                    text: 'Alright, that was the last question.  Lets see...',
                    next: 'result',
                    master: 'enchant'
                },
                result: {
                    continue: true,
                    next: 'choice',
                    master: 'enchant',
                    specialText: function() {
                        var text = vm.enchant.dialogue.result.special();
                        return text;
                    },
                    //pick quiz rezults
                    special: function() {
                        var top = [vm.quiz.offense, 'offense'];
                        if (top[0] < vm.quiz.defense) {
                            top = [vm.quiz.defense, 'defense'];
                        }
                        if (top[0] < vm.quiz.healing) {
                            top = [vm.quiz.healing, 'health'];
                        }
                        //find trueSelf var for item init
                        var trueSelf = top[1];
                        trueSelf = trueSelf.charAt(0).toUpperCase() + trueSelf.slice(1);
                        trueSelf = 'true' + trueSelf;
                        vm.itemDictionary[trueSelf][1][1] = 1;
                        //find text for dialogue
                        var text = vm.enchant.dialogue.result.pickText(top[1]);
                        vm.progress.quizTaken = true;
                        inventoryService.findVal();
                        vm.initAllDialogues();
                        return text;
                    },
                    pickText: function(top) {
                        var text = '';
                        if (top === 'offense') {
                            text = 'Alright lets figure out these results... Ah yes, it seems you prefer to take the offensive.  You will find great power and strength in the future.';
                        }
                        else if (top === 'defense') {
                            text = 'Oh my, you must prefer to stand your ground instead of fighting.  Your physical and mental defenses will be top quality.';
                        }
                        else if (top === 'health') {
                            text = 'Ahh.. Your true self is leaking kindness.  You will find great friendships and you be in great health.';
                        }
                        return text;
                    }
                },
                elder: {
                    text: 'Yes, "The Elder" is granted as a title and position to Tresaboras oldest citizen.  Currently, that is me of course!  I have served as The Elder for 29 years now, I was 137 at the time.',
                    buttons: {
                        old: {
                            text: 'Wow you are old!',
                            next: 'old',
                            active: true,
                            master: 'enchant'
                        },
                        lie: {
                            text: 'I am 378 years old. I am The Elder now.',
                            next: 'lie',
                            active: true,
                            master: 'enchant'
                        },
                        thank: {
                            text: 'Thank you for the explanation.',
                            next: 'thank',
                            active: true,
                            master: 'enchant'
                        }
                    }
                },
                thank: {
                    text: 'You are welcome outsider.  I hope you are enjoying the tea.',
                    next: 'choice',
                    master: 'enchant',
                    continue: true
                },
                old: {
                    text: 'Haha yes I am!',
                    continue: true,
                    next: 'choice',
                    master: 'enchant'
                },
                lie: {
                    text: 'Hm.  It would be wise not to lie young one.  You cannot fool me.',
                    buttons: {
                        joke: {
                            text: 'It was a joke!',
                            next: 'joke',
                            master: 'enchant',
                            active: true
                        },
                        sorry: {
                            text: 'Sorry for lying',
                            next: 'sorry',
                            master: 'enchant',
                            active: true
                        }
                    }
                },
                joke: {
                    text: 'Whatever you need to tell yourself.',
                    next: 'choice',
                    continue: true,
                    master: 'enchant'
                },
                sorry: {
                    text: 'I accept your apology, but please do not lie.',
                    next: 'choice',
                    continue: true,
                    master: 'enchant'
                }
            };
            return dialogue;
        };

        vm.monk = new vm.Dialogue();
        vm.monk.checkLearn = function() {
            var learn = false;
            if (vm.progress.canLearn > 0) {
                learn = true;
            }
            return learn;
        };
        vm.monk.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Hey, what are you doing in my cave?',
                    continue: true,
                    next: 'question',
                    master: 'monk'
                },
                question: {
                    text: 'Well, what do you want?',
                    buttons: {
                        angry: {
                            text: 'This is the great monk? I am unimpressed.',
                            next: 'angry',
                            master: 'monk',
                            active: true
                        },
                        why: {
                            text: 'Why did you become a monk?',
                            next: 'why',
                            master: 'monk',
                            active: true
                        },
                        train: {
                            text: 'Can you teach me?',
                            next: 'train',
                            master: 'monk',
                            active: vm.monk.checkLearn()
                        },
                        trainMore: {
                            text: 'When can I learn more?',
                            next: 'trainMore',
                            master: 'monk',
                            active: !vm.monk.checkLearn()
                        }
                    }
                },
                trainMore: {
                    text: 'You are not ready for more, you might never be!',
                    next: 'question',
                    master: 'monk',
                    continue: true
                },
                why: {
                    text: 'I am just a guy who is a monk for fun.',
                    continue: true,
                    next: 'question',
                    master: 'monk'
                },
                train: {
                    text: 'Hmm, yes I can teach you.  What ability would you like to learn?',
                    buttons: {
                        battle: {
                            text: 'Berserk',
                            master: 'monk',
                            next: 'battleLearn',
                            active: !vm.progress.berserk
                        },
                        defense: {
                            text: 'Block',
                            master: 'monk',
                            next: 'defenseLearn',
                            active: !vm.progress.shield
                        },
                        health: {
                            text: 'Healing',
                            master: 'monk',
                            next: 'healthLearn',
                            active: !vm.progress.healing
                        },
                        nothing: {
                            text: 'Nothing for now',
                            next: 'question',
                            master: 'monk',
                            active: true
                        }
                    }
                },
                battleLearn: {
                    text: 'Ok! You can now use Berserk, it will double your damage for a short time! Pretty cool huh?',
                    master: 'monk',
                    next: 'question',
                    continue: true,
                    special: function() {
                        monkService.train('battle');
                        vm.progress.berserk = true;
                        vm.initAllDialogues();
                    }
                },
                defenseLearn: {
                    text: 'Alright you can now use Block.  It will stop any damage for a short period of time, no matter how strong.',
                    master: 'monk',
                    next: 'question',
                    continue: true,
                    special: function() {
                        monkService.train('defense');
                        vm.progress.shield = true;
                        vm.initAllDialogues();
                    }
                },
                healthLearn: {
                    text: 'So you want to heal more right?  Well you can use Heal now.  It will give you a burst of health over a few seconds.',
                    master: 'monk',
                    next: 'question',
                    continue: true,
                    special: function() {
                        monkService.train('health');
                        vm.progress.healing = true;
                        vm.initAllDialogues();
                    }
                },
                angry: {
                    text: 'Ok we can fight if you want I guess...',
                    buttons: {
                        sorry: {
                            text: 'Sorry',
                            next: 'sorry',
                            master: 'monk',
                            active: true
                        },
                        fight: {
                            text: 'Fight',
                            next: 'fight',
                            master: 'monk',
                            active: true
                        }
                    }
                },
                fight: {
                    text: '*The monk knocks you out instantly, you didnt stand a chance.*',
                    next: 'question',
                    master: 'monk',
                    special: function() {
                        vm.player.health = 0;
                    },
                    continue: true
                },
                sorry: {
                    text: 'Alright, Ill let it go this time.',
                    continue: true,
                    next: 'question',
                    master: 'monk'
                }
            };
            return dialogue;
        };


        vm.slumThugs = new vm.Dialogue();
        vm.slumThugs.initDialogue = function() {
            if (vm.progress.slumBossMet) {
                return 'boss';
            }
            else {
                return 'introduction';
            }
            console.log('poop test');
        };
        vm.slumThugs.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Hey! You dont belong here. Beat it!',
                    buttons: {
                        leave: {
                            text: 'Sorry I will leave!',
                            next: 'sorryLeave',
                            master: 'slumThugs',
                            active: true
                        },
                        threaten: {
                            text: 'I go where I want.',
                            next: 'threaten',
                            master: 'slumThugs',
                            active: true
                        },
                        question: {
                            text: 'What is going on here?',
                            next: 'question',
                            master: 'slumThugs',
                            active: true
                        }
                    }
                },
                sorryLeave: {
                    text: 'Thats what I thought.  Now beat it scrub!',
                },
                threaten: {
                    text: 'Oh man I like this guy! Lets take him to the hideout!',
                    continue: true,
                    next: 'introduction',
                    master: 'slumThugsBoss'
                },
                question: {
                    text: 'Nosy huh?  Here, follow us!',
                    continue: true,
                    next: 'introductionNosy',
                    master: 'slumThugsBoss'
                },
                boss: {
                    text: 'You want to try again? Lets go.',
                    continue: true,
                    next: 'bossReturn',
                    master: 'slumThugsBoss'
                }
            };
            return dialogue;
        };

        vm.inn = new vm.Dialogue;
        vm.inn.initDialogue = function() {
            if (vm.progress.innIntro) {
                return 'question';
            }
            else {
                return 'introduction';
            }
        };
        vm.inn.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Welcome to the best inn in all of Tresabor, The Sleepy Sapling!  You look like you are new here, am I right?',
                    continue: true,
                    next: 'question',
                    master: 'inn',
                    special: function() {
                        vm.progress.innIntro = true;
                    }
                },
                question: {
                    text: 'If you need a room to rest in we have one available for 100g a night.  The Sleepy Sapling also has the tastiest pie that you can find, only 50g for a piece!  Due to limited supply it is only one per customer.  Otherwise we can always just chat!',
                    buttons: {
                        rest: {
                            text: 'I am a sleepy sapling and need a room.',
                            next: 'rest',
                            active: true,
                            master: 'inn'
                        },
                        pie: {
                            text: 'Let me get in on some of that pie!',
                            next: 'pie',
                            active: !vm.progress.pieEaten,
                            master: 'inn'
                        },
                        chat: {
                            text: 'Lets chat!',
                            next: 'chat',
                            active: true,
                            master: 'inn'
                        }
                    }
                },
                rest: {
                    text: 'Alright, that will be 100g for a room.  If you cant cover it now, i can put it on your tab.  Sound good?',
                    next: 'sleep',
                    buttons: {
                        refuse: {
                            text: 'No Thanks.',
                            next: 'question',
                            active: true,
                            master: 'inn'
                        },
                        sleep: {
                            text: 'Sounds good!',
                            next: 'sleep',
                            active: true,
                            master: 'inn',
                            special: function() {
                                resourcesService.resources.money = resourcesService.resources.money - 100;
                                vm.player.rest();
                            }
                        }
                    }
                },
                sleep: {
                    text: 'ZZZzzz',
                    next: 'question',
                    continue: true,
                    master: 'inn'
                },
                pie: {
                    text: 'One slice of Butterscotch Pie coming up!  I wish we could offer more than one per customer, but since the sky event trade with the Northern Empire has been difficult.  I heard the impact was right along the trade route! Anyway, enjoy the pie!',
                    next: 'eatPie',
                    continue: true,
                    master: 'inn'
                },
                eatPie: {
                    text: '*You eat the Butterscotch Pie, it fills you with DETERMINATION.*',
                    next: 'question',
                    continue: true,
                    master: 'inn',
                    special: function() {
                        resourcesService.resources.money = resourcesService.resources.money - 50;
                        vm.progress.pieEaten = !vm.progress.pieEaten;
                        vm.initAllDialogues();
                        vm.itemDictionary['pie'][1][1] = 1;
                        inventoryService.findVal();
                        vm.player.maxHealth = vm.player.calculateTotalHealth();
                    }
                },
                chat: {
                    text: 'Alright! What would you like to talk about?',
                    buttons: {
                        sky: {
                            text: 'What is your opinion on the sky attacking?',
                            next: 'sky',
                            active: true,
                            master: 'inn'
                        },
                        whatToDo: {
                            text: 'What is there to do around here?',
                            next: 'whatToDo',
                            active: true,
                            master: 'inn'
                        },
                        wizards: {
                            text: 'Any wizards around here?',
                            next: 'wizards',
                            active: true,
                            master: 'inn'
                        },
                        nothing: {
                            text: 'Nothing for now.',
                            next: 'nothing',
                            active: true,
                            master: 'inn'
                        }
                    }
                },
                nothing: {
                    text: 'Oh.  Well I enjoyed our chat while it lasted!',
                    next: 'question',
                    continue: true,
                    master: 'inn'
                },
                sky: {
                    text: 'Hmm, everyone is on edge thinking it was an attack by one of our enemies, but I fear it is far more dangerous. I have heard of people going missing and other strange occurences since that day. Lets change the subject, it worries me to think of the event.',
                    next: 'chat',
                    continue: true,
                    master: 'inn'
                },
                whatToDo: {
                    text: 'Well if you need work, the King usually has something to offer.  Otherwise there is a shop and enchant on the main level.  Down here there isnt much else.  If you are looking to leave Tresabor then you can checkout the Arena to the east.  I heard you have to be pretty tough to fight there though.',
                    next: 'chat',
                    special: function() {
                        vm.progress.levels.arena = true;
                        vm.progress.levels.sea = true;
                    },
                    continue: true,
                    master: 'inn'
                },
                wizards: {
                    text: 'Wizards huh? I didnt take you for the type.  Well, if you must see one of them, the closest one is to the east across the river.  The Arena guards the bridge though and they only let the toughest through.  If you want my advice, stay away from wizards.',
                    next: 'chat',
                    continue: true,
                    special: function() {
                        vm.progress.levels.arena = true;
                        vm.progress.levels.sea = true;
                    },
                    master: 'inn'
                }
            };
            return dialogue;
        };

        vm.house = new vm.Dialogue();
        vm.house.initDialogue = function() {
            if (vm.progress.introComplete) {
                return 'help';
            }
            else {
                return 'introduction';
            }
        }
        vm.house.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Oh my! you woke up! Do you remember what happened?',
                    buttons: {
                        no: {
                            text: 'I dont even know who I am!',
                            next: 'memory',
                            active: true,
                            master: 'house'
                        },
                        yes: {
                            text: 'Yeah I do!',
                            next: 'lie',
                            active: true,
                            master: 'house'
                        }

                    }
                },
                help: {
                    text: 'What? You are back already?! Get back out there!'
                },
                lie: {
                    text: 'Well then why did I find you passed out in my yard.  It looked like a few goons had beaten you up.',
                    buttons: {
                        lie2: {
                            text: 'Its what all the kids are doing these days.',
                            next: 'lie2',
                            active: true,
                            master: 'house'
                        },
                        kid: {
                            text: 'Haha I am just kidding! I dont remember a thing!',
                            next: 'truth',
                            active: true,
                            master: 'house'
                        }
                    }
                },
                lie2: {
                    text: 'Ok... Anyway, you cant stay here forever.',
                    continue: true,
                    next: 'question',
                    master: 'house'
                },
                truth: {
                    text: 'Kids and your crazy jokes these days I cant keep up!  What do you mean you cant remember anything?',
                    buttons: {
                        memory: {
                            text: 'I dont even know my name.',
                            next: 'memory2',
                            active: true,
                            master: 'house'
                        }
                    }
                },
                memory: {
                    text: 'Oh... I am sorry.  Well, I found you unconcious in my yard the other day.  You were in bad condition, so I nursed you back to health.',
                    continue: true,
                    master: 'house',
                    next: 'question'
                },
                memory2: {
                    text: 'Oh...  I am sorry.',
                    continue: true,
                    master: 'house',
                    next: 'question'
                },
                question: {
                    text: 'Here, take this map.  A short distance north east of here is Tresabor, City in the Tree. The Elder may be able to help with your memory loss and there will be work for you there.  Take this backpack too, I am too old for adventuring now.',
                    continue: true,
                    master: 'house',
                    next: 'goodBye',
                    special: function() {
                        vm.progress.hasMap = true;
                        vm.progress.introComplete = true;
                    }
                },
                goodBye: {
                    text: 'Goodluck kid, and remember, head north east to Tresabor!'
                }
            };
            return dialogue;
        };

        vm.secret = new vm.Dialogue();
        vm.secret.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: '*The room is empty.  Carved into the walls is "QAXK"*'
                }
            };
            return dialogue;
        };

        vm.bum = new vm.Dialogue();
        vm.bum.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Hey man, can you spare any gold?  I can give you information in exchange.',
                    buttons: {
                        give: {
                            text: 'Sure, I can spare a few',
                            next: 'give',
                            master: 'bum',
                            active: true
                        },
                        refuse: {
                            text: 'Sorry buddy not today',
                            next: 'refuse',
                            master: 'bum',
                            active: true
                        },
                        ignore: {
                            text: '*Ignore the man*',
                            next: 'ignore',
                            master: 'bum',
                            active: true
                        }
                    }
                },
                give: {
                    text: '',
                    buttons: {
                        100: {
                            text: 'Give 100g',
                            next: 'tip1',
                            master: 'bum',
                            active: vm.resources.money > 100
                        },
                        1000: {
                            text: 'Give 1000g',
                            next: 'tip2',
                            master: 'bum',
                            active: vm.resources.money > 1000
                        },
                        10000: {
                            text: 'Give 10000g',
                            next: 'tip3',
                            master: 'bum',
                            active: vm.resources.money > 10000
                        },
                        refuse: {
                            text: 'Sorry I guess I dont have enough',
                            next: 'refuse',
                            master: 'bum',
                            active: true
                        }
                    }
                },
                refuse: {
                    text: 'Thank you anyway my friend.'
                },
                ignore: {
                    text: '*You ignore the man, he ignores you back, it gets weird*'
                },
                tip1: {
                    text: 'Thank you!  Heres a tip, I always see adventurers walk out half naked and die!  Make sure you equip your new armor and weapons!',
                    continue: true,
                    master: 'bum',
                    next: 'introduction',
                    special: function() {
                        vm.resources.money = vm.resources.money - 100;
                        vm.initAllDialogues();
                    }
                },
                tip2: {
                    text: 'Thank you!  If you dont have one already, you should pick up a beast compendium.  You can track enemies that you kill and loot!',
                    continue: true,
                    master: 'bum',
                    next: 'introduction',
                    special: function() {
                        vm.resources.money = vm.resources.money - 1000;
                        vm.initAllDialogues();
                    }
                },
                tip3: {
                    text: 'Thank you!  There was a strange group of people down here earlier, someone mentioned that a key to the passcode was 2143.  Whatever that means!',
                    continue: true,
                    master: 'bum',
                    next: 'introduction',
                    special: function() {
                        vm.resources.money = vm.resources.money - 10000;
                        vm.initAllDialogues();
                    }
                }
            }
            return dialogue;
        };

        vm.meteor = new vm.Dialogue();
        vm.meteor.initDialogue = function() {
            if (vm.progress.vialTaken) {
                return 'rubble';
            }
            else {
                return 'introduction';
            }
        };
        vm.meteor.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: '*You smash the meteorite open and grab a sample, inside you see a glass vial.*',
                    continue: true,
                    master: 'meteor',
                    next: 'grab'
                },
                grab: {
                    text: '*You take the vial, only rubble is left.*',
                    special: function() {
                        vm.resources.vialTaken = true;
                    }
                },
                rubble: {
                    text: '*You already took the vial, only rubble is left.*'
                }
            }
            return dialogue;
        };


        vm.slumThugsBoss = new vm.Dialogue();
        vm.slumThugsBoss.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Here we are, you think you have what it takes for our super secret mission huh? Well lets see it then.',
                    buttons: {
                        confused: {
                            text: 'I have no idea what you mean',
                            next: 'confused',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        confident: {
                            text: 'Yeah I do! Lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        threaten: {
                            text: 'I will mess you dudes up!',
                            next: 'threaten',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                introductionNosy: {
                    text: 'You think you have what it takes for our super secret mission?',
                    buttons: {
                        confused: {
                            text: 'Takes to do what?',
                            next: 'confused',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        confident: {
                            text: 'Yeah I do! Lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        threaten: {
                            text: 'I will mess you dudes up!',
                            next: 'threaten',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                confused: {
                    text: 'We need someone clean to do a mission for us, that is all I can say for now. Are you in?',
                    active: true,
                    buttons: {
                        confident: {
                            text: 'Sure, lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true,
                        },
                        leave: {
                            text: 'This is pretty sketchy...',
                            next: 'leave',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                leave: {
                    text: 'Then beat it kid! We dont have time for scrubs like you.',
                },
                confident: {
                    text: 'Alright!  Here now drink this.  Dont ask any questions.  Hopefully this is the right amount...',
                    continue: true,
                    active: true,
                    level: 'shroom',
                    special: function() {
                        vm.progress.slumBossMet = true;
                        console.log(vm.progress.slumBossMet);
                    }
                },
                threaten: {
                    text: 'Ha! You wish.  Get out of here before we sick the guard cat on you.  He doesnt mess around.'
                },
                bossReturn: {
                    text: 'Here, drink this again, lets see what you can do!',
                    continue: true,
                    level: 'shroom',
                    active: true
                }
            };
            return dialogue;
        };

        //init the dialogues based on setDialogue to grab changed conditionals
        vm.initAllDialogues = function() {
            vm.treeKing.dialogue = vm.treeKing.setDialogue();
            vm.slumThugs.dialogue = vm.slumThugs.setDialogue();
            vm.slumThugsBoss.dialogue = vm.slumThugsBoss.setDialogue();
            vm.wizard.dialogue = vm.wizard.setDialogue();
            vm.monk.dialogue = vm.monk.setDialogue();
            vm.enchant.dialogue = vm.enchant.setDialogue();
            vm.house.dialogue = vm.house.setDialogue();
            vm.inn.dialogue = vm.inn.setDialogue();
            vm.arena.dialogue = vm.arena.setDialogue();
            vm.secret.dialogue = vm.secret.setDialogue();
            vm.bum.dialogue = vm.bum.setDialogue();
            vm.meteor.dialogue = vm.meteor.setDialogue();
            vm.cabin.dialogue = vm.cabin.setDialogue();
        };
    }
})();