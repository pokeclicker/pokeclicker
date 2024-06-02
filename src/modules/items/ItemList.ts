/* eslint-disable no-multi-spaces */
import BerryType from '../enums/BerryType';
import KeyItemType from '../enums/KeyItemType';
import MulchType from '../enums/MulchType';
import OakItemType from '../enums/OakItemType';
import BattleItem from './BattleItem';
import BerryItem from './BerryItem';
import BuyKeyItem from './buyKeyItem';
import BuyOakItem from './buyOakItem';
import FluteItem from './FluteItem';
import EnergyRestore from './EnergyRestore';
import Item from './Item';
import MulchItem from './MulchItem';
import PokeballItem from './PokeballItem';
import {
    BattleItemType, Currency, EggItemType, EnergyRestoreSize, MegaStoneType, Pokeball, PokeBlockColor, Region, VitaminType, ConsumableType, FluteItemType, AchievementOption,
} from '../GameConstants';
import { ShovelItem, MulchShovelItem } from './ShovelItem';
import PokeBlock from './PokeBlock';
import MegaStoneItem from './MegaStoneItem';
import Vitamin from './Vitamin';
import EggItem from './EggItem';
import PokemonItem from './PokemonItem';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import SpecialEventRequirement from '../requirements/SpecialEventRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import QuestItem from './QuestItem';
import ChristmasPresent from './ChristmasPresent';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import TreasureItem from './TreasureItem';
import { pokemonMap } from '../pokemons/PokemonList';
import AttackGainConsumable from './AttackGainConsumable';
// eslint-disable-next-line import/prefer-default-export
export const ItemList: { [name: string]: Item } = {};

ItemList.xAttack         = new BattleItem(BattleItemType.xAttack, '+50% Bonus to Pokémon attack for 30 seconds', 600, undefined, 'X Attack', 'pokemonAttack', 1.5);
ItemList.xClick          = new BattleItem(BattleItemType.xClick, '+50% Bonus to click attack for 30 seconds', 400, undefined, 'X Click', 'clickAttack', 1.5);
ItemList.Lucky_egg       = new BattleItem(BattleItemType.Lucky_egg, '+50% Bonus to experience gained for 30 seconds', 800, undefined, 'Lucky Egg', 'exp', 1.5);
ItemList.Token_collector = new BattleItem(BattleItemType.Token_collector, '+50% Bonus to Dungeon Tokens gained for 30 seconds', 1000, undefined, 'Token Collector', 'dungeonToken', 1.5);
ItemList.Dowsing_machine = new BattleItem(BattleItemType.Dowsing_machine, 'Increases chance for Pokémon to drop rare hold items; chance to multiply loot from dungeon chests, for 30 seconds.', 1500, undefined, 'Dowsing Machine');
ItemList.Lucky_incense   = new BattleItem(BattleItemType.Lucky_incense, '+50% Bonus to Pokédollars gained for 30 seconds', 2000, undefined, 'Lucky Incense', 'money', 1.5);

ItemList.ChopleBerry     = new BerryItem(BerryType.Chople, 10000, Currency.farmPoint, BerryType.Spelon);
ItemList.KebiaBerry      = new BerryItem(BerryType.Kebia, 10000, Currency.farmPoint, BerryType.Pamtre);
ItemList.ShucaBerry      = new BerryItem(BerryType.Shuca, 10000, Currency.farmPoint, BerryType.Watmel);
ItemList.ChartiBerry     = new BerryItem(BerryType.Charti, 10000, Currency.farmPoint, BerryType.Cornn);

ItemList.SmallRestore    = new EnergyRestore(EnergyRestoreSize.SmallRestore, 30000, undefined, 'Small Restore');
ItemList.MediumRestore   = new EnergyRestore(EnergyRestoreSize.MediumRestore, 100000, undefined, 'Medium Restore');
ItemList.LargeRestore    = new EnergyRestore(EnergyRestoreSize.LargeRestore, 400000, undefined, 'Large Restore');

ItemList.Dungeon_ticket = new BuyKeyItem(KeyItemType.Dungeon_ticket, 100, undefined, undefined, 'Dungeon Ticket');
ItemList.Explorer_kit = new BuyKeyItem(KeyItemType.Explorer_kit, 5000, undefined, undefined, 'Explorer Kit');
ItemList.Event_calendar = new BuyKeyItem(KeyItemType.Event_calendar, 100000, undefined, undefined, 'Event Calendar');

ItemList.Squirtbottle = new BuyOakItem(OakItemType.Squirtbottle, 5000, Currency.farmPoint);
ItemList.Sprinklotad = new BuyOakItem(OakItemType.Sprinklotad, 10000, Currency.farmPoint);
ItemList.Explosive_Charge = new BuyOakItem(OakItemType.Explosive_Charge, 5000, Currency.questPoint);
ItemList.Treasure_Scanner = new BuyOakItem(OakItemType.Treasure_Scanner, 10000, Currency.questPoint);

ItemList.Yellow_Flute = new FluteItem(FluteItemType.Yellow_Flute, 'Pokémon Attack', ['Grass', 'Flying', 'Electric'], 'pokemonAttack', 1.02);
ItemList.Black_Flute  = new FluteItem(FluteItemType.Black_Flute, 'Click Attack', ['Dark', 'Psychic', 'Fighting'], 'clickAttack', 1.02);
ItemList.Time_Flute   = new FluteItem(FluteItemType.Time_Flute, 'Gym and Dungeon Timers', ['Ground', 'Poison', 'Steel'], undefined, 1.02);
ItemList.Red_Flute    = new FluteItem(FluteItemType.Red_Flute, 'Egg Steps', ['Fire', 'Rock', 'Dragon'], 'eggStep', 1.02);
ItemList.White_Flute  = new FluteItem(FluteItemType.White_Flute, 'Shiny Chance', ['Normal', 'Fairy', 'Ice'], 'shiny', 1.02);
ItemList.Blue_Flute   = new FluteItem(FluteItemType.Blue_Flute, 'EV Yield', ['Water', 'Bug', 'Ghost'], 'ev', 1.02);

ItemList.Boost_Mulch   = new MulchItem(MulchType.Boost_Mulch, 50, 'Boost Mulch', 'Increases Berry growth rate.');
ItemList.Rich_Mulch  = new MulchItem(MulchType.Rich_Mulch, 100, 'Rich Mulch', 'Increases Berry harvest rate and replant chances.');
ItemList.Surprise_Mulch  = new MulchItem(MulchType.Surprise_Mulch, 150, 'Surprise Mulch', 'Increases Berry mutation rate.');
ItemList.Amaze_Mulch = new MulchItem(MulchType.Amaze_Mulch, 200, 'Amaze Mulch', 'A weaker combination of Boost, Rich and Surprise mulch.');
ItemList.Freeze_Mulch = new MulchItem(MulchType.Freeze_Mulch, 350, 'Freeze Mulch', 'Stops Berry growth and auras. Mutations will still occur while berries are frozen.');
ItemList.Gooey_Mulch = new MulchItem(MulchType.Gooey_Mulch, 100, 'Gooey Mulch', 'Helps attract rarer species. Gooed Pokémon are less likely to flee.');

