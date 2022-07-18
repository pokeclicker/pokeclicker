/* eslint-disable array-bracket-newline */
///<reference path="../../declarations/requirements/RouteKillRequirement.d.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../../declarations/requirements/MultiRequirement.d.ts"/>

const TownList: { [name: string]: Town } = {};

const pokeMartShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_egg,
    ItemList.Token_collector,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.SmallRestore,
    ItemList.MediumRestore,
    ItemList.LargeRestore,
], 'Explorers Poké Mart');

const DepartmentStoreShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_egg,
    ItemList.Dowsing_machine,
    ItemList.Token_collector,
    ItemList.Lucky_incense,
    ItemList.SmallRestore,
    ItemList.MediumRestore,
    ItemList.LargeRestore,
], 'Department Store');

const pokeLeagueShop = () => new Shop([
    new PokeballItem(GameConstants.Pokeball.Masterball, 10000000, GameConstants.Currency.money       , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.money]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 75000   , GameConstants.Currency.dungeonToken, { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.dungeonToken]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.questPoint  , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.questPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.farmPoint   , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.farmPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 50      , GameConstants.Currency.diamond     , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.diamond]}` }),
    //ItemList['RareCandy'],
    ItemList.Protein,
]);

//Kanto Shops
const ViridianCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Dungeon_ticket,
]);
const PewterCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.Mystery_egg,
]);
const Route3Shop = new Shop([
    ItemList.Magikarp,
]);
const CeruleanCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.Water_egg,
    ItemList.Water_stone,
]);
const VermilionCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Lucky_egg,
    ItemList.Electric_egg,
    ItemList.Thunder_stone,
]);
const LavenderTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.Grass_egg,
]);
const CeladonCityShop = new Shop([
    ItemList.Eevee,
    ItemList.Porygon,
    ItemList.Jynx,
    ItemList['Mr. Mime'],
    ItemList.Lickitung,
],   'Game Corner Shop');
const CeladonDepartmentStoreShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_egg,
    ItemList.Dowsing_machine,
    ItemList.Token_collector,
    ItemList.Lucky_incense,
], 'Department Store');
const SaffronCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xClick,
    ItemList.Fighting_egg,
    ItemList.Leaf_stone,
    ItemList.Moon_stone,
]);
const FuchsiaCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_egg,
    ItemList.Dragon_egg,
    ItemList.Linking_cord,
]);
const CinnabarIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.SmallRestore,
    ItemList.Fire_egg,
    ItemList.Fire_stone,
    ItemList.Explorer_kit,
    ItemList.Explosive_Charge,
    ItemList.Treasure_Scanner,
    ItemList.HatcheryHelperKris,
]);
const OneIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.Lucky_incense,
]);
const TwoIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dowsing_machine,
]);
const ThreeIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
]);

// Kanto NPCs

const PalletProfOak = new ProfNPC('Prof. Oak',
    GameConstants.Region.kanto,
    'Congratulations on completing your Kanto Pokédex!',
    'Your journey isn\'t over yet, a whole world awaits you! Onwards to Johto!',
    'assets/images/oak.png');

const PalletMom1 = new NPC('Mom', [
    'So you\'re really leaving on your very own Pokémon journey. I\'m so proud of you. Let me give you some words of wisdom for your travels.',
    'Traveling on your own can be scary. But remember that there are nice people everywhere you go. So strike up a conversation! You will probably learn something useful.',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Tutorial Quests', 2), new QuestLineStepCompletedRequirement('Tutorial Quests', 3, GameConstants.AchievementOption.less )]) });
const PalletMom2 = new NPC('Mom', [
    'Remember that there are nice people everywhere you go. So strike up a conversation! You will probably learn something useful.',
],
{ requirement: new QuestLineStepCompletedRequirement('Tutorial Quests', 3) });
const ViridianCityOldMan1 = new NPC('Old Man', [
    'Leave me alone. I need my coffee.',
],
{ requirement: new QuestLineStepCompletedRequirement('Tutorial Quests', 4, GameConstants.AchievementOption.less) });
const ViridianCityOldMan2 = new NPC('Old Man', [
    'Ahh, I\'ve had my coffee now and I feel great!',
    'You can use the Pokéball Selector to select which type of Pokéball to use on specific Pokémon based on caught status. The options, from left to right, are Caught, Caught shiny, New, New shiny.',
    'For example, if you click on the empty ball below the word Caught and assign a Pokéball, you will then start throwing Pokéballs at Pokémon you\'ve already caught before. This can be very useful if you need Dungeon Tokens.',
    'Here, let me show you how it works.',
    'I\'ll always be here to explain it again if you forget.',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Tutorial Quests', 4), new QuestLineStepCompletedRequirement('Tutorial Quests', 5, GameConstants.AchievementOption.less )]) });
const ViridianCityOldMan3 = new NPC('Old Man', [
    'You can use the Pokéball Selector to select which type of Pokéball to use on specific Pokémon based on caught status. The options, from left to right, are Caught, Caught shiny, New, New shiny.',
    'For example, if you click on the empty ball below the word Caught and assign a Pokéball, you will then start throwing Pokéballs at Pokémon you\'ve already caught before. This can be very useful if you need Dungeon Tokens.',
    'I\'ll always be here to explain it again if you forget.',
],
{ requirement: new QuestLineStepCompletedRequirement('Tutorial Quests', 5) });
const PewterBattleItemRival = new NPC('Battle Item Master', [
    'Hey kid, you look new! Let me offer some advice: Battle Items like xAttack can be acquired along Routes, inside Dungeons and in Shops!',
    'Use them to help you out whenever you feel like time is against you!',
]);

const PewterScientist = new NPC('Gem Scientist', [
    'I see you are carrying a Gem Case. Here at the museum we study space, fossils and gems!',
    'When you defeat a Pokémon you gain a gem of that Pokémon\'s type. If the Pokémon has two types you gain one for each! Defeating very strong Pokémon, such as those owned by gym leaders, gets you five!',
    'You can click Gems in the Start Menu to boost your damage using these gems. For example, using rock gems you can boost the super effective damage of your rock type Pokémon! Those flying types had better watch out for your might!',
    'You can even use this to eliminate immunities! By using electric gems to boost your electric type immune damage, your electric Pokémon can suddenly do damage against ground types!',
],
{ requirement: new GymBadgeRequirement(BadgeEnums.Earth) });

const Route3ShadySalesman = new NPC('Shady Salesman', [
    'Have I got a deal just for you!',
    'I\'ll let you have a super secret Pokémon. For the right price!',
]);

const CeruleanKantoBerryMaster = new KantoBerryMasterNPC('Berry Master', [
    'Bah! You younglings have no appreciation of the art of Berry farming!',
    'Come back when you are ready to learn!',
]);

const CeruleanSuperNerd = new NPC('Super Nerd Jovan', [
    'In my spare time I like to play this kickass browser game. It takes ages to get all the best stuff.',
    'Then one day, all my progress was gone. I don\'t know exactly what happened. Something updated, some cookies got cleaned up, I don\'t know. I had to start all over from the beginning.',
    'That day I learned that I should frequently download a save.',
]);

const VermilionFanClubChairman = new NPC('Fan Club Chairman', [
    'You won’t find a Pokémon as wonderful as my favorite Rapidash in those Typed Eggs in the shops, but they might hatch rare Pokémon you can’t find anywhere else!',
]);

const VermilionShardApprentice = new NPC('Shard Apprentice', [
    'Are you looking for some Shards? You can find them in many dungeons! Except in Viridan Forest and Mt. Moon. I\'ve never found any Shards there for some reason.',
    'I happen to know that there are some Yellow and Blue Shards in Diglett\'s Cave. Just look inside the chests!',
    'Shards can have lots of different colors. Different dungeons will have different colors, so keep an eye out! Most of them can\'t even be found in Kanto!',
]);

const LavenderMrFuji = new NPC('Mr. Fuji', [
    'Welcome. In our Volunteer House here we take in all kinds of Pokémon to care for them.',
    'Did you know that sparkling Pokémon are more often found in Dungeons, on Farms, from Eggs, and even from Shops, the Safari Zone, and Evolutions from Items?',
]);

const LavenderChanneler = new NPC('Channeler Karina', [
    'I know a lot of useful stuff. Like the odds of finding a shiny Pokémon or how to increase Click Attack.',
    'No, I didn\'t learn this from talking to ghosts, don\'t be silly. There\'s a FAQ button in the Start Menu. It\'s very useful.',
]);

const BigSpender = new NPC('Big Spender', [
    'I love shopping! When I come in, the cashiers know I want tons of items.',
    'You can use the Shop Amount Button settings to make it easy for big purchases, too!',
]);

const SaffronBattleItemRival = new NPC('Battle Item Master', [
    'Do I know you? Wait... Have you met my worthless rival? Ha! Let me guess, he gave you some unwanted advice?',
    'I bet he forget to tell you that although all Battle Items only last for 30 seconds, they can stack and last for days! Now scram!',
]);

const SaffronBreeder = new NPC('Breeder', [
    'You can leave your level 100 Pokémon with us up at the Hatchery. Breeding them will reset their level, but they will be stronger! They gain 25% of their base attack!',
    'And the best part is you can keep doing it over and over and over again! The sky is the limit! Reach for the stars!',
    'With Protein your Pokémon will become even stronger when you breed them. I hear they sell it at the Indigo Plateau.',
],
{ requirement: new GymBadgeRequirement(BadgeEnums.Earth) });

const FuchsiaKantoRoamerNPC = new RoamerNPC('Youngster Wendy', [
    'There\'s been some recent sightings of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.kanto, RoamingPokemonList.findGroup(GameConstants.Region.kanto, GameConstants.KantoSubRegions.Kanto));

const CinnabarIslandResearcher = new NPC('Researcher', [
    'They were trying to clone an ancient Pokémon in the mansion... I wonder if they succeeded.',
    'Apparently the ancient Pokémon escaped, and can be found roaming around Kanto!',
]);
const OneIslandCelio1 = new NPC ('Celio', [
    'Ah, yes. Welcome! Welcome! Almost didn\'t see you there. I\'m just so busy trying to get this darned thing to work. Once it\'s complete we can finally have a direct communications network between the Sevii Islands and Kanto!',
    'I don\'t even have time to go and pick up an important package. A meteorite, found by the owner of the game corner on Two Island. It contains important materials for my machine.',
    'You seem like the adventuring type. Tell you what. How about Bill stays here with me to work on this machine, and you go fetch my Meteorite for me.',
],
{ requirement: new QuestLineStepCompletedRequirement('Bill\'s Errand', 1, GameConstants.AchievementOption.less ) });
const OneIslandCelio2 = new NPC ('Celio', [
    'Back already? That didn\'t take very long.',
    'What? It did take long? You went on a whole rescue mission? Seems like I lost track of time while working on my machine with Bill. It\'s been a lot of fun.',
    'I\'m glad to hear Lostelle is all right. You can hand the meteorite to me. Bill, thank you for your assistance, I\'ll take it from here. I can see that your friend is eager to get back to Kanto and challenge the Pokémon League.',
    'Thank you both very much.',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Errand', 5), new QuestLineCompletedRequirement('Bill\'s Errand', GameConstants.AchievementOption.less )]) });
const OneIslandCelio3 = new NPC ('Celio', [
    'You\'ve been a great help. Thanks again. Maybe we\'ll meet again some day...',
],
{ requirement: new QuestLineCompletedRequirement('Bill\'s Errand') });
const OneIslandYoungster = new NPC ('Youngster', [
    'Isn\'t it strange how Mol<span style="font-style: italic; font-weight: bold">tres</span> lives on <span style="font-style: italic; font-weight: bold">One</span> Island?',
],
{ requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Ember Summit')) });
const TwoIslandGameCornerOwner1 = new NPC ('Game Corner Owner', [
    'Hello stranger. I\'m afraid the Game Corner is currently closed.',
    'What? The meteorite for Celio? Yes, I can give that to you. But I need you to do something for me first.',
    'My daughter Lostelle is missing. She likes to pick berries in the Berry Forest on Three Island. She does it all the time. But this time she hasn\'t come back. Please go find her.',
],
{ requirement: new QuestLineStepCompletedRequirement('Bill\'s Errand', 4, GameConstants.AchievementOption.less ) });
const TwoIslandGameCornerOwner2 = new NPC ('Game Corner Owner', [
    'My sweet Lostelle! I\'m so glad you\'re all right.',
    'Thank you very much kind stranger. Please take the Meteorite.',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Errand', 4), new QuestLineCompletedRequirement('Bill\'s Errand', GameConstants.AchievementOption.less)]) });
const ThreeIslandBiker = new NPC ('Biker', [
    'You know what sucks? The other islands are off limits for some arbitrary reason. There is no explanation. Just can\'t go there.',
    'Alright, you want the real truth? Some weird old dude told me this: "The other islands don\'t exist. Yet. Gotta wait for the devs to put them in."',
    'I don\'t know what half those words mean. All I know is I can\'t go back to Kanto with the rest of the gang. This sucks.',
],
{ requirement: new QuestLineStepCompletedRequirement('Bill\'s Errand', 3) });

//Kanto Towns
TownList['Pallet Town'] = new Town(
    'Pallet Town',
    GameConstants.Region.kanto,
    [],
    {
        npcs: [PalletProfOak, PalletMom1, PalletMom2],
    }
);
TownList['Viridian City'] = new Town(
    'Viridian City',
    GameConstants.Region.kanto,
    [ViridianCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
        npcs: [ViridianCityOldMan1, ViridianCityOldMan2, ViridianCityOldMan3],
    }
);
TownList['Pewter City'] = new Town(
    'Pewter City',
    GameConstants.Region.kanto,
    [PewterCityShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 2),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Viridian Forest')),
        ],
        npcs: [PewterBattleItemRival, PewterScientist],
    }
);
TownList['Route 3 Pokémon Center'] = new Town(
    'Route 3 Pokémon Center',
    GameConstants.Region.kanto,
    [Route3Shop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 3),
        ],
        npcs: [Route3ShadySalesman],
    }
);
TownList['Cerulean City'] = new Town(
    'Cerulean City',
    GameConstants.Region.kanto,
    [CeruleanCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cerulean City']), new MoveToDungeon(dungeonList['Cerulean Cave'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
        npcs: [CeruleanKantoBerryMaster, CeruleanSuperNerd],
    }
);
TownList['Vermilion City'] = new Town(
    'Vermilion City',
    GameConstants.Region.kanto,
    [VermilionCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Vermilion City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
        npcs: [VermilionFanClubChairman, VermilionShardApprentice],
    }
);
TownList['Lavender Town'] = new Town(
    'Lavender Town',
    GameConstants.Region.kanto,
    [LavenderTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lavender Town']), new MoveToDungeon(dungeonList['Pokémon Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
        npcs: [LavenderMrFuji, LavenderChanneler],
    }
);
TownList['Celadon City'] = new Town(
    'Celadon City',
    GameConstants.Region.kanto,
    [CeladonDepartmentStoreShop, CeladonCityShop, new MoveToDungeon(dungeonList['Rocket Game Corner'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)],
        npcs: [BigSpender],
    }
);
TownList['Saffron City'] = new Town(
    'Saffron City',
    GameConstants.Region.kanto,
    [SaffronCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Saffron City']), new MoveToDungeon(dungeonList['Silph Co.']), TemporaryBattleList['Fighting Dojo']],
    {
        requirements: [new OneFromManyRequirement([
            new GymBadgeRequirement(BadgeEnums.Rainbow),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rocket Game Corner')),
        ])],
        npcs: [SaffronBattleItemRival, SaffronBreeder],
    }
);
TownList['Fuchsia City'] = new Town(
    'Fuchsia City',
    GameConstants.Region.kanto,
    [FuchsiaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fuchsia City'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ])],
        npcs: [FuchsiaKantoRoamerNPC],
    }
);
TownList['Cinnabar Island'] = new Town(
    'Cinnabar Island',
    GameConstants.Region.kanto,
    [CinnabarIslandShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cinnabar Island']), new MoveToDungeon(dungeonList['Pokémon Mansion'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
        ])],
        npcs: [CinnabarIslandResearcher],
    }
);
TownList['Indigo Plateau Kanto'] = new Town(
    'Indigo Plateau Kanto',
    GameConstants.Region.kanto,
    [GymList['Elite Lorelei'], GymList['Elite Bruno'], GymList['Elite Agatha'], GymList['Elite Lance'], GymList['Champion Blue'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 23),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road')),
        ],
    }
);
TownList['One Island'] = new Town(
    'One Island',
    GameConstants.Region.kanto,
    [OneIslandShop, new DockTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Volcano)],
        npcs: [OneIslandCelio1, OneIslandCelio2, OneIslandCelio3, OneIslandYoungster],
    }
);
TownList['Mt. Ember'] = new Town(
    'Mt. Ember',
    GameConstants.Region.kanto,
    [new MoveToDungeon(dungeonList['Mt. Ember Summit'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 27)],
    }
);
TownList['Two Island'] = new Town(
    'Two Island',
    GameConstants.Region.kanto,
    [TwoIslandShop],
    {
        requirements: [new QuestLineStepCompletedRequirement('Bill\'s Errand', 0)],
        npcs: [TwoIslandGameCornerOwner1, TwoIslandGameCornerOwner2],
    }
);
TownList['Three Island'] = new Town(
    'Three Island',
    GameConstants.Region.kanto,
    [ThreeIslandShop, TemporaryBattleList['Biker Goon 1'], TemporaryBattleList['Biker Goon 2'], TemporaryBattleList['Biker Goon 3'], TemporaryBattleList['Cue Ball Paxton']],
    {
        requirements: [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)],
        npcs: [ThreeIslandBiker],
    }
);

//Kanto Dungeons
TownList['Viridian Forest'] = new DungeonTown(
    'Viridian Forest',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 2)]
);
TownList['Mt. Moon'] = new DungeonTown(
    'Mt. Moon',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto,3)]
);
TownList['Diglett\'s Cave'] = new DungeonTown(
    'Diglett\'s Cave',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)]
);
TownList['Rock Tunnel'] = new DungeonTown(
    'Rock Tunnel',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
);
TownList['Rocket Game Corner'] = new DungeonTown(
    'Rocket Game Corner',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)]
);
TownList['Pokémon Tower'] = new DungeonTown(
    'Pokémon Tower',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 7),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rocket Game Corner')),
    ]
);
TownList['Silph Co.'] = new DungeonTown(
    'Silph Co.',
    GameConstants.Region.kanto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Tower'))]
);
TownList['Power Plant'] = new DungeonTown(
    'Power Plant',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Soul),
    ]
);
TownList['Seafoam Islands'] = new DungeonTown(
    'Seafoam Islands',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 19),
        new GymBadgeRequirement(BadgeEnums.Rainbow),
    ]
);
TownList['Pokémon Mansion'] = new DungeonTown(
    'Pokémon Mansion',
    GameConstants.Region.kanto,
    [new OneFromManyRequirement([
        new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
        new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
    ])]
);
TownList['Mt. Ember Summit'] = new DungeonTown(
    'Mt. Ember Summit',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 27)]
);
TownList['Berry Forest'] = new DungeonTown(
    'Berry Forest',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 29)]
);
TownList['Victory Road'] = new DungeonTown(
    'Victory Road',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 23)]
);
TownList['Cerulean Cave'] = new DungeonTown(
    'Cerulean Cave',
    GameConstants.Region.kanto,
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)]
);

//Johto Shops
const CherrygroveCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.SmallRestore,
]);
const VioletCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.MediumRestore,
    ItemList.Mystery_egg,
    ItemList.Togepi,
]);
const AzaleaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.Grass_egg,
    ItemList.Leaf_stone,
    ItemList.Kings_rock,
]);
const GoldenrodDepartmentStoreShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_egg,
    ItemList.Dowsing_machine,
    ItemList.Token_collector,
    ItemList.Lucky_incense,
    ItemList.SmallRestore,
    ItemList.MediumRestore,
], 'Department Store');
const EcruteakCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Fire_egg,
    ItemList.Fire_stone,
    ItemList.Soothe_bell,
]);
const OlivineCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.Water_egg,
    ItemList.Electric_egg,
    ItemList.Water_stone,
    ItemList.Thunder_stone,
    ItemList.Metal_coat,
    ItemList.HatcheryHelperCarey,
]);
const CianwoodCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xClick,
    ItemList.Fighting_egg,
    ItemList.Moon_stone,
    ItemList.Sun_stone,
]);
const MahoganyTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Linking_cord,
    ItemList.Upgrade,
    ItemList.HatcheryHelperDakota,
]);
const BlackthornCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.LargeRestore,
    ItemList.Dragon_egg,
    ItemList.Dragon_scale,
]);

// Johto NPCs

const JohtoBerryMaster = new BerryMasterShop([
    ItemList.Boost_Mulch,
    ItemList.Rich_Mulch,
    ItemList.Surprise_Mulch,
    ItemList.Amaze_Mulch,
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
    ItemList.Squirtbottle,
    ItemList.FarmHandBailey,
    ItemList.ChopleBerry,
    ItemList.KebiaBerry,
    ItemList.ShucaBerry,
    ItemList.ChartiBerry,
]);

const NewBarkTechnologyEnthusiast = new NPC('Tech Enthusiast', [
    'Technology is amazing! I have heard that picking up items in chests in Dungeons can make it easier to see! But the Dungeons seem to get harder with each chest you pick up...',
]);

const CherrygroveMrPokemon = new NPC('Mr. Pokémon', [
    'Welcome to Johto! This is where the first ever Pokémon egg was found long ago.',
    'Astounding breakthroughs have been made since then. We can now store Pokémon eggs for longer and queue them up for breeding.',
    'This new technology only allows up to four stored eggs for now, though.',
]);

const VioletEarlDervish = new NPC('Earl Dervish', [
    'Earl I am! Teach you I will to be a better trainer!',
    'Some Pokémon babies, only from Day Care they come! Hatch! Hatch! Hatch!',
]);

const AzaleaOldMan = new NPC('Wise Old Man', [
    'There is an old tale about the Guardian of Ilex Forest.',
    'It says that the mythical Pokémon Celebi will appear before anyone who has proven they are a Champion Pokémon Trainer.',
]);

const AzaleaHiker = new NPC('Hiker Daniel', [
    'The PokéManiacs in Union Cave are restless. They have been ranting and raving about a weekly visitor.',
    'According to them, a strange Pokémon\'s cries can be heard from a lake deep inside the cave.',
    'I\'ve never heard it myself. Apparently it only happens on Fridays.',
],
{ requirement: new GymBadgeRequirement(BadgeEnums.Fog) });

const EcruteakBill = new NPC('Bill', [
    'I traveled here all the way from Goldenrod to buy a Soothe Bell for my Eevee.',
    'When I use a Soothe Bell on Eevee it can evolve into Espeon or Umbreon. It depends on the time. Espeon during the day, Umbreon at night.',
    'I only brought enough QP for one Soothe Bell. It\'s so hard to choose...',
]);

const EcruteakEusine = new NPC('Eusine', [
    'Legends say that when the Brass Tower burned down and became the Burned Tower, three unnamed Pokémon perished in the flames...',
    'Ho-oh came down from the Tin Tower and revived those Pokémon. They became the Legendary Beasts. Some say these Beasts still inhabit the basement of the Burned Tower.',
    'Could you please clear Burned Tower for me and see if this is true?',
],
{ requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'), GameConstants.AchievementOption.less ) });

const EcruteakPokéfan = new NPC('Pokéfan Derek', [
    'I saw it! Did you see it?! I saw you go in there! I don\'t know what you did in the Burned Tower, but three great Beasts came running out of there!',
    'It was a great sight to behold. They all went in different directions. I think they are just roaming the region now. My friend Trevor in Blackthorn City can tell you more.',
    'Eusine was here a second ago. He seemed very excited, but then he suddenly left. I don\'t know where he went. I was a bit distracted by those majestic Beasts...',
],
{ requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower')) });

const EcruteakKimonoGirl = new NPC('Kimono Girl', [
    'Legends say that Ho-Oh is searching for a trainer of pure heart.',
    'To prove yourself, you must tame the three legendary beasts of Johto, and bring them to the nearby Tin Tower.',
],
{ requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower')) });

const OlivineSSAquaCaptain = new NPC('S.S. Aqua Captain', [
    'Aye! At this here dock you can travel to far away regions! But only ones you’ve travelled to before; I’ve heard the Professor has his own vessel to take ye’ to new lands!',
]);

const CianwoodPhotographyAide = new NPC('Photography Aide', [
    'Cameron the Photographer isn’t here right now; he’s off taking photos of Pokémon on Berry Farms. Did you know that some Berries can even attract rare Pokémon?',
]);

const MahoganySouvenirShopAttendant = new NPC('Souvenir Shop Attendant', [
    'We’ve got stuff here nobody else has got! But keep any Dowsing Machines you have away from the merchandise… especially the RageCandyBars. Keep ‘em outside where they belong! I’ve heard those machines can attract Pokémon with held items more often, and even more so in Dungeons!',
]);

const BlackthornJohtoRoamerNPC = new RoamerNPC('Pokéfan Trevor', [
    'On the news, they are getting more reports of roaming Pokémon appearing on {ROUTE_NAME}!',
], GameConstants.Region.johto, RoamingPokemonList.findGroup(GameConstants.Region.johto, GameConstants.JohtoSubRegions.Johto));

const ProfElm = new ProfNPC('Prof. Elm',
    GameConstants.Region.johto,
    'Oh, another regional Pokédex completed so soon?',
    'Amazing! Next stop is Hoenn, enjoy the sunshine while you\'re there!');


//Johto Towns
TownList['New Bark Town'] = new Town(
    'New Bark Town',
    GameConstants.Region.johto,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)],
        npcs: [ProfElm, NewBarkTechnologyEnthusiast],
    }
);
TownList['Cherrygrove City'] = new Town(
    'Cherrygrove City',
    GameConstants.Region.johto,
    [CherrygroveCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 29)],
        npcs: [CherrygroveMrPokemon],
    }
);
TownList['Violet City'] = new Town(
    'Violet City',
    GameConstants.Region.johto,
    [VioletCityShop, new MoveToDungeon(dungeonList['Sprout Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 31)],
        npcs: [VioletEarlDervish],
    }
);
TownList['Azalea Town'] = new Town(
    'Azalea Town',
    GameConstants.Region.johto,
    [AzaleaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Azalea Town']), new MoveToDungeon(dungeonList['Slowpoke Well'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 33)],
        npcs: [AzaleaOldMan, AzaleaHiker],
    }
);
TownList['Goldenrod City'] = new Town(
    'Goldenrod City',
    GameConstants.Region.johto,
    [GoldenrodDepartmentStoreShop, JohtoBerryMaster, new MoveToDungeon(dungeonList['Radio Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 34)],
        npcs: [BigSpender],
    }
);
TownList['Ecruteak City'] = new Town(
    'Ecruteak City',
    GameConstants.Region.johto,
    [EcruteakCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Ecruteak City']), new MoveToDungeon(dungeonList['Burned Tower']), new MoveToDungeon(dungeonList['Tin Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 37)],
        npcs: [EcruteakBill, EcruteakEusine, EcruteakPokéfan, EcruteakKimonoGirl],
    }
);
TownList['Olivine City'] = new Town(
    'Olivine City',
    GameConstants.Region.johto,
    [OlivineCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Olivine City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 39)],
        npcs: [OlivineSSAquaCaptain],
    }
);
TownList['Cianwood City'] = new Town(
    'Cianwood City',
    GameConstants.Region.johto,
    [CianwoodCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cianwood City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 41)],
        npcs: [CianwoodPhotographyAide],
    }
);
TownList['Mahogany Town'] = new Town(
    'Mahogany Town',
    GameConstants.Region.johto,
    [MahoganyTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mahogany Town']), new MoveToDungeon(dungeonList['Team Rocket\'s Hideout'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.johto, 42),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Mortar')),
        ])],
        npcs: [MahoganySouvenirShopAttendant],
    }
);
TownList['Blackthorn City'] = new Town(
    'Blackthorn City',
    GameConstants.Region.johto,
    [BlackthornCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Blackthorn City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ice Path'))],
        npcs: [BlackthornJohtoRoamerNPC],
    }
);
TownList['Indigo Plateau Johto'] = new Town(
    'Indigo Plateau Johto',
    GameConstants.Region.johto,
    [GymList['Elite Will'], GymList['Elite Koga'], GymList['Elite Bruno2'], GymList['Elite Karen'], GymList['Champion Lance'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.johto, 26),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Johto')),
        ],
    }
);

//Johto Dungeons
TownList['Sprout Tower'] = new DungeonTown(
    'Sprout Tower',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 31)]
);
TownList['Ruins of Alph'] = new DungeonTown(
    'Ruins of Alph',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 32)]
);
TownList['Union Cave'] = new DungeonTown(
    'Union Cave',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 32)]
);
TownList['Slowpoke Well'] = new DungeonTown(
    'Slowpoke Well',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 33)]
);
TownList['Ilex Forest'] = new DungeonTown(
    'Ilex Forest',
    GameConstants.Region.johto,
    [new GymBadgeRequirement(BadgeEnums.Hive)]
);
TownList['Burned Tower'] = new DungeonTown(
    'Burned Tower',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
);
TownList['Tin Tower'] = new DungeonTown(
    'Tin Tower',
    GameConstants.Region.johto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
);
TownList['Whirl Islands'] = new DungeonTown(
    'Whirl Islands',
    GameConstants.Region.johto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
);
TownList['Mt. Mortar'] = new DungeonTown(
    'Mt. Mortar',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
);
TownList['Team Rocket\'s Hideout'] = new DungeonTown(
    'Team Rocket\'s Hideout',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 43)]
);
TownList['Radio Tower'] = new DungeonTown(
    'Radio Tower',
    GameConstants.Region.johto,
    [
        new GymBadgeRequirement(BadgeEnums.Mineral),
        new GymBadgeRequirement(BadgeEnums.Glacier),
    ]
);
TownList['Ice Path'] = new DungeonTown(
    'Ice Path',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 44)]
);
TownList['Dark Cave'] = new DungeonTown(
    'Dark Cave',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 45)]
);
TownList['Victory Road Johto'] = new DungeonTown(
    'Victory Road Johto',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 26)]
);
TownList['Mt. Silver'] = new DungeonTown(
    'Mt. Silver',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 28)]
);

//Hoenn Shops
const OldaleTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.SmallRestore,
]);
const PetalburgCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.Kings_rock,
]);
const RustboroCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.Mystery_egg,
]);
const DewfordTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Lucky_egg,
    ItemList.Fighting_egg,
]);
const SlateportCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.MediumRestore,
    ItemList.Water_egg,
    ItemList.Linking_cord,
]);
const MauvilleCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xClick,
    ItemList.Electric_egg,
    ItemList.Thunder_stone,
    ItemList.Metal_coat,
    ItemList.HatcheryHelperJasmine,
]);
const VerdanturfTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Grass_egg,
    ItemList.Soothe_bell,
]);
const FallarborTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Token_collector,
    ItemList.Moon_stone,
    ItemList.Sun_stone,
]);
const LavaridgeTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xAttack,
    ItemList.Lucky_incense,
    ItemList.Fire_egg,
    ItemList.Fire_stone,
]);
const FortreeCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dowsing_machine,
    ItemList.LargeRestore,
    ItemList.Leaf_stone,
]);
const MossdeepCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.Upgrade,
    ItemList.Prism_scale,
    ItemList.Beldum,
]);
const SootopolisCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_egg,
    ItemList.Lucky_incense,
    ItemList.Water_stone,
]);
const PacifidlogTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.Dowsing_machine,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
]);
const EverGrandeCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Dragon_egg,
    ItemList.Dragon_scale,
]);
// TODO: finalize items and prices
const BattleFrontierShop = new Shop([
    new PokeballItem(GameConstants.Pokeball.Ultraball, 1, GameConstants.Currency.battlePoint),
    new PokeballItem(GameConstants.Pokeball.Masterball, 500, GameConstants.Currency.battlePoint , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.battlePoint]}` }),
    new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 10, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 20, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 40, GameConstants.Currency.battlePoint),
    ItemList.FarmHandJamie,
    ItemList.HatcheryHelperNoel,
]);

