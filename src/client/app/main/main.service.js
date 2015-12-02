(function() {
    'use strict';

    angular
        .module('app.main')
        .service('mainService', mainService);

    mainService.$inject = [];

    /* @ngInject */
    function mainService() {
    	var vm = this;
    	vm.setCharAt = function(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }
        vm.click = function(location, hover, data,  x, y, xlength, ylength, isLevel) {
            for (var i = 0; i < ylength; i++) {
            	if (isLevel) {
                	var before = '<span title = "' + hover + '" class = "click" ng-click = "vm.switchLevel(\'' + data + '\')">' + location.ascii[y + i][x];
            	}
            	else {
                	var before = '<span title = "' + hover + '" class = "click" ng-click = "vm.switchLocation(\'' + data + '\')">' + location.ascii[y + i][x];
            	}
                var after = location.ascii[y + i][x + xlength] + '</span>';
                //after then before to not break order!
                location.ascii[y + i] = this.setCharAt(location.ascii[y + i], x + xlength, after);
                location.ascii[y + i] = this.setCharAt(location.ascii[y + i], x, before);
            }
        }

        vm.hover = function() {
        	console.log('hover');
        }

        vm.Location = function() {
    		this.asciiFormatted = [];
    		this.asciiSpanned = [];
    		this.formatted = false;
    		this.initClicks = function(){}
    		this.specFunc = function(){}
        };

        vm.locationDictionary = [];

        vm.mainMap = new vm.Location;
        vm.mainMap.name = 'Map';
        vm.mainMap.initClicks = function() {
        	//wizard
        	vm.click(this, 'Wizard', 'wizard', 171, 35, 30, 10);
        	//snow
        	vm.click(this, 'Snow', 'snow', 140, 30, 30, 15, true);
        	//bridge
        	vm.click(this, 'Bridge', 'bridge', 110, 39, 25, 5, true);
        	//tree city
        	vm.click(this, 'Tree City', 'treeCity', 33, 18, 15, 10);
        	//tree two
        	vm.click(this, 'Tree Two', 'treeTwo', 30, 29, 30, 10, true);
        	//treeone 
        	vm.click(this, 'Tree One', 'treeOne', 1, 29, 28, 10, true);
        	vm.click(this, 'Tree One', 'treeOne', 30, 40, 38, 5, true);
        	//ruins
        	vm.click(this, 'Ruins', 'ruins', 0, 6, 50, 12, true);
        	vm.click(this, 'Dungeon', 'dungeon', 0, 0, 25, 6, true);

        };
		vm.mainMap.ascii = [	"            .                                  /              \\     /   \\                                                    /         \\   .'                          \\                  ",
								"           /_\\'.                             .'   .^.         /\\   /     \\     ^                                           .'     ^  .  '. '.                          |        \\_      ",
								"          /___\\/'.                          /    .   \\    ^ .'  '.'       '. .' '.             .......                    /      / .' '.  \\  :                         \\        /__     ",
								"         /_____\\/ '.            +               /     \\  / \\   .''.         /     \\         ,''       '',                /   ,'./ /     \\     ':   ~                    \\______/        ",
								"   +    /_______\\ /             +            ../       .'   './    \\       /       \\       '.           .'             ,'   /    /       \\ ^    '.                      /      \\___/    ",
								"   +   /   |~|   \\                         .'         /       \\     '.    ^        .^.       '..     ..'              /   ,'    /        .' '.    '.            ~   ___/       /   \\    ",
								"                     +                    /          '         ' ^    \\  / \\      /   \\         '''''                /   /    .'     .  /     \\     :            __/          /         ",
								"                     +                              /          .' '.   .'   '.  .'     '.                           /        /      . ./       '.    '.         /                       ",
								"   '                                               /          /     \\ /    ^  \\/ ^   ^   \\                .^.               :  .^. /   \\         \\     :        |                        ",
								"                                   .             .'          /       '.   / \\  \\/ \\ / \\   :             .'   '.      .^.    / /   \\     \\         \\   ,'       /                         ",
								"   ,              ^^                            /          .'          \\.'   './   ',  \\   \\    .^.  . /       \\ .^./   \\   .'     '.    '.          .'      _/                          ",
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
								" / \\  /  \\  |  | / \\ ^\\  /\\   ^ \\   /////\\\\\\\\\\  / \\/ / \ | / \\                                                           ,'          /                     \\__                       __/  /  ",
								"\\ | .  ||^    ^   | / \\ /  \\ / \\  /////|  |\\\\\\\\\\/ \\ |/ \\ . / \\                                                         :'          _/                   ___/                            /__",
								" \\ / \\  / \\  / \\  . / \\^/  \\ / \\  ^    |##|   /\\ |.   |^/ \\ |                                                        .'         __/                        \\__                         /",
								" \\ / \\  / \\  / \\ / \\ |/ \\|| ^ |  / \\    ^    /  \\/ \\^ / \\ \\.             *               ,,,                        .'         /                                                          ",
								"|   |    |    |  / \\  / \\  / \\ ^ / \\   / \\   /  \\/\\/ \\/ \\|/ \\                                                      :           |                                                           ",
								"                  |    |   / \\/ \\ |  ^ / \\ ^  ||/  \\ \\ |  / \\                                                       '.   ~      \\___                                                      ",
								"                            | / \\   / \\ | / \\   ^  \\|.  .  |                                                          ',       ~    \\                                                    ",
								"   ,,,                ,,,      |  ^ / \\   / \\  / \\ _/ \\/ \\                                                             :            |                                                   ",
								"                                 / \\ |^    |   / \\| / \\/ \\                                                  *           ',           \\                                                    ",    
								"                                 / \\ / \\   ^    |   .|  |           '''                                                   ''.         \\_       \\__                                          ",        
								"                            ,,    |  / \\  / \\   ^  / \\                                                                       :  ~       \\  \\___/                                        __               ", 
								"                                      |   / \\  / \\ / \\                                                                      .'           \\__/__   \\__                                  /  \\             ",        
								"                                           |   / \\  |                                                                      .'            /     \\__/                                 .''    ''.___           ",
								"                                                |                                              ,,                       ,,:       ~  ___/    __/  \\__                              /        ___  '.________  ",        
								"          ___                                                                                                         .;            /          \\                            ____.''    __  / , \\            ",
								"         /\\__\\                 .                                                                                   ,''             /                                       /\"\\                            ",
								"    .^.  ||  |                                                                                                     :              |                                        \\_________                        ",
								"                                                                                                                  .'             /                                          ' ' ' ' ''.                       ",
								"                               ,,,                                    ,,,                             *          ;              /                                             .__.__.__\\                     ",
								"                  _                                                                                            .'         ~   .'                                                                              "];



        vm.treeCity = new vm.Location;
        vm.treeCity.name = 'Tree City';
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
			vm.click(this, 'test', 'treeGovernment', 92, 6, 12, 7);
			vm.click(this, 'test', 'slums', 83, 15, 40, 5);
			vm.click(this, '','treeSecret', 66, 8, 2, 2);
			vm.click(this, 'test', 'treeInn', 40, 9, 7, 3);
			vm.click(this, 'test', 'treeShop', 12, 9, 7, 3);
		}

		vm.treeSecret = new vm.Location;
		vm.treeSecret.name = 'Tree secret';
		vm.treeSecret.ascii = ['tree secret'];
		vm.treeSecret.prev = 'treeCity';
		vm.treeSecret.prevName = 'Tree City';

		vm.treeShop = new vm.Location;
		vm.treeShop.name = 'Tree Shop';
		vm.treeShop.ascii = ["                                     ()                                                      ",                                                                                                                                
						     "                                    _||_                                                     ",                                                                                                                              
						     "                                   '-__-'                                                    ",                                                                                                                               
						     "                                     ||                    _______        _______            ",                                                                                                                               
						     "                                     ||                    \\      \\______/      /            ",                                                                                                                               
						     "                                     ||                     \\                  /             ",                                                                                                                               
						     "                                     ||                      |                |              ",                                                                                                                                     
						     "                                     ||                      |                |              ",                                                                                                                               
						     "                                     ||                      |                |              ",                                                                                                                               
						     "                                     ||                      |                |              ",
						     "                                     ||                      |                |              ",                                                                                                                               
						     "                                     \\/                       \\______________/               ",                                                                                                                                                
						     "                                                                                             ",                                                                                                                              
						     "                                                                                             ",                                                                                                                              
						     "                                ____________________________________________________________ ",                                                                                                                             
						     "                               |                                                            |",                                                                                                                              
						     "                               |                                                            |",                                                                                                                              
						     "                               |                                                            |",                                                                                                                              
						     "                               |                                                            |",                                                                                                                              
						     "                               |                                                            |",                                                                                                                              
						     "                               |                                                            |",                                                                                                                               
						     "                               |____________________________________________________________|"]                                                                                                                              







		vm.treeShop.prev = 'treeCity';
		vm.treeShop.prevName = 'Tree City';


		vm.treeInn = new vm.Location;
		vm.treeInn.name = 'Tree Inn';
		vm.treeInn.ascii = ['tree inn'];
		vm.treeInn.prev = 'treeCity';
		vm.treeInn.prevName = 'Tree City';

		vm.treeSlums = new vm.Location;
		vm.treeSlums.name = 'Tree Slums';
		vm.treeSlums.initClicks = function() {
			vm.click(this, 'test', 'slumsBum', 105, 12, 5, 4);
			vm.click(this, 'test', 'slumsInn', 64, 11, 6, 5);
			vm.click(this, 'test', 'slumsThugs', 42, 11, 13, 5);
		}
		vm.treeSlums.prev = 'treeCity';
		vm.treeSlums.prevName = 'Tree City';
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
                                                                                                                                                                                                                     
                                                                                                                                                                                                                     
                                                                                                                                                                                                                           

		vm.treeSlumsInn = new vm.Location;
		vm.treeSlumsInn.name = 'Tree Slums Inn';
		vm.treeSlumsInn.ascii = ['tree slums inn'];
		vm.treeSlumsInn.prev = 'slums';
		vm.treeSlumsInn.prevName = 'Slums';

		vm.treeSlumsThugs = new vm.Location;
		vm.treeSlumsThugs.name = 'Tree Slums Thugs';
		vm.treeSlumsThugs.ascii = ['tree slums thugs'];
		vm.treeSlumsThugs.prev = 'slums';
		vm.treeSlumsThugs.prevName = 'Slums';

		vm.treeSlumsBum = new vm.Location;
		vm.treeSlumsBum.name = 'Tree Slums Bum';
		vm.treeSlumsBum.ascii = ['tree slums bum'];
		vm.treeSlumsBum.prev = 'slums';
		vm.treeSlumsBum.prevName = 'Slums';

		vm.wizard = new vm.Location;
		vm.wizard.name = 'Wizard';
		vm.wizard.prev = 'mainMap';
		vm.wizard.prevName = 'Map';
		vm.wizard.ascii =	["                 )(                                     ~  \\  )(  /  ~               ",                                                                                                                                            
							 "                ))((                                 ~    ~ \\//\\\\/ ~   ~             ",                                                                                                                                           
							 "               ((()))                                    ---((X.))---                ",                                                                                                                                               
							 "               \\_  _/             ( >>\\\\\\\\\\           ~   ~ /\\\\//\\ ~   ~             ",                                                                                                                                          
							 "                 \\  \\             )| . . |)             ~  /  ||  \\  ~               ",                                                                                                                                         
							 "                  \\  \\           ( |  |  |(                 ~ || ~                   ",                                                                                                                                           
							 "                   \\  \\           )\\ mmm / )                  ||                     ",                                                                                                                                         
							 "                    \\  \\_________(__mMMMm_(___________________||                     ",                                                                                                                                           
							 "                     \\/ _________   mMMMm   _________      |_(__)                    ",                                                                                                                                             
							 "                     |  |        |  mMMMm  |         \\     |  ||                     ",                                                                                                                                           
							 "                     |  |        |   MMM   |          \\    |  ||                     ",                                                                                                                                         
							 "                     |  |        |   mMm   |           \\   |  ||                     ",                                                                                                                                         
							 "                     |  |        |   mMm   |            \\  |  ||                     ",                                                                                                                                           
							 "                     | /         |____M____|             \\ |  ||                     ",                                                                                                                                           
							 "                     |/         /     m     \\             \\|  ||                     ",                                                                                                                                           
							 "                               /             \\                ||                     ",                                                                                                                                           
							 "                              /               \\               ||                     ",                                                                                                                                          
							 "                             /                 \\              ||                     ",                                                                                                                                          
							 "                          __/                   \\__           ||                     ",                                                                                                                                              
							 "                          \\_______________________/                                  ",                                                                                                                              
							 "                               _/_/       \\_\\_                                       ",                                                                                                                               
							 "                              (___|       |___)                                      "];



		vm.treeGovernment = new vm.Location;
		vm.treeGovernment.name = 'Tree King';
		vm.treeGovernment.prev = 'treeCity';
		vm.treeGovernment.prevName = 'Tree City';
		vm.treeGovernment.specialText = true;
		vm.treeGovernment.locationText = function() {
			var text = 'Greetings';
			return text;
		}
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


		vm.switchLocation = function() {
			console.log('test');
		}
    }
})();