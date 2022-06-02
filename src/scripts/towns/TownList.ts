/* eslint-disable array-bracket-newline */
///<reference path="../../declarations/requirements/RouteKillRequirement.d.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>

const TownList: { [name: string]: Town } = {};

const pokeMartShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Token_collector'],
    ItemList['Item_magnet'],
    ItemList['Lucky_incense'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
], 'Explorers Poké Mart');

const DepartmentStoreShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Item_magnet'],
    ItemList['Token_collector'],
    ItemList['Lucky_incense'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
], 'Department Store');

const pokeLeagueShop = () => new Shop([
    new PokeballItem(GameConstants.Pokeball.Masterball, 10000000, GameConstants.Currency.money       , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.money]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 75000   , GameConstants.Currency.dungeonToken, { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.dungeonToken]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.questPoint  , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.questPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.farmPoint   , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.farmPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 50      , GameConstants.Currency.diamond     , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.diamond]}` }),
    //ItemList['RareCandy'],
    ItemList['Protein'],
]);

//Kanto Shops
const PewterCityShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Token_collector'],
    ItemList['Lucky_egg'],
    ItemList['Mystery_egg'],
]);
const Route3Shop = new Shop([
    ItemList['Magikarp'],
]);
const CeruleanCityShop = new Shop([
    ItemList['Water_stone'],
    ItemList['xAttack'],
    ItemList['Water_egg'],
]);
const VermilionCityShop = new Shop([
    ItemList['Thunder_stone'],
    ItemList['Lucky_egg'],
    ItemList['Electric_egg'],
]);
const CeladonCityShop = new Shop([
    ItemList['Eevee'],
    ItemList['Porygon'],
    ItemList['Jynx'],
    ItemList['Mr. Mime'],
    ItemList['Lickitung'],
],   'Game Corner Shop');
const CeladonDepartmentStoreShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Item_magnet'],
    ItemList['Token_collector'],
    ItemList['Lucky_incense'],
], 'Department Store');
const SaffronCityShop = new Shop([
    ItemList['Moon_stone'],
    ItemList['xClick'],
    ItemList['Leaf_stone'],
    ItemList['Fighting_egg'],
]);
const FuchsiaCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Trade_stone'],
    ItemList['Lucky_egg'],
    ItemList['Dragon_egg'],
]);
const CinnabarIslandShop = new Shop([
    ItemList['Fire_stone'],
    ItemList['Fire_egg'],
    ItemList['SmallRestore'],
    ItemList['Explorer_kit'],
    ItemList['Explosive_Charge'],
    ItemList['Treasure_Scanner'],
    ItemList['HatcheryHelperKris'],
]);
const ViridianCityShop = new Shop([
    ItemList['Pokeball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Dungeon_ticket'],
]);
const LavenderTownShop = new Shop([
    ItemList['Greatball'],
    ItemList['Item_magnet'],
    ItemList['Lucky_incense'],
    ItemList['Grass_egg'],
]);

// Kanto NPCs

const PalletProfOak = new ProfNPC('Prof. Oak',
    GameConstants.Region.kanto,
    'Congratulations on completing your Kanto Pokédex!',
    'Your journey isn\'t over yet, a whole world awaits you! Onwards to Johto!',
    'assets/images/oak.png');

const PalletMom = new NPC('Mom', [
    'Traveling on your own can be scary. But remember that there are nice people everywhere you go. So strike up a converstation. You will probably learn something useful.',
]);

const ViridianCityOldMan = new NPC('Old Man', [
    'Ahh, I\'ve had my coffee now and I feel great!',
    'You can use the Pokéball Selector to select which type of Pokéball to use on specific Pokémon based on caught status.',
]);

const PewterBattleItemRival = new NPC('Battle Item Master', [
    'Hey kid, you look new! Let me offer some advice, Battle Items like xAttack can be acquired along Routes, inside Dungeons and in Shops!',
    'Use them to help you out whenever you feel like time is against you!',
]);

const PewterScientist = new NPC('Gem Scientist', [
    'I see you are carrying a Shard Case. Here at the museum we study space, fossils and gems!',
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

const LavenderMrFuji = new NPC('Mr. Fuji', [
    'Welcome. In our Volunteer House here we take in all kinds of Pokémon to care for them.',
    'Did you know that sparkling Pokémon are more often found in Dungeons, on Farms, from Eggs, and even from Shops, the Safari Zone, and Evolutions from Items?',
]);

const BigSpender = new NPC('Big Spender', [
    'I love shopping! When I come in, the cashiers know I want tons of items.',
    'You can use the Shop Amount Button settings to make it easy for big purchases, too!',
]);

const SaffronBattleItemRival = new NPC('Battle Item Master', [
    'Do I know you? Wait... Have you met my worthless rival? Ha! Let me guess, he gave you some unwanted advice?',
    'I bet he forget to tell you that although all Battle Items only last for 30 seconds they can stack and last for days! Now scram!',
]);

const SaffronBreeder = new NPC('Breeder', [
    'You can leave your level 100 Pokémon with us up at the Hatchery. Breeding them will reset their level, but they will be stronger! They gain 25% of their base attack!',
    'And the best part is you can keep doing it over and over and over again! The sky is the limit! Reach for the stars!',
    'With Protein your Pokémon will become even stronger when you breed them. I hear they sell it at the Indigo Plateau.',
],
{ requirement: new GymBadgeRequirement(BadgeEnums.Earth) });

const FuchsiaKantoRoamerNPC = new RoamerNPC('Youngster Wendy', [
    'There\'s been some recent sightings of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.kanto);

const CinnabarIslandResearcher = new NPC('Researcher', [
    'They were trying to clone an ancient Pokémon in the mansion, I wonder if they succeeded.',
    'Apparently the ancient Pokémon escaped, And can be found roaming around Kanto!',
]);

//Kanto Towns
TownList['Pallet Town'] = new Town(
    'Pallet Town',
    GameConstants.Region.kanto,
    [],
    {
        npcs: [PalletProfOak, PalletMom],
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
    [CeruleanCityShop, new MoveToDungeon(dungeonList['Cerulean Cave'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
        npcs: [CeruleanKantoBerryMaster, CeruleanSuperNerd],
    }
);
TownList['Vermilion City'] = new Town(
    'Vermilion City',
    GameConstants.Region.kanto,
    [VermilionCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
        npcs: [VermilionFanClubChairman],
    }
);
TownList['Lavender Town'] = new Town(
    'Lavender Town',
    GameConstants.Region.kanto,
    [LavenderTownShop, new MoveToDungeon(dungeonList['Pokemon Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
        npcs: [LavenderMrFuji],
    }
);
TownList['Celadon City'] = new Town(
    'Celadon City',
    GameConstants.Region.kanto,
    [CeladonDepartmentStoreShop, CeladonCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)],
        npcs: [BigSpender],
    }
);
TownList['Saffron City'] = new Town(
    'Saffron City',
    GameConstants.Region.kanto,
    [SaffronCityShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Rainbow)],
        npcs: [SaffronBattleItemRival, SaffronBreeder],
    }
);
TownList['Fuchsia City'] = new Town(
    'Fuchsia City',
    GameConstants.Region.kanto,
    [FuchsiaCityShop],
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
    [CinnabarIslandShop, new MoveToDungeon(dungeonList['Pokemon Mansion'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
        ])],
        npcs: [CinnabarIslandResearcher],
    }
);
TownList['Viridian City'] = new Town(
    'Viridian City',
    GameConstants.Region.kanto,
    [ViridianCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
        npcs: [ViridianCityOldMan],
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
TownList['Digletts Cave'] = new DungeonTown(
    'Digletts Cave',
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
TownList['Power Plant'] = new DungeonTown(
    'Power Plant',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Soul),
    ]
);
TownList['Pokemon Tower'] = new DungeonTown(
    'Pokemon Tower',
    GameConstants.Region.kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 10),
        new GymBadgeRequirement(BadgeEnums.Rainbow),
    ]
);
TownList['Seafoam Islands'] = new DungeonTown(
    'Seafoam Islands',
    GameConstants.Region.kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 19)]
);
TownList['Pokemon Mansion'] = new DungeonTown(
    'Pokemon Mansion',
    GameConstants.Region.kanto,
    [new OneFromManyRequirement([
        new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
        new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
    ])]
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
const NewBarkTownShop = new Shop([
    ItemList['Pokeball'],
]);
const VioletCityShop = new Shop([
    ItemList['MediumRestore'],
    ItemList['Togepi'],
    ItemList['Mystery_egg'],
]);
const AzaleaTownShop = new Shop([
    ItemList['Kings_rock'],
    ItemList['Grass_egg'],
    ItemList['Leaf_stone'],
]);
const GoldenrodDepartmentStoreShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Item_magnet'],
    ItemList['Token_collector'],
    ItemList['Lucky_incense'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
], 'Department Store');
const EcruteakCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Fire_egg'],
    ItemList['Soothe_bell'],
    ItemList['Fire_stone'],
]);
const OlivineCityShop = new Shop([
    ItemList['Metal_coat'],
    ItemList['Water_egg'],
    ItemList['Electric_egg'],
    ItemList['Water_stone'],
    ItemList['Thunder_stone'],
    ItemList['HatcheryHelperCarey'],
]);
const CianwoodCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Fighting_egg'],
    ItemList['Sun_stone'],
]);
const MahoganyTownShop = new Shop([
    ItemList['Upgrade'],
    ItemList['Trade_stone'],
    ItemList['HatcheryHelperDakota'],
]);
const BlackthornCityShop = new Shop([
    ItemList['LargeRestore'],
    ItemList['Dragon_scale'],
    ItemList['Dragon_egg'],
]);

// Johto NPCs

const JohtoBerryMaster = new BerryMasterShop([
    ItemList['Boost_Mulch'],
    ItemList['Rich_Mulch'],
    ItemList['Surprise_Mulch'],
    ItemList['Amaze_Mulch'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['Squirtbottle'],
    ItemList['FarmHandBailey'],
    ItemList['ChopleBerry'],
    ItemList['KebiaBerry'],
    ItemList['ShucaBerry'],
    ItemList['ChartiBerry'],
]);

const NewBarkTechnologyEnthusiast = new NPC('Tech Enthusiast', [
    'Technology is amazing! I have heard that picking up items in chests in Dungeons can make it easier to see! But the Dungeons seem to get harder with each chest you pick up...',
]);

const CherrygroveMrPokemon = new NPC('Mr. Pokémon', [
    'Welcome to Johto! This is where the first ever Pokémon egg was found long ago.',
    'Astounding breakthroughs have been made since then. We can now store Pokémon eggs for longer and queue them up for breeding.',
    'This new technology only allows up to four stored eggs, for now.',
]);

const VioletEarlDervish = new NPC('Earl Dervish', [
    'Earl I am! Teach you I will to be a better trainer!',
    'Some Pokémon babies, only from Day Care they come! Hatch! Hatch! Hatch!',
]);

const AzaleaOldMan = new NPC('Wise Old Man', [
    'There is an old tale about the Guardian of Ilex Forest.',
    'It says that the mythical Pokémon Celebi will appear before anyone who has proven they are a Champion Pokémon Trainer.',
]);

const AzaleaUnionCaveHiker = new NPC('Hiker Anthony', [
    'The PokéManic’s in Union Cave seem restless.',
    'They belive there is a weekly visitor.',
    'As every Friday, you can hear Pokémon roars from deep inside the cave.',
],
{ requirement: new GymBadgeRequirement(BadgeEnums.Fog) });

const EcruteakBill = new NPC('Bill', [
    'I traveled here all the way from Goldenrod to buy a Soothe Bell for my Eevee.',
    'When I use a Soothe Bell on Eevee it can evolve into Espeon or Umbreon. It depends on the time. Espeon during the day, Umbreon at night.',
    'I only brought enough QP for one Soothe Bell. It\'s so hard to choose...',
]);

const EcruteakEusine = new NPC('Eusine', [
    'Legends say that when the Brass Tower burned down and became the Burned Tower three unnamed Pokémon perished in the flames.',
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

const OlivineSSAquaCaptain = new NPC('SS Aqua Captain', [
    'Aye! At this here dock you can travel to far away regions! But only ones you’ve travelled to before, I’ve heard the Professor has his own vessel to take ye’ to new lands!',
]);

const CianwoodPhotographyAide = new NPC('Photography Aide', [
    'Cameron the Photographer isn’t here right now, he’s off taking photos of Pokémon on Berry Farms. Did you know that some Berries can even attract rare Pokémon?',
]);

const MahoganySouvenirShopAttendant = new NPC('Souvenir Shop Attendant', [
    'We’ve got stuff here nobody else has got! But keep any Item Magnets you have away from the merchandise… especially the RageCandyBars. Keep ‘em outside where they belong, I’ve heard magnets can attract Pokémon with held items more often, and even more so in Dungeons!',
]);

const BlackthornJohtoRoamerNPC = new RoamerNPC('Pokéfan Trevor', [
    'On the news they are getting more reports of roaming Pokémon appearing on {ROUTE_NAME}!',
], GameConstants.Region.johto);

const ProfElm = new ProfNPC('Prof. Elm',
    GameConstants.Region.johto,
    'Oh, another regional Pokédex completed so soon?',
    'Amazing! Next stop is Hoenn, enjoy the sunshine while you\'re there!');


//Johto Towns
TownList['New Bark Town'] = new Town(
    'New Bark Town',
    GameConstants.Region.johto,
    [NewBarkTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)],
        npcs: [ProfElm, NewBarkTechnologyEnthusiast],
    }
);
TownList['Cherrygrove City'] = new Town(
    'Cherrygrove City',
    GameConstants.Region.johto,
    [],
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
    [AzaleaTownShop, new MoveToDungeon(dungeonList['Slowpoke Well'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 33)],
        npcs: [AzaleaOldMan, AzaleaUnionCaveHiker],
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
    [EcruteakCityShop, new MoveToDungeon(dungeonList['Burned Tower']), new MoveToDungeon(dungeonList['Tin Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 37)],
        npcs: [EcruteakBill, EcruteakEusine, EcruteakPokéfan, EcruteakKimonoGirl],
    }
);
TownList['Olivine City'] = new Town(
    'Olivine City',
    GameConstants.Region.johto,
    [OlivineCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 39)],
        npcs: [OlivineSSAquaCaptain],
    }
);
TownList['Cianwood City'] = new Town(
    'Cianwood City',
    GameConstants.Region.johto,
    [CianwoodCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 41)],
        npcs: [CianwoodPhotographyAide],
    }
);
TownList['Mahogany Town'] = new Town(
    'Mahogany Town',
    GameConstants.Region.johto,
    [MahoganyTownShop, new MoveToDungeon(dungeonList['Team Rockets Hideout'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.johto, 42),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt Mortar')),
        ])],
        npcs: [MahoganySouvenirShopAttendant],
    }
);
TownList['Blackthorn City'] = new Town(
    'Blackthorn City',
    GameConstants.Region.johto,
    [BlackthornCityShop],
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
TownList['Mt Mortar'] = new DungeonTown(
    'Mt Mortar',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
);
TownList['Team Rockets Hideout'] = new DungeonTown(
    'Team Rockets Hideout',
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
TownList['Mt Silver'] = new DungeonTown(
    'Mt Silver',
    GameConstants.Region.johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 28)]
);

//Hoenn Shops
const LittleRootTownShop = new Shop([
    ItemList['Pokeball'],
]);
const PetalburgCityShop = new Shop([
    ItemList['Kings_rock'],
]);
const RustboroCityShop = new Shop([
    ItemList['Mystery_egg'],
]);
const DewfordTownShop = new Shop([
    ItemList['Fighting_egg'],
]);
const SlateportCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Water_egg'],
    ItemList['Trade_stone'],
]);
const MauvilleCityShop = new Shop([
    ItemList['Electric_egg'],
    ItemList['Thunder_stone'],
    ItemList['Metal_coat'],
    ItemList['HatcheryHelperJasmine'],
]);
const VerdanturfTownShop = new Shop([
    ItemList['Grass_egg'],
    ItemList['Soothe_bell'],
]);
const LavaridgeTownShop = new Shop([
    ItemList['Fire_egg'],
    ItemList['Fire_stone'],
]);
const FallarborTownShop = new Shop([
    ItemList['Moon_stone'],
    ItemList['Sun_stone'],
]);
const FortreeCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Leaf_stone'],
]);
const MossdeepCityShop = new Shop([
    ItemList['Beldum'],
    ItemList['Prism_scale'],
    ItemList['Upgrade'],
]);
const SootopolisCityShop = new Shop([
    ItemList['Water_stone'],
]);
const PacifidlogTownShop = new Shop([
    ItemList['Deepsea_tooth'],
    ItemList['Deepsea_scale'],
]);
const EverGrandeCityShop = new Shop([
    ItemList['Dragon_egg'],
    ItemList['Dragon_scale'],
]);
// TODO: finalize items and prices
const BattleFrontierShop = new Shop([
    new PokeballItem(GameConstants.Pokeball.Ultraball, 1, GameConstants.Currency.battlePoint),
    new PokeballItem(GameConstants.Pokeball.Masterball, 500, GameConstants.Currency.battlePoint , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.battlePoint]}` }),
    new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 10, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 20, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 40, GameConstants.Currency.battlePoint),
    ItemList['FarmHandJamie'],
    ItemList['HatcheryHelperNoel'],
]);