//Hoenn Berry Master
const HoennBerryMaster = new BerryMasterShop([
    ItemList.Boost_Mulch,
    ItemList.Rich_Mulch,
    ItemList.Surprise_Mulch,
    ItemList.Amaze_Mulch,
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
    ItemList.Sprinklotad,
    ItemList.FarmHandKerry,
]);

//Hoenn Flute Master
const HoennFluteMaster = new GemMasterShop([]);

//Hoenn NPCs

const LittlerootAide = new NPC('Professor Birch\'s Aide', [
    'We have received word from Mr. Pokémon in Johto! He has made another breakthrough.',
    'You can now store an additional four eggs in the queue! His research has really gained speed.',
    'He wants you to know that he will have an additional eight slots ready by the time you reach Sinnoh.',
]);

const OldaleTrackingScientist = new NPC('Tracking Scientist', [
    'Hey trainer, look at these footprints! Huh, I’ve never seen footprints like these before… They look like they came from two different Pokémon, and I saw two blurs, one red and one blue, quickly fly away just as I exited the Pokémon Center.',
    'They were flying really fast, I bet Pokémon that fast will only challenge trainers who have proven they are as strong as Champion Wallace...',
]);

const SlateportHoennRoamerNPC = new RoamerNPC('Reporter Gabby', [
    'Our sources indicate that roaming Pokémon are gathering on {ROUTE_NAME}!',
], GameConstants.Region.hoenn, RoamingPokemonList.findGroup(GameConstants.Region.hoenn, GameConstants.HoennSubRegions.Hoenn));

