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
			},
			this.attackSpeedMessage = function() {
				var message = '';
				if (this.attackSpeed === 1) {
					message = 'Average Speed';
				}
				else if (this.attackSpeed > 1) {
					message = 'Slow Speed';

				} else if (this.attackSpeed < 1) {
					message = 'Fast Speed';
				}
				return message;
			}
		};




		//weapons
		this.fists = new this.Item();
		this.fists.name = 'Fists';
		this.fists.desc = 'just some fists'
		this.fists.damage = 1;
		this.fists.attackSpeed = 1;
		this.fists.slug = 'fists';

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
		this.sword.desc = 'A wooden sword.';
		this.sword.recipe = ['wood-100'];
		this.sword.cat = 'weapon';
		this.sword.damage = 4;
		this.sword.attackSpeed = 2;
		this.sword.buyable = true;
		this.sword.removeAfterBuy = true;
		this.sword.price = 100;
		this.sword.slug = 'sword';

		this.bearClaws = new this.Item();
		this.bearClaws.name = 'Bear Claws';
		this.bearClaws.desc = 'claws of a bear';
		this.bearClaws.damage = 3;
		this.bearClaws.attackSpeed = 1;
		this.bearClaws.slug = 'bearClaws';

		vm.itemDictionary['fists'] = [['item', this.fists], ['amount', 1]];
		vm.itemDictionary['club'] = [['item', this.club], ['amount', 0]];
		vm.itemDictionary['sword'] = [['item', this.sword], ['amount', 0]];
		vm.itemDictionary['bearClaws'] = [['item', this.bearClaws], ['amount', 1]];



		//armor
		this.clothArmor = new this.Item();
		this.clothArmor.name = 'Cloth Armor';
		this.clothArmor.armor = 0;
		this.clothArmor.slug = 'clothArmor';

		this.woodArmor = new this.Item();
		this.woodArmor.name = 'Wood Armor';
		this.woodArmor.desc = 'Hope for no splinters!';
		this.woodArmor.cat = 'armor';
		this.woodArmor.armor = 0.1;
		this.woodArmor.buyable = true;
		this.woodArmor.removeAfterBuy = true;
		this.woodArmor.recipe = ['wood-100'];
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

		this.polarArmor = new this.Item();
		this.polarArmor.name = 'Polarbear Furcoat';
		this.polarArmor.desc = 'Coat made from polerbear fur';
		this.polarArmor.armor = 0.3;
		this.polarArmor.slug = 'polarArmor';

		vm.itemDictionary['woodArmor'] = [['item', this.woodArmor], ['amount', 0]];
		vm.itemDictionary['boneArmor'] = [['item', this.boneArmor], ['amount', 0]];
		vm.itemDictionary['clothArmor'] = [['item', this.clothArmor], ['amount', 1]];
		vm.itemDictionary['polarArmor'] = [['item', this.polarArmor], ['amount', 1]];


		//resources
		this.food = new this.Item();
		this.food.name = 'Food';
		this.food.desc = 'Food for workers';

		this.ore = new this.Item();
		this.ore.name = 'Ore';
		this.ore.desc = 'Metal stuff';

		this.wood  = new this.Item();
		this.wood.desc = 'A slab of wood';
		this.wood.cat = 'ingredient';
		this.wood.name = 'Wood';
		this.wood.slug = 'wood';

		vm.itemDictionary['food'] = [['item', this.food], ['amount', 0]];
		vm.itemDictionary['ore'] = [['item', this.ore], ['amount', 0]];
		vm.itemDictionary['wood']  = [['item', this.wood], ['amount', 0]];


		//consumables
		this.potion = new this.Item();
		this.potion.name = 'Health Potion';
		this.potion.slug = 'potion';
		this.potion.desc = 'Heals ' + this.potion.strength + ' health';
		this.potion.strength = 50;
		this.potion.buyable = true;
		this.potion.price = 100;
		this.potion.quantity = 10;

		vm.itemDictionary['potion'] = [['item', this.potion], ['amount', 10]];

		//other items
		this.winterCoat = new this.Item();
		this.winterCoat.name = 'Winter Sweater';
		this.winterCoat.slug = 'winterCoat';
		this.winterCoat.desc = 'Covered in cute deer and trees~';
		this.winterCoat.message = 'Keeps you warm and cozy so you can visit the snow wastes safely!';
		this.winterCoat.buyable = true;
		this.winterCoat.price = 1000;
		this.winterCoat.removeAfterBuy = true;

		vm.itemDictionary['winterCoat'] = [['item', this.winterCoat], ['amount', 0]];

		////////////////

		vm.otherItems = [vm.itemDictionary['winterCoat']];

		vm.buyableItems = ['potion', 'sword', 'wood', 'boneArmor', 'winterCoat'];

		vm.weapons = [vm.itemDictionary['fists'],
					  vm.itemDictionary['club'], 
					  vm.itemDictionary['sword'],
					  vm.itemDictionary['bearClaws']];


		vm.armor = [vm.itemDictionary['clothArmor'],
					vm.itemDictionary['woodArmor'],
					vm.itemDictionary['boneArmor'],
					vm.itemDictionary['polarArmor']];



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