//Hoenn Berry Master
const HoennBerryMaster = new BerryMasterShop([
    ItemList['Boost_Mulch'],
    ItemList['Rich_Mulch'],
    ItemList['Surprise_Mulch'],
    ItemList['Amaze_Mulch'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['Sprinklotad'],
    ItemList['FarmHandKerry'],
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
], GameConstants.Region.hoenn);

const FallarborProfessorCozmo = new NPC('Prof. Cozmo', [
    'Oh! Welcome, welcome. Do you by any chance have any Meteorites? No? Ah well, I’m studying the Pokémon Deoxys and I’ve heard that a Meteorite can cause it to change forms!',
    'I’ve also heard that the Battle Frontier may have some secrets relevant to Deoxys and its forms… but I’m not strong enough to find out...',
]);

const LavaridgeSootCollector = new NPC('Soot Collector', [
    'Blegh! I\'ve taken three soaks in the hot springs and I can still taste the soot!',
    'The Flute Trader in Fallarbor Town has been paying me to go collect soot to make Flutes, but I\'m sick of it.',
    'People say they have truly mystical powers, but that they require Gems of different types to use. Also, using more Flutes at the same time costs more Gems to use',
]);

const FortreeWeatherman = new NPC('Weatherman', [
    'Castform is a very finnicky pokemon.',
    'It changes forms when the weather is drastically different.',
    'If you want to collect them all, wait for the weather to change.',
]);

const MossdeepAstronomer = new NPC('Astronomer', [
    'Hey did you know about the Millennium Comet? We can see it in the sky right now, and it only comes around once every thousand years!',
    'There’s a legend that a mythical Wish Pokémon awakens when it passes over us. If you’re as strong as the Champion, maybe you’ll find it roaming around Hoenn granting wishes!',
]);

const PacifidlogDiver = new NPC('Diver', [
    'Yo! Find any cool stuff in chests lately?',
    ' I\'ve heard that if you beat a Dungeon a lot then the stuff you find in chests gets even more awesome.',
]);

const SootopolisWallace = new NPC('Gym Leader Wallace', [
    'The creators of the lands and ocean slumber within the Cave of Origin.',
    'However, they will only awaken when in the presence of a truly great trainer.',
    'You will have to overcome the Pokémon League before you have any chance to encounter them.',
]);

const ProfBirch = new ProfNPC('Prof. Birch',
    GameConstants.Region.hoenn,
    'That\'s another regional Pokédex completed! Fantastic.',
    'I really appreciate being able to see your outstanding progress, thank you! Sinnoh is next up.');

//Hoenn Towns
TownList['Littleroot Town'] = new Town(
    'Littleroot Town',
    GameConstants.Region.hoenn,
    [LittleRootTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
        npcs: [ProfBirch, LittlerootAide],
    }
);
TownList['Oldale Town'] = new Town(
    'Oldale Town',
    GameConstants.Region.hoenn,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)],
        npcs: [OldaleTrackingScientist],
    }
);
TownList['Petalburg City'] = new Town(
    'Petalburg City',
    GameConstants.Region.hoenn,
    [PetalburgCityShop],
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
    [DewfordTownShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rusturf Tunnel'))],
    }
);
TownList['Slateport City'] = new Town(
    'Slateport City',
    GameConstants.Region.hoenn,
    [SlateportCityShop],
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
    [MauvilleCityShop, HoennBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    }
);
TownList['Verdanturf Town'] = new Town(
    'Verdanturf Town',
    GameConstants.Region.hoenn,
    [VerdanturfTownShop],
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
TownList['Lavaridge Town'] = new Town(
    'Lavaridge Town',
    GameConstants.Region.hoenn,
    [LavaridgeTownShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Jagged Pass'))],
    }
);
TownList['Fallarbor Town'] = new Town(
    'Fallarbor Town',
    GameConstants.Region.hoenn,
    [FallarborTownShop, HoennFluteMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)],
        npcs: [FallarborProfessorCozmo],
    }
);
TownList['Fortree City'] = new Town(
    'Fortree City',
    GameConstants.Region.hoenn,
    [FortreeCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))],
        npcs: [FortreeWeatherman],
    }
);
TownList['LilyCove City'] = new Town(
    'LilyCove City',
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
    [MossdeepCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)],
        npcs: [MossdeepAstronomer],
    }
);
TownList['Pacifidlog Town'] = new Town(
    'Pacifidlog Town',
    GameConstants.Region.hoenn,
    [PacifidlogTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 131)],
        npcs: [PacifidlogDiver],
    }
);
TownList['Sootopolis City'] = new Town(
    'Sootopolis City',
    GameConstants.Region.hoenn,
    [SootopolisCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 126), new GymBadgeRequirement(BadgeEnums.Mind)],
        npcs: [SootopolisWallace],
    }
);
TownList['Ever Grande City'] = new Town(
    'Ever Grande City',
    GameConstants.Region.hoenn,
    [EverGrandeCityShop],
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
const TwinleafTownShop = new Shop([
    ItemList['Pokeball'],
]);
const JubilifeCityShop = new Shop([
    ItemList['Moon_stone'],
    ItemList['Sun_stone'],
]);
const OreburghCityShop = new Shop([
    ItemList['Mystery_egg'],
]);
const FloaromaTownShop = new Shop([
    ItemList['Kings_rock'],
    ItemList['Trade_stone'],
]);
const EternaCityShop = new Shop([
    ItemList['Grass_egg'],
    ItemList['Leaf_stone'],
]);
const HearthomeCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Soothe_bell'],
    ItemList['Fire_egg'],
    ItemList['Fire_stone'],
]);
const SolaceonTownShop = new Shop([
    ItemList['Dawn_stone'],
    ItemList['Dusk_stone'],
    ItemList['Shiny_stone'],
    ItemList['Spiritomb'],
]);
const CelesticTownShop = new Shop([
    ItemList['Dragon_egg'],
    ItemList['Dragon_scale'],
]);
const CanalaveCityShop = new Shop ([
    ItemList['Fighting_egg'],
    ItemList['Metal_coat'],
]);
const PalParkShop = new Shop([
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
    ItemList['Combee'],
    ItemList['Burmy (plant)'],
    ItemList['Cherubi'],
]);
const SnowpointCityShop = new Shop([
    ItemList['Upgrade'],
]);
const SunyshoreCityShop = new Shop([
    ItemList['Electric_egg'],
    ItemList['Thunder_stone'],
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
]);
const SurvivalAreaShop = new Shop([
    ItemList['Electirizer'],
    ItemList['Magmarizer'],
]);
const ResortAreaShop = new Shop([
    ItemList['Reaper_cloth'],
    ItemList['Dubious_disc'],
    ItemList['Protector'],
]);
const PastoriaShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Skorupi'],
    ItemList['Water_egg'],
    ItemList['Water_stone'],
    ItemList['Prism_scale'],
]);