const FallarborProfessorCozmo = new NPC('Prof. Cozmo', [
    'Oh! Welcome, welcome. Do you by any chance have any Meteorites? No? Ah well, I’m studying the Pokémon Deoxys and I’ve heard that a Meteorite can cause it to change forms!',
    'I’ve also heard that the Battle Frontier may have some secrets relevant to Deoxys and its forms… but I’m not strong enough to find out...',
]);

const LavaridgeSootCollector = new NPC('Soot Collector', [
    'Blegh! I\'ve taken three soaks in the hot springs and I can still taste the soot!',
    'The Flute Trader in Fallarbor Town has been paying me to go collect soot to make Flutes, but I\'m sick of it.',
    'People say they have truly mystical powers, but that they require Gems of different types to use. Also, using more Flutes at the same time costs more Gems to use.',
]);

const FortreeWeatherman = new NPC('Weatherman', [
    'Castform is a very finicky pokemon.',
    'It changes forms when the weather is drastically different.',
    'If you want to collect them all, wait for the weather to change.',
]);

const FortreeRanger = new NPC('Pokémon Ranger Catherine', [
    'Have you seen this? It\'s horrific. Absolutely despicable.',
    'Disposable Dowsing Machines! Who even came up with this?! People leave these everywhere. It\'s absolutely terrible for the environment. Some poor innocent Pokémon could choke on it!',
    'Please recycle your used Dowsing Machines.',
]);

const MossdeepAstronomer = new NPC('Astronomer', [
    'Hey did you know about the Millennium Comet? We can see it in the sky right now, and it only comes around once every thousand years!',
    'There’s a legend that a mythical Wish Pokémon awakens when it passes over us. If you’re as strong as the Champion, maybe you’ll find it roaming around Hoenn granting wishes!',
]);

const PacifidlogDiver = new NPC('Diver', [
    'Yo! Find any cool stuff in chests lately?',
    'I\'ve heard that if you beat a Dungeon a lot then the stuff you find in chests gets even more awesome.',
]);

const SootopolisWallace = new NPC('Gym Leader Wallace', [
    'The creators of the lands and ocean slumber within the Cave of Origin.',
    'However, they will only awaken when in the presence of a truly great trainer.',
    'You will have to overcome the Pokémon League before you have any chance of encountering them.',
]);

const ProfBirch = new ProfNPC('Prof. Birch',
    GameConstants.Region.hoenn,
    'That\'s another regional Pokédex completed! Fantastic.',
    'I really appreciate being able to see your outstanding progress, thank you! Sinnoh is next up.');

//Hoenn Towns
TownList['Littleroot Town'] = new Town(
    'Littleroot Town',
    GameConstants.Region.hoenn,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
        npcs: [ProfBirch, LittlerootAide],
    }
);
TownList['Oldale Town'] = new Town(
    'Oldale Town',
    GameConstants.Region.hoenn,
    [OldaleTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)],
        npcs: [OldaleTrackingScientist],
    }
);
TownList['Petalburg City'] = new Town(
    'Petalburg City',
    GameConstants.Region.hoenn,
    [PetalburgCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Petalburg City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 102)],
    }
);
TownList['Rustboro City'] = new Town(
    'Rustboro City',
    GameConstants.Region.hoenn,
    [RustboroCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))],
    }
);
TownList['Dewford Town'] = new Town(
    'Dewford Town',
    GameConstants.Region.hoenn,
    [DewfordTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Dewford Town'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))],
    }
);
TownList['Slateport City'] = new Town(
    'Slateport City',
    GameConstants.Region.hoenn,
    [SlateportCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Slateport City'])],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave')),
            new GymBadgeRequirement(BadgeEnums.Knuckle),
        ],
        npcs: [SlateportHoennRoamerNPC],
    }
);
TownList['Mauville City'] = new Town(
    'Mauville City',
    GameConstants.Region.hoenn,
    [MauvilleCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mauville City']), HoennBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    }
);
TownList['Verdanturf Town'] = new Town(
    'Verdanturf Town',
    GameConstants.Region.hoenn,
    [VerdanturfTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Verdanturf Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 117)],
    }
);
TownList['Mt. Chimney'] = new Town(
    'Mt. Chimney',
    GameConstants.Region.hoenn,
    [new MoveToDungeon(dungeonList['Fiery Path']), new MoveToDungeon(dungeonList['Mt. Chimney Crater']), new MoveToDungeon(dungeonList['Jagged Pass']), new MoveToDungeon(dungeonList['Magma Hideout'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 112)],
    }
);
TownList['Fallarbor Town'] = new Town(
    'Fallarbor Town',
    GameConstants.Region.hoenn,
    [FallarborTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fallarbor Town']), HoennFluteMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)],
        npcs: [FallarborProfessorCozmo],
    }
);
TownList['Lavaridge Town'] = new Town(
    'Lavaridge Town',
    GameConstants.Region.hoenn,
    [LavaridgeTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lavaridge Town'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Jagged Pass'))],
    }
);
TownList['Fortree City'] = new Town(
    'Fortree City',
    GameConstants.Region.hoenn,
    [FortreeCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fortree City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))],
        npcs: [FortreeWeatherman, FortreeRanger],
    }
);
TownList['Lilycove City'] = new Town(
    'Lilycove City',
    GameConstants.Region.hoenn,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)],
        npcs: [BigSpender],
    }
);
TownList['Mossdeep City'] = new Town(
    'Mossdeep City',
    GameConstants.Region.hoenn,
    [MossdeepCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mossdeep City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)],
        npcs: [MossdeepAstronomer],
    }
);
TownList['Pacifidlog Town'] = new Town(
    'Pacifidlog Town',
    GameConstants.Region.hoenn,
    [PacifidlogTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pacifidlog Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 131)],
        npcs: [PacifidlogDiver],
    }
);
TownList['Sootopolis City'] = new Town(
    'Sootopolis City',
    GameConstants.Region.hoenn,
    [SootopolisCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Sootopolis City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 126), new GymBadgeRequirement(BadgeEnums.Mind)],
        npcs: [SootopolisWallace],
    }
);
TownList['Ever Grande City'] = new Town(
    'Ever Grande City',
    GameConstants.Region.hoenn,
    [EverGrandeCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Ever Grande City'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Rain)],
    }
);
TownList['Battle Frontier'] = new Town(
    'Battle Frontier',
    GameConstants.Region.hoenn,
    [BattleFrontierShop, new BattleFrontierTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    }
);
TownList['Pokémon League Hoenn'] = new Town(
    'Pokémon League Hoenn',
    GameConstants.Region.hoenn,
    [GymList['Elite Sidney'], GymList['Elite Phoebe'], GymList['Elite Glacia'], GymList['Elite Drake'], GymList['Champion Wallace'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Hoenn')),
        ],
    }
);

//Hoenn Dungeons
TownList['Petalburg Woods'] = new DungeonTown(
    'Petalburg Woods',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 104)]
);
TownList['Rusturf Tunnel'] = new DungeonTown(
    'Rusturf Tunnel',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 116),
        new GymBadgeRequirement(BadgeEnums.Stone),
    ]
);
TownList['Granite Cave'] = new DungeonTown(
    'Granite Cave',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))]
);
TownList['Fiery Path'] = new DungeonTown(
    'Fiery Path',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 112)]
);
TownList['Meteor Falls'] = new DungeonTown(
    'Meteor Falls',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 114)]
);
TownList['Mt. Chimney Crater'] = new DungeonTown(
    'Mt. Chimney Crater',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Meteor Falls'))]
);
TownList['Jagged Pass'] = new DungeonTown(
    'Jagged Pass',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Chimney Crater'))]
);
TownList['New Mauville'] = new DungeonTown(
    'New Mauville',
    GameConstants.Region.hoenn,
    [new GymBadgeRequirement(BadgeEnums.Balance)]
);
TownList['Weather Institute'] = new DungeonTown(
    'Weather Institute',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 119)]
);
TownList['Mt. Pyre'] = new DungeonTown(
    'Mt. Pyre',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 122)]
);
TownList['Magma Hideout'] = new DungeonTown(
    'Magma Hideout',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Pyre'))]
);
TownList['Aqua Hideout'] = new DungeonTown(
    'Aqua Hideout',
    GameConstants.Region.hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Magma Hideout'))]
);
TownList['Shoal Cave'] = new DungeonTown(
    'Shoal Cave',
    GameConstants.Region.hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)]
);
TownList['Cave of Origin'] = new DungeonTown(
    'Cave of Origin',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 126),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seafloor Cavern')),
    ]
);
TownList['Seafloor Cavern'] = new DungeonTown(
    'Seafloor Cavern',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
        new GymBadgeRequirement(BadgeEnums.Mind),
    ]
);
TownList['Sky Pillar'] = new DungeonTown(
    'Sky Pillar',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 131),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Cave of Origin')),
    ]
);
TownList['Victory Road Hoenn'] = new DungeonTown(
    'Victory Road Hoenn',
    GameConstants.Region.hoenn,
    [new GymBadgeRequirement(BadgeEnums.Rain)]
);
TownList['Sealed Chamber'] = new DungeonTown(
    'Sealed Chamber',
    GameConstants.Region.hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 134),
        new GymBadgeRequirement(BadgeEnums.Mind),
    ]
);

