(function() {
    'use strict';

    angular
        .module('app.main')
        .service('mainService', mainService);

    mainService.$inject = ['dialogueService', 'levelService', 'progressService', 'templateService', 'messageService', 'playerService'];

    /* @ngInject */
    function mainService(dialogueService, levelService, progressService, templateService, messageService, playerService) {
    	var vm = this;
        vm.levelDictionary = levelService.levelDictionary;
        vm.progress = progressService.progress;
        vm.player = playerService.player;

        vm.switchTemplate = function(template) {
            vm.player.active = false;
            templateService.switchTemplate(template);
        };

        vm.switchLevel = function(level) {
            //only works if level is unlocked
            var unlockCheck = vm.levelDictionary[level];
            if (vm.progress.levels[unlockCheck.slug]) {
                vm.switchTemplate('app/level/level.html');
                levelService.switchCurrentLevel(level);
                messageService.updateMainMessage('');
                vm.currentLocation = vm.levelDictionary[level];
                return vm.levelDictionary[level];
            }
            else {
                messageService.updateMainMessage('You cannot visit here yet.', true);
            }
        };

        vm.switchLocation = function(location) {
            //only works if location is unlocked
            var unlockCheck = vm.locationDictionary[location];
            var skip = false;
            if (typeof unlockCheck.slug === 'undefined') {
                skip = true;
            }
            if (vm.progress.levels[unlockCheck.slug] || skip) {
                vm.switchTemplate('app/main/main.html');
                var thisLocation = vm.locationDictionary[location];
                messageService.mainMessage = '';
                vm.currentLocation = thisLocation;
                return thisLocation;
                
            }
            else {
                messageService.updateMainMessage('You cannot visit here yet.', true);
                return false;
            }
        };



    	// vm.switchLocation = function(location) {
     //        vm.currentLocation = vm.locationDictionary[location];
     //        console.log(vm.currentLocation);
     //        return vm.currentLocation;
     //    };


    	vm.setCharAt = function(str,index,chr) {
            if (index > str.length-1) {
                return str;
            }
            return str.substr(0,index) + chr + str.substr(index+1);
        };
        vm.click = function(location, hover, data,  x, y, xlength, ylength, isLevel) {
            for (var i = 0; i < ylength; i++) {
                var before = '';
                var tooltip = '<p class = "tooltip">' + hover + '</p>';
                if (isLevel) {
                    var unlockCheck = vm.levelDictionary[data];
                    //check if we even have unlock/lock values for this 
                    var isUnlockable = vm.progress.levels[unlockCheck.slug];
                    if (typeof isUnlockable !== 'undefined') {
                        var conditional = 'ng-if = "vm.progress.levels[\'' + unlockCheck.slug + '\'];"';
                        tooltip = '<p class = "tooltip" ' + conditional + '>' + hover + '</p>';
                    }
                	before = '<span class = "click" ng-click = "vm.switchLevel(\''+ data + '\')">' + tooltip + location.ascii[y + i][x];
            	}
            	else {
                    var unlockCheck = vm.locationDictionary[data];
                    var isUnlockable = vm.progress.levels[unlockCheck.slug];
                    if (typeof isUnlockable !== 'undefined') {
                        var conditional = 'ng-if = "vm.progress.levels[\'' + unlockCheck.slug + '\'];"';
                        tooltip = '<p class = "tooltip" ' + conditional + '>' + hover + '</p>';
                    }
                	before = '<span class = "click" ng-click = "vm.switchLocation(\'' + data + '\')">' + tooltip + location.ascii[y + i][x];
            	}
                var after = location.ascii[y + i][x + xlength] + '</span>';
                //after then before to not break order!
                location.ascii[y + i] = this.setCharAt(location.ascii[y + i], x + xlength, after);
                location.ascii[y + i] = this.setCharAt(location.ascii[y + i], x, before);
            }
        };

        vm.Location = function() {
    		this.asciiFormatted = [];
    		this.asciiSpanned = [];
    		this.formatted = false;
    		this.initClicks = function(){}
    		this.specFunc = function(){}
        };

        vm.locationDictionary = [];

        vm.mainMap = new vm.Location();
        vm.mainMap.name = 'Map';
        vm.mainMap.initClicks = function() {
            //cabin
            vm.click(this, 'A Cabin', 'cabin', 160, 5, 30, 9);
            //northwastes
            vm.click(this, 'Northern Wastes', 'snowNorth', 150, 15, 50, 15, true);
            vm.click(this, 'Northern Wastes', 'snowNorth', 130, 15, 19, 10, true);
            //sea
            vm.click(this, 'Go For a Swim?', 'sea', 100, 20, 25, 10, true);
            //lich
            vm.click(this, 'Lich', 'lich', 105, 1, 1, 1);
            //robot
            vm.click(this, 'Wizards Task', 'robot', 90, 2, 15, 5, true);
            //monk
            vm.click(this, 'Mysterious Cavern', 'monk', 112, 16, 4, 3);
        	//wizard
        	vm.click(this, 'The Bear', 'wizard', 171, 35, 30, 10);
        	//snow
        	vm.click(this, 'Snow Wastes', 'snow', 140, 30, 30, 15, true);
        	//bridge
        	vm.click(this, 'The Bridge', 'bridge', 110, 39, 25, 5, true);
            //arena
            vm.click(this, 'The Arena', 'arena', 80, 30, 20, 10);
        	//tree city
        	vm.click(this, 'Tresabor', 'treeCity', 33, 18, 15, 10);
        	//tree two
        	vm.click(this, 'Approach the Tree', 'treeTwo', 30, 29, 30, 10, true);
        	//treeone 
        	vm.click(this, 'The Forest', 'treeOne', 1, 29, 28, 8, true);
        	vm.click(this, 'The Forest', 'treeOne', 30, 40, 38, 5, true);
        	//ruins
        	vm.click(this, 'The Desert', 'ruins', 0, 6, 50, 12, true);
        	vm.click(this, 'The Beasts Lair', 'dungeon', 0, 0, 25, 6, true);
            //house
            vm.click(this, 'House', 'house', 0, 38, 20, 5);

        };
		vm.mainMap.ascii = [	"            .                                  /              \\     /   \\                                                    /         \\   .'                          \\                  ",
								"           /_\\'.                             .'   .^.         /\\   /     \\     ^                          .                 .'     ^  .  '. '.                         |        \\_      ",
								"          /___\\/'.                          /    .   \\    ^ .'  '.'       '. .' '.                       /$\\              /      / .' '.  \\  :                         \\        /__     ",
								"         /_____\\/ '.            +               /     \\  / \\   .''.         /     \\                      \\ /             /   ,'./ /     \\     ':   ~                    \\______/        ",
								"   +    /_______\\ /             +            ../       .'   './    \\       /       \\                                   ,'   /    /       \\ ^    '.                      /      \\___/    ",
								"   +   /   |~|   \\                         .'         /       \\     '.    ^        .^.           .-.                  /   ,'    /        .' '.    '.            ~   ___/       /   \\    ",
								"                     +                    /          '         ' ^    \\  / \\      /   \\         '|_|'                /   /    .'     .  /     \\     :            __/  .       /         ",
								"                     +                              /          .' '.   .'   '.  .'     '.        ' '                /        /      . ./       '.    '.         /    / \\               ." ,      
								"   '                                               /          /     \\ /    ^  \\/ ^   ^   \\                .^.               :  .^. /   \\         \\     :        |    / \\    ___       / \\       ",
								"                                   .             .'          /       '.   / \\  \\/ \\ / \\   :             .'   '.      .^.    / /   \\     \\         \\   ,'       /      |    /_/_\\      / \\         ",
								"   ,              ^^                            /          .'          \\.'   './   ',  \\   \\    .^.  . /       \\ .^./   \\   .'     '.    '.          .'      _/            | | |       |     ",
								"                                                 ,,,,    .'            /       \\   .'.  '.     /   \\/ \\         /   \\    \\,'         \\      \\       :       /                            ",
								"           .......                +             /    \\....            /       ^ ' /   \\  .\\  .'     \\.^.       /     \\   /.           '.          .'`  ~    |                            ",
								"          /       \\               +             .... /    \\         .'       / \\.'     \\/ \\ /       /   \\    ,'       ','/ \\            \\         :        /     \\___/                   ",
								"  .'''''''.                                    /    \\                      .'  /     /\\/   \\   .'..'     \\  /  .'.    /,'   '..          ''\\     ,'        |_____/_                      ",
								" /         \\                           ^        .                         /   /     /  \\    './           ''../   \\ .'/        '\\              .'        _/        \\__                   ",
								"                                      / \\    . / \\                          .'    .'    \\    /               /    _\\_/           '.         ,''       __/         _/                     ",
								"                                     ./ \\ . / \\/ \\                         /     /       ''./              .'    /_\\ \\                    ,'       __/                                   ",
								"                  .              ^  / \\| / \\/ \\ |  .                            /         .'             ./           \\..           ..''''     ~  /                                      ",
								"                                / \\ / \\  / \\ |    / \\ .                                                  /               \\        .'         ____/                                       ",
								"^   .                        ^  / \\  |  /\\|    ^  / \\/ \\                                                                         :          /                                            ",
								" \\ / \\  .                ^  / \\  |.    //\\\\   / \\  | / \\                                                                        .'       __|                                               \\ ",
								" \\ / \\ / \\  ^  . /\\  ^  / \\ / \\  / \\ ////\\\\\\\\ / \\     |  ^                                                                    ,'        /                                            /      \\_____",
								"| ^ |  /\\  / \\/ \\ ^ / \\ / \\  | ^ / \\  /-/\\-\\   |    .   / \\          ''                                                      :  ~      |              __/                            \\      /",
								" / \\  /  \\ / \\/ \\/ \\/ \\  |    / \\ | ////--\\\\\\\\   . / \\^ / \\ .                                               ,,             ,.'        /                 \\____/                        \\____/_____",
								" / \\  /  \\  |  | / \\ ^\\  /\\   ^ \\   /////\\\\\\\\\\  / \\/ / \ | / \\                                                           ,'           /                    \\__                       __/  /  ",
								"\\ | .  ||^    ^   | / \\ /  \\ / \\  /////|  |\\\\\\\\\\/ \\ |/ \\ . / \\                                                         :'          _/                   ___/                            /__",
								" \\ / \\  / \\  / \\  . / \\^/  \\ / \\  ^    |##|   /\\ |.   |^/ \\ |                                                        .'         __/                        \\__                         /",
								" \\ / \\  / \\  / \\ / \\ |/ \\|| ^ |  / \\    ^    /  \\/ \\^ / \\ \\.             *               ,,,                        .'         /                                                          ",
								"|   |    |    |  / \\  / \\  / \\ ^ / \\   / \\   /  \\/\\/ \\/ \\|/ \\                                                      :           |                                                           ",
								"                  |    |   / \\/ \\ |  ^ / \\ ^  ||/  \\ \\ |  / \\                                                       '.   ~      \\___                                                      ",
								"                            | / \\   / \\ | / \\   ^  \\|.  .  |                                                          ',       ~    \\                                                    ",
								"   ,,,                ,,,      |  ^ / \\   / \\  / \\ _/ \\/ \\                                                             :..           \\,                                                   ",
								"                                 / \\ |^    |   / \\| / \\/ \\                                           ^    ^     ^     ^   ^',          \\                                                    ",    
								"                                 / \\ / \\   ^    |   .|  |           '''                             ^|====|=====|=====|===| ''.        \\_        \\__                                          ",        
								"                            ,,    |  / \\  / \\   ^  / \\                              ^ .----------. ^|=                       :  ~      \\   \\___/                                        __               ", 
								"                                      |   / \\  / \\ / \\                              |'.__________.'|=                      .'           \\__/__   \\__                                   /  \\             ",        
								"                                           |   / \\  |                               |      __      |                      :              /   \\__/                                  .''    ''.___           ",
								"                                                |                                    '.___|  |___.'                     ,,:       ~ ____/  __/  \\__                               /        ___  '.________  ",        
								"          ___                                                                                                         .;           /        \\                              ____.''    __  / , \\            ",
								"         /\\__\\                 .                                                                                      ;-----------;                                       /\"\\                            ",
								"    .^.  ||  |                                                                                                       / / / / / / /                                        \\_________                        ",
								"                                                                                                                  .''''''''''''''                                          ' ' ' ' ''.                       ",
								"                               ,,,                                    ,,,                             *          ;              /                                             .__.__.__\\                     ",
								"                  _                                                                                            .'         ~   .'                                                                              "];



        vm.treeCity = new vm.Location();
        vm.treeCity.name = 'Tresabor';
        vm.treeCity.slug = 'treeCity';
        vm.treeCity.prev = 'mainMap';
        vm.treeCity.prevName = 'Map';
		vm.treeCity.ascii =   ["        ///////\\\\\\\\\\\\\\         //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ ///////\\\\\\\\\\\\\\             |       |           |              ",                                                                        
							   "      /////////\\\\\\\\\\\\\\\\\\     ////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////\\\\\\\\\\\\              |       |           |              ",                                                                        
							   "       ////////\\\\\\\\\\\\\\              |                   |    ///////\\\\\\\\\\\\\\             |       |     |     |              ",                                                                 
							   "    ///////////\\\\\\\\\\\\\\\\\\\\           |      |            |    ///////\\\\\\\\\\\\\\\\      .     |   |         |     |              ",                                                               
							   "  /////////////\\\\\\\\\\\\\\\\\\\\\\\\\\        |      |            |  /////////\\\\\\\\\\\\\\\\\\    / \\   .'   |         |     '.             ",                                                                          
							   "         |          |               |                   |   .    |    |          / \\  |                       |            ",                                                                        
							   "         |  |       |               |             |     |  / \\   |    |     .     |   |          ___          |      .     ",                                                
							   "         |      |   |              .'  |          |     '. / \\  .'    '.   / \\        |   |    .'   '.        |     / \\    ",                                                
							   "        /       |    \\    /\\   .  /               |       \\ |   |  __  |   / \\        |        |     |        |     / \\    ",                                                                         
							   "        |    _____   |   /  \\ / \\ |      _____            |     |  ||  |    |         /        /:___:\\     |   \\     |     ",                                                                        
							   "        |   |     |  |   /  \\ / \\ |     /     \\           |                      ...''        /:_____:\\    |    ''...      ",                                                                          
							   "________|___|     |__|____||___|__|_____|     |___________|___________________.''            /:_______:\\             '.   ",                                                                           
							   "                                                                                             :_________:              '. ",                                                                   
							   "____________________________________________________________________  __________________________________________________\\",                                                                    
							   "                                                                    \\ \\____                                                ",                                                                         
							   "                      ______________             ______________      \\____ \\                   .                           ",                                                                        
							   "                    .'   / \\        '.         .'           / \\'.         \\ \\____      ______ / \\  __________   ______ .__ ",                                                                        
							   "                   /      |     .     \\       /     .        |   \\         \\____ \\    /  ..  \\/ \\ /   ....   \\ / ...  / \\ \\",                                                                        
							   "                  /     .      / \\     \\     / .   / \\            \\             \\ \\___|  ||  |_|__|   |  |   |_| | |  / \\ |",                                                                        
							   "                 :     / \\     / \\      :   : / \\  / \\   .'''....' :             \\_____________________________________|___",                                                                            
							   "                 |     / \\      |       |   | / \\   |  .'          |                                                       ",                                                                        
							   "                 |      |               |   |  |      ;            |                                                       "]                                                                        
		vm.treeCity.initClicks = function() {
			vm.click(this, 'The King', 'treeGovernment', 92, 6, 12, 7);
			vm.click(this, 'Slums', 'slums', 83, 15, 40, 5);
			vm.click(this, '','treeSecret', 66, 8, 2, 2);
			vm.click(this, 'The Elder', 'treeInn', 40, 9, 7, 3);
			vm.click(this, 'Shop', 'treeShop', 12, 9, 7, 3);
		}

		vm.treeSecret = new vm.Location();
		vm.treeSecret.name = '? ? ?';
		vm.treeSecret.ascii = [''];
        vm.treeSecret.dialogue = dialogueService.secret;
        vm.treeSecret.specialText = true;
		vm.treeSecret.prev = 'treeCity';
		vm.treeSecret.prevName = 'Tresabor';

		vm.treeShop = new vm.Location();
		vm.treeShop.name = 'Tree Shop';
		vm.treeShop.prev = 'treeCity';
        vm.treeShop.prevName = 'Tresabor';
        vm.treeShop.ascii = ["                                                                                              ___________________________| |_____-'-              ",                                                                                                                                                 
                             "                                                                                             /    ____________________   |          |             ",                                                                                                                                                  
                             "                                                                                             \\___________________________|  _____   |             ",                                                                                                                                                    
                             "                                                                                                                         |_|     '-'              ",                                                                                                                                                  
                             "                                                                                           [=]                                                    ",                                                                                                                                                 
                             "                                                                                 [=]      /   \\                       .------.                    ",                                                                                                                                                  
                             "                                                                                 | |     /  |  \\    [=] [=]          /_______ \\                   ",                                                                                                                                                  
                             "                                                                                 | |    /   |   \\   | | | |         (|--  --,'(=).                ",                                                                                                                                                      
                             "                                                                                /   \\   \\   |   /   | | | |        . |>o  o<  | /\\\\.              ",                                                                                                                                                    
                             "                                                                           ____/_____\\___\\_____/____|_|_|_|_      ( .|  /,    ||  |\\)             ",                                                                                                                                                    
                             "                                                                          |_________________________________|   ( .( \\  __.  /||  |/.)            ",                                                                                                                                                  
                             "                                                                                                               . ( . (\\_____/ |)\\/ .) )           ",                                                                                                                                                  
                             "                                                                                                              (. . ( ____|    |_)_.)_. )          ",                                                                                                                                                  
                             "                                                                                                               ( .__/              ___\\__         ",                                                                                                                                                 
                             "                                                                                                                 /  \\_.--.\\/.---._/      \\        ",                                                                                                                                                      
                             "                                                                                             ________//         /    :    :               \\       ",                                                                                                                                                      
                             "                                                                                             \\______  \\         \\    '.___..____.' /\\  /  /       ",                                                                                                                                                        
                             "                                                                                                    \\  \\        / \\__/ |  ><     \\/  \\___/\\       ",                                                                                                                                                         
                             "                                                                                                     \\  \\      /  /    |  ><     /      \\  \\      ",                                                                                                                                                  
                             "                                                                                                      \\  \\    /  /     |  ><     |       \\  \\     ",                                                                                                                                                  
                             "                                                                                                       \\  \\  /  /     /   ><      \\       \\  \\    ",                                                                                                                                                  
                             "                                                                                                        \\  \\/  /     /   /  \\     /\\      /  /    "]                                                                                                                                                  

		vm.treeInn = new vm.Location();
		vm.treeInn.name = 'The Elder';
		vm.treeInn.ascii = ["                                                                                          _________________          ",                                                                                                                                                                                
                            "                                                                                         /                 \\        ",                                                                                                                                                                                 
                            "                                                                                        /                   \\       ",                                                                                                                                                                                 
                            "                                                                                       /                     \\      ",                                                                                                                                                                                 
                            "                                                                                      |.''''.   .''''''.    _|      ",                                                                                                                                                                                 
                            "                                                                                      |>.--.     .---. <   |  |     ",                                                                                                                                                                                 
                            "                                                                                      |      |           ) / /    ",                                                                                                                                                                                 
                            "                                                                                      \\     /             __/       ",                                                                                                                                                                                
                            "                                                                                      |  / (__.)  \\   /  |          ",                                                                                                                                                                                 
                            "                                                                                      | / .______\\ \\ |   |          ",                                                                                                                                                                               
                            "                                                                                       \\   \\       / |   /          ",                                                                                                                                                                                
                            "                                                                                        \\_          ____/           ",                                                                                                                                                                                
                            "                                                                                          \\________//   |           ",                                                                                                                                                                                
                            "                                                                                             |\\    /    |           ",                                                                                                                                                                                 
                            "                                                                                    _________|    /  /   \\_____________",                                                                                                                                                                           
                            "                                                                                   /       //|            \\\\           '.",                                                                                                                                                                          
                            "                                                                                  /        \\\\_____________//             \\ ",                                                                                                                                                                        
                            "                                                                                 /          \\_____________/               |",                                                                                                                                                                        
                            "                                                                                /                                         |",                                                                                                                                                                        
                            "                                                                                |    /                                    |",                                                                                                                                                                        
                            "                                                                                |    |                            |       |",                                                                                                                                                                        
                            "                                                                                |    |                            |       |"];                                                                                                                                                                        

        vm.treeInn.specialText = true;
        vm.treeInn.dialogue = dialogueService.enchant;
		vm.treeInn.prev = 'treeCity';
		vm.treeInn.prevName = 'Tresabor';

		vm.treeSlums = new vm.Location();
		vm.treeSlums.name = 'The Slums';
		vm.treeSlums.initClicks = function() {
			vm.click(this, 'Destitute Man', 'slumsBum', 105, 12, 5, 4);
			vm.click(this, 'Inn', 'slumsInn', 64, 11, 6, 5);
			vm.click(this, 'Suspicious Men', 'slumsThugs', 42, 11, 13, 5);
		}
		vm.treeSlums.prev = 'treeCity';
		vm.treeSlums.prevName = 'Tresabor';
		vm.treeSlums.ascii = ["            `                              ////\\\\\\\\                                                   ///\\\\\\                                      /////\\\\\\\\\\              ",                                                      
								"           `                                ///\\\\\\                                                   ////\\\\\\\\\\                                  ///////\\\\\\\\\\\\\\            ",                                                      
								"             `                            /////\\\\\\\\\                                                //////\\\\\\\\\\\\\\                                 //////\\\\\\\\\\\\\\            ",                                                      
								"           ___                             ////\\\\\\\\                                                //////\\\\\\\\\\\\                              ///////////\\\\\\\\\\\\\\\\\\         ",                                                      
								"          |   |                            ////\\\\\\\\                                              ////////\\\\\\\\\\\\\\\\\\                            //////////\\\\\\\\\\\\\\\\\\         ",                                                      
								"       ___|   |________________________ ///////\\\\\\\\\\\\\       ______________________________________///////\\\\\\\\\\\\\\\\                           ////////////\\\\\\\\\\\\\\\\\\\\\\\\      ",                                                                                           
								"      /         ~~~~~~                 \\///////\\\\\\\\\\\\      /            ~~~~                       \\/////\\\\\\\\\\\\\\_____________________________///////////\\\\\\\\\\\\\\\\\\\\\\       ",                                                            
								"     /    ~~~                ~~~~       \\//////\\\\\\\\\\\\\\\\   /   ~~~~                           ~~~    \\////\\\\\\\\\\\\/    ~~                    //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\   ",                                                           
								"    /____________________________________\\   |  |        /___________________________________________\\  | |   /____________________________/////////////\\\\\\\\\\\\\\\\\\\\\\\\\\     ",                                                            
								"    |                                    |   |  |        |                                           |  | |   |                             ////////////\\\\\\\\\\\\\\\\\\\\\\       ",                                                          
								"    |    ____                   ____     |   |  |        |    __         __        __        __      |  | |   |                            /////////////\\\\\\\\\\\\\\\\\\\\\\\\\      ",                                                                    
								"    |   |    |                 |    |    |               |   |__|       |__|      |__|      |__|     |  | |   |                                     |    | |              ",                                                                
								"    |   |____|         ____    |____|    |    O     O    |        ____                               |        |     ___        _____         _____  |      |              ",                                                                
								"    |                 |    |             |   /|\\   /|\\   |       |    |        ___     ___           |       O|    |   |       |   |         |   |  |   |  |              ",                                                          
								"    |                 |o   |             |    |     |    |       |o   |       |___|   |___|          |      .||    |   |       |___|         |___|  |      |              ",                                                            
								"    |                 |    |             |   / \\   / \\   |       |    |                              |     __/|    |   |                            | |    |              ",                                                              
								"                                                                                                                                                    | |    |              ",                                                     
								"                                                                                                                                                    |    | |              ",                                              
								"                                                                                                                                                    |      |              "];                                                    
                                                                                                                                                                                                                     
                                                                                                                                                                                                                     
                                                                                                                                                                                                                           

		vm.treeSlumsInn = new vm.Location();
		vm.treeSlumsInn.name = 'The Sleepy Sapling';
		vm.treeSlumsInn.prev = 'slums';
		vm.treeSlumsInn.prevName = 'Slums';
        vm.treeSlumsInn.specialText = true;
        vm.treeSlumsInn.dialogue = dialogueService.inn;
        vm.treeSlumsInn.ascii = ["                                                                                                                                                            ",         
                                 "                                                                                                                                                            ",                          
                                 "                                                                                            _________                                                       ",                                                                                                                                     
                                 "                                                                                           /\\\\\\\\\\\\\\\\\\\\                                                      ",                                                                                                                                       
                                 "                                                                                           | ==  ==  |                                                      ",                                                                                                                                       
                                 "                                                                                          (|  o  o   |)                    ______________________           ",                                                                                                                                          
                                 "                                                                                           |  (__)   |               ______|_FRESHLY BAKED PIES_|______     ",                                                                                    
                                 "                                                                                           | .____.  |              |                ||                |    ",                                                                                                                                       
                                 "                                                                                           \\__    __/               |                ||                |    ",                                                                                                                                         
                                 "                                                                                  .---._____| '--'  |_____.---.     |                ||                |    ",                                                                                                                                          
                                 "                                                                                 /    |   \\          /    |    \\    |  oooooooooooo  ||  oooooooooooo  |    ",                                                                                                                                       
                                 "                                                                                |     |    \\________/     |     |   |___\\________/___||___\\________/___|    ",                                                                                                                                         
                                 "                                                                                /     |                   |     \\   |                ||                |    ",                                                                                                                                       
                                 "                                                                               |      |                   |      |  |                ||                |    ",                                                                                                                                       
                                 "                                                                               |      |                   |      |  |                ||                |    ",                                                                                                                                       
                                 "                                                                               |      |                   |      |  |  oooooooooooo  ||  oooooooooooo  |    ",                                                                                                                                       
                                 "                                                                               |      |                   |      |  |___\\________/___||___\\________/___|    ",                                                                                                                                       
                                 "                                                                               |      |                   |      |  |                ||                |    ",                                                                                                                                      
                                 "                                                                                \\     |                   |     /   |                ||                |    ",                                                                                                                                       
                                 "                                                                                |     |                   |    |    |                ||                |    ",                                                                                                                                       
                                 "                                                                               /      |                   |     \\   |  oooooooooooo  ||  oooooooooooo  |    ",                                                                                                                                           
                                 "                                                                              |       |                   |      |  |___\\________/___||___\\________/___|    ",                                                                                                                                       
                                 "                                                                              |       |                   |      |  |                ||                |    "];                                                                                                                                       



		vm.treeSlumsThugs = new vm.Location();
		vm.treeSlumsThugs.name = 'Angry Thugs';
		vm.treeSlumsThugs.prev = 'slums';
		vm.treeSlumsThugs.prevName = 'Slums';
		vm.treeSlumsThugs.specialText = true;
		vm.treeSlumsThugs.dialogue = dialogueService.slumThugs;
        vm.treeSlumsThugs.ascii = ["                                                                                                                                                       ",                                        
                                   "                                                                                                                                                       ",                                     
                                   "                                                                                                     \\\\//\\\\//\\\\//                                      ",                                                                                                                                     
                                   "                                                                               _______               /__    //\\\\\\          .'''''''''''''.             ",                                                                                                                                        
                                   "                                                                              /       \\             | <      \\\\//|         '_____________'             ",                                                                                                                                     
                                   "                                                                             /   __\\\\\\|            C.         B \\|        (_______________)            ",                                                                                                                                      
                                   "                                                                            /  .'                   <            |         (<--.  .--.  \\|             ",                                                                                                                                      
                                   "                                                                           /   |                    <           /           \\ o   o      |             ",                                                                                                                                      
                                   "                                                                           |   |      ___            |_________/            /   |        ))            ",                                                                                                                                        
                                   "                                                                          '     '.  .'   '.   ____    |       |      ____  |   (__.      |             ",                                                                                                                                     
                                   "                                                                          |       |/       \\''    ''._|       |___.''    '' \\   ___.   .'              ",                                                                                                                                              
                                   "                                                                          |       |                                          \\_     __/|               ",                                                                                                                                     
                                   "                                                                          \\                                                    \\_._/   |               ",                                                                                                                                     
                                   "                                                                           \\______                                        ____.-'       '-._____       ",                                                                                                                                          
                                   "                                                                                  '--.___.--'.           |              -'      \\       /       '-     ",                                                                                                                                                
                                   "                                                                                              |          |          |  /         '--.--'          \\    ",                                                                                                                                             
                                   "                                                                                              |   .      |      .   | /                            \\   ",                                                                                                                                          
                                   "                                                                                               \\ ______ / \\ ______ / /    |                   |     \\  ",                                                                                                                                          
                                   "                                                                                               (                    /     |                   |      \\ "]                                                                                                                                           


		vm.treeSlumsBum = new vm.Location();
		vm.treeSlumsBum.name = 'Tree Slums Bum';
		vm.treeSlumsBum.prev = 'slums';
		vm.treeSlumsBum.prevName = 'Slums';
        vm.treeSlumsBum.dialogue = dialogueService.bum;
        vm.treeSlumsBum.specialText = true;
        vm.treeSlumsBum.ascii = ["                                                                                                         ",                                                                                   
                                 "                                                                                                             ",                                                                                   
                                 "                                                                                       /\\\\\\\\\\\\               ",                                                                                                                                                                           
                                 "                                                                                      //\\\\\\\\\\\\\\              ",                                                                                                                                                                           
                                 "                                                                                      /|'| '  |\\             ",                                                                                                                                                                           
                                 "                                                                                      /| __   |\\             ",                                                                                                                                                                           
                                 "                                                                                      /\\_____/\\\\             ",                                                                                                                                                                           
                                 "                                                                                      ///|___|\\\\_            ",                                                                                                                                                                           
                                 "                                                                               ______/___________\\__         ",                                                                                                                                                                           
                                 "                                                                              |                     |.       ",                                                                                                                                                                           
                                 "                                                                             /|  ASPIRING MUSICIAN  | \\      ",                                                                                                                                                                           
                                 "                                                                             \\_|                   |__/      ",                                                                                                                                                                           
                                 "                                                                              |   ANYTHING HELPS    |        ",                                                                                                                                                                           
                                 "                                                                              |_____________________|        ",                                                                                                                                                                           
                                 "                                                                                       |       |             ",                                                                                                                                                                           
                                 "                                                                                       |_______|             ",                                                                                                                                                                           
                                 "                                                                                       |       |             ",                                                                                                                                                                           
                                 "                                                                                       |  ___  |             ",                                                                                                                                                                           
                                 "                                                                                       |   |   |             ",                                                                                                                                                                           
                                 "                                                                                       |   |   |             "];                                                                                                                                                                         



        vm.monk = new vm.Location();
        vm.monk.name = 'The Cavern';
        vm.monk.slug = 'monk';
        vm.monk.prev = 'mainMap';
        vm.monk.prevName = 'Map';
        vm.monk.specialText = true;
        vm.monk.dialogue = dialogueService.monk;
        vm.monk.ascii = ["                                                                                                                         ",                                                                                                                                                              
                         "                                                                                                     _____               ",                                                                                                                                                                                               
                         "                                                                                                    /     \\              ",                                                                                                                                                                                      
                         "                                                                                                    |.  . |)             ",                                                                                                                                                                                         
                         "                                                                                                    | '_  /              ",                                                                                                                                                                                         
                         "                                                                                                     \\___/|              ",                                                                                                                                                                                             
                         "                                                                                                  ____|   |___           ",                                                                                                                                                                                                  
                         "                                                                                                 |    \\   /   |          ",                                                                                                                                                                                                  
                         "                                                                                                 |     \\ /    |          ",                                                                                                                                                                                                  
                         "                                                                                                 |  |   \\   | |          ",                                                                                                                                                                                                  
                         "                                                                                                 |  |    \\  | |          ",                                                                                                                                                                                                  
                         "                                                                                                 |  |     \\ | |          ",                                                                                                                                                                                                  
                         "                                                                                                 |  |      \\| |          ",                                                                                                                                                                                                  
                         "                                                                                                 |  |       | |          ",                                                                                                                                                                                                  
                         "                                                                                                 |  |_______| |          ",                                                                                                                                                                                                  
                         "                                                                                                 |__|       |_|          ",                                                                                                                                                                                                  
                         "                                                                                                 | |        | |          ",                                                                                                                                                                                                  
                         "                                                                                                 '.|        |.'          ",                                                                                                                                                                                                    
                         "                                                                                                   |        |            ",                                                                                                                                                                                                  
                         "                                                                                                   |        |            "];                                                                                                                                                                                                  


        vm.cabin = new vm.Location();
        vm.cabin.name = 'A Cabin';
        vm.cabin.slug = 'cabin';
        vm.cabin.dialogue = dialogueService.cabin;
        vm.cabin.specialText = true;
        vm.cabin.ascii = ["                                                                                                                                                  ",
                          "                                                                                                  wwwwwwwwwwwwwwwwww                              ",                                                                                                                                         
                          "                                                                                                  |_____ |______  wwww                            ",                                                                                                                                         
                          "                                                                                   s               \\ =  |  \\  =     w |               s           ",                                                                                                                                               
                          "                                                                                   S               |   (___.        __/               S           ",                                                                                                                                               
                          "                                                                                   _               |   _____        |                 _           ",                                                                                                                                               
                          "                                                                                  | |               \\__'      _____/                 | |          ",                                                                                                                                               
                          "                                                                                  | |                  \\_.___/|  |                   | |          ",                                                                                                                                               
                          "                                                                                __| |             _____||     |  |______             | |__        ",                                                                                                                                              
                          "                                                                               |||| |            /    /| \\   /  / \\     \\            | ||||       ",                                                                                                                                               
                          "                                                                               |____\\\\           /    / \\       /   \\     \\           //____|     ",                                                                                                                                                
                          "                                                                                 \\  \\          /   |/o__\\     /____o\\     \\          /  /         ",                                                                                                                                              
                          "                                                                                  \\/ \\        /   |    / \\  /  \\           \\        / \\/          ",                                                                                                                                               
                          "                                                                                  |   \\_ ____/    |   /   \\/    \\           \\____ _/   |          ",                                                                                                                                               
                          "                                                                                  \\     \\ /       |  /o___/_____o\            \\  /    /           ",                                                                                                                                               
                          "                                                                                   \\__          __|      /            \\__          __/            ",                                                                                                                                               
                          "                                                                                      \\_     __/   |    /              | \\      __/               ",                                                                                                                                               
                          "                                                                                        \\___/       |  |              |   \\____/                  ",                                                                                                                                              
                          "                                                                                                    |  |              |                           ",                                                                                                                                            
                          "                                                                                                    |/ |              |                           ",                                                                                                                                            
                          "                                                                                                    |__|_______________|                          ",                                                                                                                                            
                          "                                                                                                    |                  |                          ",                                                                                                                                            
                          "                                                                                                    |                  |                          "]                                                                                                                                           


		vm.wizard = new vm.Location();
		vm.wizard.name = 'Wizard';
        vm.wizard.slug = 'wizard';
		vm.wizard.prev = 'mainMap';
		vm.wizard.prevName = 'Map';
		vm.wizard.specialText = true;
		vm.wizard.dialogue = dialogueService.wizard;
        vm.wizard.ascii =  ["                                                                                         ",
                            "                                                                                         ",
                            "                                                                                         ",                                                                                                                                        
                            "                                                                                         ",                                                                                                                                        
                            "                                                                                         ",                                                                                                                                        
                            "                                                                                                          \\  )(  /                     ",                                                                                                                                        
                            "                                                                                                           \\//\\\\/                      ",                                                                                                                                      
                            "                                                                                             ( >>\\\\\\\\\\  ---((*.))---                   ",                                                                                                                                        
                            "                                                                                             )| . . |)     /\\\\//\\                      ",                                                                                                                                      
                            "                                                                                            ( |  |  |(    /  ||  \\                     ",                                                                                                                                        
                            "                                                                                             )\\ mmm / )      ||                        ",                                                                                                                                        
                            "                                                                                            (__mMMMm_(_     (__)                       ",                                                                                                                                        
                            "                                                                                           /   mMMMm   \\    /||                        ",                                                                                                                                      
                            "                                                                                          | |  mMMMm  \\ \\  / ||                        ",                                                                                                                                      
                            "                                                                                          | |   MMM   |\\ \\/  ||                        ",                                                                                                                                        
                            "                                                                                          | |   mMm   | \\__  ||                        ",                                                                                                                                        
                            "                                                                                          | |   mMm   |    \\ ||                        ",                                                                                                                                        
                            "                                                                                          | |____M____|     \\||                        ",                                                                                                                                        
                            "                                                                                          | |    m    |      ||                        ",                                                                                                                                        
                            "                                                                                          |_|         |      ||                        ",                                                                                                                                       
                            "                                                                                            |         |      ||      ",                                                                                                                                        
                            "                                                                                            |         |      ||      ",                                                                                                                                        
                            "                                                                                            |_________|      ||      "];
		vm.wizard.ascii2 =	["                                                                                                                                                    ",
                             "                                                                               )(                                     ~  \\  )(  /  ~               ",                                                                                                                                            
							 "                                                                              ))((                                 ~    ~ \\//\\\\/ ~   ~             ",                                                                                                                                           
							 "                                                                             ((()))                                    ---((X.))---                ",                                                                                                                                               
							 "                                                                             \\_  _/             ( >>\\\\\\\\\\           ~   ~ /\\\\//\\ ~   ~             ",                                                                                                                                          
							 "                                                                               \\  \\             )| . . |)             ~  /  ||  \\  ~               ",                                                                                                                                         
							 "                                                                                \\  \\           ( |  |  |(                 ~ || ~                   ",                                                                                                                                           
							 "                                                                                 \\  \\           )\\ mmm / )                  ||                     ",                                                                                                                                         
							 "                                                                                  \\  \\_________(__mMMMm_(___________________||                     ",                                                                                                                                           
							 "                                                                                   \\/ _________   mMMMm   _________      |_(__)                    ",                                                                                                                                             
							 "                                                                                   |  |        |  mMMMm  |         \\     |  ||                     ",                                                                                                                                           
							 "                                                                                   |  |        |   MMM   |          \\    |  ||                     ",                                                                                                                                         
							 "                                                                                   |  |        |   mMm   |           \\   |  ||                     ",                                                                                                                                         
							 "                                                                                   |  |        |   mMm   |            \\  |  ||                     ",                                                                                                                                           
							 "                                                                                   | /         |____M____|             \\ |  ||                     ",                                                                                                                                           
							 "                                                                                   |/         /     m     \\             \\|  ||                     ",                                                                                                                                           
							 "                                                                                             /             \\                ||                     ",                                                                                                                                           
							 "                                                                                            /               \\               ||                     ",                                                                                                                                          
							 "                                                                                           /                 \\              ||                     ",                                                                                                                                          
							 "                                                                                        __/                   \\__           ||                     ",                                                                                                                                              
							 "                                                                                        \\_______________________/                                  ",                                                                                                                              
							 "                                                                                             _/_/       \\_\\_                                       ",                                                                                                                               
							 "                                                                                            (___|       |___)                                      "];


        vm.wizard.ascii3 = ["                                                                                         ",
                         "                                                                                                                               __                        ",                                                                                                                                                                          
                         "                                                                                                /\\                           _/  \\__                     ",                                                                                                                                                                            
                         "                                                                                             /\\/  \\/\\                      _/       \\__                  ",                                                                                                                                                                            
                         "                                                                                            /    .   \\                   _/   _/\\_     \\__               ",                                                                                                                                                                            
                         "                                                                                           /    / \\   \\/|              _/   _/____\\_      \\__            ",                                                                                                                                                                            
                         "                                                                                        |\\|  /\\/   \\    |/|          _/   _/        \\_       \\_          ",                                                                                                                                                                            
                         "                                                                                        |   |   /|\\ \\/\\   |         /   _/            \\_       \\         ",                                                                                                                                                                                 
                         "                                                                                        | |\\|  / | \\   |  |         |  / | .|.    .|.   \\_      |        ",                                                                                                                                                                            
                         "                                                                                      |\\| |   |  |  |  |  |/\\       |  | |- o -  - o -  | \\_    |        ",                                                                                                                                                                            
                         "                                                                                      |   |   |  |  |  |     |      |  | | '.' /| '.'   |   |   |        ",                                                                                                                                                                                    
                         "                                                                                      | |\\|   |  |  |  |/\\   |      |  |  \\____________/|   |   |        ",                                                                                                                                                                           
                         "                                                                                      | |     |  |  |     |  |      |  |    \\/\\/\\/\\/\\/\\/|   |   |        ",                                                                                                                                                                            
                         "                                                                                    |\\| \\     |  |  |     |  |      |  |     |          |   |   |        ",                                                                                                                                                                            
                         "                                                                                    \\   _\\    |  |  |     |  |      |  |   /\\/\\/\\/\\/\\/\\_/   |   |        ",                                                                                                                                                                            
                         "                                                                                    _\\  \\     |  |  |    /_  |      |  |   \\____________/   |   |        ",                                                                                                                                                                            
                         "                                                                                    \\    \\    |  |  |     /  |/|    |   \\_       |__|     _/   _/        ",                                                                                                                                                                            
                         "                                                                                     \\    |   |  |  |    /    /    __\\__  \\_ ____|__|____/  __/_____     ",                                                                                                                                                                            
                         "                                                                                      \\_  |   |  |  |   /    /    /     \\__ \\_ ______ __/ _/       |\\    ",                                                                                                                                                                            
                         "                                                                                        \\_ \\  |  |  |  /  __/    /         \\_ \\___||__/ _/         | \\   ",                                                                                                                                                                            
                         "                                                                                      __  \\_\\ |  |  | /__/ __   /            \\ \\__||_/ /           |  \\  ",                                                                                                                                                                            
                         "                                                                                     /  \\___\\\\|  |  |//___/  \\ /              \\_ \\||/ /            |   \\ ",                                                                                                                                                          
                         "                                                                                    /    _____       _____    \\                 \\ \\/ /             |    |"];                                                                                                                                                  
        vm.wizard.currentAscii = 'ascii';
        vm.wizard.asciiCheck = function() {
            if (vm.progress.lichReveal) {
                return 'ascii3';
            }
            else {
                var check = dialogueService.wizard.ascii;
                if (check === 'regular') {
                    return 'ascii';
                }
                else if (check === 'spell') {
                    return 'ascii2';
                }
                else {
                    return 'ascii3';
                }                    
            }
        }



        vm.house = new vm.Location();
        vm.house.name = 'Home';
        vm.house.slug = 'home';
        vm.house.prev = 'mainMap';
        vm.house.prevName = 'Map';
        vm.house.specialText = true;
        vm.house.dialogue = dialogueService.house;
        vm.house.ascii =["                                                                                                               ",
                         "                                                                                                               ",
                         "                                                                                             88888888888       ",                                                                                                                                                                                    
                         "                                                                                           888888888888888     ",                                                                                                                                                                                      
                         "                                                                                           |___    ___   88    ",                                                                                                                                                                                    
                         "                                                                                           / . \\__/ . \\__|8    ",                                                                                                                                                                                    
                         "                                                                                           \\___/| \\___/  |     ",                                                                                                                                                                                    
                         "                                                                                           |    <        |     ",                                                                                                                                                                                    
                         "                                                                                           |  | __ |     |     ",                                                                                                                                                                                      
                         "                                                                                           \\__|____|____/      ",                                                                                                                                                                                      
                         "                                                                                           _____|\\  /  |_____  ",                                                                                                                                                                                    
                         "                                                                                          /     '------'     \\ ",                                                                                                                                                                                      
                         "                                                                                         /                    \\",  
                         "                                                                                         |      /\\___/\\       |",                                                                       
                         "                                                                                         |     /  _ _  \\      |",                                                          
                         "                                                                                      ____     | > . < |   |  |",                                                                                                                                                                                    
                         "                                                                                     /    \\     '-----'    |  |",                                                                                                                                                                                    
                         "                                                                                   .'\\___ /      MEOW!     |  |",                                                                                                                                                                                      
                         "                                                                                  /_/  | |                 |  |",                                                                                                                                                                                      
                         "                                                                                       | |                 |  |",                                                                                                                                                                                    
                         "                                                                                       | |                 |  |",                                                                                                                                                                                    
                         "                                                                                       | |   ______________|  |"]                                                                                                                                                                                    


        vm.arena = new vm.Location();
        vm.arena.name = 'The Arena';
        vm.arena.slug = 'arena';
        vm.arena.prev = 'mainMap';
        vm.arena.prevName = 'Map';
        vm.arena.specialText = true;
        vm.arena.dialogue = dialogueService.arena;
        vm.arena.ascii = ["                                                                                                                                                   ",                                                   
                          "                                                                                                            __ __ ___ ___ ___                       ",                                                                                                                                                                               
                          "                                                                                                            \\_/   \\__\\\\__\\\\__\\                      ",                                                                                                                                                                               
                          "                                                                                                            //    /__//__//__/                      ",                                                                                                                                                                               
                          "                                                                                     _________               |  _    __     \\                       ",                                                                                                                                                                               
                          "                                                                                     |       |               | /_\\  /__\\    |                       ",                                                                                                                                                                              
                          "                                                                                     | o o o |               |    /|        |                       ",                                                                                                                                                                               
                          "                                                                                     \\__   __/                |_________|   |                       ",                                                                                                                                                                               
                          "                                                                                        | |                    |_|_|_|_|    |                       ",                                                                                                                                                                               
                          "                                                                                       \\\\\\\\                    _________|  /                        ",                                                                                                                                                                               
                          "                                                                                        \\\\\\\\|                  \\__________/                         ",                                                                                                                                                                               
                          "                                                                                        |\\_ |               ________|___|______________             ",                                                                                                                                                                                 
                          "                                                                                       /___\\\\              /       /|___|\\             \\            ",                                                                                                                                                                               
                          "                                                                                            \\\\            /        \\\\___//              \\           ",                                                                                                                                                               
                          "                                                                                             \\\\          /        __/| |\\__              \\          ",                                                                                                                                                                 
                          "                                                                                              \\\\        /       _/_  | |  _\\___           \\         ",                                                                                                                                                              
                          "                                                                                               \\\\      /    ___/___| | | |_____\\_____      \\        ",                                                                                                                                                               
                          "                                                                                                \\\\    /____/_______  | |  _________/ \\_____ \\       ",                                                                                                                                                              
                          "                                                                                                 \\\\  |//   \\_______| | | |__________/|     \\\\|      ",                                                                                                                                                               
                          "                                                                                                  \\\\ //     _______  | |  ___________|      \\\\      "];                                                                                                                                                               




		vm.treeGovernment = new vm.Location();
		vm.treeGovernment.name = 'King Treemaster';
		vm.treeGovernment.prev = 'treeCity';
		vm.treeGovernment.prevName = 'Tresabor';
		vm.treeGovernment.specialText = true;
		vm.treeGovernment.dialogue = dialogueService.treeKing;
		vm.treeGovernment.ascii =   ["                                                                                                  __/                                                       ",                                                                                                                                             
									 "                                                                                                    \\   \\/ __\\   \\_/   __/                                  ",                                                                                                                                             
									 "                                                                                               __\\   \\/ /_   /    \\   /__                                   ",                                                                                                                                             
									 "                                                                                                  \\__/__\\___/___\\_/__/   \\                                  ",                                                                                                                                             
									 "                                                                                                     \\____________/                                         ",                                                                                                                                             
									 "                                                                                                     ccdcdDCcdcDCdc                                         ",                                                                                                                                             
									 "                                                                                                      | O    O  `8c                                         ",                                                                                                                                             
									 "                                                                                                      |   |       ))                                        ",                                                                                                                                             
									 "                                                                                                      |  C.      .'                                         ",                                                                                                                                               
									 "                                                                                                       \\ ___.   ;|                                          ",                                                                                                                                             
									 "                                                                                                        \\_____.' |                                          ",                                                                                                                                                 
									 "                                                                                                          |      |                                          ",                                                                                                                                             
									 "                                                                                                __________|      |____________                              ",                                                                                                                                             
									 "                                                                                               '\\         \\ _ ___/           /`.                            ",                                                                                                                                               
									 "                                                                                              /  \\__       |||          ____/   \\                           ",                                                                                                                                             
									 "                                                                                             /      \\__    |||     ____/         \\                          ",                                                                                                                                             
									 "                                                                                            /          \\_ / | \\__ /               \\                         ",                                                                                                                                             
									 "                                                                                           /             | ||| |                   \\                        ",                                                                                                                                             
									 "                                                                                          /            .'  .|.  '.                  \\                       ",                                                                                                                                             
									 "                                                                                         /           .'|  /   \\  |'.                 \\                      ",                                                                                                                                             
									 "                                                                                        /          .'| | /     \\ | |'.                \\                     ",                                                                                                                                             
									 "                                                                                       /         .'  | |/|     |\\| |  '.               \\                    " ];                                                                                                                                              


        vm.lich = new vm.Location();
        vm.lich.name = 'The Lich';
        vm.lich.slug = 'lich';
        vm.lich.prev = 'mainMap';
        vm.lich.prevName = 'Map';
        vm.lich.specialText = true;
        vm.lich.dialogue = dialogueService.meteor;
        vm.lich.specialText = true;
        vm.lich.ascii = [''];



    	vm.currentLocation = vm.mainMap;




		vm.locationDictionary['mainMap'] = this.mainMap;
			vm.locationDictionary['treeCity'] = this.treeCity;
				vm.locationDictionary['treeSecret'] = this.treeSecret;
				vm.locationDictionary['treeGovernment'] = this.treeGovernment;
				vm.locationDictionary['treeInn'] = this.treeInn;
				vm.locationDictionary['treeShop'] = this.treeShop;
				vm.locationDictionary['slums'] = this.treeSlums;
					vm.locationDictionary['slumsInn'] = this.treeSlumsInn;
					vm.locationDictionary['slumsThugs'] = this.treeSlumsThugs;
					vm.locationDictionary['slumsBum'] = this.treeSlumsBum;
			vm.locationDictionary['wizard'] = this.wizard;
            vm.locationDictionary['monk'] = this.monk;
            vm.locationDictionary['house'] = this.house;
            vm.locationDictionary['arena'] = this.arena;
            vm.locationDictionary['lich'] = this.lich;
            vm.locationDictionary['cabin'] = this.cabin;
    }
})();