//Sinnoh Berry Master
const SinnohBerryMaster = new BerryMasterShop([
    ItemList['Boost_Mulch'],
    ItemList['Rich_Mulch'],
    ItemList['Surprise_Mulch'],
    ItemList['Amaze_Mulch'],
    ItemList['Berry_Shovel'],
    ItemList['Mulch_Shovel'],
    ItemList['FarmHandRiley'],
]);

//Sinnoh NPCs

const TwinleafContestChampion = new NPC('Contest Champion', [
    'Welcome to Sinnoh! There are many legends and myths here. For example, it is said that trainers that conquer the Lake nearby, Lake Verity, will meet a mythical Pokémon known for Emotion roaming around the region. It sure would have been awesome to partner with that Pokémon in one of my routines!',
]);

const SandgemBeachcomber = new NPC('Beachcomber', [
    'Hmmm… Oh! Sorry, I Didn’t see you there! Sometimes the strangest things wash up on this beach, I just got caught up in the search.',
    'Just last week a weird blue egg with a red center showed up. I went to go pick it up, but then it hatched! I was so surprised that the little blue Pokémon just hopped right back into the ocean. Who knows, maybe you’ll find it roaming around the region!',
]);

const FloaromaFlowerGirl = new NPC('Flower Girl', [
    'Something amazing just happened!',
    'My friend was taking their Eevee on a walk through Eterna Forest, and it suddenly evolved!',
    'Can you believe that?',
]);