//Sinnoh Shops
const SandgemTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.SmallRestore,
]);
const JubilifeCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.Mystery_egg,
]);
const OreburghCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.Moon_stone,
    ItemList.Sun_stone,
]);
const FloaromaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Lucky_egg,
    ItemList.Linking_cord,
    ItemList.Kings_rock,
]);
const EternaCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.Grass_egg,
    ItemList.Leaf_stone,
]);
const HearthomeCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xClick,
    ItemList.MediumRestore,
    ItemList.Fire_egg,
    ItemList.Fire_stone,
    ItemList.Soothe_bell,
]);
const SolaceonTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Shiny_stone,
    ItemList.Dusk_stone,
    ItemList.Dawn_stone,
    ItemList.Spiritomb,
]);
const PastoriaShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.LargeRestore,
    ItemList.Water_egg,
    ItemList.Water_stone,
    ItemList.Prism_scale,
    ItemList.Skorupi,
]);
const CelesticTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.Lucky_incense,
    ItemList.Dragon_egg,
    ItemList.Dragon_scale,
]);
const CanalaveCityShop = new Shop ([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dowsing_machine,
    ItemList.Fighting_egg,
    ItemList.Metal_coat,
]);
const PalParkShop = new Shop([
    ItemList.Razor_claw,
    ItemList.Razor_fang,
    ItemList.Combee,
    ItemList['Burmy (plant)'],
    ItemList.Cherubi,
]);
const SnowpointCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.Upgrade,
]);
const SunyshoreCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_egg,
    ItemList.Lucky_incense,
    ItemList.Electric_egg,
    ItemList.Thunder_stone,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
]);
const FightAreaShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
]);
const SurvivalAreaShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Electirizer,
    ItemList.Magmarizer,
]);
const ResortAreaShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Protector,
    ItemList.Dubious_disc,
    ItemList.Reaper_cloth,
]);

//Sinnoh Berry Master
const SinnohBerryMaster = new BerryMasterShop([
    ItemList.Boost_Mulch,
    ItemList.Rich_Mulch,
    ItemList.Surprise_Mulch,
    ItemList.Amaze_Mulch,
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
    ItemList.FarmHandRiley,
]);

//Sinnoh NPCs

const TwinleafContestChampion = new NPC('Contest Champion', [
    'Welcome to Sinnoh! There are many legends and myths here. For example, it is said that trainers that conquer the Lake nearby, Lake Verity, will meet a mythical Pokémon known for Emotion roaming around the region. It sure would have been awesome to partner with that Pokémon in one of my routines!',
]);

const SandgemBeachcomber = new NPC('Beachcomber', [
    'Hmmm… Oh! Sorry, I didn’t see you there! Sometimes the strangest things wash up on this beach, so I just got caught up in the search.',
    'Just last week a weird blue egg with a red center showed up. I went to go pick it up, but then it hatched! I was so surprised that the little blue Pokémon just hopped right back into the ocean. Who knows, maybe you’ll find it roaming around the region!',
]);

const FloaromaFlowerGirl = new NPC('Flower Girl', [
    'Something amazing just happened!',
    'My friend was taking their Eevee on a walk through Eterna Forest, and it suddenly evolved!',
    'Can you believe that?',
]);

const EternaLassCaroline = new NPC('Lass Caroline', [
    'Oh, you came from the Forest! That Old Chateau is so creepy, isn’t it? I’ve heard that trainers that catch the weird ghost in the TV have found ghosts in other appliances. Even lawnmowers!',
]);

const OreburghConstructionWorker = new NPC('Construction Worker', [
    'I was doing some exploring in Mt. Coronet last week, and my Nosepass gained a lot of levels.',
    'I had a big suprise when he reached level 20 though!',
]);

const HearthomeContestFan = new NPC('Contest Fan', [
    'My favourite contestant had a big reveal for us this week!',
    'Their prized Magneton had evolved into a Magnezone!',
    'I\'m so happy for them, all of that training in Mt. Coronet must have paid off!',
]);

const CelesticGrandma = new NPC('Cynthia\'s Grandmother', [
    'Hello young one, have you come here to learn of Sinnoh’s mysteries?',
    'Did you know that in Johto they don’t see Pokémon like Mamoswine? It’s strange too, because you don’t even need a stone to evolve Piloswine… maybe they should try the Day Care?',
]);

const PalParkWarden = new NPC('Pal Park Warden', [
    'Hey, welcome to the Pal Park! Have you been to my Dad’s Safari Zone in Kanto? We don’t have as many Pokémon here, but I’ve heard that a flower Pokémon found here can bloom when it’s sunny outside!',
]);

const PalParkBurglar = new NPC('Burglar', [
    'A lot of scary stuff can happen at night. For example, I only see people using Razor Claw and Razor Fang at night.',
    'I wonder why that is? Maybe it doesn\'t work during the day?',
]);

const CanalaveRiley = new NPC('Riley', [
    'My partner Lucario evolved from a Riolu during daytime when I used a Soothe Bell.',
]);

const CanalaveYoungBoy = new NPC('Young Boy', [
    'Oh, hello! Say, have you ever heard of Cresselia? Once when I was really little I had a really bad dream I couldn’t wake up from, but then a kind trainer went to an island near here and got help from Cresselia to cure me!',
    'Maybe if you can prove yourself by conquering that island, you could find Cresselia roaming around the region...',
]);

const SnowpointYoungGirl = new NPC('Young Girl', [
    'Someone told me that training an Eevee in Lake Acuity will make it evolve.',
    'They must be lying, how can that be true?!',
]);

const SunyshoreRibbonerJulia = new NPC('Ribboner Julia', [
    'Oh! I don’t get visitors often. My husband is a sailor who visits far away lands… he always tells me these fantastic things.',
    'One time he came back and his Wailmer looked funny. We took it to the Pokécenter and they said it had caught some weird virus called Pokérus!',
    'They said that it is a virus that can spread in the Pokémon Day Care. They said that Pokémon can only spread or catch the virus if they aren’t ready to hatch yet, and that they need to share a type with one another.',
    'If you have a Pokémon with Pokérus, try catching more of that type of Pokémon. When he got back from his next trip, oddly enough Wailmer seemed stronger than ever!',
]);

const FightAreaAceTrainer = new NPC('Ace Trainer Quinn', [
    'Something amazing happened on top of Mt. Coronet. We could see it all the way from here. I\'m sure everyone in the entire region saw it.',
    'What? You were there? What happened? What was that purple thing?',
    'The Distortion World? Hold on, I think I\'ve read about that in an old book in the Canalave City library. But according to that book the only entrance to the Distortion World is hidden deep within Sendoff Spring. This is quite the discovery my friend.',
]);

const SurvivalAreaSinnohRoamerNPC = new RoamerNPC('Hiker Kevin', [
    'I spotted a bunch of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.sinnoh, RoamingPokemonList.findGroup(GameConstants.Region.sinnoh, GameConstants.SinnohSubRegions.Sinnoh));

const ProfRowan = new ProfNPC('Prof. Rowan',
    GameConstants.Region.sinnoh,
    'Congratulations, you\'re more than half-way completed on the national Pokédex!',
    'Next stop is Unova! I\'ve always wanted to visit Castelia City, personally...');



//Sinnoh Towns
TownList['Twinleaf Town'] = new Town(
    'Twinleaf Town',
    GameConstants.Region.sinnoh,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
        npcs: [TwinleafContestChampion],
    }
);
TownList['Sandgem Town'] = new Town(
    'Sandgem Town',
    GameConstants.Region.sinnoh,
    [SandgemTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 201)],
        npcs: [ProfRowan, SandgemBeachcomber],
    }
);
TownList['Jubilife City'] = new Town(
    'Jubilife City',
    GameConstants.Region.sinnoh,
    [JubilifeCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)],
    }
);
TownList['Oreburgh City'] = new Town(
    'Oreburgh City',
    GameConstants.Region.sinnoh,
    [OreburghCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Oreburgh City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Oreburgh Gate'))],
        npcs: [OreburghConstructionWorker],
    }
);
TownList['Floaroma Town'] = new Town(
    'Floaroma Town',
    GameConstants.Region.sinnoh,
    [FloaromaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Floaroma Town'])],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.sinnoh, 204),
            new GymBadgeRequirement(BadgeEnums.Coal),
        ],
        npcs: [FloaromaFlowerGirl],
    }
);
TownList['Eterna City'] = new Town(
    'Eterna City',
    GameConstants.Region.sinnoh,
    [EternaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Eterna City']), new MoveToDungeon(dungeonList['Team Galactic Eterna Building'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Eterna Forest'))],
        npcs: [EternaLassCaroline],
    }
);
TownList['Mt. Coronet'] = new Town(
    'Mt. Coronet',
    GameConstants.Region.sinnoh,
    [new MoveToDungeon(dungeonList['Mt. Coronet South']), new MoveToDungeon(dungeonList['Mt. Coronet North']), new MoveToDungeon(dungeonList['Spear Pillar']), new MoveToDungeon(dungeonList['Hall of Origin'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207)],
    }
);
TownList['Hearthome City'] = new Town(
    'Hearthome City',
    GameConstants.Region.sinnoh,
    [HearthomeCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Hearthome City']), SinnohBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 208)],
        npcs: [HearthomeContestFan],
    }
);
TownList['Solaceon Town'] = new Town(
    'Solaceon Town',
    GameConstants.Region.sinnoh,
    [SolaceonTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Solaceon Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)],
    }
);
TownList['Veilstone City'] = new Town(
    'Veilstone City',
    GameConstants.Region.sinnoh,
    [DepartmentStoreShop, new MoveToDungeon(dungeonList['Team Galactic HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 215)],
        npcs: [BigSpender],
    }
);
TownList['Pastoria City'] = new Town(
    'Pastoria City',
    GameConstants.Region.sinnoh,
    [PastoriaShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pastoria City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213)],
    }
);
TownList['Celestic Town'] = new Town(
    'Celestic Town',
    GameConstants.Region.sinnoh,
    [CelesticTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Celestic Town']), TemporaryBattleList['Galactic Boss Cyrus']],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Fen)],
        npcs: [CelesticGrandma],
    }
);
TownList['Pal Park'] = new Town(
    'Pal Park',
    GameConstants.Region.sinnoh,
    [PalParkShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pal Park'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 221)],
        npcs: [PalParkWarden, PalParkBurglar],
    }
);
TownList['Canalave City'] = new Town(
    'Canalave City',
    GameConstants.Region.sinnoh,
    [CanalaveCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Canalave City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)],
        npcs: [CanalaveRiley, CanalaveYoungBoy],
    }
);
TownList['Snowpoint City'] = new Town(
    'Snowpoint City',
    GameConstants.Region.sinnoh,
    [SnowpointCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Snowpoint City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 217)],
        npcs: [SnowpointYoungGirl],
    }
);
TownList['Sunyshore City'] = new Town(
    'Sunyshore City',
    GameConstants.Region.sinnoh,
    [SunyshoreCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Sunyshore City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 222)],
        npcs: [SunyshoreRibbonerJulia],
    }
);
TownList['Pokémon League Sinnoh'] = new Town(
    'Pokémon League Sinnoh',
    GameConstants.Region.sinnoh,
    [],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh'))],
    }
);
TownList['Fight Area'] = new Town(
    'Fight Area',
    GameConstants.Region.sinnoh,
    [FightAreaShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
        npcs: [FightAreaAceTrainer],
    }
);
TownList['Survival Area'] = new Town(
    'Survival Area',
    GameConstants.Region.sinnoh,
    [SurvivalAreaShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Survival Area'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)],
        npcs: [SurvivalAreaSinnohRoamerNPC],
    }
);
TownList['Resort Area'] = new Town(
    'Resort Area',
    GameConstants.Region.sinnoh,
    [ResortAreaShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Resort Area'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 229)],
    }
);
TownList['Pokémon League Sinnoh'] = new Town(
    'Pokémon League Sinnoh',
    GameConstants.Region.sinnoh,
    [GymList['Elite Aaron'], GymList['Elite Bertha'], GymList['Elite Flint'], GymList['Elite Lucian'], GymList['Champion Cynthia'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh')),
        ],
    }
);

//Sinnoh Dungeons
TownList['Oreburgh Gate'] = new DungeonTown(
    'Oreburgh Gate',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 203)]
);
TownList['Valley Windworks'] = new DungeonTown(
    'Valley Windworks',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 204),
        new GymBadgeRequirement(BadgeEnums.Coal),
    ]
);
TownList['Eterna Forest'] = new DungeonTown(
    'Eterna Forest',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Coal),
    ]
);
TownList['Old Chateau'] = new DungeonTown(
    'Old Chateau',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Forest),
    ]
);
TownList['Team Galactic Eterna Building'] = new DungeonTown(
    'Team Galactic Eterna Building',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Forest)]
);
TownList['Wayward Cave'] = new DungeonTown(
    'Wayward Cave',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 206)]
);
TownList['Mt. Coronet South'] = new DungeonTown(
    'Mt. Coronet South',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207)]
);
TownList['Solaceon Ruins'] = new DungeonTown(
    'Solaceon Ruins',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)]
);
TownList['Iron Island'] = new DungeonTown(
    'Iron Island',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)]
);
TownList['Lake Valor'] = new DungeonTown(
    'Lake Valor',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Mine)]
);
TownList['Lake Verity'] = new DungeonTown(
    'Lake Verity',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Valor'))]
);
TownList['Mt. Coronet North'] = new DungeonTown(
    'Mt. Coronet North',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 211),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Verity')),
    ]
);
TownList['Lake Acuity'] = new DungeonTown(
    'Lake Acuity',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Icicle)]
);
TownList['Team Galactic HQ'] = new DungeonTown(
    'Team Galactic HQ',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Acuity'))]
);
TownList['Spear Pillar'] = new DungeonTown(
    'Spear Pillar',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic HQ'))]
);
TownList['Distortion World'] = new DungeonTown(
    'Distortion World',
    GameConstants.Region.sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Spear Pillar'))]
);
TownList['Victory Road Sinnoh'] = new DungeonTown(
    'Victory Road Sinnoh',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223)]
);
TownList['Sendoff Spring'] = new DungeonTown(
    'Sendoff Spring',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Hall of Origin'] = new DungeonTown(
    'Hall of Origin',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Fullmoon Island'] = new DungeonTown(
    'Fullmoon Island',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Newmoon Island'] = new DungeonTown(
    'Newmoon Island',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Flower Paradise'] = new DungeonTown(
    'Flower Paradise',
    GameConstants.Region.sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 224),
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
    ]
);
TownList['Stark Mountain'] = new DungeonTown(
    'Stark Mountain',
    GameConstants.Region.sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 227)]
);
TownList['Snowpoint Temple'] = new DungeonTown(
    'Snowpoint Temple',
    GameConstants.Region.sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);