ItemList.Pokeball   = new PokeballItem(Pokeball.Pokeball, 100, undefined, { multiplier: 1 }, 'Poké Ball');
ItemList.Greatball  = new PokeballItem(Pokeball.Greatball, 500, undefined, undefined, 'Great Ball');
ItemList.Ultraball  = new PokeballItem(Pokeball.Ultraball, 2000, undefined, undefined, 'Ultra Ball');
ItemList.Masterball = new PokeballItem(Pokeball.Masterball, 2500, Currency.questPoint, undefined, 'Master Ball');
// Not sold in shops
ItemList.Fastball = new PokeballItem(Pokeball.Fastball, Infinity, Currency.farmPoint, undefined, 'Fast Ball');
ItemList.Quickball = new PokeballItem(Pokeball.Quickball, Infinity, Currency.farmPoint, undefined, 'Quick Ball');
ItemList.Timerball = new PokeballItem(Pokeball.Timerball, Infinity, Currency.farmPoint, undefined, 'Timer Ball');
ItemList.Duskball = new PokeballItem(Pokeball.Duskball, Infinity, Currency.farmPoint, undefined, 'Dusk Ball');
ItemList.Luxuryball = new PokeballItem(Pokeball.Luxuryball, Infinity, Currency.farmPoint, undefined, 'Luxury Ball');
ItemList.Diveball = new PokeballItem(Pokeball.Diveball, Infinity, Currency.battlePoint, undefined, 'Dive Ball');
ItemList.Lureball = new PokeballItem(Pokeball.Lureball, Infinity, Currency.battlePoint, undefined, 'Lure Ball');
ItemList.Nestball = new PokeballItem(Pokeball.Nestball, Infinity, Currency.battlePoint, undefined, 'Nest Ball');
ItemList.Repeatball = new PokeballItem(Pokeball.Repeatball, Infinity, Currency.battlePoint, undefined, 'Repeat Ball');
ItemList.Beastball = new PokeballItem(Pokeball.Beastball, 500, Currency.questPoint, undefined, 'Beast Ball');
ItemList.Moonball = new PokeballItem(Pokeball.Moonball, Infinity, Currency.farmPoint, undefined, 'Moon Ball');

ItemList.Berry_Shovel   = new ShovelItem(300, 'Berry Shovel', 'Removes Berry Plants in the Farm.');
ItemList.Mulch_Shovel = new MulchShovelItem(300, 'Mulch Shovel', 'Removes Mulch from a plot in the Farm.');

ItemList.PokeBlock_Black  = new PokeBlock(PokeBlockColor.Black, Infinity);
ItemList.PokeBlock_Red    = new PokeBlock(PokeBlockColor.Red, Infinity);
ItemList.PokeBlock_Blue = new PokeBlock(PokeBlockColor.Blue, Infinity);
ItemList.PokeBlock_Pink = new PokeBlock(PokeBlockColor.Pink, Infinity);
ItemList.PokeBlock_Green = new PokeBlock(PokeBlockColor.Green, Infinity);
ItemList.PokeBlock_Yellow = new PokeBlock(PokeBlockColor.Yellow, Infinity);
ItemList.PokeBlock_Gold   = new PokeBlock(PokeBlockColor.Gold, Infinity);
ItemList.PokeBlock_Purple = new PokeBlock(PokeBlockColor.Purple, Infinity);
ItemList.PokeBlock_Indigo = new PokeBlock(PokeBlockColor.Indigo, Infinity);
ItemList.PokeBlock_Brown = new PokeBlock(PokeBlockColor.Brown, Infinity);
ItemList.PokeBlock_Light_Blue = new PokeBlock(PokeBlockColor.Light_Blue, Infinity);
ItemList.PokeBlock_Olive = new PokeBlock(PokeBlockColor.Olive, Infinity);
ItemList.PokeBlock_Beige = new PokeBlock(PokeBlockColor.Beige, Infinity);
ItemList.PokeBlock_Gray   = new PokeBlock(PokeBlockColor.Gray, Infinity);
ItemList.PokeBlock_White  = new PokeBlock(PokeBlockColor.White, Infinity);

