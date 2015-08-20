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

		var Item = function() {
			this.recipe  = undefined,
			this.quant = 1,
			this.spawn = undefined,
			this.name = "Default",
			this.slug = function() {
				var slug = this.name.toLowerCase();
				return slug;
			},
			this.effect = function() {
				console.log('does nothing');
			},
			this.craft = function() {
				if (typeof this.recipe !== 'undefined') {
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
						for (var j = 0; j < recipe.length; j++) {
							vm.itemDictionary[recipe[j][0]][1][1] = vm.itemDictionary[recipe[j][0]][1][1] - recipe[j][1];
						}
						vm.itemDictionary[this.slug()][1][1] = vm.itemDictionary[this.slug()][1][1] + this.quant;
					}
				}
			}
		};

		var grass   = new Item();
		grass.spawn = ['Forest'];
		grass.desc  = 'A bundle of grass';
		grass.name = 'Grass';
		grass.slug;

		var wood  = new Item();
		wood.desc = 'A slab of wood';
		wood.name = 'Wood';

		var campfire    = new Item();
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
		vm.itemDictionary['campfire'] = [['item', campfire], ['amount', 0]];
		vm.itemDictionary['stick'] = [['item', stick], ['amount', 10]];
		vm.itemDictionary['tent'] = [['item', tent], ['amount', 0]];
		vm.itemDictionary['club'] = [['item'], club, ['amount', 0]]

		function activate() {
			console.log(grass.slug());
		}
		activate();
	}
})();