//Unova Shops
const FloccesyTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.SmallRestore,
    ItemList.Mystery_egg,
]);
const VirbankCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.MediumRestore,
]);
const CasteliaCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xAttack,
    ItemList.Water_egg,
    ItemList.Linking_cord,
    ItemList.Kings_rock,
]);
const NimbasaCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Grass_egg,
    ItemList.Electric_egg,
    ItemList.Metal_coat,
]);
const DriftveilCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.Razor_claw,
    ItemList.Razor_fang,
    ItemList.Zorua,
]);
const MistraltonCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.LargeRestore,
    ItemList.Thunder_stone,
    ItemList.Upgrade,
]);
const LentimasTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_egg,
    ItemList.Fire_egg,
]);
const UndellaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
]);
const LacunosaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.Lucky_incense,
    ItemList.Fighting_egg,
]);
const OpelucidCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dowsing_machine,
    ItemList.Dragon_egg,
    ItemList.Dragon_scale,
]);
const HumilauCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.Prism_scale,
]);
const IcirrusCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Protector,
    ItemList.Dubious_disc,
    ItemList.Reaper_cloth,
]);
const BlackAndWhiteParkShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Moon_stone,
    ItemList.Sun_stone,
]);
const NacreneCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Soothe_bell,
]);
const StriatonCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Leaf_stone,
    ItemList.Fire_stone,
    ItemList.Water_stone,
]);
const AccumulaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Shiny_stone,
    ItemList.Dusk_stone,
    ItemList.Dawn_stone,
]);
const NuvemaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Electirizer,
    ItemList.Magmarizer,
]);
const AnvilleTownShop = new Shop([
    ItemList['Meloetta (pirouette)'],
]);

//Unova Gem Master
const UnovaFluteMaster = new GemMasterShop([]);

//Unova NPCs

const ExcitedChild = new NPC('Excited Child', [
    'Did you hear? Did you see? It was on TV!',
    'I was just watching my favorite show, The National Gymquirer. It was a live segment! Some hot shot trainer from Kanto defeated Drayden! It was amazing! That trainer is so cool! Drayden is like unbeatable.',
    'Then my programme got interrupted by an emergency broadcast. A report on the first confirmed sightings of Tornadus and Thundurus in over twenty-five years! I\'ve read so much about them, they are my favorites.',
    'Last time they were spotted they just roamed around, causing all kinds of mischief. According to my books anyway. I\'m sure that amazing trainer from the TV will want to catch these mighty forces of nature.',
]);

const CasteliaMusician = new NPC('Musician', [
    'Sup. Ya like jazz? No? Well then you should check out me and my band at the Sonata Cafe where we never play Jazz.',
    'Sometimes a cool singing Pokémon shows up and joins in on our set. I’ve heard that trainers as strong as the Champion have found it roaming around the region looking for Pokémon battles… but even I wouldn’t challenge it to a Music battle.',
]);

const NimbasaExplorer = new NPC('Explorer', [
    'Whew! The desert is rough out there, glad you\'ve made it all the way to Nimbasa.',
    'Sometimes I find some weird stuff out in the sand, sometimes even Pokémon hiding in Chests. Like this one time in Relic Castle, I found a Pokémon that looks like a statue that I\'ve never seen before!',
]);

const IcirrusFanClubChairman = new NPC('Fan Club Chairman', [
    'Legends say Kyurem is missing a part of itself. It is waiting for a hero to fill in the missing parts of its body with Truth or Ideals.',
    'The legendary dragons of Dragonspiral Tower are said to embody these very concepts. They sometimes leave a piece of their DNA behind after a battle.',
    'If you have DNA splicers, perhaps you can make Kyurem whole again.',
    'I\'ve never seen it, but supposedly it works just like any evolution stone.',
]);

const P2LaboratoryColress = new NPC('Colress', [
    'So you defeated Ghetsis. Interesting. You must be a very strong trainer.',
    'A rare Pokémon is hiding somewhere inside this abandoned laboratory. You can catch it if you want. I have no interest in it.',
    'However, I do have an interest in you! I want to taste your power. Defeat me, and I\'ll let you search for the rare Pokémon.',
    'I\'ll be waiting for you inside.',
],
{ requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'), GameConstants.AchievementOption.less ) });

const UnovaRoamerNPC = new RoamerNPC('Professor Juniper\'s Aide', [
    'Our research indicates a higher concentration of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.unova, RoamingPokemonList.findGroup(GameConstants.Region.unova, GameConstants.UnovaSubRegions.Unova));

const ProfJuniper = new ProfNPC('Prof. Juniper',
    GameConstants.Region.unova,
    'Let me see your progress...Ah, fantastic, as usual!',
    'Allow me some time to arrange tickets for your next destination.');

//Unova Towns
TownList['Aspertia City'] = new Town(
    'Aspertia City',
    GameConstants.Region.unova,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
        npcs: [],
    }
);
TownList['Floccesy Town'] = new Town(
    'Floccesy Town',
    GameConstants.Region.unova,
    [FloccesyTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 19)],
    }
);
TownList['Virbank City'] = new Town(
    'Virbank City',
    GameConstants.Region.unova,
    [VirbankCityShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Basic)],
    }
);
TownList['Castelia City'] = new Town(
    'Castelia City',
    GameConstants.Region.unova,
    [CasteliaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Castelia City']), new MoveToDungeon(dungeonList['Castelia Sewers'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Toxic)],
        npcs: [CasteliaMusician],
    }
);
TownList['Nimbasa City'] = new Town(
    'Nimbasa City',
    GameConstants.Region.unova,
    [NimbasaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Nimbasa City'])],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 4),
            new GymBadgeRequirement(BadgeEnums.Insect),
        ],
        npcs: [NimbasaExplorer],
    }
);
TownList['Driftveil City'] = new Town(
    'Driftveil City',
    GameConstants.Region.unova,
    [DriftveilCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Driftveil City'])],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova,5),
            new GymBadgeRequirement(BadgeEnums.Bolt),
        ],
    }
);
TownList['Mistralton City'] = new Town(
    'Mistralton City',
    GameConstants.Region.unova,
    [MistraltonCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mistralton City'])],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Chargestone Cave')),
            new GymBadgeRequirement(BadgeEnums.Quake),
        ],
    }
);
TownList['Lentimas Town'] = new Town(
    'Lentimas Town',
    GameConstants.Region.unova,
    [LentimasTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lentimas Town'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Jet)],
    }
);
TownList['Undella Town'] = new Town(
    'Undella Town',
    GameConstants.Region.unova,
    [UndellaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Undella Town']), UnovaFluteMaster],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    }
);
TownList['Lacunosa Town'] = new Town(
    'Lacunosa Town',
    GameConstants.Region.unova,
    [LacunosaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lacunosa Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 13)],
    }
);
TownList['Opelucid City'] = new Town(
    'Opelucid City',
    GameConstants.Region.unova,
    [OpelucidCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Opelucid City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 11)],
    }
);
TownList['Shopping Mall Nine'] = new Town(
    'Shopping Mall Nine',
    GameConstants.Region.unova,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 9)],
    }
);
TownList['Humilau City'] = new Town(
    'Humilau City',
    GameConstants.Region.unova,
    [HumilauCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Humilau City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 21)],
        npcs: [ExcitedChild],
    }
);
TownList['Icirrus City'] = new Town(
    'Icirrus City',
    GameConstants.Region.unova,
    [IcirrusCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Icirrus City'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.unova, 8),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
        ])],
        npcs: [IcirrusFanClubChairman],
    }
);
TownList['Black and White Park'] = new Town(
    'Black and White Park',
    GameConstants.Region.unova,
    [BlackAndWhiteParkShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Black and White Park'])],
    {
        requirements: [new OneFromManyRequirement([
            new MultiRequirement([
                new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
                new RouteKillRequirement(10, GameConstants.Region.unova, 14),
            ]),
            new RouteKillRequirement(10, GameConstants.Region.unova, 15),
        ])],
    }
);
TownList['Nacrene City'] = new Town(
    'Nacrene City',
    GameConstants.Region.unova,
    [NacreneCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Nacrene City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinwheel Forest'))],
    }
);
TownList['Striaton City'] = new Town(
    'Striaton City',
    GameConstants.Region.unova,
    [StriatonCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Striaton City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 3)],
    }
);
TownList['Accumula Town'] = new Town(
    'Accumula Town',
    GameConstants.Region.unova,
    [AccumulaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Accumula Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 2)],
    }
);
TownList['Nuvema Town'] = new Town(
    'Nuvema Town',
    GameConstants.Region.unova,
    [NuvemaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Nuvema Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 1)],
        npcs: [ProfJuniper, UnovaRoamerNPC],
    }
);
TownList['Anville Town'] = new Town(
    'Anville Town',
    GameConstants.Region.unova,
    [AnvilleTownShop],
    {
        requirements: [
            new ObtainedPokemonRequirement(pokemonMap['Meloetta (aria)']),
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
        ],
    }
);
TownList['Pokémon League Unova'] = new Town(
    'Pokémon League Unova',
    GameConstants.Region.unova,
    [GymList['Elite Shauntal'], GymList['Elite Marshal'], GymList['Elite Grimsley'], GymList['Elite Caitlin'], GymList['Champion Iris'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 23),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova')),
        ],
    }
);

//Unova Dungeons
TownList['Pledge Grove'] = new DungeonTown(
    'Pledge Grove',
    GameConstants.Region.unova,
    [
        new ObtainedPokemonRequirement(pokemonMap.Keldeo),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Moor of Icirrus')),
    ]
);
TownList['Floccesy Ranch'] = new DungeonTown(
    'Floccesy Ranch',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 20)]
);
TownList['Liberty Garden'] = new DungeonTown(
    'Liberty Garden',
    GameConstants.Region.unova,
    //Victini dungeon, maybe unlock later
    [new GymBadgeRequirement(BadgeEnums.Toxic)]
);
TownList['Castelia Sewers'] = new DungeonTown(
    'Castelia Sewers',
    GameConstants.Region.unova,
    [new GymBadgeRequirement(BadgeEnums.Toxic)]
);
TownList['Relic Passage'] = new DungeonTown(
    'Relic Passage',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 5),
        new GymBadgeRequirement(BadgeEnums.Bolt),
    ]
);
TownList['Relic Castle'] = new DungeonTown(
    'Relic Castle',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 25)]
);
TownList['Lostlorn Forest'] = new DungeonTown(
    'Lostlorn Forest',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 16)]
);
TownList['Chargestone Cave'] = new DungeonTown(
    'Chargestone Cave',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 6)]
);
TownList['Mistralton Cave'] = new DungeonTown(
    'Mistralton Cave',
    GameConstants.Region.unova,
    [
        new GymBadgeRequirement(BadgeEnums.Quake),
        new RouteKillRequirement(10, GameConstants.Region.unova, 6),
    ]
);
TownList['Celestial Tower'] = new DungeonTown(
    'Celestial Tower',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 7)]
);
TownList['Reversal Mountain'] = new DungeonTown(
    'Reversal Mountain',
    GameConstants.Region.unova,
    [new GymBadgeRequirement(BadgeEnums.Jet)]
);
TownList['Team Plasma Assault'] = new DungeonTown(
    'Team Plasma Assault',
    GameConstants.Region.unova,
    [
        new GymBadgeRequirement(BadgeEnums.Legend),
    ]
);
TownList['Seaside Cave'] = new DungeonTown(
    'Seaside Cave',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 24),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Plasma Assault')),
    ]
);
TownList['Plasma Frigate'] = new DungeonTown(
    'Plasma Frigate',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 22),
        new GymBadgeRequirement(BadgeEnums.Wave),
    ]
);
TownList['Giant Chasm'] = new DungeonTown(
    'Giant Chasm',
    GameConstants.Region.unova,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Plasma Frigate'))]
);
TownList['Cave of Being'] = new DungeonTown(
    'Cave of Being',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 23)]
);
TownList['Abundant Shrine'] = new DungeonTown(
    'Abundant Shrine',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 23),
        new RouteKillRequirement(10, GameConstants.Region.unova, 14),
        new ObtainedPokemonRequirement(pokemonMap.Tornadus),
        new ObtainedPokemonRequirement(pokemonMap.Thundurus),
    ]
);
TownList['Victory Road Unova'] = new DungeonTown(
    'Victory Road Unova',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 23)]
);
TownList['Twist Mountain'] = new DungeonTown(
    'Twist Mountain',
    GameConstants.Region.unova,
    [new OneFromManyRequirement([
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
            new RouteKillRequirement(10, GameConstants.Region.unova, 7),
        ]),
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
    ])]
);
TownList['Dragonspiral Tower'] = new DungeonTown(
    'Dragonspiral Tower',
    GameConstants.Region.unova,
    [new OneFromManyRequirement([
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
    ])]
);
TownList['Moor of Icirrus'] = new DungeonTown(
    'Moor of Icirrus',
    GameConstants.Region.unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
        new ObtainedPokemonRequirement(pokemonMap.Cobalion),
        new ObtainedPokemonRequirement(pokemonMap.Terrakion),
        new ObtainedPokemonRequirement(pokemonMap.Virizion),
    ]
);
TownList['Pinwheel Forest'] = new DungeonTown(
    'Pinwheel Forest',
    GameConstants.Region.unova,
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TownList.Dreamyard = new DungeonTown(
    'Dreamyard',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 3)]
);
TownList['P2 Laboratory'] = new DungeonTown(
    'P2 Laboratory',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 17)],
    [],
    [P2LaboratoryColress]
);

//Kalos Shops
const AquacordeTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.SmallRestore,
]);
const SantaluneCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.Mystery_egg,
]);
const FriseurFurfrouShop = new Shop([
    ItemList['Furfrou (Debutante)'],
    ItemList['Furfrou (Diamond)'],
    ItemList['Furfrou (Matron)'],
    ItemList['Furfrou (Dandy)'],
    ItemList['Furfrou (Kabuki)'],
    ItemList['Furfrou (Pharaoh)'],
], 'Friseur Furfrou');
const CamphrierTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xAttack,
    ItemList.MediumRestore,
    ItemList.Electric_egg,
    ItemList.Thunder_stone,
]);
const AmbretteTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Water_egg,
    ItemList.Water_stone,
]);
const CyllageCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.Upgrade,
    ItemList.Prism_scale,
]);
const GeosengeTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xClick,
    ItemList.Fire_egg,
    ItemList.Fire_stone,
    ItemList.Kings_rock,
]);
const ShalourCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Fighting_egg,
    ItemList.Linking_cord,
    ItemList.Metal_coat,
]);
const CoumarineCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.LargeRestore,
    ItemList.Grass_egg,
    ItemList.Leaf_stone,
    ItemList.Electirizer,
    ItemList.Magmarizer,
]);
const LaverreCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.Lucky_incense,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
    ItemList.Sachet,
    ItemList.Whipped_dream,
]);
const DendemilleTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dowsing_machine,
    ItemList.Shiny_stone,
    ItemList.Dusk_stone,
    ItemList.Dawn_stone,
]);
const AnistarCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Moon_stone,
    ItemList.Sun_stone,
    ItemList.Razor_claw,
    ItemList.Razor_fang,
]);
const CouriwayTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Dragon_egg,
    ItemList.Dragon_scale,
]);
const SnowbelleCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Protector,
    ItemList.Dubious_disc,
    ItemList.Reaper_cloth,
]);

//Kalos NPCs