// Mega Stones
ItemList.Abomasite          = new MegaStoneItem(MegaStoneType.Abomasite, 'Abomasnow', 10000);
ItemList.Absolite           = new MegaStoneItem(MegaStoneType.Absolite, 'Absol', 10000);
ItemList.Aerodactylite      = new MegaStoneItem(MegaStoneType.Aerodactylite, 'Aerodactyl', 10000);
ItemList.Aggronite          = new MegaStoneItem(MegaStoneType.Aggronite, 'Aggron', 10000);
ItemList.Alakazite          = new MegaStoneItem(MegaStoneType.Alakazite, 'Alakazam', 10000);
//ItemList.Altarianite        = new MegaStoneItem(MegaStoneType.Altarianite, 'Altaria', 10000);
ItemList.Ampharosite        = new MegaStoneItem(MegaStoneType.Ampharosite, 'Ampharos', 10000);
ItemList.Audinite           = new MegaStoneItem(MegaStoneType.Audinite, 'Audino', 10000);
ItemList.Banettite          = new MegaStoneItem(MegaStoneType.Banettite, 'Banette', 10000);
ItemList.Beedrillite        = new MegaStoneItem(MegaStoneType.Beedrillite, 'Beedrill', 10000);
ItemList.Blastoisinite      = new MegaStoneItem(MegaStoneType.Blastoisinite, 'Blastoise', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Blastoise') }, 'Blastoisinite', 'A Mega Stone for Blastoise.');
ItemList.Blazikenite        = new MegaStoneItem(MegaStoneType.Blazikenite, 'Blaziken', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Blaziken') }, 'Blazikenite', 'A Mega Stone for Blaziken.');
ItemList.Blue_Orb           = new MegaStoneItem(MegaStoneType.Blue_Orb, 'Kyogre', 10000);
ItemList.Cameruptite        = new MegaStoneItem(MegaStoneType.Cameruptite, 'Camerupt', 10000);
ItemList.Charizardite_X     = new MegaStoneItem(MegaStoneType.Charizardite_X, 'Charizard', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Charizard') }, 'Charizardite X', 'A Mega Stone for Charizard.');
ItemList.Charizardite_Y     = new MegaStoneItem(MegaStoneType.Charizardite_Y, 'Charizard', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Charizard') }, 'Charizardite Y', 'A Mega Stone for Charizard.');
ItemList.Diancite           = new MegaStoneItem(MegaStoneType.Diancite, 'Diancie', 10000);
ItemList.Galladite          = new MegaStoneItem(MegaStoneType.Galladite, 'Gallade', 10000);
ItemList.Garchompite        = new MegaStoneItem(MegaStoneType.Garchompite, 'Garchomp', 10000);
ItemList.Gardevoirite       = new MegaStoneItem(MegaStoneType.Gardevoirite, 'Gardevoir', 10000);
ItemList.Gengarite          = new MegaStoneItem(MegaStoneType.Gengarite, 'Gengar', 10000);
ItemList.Glalitite          = new MegaStoneItem(MegaStoneType.Glalitite, 'Glalie', 10000);
ItemList.Gyaradosite        = new MegaStoneItem(MegaStoneType.Gyaradosite, 'Gyarados', 10000);
ItemList.Heracronite        = new MegaStoneItem(MegaStoneType.Heracronite, 'Heracross', 10000);
ItemList.Houndoominite      = new MegaStoneItem(MegaStoneType.Houndoominite, 'Houndoom', 10000);
ItemList.Kangaskhanite      = new MegaStoneItem(MegaStoneType.Kangaskhanite, 'Kangaskhan', 10000);
ItemList.Latiasite          = new MegaStoneItem(MegaStoneType.Latiasite, 'Latias', 10000);
ItemList.Latiosite          = new MegaStoneItem(MegaStoneType.Latiosite, 'Latios', 10000);
ItemList.Lopunnite          = new MegaStoneItem(MegaStoneType.Lopunnite, 'Lopunny', 10000);
ItemList.Lucarionite        = new MegaStoneItem(MegaStoneType.Lucarionite, 'Lucario', 10000);
ItemList.Manectite          = new MegaStoneItem(MegaStoneType.Manectite, 'Manectric', 10000);
ItemList.Mawilite           = new MegaStoneItem(MegaStoneType.Mawilite, 'Mawile', 10000);
//ItemList.Medichamite        = new MegaStoneItem(MegaStoneType.Medichamite, 'Medicham', 10000);
ItemList.Metagrossite       = new MegaStoneItem(MegaStoneType.Metagrossite, 'Metagross', 10000);
ItemList.Meteorite          = new MegaStoneItem(MegaStoneType.Meteorite, 'Rayquaza', 10000);
ItemList.Mewtwonite_X       = new MegaStoneItem(MegaStoneType.Mewtwonite_X, 'Mewtwo', 10000);
ItemList.Mewtwonite_Y       = new MegaStoneItem(MegaStoneType.Mewtwonite_Y, 'Mewtwo', 10000);
ItemList.Pidgeotite         = new MegaStoneItem(MegaStoneType.Pidgeotite, 'Pidgeot', 10000);
ItemList.Pinsirite          = new MegaStoneItem(MegaStoneType.Pinsirite, 'Pinsir', 10000);
ItemList.Red_Orb            = new MegaStoneItem(MegaStoneType.Red_Orb, 'Groudon', 10000);
ItemList.Sablenite          = new MegaStoneItem(MegaStoneType.Sablenite, 'Sableye', 10000);
ItemList.Salamencite        = new MegaStoneItem(MegaStoneType.Salamencite, 'Salamence', 10000);
ItemList.Sceptilite         = new MegaStoneItem(MegaStoneType.Sceptilite, 'Sceptile', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Sceptile') }, 'Sceptilite', 'A Mega Stone for Sceptile.');
ItemList.Scizorite          = new MegaStoneItem(MegaStoneType.Scizorite, 'Scizor', 10000);
ItemList.Sharpedonite       = new MegaStoneItem(MegaStoneType.Sharpedonite, 'Sharpedo', 10000);
ItemList.Slowbronite        = new MegaStoneItem(MegaStoneType.Slowbronite, 'Slowbro', 10000);
ItemList.Steelixite         = new MegaStoneItem(MegaStoneType.Steelixite, 'Steelix', 10000);
ItemList.Swampertite        = new MegaStoneItem(MegaStoneType.Swampertite, 'Swampert', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Swampert') }, 'Swampertite', 'A Mega Stone for Swampert.');
ItemList.Tyranitarite       = new MegaStoneItem(MegaStoneType.Tyranitarite, 'Tyranitar', 10000);
ItemList.Venusaurite        = new MegaStoneItem(MegaStoneType.Venusaurite, 'Venusaur', 10000, Currency.questPoint,
    { visible: new ObtainedPokemonRequirement('Venusaur') }, 'Venusaurite', 'A Mega Stone for Venusaur.');

// Eggs
ItemList.Fire_egg = new EggItem(EggItemType.Fire_egg, 1000, undefined, 'Fire Egg');
ItemList.Water_egg = new EggItem(EggItemType.Water_egg, 1000, undefined, 'Water Egg');
ItemList.Grass_egg = new EggItem(EggItemType.Grass_egg, 1000, undefined, 'Grass Egg');
ItemList.Fighting_egg = new EggItem(EggItemType.Fighting_egg, 1000, undefined, 'Fighting Egg');
ItemList.Electric_egg = new EggItem(EggItemType.Electric_egg, 1000, undefined, 'Electric Egg');
ItemList.Dragon_egg = new EggItem(EggItemType.Dragon_egg, 1000, undefined, 'Dragon Egg');
ItemList.Pokemon_egg = new EggItem(EggItemType.Pokemon_egg, 1000, undefined, 'Pokémon Egg');
ItemList.Mystery_egg = new EggItem(EggItemType.Mystery_egg, 700, undefined, 'Mystery Egg');

// Quest Items
ItemList.Meteorite_Bills_Errand = new QuestItem('Meteorite_Bills_Errand', 'Meteorite', 'A Meteorite the Game Corner owner gave you for find his daughter', 'Bill\'s Errand');
ItemList.Tidal_Bell_Lugia = new QuestItem('Tidal_Bell_Lugia', 'Tidal Bell', 'A Bell that can summon the Legendary Pokémon Lugia', 'Whirl Guardian');
ItemList.Clear_Bell_Hooh = new QuestItem('Clear_Bell_Hooh', 'Clear Bell', 'A Bell that can summon the Legendary Pokémon Ho-oh', 'Rainbow Guardian');
ItemList.GS_Ball_Celebi = new QuestItem('GS_Ball_Celebi', 'GS Ball', 'A Strange Pokéball that Professor Ivy gave you', 'Unfinished Business');
ItemList.Eon_Ticket_Latis = new QuestItem('Eon_Ticket_Latis', 'Eon Ticket', 'A limited edition ticket for a cruise to the Southern Island.', 'The Eon Duo');
ItemList.Celios_Errand_Ruby = new QuestItem('Celios_Errand_Ruby', 'Ruby', 'A Ruby found in Ruby Path', 'Celio\'s Errand');
ItemList.Celios_Errand_Sapphire = new QuestItem('Celios_Errand_Sapphire', 'Sapphire', 'A Sapphire you\'ve recovered from Scientist Gideon', 'Celio\'s Errand');
ItemList.Crystalline_Cocoon_Jirachi = new QuestItem('Crystalline_Cocoon_Jirachi', 'Crystalline Cocoon', 'A Purple Crystal that Butler gave you at Mt. Chimney Crater', 'Wish Maker');
ItemList.Meteorite_Shard_Delta = new QuestItem('Meteorite_Shard_Delta', 'Meteorite Shard', 'A Shard of a Meteorite', 'The Delta Episode');
ItemList.Mysterious_Vial_Detective_Pikachu = new QuestItem('Mysterious_Vial_Detective_Pikachu', 'Mysterious Vial', 'An Aipom dropped this while running away, I wonder what it is?', 'Detective Pikachu');
ItemList.Heart_Diamond_Diancie = new QuestItem('Heart_Diamond_Diancie', 'Heart Diamond', 'The energy core of the Diamond domain', 'Princess Diancie');
ItemList.Red_Petal_Mina = new QuestItem('Red_Petal_Mina', 'Red Petal', 'One of the Petals you need for Mina\'s trial given by Captain Kiawe', 'Island Challenge');
ItemList.Orange_Petal_Mina = new QuestItem('Orange_Petal_Mina', 'Orange Petal', 'One of the Petals you need for Mina\'s trial given by Captain Ilima', 'Island Challenge');
ItemList.Yellow_Petal_Mina = new QuestItem('Yellow_Petal_Mina', 'Yellow Petal', 'One of the Petals you need for Mina\'s trial given by Captain Sophocles', 'Island Challenge');
ItemList.Green_Petal_Mina = new QuestItem('Green_Petal_Mina', 'Green Petal', 'One of the Petals you need for Mina\'s trial given by Captain Mallow', 'Island Challenge');
ItemList.Blue_Petal_Mina = new QuestItem('Blue_Petal_Mina', 'Blue Petal', 'One of the Petals you need for Mina\'s trial given by Captain Lana', 'Island Challenge');
ItemList.Purple_Petal_Mina = new QuestItem('Purple_Petal_Mina', 'Purple Petal', 'One of the Petals you need for Mina\'s trial given by Kahuna Nanu', 'Island Challenge');
ItemList.Pink_Petal_Mina = new QuestItem('Pink_Petal_Mina', 'Pink Petal', 'One of the Petals you need for Mina\'s trial given by Captain Mina', 'Island Challenge');
ItemList.Sand_Bag_Magikarp_Jump = new QuestItem('Sand_Bag_Magikarp_Jump', 'Sand Bag', 'One of the materials Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Jump_Counter_Magikarp_Jump = new QuestItem('Jump_Counter_Magikarp_Jump', 'Jump Counter', 'One of the materials Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Timber_Magikarp_Jump = new QuestItem('Timber_Magikarp_Jump', 'Timber', 'One of the materials Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Rock_Cruncher_Magikarp_Jump = new QuestItem('Rock_Cruncher_Magikarp_Jump', 'Rock Cruncher', 'One of the materials Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Power_Generator_Magikarp_Jump = new QuestItem('Power_Generator_Magikarp_Jump', 'Power Generator', 'One of the materials Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Pokeball_Smash_Magikarp_Jump = new QuestItem('Pokeball_Smash_Magikarp_Jump', 'Pokéball Smash', 'One of the materials Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Push_Dwebble_Magikarp_Jump = new QuestItem('Push_Dwebble_Magikarp_Jump', 'Push Dwebble', 'One of the pushing Pokémons Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Push_Boldore_Magikarp_Jump = new QuestItem('Push_Boldore_Magikarp_Jump', 'Push Boldore', 'One of the pushing Pokémons Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Push_Forretress_Magikarp_Jump = new QuestItem('Push_Forretress_Magikarp_Jump', 'Push Forretress', 'One of the pushing Pokémons Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Push_Golem_Magikarp_Jump = new QuestItem('Push_Golem_Magikarp_Jump', 'Push Golem', 'One of the pushing Pokémons Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Push_Steelix_Magikarp_Jump = new QuestItem('Push_Steelix_Magikarp_Jump', 'Push Steelix', 'One of the pushing Pokémons Dr. Splash asked you for his laboratory', 'Dr. Splash\'s Research Project');
ItemList.Prison_Bottle = new QuestItem('Prison_Bottle', 'Prison Bottle', 'A magical bottle used to bind Hoopa', 'Clash of Ages');
ItemList.Great_Twisted_Spoon = new QuestItem('Great_Twisted_Spoon', 'Great Twisted Spoon', 'A larger version of the Twisted Spoon made specifically for Mewtwo', 'An Unrivaled Power');
ItemList.Island_Challenge_Amulet = new QuestItem('Island_Challenge_Amulet', 'Island Challenge Amulet', 'A symbol that denotes your pilgramige on the Island Challenge of Alola. Stronger Trials await you with this in your bag!', 'Island Challenge');
ItemList.Fighting_Memory_Silvally = new QuestItem('Fighting_Memory_Silvally', 'Fighting Memory', 'One of Silvally\'s memories, obtained from Kahuna Hala in Iki Town', 'Typing some Memories');
ItemList.Rock_Memory_Silvally = new QuestItem('Rock_Memory_Silvally', 'Rock Memory', 'One of Silvally\'s memories, obtained from Kahuna Olivia in Konikoni City', 'Typing some Memories');
ItemList.Dark_Memory_Silvally = new QuestItem('Dark_Memory_Silvally', 'Dark Memory', 'One of Silvally\'s memories, obtained from Kahuna Nanu in Malie City', 'Typing some Memories');
ItemList.Fairy_Memory_Silvally = new QuestItem('Fairy_Memory_Silvally', 'Fairy Memory', 'One of Silvally\'s memories, obtained from Captain Mina in Seafolk Village', 'Typing some Memories');
ItemList.Water_Memory_Silvally = new QuestItem('Water_Memory_Silvally', 'Water Memory', 'One of Silvally\'s memories, obtained from Captain Lana in Brooklet Hill', 'Typing some Memories', 'Typing some Memories', 125000000, Currency.dungeonToken);
ItemList.Grass_Memory_Silvally = new QuestItem('Grass_Memory_Silvally', 'Grass Memory', 'One of Silvally\'s memories, obtained from Captain Mallow in Lush Jungle', 'Typing some Memories', 'Typing some Memories', 125000, Currency.questPoint);
ItemList.Fire_Memory_Silvally = new QuestItem('Fire_Memory_Silvally', 'Fire Memory', 'One of Silvally\'s memories, obtained from Captain Kiawe in Wela Volcano Park', 'Typing some Memories', 'Typing some Memories', 75000, Currency.battlePoint);
ItemList.Electric_Memory_Silvally = new QuestItem('Electric_Memory_Silvally', 'Electric Memory', 'One of Silvally\'s memories, obtained from Captain Sophocles in Hokulani Observatory', 'Typing some Memories', 'Typing some Memories', 500000000, Currency.money);
ItemList.Ice_Memory_Silvally = new QuestItem('Ice_Memory_Silvally', 'Ice Memory', 'One of Silvally\'s memories, obtained from Veteran Aristo in Mt. Lanakila', 'Typing some Memories', 'Typing some Memories', 1000, Currency.diamond);
ItemList.Ground_Memory_Silvally = new QuestItem('Ground_Memory_Silvally', 'Ground Memory', 'One of Silvally\'s memories, obtained from Kahuna Hapu on Exeggutor Island Hill', 'Typing some Memories', 'Typing some Memories', 200000, Currency.farmPoint);
ItemList.Bug_Memory_Silvally = new QuestItem('Bug_Memory_Silvally', 'Bug Memory', 'One of Silvally\'s memories, obtained from Guzma in Po Town', 'Typing some Memories');
ItemList.Flying_Memory_Silvally = new QuestItem('Flying_Memory_Silvally', 'Flying Memory', 'One of Silvally\'s memories, obtained from Kahili on Ten Carat Hill', 'Typing some Memories');
ItemList.Poison_Memory_Silvally = new QuestItem('Poison_Memory_Silvally', 'Poison Memory', 'One of Silvally\'s memories, obtained from Plumeria in Vast Poni Canyon', 'Typing some Memories');
ItemList.Ghost_Memory_Silvally = new QuestItem('Ghost_Memory_Silvally', 'Ghost Memory', 'One of Silvally\'s memories, obtained from Captain Acerola in Thrifty Megamart', 'Typing some Memories');
ItemList.Psychic_Memory_Silvally = new QuestItem('Psychic_Memory_Silvally', 'Psychic Memory', 'One of Silvally\'s memories, obtained from Aether Branch Chief Faba in Aether Paradise', 'Typing some Memories');
ItemList.Steel_Memory_Silvally = new QuestItem('Steel_Memory_Silvally', 'Steel Memory', 'One of Silvally\'s memories, obtained from Molayne in Royal Avenue', 'Typing some Memories');
ItemList.Dragon_Memory_Silvally = new QuestItem('Dragon_Memory_Silvally', 'Dragon Memory', 'One of Silvally\'s memories, obtained from Ryuki in A Tree Maybe', 'Typing some Memories');
ItemList.Max_Mushroom_IoA = new QuestItem('Max_Mushroom_IoA', 'Max Mushroom', 'A Mushroom that contains the power of Dynamax forms', 'The Dojo\'s Armor');
ItemList.Shaderoot_Carrot_Calyrex = new QuestItem('Shaderoot_Carrot_Calyrex', 'Shaderoot Carrot', 'Carrot that the King of Bountiful Harvest\'s beloved steed likes to eat. It grew in a gloomy field.', 'The Crown of Galar');
ItemList.Iceroot_Carrot_Calyrex = new QuestItem('Iceroot_Carrot_Calyrex', 'Iceroot Carrot', 'Carrot that the King of Bountiful Harvest\'s beloved steed likes to eat. It grew in a field covered in snow.', 'The Crown of Galar');
ItemList.Wishing_Piece = new QuestItem('Wishing_Piece', 'Wishing Piece', 'Attracts Gigantamax Pokémon to the Max Lair', 'The Lair of Giants');

// Vitamins
ItemList.Protein   = new Vitamin(VitaminType.Protein, 1e4, Currency.money, {
    multiplier: 1.1,
    multiplierDecrease: false,
    saveName: `${VitaminType[VitaminType.Protein]}|${Currency[Currency.money]}`,
}, undefined, 'Increases Pokémon attack bonus.<br/><i>(attack gained per breeding cycle)</i><br/>Increases steps required when hatching by 20');
ItemList.Calcium   = new Vitamin(VitaminType.Calcium, 5e4, Currency.money, {
    multiplier: 1.1,
    multiplierDecrease: false,
    saveName: `${VitaminType[VitaminType.Calcium]}|${Currency[Currency.money]}`,
    visible: new MaxRegionRequirement(Region.hoenn),
}, undefined, 'Increases Pokémon attack bonus %.<br/><i>(attack gained per breeding cycle)</i><br/>Increases steps required when hatching by 20');
ItemList.Carbos   = new Vitamin(VitaminType.Carbos, 1e5, Currency.money, {
    multiplier: 1.1,
    multiplierDecrease: false,
    saveName: `${VitaminType[VitaminType.Carbos]}|${Currency[Currency.money]}`,
    visible: new MaxRegionRequirement(Region.unova),
}, undefined, 'Reduces steps required when hatching');

// Consumables
ItemList.Rare_Candy = new AttackGainConsumable(ConsumableType.Rare_Candy, Infinity, undefined, undefined, 'Rare Candy', 'Permanently increases the attack of a Pokémon');
ItemList.Magikarp_Biscuit = new AttackGainConsumable(ConsumableType.Magikarp_Biscuit, Infinity, undefined, undefined, undefined, 'Strengthen your Magikarp', 6, (pokemon) => Math.floor(pokemon.id) === pokemonMap.Magikarp.id);

// Miscellaneous
ItemList.Christmas_present = new ChristmasPresent();

// Underground Items
// Sellable (Diamonds)
ItemList.Rare_bone = new TreasureItem('Rare_bone', UndergroundItemValueType.Diamond, 'Rare Bone');
ItemList.Star_piece = new TreasureItem('Star_piece', UndergroundItemValueType.Diamond, 'Star Piece');
ItemList.Revive = new TreasureItem('Revive', UndergroundItemValueType.Diamond, 'Revive');
ItemList.Max_revive = new TreasureItem('Max_revive', UndergroundItemValueType.Diamond, 'Max Revive');
ItemList.Iron_ball = new TreasureItem('Iron_ball', UndergroundItemValueType.Diamond, 'Iron Ball');
ItemList.Heart_scale = new TreasureItem('Heart_scale', UndergroundItemValueType.Diamond, 'Heart Scale');
ItemList.Light_clay = new TreasureItem('Light_clay', UndergroundItemValueType.Diamond, 'Light Clay');
ItemList.Odd_keystone = new TreasureItem('Odd_keystone', UndergroundItemValueType.Diamond, 'Odd Keystone');
ItemList.Hard_stone = new TreasureItem('Hard_stone', UndergroundItemValueType.Diamond, 'Hard Stone');
ItemList.Oval_stone = new TreasureItem('Oval_stone', UndergroundItemValueType.Diamond, 'Oval Stone');
ItemList.Smooth_rock = new TreasureItem('Smooth_rock', UndergroundItemValueType.Diamond, 'Smooth Rock');
ItemList.Heat_rock = new TreasureItem('Heat_rock', UndergroundItemValueType.Diamond, 'Heat Rock');
ItemList.Icy_rock = new TreasureItem('Icy_rock', UndergroundItemValueType.Diamond, 'Icy Rock');
ItemList.Damp_rock = new TreasureItem('Damp_rock', UndergroundItemValueType.Diamond, 'Damp Rock');
// Plates
ItemList.Draco_plate = new TreasureItem('Draco_plate', UndergroundItemValueType.Gem, 'Draco Plate');
ItemList.Dread_plate = new TreasureItem('Dread_plate', UndergroundItemValueType.Gem, 'Dread Plate');
ItemList.Earth_plate = new TreasureItem('Earth_plate', UndergroundItemValueType.Gem, 'Earth Plate');
ItemList.Fist_plate = new TreasureItem('Fist_plate', UndergroundItemValueType.Gem, 'Fist Plate');
ItemList.Flame_plate = new TreasureItem('Flame_plate', UndergroundItemValueType.Gem, 'Flame Plate');
ItemList.Icicle_plate = new TreasureItem('Icicle_plate', UndergroundItemValueType.Gem, 'Icicle Plate');
ItemList.Insect_plate = new TreasureItem('Insect_plate', UndergroundItemValueType.Gem, 'Insect Plate');
ItemList.Iron_plate = new TreasureItem('Iron_plate', UndergroundItemValueType.Gem, 'Iron Plate');
ItemList.Meadow_plate = new TreasureItem('Meadow_plate', UndergroundItemValueType.Gem, 'Meadow Plate');
ItemList.Mind_plate = new TreasureItem('Mind_plate', UndergroundItemValueType.Gem, 'Mind Plate');
ItemList.Sky_plate = new TreasureItem('Sky_plate', UndergroundItemValueType.Gem, 'Sky Plate');
ItemList.Splash_plate = new TreasureItem('Splash_plate', UndergroundItemValueType.Gem, 'Splash Plate');
ItemList.Spooky_plate = new TreasureItem('Spooky_plate', UndergroundItemValueType.Gem, 'Spooky Plate');
ItemList.Stone_plate = new TreasureItem('Stone_plate', UndergroundItemValueType.Gem, 'Stone Plate');
ItemList.Toxic_plate = new TreasureItem('Toxic_plate', UndergroundItemValueType.Gem, 'Toxic Plate');
ItemList.Zap_plate = new TreasureItem('Zap_plate', UndergroundItemValueType.Gem, 'Zap Plate');
ItemList.Pixie_plate = new TreasureItem('Pixie_plate', UndergroundItemValueType.Gem, 'Pixie Plate');
ItemList.Blank_plate = new TreasureItem('Blank_plate', UndergroundItemValueType.Gem, 'Blank Plate');
// Fossils
ItemList.Helix_fossil = new TreasureItem('Helix_fossil', UndergroundItemValueType.Fossil, 'Helix Fossil');
ItemList.Dome_fossil = new TreasureItem('Dome_fossil', UndergroundItemValueType.Fossil, 'Dome Fossil');
ItemList.Old_amber = new TreasureItem('Old_amber', UndergroundItemValueType.Fossil, 'Old Amber');
ItemList.Root_fossil = new TreasureItem('Root_fossil', UndergroundItemValueType.Fossil, 'Root Fossil');
ItemList.Claw_fossil = new TreasureItem('Claw_fossil', UndergroundItemValueType.Fossil, 'Claw Fossil');
ItemList.Armor_fossil = new TreasureItem('Armor_fossil', UndergroundItemValueType.Fossil, 'Armor Fossil');
ItemList.Skull_fossil = new TreasureItem('Skull_fossil', UndergroundItemValueType.Fossil, 'Skull Fossil');
ItemList.Cover_fossil = new TreasureItem('Cover_fossil', UndergroundItemValueType.Fossil, 'Cover Fossil');
ItemList.Plume_fossil = new TreasureItem('Plume_fossil', UndergroundItemValueType.Fossil, 'Plume Fossil');
ItemList.Jaw_fossil = new TreasureItem('Jaw_fossil', UndergroundItemValueType.Fossil, 'Jaw Fossil');
ItemList.Sail_fossil = new TreasureItem('Sail_fossil', UndergroundItemValueType.Fossil, 'Sail Fossil');
ItemList.Fossilized_bird = new TreasureItem('Fossilized_bird', UndergroundItemValueType.FossilPiece, 'Fossilized Bird');
ItemList.Fossilized_fish = new TreasureItem('Fossilized_fish', UndergroundItemValueType.FossilPiece, 'Fossilized Fish');
ItemList.Fossilized_drake = new TreasureItem('Fossilized_drake', UndergroundItemValueType.FossilPiece, 'Fossilized Drake');
ItemList.Fossilized_dino = new TreasureItem('Fossilized_dino', UndergroundItemValueType.FossilPiece, 'Fossilized Dino');
// Shards
ItemList.Red_shard = new TreasureItem('Red_shard', UndergroundItemValueType.Shard, 'Red Shard');
ItemList.Yellow_shard = new TreasureItem('Yellow_shard', UndergroundItemValueType.Shard, 'Yellow Shard');
ItemList.Green_shard = new TreasureItem('Green_shard', UndergroundItemValueType.Shard, 'Green Shard');
ItemList.Blue_shard = new TreasureItem('Blue_shard', UndergroundItemValueType.Shard, 'Blue Shard');
ItemList.Grey_shard = new TreasureItem('Grey_shard', UndergroundItemValueType.Shard, 'Grey Shard');
ItemList.Purple_shard = new TreasureItem('Purple_shard', UndergroundItemValueType.Shard, 'Purple Shard');
ItemList.Ochre_shard = new TreasureItem('Ochre_shard', UndergroundItemValueType.Shard, 'Ochre Shard');
ItemList.Black_shard = new TreasureItem('Black_shard', UndergroundItemValueType.Shard, 'Black Shard');
ItemList.Crimson_shard = new TreasureItem('Crimson_shard', UndergroundItemValueType.Shard, 'Crimson Shard');
ItemList.Lime_shard = new TreasureItem('Lime_shard', UndergroundItemValueType.Shard, 'Lime Shard');
ItemList.White_shard = new TreasureItem('White_shard', UndergroundItemValueType.Shard, 'White Shard');
ItemList.Pink_shard = new TreasureItem('Pink_shard', UndergroundItemValueType.Shard, 'Pink Shard');
ItemList.Cyan_shard = new TreasureItem('Cyan_shard', UndergroundItemValueType.Shard, 'Cyan Shard');
ItemList.Rose_shard = new TreasureItem('Rose_shard', UndergroundItemValueType.Shard, 'Rose Shard');
ItemList.Brown_shard = new TreasureItem('Brown_shard', UndergroundItemValueType.Shard, 'Brown Shard');
ItemList.Beige_shard = new TreasureItem('Beige_shard', UndergroundItemValueType.Shard, 'Beige Shard');
ItemList.Slate_shard = new TreasureItem('Slate_shard', UndergroundItemValueType.Shard, 'Slate Shard');


// Pokemon shop items
// Kanto
ItemList['Pinkan Arbok']  = new PokemonItem('Pinkan Arbok');
ItemList['Pinkan Oddish']  = new PokemonItem('Pinkan Oddish');
ItemList['Pinkan Poliwhirl']  = new PokemonItem('Pinkan Poliwhirl');
ItemList['Pinkan Geodude']  = new PokemonItem('Pinkan Geodude');
ItemList['Pinkan Dodrio']  = new PokemonItem('Pinkan Dodrio', 50000);
ItemList['Charity Chansey']   = new PokemonItem('Charity Chansey', 5000);
ItemList['Exeggcute (Single)'] = new PokemonItem('Exeggcute (Single)');
ItemList.Lickitung            = new PokemonItem('Lickitung', 1000);
ItemList['Pinkan Weezing']  = new PokemonItem('Pinkan Weezing');
ItemList['Pinkan Scyther']  = new PokemonItem('Pinkan Scyther');
ItemList['Mr. Mime']             = new PokemonItem('Mr. Mime', 1000);
ItemList['Pinkan Electabuzz']  = new PokemonItem('Pinkan Electabuzz');
ItemList.Jynx                 = new PokemonItem('Jynx', 2000);
ItemList.Magikarp             = new PokemonItem('Magikarp', 50000, Currency.money, true);
ItemList['Magikarp Brown Stripes'] = new PokemonItem('Magikarp Brown Stripes', 100);
ItemList['Magikarp Blue Raindrops'] = new PokemonItem('Magikarp Blue Raindrops', 2000, Currency.diamond);
ItemList['Magikarp Saucy Violet'] = new PokemonItem('Magikarp Saucy Violet', 7500000000, Currency.money);
ItemList['Probably Feebas']   = new PokemonItem('Magikarp (Feebas)', 5999, Currency.battlePoint, false, 'Probably Feebas');
ItemList.Eevee                = new PokemonItem('Eevee', 4000);
ItemList.Porygon              = new PokemonItem('Porygon', 2000);
ItemList.Togepi               = new PokemonItem('Togepi', 15000);
// Hoenn
ItemList['Probably Chimecho']  = new PokemonItem('Hoppip (Chimecho)', 358, Currency.diamond, false, 'Probably Chimecho');
ItemList.Beldum               = new PokemonItem('Beldum', 22500);
// Sinnoh
ItemList['Grotle (Acorn)']  = new PokemonItem('Grotle (Acorn)');
ItemList.Combee               = new PokemonItem('Combee', 6750);
ItemList['Burmy (Plant)']     = new PokemonItem('Burmy (Plant)', 6750);
ItemList.Cherubi              = new PokemonItem('Cherubi', 6750);
ItemList.Spiritomb            = new PokemonItem('Spiritomb', 6750);
// Unova
ItemList.Zorua                = new PokemonItem('Zorua', 50625);
ItemList['Meloetta (Pirouette)'] = new PokemonItem('Meloetta (Pirouette)', 200000);
// Kalos
ItemList['Furfrou (Debutante)']  = new PokemonItem('Furfrou (Debutante)', 5000000000, Currency.money);
ItemList['Furfrou (Diamond)']    = new PokemonItem('Furfrou (Diamond)', 3000, Currency.diamond);
ItemList['Furfrou (Matron)']     = new PokemonItem('Furfrou (Matron)', 1500000, Currency.farmPoint);
ItemList['Furfrou (Dandy)']      = new PokemonItem('Furfrou (Dandy)', 250000);
ItemList['Furfrou (Kabuki)']     = new PokemonItem('Furfrou (Kabuki)', 75000, Currency.battlePoint);
ItemList['Furfrou (Pharaoh)']    = new PokemonItem('Furfrou (Pharaoh)', 300000000, Currency.dungeonToken);
ItemList['Furfrou (Star)']    = new PokemonItem('Furfrou (Star)', 10000);
ItemList['Furfrou (La Reine)']    = new PokemonItem('Furfrou (La Reine)');
ItemList['Furfrou (Heart)']    = new PokemonItem('Furfrou (Heart)', 15000, Currency.contestToken);
ItemList['Probably Not Pikachu']   = new PokemonItem('Inkay (Pikachu)', 100000000, Currency.dungeonToken, false, 'Probably Not Pikachu');
// Alola
ItemList['Type: Null']           = new PokemonItem('Type: Null', 114000);
ItemList.Poipole              = new PokemonItem('Poipole', 90000);
// Silvally Forms
ItemList['Silvally (Fighting) 1'] = new PokemonItem('Silvally (Fighting)', undefined, undefined, false, 'Silvally (Fighting)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Fighting)', true)]) }, 'Silvally (Fighting) 1');
ItemList['Silvally (Fighting) 2'] = new PokemonItem('Silvally (Fighting)', undefined, undefined, false, 'Silvally (Fighting)',
    { visible: new ObtainedPokemonRequirement('Silvally (Fighting)') }, 'Silvally (Fighting) 2');
ItemList['Silvally (Rock) 1'] = new PokemonItem('Silvally (Rock)', undefined, undefined, false, 'Silvally (Rock)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Rock)', true)]) }, 'Silvally (Rock) 1');
ItemList['Silvally (Rock) 2'] = new PokemonItem('Silvally (Rock)', undefined, undefined, false, 'Silvally (Rock)',
    { visible: new ObtainedPokemonRequirement('Silvally (Rock)') }, 'Silvally (Rock) 2');
ItemList['Silvally (Dark) 1'] = new PokemonItem('Silvally (Dark)', undefined, undefined, false, 'Silvally (Dark)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Dark)', true)]) }, 'Silvally (Dark) 1');
ItemList['Silvally (Dark) 2'] = new PokemonItem('Silvally (Dark)', undefined, undefined, false, 'Silvally (Dark)',
    { visible: new ObtainedPokemonRequirement('Silvally (Dark)') }, 'Silvally (Dark) 2');