const EternaLassCaroline = new NPC('Lass Caroline', [
    'Oh you came from the Forest! That Old Chateau is so creepy isn’t it? I’ve heard that trainers that catch the weird ghost in the TV have found ghosts in other appliances. Even lawnmowers!',
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

const PalParkWarden = new NPC('Pal Park Warden', [
    'Hey! Welcome to the Pal Park, have you been to my Dad’s Safari Zone in Kanto? We don’t have as many Pokémon here, but I’ve heard that a flower Pokémon found here can bloom when it’s sunny outside!',
]);

const CanalaveRiley = new NPC('Riley', [
    'My partner Lucario evolved from a Riolu during daytime when I used a Soothe Bell.',
]);

const CanalaveYoungBoy = new NPC('Young Boy', [
    'Oh hello! Say, have you ever heard of Cresselia? Once when I was really little I had a really bad dream I couldn’t wake up from, but then a kind trainer went to an island near here and got help from Cresselia to cure me!',
    'Maybe if you can prove yourself by conquering that island you could find Cresselia roaming around the region...',
]);

const SnowpointYoungGirl = new NPC('Young Girl', [
    'Someone told me that training an Eevee in Lake Acuity will make it evolve.',
    'They must be lying, how can that be true?!',
]);

const SunyshoreRibbonerJulia = new NPC('Ribboner Julia', [
    'Oh! I don’t get visitors often. My husband is a sailor who visits far away lands… he always tells me these fantastic things.',
    'Did you know that in Johto they don’t see Pokémon like Mamoswine? It’s strange too, because you don’t even need a stone to evolve Piloswine… maybe they should try the Day Care?',
]);

const FightAreaAceTrainer = new NPC('Ace Trainer Quinn', [
    'Something amazing happened on top of Mt. Coronet. We could see it all the way from here. I\'m sure everyone in the entire region saw it.',
    'What? You were there? What happened? What was that purple thing?',
    'The Distortion World? Hold on, I think I\'ve read about that in an old book in the Canalave City library. But according to that book the only entrance to the Distortion World is hidden deep within Sendoff Spring. This is quite the discovery my friend.',
]);

const SurvivalAreaSinnohRoamerNPC = new RoamerNPC('Hiker Kevin', [
    'I spotted a bunch of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.sinnoh);

const ProfRowan = new ProfNPC('Prof. Rowan',
    GameConstants.Region.sinnoh,
    'Congratulations, you\'re more than half-way completed on the national Pokédex!',
    'Next stop is Unova! I\'ve always wanted to visit Castelia City personally...');



//Sinnoh Towns
TownList['Twinleaf Town'] = new Town(
    'Twinleaf Town',
    GameConstants.Region.sinnoh,
    [TwinleafTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
        npcs: [TwinleafContestChampion],
    }
);
TownList['Sandgem Town'] = new Town(
    'Sandgem Town',
    GameConstants.Region.sinnoh,
    [],
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
    [OreburghCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Oreburgh Gate'))],
        npcs: [OreburghConstructionWorker],
    }
);
TownList['Floaroma Town'] = new Town(
    'Floaroma Town',
    GameConstants.Region.sinnoh,
    [FloaromaTownShop],
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
    [EternaCityShop, new MoveToDungeon(dungeonList['Team Galactic Eterna Building'])],
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
    [HearthomeCityShop, SinnohBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 208)],
        npcs: [HearthomeContestFan],
    }
);
TownList['Solaceon Town'] = new Town(
    'Solaceon Town',
    GameConstants.Region.sinnoh,
    [SolaceonTownShop],
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
    [PastoriaShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213)],
    }
);
TownList['Celestic Town'] = new Town(
    'Celestic Town',
    GameConstants.Region.sinnoh,
    [CelesticTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Fen)],
    }
);
TownList['Pal Park'] = new Town(
    'Pal Park',
    GameConstants.Region.sinnoh,
    [PalParkShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 221)],
        npcs: [PalParkWarden],
    }
);
TownList['Canalave City'] = new Town(
    'Canalave City',
    GameConstants.Region.sinnoh,
    [CanalaveCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)],
        npcs: [CanalaveRiley, CanalaveYoungBoy],
    }
);
TownList['Snowpoint City'] = new Town(
    'Snowpoint City',
    GameConstants.Region.sinnoh,
    [SnowpointCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 217)],
        npcs: [SnowpointYoungGirl],
    }
);
TownList['Sunyshore City'] = new Town(
    'Sunyshore City',
    GameConstants.Region.sinnoh,
    [SunyshoreCityShop],
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
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
        npcs: [FightAreaAceTrainer],
    }
);
TownList['Survival Area'] = new Town(
    'Survival Area',
    GameConstants.Region.sinnoh,
    [SurvivalAreaShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)],
        npcs: [SurvivalAreaSinnohRoamerNPC],
    }
);
TownList['Resort Area'] = new Town(
    'Resort Area',
    GameConstants.Region.sinnoh,
    [ResortAreaShop],
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
const AspertiaCityShop = new Shop([
    ItemList['Pokeball'],
]);
const FloccesyTownShop = new Shop([
    ItemList['Mystery_egg'],
]);
const VirbankCityShop = new Shop([
    ItemList['Greatball'],
]);
const CasteliaCityShop = new Shop([
    ItemList['Trade_stone'],
    ItemList['Water_egg'],
    ItemList['Kings_rock'],
]);
const NimbasaCityShop = new Shop([
    ItemList['Grass_egg'],
    ItemList['Electric_egg'],
    ItemList['Metal_coat'],
]);
const DriftveilCityShop = new Shop([
    ItemList['Zorua'],
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
]);
const MistraltonCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Thunder_stone'],
    ItemList['Upgrade'],
]);
const LentimasTownShop = new Shop([
    ItemList['Fire_egg'],
]);
const UndellaTownShop = new Shop([
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
]);
const LacunosaTownShop = new Shop([
    ItemList['Fighting_egg'],
]);
const OpelucidCityShop = new Shop([
    ItemList['Dragon_egg'],
    ItemList['Dragon_scale'],
]);
const HumilauCityShop = new Shop([
    ItemList['Prism_scale'],
]);
const IcirrusCityShop = new Shop([
    ItemList['Dubious_disc'],
    ItemList['Reaper_cloth'],
    ItemList['Protector'],
]);
const BlackAndWhiteParkShop = new Shop([
    ItemList['Moon_stone'],
    ItemList['Sun_stone'],
]);
const NacreneCityShop = new Shop([
    ItemList['Soothe_bell'],
]);
const StriatonCityShop = new Shop([
    ItemList['Leaf_stone'],
    ItemList['Water_stone'],
    ItemList['Fire_stone'],
]);
const AccumulaTownShop = new Shop([
    ItemList['Dusk_stone'],
    ItemList['Shiny_stone'],
    ItemList['Dawn_stone'],
]);
const NuvemaTownShop = new Shop([
    ItemList['Electirizer'],
    ItemList['Magmarizer'],
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

const UnovaRoamerNPC = new RoamerNPC('Professor Juniper\'s Aide', [
    'Our research indicates a higher concentration of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.unova);

const ProfJuniper = new ProfNPC('Prof. Juniper',
    GameConstants.Region.unova,
    'Let me see your progress...Ah, fantastic, as usual!',
    'Allow me some time to arrange tickets for your next destination.');

//Unova Towns
TownList['Aspertia City'] = new Town(
    'Aspertia City',
    GameConstants.Region.unova,
    [AspertiaCityShop],
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
    [CasteliaCityShop, new MoveToDungeon(dungeonList['Castelia Sewers'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Toxic)],
        npcs: [CasteliaMusician],
    }
);
TownList['Nimbasa City'] = new Town(
    'Nimbasa City',
    GameConstants.Region.unova,
    [NimbasaCityShop],
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
    [DriftveilCityShop],
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
    [MistraltonCityShop],
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
    [LentimasTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Jet)],
    }
);
TownList['Undella Town'] = new Town(
    'Undella Town',
    GameConstants.Region.unova,
    [UndellaTownShop, UnovaFluteMaster],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    }
);
TownList['Lacunosa Town'] = new Town(
    'Lacunosa Town',
    GameConstants.Region.unova,
    [LacunosaTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 13)],
    }
);
TownList['Opelucid City'] = new Town(
    'Opelucid City',
    GameConstants.Region.unova,
    [OpelucidCityShop, new MoveToDungeon(dungeonList['Team Plasma Assault'])],
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
    [HumilauCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 21)],
        npcs: [ExcitedChild],
    }
);
TownList['Icirrus City'] = new Town(
    'Icirrus City',
    GameConstants.Region.unova,
    [IcirrusCityShop],
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
    [BlackAndWhiteParkShop],
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
    [NacreneCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinwheel Forest'))],
    }
);
TownList['Striaton City'] = new Town(
    'Striaton City',
    GameConstants.Region.unova,
    [StriatonCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 3)],
    }
);
TownList['Accumula Town'] = new Town(
    'Accumula Town',
    GameConstants.Region.unova,
    [AccumulaTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 2)],
    }
);
TownList['Nuvema Town'] = new Town(
    'Nuvema Town',
    GameConstants.Region.unova,
    [NuvemaTownShop],
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
TownList['Dreamyard'] = new DungeonTown(
    'Dreamyard',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 3)]
);
TownList['P2 Laboratory'] = new DungeonTown(
    'P2 Laboratory',
    GameConstants.Region.unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 17)]
);

