(function () {
	'use strict';

	angular
		.module('app.inventory')
		.controller('InventoryController', InventoryController);


	InventoryController.$inject = ['$q', 'dataservice', 'logger'];
	/* @ngInject */
	function InventoryController($q, dataservice, logger) {
		var vm = this;
		vm.itemDictionary = {}
		vm.inventory = {
			//materials
			stick: 0,
			grass: 0,
			rock: 0,			
			wood: 0,

			//food
			meat: 0,

			//structure
			tent: 0,
			campfire: 0,

			//weapons
			club: 0,

			//armor
			loincloth: 0
		};

		var Item = function() {
			this.recipe  = undefined,
			this.quant = 1,
			this.spawn = undefined,
			this.slug = undefined,
			this.effect = function() {
				console.log('does nothing');
			},
			this.craft = function() {
				var recipe = [];
				var err = 0;
				var testAmt = 5;
				for (var i = 0; i < this.recipe.length; i++) {
					recipe[i] = this.recipe[i].split('-');
					if (recipe[i][1] > vm.itemDictionary[recipe[i][0]][1][1]) {
						console.log('not enough items');
						err = err + 1;
					}
				}
				if (err === 0) {
					console.log('create');
					for (var j = 0; j < recipe.length; j++) {
						vm.itemDictionary[recipe[j][0]][1][1] = vm.itemDictionary[recipe[j][0]][1][1] - recipe[j][1];
					}
					vm.itemDictionary[this.slug][1][1] = vm.itemDictionary[this.slug][1][1] + this.quant;
				}
			}
		};


		var grass   = new Item();
		grass.slug = 'grass';
		grass.spawn = ['Forest'];
		grass.desc  = 'A bundle of grass';
		grass.name = 'Grass';

		var wood  = new Item();
		wood.slug = 'wood';
		wood.desc = 'A slab of wood';
		wood.name = 'Wood';

		var campfire    = new Item();
		campfire.slug = 'campfire'
		campfire.recipe = ['wood-2', 'grass-2'];
		campfire.desc   = 'A warm fire';
		campfire.name   = 'Campfire';

		var stick    = new Item();
		stick.recipe = ['wood-1'];
		stick.quant  = 5;
		stick.desc   = 'It used to be part of a log';
		stick.name   = 'Stick';

		var rock   = new Item();
		rock.spawn = ['Forest'];
		rock.desc  = 'It is a rock';
		rock.name  = 'Rock';

		var tent = new Item();
		tent.recipe = ['stick-4, grass-4'];
		tent.desc   = 'Stay safe for the night';
		tent.name   = 'Tent';

		var club = new Item();
		club.recipe = ['stick-1', 'grass-1', 'rock-1'];
		club.desc = 'This thing is a beast';
		club.name = 'Club';

		
		vm.itemDictionary['grass'] = [['item', grass], ['amount', 5]];
		vm.itemDictionary['wood']  = [['item', wood], ['amount', 3]];
		vm.itemDictionary['campfire'] = [['item', campfire], ['amount', 0]]

		function activate() {
			campfire.craft();
		}
		activate();
	}
})();