ItemList['Silvally (Fairy) 1'] = new PokemonItem('Silvally (Fairy)', undefined, undefined, false, 'Silvally (Fairy)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Fairy)', true)]) }, 'Silvally (Fairy) 1');
ItemList['Silvally (Fairy) 2'] = new PokemonItem('Silvally (Fairy)', undefined, undefined, false, 'Silvally (Fairy)',
    { visible: new ObtainedPokemonRequirement('Silvally (Fairy)') }, 'Silvally (Fairy) 2');
ItemList['Silvally (Water) 1'] = new PokemonItem('Silvally (Water)', undefined, undefined, false, 'Silvally (Water)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Water)', true)]) }, 'Silvally (Water) 1');
ItemList['Silvally (Water) 2'] = new PokemonItem('Silvally (Water)', undefined, undefined, false, 'Silvally (Water)',
    { visible: new ObtainedPokemonRequirement('Silvally (Water)') }, 'Silvally (Water) 2');
ItemList['Silvally (Grass) 1'] = new PokemonItem('Silvally (Grass)', undefined, undefined, false, 'Silvally (Grass)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Grass)', true)]) }, 'Silvally (Grass) 1');
ItemList['Silvally (Grass) 2'] = new PokemonItem('Silvally (Grass)', undefined, undefined, false, 'Silvally (Grass)',
    { visible: new ObtainedPokemonRequirement('Silvally (Grass)') }, 'Silvally (Grass) 2');