//Kalos Shops
const VanivilleTownShop = new Shop([
    ItemList['Pokeball'],
]);
const SantaluneCityShop = new Shop([
    ItemList['Mystery_egg'],
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
    ItemList['Greatball'],
    ItemList['Thunder_stone'],
    ItemList['Electric_egg'],
]);
const AmbretteTownShop = new Shop([
    ItemList['Water_egg'],
    ItemList['Water_stone'],
]);
const GeosengeTownShop = new Shop([
    ItemList['Fire_egg'],
    ItemList['Fire_stone'],
    ItemList['Kings_rock'],
]);
const ShalourCityShop = new Shop([
    ItemList['Fighting_egg'],
    ItemList['Metal_coat'],
    ItemList['Trade_stone'],
]);
const CoumarineCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Grass_egg'],
    ItemList['Leaf_stone'],
    ItemList['Electirizer'],
    ItemList['Magmarizer'],
]);
const LaverreCityShop = new Shop([
    ItemList['Sachet'],
    ItemList['Whipped_dream'],
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
]);
const DendemilleTownShop = new Shop([
    ItemList['Dusk_stone'],
    ItemList['Shiny_stone'],
    ItemList['Dawn_stone'],
    ItemList['Upgrade'],
]);
const AnistarCityShop = new Shop([
    ItemList['Sun_stone'],
    ItemList['Moon_stone'],
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
]);
const CouriwayTownShop = new Shop([
    ItemList['Dragon_egg'],
    ItemList['Dragon_scale'],
    ItemList['Prism_scale'],
]);
const SnowbelleCityShop = new Shop([
    ItemList['Protector'],
    ItemList['Reaper_cloth'],
    ItemList['Dubious_disc'],
]);

