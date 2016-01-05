(function() {
    'use strict';

    angular
        .module('app.inventory')
        .service('inventoryService', inventoryService);

    inventoryService.$inject = ['progressService'];

    /* @ngInject */
    function inventoryService(progressService) {
    	var vm = this;
    	vm.progress = progressService.progress;
		vm.itemDictionary = [];

		this.Item = function() {
			this.buyable = false,
			this.removeAfterBuy = false,
			this.craftTime = 5000,
			this.recipe  = undefined,
			this.quantity = 0,
			this.cat = 'default',
			this.spawn = undefined,
			this.name = 'Default',
			this.slug = function() {
				var slug = this.name.toLowerCase();
				return slug;
			},
			this.attackSpeedMessage = function() {
				var message = '';
				if (this.attackSpeed === 2) {
					message = 'Average Speed';
				}
				else if (this.attackSpeed > 2) {
					message = 'Slow Speed';

				} else if (this.attackSpeed < 2) {
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

		this.sword = new this.Item();
		this.sword.name = 'Wooden Sword';
		this.sword.desc = 'Sourced from 100% Organic Non-GMO Trees';
		this.sword.recipe = ['wood-100'];
		this.sword.cat = 'weapon';
		this.sword.damage = 4;
		this.sword.attackSpeed = 2;
		this.sword.slug = 'sword';

		this.bearClaws = new this.Item();
		this.bearClaws.name = 'Bear Arms';
		this.bearClaws.desc = 'Just like the founding fathers intended';
		this.bearClaws.damage = 3;
		this.bearClaws.attackSpeed = 1;
		this.bearClaws.slug = 'bearClaws';

		this.minotaurHammer = new this.Item();
		this.minotaurHammer.name = 'Minotaur Hammer';
		this.minotaurHammer.desc = 'This thing is a beast';
		this.minotaurHammer.damage = 20;
		this.minotaurHammer.attackSpeed = 5;
		this.minotaurHammer.slug = 'minotaurHammer';

		this.giantCarrot = new this.Item();
		this.giantCarrot.name = 'Giant Carrot';
		this.giantCarrot.desc = 'Formerly known as Garys nose';
		this.giantCarrot.damage = 5;
		this.giantCarrot.attackSpeed = 1;
		this.giantCarrot.slug = 'giantCarrot';
		this.giantCarrot.lootOnce = true;

		vm.itemDictionary['fists'] = [['item', this.fists], ['amount', 1]];
		vm.itemDictionary['sword'] = [['item', this.sword], ['amount', 1]];
		vm.itemDictionary['bearClaws'] = [['item', this.bearClaws], ['amount', 0]];
		vm.itemDictionary['minotaurHammer'] = [['item', this.minotaurHammer], ['amount', 1]];
		vm.itemDictionary['giantCarrot'] = [['item', this.giantCarrot], ['amount', 1]];



		//armor
		this.clothArmor = new this.Item();
		this.clothArmor.name = 'Cloth Armor';
		this.clothArmor.desc = 'Better than nothing?';
		this.clothArmor.armor = 0;
		this.clothArmor.slug = 'clothArmor';
		this.clothArmor.damageMult = 1;

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

		this.healthArmor = new this.Item();
		this.healthArmor.name = 'health armor';
		this.healthArmor.desc = 'health armor';
		this.healthArmor.armor = 0;
		this.healthArmor.healthMult = 2;
		this.healthArmor.slug = 'healthArmor';

		this.ghostArmor = new this.Item();
		this.ghostArmor.name = 'Spooky Aura';
		this.ghostArmor.desc = 'Feels like a ghost hug <3';
		this.ghostArmor.armor = 0;
		this.ghostArmor.damageMult = 2;
		this.ghostArmor.slug = 'ghostArmor';



		vm.itemDictionary['ghostArmor'] = [['item', this.ghostArmor], ['amount', 1]];
		vm.itemDictionary['woodArmor'] = [['item', this.woodArmor], ['amount', 1]];
		vm.itemDictionary['boneArmor'] = [['item', this.boneArmor], ['amount', 0]];
		vm.itemDictionary['healthArmor'] = [['item', this.healthArmor], ['amount', 1]];
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
		this.potion.buyable = true;
		this.potion.price = 100;
		this.potion.quantity = 10;

		vm.itemDictionary['potion'] = [['item', this.potion], ['amount', 10]];

		//other items
		this.trueOffense = new this.Item();
		this.trueOffense.name = 'True Offense';
		this.trueOffense.slug = 'trueOffense';
		this.trueOffense.desc = 'desc';
		this.trueOffense.message = 'Damage increased by 25%';
		this.trueOffense.damageMult = 25;

		this.trueDefense = new this.Item();
		this.trueDefense.name = 'True Defense';
		this.trueDefense.slug = 'trueDefense';
		this.trueDefense.desc = 'desc';
		this.trueDefense.message = 'Armor increased by 25%';
		this.trueDefense.armorMult = 25;

		this.trueHealth = new this.Item();
		this.trueHealth.name = 'True Health';
		this.trueHealth.slug = 'trueHealth';
		this.trueHealth.desc = 'desc';
		this.trueHealth.message = 'Health increased by 25%';
		this.trueHealth.healthMult = 25;
 
		this.winterCoat = new this.Item();
		this.winterCoat.name = 'Winter Sweater';
		this.winterCoat.slug = 'winterCoat';
		this.winterCoat.desc = 'Covered in cute deer and trees~';
		this.winterCoat.message = 'Keeps you warm and cozy so you can visit the snow wastes safely!';
		this.winterCoat.buyable = true;
		this.winterCoat.price = 1000;
		this.winterCoat.removeAfterBuy = true;
		this.winterCoat.special = function() {
			vm.progress.hasSweater = true;
		};

		this.wizardsHair = new this.Item();
		this.wizardsHair.name = 'Wizards Hair';
		this.wizardsHair.slug = 'wizardsHair';
		this.wizardsHair.desc = 'Rumored to grant the holder great luck.';
		this.wizardsHair.message = 'A lock of bushy Wizard hair.';
		this.wizardsHair.buyable = true;
		this.wizardsHair.price = 1000;
		this.wizardsHair.removeAfterBuy = true;

		this.deerAntlers = new this.Item();
		this.deerAntlers.name = 'Deer Antlers';
		this.deerAntlers.slug = 'deerAntlers';
		this.deerAntlers.desc = 'The latest in deer fashion';
		this.deerAntlers.message = 'Attacks cause +1 damage.';
		this.deerAntlers.lootOnce = true;
		this.deerAntlers.damage = 1;

		this.snowmanHat = new this.Item();
		this.snowmanHat.name = 'Snowmans Hat';
		this.snowmanHat.slug = 'snowmanHat';
		this.snowmanHat.desc = 'No one will ever wear it as good as the snowman...';
		this.snowmanHat.message = 'Attacks cause +5 damage';
		this.snowmanHat.lootOnce = true;
		this.snowmanHat.damage = 5;

		this.sleepingBag = new this.Item();
		this.sleepingBag.name = 'Deluxe Sleeping Bag';
		this.sleepingBag.slug = 'sleepingBag';
		this.sleepingBag.desc = 'Deluxe model is 23% cozier';
		this.sleepingBag.message = 'Allows you to sleep outside and rest anywhere';
		this.sleepingBag.buyable = true;
		this.sleepingBag.price = 200;
		this.sleepingBag.removeAfterBuy = true;
		this.sleepingBag.special = function() {
			vm.progress.hasSleepingBag = true;
		};

		this.gorillaFoot = new this.Item();
		this.gorillaFoot.name = 'Lucky Gorilla Foot';
		this.gorillaFoot.slug = 'gorillaFoot';
		this.gorillaFoot.desc = 'Luckiest of all animal feet';
		this.gorillaFoot.message = 'Holder gains +5 gold a second';
		this.gorillaFoot.lootOnce = true;
		this.gorillaFoot.money = 5;

		this.pocketSand = new this.Item();
		this.pocketSand.name = 'Pocket Sand';
		this.pocketSand.slug = 'pocketSand';
		this.pocketSand.desc = 'Wingo! Pocket sand!';
		this.pocketSand.message = '5% chance to evade damage.';
		this.pocketSand.lootOnce = true;
		this.pocketSand.evade = 5;

		this.mantisClaw = new this.Item();
		this.mantisClaw.name = 'Mantis Claw';
		this.mantisClaw.slug = 'mantisClaw';
		this.mantisClaw.desc = 'desc';
		this.mantisClaw.message = '+5 attack ';
		this.mantisClaw.lootOnce = true;
		this.mantisClaw.damage = 5;

		this.bugExoskeleton = new this.Item();
		this.bugExoskeleton.name = 'Stick Bug Exoskeleton';
		this.bugExoskeleton.slug = 'bugExoskeleton';
		this.bugExoskeleton.desc = 'desc';
		this.bugExoskeleton.message = '+5 attack';
		this.bugExoskeleton.lootOnce = true;
		this.bugExoskeleton.damage = 5;

		this.bigHeavyWood = new this.Item();
		this.bigHeavyWood.name = 'Log';
		this.bigHeavyWood.slug = 'bigHeavyWood';
		this.bigHeavyWood.desc = 'Its big, its heavy, its wood!';
		this.bigHeavyWood.message = '+25 health';
		this.bigHeavyWood.lootOnce = true;
		this.bigHeavyWood.health = 25;


		vm.itemDictionary['trueOffense'] = [['item', this.trueOffense], ['amount', 1]];
		vm.itemDictionary['trueDefense'] = [['item', this.trueDefense], ['amount', 1]];
		vm.itemDictionary['trueHealth'] = [['item', this.trueHealth], ['amount', 1]];
		vm.itemDictionary['bigHeavyWood'] = [['item', this.bigHeavyWood], ['amount', 0]];
		vm.itemDictionary['bugExoskeleton'] = [['item', this.bugExoskeleton], ['amount', 1]];
		vm.itemDictionary['mantisClaw'] = [['item', this.mantisClaw], ['amount', 1]];
		vm.itemDictionary['pocketSand'] = [['item', this.pocketSand], ['amount', 1]]
		vm.itemDictionary['gorillaFoot'] = [['item', this.gorillaFoot], ['amount', 0]];
		vm.itemDictionary['sleepingBag'] = [['item', this.sleepingBag], ['amount', 0]];
		vm.itemDictionary['snowmanHat'] = [['item', this.snowmanHat], ['amount', 0]];
		vm.itemDictionary['deerAntlers'] = [['item', this.deerAntlers], ['amount', 0]];
		vm.itemDictionary['winterCoat'] = [['item', this.winterCoat], ['amount', 0]];
		vm.itemDictionary['wizardsHair'] = [['item', this.wizardsHair], ['amount', 0]];


		//misc
		this.forge = new this.Item();
		this.forge.name = 'Forge';
		this.forge.slug = 'forge';
		this.forge.recipe = ['wood-50', 'ore-250'];

		this.campfire = new this.Item();
		this.campfire.name = 'Campfire';
		this.campfire.slug = 'campfire';
		this.campfire.recipe = ['wood-10'];

		this.compendium = new this.Item();
		this.compendium.name = 'Beast compendium';
		this.compendium.slug = 'compendium';
		this.compendium.buyable = true;
		this.compendium.price = 1000;
		this.compendium.removeAfterBuy = true;

		vm.itemDictionary['campfire'] = [['item', this.campfire], ['amount', 0]];
		vm.itemDictionary['forge'] = [['item', this.forge], ['amount', 0]];
		vm.itemDictionary['compendium'] = [['item', this.compendium], ['amount', 0]];


		////////////////

		vm.otherItems = [vm.itemDictionary['trueHealth'],
						 vm.itemDictionary['trueOffense'],
						 vm.itemDictionary['trueDefense'],
						 vm.itemDictionary['winterCoat'],
						 vm.itemDictionary['deerAntlers'],
						 vm.itemDictionary['wizardsHair'],
						 vm.itemDictionary['snowmanHat'],
						 vm.itemDictionary['sleepingBag'],
						 vm.itemDictionary['gorillaFoot'],
						 vm.itemDictionary['pocketSand'],
						 vm.itemDictionary['bugExoskeleton'],
						 vm.itemDictionary['mantisClaw'],
						 vm.itemDictionary['bigHeavyWood']];

		vm.buyableItems = ['potion', 
						   'sword', 
						   'wood', 
						   'boneArmor', 
						   'winterCoat', 
						   'wizardsHair', 
						   'compendium',
						   'sleepingBag'];

		vm.weapons = [vm.itemDictionary['fists'],
					  vm.itemDictionary['sword'],
					  vm.itemDictionary['bearClaws'],
					  vm.itemDictionary['minotaurHammer'],
					  vm.itemDictionary['giantCarrot']];


		vm.armor = [vm.itemDictionary['clothArmor'],
					vm.itemDictionary['woodArmor'],
					vm.itemDictionary['boneArmor'],
					vm.itemDictionary['polarArmor'],
					vm.itemDictionary['healthArmor'],
					vm.itemDictionary['ghostArmor']];



		function findVal() {
			var keys = ['damage', 'health', 'evade', 'money', 'defense', 'defenseMult', 'damageMult', 'healthMult'];
			vm.stats = {
				damage: 0,
				health: 0,
				evade: 0,
				money: 0,
				defense: 0,
				defenseMult: 0,
				damageMult: 0,
				healthMult: 0
			}
			addVal(keys, vm.stats);
		}

		function addVal(keys, stats) {
			for (var i = 0; i < vm.otherItems.length; i++) {
				if (vm.otherItems[i][1][1] > 0) {
					for (var k = 0; k < keys.length; k++) {
						if (typeof vm.otherItems[i][0][1][keys[k]] !== 'undefined') {
							stats[keys[k]] = stats[keys[k]] + vm.otherItems[i][0][1][keys[k]];
						}
					}
				}
			}
		}

		findVal();
    }
})();