ItemList['Silvally (Fire) 1'] = new PokemonItem('Silvally (Fire)', undefined, undefined, false, 'Silvally (Fire)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Fire)', true)]) }, 'Silvally (Fire) 1');
ItemList['Silvally (Fire) 2'] = new PokemonItem('Silvally (Fire)', undefined, undefined, false, 'Silvally (Fire)',
    { visible: new ObtainedPokemonRequirement('Silvally (Fire)') }, 'Silvally (Fire) 2');
ItemList['Silvally (Electric) 1'] = new PokemonItem('Silvally (Electric)', undefined, undefined, false, 'Silvally (Electric)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Electric)', true)]) }, 'Silvally (Electric) 1');
ItemList['Silvally (Electric) 2'] = new PokemonItem('Silvally (Electric)', undefined, undefined, false, 'Silvally (Electric)',
    { visible: new ObtainedPokemonRequirement('Silvally (Electric)') }, 'Silvally (Electric) 2');
ItemList['Silvally (Ice) 1'] = new PokemonItem('Silvally (Ice)', undefined, undefined, false, 'Silvally (Ice)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Ice)', true)]) }, 'Silvally (Ice) 1');
ItemList['Silvally (Ice) 2'] = new PokemonItem('Silvally (Ice)', undefined, undefined, false, 'Silvally (Ice)',
    { visible: new ObtainedPokemonRequirement('Silvally (Ice)') }, 'Silvally (Ice) 2');