//Kalos NPCs

const LumioseEngineer = new NPC('Engineer', [
    'I\'m glad to be back in the city after so long at the Power Plant, it\'s so dusty out there!.',
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
], GameConstants.Region.kalos);

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
    [VanivilleTownShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
        npcs: [],
    }
);
TownList['Aquacorde Town'] = new Town(
    'Aquacorde Town',
    GameConstants.Region.kalos,
    [],
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
    [DepartmentStoreShop,FriseurFurfrouShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)],
        npcs: [ProfSycamore, LumioseEngineer],
    }
);
TownList['Camphrier Town'] = new Town(
    'Camphrier Town',
    GameConstants.Region.kalos,
    [CamphrierTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)],
        npcs: [CamphrierFlabébéEnthusiast],
    }
);
TownList['Ambrette Town'] = new Town(
    'Ambrette Town',
    GameConstants.Region.kalos,
    [AmbretteTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 8)],
    }
);
TownList['Cyllage City'] = new Town(
    'Cyllage City',
    GameConstants.Region.kalos,
    [],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glittering Cave'))],
    }
);
TownList['Geosenge Town'] = new Town(
    'Geosenge Town',
    GameConstants.Region.kalos,
    [GeosengeTownShop, new MoveToDungeon(dungeonList['Team Flare Secret HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 10)],
    }
);
TownList['Shalour City'] = new Town(
    'Shalour City',
    GameConstants.Region.kalos,
    [ShalourCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))],
    }
);
TownList['Coumarine City'] = new Town(
    'Coumarine City',
    GameConstants.Region.kalos,
    [CoumarineCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)],
        npcs: [CoumarineBirdwatcher],
    }
);
TownList['Laverre City'] = new Town(
    'Laverre City',
    GameConstants.Region.kalos,
    [LaverreCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 14)],
        npcs: [LaverreFurisodeGirlKatherine],
    }
);
TownList['Dendemille Town'] = new Town(
    'Dendemille Town',
    GameConstants.Region.kalos,
    [DendemilleTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)],
    }
);
TownList['Anistar City'] = new Town(
    'Anistar City',
    GameConstants.Region.kalos,
    [AnistarCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)],
        npcs: [AnistarKalosRoamerNPC],
    }
);
TownList['Couriway Town'] = new Town(
    'Couriway Town',
    GameConstants.Region.kalos,
    [CouriwayTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)],
    }
);
TownList['Snowbelle City'] = new Town(
    'Snowbelle City',
    GameConstants.Region.kalos,
    [SnowbelleCityShop],
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

const IkiTownOutskirtsShop = new Shop([
    ItemList['Pokeball'],
]);
const HauoliCityShop = new Shop([
    ItemList['Mystery_egg'],
    ItemList['Shiny_stone'],
    ItemList['Dusk_stone'],
    ItemList['Dawn_stone'],
]);
const HeaheaCityShop = new Shop([
    ItemList['Greatball'],
    ItemList['Water_stone'],
    ItemList['Metal_coat'],
    ItemList['Kings_rock'],
]);
const PaniolaTownShop = new Shop([
    ItemList['Grass_egg'],
    ItemList['Fire_egg'],
    ItemList['Water_egg'],
]);
const KonikoniCityShop = new Shop([
    ItemList['Fire_stone'],
    ItemList['Soothe_bell'],
    ItemList['Trade_stone'],
]);
const AetherParadiseShop = new Shop([
    ItemList['Type: Null'],
    ItemList['Upgrade'],
]);
const MalieCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Thunder_stone'],
    ItemList['Electric_egg'],
    ItemList['Magmarizer'],
    ItemList['Electirizer'],
]);
const TapuVillageShop = new Shop([
    ItemList['Ice_stone'],
    ItemList['Razor_claw'],
    ItemList['Razor_fang'],
]);
const SeafolkVillageShop = new Shop([
    ItemList['Fighting_egg'],
    ItemList['Deepsea_scale'],
    ItemList['Deepsea_tooth'],
    ItemList['Prism_scale'],
    ItemList['Sachet'],
    ItemList['Whipped_dream'],
]);
const ExeggutorIslandShop = new Shop([
    ItemList['Dragon_egg'],
    ItemList['Leaf_stone'],
    ItemList['Dragon_scale'],
    ItemList['Protector'],
    ItemList['Dubious_disc'],
    ItemList['Reaper_cloth'],
]);
const AltaroftheSunneandMooneShop = new Shop([
    ItemList['Poipole'],
    ItemList['Sun_stone'],
    ItemList['Moon_stone'],
]);