const LumioseEngineer = new NPC('Engineer', [
    'I\'m glad to be back in the city after so long at the Power Plant; it\'s so dusty out there!.',
    'Rumor has it that if you conquer the Kalos Power Plant enough times that a strong Pokémon will challenge you made of Fire and Water. But I bet you’d have to be the Champion before it finds you worthy… I certainly have never seen it!',
]);

const CamphrierFlabébéEnthusiast = new NPC('Flabébé Enthusiast', [
    'Ah, isn\'t Flabébé such an eye-catching Pokémon? All these different lovely colors…',
    'If you\'re searching for the yellow and blue kinds, look no further than the Farm!',
    'They simply can\'t resist berries that match their colors - just plant a few and they\'ll soon come wandering in.',
]);

const CoumarineBirdwatcher = new NPC('Birdwatcher', [
    'I\'ve heard there is a cave you can find if you go out on the ocean a little ways.',
    'Apparently defeating a strong creature there unleashes some energy.',
    'There are rumors that the energy calls some legendary birds to roam Kalos!',
]);

const LaverreFurisodeGirlKatherine = new NPC('Furisode Girl Katherine', [
    'Don\'t you find Goomy to be an interesting Pokémon? I certainly think so, even though it isn\'t a problem for my Pokémon~',
    'I\'ve heard its evolutionary line loves damp conditions, and apparently if you train a Sliggoo during rainy or foggy weather something marvelous happens!',
]);

const AnistarKalosRoamerNPC = new RoamerNPC('Hex Maniac Melanie', [
    'The spirits tell me roaming Pokémon have been spotted on {ROUTE_NAME}!',
], GameConstants.Region.kalos, RoamingPokemonList.findGroup(GameConstants.Region.kalos, GameConstants.KalosSubRegions.Kalos));

const KiloudeConfusedHiker = new NPC('Confused Hiker', [
    'Whoa! What the- Where am I? How did I get here? Last thing I can remember I was in Reflection Cave when this little Pokémon with hoops threw something at me… Oh you’ve beaten the Pokémon League? Maybe you can find it roaming around the region so you can tame that little prankster. Now how am I gonna get home…',
]);

const ProfSycamore = new ProfNPC('Prof. Sycamore',
    GameConstants.Region.kalos,
    'You\'re encountering Pokémon at a really good clip, aren\'t you? Congratulations! You completed the Pokédex!',
    'Onward to Alola, shall we?');

//Kalos Towns

TownList['Vaniville Town'] = new Town(
    'Vaniville Town',
    GameConstants.Region.kalos,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
        npcs: [],
    }
);
TownList['Aquacorde Town'] = new Town(
    'Aquacorde Town',
    GameConstants.Region.kalos,
    [AquacordeTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 1)],
    }
);
TownList['Santalune City'] = new Town(
    'Santalune City',
    GameConstants.Region.kalos,
    [SantaluneCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)],
    }
);
TownList['Lumiose City'] = new Town(
    'Lumiose City',
    GameConstants.Region.kalos,
    [DepartmentStoreShop,FriseurFurfrouShop, TemporaryBattleList.AZ],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)],
        npcs: [ProfSycamore, LumioseEngineer],
    }
);
TownList['Camphrier Town'] = new Town(
    'Camphrier Town',
    GameConstants.Region.kalos,
    [CamphrierTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Camphrier Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)],
        npcs: [CamphrierFlabébéEnthusiast],
    }
);
TownList['Ambrette Town'] = new Town(
    'Ambrette Town',
    GameConstants.Region.kalos,
    [AmbretteTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Ambrette Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 8)],
    }
);
TownList['Cyllage City'] = new Town(
    'Cyllage City',
    GameConstants.Region.kalos,
    [CyllageCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cyllage City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glittering Cave'))],
    }
);
TownList['Geosenge Town'] = new Town(
    'Geosenge Town',
    GameConstants.Region.kalos,
    [GeosengeTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Geosenge Town']), new MoveToDungeon(dungeonList['Team Flare Secret HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 10)],
    }
);
TownList['Shalour City'] = new Town(
    'Shalour City',
    GameConstants.Region.kalos,
    [ShalourCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Shalour City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))],
    }
);
TownList['Coumarine City'] = new Town(
    'Coumarine City',
    GameConstants.Region.kalos,
    [CoumarineCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Coumarine City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)],
        npcs: [CoumarineBirdwatcher],
    }
);
TownList['Laverre City'] = new Town(
    'Laverre City',
    GameConstants.Region.kalos,
    [LaverreCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Laverre City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 14)],
        npcs: [LaverreFurisodeGirlKatherine],
    }
);
TownList['Dendemille Town'] = new Town(
    'Dendemille Town',
    GameConstants.Region.kalos,
    [DendemilleTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Dendemille Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)],
    }
);
TownList['Anistar City'] = new Town(
    'Anistar City',
    GameConstants.Region.kalos,
    [AnistarCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Anistar City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)],
        npcs: [AnistarKalosRoamerNPC],
    }
);
TownList['Couriway Town'] = new Town(
    'Couriway Town',
    GameConstants.Region.kalos,
    [CouriwayTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Couriway Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)],
    }
);
TownList['Snowbelle City'] = new Town(
    'Snowbelle City',
    GameConstants.Region.kalos,
    [SnowbelleCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Snowbelle City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)],
    }
);
TownList['Kiloude City'] = new Town(
    'Kiloude City',
    GameConstants.Region.kalos,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [KiloudeConfusedHiker],
    }
);
TownList['Pokémon League Kalos'] = new Town(
    'Pokémon League Kalos',
    GameConstants.Region.kalos,
    [GymList['Elite Malva'], GymList['Elite Siebold'], GymList['Elite Wikstrom'], GymList['Elite Drasna'], GymList['Champion Diantha'], pokeLeagueShop()],
    {
        requirements: [
            new OneFromManyRequirement([
                new RouteKillRequirement(10, GameConstants.Region.kalos, 21),
                new RouteKillRequirement(10, GameConstants.Region.kalos, 22),
            ]),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Kalos')),
        ],
    }
);

//Kalos Dungeons
TownList['Santalune Forest'] = new DungeonTown(
    'Santalune Forest',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 2)]
);
TownList['Parfum Palace'] = new DungeonTown(
    'Parfum Palace',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 6)]
);
TownList['Connecting Cave'] = new DungeonTown(
    'Connecting Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 7)]
);
TownList['Glittering Cave'] = new DungeonTown(
    'Glittering Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 9)]
);
TownList['Reflection Cave'] = new DungeonTown(
    'Reflection Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 11)]
);
//Tower of Mastery?
TownList['Sea Spirit\'s Den'] = new DungeonTown(
    'Sea Spirit\'s Den',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 23)]
);
TownList['Pokéball Factory'] = new DungeonTown(
    'Pokéball Factory',
    GameConstants.Region.kalos,
    [new GymBadgeRequirement(BadgeEnums.Fairy)]
);
TownList['Kalos Power Plant'] = new DungeonTown(
    'Kalos Power Plant',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 13), new GymBadgeRequirement(BadgeEnums.Plant)]
);
TownList['Lost Hotel'] = new DungeonTown(
    'Lost Hotel',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
);
TownList['Frost Cavern'] = new DungeonTown(
    'Frost Cavern',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
);
TownList['Team Flare Secret HQ'] = new DungeonTown(
    'Team Flare Secret HQ',
    GameConstants.Region.kalos,
    [new GymBadgeRequirement(BadgeEnums.Psychic)]
);
TownList['Terminus Cave'] = new DungeonTown(
    'Terminus Cave',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
);
TownList['Pokémon Village'] = new DungeonTown(
    'Pokémon Village',
    GameConstants.Region.kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 20)]
);
TownList['Victory Road Kalos'] = new DungeonTown(
    'Victory Road Kalos',
    GameConstants.Region.kalos,
    [
        new GymBadgeRequirement(BadgeEnums.Iceberg),
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kalos, 21),
            new RouteKillRequirement(10, GameConstants.Region.kalos, 22),
        ]),
    ]
);
//Unknown Cave?

//Alola Shops

const IkiTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.SmallRestore,
]);
const HauoliCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Token_collector,
    ItemList.Lucky_egg,
    ItemList.Mystery_egg,
    ItemList.Shiny_stone,
    ItemList.Dusk_stone,
    ItemList.Dawn_stone,
]);
const HeaheaCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.xAttack,
    ItemList.MediumRestore,
    ItemList.Water_stone,
    ItemList.Kings_rock,
    ItemList.Metal_coat,
]);
const PaniolaTownShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Lucky_egg,
    ItemList.Grass_egg,
    ItemList.Fire_egg,
    ItemList.Water_egg,
]);
const KonikoniCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
    ItemList.Fire_stone,
    ItemList.Linking_cord,
    ItemList.Soothe_bell,
]);
const AetherParadiseShop = new Shop([
    ItemList.Upgrade,
    ItemList['Type: Null'],
]);
const MalieCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.LargeRestore,
    ItemList.Thunder_stone,
    ItemList.Electric_egg,
    ItemList.Electirizer,
    ItemList.Magmarizer,
]);
const TapuVillageShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_egg,
    ItemList.Razor_claw,
    ItemList.Razor_fang,
    ItemList.Ice_stone,
]);
const SeafolkVillageShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
    ItemList.Fighting_egg,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
    ItemList.Prism_scale,
    ItemList.Sachet,
    ItemList.Whipped_dream,
]);
const ExeggutorIslandShop = new Shop([
    ItemList.Dragon_egg,
    ItemList.Leaf_stone,
    ItemList.Dragon_scale,
    ItemList.Protector,
    ItemList.Dubious_disc,
    ItemList.Reaper_cloth,
]);
const AltaroftheSunneandMooneShop = new Shop([
    ItemList.Moon_stone,
    ItemList.Sun_stone,
    ItemList.Poipole,
]);

//Alola NPCs

const IkiOutskirtsMom = new NPC('Scratch Cat Girl', [
    'I love cats very much, but dogs aren\'t so bad either.',
    'Out of all the doglike Pokémon, I think Rockruff is definitely the most adorable. And it even has three evolutions! One during the day, one at night and one in between, from 5 to 6 o\'clock.',
    'What\'s that? AM or PM?',
    'Yes.',
]);
const KukuisLabProfessor = new NPC('Professor Kukui', [
    'Are you looking for some rare Pokémon? Maybe I can help with that. Ask away!',
    'Ultra Beast? Never heard of it. I have no idea what that is. As far as I know they simply do not exist.',
    'Meltan? What\'s a Meltan? Nope, don\'t know about that one either.',
    'You seem very sure about this. Look, if you\'re so certain that these things you are talking about are real, I\'m sure they will show up sooner or later. If you\'re patient...',
    'You got me all excited. We\'ll WAIT FOR these new rare Pokémon together. Hold on, let me just UPDATE my calendar. Just to be sure I\'m free to investigate these new Pokémon that only you know about when they show up. I wouldn\'t miss this for the world.',
]);
const IkiKahuna = new NPC('Kahuna Hala', [
    'Welcome to Alola!',
    'Here we don\'t have gyms. We have the Island Challenge. On each of our four islands you will complete one or more trials.',
    'After completing all of an island\'s trials, you will battle that island\'s Kahuna in a Grand trial.',
    'This island only has one trial: Captain Ilima\'s trial in Verdant Cavern, below the Melemele Woods. Come back here after clearing that challenge for your Grand trial battle.',
]);
const HeaheaCafeOwner = new NPC('Café Owner', [
    'Akala Island has three trials.',
    'Captain Lana\'s trial in Brooklet Hill, Captain Kiawe\'s trial in Wela Volcano Park and Captain Mallow\'s trial in Lush Jungle.',
    'For what it\'s worth, I say don\'t go to any of those places. Too wet, too hot and too... jungly. Why not stay here? Have a coffee! Enjoy the city!',
    'Or go to Konikoni City down south. You might even meet our Kahuna there!',
]);
const PaniolaTownActor = new NPC('Actor Meredith', [
    'I love Oricorio. I can tell you all about it!',
    'Each of the four islands in Alola has its own meadow, and each meadow has its own form of Oricorio. Each island, except for Akala Island. So you\'d think there\'s only three forms of Oricorio, right?',
    'Wrong! There is a fourth! Did you know you can find all of the Oricorio forms on the farm? One of them doesn\'t appear anywhere else!',
    'Each Oricorio form is attracted to the berry color that matches its own style. Red for Baile style, yellow for Pom-Pom style, pink for Pa\'u style and purple for Sensu style.',
    'You want to know which one can only be found on the farm? I\'m sure you can figure that out yourself. Simple process of elimination, really.',
]);
const RoyalAvenueSpectator = new NPC('Spectator', [
    'I think battles in the Battle Royal Dome are more like games of chance. But Battle Royals are nothing compared to trying to evolve an Alolan Raichu with a Thunderstone.',
    'Evolving Pikachu or Exeggcute in Alola can result in a new form! Sometimes.',
]);
const KonikoniKahuna = new NPC('Kahuna Olivia', [
    'What do you mean Grand trials are just like gym battles? It\'s a totally different thing!',
    'Come fight me in our very special and unique brand new Pokémon League and see if you still think our Island Challenge is nothing special!',
]);
const MalieKahuna = new NPC('Kahuna Nanu', [
    'A trial-goer, huh? Figures.',
    'Just go clear Captain Sophocles\' trial at the Hokulani Observatory and Captain Acerola\'s Trial at the Thrifty Megamart. And take care of those Team Skull punks in Po Town while you\'re at it.',
    'Then come back here so we can get this Grand trial over with.',
]);
const TapuWorker = new NPC('Worker', [
    'Yesterday was my first day working on Mount Lanakila. I was up there maintaining the paths to the new Pokémon League.',
    'My trusty Crabrawler was with me. He was smashing some rocks that were blocking the path, having a grand ol\' time like usual, when suddenly we were attacked by a wild Pokémon!',
    'After the battle, Crabrawler evolved! I didn\'t even know he could do that. He\'s so different now. But I still love him. He\'s my best friend, and he\'s even better at rock smashing now!',
]);
const SeafolkCaptain = new NPC('Captain Mina', [
    'My trial is in this town. Right there, inside my very own houseboat. However, I want you to clear the trial in Vast Poni Canyon first. It has no Captain, so you\'ll be all on your own. Be careful.',
    'If you can clear my trial you\'ll find our Kahuna on Exeggutor Island.',
]);
const AetherParadiseAlolaRoamerNPC = new RoamerNPC('Assistant Branch Chief Wicke', [
    'Some very rare Pokémon have been sighted on {ROUTE_NAME}. I hope we can learn more about them.',
], GameConstants.Region.alola, RoamingPokemonList.findGroup(GameConstants.Region.alola, GameConstants.AlolaSubRegions.AkalaIsland));
const ProfKukui = new ProfNPC('Prof. Kukui',
    GameConstants.Region.alola,
    'TODO',
    'TODO');