ItemList['Silvally (Ground) 1'] = new PokemonItem('Silvally (Ground)', undefined, undefined, false, 'Silvally (Ground)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Ground)', true)]) }, 'Silvally (Ground) 1');
ItemList['Silvally (Ground) 2'] = new PokemonItem('Silvally (Ground)', undefined, undefined, false, 'Silvally (Ground)',
    { visible: new ObtainedPokemonRequirement('Silvally (Ground)') }, 'Silvally (Ground) 2');
ItemList['Silvally (Bug) 1'] = new PokemonItem('Silvally (Bug)', undefined, undefined, false, 'Silvally (Bug)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Bug)', true)]) }, 'Silvally (Bug) 1');
ItemList['Silvally (Bug) 2'] = new PokemonItem('Silvally (Bug)', undefined, undefined, false, 'Silvally (Bug)',
    { visible: new ObtainedPokemonRequirement('Silvally (Bug)') }, 'Silvally (Bug) 2');
ItemList['Silvally (Flying) 1'] = new PokemonItem('Silvally (Flying)', undefined, undefined, false, 'Silvally (Flying)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Flying)', true)]) }, 'Silvally (Flying) 1');
ItemList['Silvally (Flying) 2'] = new PokemonItem('Silvally (Flying)', undefined, undefined, false, 'Silvally (Flying)',
    { visible: new ObtainedPokemonRequirement('Silvally (Flying)') }, 'Silvally (Flying) 2');
