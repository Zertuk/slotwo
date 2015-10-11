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
        vm.click = function(ascii, data,  x, y, xlength, ylength) {
            for (var i = 0; i < ylength; i++) {
            	console.log(data);
                var before = '<span class = "click" ng-model = "' + data + '">' + ascii[y + i][x];
                var after = ascii[y + i][x + xlength] + '</span>';
                //after then before to not break order!
                ascii[y + i] = this.setCharAt(ascii[y + i], x + xlength, after);
                ascii[y + i] = this.setCharAt(ascii[y + i], x, before);
            }
        }

        vm.Location = function() {
    		
        };

        vm.treeCity = new vm.Location;
        vm.treeCity.name = 'Tree City';
		vm.treeCity.ascii = ["        ///////\\\\\\\\\\\\\\         //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ ///////\\\\\\\\\\\\\\             |       |           |              ",                                                                        
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
							   "________|___|     |__|____||___|__|_____|     |___________|___________________.''            /:_______:\\             ''.   ",                                                                           
							   "                                                                                             :_________:              '. ",                                                                   
							   "____________________________________________________________________  ____________________________________________________\\",                                                                    
							   "                                                                    \\ \\____                                                ",                                                                         
							   "                      ______________             ______________      \\____ \\                   .                           ",                                                                        
							   "                    .'   / \\        '.         .'           / \\'.         \\ \\____      ______ / \\  __________   ______ .__ ",                                                                        
							   "                   /      |     .     \\       /     .        |   \\         \\____ \\    /  ..  \\/ \\ /   ....   \\ / ...  / \\ \\",                                                                        
							   "                  /     .      / \\     \\     / .   / \\            \\             \\ \\___|  ||  |_|__|   |  |   |_| | |  / \\ |",                                                                        
							   "                 :     / \\     / \\      :   : / \\  / \\   .'''....' :             \\_____________________________________|___",                                                                            
							   "                 |     / \\      |       |   | / \\   |  .'          |                                                       ",                                                                        
							   "                 |      |               |   |  |      ;            |                                                       "]                                                                        
		vm.treeCity.initClicks = function() {
			vm.click(this.ascii, 'test', 92, 6, 12, 7);
			vm.click(this.ascii, 'test', 40, 9, 7, 3);
			vm.click(this.ascii, 'test', 12, 9, 7, 3);
		};
		vm.treeCity.initClicks();

		vm.treeShop = new vm.Location;
		vm.treeShop.name = 'Tree Shop';
		vm.treeShop.ascii = ['test location'];


    }
})();