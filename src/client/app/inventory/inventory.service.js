(function() {
    'use strict';

    angular
        .module('app.inventory')
        .service('inventoryService', inventoryService);

    inventoryService.$inject = [];

    /* @ngInject */
    function inventoryService() {
    	var vm = this;
		vm.itemDictionary = [];

		this.Item = function() {
			this.buyable = false,
			this.removeAfterBuy = false,
			this.craftTime = 5000,
			this.recipe  = undefined,
			this.quantity = 0,
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
							err = err + 1;
						}
					}
					//if err === 0 then we have enough resources, so craft
					if (err === 0) {
						for (var j = 0; j < recipe.length; j++) {
							vm.itemDictionary[recipe[j][0]][1][1] = vm.itemDictionary[recipe[j][0]][1][1] - recipe[j][1];
						}
						vm.itemDictionary[this.slug][1][1] = vm.itemDictionary[this.slug][1][1] + this.quant;
						return true;
					}
				}
			}
		};

		this.grass   = new this.Item();
		this.grass.spawn = ['Forest'];
		this.grass.desc  = 'A bundle of grass';
		this.grass.name = 'Grass';
		this.grass.cat = 'ingredient';
		this.grass.slug = 'grass';

		this.wood  = new this.Item();
		this.wood.desc = 'A slab of wood';
		this.wood.cat = 'ingredient';
		this.wood.name = 'Wood';
		this.wood.slug = 'wood';

		this.campfire    = new this.Item();
		this.campfire.recipe = ['wood-2', 'grass-2'];
		this.campfire.desc   = 'A warm fire';
		this.campfire.cat = 'structure';
		this.campfire.name   = 'Campfire';
		this.campfire.slug = 'campfire';

		this.stick    = new this.Item();
		this.stick.recipe = ['wood-1'];
		this.stick.quant  = 5;
		this.stick.desc   = 'It used to be part of a log';
		this.stick.cat = 'ingredient'
		this.stick.name   = 'Stick';
		this.stick.buyable = true;
		this.stick.price = 50;
		this.stick.slug = 'stick';

		this.rock   = new this.Item();
		this.rock.spawn = ['Forest'];
		this.rock.desc  = 'It is a rock';
		this.rock.cat = 'ingredient';
		this.rock.name  = 'Rock';
		this.rock.buyable = true;
		this.rock.slug = 'rock';

		this.tent = new this.Item();
		this.tent.recipe = ['stick-1', 'grass-1'];
		this.tent.desc   = 'Stay safe for the night';
		this.tent.cat = 'structure';
		this.tent.name   = 'Tent';
		this.tent.slug = 'tent';
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
		this.club.slug = 'club';

		this.sword = new this.Item();
		this.sword.name = 'Sword';
		this.sword.desc = 'A basic sword';
		this.sword.recipe = ['wood-100'];
		this.sword.cat = 'weapon';
		this.sword.damage = 1;
		this.sword.attackSpeed = 1;
		this.sword.buyable = true;
		this.sword.removeAfterBuy = true;
		this.sword.price = 100;
		this.sword.slug = 'sword';

		this.woodArmor = new this.Item();
		this.woodArmor.name = 'Wood Armor';
		this.woodArmor.desc = 'Hope for no splinters!';
		this.woodArmor.cat = 'armor';
		this.woodArmor.armor = 0.1;
		this.woodArmor.buyable = true;
		this.woodArmor.removeAfterBuy = true;
		this.woodArmor.unlock = 'boneArmor';
		this.woodArmor.price = 150;
		this.woodArmor.slug = 'woodArmor';

		this.boneArmor = new this.Item();
		this.boneArmor.name = 'Bone Armor';
		this.boneArmor.desc = 'Bonez';
		this.boneArmor.cat = 'armor';
		this.boneArmor.armor = 0.2;
		this.boneArmor.price = 300;
		this.boneArmor.removeAfterBuy = true;
		this.boneArmor.slug = 'boneArmor';

		this.potion = new this.Item();
		this.potion.name = 'Health Potion';
		this.potion.desc = 'Heals ' + this.potion.strength + ' health';
		this.potion.strength = 50;
		this.potion.buyable = true;
		this.potion.price = 100;

		this.food = new this.Item();
		this.food.name = 'Food';
		this.food.desc = 'Food for workers';

		this.ore = new this.Item();
		this.ore.name = 'Ore';
		this.ore.desc = 'Metal stuff';

		vm.itemDictionary['food'] = [['item', this.food], ['amount', 5]];
		vm.itemDictionary['ore'] = [['item', this.ore], ['amount', 5]];
		vm.itemDictionary['grass'] = [['item', this.grass], ['amount', 5]];
		vm.itemDictionary['wood']  = [['item', this.wood], ['amount', 500]];
		vm.itemDictionary['campfire'] = [['item', this.campfire], ['amount', 0]];
		vm.itemDictionary['stick'] = [['item', this.stick], ['amount', 0]];
		vm.itemDictionary['tent'] = [['item', this.tent], ['amount', 0]];
		vm.itemDictionary['club'] = [['item', this.club], ['amount', 1]];
		vm.itemDictionary['sword'] = [['item', this.sword], ['amount', 1]];
		vm.itemDictionary['woodArmor'] = [['item', this.woodArmor], ['amount', 1]];
		vm.itemDictionary['boneArmor'] = [['item', this.boneArmor], ['amount', 0]];
		vm.itemDictionary['potion'] = [['item', this.potion], ['amount', 10]];



		vm.buyableItems = ['potion', 'sword', 'wood', 'boneArmor'];

		vm.weapons = [vm.itemDictionary['club'], 
					  vm.itemDictionary['sword']];


		vm.armor = [vm.itemDictionary['woodArmor'],
					vm.itemDictionary['boneArmor']];



		// function findWeapons() {
		// 	var length = Object.keys(vm.itemDictionary).length;
		// 	for (var i = 0; i < length; i++) {
		// 		console.log(vm.itemDictionary[0])
		// 		// if (vm.itemDictionary[i][0][1].cat == 'weapon') {
		// 		// 	console.log(vm.itemDictionary[0][1].name);
		// 		// }
		// 		// else {
		// 		// 	console.log(vm.itemDictionary[0][1].cat);
		// 		// }
		// 	}
		// }
		// findWeapons();
    }
})();