ItemList['Silvally (Poison) 1'] = new PokemonItem('Silvally (Poison)', undefined, undefined, false, 'Silvally (Poison)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Poison)', true)]) }, 'Silvally (Poison) 1');
ItemList['Silvally (Poison) 2'] = new PokemonItem('Silvally (Poison)', undefined, undefined, false, 'Silvally (Poison)',
    { visible: new ObtainedPokemonRequirement('Silvally (Poison)') }, 'Silvally (Poison) 2');
ItemList['Silvally (Ghost) 1'] = new PokemonItem('Silvally (Ghost)', undefined, undefined, false, 'Silvally (Ghost)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Ghost)', true)]) }, 'Silvally (Ghost) 1');
ItemList['Silvally (Ghost) 2'] = new PokemonItem('Silvally (Ghost)', undefined, undefined, false, 'Silvally (Ghost)',
    { visible: new ObtainedPokemonRequirement('Silvally (Ghost)') }, 'Silvally (Ghost) 2');
ItemList['Silvally (Psychic) 1'] = new PokemonItem('Silvally (Psychic)', undefined, undefined, false, 'Silvally (Psychic)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Psychic)', true)]) }, 'Silvally (Psychic) 1');
ItemList['Silvally (Psychic) 2'] = new PokemonItem('Silvally (Psychic)', undefined, undefined, false, 'Silvally (Psychic)',
    { visible: new ObtainedPokemonRequirement('Silvally (Psychic)') }, 'Silvally (Psychic) 2');
