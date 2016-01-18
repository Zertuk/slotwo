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
		this.sword.buyable = true;
		this.sword.removeAfterBuy = true;
		this.sword.price = 200;
		this.sword.recipe = ['wood-100'];
		this.sword.cat = 'weapon';
		this.sword.damage = 4;
		this.sword.attackSpeed = 2;
		this.sword.slug = 'sword';

		this.decentSword = new this.Item();
		this.decentSword.name = 'Decent Sword';
		this.decentSword.desc = 'It is alright';
		this.decentSword.buyable = true;
		this.decentSword.removeAfterBuy = true;
		this.decentSword.price = 5000;
		this.decentSword.damage = 10;
		this.decentSword.attackSpeed = 2;
		this.decentSword.slug = 'decentSword';

		this.bearClaws = new this.Item();
		this.bearClaws.name = 'Bear Arms';
		this.bearClaws.desc = 'Just like the founding fathers intended';
		this.bearClaws.damage = 3;
		this.bearClaws.attackSpeed = 1;
		this.bearClaws.slug = 'bearClaws';

		this.minotaurHammer = new this.Item();
		this.minotaurHammer.name = 'Minotaur Hammer';
		this.minotaurHammer.desc = 'This thing is a beast';
		this.minotaurHammer.damage = 30;
		this.minotaurHammer.attackSpeed = 4;
		this.minotaurHammer.slug = 'minotaurHammer';

		this.claws = new this.Item();
		this.claws.name = 'Crab Claws';
		this.claws.slug = 'claws';
		this.claws.desc = 'Big, Meaty, Claws!';
		this.claws.damage = 45;
		this.claws.attackSpeed = 4;

		this.giantCarrot = new this.Item();
		this.giantCarrot.name = 'Giant Carrot';
		this.giantCarrot.desc = 'Formerly known as Garys nose';
		this.giantCarrot.damage = 10;
		this.giantCarrot.attackSpeed = 1;
		this.giantCarrot.slug = 'giantCarrot';
		this.giantCarrot.lootOnce = true;

		vm.itemDictionary['fists'] = [['item', this.fists], ['amount', 1]];
		vm.itemDictionary['sword'] = [['item', this.sword], ['amount', 0]];
		vm.itemDictionary['decentSword'] = [['item', this.decentSword], ['amount', 0]];
		vm.itemDictionary['bearClaws'] = [['item', this.bearClaws], ['amount', 0]];
		vm.itemDictionary['minotaurHammer'] = [['item', this.minotaurHammer], ['amount', 0]];
		vm.itemDictionary['claws'] = [['item', this.claws], ['amount', 1]];
		vm.itemDictionary['giantCarrot'] = [['item', this.giantCarrot], ['amount', 0]];



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
		this.woodArmor.armor = 0.15;
		this.woodArmor.buyable = true;
		this.woodArmor.removeAfterBuy = true;
		this.woodArmor.price = 200;
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
		this.polarArmor.name = 'Tuxedo';
		this.polarArmor.desc = 'dapper';
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
		this.ghostArmor.damageMult = 50;
		this.ghostArmor.slug = 'ghostArmor';

		this.potionArmor = new this.Item();
		this.potionArmor.name = 'Potion Armor';
		this.potionArmor.desc = 'Feels like a ghost hug <3';
		this.potionArmor.armor = 0;
		this.potionArmor.healthRate = 20;
		this.potionArmor.slug = 'potionArmor';

		vm.itemDictionary['potionArmor'] = [['item', this.potionArmor], ['amount', 0]];
		vm.itemDictionary['ghostArmor'] = [['item', this.ghostArmor], ['amount', 0]];
		vm.itemDictionary['woodArmor'] = [['item', this.woodArmor], ['amount', 0]];
		vm.itemDictionary['boneArmor'] = [['item', this.boneArmor], ['amount', 0]];
		vm.itemDictionary['healthArmor'] = [['item', this.healthArmor], ['amount', 0]];
		vm.itemDictionary['clothArmor'] = [['item', this.clothArmor], ['amount', 1]];
		vm.itemDictionary['polarArmor'] = [['item', this.polarArmor], ['amount', 0]];


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
		this.potion.quantity = 0;

		vm.itemDictionary['potion'] = [['item', this.potion], ['amount', 0]];

		//other items
		this.trueOffense = new this.Item();
		this.trueOffense.name = 'Offensive Sprit';
		this.trueOffense.slug = 'trueOffense';
		this.trueOffense.desc = 'Elder seal of approval';
		this.trueOffense.message = 'Damage increased by 25%';
		this.trueOffense.damageMult = 25;

		this.trueDefense = new this.Item();
		this.trueDefense.name = 'Defensive Sprit';
		this.trueDefense.slug = 'trueDefense';
		this.trueDefense.desc = 'Elder seal of approval';
		this.trueDefense.message = 'Armor increased by 25%';
		this.trueDefense.defenseMult = 25;

		this.trueHealth = new this.Item();
		this.trueHealth.name = 'Kind Spirit';
		this.trueHealth.slug = 'trueHealth';
		this.trueHealth.desc = 'Elder seal of approval';
		this.trueHealth.message = 'Health increased by 25%';
		this.trueHealth.healthMult = 25;
 
		this.winterCoat = new this.Item();
		this.winterCoat.name = 'Winter Sweater';
		this.winterCoat.slug = 'winterCoat';
		this.winterCoat.desc = 'Covered in cute deer and trees~';
		this.winterCoat.message = 'Keeps you warm and cozy so you can visit the snow wastes safely! +25 Health';
		this.winterCoat.health = 25;
		this.winterCoat.buyable = true;
		this.winterCoat.price = 1000;
		this.winterCoat.removeAfterBuy = true;
		this.winterCoat.special = function() {
			vm.progress.hasSweater = true;
		};

		this.pearl = new this.Item();
		this.pearl.name = 'Shiny Pearl';
		this.pearl.slug = 'pearl';
		this.pearl.desc = '';
		this.pearl.message = 'Holder gains +25 gold a second';
		this.pearl.money = 25;

		this.piggyBank = new this.Item();
		this.piggyBank.name = 'Cat Bank';
		this.piggyBank.slug = 'piggyBank';
		this.piggyBank.desc = 'Like a Piggy Bank, but a Cat instead';
		this.piggyBank.message = 'Holder gains +15 gold a second';
		this.piggyBank.money = 15;
		this.piggyBank.buyable = true;
		this.piggyBank.removeAfterBuy = true;
		this.piggyBank.price = 2500;

		this.wizardsHair = new this.Item();
		this.wizardsHair.name = 'Wizards Hair';
		this.wizardsHair.slug = 'wizardsHair';
		this.wizardsHair.desc = 'Rumored to grant the holder great power.';
		this.wizardsHair.message = '5% increased damage, 5% increased armor, 5% increased health';
		this.wizardsHair.healthMult = 5;
		this.wizardsHair.damageMult = 5;
		this.wizardsHair.defenseMult = 5;
		this.wizardsHair.buyable = true;
		this.wizardsHair.price = 10000;
		this.wizardsHair.removeAfterBuy = true;

		this.deerAntlers = new this.Item();
		this.deerAntlers.name = 'Deer Antlers';
		this.deerAntlers.slug = 'deerAntlers';
		this.deerAntlers.desc = 'The latest in deer fashion';
		this.deerAntlers.message = 'Attacks deal +1 damage.';
		this.deerAntlers.lootOnce = true;
		this.deerAntlers.damage = 1;

		this.snowmanHat = new this.Item();
		this.snowmanHat.name = 'Snowmans Hat';
		this.snowmanHat.slug = 'snowmanHat';
		this.snowmanHat.desc = 'No one will ever wear it as good as the snowman...';
		this.snowmanHat.message = 'Attacks deal +5 damage';
		this.snowmanHat.lootOnce = true;
		this.snowmanHat.damage = 5;

		this.sleepingBag = new this.Item();
		this.sleepingBag.name = 'Deluxe Sleeping Bag';
		this.sleepingBag.slug = 'sleepingBag';
		this.sleepingBag.desc = 'Deluxe model is 23% cozier';
		this.sleepingBag.message = 'Allows you to sleep outside and rest anywhere';
		this.sleepingBag.buyable = true;
		this.sleepingBag.price = 2000;
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
		this.pocketSand.message = '1% chance to evade damage.';
		this.pocketSand.lootOnce = true;
		this.pocketSand.evade = 1;

		this.mantisClaw = new this.Item();
		this.mantisClaw.name = 'Mantis Claw';
		this.mantisClaw.slug = 'mantisClaw';
		this.mantisClaw.desc = 'Scythe like';
		this.mantisClaw.message = 'Attacks deal +5 damage';
		this.mantisClaw.lootOnce = true;
		this.mantisClaw.damage = 5;

		this.bugExoskeleton = new this.Item();
		this.bugExoskeleton.name = 'Stick Bug Exoskeleton';
		this.bugExoskeleton.slug = 'bugExoskeleton';
		this.bugExoskeleton.desc = 'Not sure how this helps';
		this.bugExoskeleton.message = 'Armor increased by 5%';
		this.bugExoskeleton.lootOnce = true;
		this.bugExoskeleton.armor = 5;

		this.bigHeavyWood = new this.Item();
		this.bigHeavyWood.name = 'Log';
		this.bigHeavyWood.slug = 'bigHeavyWood';
		this.bigHeavyWood.desc = 'Its big, its heavy, its wood!';
		this.bigHeavyWood.message = '+25 health';
		this.bigHeavyWood.lootOnce = true;
		this.bigHeavyWood.health = 25;

		this.pie = new this.Item();
		this.pie.name = 'Memories of pie';
		this.pie.slug = 'pie';
		this.pie.desc = 'Remembering the pie, it fills you with determination.';
		this.pie.message = '+50 health';
		this.pie.health = 50;

		this.unicornHorn = new this.Item();
		this.unicornHorn.name = 'Unicorn Horn';
		this.unicornHorn.slug = 'unicornHorn';
		this.unicornHorn.desc = '';
		this.unicornHorn.message = '';
		this.unicornHorn.health = '';

		this.snowmenBlessing = new this.Item();
		this.snowmenBlessing.name = 'Snowmens Blessing';
		this.snowmenBlessing.slug = 'snowmenBlessing';
		this.snowmenBlessing.desc = 'RIP Gary & Friends';
		this.snowmenBlessing.message = 'Increases health by 50 and gives +10 gold a second.';
		this.snowmenBlessing.health = 50;
		this.snowmenBlessing.money = 10;

		this.abomItem = new this.Item();
		this.abomItem.name = 'Lucky Yeti Boots';
		this.abomItem.slug = 'abomItem';
		this.abomItem.desc = 'A little too big';
		this.abomItem.message = '+50 health and wearer gains +20 gold a second.';
		this.abomItem.health = 50;
		this.abomItem.money = 20;

		this.mammothFur = new this.Item();
		this.mammothFur.name = 'Mammoth Fur Scarf';
		this.mammothFur.slug = 'mammothFur';
		this.mammothFur.desc = 'Kind of itchy..';
		this.mammothFur.message = 'Health increased by 2%';
		this.mammothFur.healthMult = 2;

		this.frozenBanana = new this.Item();
		this.frozenBanana.name = 'Frozen Banana';
		this.frozenBanana.slug = 'frozenBanana';
		this.frozenBanana.desc = 'Maybe it will melt someday';
		this.frozenBanana.message = 'Damage increased by 2%';
		this.frozenBanana.damageMult = 2;

		this.kingCrown = new this.Item();
		this.kingCrown.name = 'Crown of the King';
		this.kingCrown.slug = 'kingCrown';
		this.kingCrown.desc = '';
		this.kingCrown.message = '+50 health and armor increased by 5%';
		this.kingCrown.health = 50;
		this.kingCrown.defenseMult = 5;

		this.vampireTeeth = new this.Item();
		this.vampireTeeth.name = 'Vampire Teeth';
		this.vampireTeeth.slug = 'vampireTeeth';
		this.vampireTeeth.desc = 'Made from plastic?';
		this.vampireTeeth.message = 'Attacks deal +5 damage';
		this.vampireTeeth.damage = 5;

		vm.itemDictionary['vampireTeeth'] = [['item', this.vampireTeeth], ['amount', 0]];
		vm.itemDictionary['kingCrown'] = [['item', this.kingCrown], ['amount', 0]];
		vm.itemDictionary['frozenBanana'] = [['item', this.frozenBanana], ['amount', 0]];
		vm.itemDictionary['mammothFur'] = [['item', this.mammothFur], ['amount', 0]];
		vm.itemDictionary['abomItem'] = [['item', this.abomItem], ['amount', 0]];
		vm.itemDictionary['snowmenBlessing'] = [['item', this.snowmenBlessing], ['amount', 0]];
		vm.itemDictionary['piggyBank'] = [['item', this.piggyBank], ['amount', 0]];
		vm.itemDictionary['pie'] = [['item', this.pie], ['amount', 0]];
		vm.itemDictionary['trueOffense'] = [['item', this.trueOffense], ['amount', 0]];
		vm.itemDictionary['trueDefense'] = [['item', this.trueDefense], ['amount', 0]];
		vm.itemDictionary['trueHealth'] = [['item', this.trueHealth], ['amount', 0]];
		vm.itemDictionary['bigHeavyWood'] = [['item', this.bigHeavyWood], ['amount', 0]];
		vm.itemDictionary['bugExoskeleton'] = [['item', this.bugExoskeleton], ['amount', 0]];
		vm.itemDictionary['mantisClaw'] = [['item', this.mantisClaw], ['amount', 0]];
		vm.itemDictionary['pocketSand'] = [['item', this.pocketSand], ['amount', 0]];
		vm.itemDictionary['gorillaFoot'] = [['item', this.gorillaFoot], ['amount', 0]];
		vm.itemDictionary['pearl'] = [['item', this.pearl], ['amount, 0']];
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
		this.compendium.name = 'Beast Compendium';
		this.compendium.desc = 'Basically a scrapbook';
		this.compendium.message = 'Keeps track of enemies you encounter.';
		this.compendium.slug = 'compendium';
		this.compendium.buyable = true;
		this.compendium.price = 500;
		this.compendium.removeAfterBuy = true;

		vm.itemDictionary['campfire'] = [['item', this.campfire], ['amount', 0]];
		vm.itemDictionary['forge'] = [['item', this.forge], ['amount', 0]];
		vm.itemDictionary['compendium'] = [['item', this.compendium], ['amount', 1]];


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
						 vm.itemDictionary['vampireTeeth'],
						 vm.itemDictionary['kingCrown'],
						 vm.itemDictionary['pearl'],
						 vm.itemDictionary['pocketSand'],
						 vm.itemDictionary['bugExoskeleton'],
						 vm.itemDictionary['mantisClaw'],
						 vm.itemDictionary['bigHeavyWood'],
						 vm.itemDictionary['pie'],
						 vm.itemDictionary['piggyBank'],
						 vm.itemDictionary['snowmenBlessing'],
						 vm.itemDictionary['abomItem'],
						 vm.itemDictionary['mammothFur'],
						 vm.itemDictionary['frozenBanana'],
						 vm.itemDictionary['compendium']];

		vm.buyableItems = ['potion', 
						   'sword', 
						   'woodArmor',
						   'decentSword', 
						   'winterCoat', 
						   'wizardsHair', 
						   'compendium',
						   'piggyBank',
						   'sleepingBag'];

		vm.weapons = [vm.itemDictionary['fists'],
					  vm.itemDictionary['sword'],
					  vm.itemDictionary['bearClaws'],
					  vm.itemDictionary['decentSword'],
					  vm.itemDictionary['minotaurHammer'],
					  vm.itemDictionary['claws'],
					  vm.itemDictionary['giantCarrot']];


		vm.armor = [vm.itemDictionary['clothArmor'],
					vm.itemDictionary['woodArmor'],
					vm.itemDictionary['boneArmor'],
					vm.itemDictionary['healthArmor'],
					vm.itemDictionary['ghostArmor'],
					vm.itemDictionary['potionArmor'],
					vm.itemDictionary['polarArmor']];



		vm.findVal = function() {
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

		vm.findVal();
    }
})();