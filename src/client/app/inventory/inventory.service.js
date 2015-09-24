(function() {
    'use strict';

    angular
        .module('app.inventory')
        .service('inventoryService', inventoryService);

    inventoryService.$inject = [];

    /* @ngInject */
    function inventoryService() {
    	var vm = this;
		vm.itemDictionary = {};

		this.Item = function() {
			this.craftTime = 5000;
			this.recipe  = undefined,
			this.quant = 1,
			this.cat = 'default',
			this.spawn = undefined,
			this.name = "Default",
			this.slug = function() {
				var slug = this.name.toLowerCase();
				return slug;
			},
			this.effect = function() {
				console.log('does nothing');
			},
			this.craftWait = function() {
				var time = 5000;
				for (var i = 0; i < this.craftTime; i++) {
					if (i = this.craftTime - 1) {
						this.craft;
					}
					else {
						time = time - 1;
					}
				}
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
							console.log(vm.itemDictionary[recipe[j][0]][1])
						}
						console.log(vm.itemDictionary[this.slug()][1][1])
						vm.itemDictionary[this.slug()][1][1] = vm.itemDictionary[this.slug()][1][1] + this.quant;
					}
				}
			}
		};

		this.grass   = new this.Item();
		this.grass.spawn = ['Forest'];
		this.grass.desc  = 'A bundle of grass';
		this.grass.name = 'Grass';
		this.grass.cat = 'ingredient';
		this.grass.slug;

		this.wood  = new this.Item();
		this.wood.desc = 'A slab of wood';
		this.wood.cat = 'ingredient';
		this.wood.name = 'Wood';

		this.campfire    = new this.Item();
		this.campfire.recipe = ['wood-2', 'grass-2'];
		this.campfire.desc   = 'A warm fire';
		this.campfire.cat = 'structure';
		this.campfire.name   = 'Campfire';

		this.stick    = new this.Item();
		this.stick.recipe = ['wood-1'];
		this.stick.quant  = 5;
		this.stick.desc   = 'It used to be part of a log';
		this.stick.cat = 'ingredient'
		this.stick.name   = 'Stick';

		this.rock   = new this.Item();
		this.rock.spawn = ['Forest'];
		this.rock.desc  = 'It is a rock';
		this.rock.cat = 'ingredient';
		this.rock.name  = 'Rock';

		this.tent = new this.Item();
		this.tent.recipe = ['stick-1', 'grass-1'];
		this.tent.desc   = 'Stay safe for the night';
		this.tent.cat = 'structure';
		this.tent.name   = 'Tent';
		this.tent.amountCheck = function() {
			console.log(this.quant);
		}

		this.club = new this.Item();
		this.club.recipe = ['stick-1', 'grass-1', 'rock-1'];
		this.club.desc = 'This thing is a beast';
		this.club.cat = 'weapon';
		this.club.damage = 4;
		this.club.attackSpeed = 2;
		this.club.name = 'Club';

		this.sword = new this.Item();
		this.sword.desc = 'A basic sword';
		this.sword.cat = 'weapon';
		this.sword.damage = 2;
		this.sword.attackSpeed = 1;


		vm.itemDictionary['grass'] = [['item', this.grass], ['amount', 5]];
		vm.itemDictionary['wood']  = [['item', this.wood], ['amount', 3]];
		vm.itemDictionary['campfire'] = [['item', this.campfire], ['amount', 0]];
		vm.itemDictionary['stick'] = [['item', this.stick], ['amount', 0]];
		vm.itemDictionary['tent'] = [['item', this.tent], ['amount', 0]];
		vm.itemDictionary['club'] = [['item', this.club], ['amount', 1]];
		vm.itemDictionary['sword'] = [['item', this.sword], ['amount', 0]];

    }
})();