ItemList['Silvally (Steel) 1'] = new PokemonItem('Silvally (Steel)', undefined, undefined, false, 'Silvally (Steel)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Steel)', true)]) }, 'Silvally (Steel) 1');
ItemList['Silvally (Steel) 2'] = new PokemonItem('Silvally (Steel)', undefined, undefined, false, 'Silvally (Steel)',
    { visible: new ObtainedPokemonRequirement('Silvally (Steel)') }, 'Silvally (Steel) 2');
ItemList['Silvally (Dragon) 1'] = new PokemonItem('Silvally (Dragon)', undefined, undefined, false, 'Silvally (Dragon)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Dragon)', true)]) }, 'Silvally (Dragon) 1');
ItemList['Silvally (Dragon) 2'] = new PokemonItem('Silvally (Dragon)', undefined, undefined, false, 'Silvally (Dragon)',
    { visible: new ObtainedPokemonRequirement('Silvally (Dragon)') }, 'Silvally (Dragon) 2');
//Galar
ItemList.Dracozolt              = new PokemonItem('Dracozolt', 100000);
ItemList.Arctozolt              = new PokemonItem('Arctozolt', 100000);
ItemList.Dracovish              = new PokemonItem('Dracovish', 100000);
ItemList.Arctovish              = new PokemonItem('Arctovish', 100000);
ItemList['Zarude (Dada)']       = new PokemonItem('Zarude (Dada)', 500000);
// Dream orbs
ItemList.Staryu  = new PokemonItem('Staryu');
ItemList.Igglybuff  = new PokemonItem('Igglybuff');
ItemList.Shuckle  = new PokemonItem('Shuckle');
ItemList.Smoochum  = new PokemonItem('Smoochum');
ItemList.Ralts  = new PokemonItem('Ralts');
ItemList.Swablu  = new PokemonItem('Swablu');
ItemList.Drifloon  = new PokemonItem('Drifloon');
ItemList.Bronzor  = new PokemonItem('Bronzor');
ItemList.Riolu  = new PokemonItem('Riolu');
ItemList.Rotom  = new PokemonItem('Rotom');
ItemList.Munna  = new PokemonItem('Munna');
ItemList.Sigilyph  = new PokemonItem('Sigilyph');
ItemList['Tornadus (Therian)']  = new PokemonItem('Tornadus (Therian)');
ItemList['Thundurus (Therian)']  = new PokemonItem('Thundurus (Therian)');
ItemList['Landorus (Therian)']  = new PokemonItem('Landorus (Therian)');
// Contest
ItemList['Dugtrio (Punk)'] = new PokemonItem('Dugtrio (Punk)', 1500, Currency.contestToken);
ItemList['Gengar (Punk)'] = new PokemonItem('Gengar (Punk)', 3000, Currency.contestToken);
ItemList['Goldeen (Diva)'] = new PokemonItem('Goldeen (Diva)', 500, Currency.contestToken);
ItemList['Onix (Rocker)'] = new PokemonItem('Onix (Rocker)', 1000, Currency.contestToken);
ItemList['Tangela (Pom-pom)'] = new PokemonItem('Tangela (Pom-pom)', 400, Currency.contestToken);
ItemList['Weepinbell (Fancy)'] = new PokemonItem('Weepinbell (Fancy)', 700, Currency.contestToken);
ItemList['Sudowoodo (Golden)'] = new PokemonItem('Sudowoodo (Golden)', 2000, Currency.contestToken);
ItemList['Pikachu (Rock Star)'] = new PokemonItem('Pikachu (Rock Star)', 1000, Currency.contestToken);
ItemList['Pikachu (Belle)'] = new PokemonItem('Pikachu (Belle)', 1000, Currency.contestToken);
ItemList['Pikachu (Pop Star)'] = new PokemonItem('Pikachu (Pop Star)', 1000, Currency.contestToken);
ItemList['Pikachu (Ph. D.)'] = new PokemonItem('Pikachu (Ph. D.)', 1000, Currency.contestToken);
ItemList['Pikachu (Libre)'] = new PokemonItem('Pikachu (Libre)', 1000, Currency.contestToken);
// Event
ItemList['Elf Munchlax'] = new PokemonItem('Elf Munchlax', 3108, Currency.questPoint, undefined, undefined,
    { visible: new MultiRequirement([new SpecialEventRequirement('Merry Christmas!'), new ObtainedPokemonRequirement('Santa Snorlax')]) });