//Alola NPCs

const IkiOutskirtsMom = new NPC('Scratch Cat Girl', [
    'I love cats very much, but dogs aren\'t so bad either.',
    'Out of all the dog like Pokémon, I think Rockruff is definitely the most adorable. And it even has three evolutions! One during the day, one at night and one in between, from 5 to 6 o\'clock.',
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
    'After completing all of an island\'s trials you will battle that island\'s Kahuna in a Grand trial.',
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
    'You want to know which one can only be found on the farm? I\'m sure you can figure that out yourself. Simple process of elimination really.',
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
    'My trusty Crabrawler was with me. He was smashing some rocks that were blocking the path, having a grand ol\' time like usual, when suddenly we were attacked by a wild pokémon!',
    'After the battle Crabrawler evolved! I didn\'t even know he could do that. He\'s so different now. But I still love him. He\'s my best friend, and he\'s even better at rock smashing now!',
]);
const SeafolkCaptain = new NPC('Captain Mina', [
    'My trial is in this town. Right there, inside my very own houseboat. However, I want you to clear the trial in Vast Poni Canyon first. It has no Captain, so you\'ll be all on your own. Be careful.',
    'If you can clear my trial you\'ll find our Kahuna on Exeggutor Island.',
]);
const AetherParadiseAlolaRoamerNPC = new RoamerNPC('Assistant Branch Chief Wicke', [
    'Some very rare Pokémon have been sighted on {ROUTE_NAME}. I hope we can learn more about them.',
], GameConstants.Region.alola);
const ProfKukui = new ProfNPC('Prof. Kukui',
    GameConstants.Region.alola,
    'TODO',
    'TODO');

//Alola Towns

TownList['Iki Town Outskirts'] = new Town(
    'Iki Town Outskirts',
    GameConstants.Region.alola,
    [IkiTownOutskirtsShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [IkiOutskirtsMom],
    }
);
TownList['Iki Town'] = new Town(
    'Iki Town',
    GameConstants.Region.alola,
    [],
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
    [HauoliCityShop],
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
    [HeaheaCityShop, new DockTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
        npcs: [HeaheaCafeOwner],
    }
);
TownList['Paniola Town'] = new Town(
    'Paniola Town',
    GameConstants.Region.alola,
    [PaniolaTownShop],
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
    [KonikoniCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
        npcs: [KonikoniKahuna],
    }
);
TownList['Aether Paradise'] = new Town(
    'Aether Paradise',
    GameConstants.Region.alola,
    [TemporaryBattleList['Ultra Wormhole'], AetherParadiseShop, new MoveToDungeon(dungeonList['Aether Foundation'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
        npcs: [AetherParadiseAlolaRoamerNPC],
    }
);
TownList['Malie City'] = new Town(
    'Malie City',
    GameConstants.Region.alola,
    [MalieCityShop, new DockTownContent()],
    {
        requirements: [new TemporaryBattleRequirement('Ultra Wormhole')],
        npcs: [MalieKahuna],
    }
);
TownList['Tapu Village'] = new Town(
    'Tapu Village',
    GameConstants.Region.alola,
    [TapuVillageShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 13)],
        npcs: [TapuWorker],
    }
);
TownList['Seafolk Village'] = new Town(
    'Seafolk Village',
    GameConstants.Region.alola,
    [SeafolkVillageShop, new MoveToDungeon(dungeonList['Mina\'s Houseboat'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation'))],
        npcs: [SeafolkCaptain],
    }
);
TownList['Exeggutor Island'] = new Town(
    'Exeggutor Island',
    GameConstants.Region.alola,
    [ExeggutorIslandShop, new MoveToDungeon(dungeonList['Exeggutor Island Hill'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    }
);
TownList['Altar of the Sunne and Moone'] = new Town(
    'Altar of the Sunne and Moone',
    GameConstants.Region.alola,
    [TemporaryBattleList['Ultra Megalopolis'], AltaroftheSunneandMooneShop],
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
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)]
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
    [new RouteKillRequirement(10, GameConstants.Region.alola, 7)]
);
TownList['Lush Jungle'] = new DungeonTown(
    'Lush Jungle',
    GameConstants.Region.alola,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 8)]
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
    [new RouteKillRequirement(10, GameConstants.Region.alola, 22)]
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
    [new TemporaryBattleRequirement('Ultra Megalopolis')]
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
    ItemList['Pokeball'],
]);
const WedgehurstShop = new Shop([
    ItemList['Greatball'],
    ItemList['Mystery_egg'],
]);
const CirchesterShop = new Shop([
    ItemList['Ice_stone'],
]);
const TurffieldShop = new Shop([
    ItemList['Grass_egg'],
]);
const HulburyShop = new Shop([
    ItemList['Water_egg'],
    ItemList['Toxel'],
]);
const MotostokeShop = new Shop([
    ItemList['Fire_egg'],
]);
const HammerlockeShop = new Shop([
    ItemList['Dragon_egg'],
    ItemList['Eternatus'],
]);
const StowonSideShop: Shop = new Shop([
    ItemList['Fighting_egg'],
]);
const SpikemuthShop = new Shop([
    ItemList['Electric_egg'],
]);
const WyndonShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Token_collector'],
    ItemList['Item_magnet'],
    ItemList['Lucky_incense'],
]);