//Alola Towns

TownList['Iki Town Outskirts'] = new Town(
    'Iki Town Outskirts',
    GameConstants.Region.alola,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [IkiOutskirtsMom],
    }
);
TownList['Iki Town'] = new Town(
    'Iki Town',
    GameConstants.Region.alola,
    [IkiTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
        npcs: [IkiKahuna],
    }
);
TownList['Professor Kukui\'s Lab'] = new Town(
    'Professor Kukui\'s Lab',
    GameConstants.Region.alola,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 18)],
        npcs: [KukuisLabProfessor/*ProfKukui*/], // TODO: replace the NPC when all pokemons are catchable
    }
);
TownList['Hau\'oli City'] = new Town(
    'Hau\'oli City',
    GameConstants.Region.alola,
    [HauoliCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Hau\'oli City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Trainers\' School'))],
    }
);
TownList['Melemele Woods'] = new Town(
    'Melemele Woods',
    GameConstants.Region.alola,
    [new MoveToDungeon(dungeonList['Verdant Cavern']), new MoveToDungeon(dungeonList['Melemele Meadow']), new MoveToDungeon(dungeonList['Ruins of Conflict'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 2)],
    }
);
//TODO: Change requirement when UB questline is merged.
TownList['Roadside Motel'] = new Town(
    'Roadside Motel',
    GameConstants.Region.alola,
    [],
    {
        // requirements: [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
        requirements: [new NullRequirement()],
    }
);
TownList['Heahea City'] = new Town(
    'Heahea City',
    GameConstants.Region.alola,
    [HeaheaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Heahea City']), new DockTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
        npcs: [HeaheaCafeOwner],
    }
);
TownList['Paniola Town'] = new Town(
    'Paniola Town',
    GameConstants.Region.alola,
    [PaniolaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Paniola Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 4)],
        npcs: [PaniolaTownActor],
    }
);
TownList['Royal Avenue'] = new Town(
    'Royal Avenue',
    GameConstants.Region.alola,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
        npcs: [RoyalAvenueSpectator],
    }
);
TownList['Konikoni City'] = new Town(
    'Konikoni City',
    GameConstants.Region.alola,
    [KonikoniCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Konikoni City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
        npcs: [KonikoniKahuna],
    }
);
TownList['Aether Paradise'] = new Town(
    'Aether Paradise',
    GameConstants.Region.alola,
    [TemporaryBattleList['Ultra Wormhole'], AetherParadiseShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Aether Paradise']), new MoveToDungeon(dungeonList['Aether Foundation'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
        npcs: [AetherParadiseAlolaRoamerNPC],
    }
);
TownList['Malie City'] = new Town(
    'Malie City',
    GameConstants.Region.alola,
    [MalieCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Malie City']), new DockTownContent()],
    {
        requirements: [new TemporaryBattleRequirement('Ultra Wormhole')],
        npcs: [MalieKahuna],
    }
);
TownList['Tapu Village'] = new Town(
    'Tapu Village',
    GameConstants.Region.alola,
    [TapuVillageShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Tapu Village']), TemporaryBattleList['Kahuna Nanu']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 13)],
        npcs: [TapuWorker],
    }
);
TownList['Seafolk Village'] = new Town(
    'Seafolk Village',
    GameConstants.Region.alola,
    [SeafolkVillageShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Seafolk Village']), new MoveToDungeon(dungeonList['Mina\'s Houseboat']), TemporaryBattleList['Captain Mina']],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation'))],
        npcs: [SeafolkCaptain],
    }
);
TownList['Exeggutor Island'] = new Town(
    'Exeggutor Island',
    GameConstants.Region.alola,
    [ExeggutorIslandShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Exeggutor Island']), new MoveToDungeon(dungeonList['Exeggutor Island Hill'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    }
);
TownList['Altar of the Sunne and Moone'] = new Town(
    'Altar of the Sunne and Moone',
    GameConstants.Region.alola,
    [TemporaryBattleList['Ultra Megalopolis'], AltaroftheSunneandMooneShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Altar of the Sunne and Moone'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))],
    }
);
TownList['Pokémon League Alola'] = new Town(
    'Pokémon League Alola',
    GameConstants.Region.alola,
    [GymList['Elite Molayne'], GymList['Elite Olivia'], GymList['Elite Acerola'], GymList['Elite Kahili'], GymList['Champion Hau'], pokeLeagueShop()],
    {
        requirements:[
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mount Lanakila')),
        ],
    }
);

//Alola Dungeons
TownList['Trainers\' School'] = new DungeonTown(
    'Trainers\' School',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 18)]
);
TownList['Hau\'oli Cemetery'] = new DungeonTown(
    'Hau\'oli Cemetery',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)],
    [TemporaryBattleList['Captain Ilima']]
);
TownList['Verdant Cavern'] = new DungeonTown(
    'Verdant Cavern',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)]
);
TownList['Melemele Meadow'] = new DungeonTown(
    'Melemele Meadow',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 3)]
);
TownList['Seaward Cave'] = new DungeonTown(
    'Seaward Cave',
    GameConstants.Region.alola,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
TownList['Ten Carat Hill'] = new DungeonTown(
    'Ten Carat Hill',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TownList['Pikachu Valley'] = new DungeonTown(
    'Pikachu Valley',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TownList['Paniola Ranch'] = new DungeonTown(
    'Paniola Ranch',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TownList['Brooklet Hill'] = new DungeonTown(
    'Brooklet Hill',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 5)]
);
TownList['Wela Volcano Park'] = new DungeonTown(
    'Wela Volcano Park',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 7)],
    [TemporaryBattleList['Captain Kiawe']]
);
TownList['Lush Jungle'] = new DungeonTown(
    'Lush Jungle',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 8)],
    [TemporaryBattleList['Captain Mallow'], TemporaryBattleList['Captain Lana']]
);
TownList['Diglett\'s Tunnel'] = new DungeonTown(
    'Diglett\'s Tunnel',
    GameConstants.Region.alola,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lush Jungle'))]
);
TownList['Memorial Hill'] = new DungeonTown(
    'Memorial Hill',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 9)]
);
TownList['Malie Garden'] = new DungeonTown(
    'Malie Garden',
    GameConstants.Region.alola,
    [new TemporaryBattleRequirement('Ultra Wormhole')] //Replace with Ather Paradise 1 if implemented
);
TownList['Hokulani Observatory'] = new DungeonTown(
    'Hokulani Observatory',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 22)],
    [TemporaryBattleList['Captain Sophocles']]
);
TownList['Thrifty Megamart'] = new DungeonTown(
    'Thrifty Megamart',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 14)]
);
TownList['Ula\'ula Meadow'] = new DungeonTown(
    'Ula\'ula Meadow',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 16)]
);
TownList['Po Town'] = new DungeonTown(
    'Po Town',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 17)]
);
TownList['Aether Foundation'] = new DungeonTown(
    'Aether Foundation',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)]
);
TownList['Exeggutor Island Hill'] = new DungeonTown(
    'Exeggutor Island Hill',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)]
);
TownList['Vast Poni Canyon'] = new DungeonTown(
    'Vast Poni Canyon',
    GameConstants.Region.alola,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Exeggutor Island Hill'))]
);
TownList['Mina\'s Houseboat'] = new DungeonTown(
    'Mina\'s Houseboat',
    GameConstants.Region.alola,
    [new TemporaryBattleRequirement('Kahuna Nanu')]
);
TownList['Mount Lanakila'] = new DungeonTown(
    'Mount Lanakila',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)]
);
TownList['Lake of the Sunne and Moone'] = new DungeonTown(
    'Lake of the Sunne and Moone',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Ruins of Conflict'] = new DungeonTown(
    'Ruins of Conflict',
    GameConstants.Region.alola,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Ruins of Life'] = new DungeonTown(
    'Ruins of Life',
    GameConstants.Region.alola,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 21),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Ruins of Abundance'] = new DungeonTown(
    'Ruins of Abundance',
    GameConstants.Region.alola,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 23),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Ruins of Hope'] = new DungeonTown(
    'Ruins of Hope',
    GameConstants.Region.alola,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 26),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Poni Meadow'] = new DungeonTown(
    'Poni Meadow',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 28)]
);
//TODO: Change requirement when UB questline is merged.
TownList['Resolution Cave'] = new DungeonTown(
    'Resolution Cave',
    GameConstants.Region.alola,
    //[new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Poni Meadow'))]
    [new NullRequirement()]
);
//Galar Shops


const PostwickShop = new Shop([
    ItemList.Pokeball,
]);
const WedgehurstShop = new Shop([
    ItemList.Pokeball,
    ItemList.Mystery_egg,
]);
const TurffieldShop = new Shop([
    ItemList.Pokeball,
    ItemList.Grass_egg,
    ItemList.Sweet_apple,
    ItemList.Tart_apple,
    ItemList.Leaf_stone,
    ItemList.Sun_stone,
]);
const HulburyShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Water_egg,
    ItemList.Water_stone,
    ItemList.Kings_rock,
    ItemList.Prism_scale,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
]);
const MotostokeShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Fire_egg,
    ItemList.Fire_stone,
    ItemList.Linking_cord,
    ItemList.Magmarizer,
]);
const HammerlockeShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Dragon_egg,
    ItemList.Metal_coat,
    ItemList.Upgrade,
    ItemList.Dragon_scale,
]);
const StowonSideShop: Shop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Fighting_egg,
    ItemList.Soothe_bell,
    ItemList.Dawn_stone,
    ItemList.Dubious_disc,
    ItemList.Reaper_cloth,
]);
const BallonleaShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Cracked_pot,
    ItemList.Moon_stone,
    ItemList.Shiny_stone,
    ItemList.Sachet,
    ItemList.Whipped_dream,
]);
const CirchesterShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Razor_claw,
    ItemList.Razor_fang,
    ItemList.Protector,
    ItemList.Ice_stone,
]);
const SpikemuthShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Electric_egg,
    ItemList.Thunder_stone,
    ItemList.Dusk_stone,
    ItemList.Electirizer,
]);
const WyndonShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.SmallRestore,
    ItemList.MediumRestore,
    ItemList.LargeRestore,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_egg,
    ItemList.Token_collector,
    ItemList.Dowsing_machine,
    ItemList.Lucky_incense,
]);
const MasterDojoShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Galarica_cuff,
    ItemList.Galarica_wreath,
]);
const FreezingtonShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
]);

//Galar NPC


const Mom = new NPC('Mom', [
    'Don\'t go too far into the Slumbering Weald.',
    'I\'ve heard there are some very strong Pokemon in there.',
    'Only those who beat the champion are strong enough to face them!',
]);
const TrainStationGuy = new NPC('Train Station Guy', [
    'There are some areas around Galar that you can only reach after beating the Champion.',
    'One is an island paradise, and the other a freezing wasteland.',
    'I\m sure if you go to these places you\'ll find many unique and powerful Pokémon!',
]);
const SouthGalarRoamerNPC = new RoamerNPC('Sonia Magnolia', [
    'I\'ve heard there\'s been sightings of a never-before-seen, superstrong Pokémon on {ROUTE_NAME}! You should go check it out!',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.SouthGalar));
const IsleofArmorRoamerNPC = new RoamerNPC('Master Dojo Student', [
    'One of the other students said they saw a rare Pokémon on {ROUTE_NAME}. Might be worth having a look.',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.IsleofArmor));
const CrownTundraRoamerNPC = new RoamerNPC('Freezington Mayor', [
    'If my eyes didn\'t decieve me, I saw a rare Pokémon at {ROUTE_NAME}. Go and see if you can find it if you\'re interested.',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.CrownTundra));
const CrownPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they were talking some ancient king Pokémon! They also mentioned a couple of horsey Pokémon that it was ultra-mega-close to. There\'s a statue of it outside and I\'ve heard this rock I\'ve been using as a pillow is part of it!',
    'Could you go and put it back on for me?',
],
{ requirement: new MultiRequirement([new QuestLineStartedRequirement('The Crown of Galar'), new QuestLineStepCompletedRequirement('The Crown of Galar', 1, GameConstants.AchievementOption.less )])});
const Calyrex1 = new NPC ('Calyrex', [
    'Ah, yes. A sturdy body, just as i expected. I hope this man doesn\'t mind that I make use of it for the time being.',
    'I am Calyrex. I am also known as the King of Bountiful Harvests. I have borrowed this man\'s body in order to thank you in person for restoring my statue...so to speak.',
    'I once reigned over these land as king, but now I have lost all but a fraction of my former strength. Even my loyal steeds have abandoned me.',
    'Would you do me the favour of protecting me from wild Pokémon at the Old Cemetery and Snowslide Slope? I wish to grow a Shaderoot Carrot and an Iceroot Carrot which I believe could draw out my loyal steeds.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 2), new QuestLineStepCompletedRequirement('The Crown of Galar', 3, GameConstants.AchievementOption.less )])});
const Calyrex2 = new NPC ('Calyrex', [
    'Thank you for your help in growing these carrots. It is my belief that they will draw my loyal steeds back to me...',
    'What?! They are here already! But they appear to be unable to tell exactly where the scent of the carrots is coming from!',
    'The people of this place are in danger, you must fight them off!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 4), new QuestLineStepCompletedRequirement('The Crown of Galar', 5, GameConstants.AchievementOption.less )])});
const Calyrex3 = new NPC ('Calyrex', [
    'You have my thanks for protecting the village, human child. Although, unfortunately, this has also caused my loyal steeds to flee.',
    'Hmm...... Perhaps now we know they are in this area, it would be better to search for them?.',
    'I think that would be for the best. Once you capture them, I would appreciate it if you could bring them to the Crown Shrine at the mountain\'s peak.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 6), new QuestLineStepCompletedRequirement('The Crown of Galar', 7, GameConstants.AchievementOption.less )])});
const Calyrex4 = new NPC ('Calyrex', [
    'Finally, my loyal steeds have returned to me. There are truly no words with which to fully express my gratitude to you. So... I have a suggestion',
    'If you are able to capture me, it will prove your worth beyond any doubt, and I will lend you my strength on your journey. Once you have readied yourself, come face me!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 8), new QuestLineStepCompletedRequirement('The Crown of Galar', 9, GameConstants.AchievementOption.less )])});
const CrownPeony2 = new NPC ('Peony', [
    'Wait--you really caught Calyrex from the legends?! Thats\'s ultra-mega-brilliant! Report away!',
    'Th-that noggin\'s MASSIVE! I-is that the King of Bountiful Harvests? The one calling the shots around here? Huh? I could swear I\'ve seen it before... Or then again, maybe not...',
    'A-anyway! It\'s definitely regal of it to have steeds... and that massive head does sort of resemble a crown! It\'s kingly enough, at any rate! Let\'s just call this a successful expedition! Smashin\'!',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 10), new QuestLineCompletedRequirement('The Crown of Galar', GameConstants.AchievementOption.less)]) });
const BirdPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they mentioned they had seen some bird Pokémon that looked like the legendary birds of Kanto at that ultra-mega-massive tree in the middle of Ballimere Lake!',
    'You should go check it out!',
],
{ requirement: new MultiRequirement([new QuestLineStartedRequirement('The Birds of the Dyna Tree'), new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 1, GameConstants.AchievementOption.less )])});
const BirdPeony2 = new NPC ('Peony', [
    'You\'re saying you saw some Pokémon that looked like.... Hang on, Chief! There\'s breaking news on the telly! They\'re sayin\' dodgy bird Pokémon are poppin\' up left and right!',
    'There\'s this fancy graceful one\'s apparently flyin\' about the Crown Tundra!',
    'And there\'s this pointy feathered one runnin\' about in Southern Galar!',
    'Plus a fiery-lookin\' one out on the Isle of Armor!',
    'You\'re sayin\' you saw them and that\'s what you were tellin\' me about? Ah, sorry \'bout that. Anyway, you should go find \'em!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 3), new QuestLineStepCompletedRequirement('TThe Birds of the Dyna Tree', 4, GameConstants.AchievementOption.less )])});
const BirdPeony3 = new NPC ('Peony', [
    'Wait--you really caught Articuno, Moltres and Zapdos from the legends?! Thats\'s ultra-mega-brilliant! Report away!',
    'So that\'s them is it? I can definitely see the resemblance, but they don\'t seem quite the same...',
    'Maybe they\'re regional variants or somethin\'? At an rate, that\'s good enough for me. Let\'s call this expedition a success!',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5), new QuestLineCompletedRequirement('The Birds of the Dyna Tree', GameConstants.AchievementOption.less)]) });
const GolemPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they mentioned some weird purple and yellow ruins at Three-Point Pass. You should go check \'em out!',
],
{ requirement: new MultiRequirement([new QuestLineStartedRequirement('The Ancient Golems'), new QuestLineStepCompletedRequirement('The Ancient Golems', 1, GameConstants.AchievementOption.less )])});
const GolemPeony2 = new NPC ('Peony', [
    'So they wouldn\'t open... That\'s annoyin\'. Well, there are also 3 more ruins, 2 at opposite ends of Giants Bed, and one at Snowslide Slope. Maybe you should have a look at those?',
    'How \'bout clearin\' em 10 times each, and see if you find anythin\' to open up the ruins at Three-Point Pass.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 2), new QuestLineStepCompletedRequirement('The Ancient Golems', 3, GameConstants.AchievementOption.less )])});
const GolemPeony3 = new NPC ('Peony', [
    'So that didn/t work? Well, I heard there are some legendary Pokémon in those ruins, called Regirock, Regice and Registeel. Apparently they\'ll show up to people who have done enough explorin\' in their ruins.',
    'Maybe if you caught them, the other ruins would open? What? You already have? Well, it might be worth doing it again, anyway.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 4), new QuestLineStepCompletedRequirement('The Ancient Golems', 5, GameConstants.AchievementOption.less )])});
const GolemPeony4 = new NPC ('Peony', [
    'They\'ve went and opened up now? Well, what are you doing here, then! If there were legendary Pokémon in those other ruins, there probably will be in these ones too! Go and catch \'em!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 6), new QuestLineStepCompletedRequirement('The Ancient Golems', 6, GameConstants.AchievementOption.less )])});
const GolemPeony5 = new NPC ('Peony', [
    'You caught Regieleki and Regidrago from the legends? Amazing! I\'d call this expedition a success, but another legendary golem Pokémon has appeared in the middle of Giants Bed',
    'Apparently it\'s ultra-mega-strong! You should go see if you can beat it!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 7), new QuestLineStepCompletedRequirement('The Ancient Golems', 8, GameConstants.AchievementOption.less )])});
const GolemPeony6 = new NPC ('Peony', [
    'Wait--so you really beat Regigigas from the legends? You know, it\'s said that it created the other Regi Pokémon. Maybe that\'s why it showed up when you caught \'em all?',
    'Anyway, we may as well call this expedition a success!',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 9), new QuestLineCompletedRequirement('The Ancient Golems', GameConstants.AchievementOption.less)]) });
const PeonyComplete = new NPC ('Peony', [
    'Huh? Well how \'bout that, Chief! Looks like that was the last bit of the grand Peony Adven-tour that I had for you! Whoooooo! Now this is an occasion! What\'s the word? Ultra-mega-epic! Your passion for all this caught me off guard, Chief...',
    'This whole Adven-tour thing was built out of a load of rubbish I scraped together. Even I had my doubts about the whole thing. But you? You went at it with a ton of energy! Thanks for stickin\' around and finishin\' every part of my Adven-tour!',
],
{ requirement: new MultiRequirement([new QuestLineCompletedRequirement('The Crown of Galar'), new QuestLineCompletedRequirement('The Birds of the Dyna Tree'), new QuestLineCompletedRequirement('The Ancient Golems')])});
const ProfMagnolia = new ProfNPC('Prof. Magnolia',
    GameConstants.Region.galar,
    'TODO: Add text before Galar is released',
    'TODO: Add text before Galar is released');


//Galar towns

TownList.Postwick = new Town(
    'Postwick',
    GameConstants.Region.galar,
    [PostwickShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
        npcs: [ProfMagnolia, Mom],
    }
);
TownList['Slumbering Weald'] = new Town(
    'Slumbering Weald',
    GameConstants.Region.galar,
    [TemporaryBattleList.Mirages, new MoveToDungeon(dungeonList['Slumbering Weald Shrine'])],
    {
        requirements: [new TemporaryBattleRequirement('Hop1')],
    }
);
TownList.Wedgehurst = new Town(
    'Wedgehurst',
    GameConstants.Region.galar,
    [WedgehurstShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
        npcs: [TrainStationGuy, SouthGalarRoamerNPC],
    }
);
TownList['Professor Magnolia\'s House'] = new Town(
    'Professor Magnolia\'s House',
    GameConstants.Region.galar,
    [TemporaryBattleList['Sordward & Shielbert']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 2)],
    }
);
TownList.Motostoke = new Town(
    'Motostoke',
    GameConstants.Region.galar,
    [TemporaryBattleList.Marnie1, TemporaryBattleList['Rampaging Torkoal'], MotostokeShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Motostoke)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 6)],
    }
);
TownList.Turffield = new Town(
    'Turffield',
    GameConstants.Region.galar,
    [TemporaryBattleList['Rampaging Tsareena'], TurffieldShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Turffield)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 13)],
    }
);
TownList.Hulbury = new Town(
    'Hulbury',
    GameConstants.Region.galar,
    [TemporaryBattleList['Rampaging Gyarados'], HulburyShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Hulbury)],
    {
        requirements: [new TemporaryBattleRequirement('Hop4')],
    }
);
TownList['Stow-on-Side'] = new Town(
    'Stow-on-Side',
    GameConstants.Region.galar,
    [TemporaryBattleList.Bede3, TemporaryBattleList['Rampaging Conkeldurr'], TemporaryBattleList['Rampaging Dusknoir'], GymList['Stow-on-Side1'], GymList['Stow-on-Side2'], StowonSideShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Stow-on-Side'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 23)],
    }
);
TownList.Ballonlea = new Town(
    'Ballonlea',
    GameConstants.Region.galar,
    [TemporaryBattleList['Gym Leader Bede'], BallonleaShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Ballonlea)],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))],
    }
);
TownList.Hammerlocke = new Town(
    'Hammerlocke',
    GameConstants.Region.galar,
    [TemporaryBattleList.Hop6, TemporaryBattleList['Rampaging Haxorus'], new MoveToDungeon(dungeonList['Energy Plant']), HammerlockeShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Hammerlocke)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 22)],
    }
);
TownList.Circhester = new Town(
    'Circhester',
    GameConstants.Region.galar,
    [TemporaryBattleList.Hop7, TemporaryBattleList['Rampaging Gigalith'], TemporaryBattleList['Rampaging Froslass'], GymList.Circhester1, GymList.Circhester2, CirchesterShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Circhester)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 26)],
    }
);
TownList.Spikemuth = new Town(
    'Spikemuth',
    GameConstants.Region.galar,
    [TemporaryBattleList['Gym Leader Marnie'], SpikemuthShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Spikemuth)],
    {
        requirements: [new TemporaryBattleRequirement('Marnie2')],
    }
);
TownList.Wyndon = new Town(
    'Wyndon',
    GameConstants.Region.galar,
    [WyndonShop, new MoveToDungeon(dungeonList['Rose Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 32)],
    }
);
TownList['Wyndon Stadium'] = new Town(
    'Wyndon Stadium',
    GameConstants.Region.galar,
    [GymList['Trainer Marnie'], GymList['Gym Leader Bede'], GymList['Trainer Hop'], GymList['Champion Leon'], pokeLeagueShop()],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 32)],
    }
);
//Isle of Armor towns
TownList['Armor Station'] = new Town(
    'Armor Station',
    GameConstants.Region.galar,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    }
);
TownList['Master Dojo'] = new Town(
    'Master Dojo',
    GameConstants.Region.galar,
    [TemporaryBattleList.Mustard, MasterDojoShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Master Dojo'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 33)],
        npcs: [IsleofArmorRoamerNPC],
    }
);
TownList['Master Dojo Battle Court'] = new Town(
    'Master Dojo Battle Court',
    GameConstants.Region.galar,
    [GymList['Gym Leader Klara'], GymList['Gym Leader Avery'], GymList['Dojo Matron Honey'], GymList['Dojo Master Mustard']],
    {
        requirements: [
            new MultiRequirement([
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Waters')),
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Darkness')),
            ]),
        ],
    }
);

//Crown Tundra Towns
TownList['Crown Tundra Station'] = new Town(
    'Crown Tundra Station',
    GameConstants.Region.galar,
    [TemporaryBattleList.Peony],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    }
);
TownList.Freezington = new Town(
    'Freezington',
    GameConstants.Region.galar,
    [TemporaryBattleList.Calyrex, TemporaryBattleList.Glastrier, TemporaryBattleList.Spectrier, FreezingtonShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 46)],
        npcs: [CrownPeony1, Calyrex1, Calyrex2, Calyrex3, CrownPeony2, BirdPeony1, BirdPeony2, BirdPeony3, GolemPeony1, GolemPeony2, GolemPeony3, GolemPeony4, GolemPeony5, GolemPeony6, PeonyComplete, CrownTundraRoamerNPC],
    }
);


//Galar Dungeons


TownList['Slumbering Weald Shrine'] = new DungeonTown(
    'Slumbering Weald Shrine',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    [TemporaryBattleList.Hop8, TemporaryBattleList.Sordward1, TemporaryBattleList.Shielbert1]
);
TownList['Galar Mine'] = new DungeonTown(
    'Galar Mine',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 12)],
    [TemporaryBattleList.Bede1]
);
TownList['Galar Mine No. 2'] = new DungeonTown(
    'Galar Mine No. 2',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Galar_Water)],
    [TemporaryBattleList.Bede2]
);
TownList['Glimwood Tangle'] = new DungeonTown(
    'Glimwood Tangle',
    GameConstants.Region.galar,
    [new TemporaryBattleRequirement('Bede3')]
);
TownList['Rose Tower'] = new DungeonTown(
    'Rose Tower',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_Hop)]
);
TownList['Energy Plant'] = new DungeonTown(
    'Energy Plant',
    GameConstants.Region.galar,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower'))],
    [TemporaryBattleList.Eternatus, TemporaryBattleList.Sordward2, TemporaryBattleList.Shielbert2, TemporaryBattleList['The Darkest Day']]
);
TownList['Dusty Bowl'] = new DungeonTown(
    'Dusty Bowl',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 18)]
);
TownList['Courageous Cavern'] = new DungeonTown(
    'Courageous Cavern',
    GameConstants.Region.galar,
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 33),
            new RouteKillRequirement(10, GameConstants.Region.galar, 34),
            new RouteKillRequirement(10, GameConstants.Region.galar, 36),
            new RouteKillRequirement(10, GameConstants.Region.galar, 37),
        ]),
    ]
);
TownList['Brawlers Cave'] = new DungeonTown(
    'Brawlers Cave',
    GameConstants.Region.galar,
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 34),
            new RouteKillRequirement(10, GameConstants.Region.galar, 40),
        ]),
    ]
);
TownList['Warm-Up Tunnel'] = new DungeonTown(
    'Warm-Up Tunnel',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 38)],
    [TemporaryBattleList.Klara2, TemporaryBattleList.Avery2]
);
TownList['Tower of Darkness'] = new DungeonTown(
    'Tower of Darkness',
    GameConstants.Region.galar,
    [
        new OneFromManyRequirement([
            new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 3),
            new QuestLineCompletedRequirement('The Dojo\'s Armor'),
        ]),
    ]
);
TownList['Tower of Waters'] = new DungeonTown(
    'Tower of Waters',
    GameConstants.Region.galar,
    [
        new OneFromManyRequirement([
            new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 4),
            new QuestLineCompletedRequirement('The Dojo\'s Armor'),
        ]),
    ]
);
TownList['Roaring-Sea Caves'] = new DungeonTown(
    'Roaring-Sea Caves',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 50)]
);
TownList['Rock Peak Ruins'] = new DungeonTown(
    'Rock Peak Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)]
);
TownList['Iron Ruins'] = new DungeonTown(
    'Iron Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)]
);
TownList['Iceberg Ruins'] = new DungeonTown(
    'Iceberg Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 54)]
);
TownList['Split-Decision Ruins'] = new DungeonTown(
    'Split-Decision Ruins',
    GameConstants.Region.galar,
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 52),
            new QuestLineStepCompletedRequirement('The Ancient Golems', 6),
        ]),
    ]
);
TownList['Lakeside Cave'] = new DungeonTown(
    'Lakeside Cave',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 53)]
);
TownList['Dyna Tree Hill'] = new DungeonTown(
    'Dyna Tree Hill',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 53)],
    [TemporaryBattleList['Dyna Tree Birds']]
);
TownList['Tunnel to the Top'] = new DungeonTown(
    'Tunnel to the Top',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 54)]
);
TownList['Crown Shrine'] = new DungeonTown(
    'Crown Shrine',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 55)],
    [],
    [Calyrex4]
);