//Galar NPC


const Mom = new NPC('Mom', [
    'Don\'t go too far into the Slumbering Weald.',
    'I\'ve heard there are some very strong Pokemon in there.',
    'Only those who beat the champion are strong enough to face them!',
]);
const TrainStationGuy = new NPC('Train Station Guy', [
    'There are some areas around Galar that you can only reach after beating the Champion.',
    'One is sparsely populated, but the other is teeming with Pokemon.',
    'There are plenty of unique, powerful ones there, too!',
]);
const ProfMagnolia = new ProfNPC('Prof. Magnolia',
    GameConstants.Region.galar,
    'TODO: Add text before Galar is released',
    'TODO: Add text before Galar is released');


//Galar towns

TownList['Postwick'] = new Town(
    'Postwick',
    GameConstants.Region.galar,
    [PostwickShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
        npcs: [ProfMagnolia, Mom],
    }
);
TownList['Wedgehurst'] = new Town(
    'Wedgehurst',
    GameConstants.Region.galar,
    [WedgehurstShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
        npcs: [TrainStationGuy],
    }
);
TownList['Motostoke'] = new Town(
    'Motostoke',
    GameConstants.Region.galar,
    [MotostokeShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 6)],
    }
);
TownList['Turffield'] = new Town(
    'Turffield',
    GameConstants.Region.galar,
    [TurffieldShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 11)],
    }
);
TownList['Hulbury'] = new Town(
    'Hulbury',
    GameConstants.Region.galar,
    [HulburyShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 12)],
    }
);
TownList['Stow-on-Side'] = new Town(
    'Stow-on-Side',
    GameConstants.Region.galar,
    [GymList['Stow-on-Side1'], GymList['Stow-on-Side2'], StowonSideShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 15)],
    }
);
TownList['Ballonlea'] = new Town(
    'Ballonlea',
    GameConstants.Region.galar,
    [],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))],
    }
);
TownList['Hammerlocke'] = new Town(
    'Hammerlocke',
    GameConstants.Region.galar,
    [HammerlockeShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 14)],
    }
);
TownList['Circhester'] = new Town(
    'Circhester',
    GameConstants.Region.galar,
    [GymList['Circhester1'], GymList['Circhester2'], CirchesterShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 18)],
    }
);
TownList['Spikemuth'] = new Town(
    'Spikemuth',
    GameConstants.Region.galar,
    [SpikemuthShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 22)],
    }
);
TownList['Wyndon'] = new Town(
    'Wyndon',
    GameConstants.Region.galar,
    [WyndonShop, new MoveToDungeon(dungeonList['Rose Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 24)],
    }
);
TownList['Wyndon Stadium'] = new Town(
    'Wyndon Stadium',
    GameConstants.Region.galar,
    [GymList['Trainer Marnie'], GymList['Gym Leader Bede'], GymList['Trainer Hop'], GymList['Champion Leon'], pokeLeagueShop()],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower')),
        ],
    }
);
//Isle of Armor towns

TownList['Master Dojo'] = new Town(
    'Master Dojo',
    GameConstants.Region.galar,
    [new MoveToDungeon(dungeonList['Master Dojo Trial'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
    }
);
TownList['Master Dojo Battlefield'] = new Town(
    'Master Dojo Battlefield',
    GameConstants.Region.galar,
    [GymList['Gym Leader Klara'], GymList['Gym Leader Avery'], GymList['Dojo Master Mustard'], pokeLeagueShop()],
    {
        requirements: [
            new MultiRequirement([
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Darkness')),
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Water')),
            ]),
        ],
    }
);

//Crown Tundra Towns
TownList['Freezington'] = new Town(
    'Freezington',
    GameConstants.Region.galar,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
    }
);


//Galar Dungeons


TownList['Slumbering Weald'] = new DungeonTown(
    'Slumbering Weald',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Inner Slumbering Weald'] = new DungeonTown(
    'Inner Slumbering Weald',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TownList['Galar Mine'] = new DungeonTown(
    'Galar Mine',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 10)]
);
TownList['Galar Mine No. 2'] = new DungeonTown(
    'Galar Mine No. 2',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Galar_Water)]
);
TownList['Glimwood Tangle'] = new DungeonTown(
    'Glimwood Tangle',
    GameConstants.Region.galar,
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Rock),
            new GymBadgeRequirement(BadgeEnums.Galar_Ice),
        ]),
    ]
);
TownList['Rose Tower'] = new DungeonTown(
    'Rose Tower',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 24)]
);
TownList['Watchtower Ruins'] = new DungeonTown(
    'Watchtower Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 4)]
);
TownList['Dusty Bowl'] = new DungeonTown(
    'Dusty Bowl',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Galar_Fire)]
);
TownList['Lake of Outrage'] = new DungeonTown(
    'Lake of Outrage',
    GameConstants.Region.galar,
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TownList['Master Dojo Trial'] = new DungeonTown(
    'Master Dojo Trial',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 25)]
);
TownList['Tower of Darkness'] = new DungeonTown(
    'Tower of Darkness',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 34)]
);
TownList['Tower of Water'] = new DungeonTown(
    'Tower of Water',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 28)]
);
TownList['Rock Peak Ruins'] = new DungeonTown(
    'Rock Peak Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
);
TownList['Iron Ruins'] = new DungeonTown(
    'Iron Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 43)]
);
TownList['Iceberg Ruins'] = new DungeonTown(
    'Iceberg Ruins',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 51)]
);
TownList['Split-Decision Ruins'] = new DungeonTown(
    'Split-Decision Ruins',
    GameConstants.Region.galar,
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 48),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Iron Ruins')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Iceberg Ruins')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rock Peak Ruins')),
        ]),
    ]
);
TownList['Dyna Tree Hill'] = new DungeonTown(
    'Dyna Tree Hill',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 50)]
);
TownList['Crown Shrine'] = new DungeonTown(
    'Crown Shrine',
    GameConstants.Region.galar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 53)]
);
