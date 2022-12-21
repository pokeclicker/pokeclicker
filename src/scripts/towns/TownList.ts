/* eslint-disable array-bracket-newline */
///<reference path="../../declarations/requirements/RouteKillRequirement.d.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../quests/BulletinBoard.ts"/>
///<reference path="BattleCafe.ts"/>
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
    new PokeballItem(GameConstants.Pokeball.Masterball, 10000000, GameConstants.Currency.money       , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.money]}` }, 'Master Ball'),
    new PokeballItem(GameConstants.Pokeball.Masterball, 75000   , GameConstants.Currency.dungeonToken, { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.dungeonToken]}` }, 'Master Ball'),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.questPoint  , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.questPoint]}` }, 'Master Ball'),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.farmPoint   , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.farmPoint]}` }, 'Master Ball'),
    new PokeballItem(GameConstants.Pokeball.Masterball, 50      , GameConstants.Currency.diamond     , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.diamond]}` }, 'Master Ball'),
    ItemList.Protein,
    // TODO VITAMINS: Move these to different shops?
    ItemList.Calcium,
    ItemList.Carbos,
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
], 'Shady Deal');
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
const ClientIslandShop = new Shop([
    ItemList['Charity Chansey'],
], 'Gift Shop');
const FourIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.Soothe_bell,
]);
const FiveIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dragon_scale,
]);
const SixIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_egg,
    ItemList.Prism_scale,
]);
const SevenIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Token_collector,
]);
const MikanIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Metal_coat,
]);
const NavelIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Kings_rock,
]);
const TrovitaIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Deepsea_tooth,
    ItemList.Deepsea_scale,
]);
const KumquatIslandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Upgrade,
]);
const ValenciaPokémonCenterShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Dowsing_machine,
    ItemList.Sun_stone,
]);
const PinkanPokémonReserveShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_incense,
]);
const TanobyRuinsShop = new Shop([
    ItemList['Pinkan Dodrio'],
], 'Trade with Prof. Ivy');

const PinkanBerryMaster = new BerryMasterShop(GameConstants.BerryTraderLocations['Pinkan Pokémon Reserve'],[
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
], 'Officer Jenny\'s Pinkan Trade Shop', [new QuestLineCompletedRequirement('Team Rocket\'s Pinkan Theme Park')]);

// Kanto NPCs

const PalletProfOak = new ProfNPC('Prof. Oak',
    GameConstants.Region.kanto,
    'Congratulations on completing your Kanto Pokédex!',
    'Your journey isn\'t over yet, a whole world awaits you! Onwards to Johto!',
    'assets/images/npcs/Professor Oak.png',
    // Prevent Prof. Oak clones during Celebi questline
    new OneFromManyRequirement([new QuestLineStartedRequirement('Unfinished Business', GameConstants.AchievementOption.less), new QuestLineCompletedRequirement('Unfinished Business'), new QuestLineStepCompletedRequirement('Unfinished Business', 2)]));

const PalletMom1 = new NPC('Mom', [
    'So you\'re really leaving on your very own Pokémon journey. I\'m so proud of you. Let me give you some words of wisdom for your travels.',
    'Traveling on your own can be scary. But remember that there are nice people everywhere you go. So strike up a conversation! You will probably learn something useful.',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Tutorial Quests', 2), new QuestLineStepCompletedRequirement('Tutorial Quests', 3, GameConstants.AchievementOption.less)]),
});
const PalletMom2 = new NPC('Mom', [
    'Remember that there are nice people everywhere you go. So strike up a conversation! You will probably learn something useful.',
], {
    requirement: new QuestLineStepCompletedRequirement('Tutorial Quests', 3),
});
const PalletCelebiProfOak1 = new NPC('Prof. Oak', [
    'Good of you to come see me. I need you to pick up something for me. A special kind of Poké Ball, found by Professor Ivy. She lives on one of the Sevii Islands, east of Three Island.',
    'I don\'t know who else to trust with this. It\'s very important and very valuable.',
    'Feel free to take your time, but please don\'t get distracted for the duration of an entire filler anime season.',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Unfinished Business'), new QuestLineStepCompletedRequirement('Unfinished Business', 1, GameConstants.AchievementOption.less)]),
});
const PalletCelebiProfOak2 = new NPC('Prof. Oak', [
    'Ah, the fabled GS Ball. Let me have a look.',
    'Hm. I just can\'t figure this out. There\'s clearly something inside, but I just can\'t get the darned thing to open.',
    'I know just the man for the job! Kurt, a Poké Ball expert. He lives in Azalea Town, in Johto. Please deliver the GS Ball to him.',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 1), new QuestLineStepCompletedRequirement('Unfinished Business', 2, GameConstants.AchievementOption.less)]),
});
const ViridianCityOldMan1 = new NPC('Old Man', [
    'Leave me alone. I need my coffee.',
], {
    image: 'assets/images/npcs/Old Man.png',
    requirement: new QuestLineStepCompletedRequirement('Tutorial Quests', 4, GameConstants.AchievementOption.less),
});
const ViridianCityOldMan2 = new NPC('Old Man', [
    'Ahh, I\'ve had my coffee now and I feel great!',
    'You can use the Poké Ball Selector to select which type of Poké Ball to use on specific Pokémon based on caught status. The options, from left to right, are "Caught", "Caught Shiny", "New", "New Shiny".',
    'For example, if you click on the empty ball below the word "Caught" and assign a Poké Ball, you will then start throwing Poké Balls at Pokémon you\'ve already caught before. This can be very useful if you need Dungeon Tokens.',
    'Here, let me show you how it works.',
    'I\'ll always be here to explain it again if you forget.',
], {
    image: 'assets/images/npcs/Old Man.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Tutorial Quests', 4), new QuestLineStepCompletedRequirement('Tutorial Quests', 5, GameConstants.AchievementOption.less)]),
});
const ViridianCityOldMan3 = new NPC('Old Man', [
    'You can use the Poké Ball Selector to select which type of Poké Ball to use on specific Pokémon based on caught status. The options, from left to right, are "Caught", "Caught Shiny", "New", "New Shiny".',
    'For example, if you click on the empty ball below the word Caught and assign a Poké Ball, you will then start throwing Poké Balls at Pokémon you\'ve already caught before. This can be very useful if you need Dungeon Tokens.',
    'I\'ll always be here to explain it again if you forget.',
], {
    image: 'assets/images/npcs/Old Man.png',
    requirement: new QuestLineStepCompletedRequirement('Tutorial Quests', 5),
});
const PewterBattleItemRival = new NPC('Battle Item Master', [
    'Hey kid, you look new! Let me offer some advice: Battle Items like X Attack can be acquired along Routes, inside Dungeons and in Shops!',
    'Use them to help you out whenever you feel like time is against you!',
]);

const PewterScientist = new NPC('Gem Scientist', [
    'I see you are carrying a Gem Case. Here at the museum we study space, fossils and gems!',
    'When you defeat a Pokémon you gain a gem of that Pokémon\'s type. If the Pokémon has two types you gain one for each! Defeating very strong Pokémon, such as those owned by gym leaders, gets you five!',
    'You can click Gems in the Start Menu to boost your damage using these gems. For example, using rock gems you can boost the super effective damage of your rock type Pokémon! Those flying types had better watch out for your might!',
    'You can even use this to eliminate immunities! By using electric gems to boost your electric type immune damage, your electric Pokémon can suddenly do damage against ground types!',
], {
    image: 'assets/images/trainers/Scientist (female).png',
    requirement: new GymBadgeRequirement(BadgeEnums.Earth),
});

const Route3ShadySalesman = new NPC('Shady Salesman', [
    'Have I got a deal just for you!',
    'I\'ll let you have a super secret Pokémon. For the right price!',
], {image: 'assets/images/trainers/Burglar.png'});

const CeruleanKantoBerryMaster = new KantoBerryMasterNPC('Berry Master', [
    'Bah! You younglings have no appreciation of the art of Berry farming!',
    'Come back when you are ready to learn!',
]);

const CeruleanSuperNerd = new NPC('Super Nerd Jovan', [
    'In my spare time I like to play this kickass browser game. It takes ages to get all the best stuff.',
    'Then one day, all my progress was gone. I don\'t know exactly what happened. Something updated, some cookies got cleaned up, I don\'t know. I had to start all over from the beginning.',
    'That day I learned that I should frequently download a save.',
], {image: 'assets/images/trainers/Super Nerd.png'});

const CeruleanEusine = new NPC('Eusine', [
    'Puff, puff... I am...no match for you. ...As I predicted.',
    '..................',
    'Go ahead. Since I met you in Ecruteak City, I\'ve sort of known that Suicune would choose you.',
    'Take a look at it! Suicune is still there waiting for you! It has been waiting for a worthy Trainer to whom it can entrust itself!',
],
{
    image: 'assets/images/temporaryBattle/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 9), new QuestLineCompletedRequirement('Eusine\'s Chase', GameConstants.AchievementOption.less )]),
});

const VermilionFanClubChairman = new NPC('Fan Club Chairman', [
    'You won’t find a Pokémon as wonderful as my favorite Rapidash in those Typed Eggs in the shops, but they might hatch rare Pokémon you can’t find anywhere else!',
], {image: 'assets/images/npcs/Gentleman (Gen 4).png'});

const VermilionShardApprentice = new NPC('Shard Apprentice', [
    'Are you looking for some Shards? You can find them in many Dungeons! Except in Viridan Forest and Mt. Moon. I\'ve never found any Shards there for some reason.',
    'I happen to know that there are some Yellow and Blue Shards in Diglett\'s Cave. Just look inside the chests!',
    'Shards can have lots of different colors. Different Dungeons will have different colors, so keep an eye out! Most of them can\'t even be found in Kanto!',
]);

const VermilionEusine = new NPC('Eusine', [
    'That was so close! I thought I could corner it by ambushing it here... But running on the water... is beyond me. Still, I am starting to see a pattern. Suicune prefers water! That means...',
    'Sorry, I\'ve got to go!',
],
{
    image: 'assets/images/temporaryBattle/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 5), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 7, GameConstants.AchievementOption.less )]),
});

const LavenderMrFuji = new NPC('Mr. Fuji', [
    'Welcome. In our Volunteer House here we take in all kinds of Pokémon to care for them.',
    'Did you know that sparkling Pokémon are more often found in Dungeons, on Farms, from Eggs, and even from Shops, the Safari Zone, and Evolutions from Items?',
], {image: 'assets/images/npcs/Mr. Fuji.png'});

const LavenderChanneler = new NPC('Channeler Karina', [
    'I know a lot of useful stuff. Like the odds of finding a shiny Pokémon or how to increase Click Attack.',
    'No, I didn\'t learn this from talking to ghosts, don\'t be silly. There\'s a FAQ button in the Start Menu. It\'s very useful.',
], {image: 'assets/images/trainers/Channeler.png'});

const BigSpender = new NPC('Big Spender', [
    'I love shopping! When I come in, the cashiers know I want tons of items.',
    'You can use the Shop Amount Button settings to make it easy for big purchases, too!',
], {image: 'assets/images/trainers/Beauty.png'});

const EggHuntErika = new NPC('Erika', [
    'And here comes another one. Let me guess, you\'re gonna ask me about the Togepi too?',
    'Listen here you. Just because I\'m the Grass type gym leader doesn\'t mean I know everything that goes on in the forest! I live in one of the biggest cities in the region! With tall buildings! And gambling! And crime! I like it here! I don\'t care about the forest!',
    '...',
    'All right, fine. It just so happens that I have heard about <span style="font-style: italic">something</span> going on in Viridian Forest. But I don\'t know what, and I don\'t care! You can go figure it out! I\'m staying here! Viridian Forest doesn\'t even have any Grass types. It\'s all Bugs over there.',
], {
    image: 'assets/images/gymLeaders/Erika.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Togepi Egg Hunt'), new QuestLineCompletedRequirement('Togepi Egg Hunt', GameConstants.AchievementOption.less)]),
});

const SaffronBattleItemRival = new NPC('Battle Item Master', [
    'Do I know you? Wait... Have you met my worthless rival? Ha! Let me guess, he gave you some unwanted advice?',
    'I bet he forget to tell you that although all Battle Items only last for 30 seconds, they can stack and last for days! Now scram!',
]);

const SaffronBreeder = new NPC('Breeder', [
    'You can leave your level 100 Pokémon with us up at the Hatchery. Breeding them will reset their level, but they will be stronger! They gain 25% of their base attack!',
    'And the best part is you can keep doing it over and over and over again! The sky is the limit! Reach for the stars!',
    'With Protein your Pokémon will become even stronger when you breed them. I hear they sell it at the Indigo Plateau.',
], {
    image: 'assets/images/trainers/Pokémon Breeder (female).png',
    requirement: new GymBadgeRequirement(BadgeEnums.Earth),
});

const FuchsiaKantoRoamerNPC = new RoamerNPC('Youngster Wendy', [
    'There\'s been some recent sightings of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.kanto, RoamingPokemonList.findGroup(GameConstants.Region.kanto, GameConstants.KantoSubRegions.Kanto));

const FuchsiaEusine = new NPC('Eusine', [
    'You! Not again! I\'ll be there first next time! Having followed it here, I\'m starting to understand what Suicune is after.',
    'To be honest, I would like to keep this information to myself. But I want to be an honest Trainer in front of Suicune! That\'s why I am sharing a clue with you.',
    'It seems that... Suicune prefers a hilly place near water... Somewhere north. I don\'t know exactly where, yet. It will be just you and me! Who\'ll find it first? I challenge you!',
],
{
    image: 'assets/images/temporaryBattle/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 7), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 9, GameConstants.AchievementOption.less )]),
});

const CinnabarIslandResearcher = new NPC('Researcher', [
    'They were trying to clone an ancient Pokémon in the mansion... I wonder if they succeeded.',
    'Apparently the ancient Pokémon escaped, and can be found roaming around Kanto!',
], {image: 'assets/images/trainers/Scientist (male).png'});

const OneIslandCelio1 = new NPC ('Celio', [
    'Ah, yes. Welcome! Welcome! Almost didn\'t see you there. I\'m just so busy trying to get this darned thing to work. Once it\'s complete we can finally have a direct communications network between the Sevii Islands and Kanto!',
    'I don\'t even have time to go and pick up an important package. A meteorite, found by the owner of the game corner on Two Island. It contains important materials for my machine.',
    'You seem like the adventuring type. Tell you what. How about Bill stays here with me to work on this machine, and you go fetch my Meteorite for me.',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new QuestLineStepCompletedRequirement('Bill\'s Errand', 1, GameConstants.AchievementOption.less),
});
const OneIslandCelio2 = new NPC ('Celio', [
    'Back already? That didn\'t take very long.',
    'What? It did take long? You went on a whole rescue mission? Seems like I lost track of time while working on my machine with Bill. It\'s been a lot of fun.',
    'I\'m glad to hear Lostelle is all right. You can hand the meteorite to me. Bill, thank you for your assistance, I\'ll take it from here. I can see that your friend is eager to get back to Kanto and challenge the Pokémon League.',
    'Thank you both very much.',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Errand', 5), new QuestLineCompletedRequirement('Bill\'s Errand', GameConstants.AchievementOption.less)]),
});
const OneIslandCelio3 = new NPC ('Celio', [
    'You\'ve been a great help. Thanks again. Maybe we\'ll meet again some day...',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('Bill\'s Errand'), new QuestLineStartedRequirement('Celio\'s Errand', GameConstants.AchievementOption.less)]),
});
const OneIslandCelio4 = new NPC ('Celio', [
    'How have things been for you? Oh, is that right? You\'ve caught more Pokémon. Do you know what? Maybe I can be useful to you. I\'m modifying the Network Machine right now. I\'m changing it so it can handle trades over long distances. When I get finished, you\'ll be trading for exotic Pokémon from Trainers far away.',
    'But, there is a slight catch. For the link to work, the Machine needs a special gemstone. It\'s supposed to be on One Island, but I haven\'t found one yet. Who knows where it could be.',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Celio\'s Errand'), new QuestLineStepCompletedRequirement('Celio\'s Errand', 1, GameConstants.AchievementOption.less)]),
});
const OneIslandCelio5 = new NPC ('Celio', [
    'Oh! Th-that\'s... Thank you! You\'re simply amazing. ... ... ... ... Um... May I ask one more giant favor of you?',
    'While I was studying gemstones, I discovered something important. There is another gem that forms a pair with this Ruby. That other gemstone is supposed to be in the Sevii Islands. Please, I need you to go find the other gem.',
    'Here, take my ferry pass. It will let you get to all of the Sevii Islands. Please, I can\'t do it without your help.',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 4), new QuestLineStepCompletedRequirement('Celio\'s Errand', 6, GameConstants.AchievementOption.less)]),
});
const OneIslandCelio6 = new NPC ('Celio', [
    'So this is the gem that forms a pair with the Ruby... You\'ve gone through a lot to get this, didn\'t you? You don\'t have to tell me. I know it wasn\'t easy. Thank you so much! Now it\'s my turn to work for you! Please give me a little time.',
    'Okay, this is good... I did it! I linked up with Lanette! I did it! I\'ve managed to link up with Trainers in the Hoenn region! Finally, the Network Machine is fully operational! I owe it all to you! Thanks to you, my dream came true...',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 12), new QuestLineCompletedRequirement('Celio\'s Errand', GameConstants.AchievementOption.less)]),
});
const OneIslandCelio7 = new NPC ('Celio', [
    'I... I\'m not crying. That\'s enough about me! You\'re going to keep looking for exotic Pokémon, right? I wish you the best of luck!',
], {
    image: 'assets/images/npcs/Celio.png',
    requirement: new QuestLineCompletedRequirement('Celio\'s Errand'),
});
const OneIslandYoungster = new NPC ('Youngster', [
    'Isn\'t it strange how Mol<b><i>tres</i></b> lives on <b><i>One</i></b> Island?',
], {
    image: 'assets/images/trainers/Youngster.png',
    requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Ember Summit')),
});
const TwoIslandGameCornerOwner1 = new NPC ('Game Corner Owner', [
    'Hello stranger. I\'m afraid the Game Corner is currently closed.',
    'What? The meteorite for Celio? Yes, I can give that to you. But I need you to do something for me first.',
    'My daughter Lostelle is missing. She likes to pick berries in the Berry Forest on Three Island. She does it all the time. But this time she hasn\'t come back. Please go find her.',
], {
    requirement: new QuestLineStepCompletedRequirement('Bill\'s Errand', 4, GameConstants.AchievementOption.less),
});
const TwoIslandGameCornerOwner2 = new NPC ('Game Corner Owner', [
    'My sweet Lostelle! I\'m so glad you\'re all right.',
    'Thank you very much kind stranger. Please take the Meteorite.',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Errand', 4), new QuestLineCompletedRequirement('Bill\'s Errand', GameConstants.AchievementOption.less )]) });
const ThreeIslandBiker1 = new NPC ('Biker', [
    'You know what sucks? The other islands are off limits for some arbitrary reason. There is no explanation. Just can\'t go there.',
    'Alright, you want the real truth? Some weird old dude told me this: "The other islands are locked behind part of a "Quest Line" You have to progress to unlock it."',
    'I don\'t know what half those words mean. All I know is I can\'t go back to Kanto with the rest of the gang. This sucks.',
], {
    image: 'assets/images/temporaryBattle/Biker Goon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Errand', 3), new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion, GameConstants.AchievementOption.less)]),
});
const ThreeIslandBiker2 = new NPC ('Biker', [
    'You know what sucks? The other islands are off limits for some arbitrary reason. There is no explanation. Just can\'t go there.',
    'Alright, you want the real truth? Some weird old dude told me this: "The other islands are locked behind part of a Questline. You can unlock it at a Bulletin Board."',
    'I don\'t know what half those words mean. All I know is I can\'t go back to Kanto with the rest of the gang. This sucks.',
], {
    image: 'assets/images/temporaryBattle/Biker Goon.png',
    requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), new QuestLineStepCompletedRequirement('Celio\'s Errand', 5 , GameConstants.AchievementOption.less)]),
});
const ThreeIslandBiker3 = new NPC ('Biker', [
    'You know what sucks? The other islands are off limits for some arbitrary reason. There is no explanation. Just can\'t go there.',
    'Wait, you got to them? Good for you. Not that it matters to me, I\'m still stuck here. This sucks.',
], {
    image: 'assets/images/temporaryBattle/Biker Goon.png',
    requirement: new QuestLineStepCompletedRequirement('Celio\'s Errand', 5),
});
const CelebiProfIvy = new NPC ('Prof. Ivy', [
    'Welcome to Valencia Island! Well, this tiny beach on Valencia Island. I don\'t know why I decided to have this lab built below this giant cliff... Can\'t even get to the rest of the island from here.',
    'This is the GS Ball. I found it here recently. Professor Oak seemed very interested. Please deliver it to him at your earliest convenience.',
    'But first, wanna get involved in our regional Pokémon League? No? Maybe another time then.',
], {
    image: 'assets/images/npcs/Professor Ivy.png',
    requirement: new QuestLineStepCompletedRequirement('Unfinished Business', 2, GameConstants.AchievementOption.less),
});
const SeviiRocketGrunts = new NPC ('Team Rocket Grunts', [
    'Whew, punched through at last. Let\'s go treasure hunting! Any treasure we find, we haul back to the Warehouse, understood?',
    '...Oh, what are the passwords? At the Rocket Warehouse, I mean.',
    'What, you forgot the password? There\'re actually two. The first one\'s "Goldeen need log". And the second one is...',
    'Hey! This snoop\'s been listening in!',
], {
    image: 'assets/images/npcs/Team Rocket Grunts.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 0), new QuestLineStepCompletedRequirement('Celio\'s Errand', 2, GameConstants.AchievementOption.less)]),
});
const SeviiRuby = new NPC ('Ruby', [
    '<img src="assets/images/npcs/textbody/ruby.png">',
    '<i>You found a Ruby!</i>',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 3), new QuestLineStepCompletedRequirement('Celio\'s Errand', 4, GameConstants.AchievementOption.less )]) });
const SeviiLorelei = new NPC ('Lorelei', [
    'Thank you. But this is awful... I was born and raised here on these islands. I had no idea that those horrible criminals were loose here…',
], {
    image: 'assets/images/gymLeaders/Lorelei.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 6), new QuestLineStepCompletedRequirement('Celio\'s Errand', 8, GameConstants.AchievementOption.less)]),
});
const SeviiGideon1 = new NPC ('Gideon', [
    'I can\'t figure out how I\'m supposed to get inside. Let me tell you, I found this place. Don\'t look so envious, will you?',
], {
    image: 'assets/images/temporaryBattle/Scientist Gideon.png',
    requirement: new QuestLineStepCompletedRequirement('Celio\'s Errand', 7, GameConstants.AchievementOption.less),
});
const SeviiGideon2 = new NPC ('Gideon', [
    'Fufu... Fufufufu... I guessed right. I was right in tailing you! I knew there was a Sapphire here, so it belongs to me! I\'ll sell it to Team Rocket for serious money.',
    '...D-don\'t glare at me like that! If you want it back, why don\'t you go get it after I sell it? I\'ll even tell you one of the passwords to Team Rocket\'s Warehouse. The Warehouse password I know is "Yes, nah, Chansey." I\'m done. Don\'t think badly of me!',
], {
    image: 'assets/images/temporaryBattle/Scientist Gideon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 7), new QuestLineStepCompletedRequirement('Celio\'s Errand', 9, GameConstants.AchievementOption.less)]),
});
const SixIslandSeviiRoamerNPC = new RoamerNPC('Bug Catcher John', [
    'Apparently some kid released one of his Pokémon around here. That Pokémon, its partner, and for whatever reason, the Legendary Beasts from Johto have been seen roaming on {ROUTE_NAME}.',
], GameConstants.Region.kanto, RoamingPokemonList.findGroup(GameConstants.Region.kanto, GameConstants.KantoSubRegions.Sevii4567), 'assets/images/trainers/Bug Catcher.png', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion));
const AlteringCaveRuinManiac1 = new NPC ('Ruin Maniac', [
    'Hello. You want to know what I\'m doing in this pointless dead end cave?',
    'Well, I\'m trying to dig to a secluded island north of here. I\'ve heard there are some unusual Pokémon there.',
    'Want to help me? No? Ah, you\'re busy dealing with a group of Team Rocket? Well, I wish you luck with that',
    'Once I finish it you\'ll have a way to get to get to that island too, so make sure to come back later!',
], {
    image: 'assets/images/npcs/Ruin Maniac.png',
    requirement: new QuestLineCompletedRequirement('Celio\'s Errand', GameConstants.AchievementOption.less),
});
const AlteringCaveRuinManiac2 = new NPC ('Ruin Maniac', [
    'Wow, that was some back breaking work... But I have done it!',
    'I\'ve dug a tunnel to Pinkan Island! Though, I think I\'ll need to rest for a while first... You go on ahead.',
], {
    image: 'assets/images/npcs/Ruin Maniac.png',
    requirement: new QuestLineCompletedRequirement('Celio\'s Errand'),
});
const ValenciaProfIvy = new NPC ('Prof. Ivy', [
    'Hello again! I see you too found a way around the giant cliff.',
    'On this island, pokémon have changed over the years. I am here to study them.',
    'Oh, you have already encountered them? And you are busy with the Orange League?',
    'Well, good luck to you, then.',
], {image: 'assets/images/npcs/Professor Ivy.png'});
const TanobyProfIvy = new NPC ('Prof. Ivy', [
    'Hello again! I see you too found your way to these ancient ruins!',
    'A peculiar Pokémon known as Unown lives here. There are 28 different forms of Unown, but only one shows up at a time, but the form that appears changes every time the clock strikes midnight.',
    'There are 2 other ruins like this, one in Johto, and one in Sinnoh. I have heard that in each ruins, there are forms that only appear there. For example, the forms that resemble a question mark and an exclamation point have only been seen here.',
    'Speaking of peculiar Pokémon, I found this unusual variant of Dodrio on an island in this area. Hmm. If you want, you could buy it from me. I am needing some research funds.',
], {image: 'assets/images/npcs/Professor Ivy.png'});
const PinkanOfficerJenny1 = new NPC ('Officer Jenny', [
    'Have you seen the Pinkan Berries? That is what makes all the Pokémon on this island turn pink.',
    'Hang on, this island is strictly off limits! Pinkan is a protected Pokémon reserve. How did you get here?',
    'Well I suppose you did deal with that Team Rocket branch on Five Island, so I guess I\'ll let you stay, as thanks.',
    'I\'m afraid I can\'t allow you into Pinkan Mountain though. The Pokémon there are extremely territorial.',
    'If you want to prove you can deal with such dangerous Pokémon safely, I suggest defeating the Orange League.',
], {
    image: 'assets/images/npcs/Officer Jenny.png',
    requirement: new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion, GameConstants.AchievementOption.less),
});
const PinkanOfficerJenny2 = new NPC ('Officer Jenny', [
    'Have you seen the Pinkan Berries? That is what makes all the Pokémon on this island turn pink.',
    'Hang on, this island is strictly off limits! Pinkan is a protected Pokémon reserve. How did you get here?',
    'Well I suppose you did deal with that Team Rocket branch on Five Island, so I guess I\'ll let you stay, as thanks.',
    'And since you\'ve conquered the Orange League, I suppose it should be safe to let you into Pinkan Mountain. Just be careful.',
], {
    image: 'assets/images/npcs/Officer Jenny.png',
    requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 0, GameConstants.AchievementOption.less)]),
});
const PinkanOfficerJenny3 = new NPC ('Officer Jenny', [
    'Oh it\'s you again! Got some Pinkan Berries to trade?',
    'So long as you\'re not helping those Rocket clowns, we\'ll let you trade for some of those rare Pinkan Pokémon that have only just come to the island.',
], {
    image: 'assets/images/npcs/Officer Jenny.png',
    requirement: new QuestLineCompletedRequirement('Team Rocket\'s Pinkan Theme Park'),
});
const ThemeparkTeamRocket1 = new NPC('Jessie and James', [
    'Oh hello there trainer! What do you mean we\'re not supposed to be here? We toootally got permission from Officer Jenny!',
    'Isn\'t your whole "thing" being helpful? We want to build a theme park to help fund the Pinkan Reserve, but this meddlesome twerp named Ash keeps getting in the way. He\'s even electrocuted us with his damn Pikachu!',
    'We need a bunch of Pinkan Berries to help feed the Pokémon at our theme park, but the twerp keeps zapping us when we try to go collect them.',
    'Would you mind farming some Pinkan Berries to help us grow our supply? We don\'t know how to, but we\'ve heard the Berry Master in Kanto could be helpful?',
], {
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Team Rocket\'s Pinkan Theme Park'), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 1, GameConstants.AchievementOption.less)]),
    image: 'assets/images/temporaryBattle/Pinkan Jessie & James.png',
});

const ThemeparkTeamRocket2 = new NPC('Jessie & James', [
    'Whoa! An actual Pinkan Berry! Now our evil plo- plan! Definitely not evil, our very helpful and good plan!...Ahem. Our plan can now proceed.',
    'Now we can get us some Pinkan\'s for the theme park! Would you mind defeating 500 Pinkan Pokémon in the forest and out in the plains? We\'ll do the catching, you just need to beat \'em',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 1), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 2, GameConstants.AchievementOption.less)]),
    image: 'assets/images/temporaryBattle/Pinkan Jessie & James.png',
});

const ThemeparkTeamRocket3 = new NPC('Jessie & James', [
    'Nice! Well, it would be nice. Now we have all these berries and Pinkan Pokémon, but nowhere to put \'em all!',
    'We need a bunch of Pixie Plates, and we need some Fairy Gems to help...uh...pay off the contractor?',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 2), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 3, GameConstants.AchievementOption.less)]),
    image: 'assets/images/temporaryBattle/Pinkan Jessie & James.png',
});

const ThemeparkTeamRocket4 = new NPC('Jessie and James', [
    'Hahahaha! Now our plan can really start! Prepare for trouble, and make it double, because you just built us a profit machine!',
    'We\'re going to make these Pinkan Pokémon perform silly routines and make us a ton of money, no days off for these suckers!',
    'What\'s that? You\'re gonna stop us!? Heh, yeah right! Bring it on twerp!',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 3), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 5, GameConstants.AchievementOption.less)]),
    image: 'assets/images/temporaryBattle/Pinkan Jessie & James.png',
});

const Informant1 = new NPC('Informant', [
    '<i>In a shady warehouse, you find the informant. He is a Mr. Mime, and he doesn\'t seem willing to divulge the information you need.</i>',
], {
    image: 'assets/images/temporaryBattle/Mime Interview.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 2), new QuestLineStepCompletedRequirement('Detective Pikachu', 4, GameConstants.AchievementOption.less)]),
});
const Informant2 = new NPC('Informant', [
    '<i>The Mr. Mime signals to you that this is an illicit drug called R. It is frequently used in the underground fighting rings near the Battle Frontier.</i>',
], {
    image: 'assets/images/temporaryBattle/Mime Interview.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 4), new QuestLineStepCompletedRequirement('Detective Pikachu', 6, GameConstants.AchievementOption.less)]),
});

const Mewtwo1 = new NPC('Mewtwo', [
    'You were wise to seek me out. Howard Clifford has been deceiving you. He is the one making the R drug, and....',
    '<i>A sphere of energy envelops Mewtwo, and he is dragged away by some sort of helicopter. The helicopter has a logo on it: Clifford Industries!</i>',
], {
    image: 'assets/images/temporaryBattle/Possessed Mewtwo.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 10), new QuestLineStepCompletedRequirement('Detective Pikachu', 12, GameConstants.AchievementOption.less)]),
});

const Mewtwo2 = new NPC('Mewtwo', [
    'Thank you for your help. I have little to offer you in return, but perhaps this will help.',
    'I found Detective Pikachu\'s partner some days ago injured on the side of the road, and have nursed him back to health. I hope this reunion will suffice.',
], {
    image: 'assets/images/temporaryBattle/Possessed Mewtwo.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 15), new QuestLineStepCompletedRequirement('Detective Pikachu', 17, GameConstants.AchievementOption.less)]),
});

const DetectiveRaichu = new NPC('Detective Raichu', [
    'Thanks for your help, kid! I\'ll stick along with you until our next mystery comes along.',
], {
    image: 'assets/images/pokemon/26.02.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 16), new QuestLineStepCompletedRequirement('Detective Pikachu', 17, GameConstants.AchievementOption.less)]),
});

const ClientSignpost = new NPC('Welcome Sign', [
    '<i>Welcome to Client Island!</i>',
    '<i>This island is exclusive to those dedicated to reducing server load by downloading the client.</i>',
    '<i>Without your support, Red Spearow here wouldn\'t have any time to relax!</i>',
    '<i>Please drop by the Gift Shop on your way out to make a whole new line of friends.</i>',
], {image: 'assets/images/npcs/other/signpost.png'});

const RedSpearow = new NPC('Red Spearow', [
    '<b><i>SQUAWK! SQUAWK!</i></b>',
    '...',
    '<i>The Red Spearow seems to appreciate your visit.</i>',
], {image: 'assets/images/pokemon/21.1.png'});

//Kanto Towns
TownList['Pallet Town'] = new Town(
    'Pallet Town',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new BulletinBoard(GameConstants.BulletinBoards.Kanto)],
    {
        npcs: [PalletProfOak, PalletCelebiProfOak1, PalletCelebiProfOak2, PalletMom1, PalletMom2],
    }
);
TownList['Viridian City'] = new Town(
    'Viridian City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [ViridianCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
        npcs: [ViridianCityOldMan1, ViridianCityOldMan2, ViridianCityOldMan3],
    }
);
TownList['Pewter City'] = new Town(
    'Pewter City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
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
    GameConstants.KantoSubRegions.Kanto,
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
    GameConstants.KantoSubRegions.Kanto,
    [CeruleanCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cerulean City']), new MoveToDungeon(dungeonList['Cerulean Cave'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
        npcs: [CeruleanKantoBerryMaster, CeruleanSuperNerd, Mewtwo1, Mewtwo2, DetectiveRaichu, CeruleanEusine],
    }
);
TownList['Vermilion City'] = new Town(
    'Vermilion City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [VermilionCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Vermilion City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
        npcs: [VermilionFanClubChairman, VermilionShardApprentice, VermilionEusine],
    }
);
TownList['Lavender Town'] = new Town(
    'Lavender Town',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [LavenderTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lavender Town']), new MoveToDungeon(dungeonList['Pokémon Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
        npcs: [LavenderMrFuji, LavenderChanneler],
    }
);
TownList['Celadon City'] = new Town(
    'Celadon City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [CeladonDepartmentStoreShop, CeladonCityShop, new MoveToDungeon(dungeonList['Rocket Game Corner'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)],
        npcs: [BigSpender, EggHuntErika],
    }
);
TownList['Saffron City'] = new Town(
    'Saffron City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [SaffronCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Saffron City']), new MoveToDungeon(dungeonList['Silph Co.']), TemporaryBattleList['Fighting Dojo'], TemporaryBattleList['Mime Interview']],
    {
        requirements: [new OneFromManyRequirement([
            new GymBadgeRequirement(BadgeEnums.Rainbow),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rocket Game Corner')),
        ])],
        npcs: [SaffronBattleItemRival, SaffronBreeder, Informant1, Informant2],
    }
);
TownList['Fuchsia City'] = new Town(
    'Fuchsia City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [FuchsiaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fuchsia City'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ])],
        npcs: [FuchsiaKantoRoamerNPC, FuchsiaEusine],
    }
);
TownList['Cinnabar Island'] = new Town(
    'Cinnabar Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
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
    GameConstants.KantoSubRegions.Kanto,
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
    GameConstants.KantoSubRegions.Sevii123,
    [OneIslandShop, new DockTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Volcano)],
        npcs: [OneIslandCelio1, OneIslandCelio2, OneIslandCelio3, OneIslandCelio4, OneIslandCelio5, OneIslandCelio6, OneIslandCelio7, OneIslandYoungster],
    }
);
TownList['Mt. Ember'] = new Town(
    'Mt. Ember',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [new MoveToDungeon(dungeonList['Mt. Ember Summit']), new MoveToDungeon(dungeonList['Ruby Path'], new MaxRegionRequirement(GameConstants.Region.hoenn)), TemporaryBattleList['Sevii Rocket Grunt 1'], TemporaryBattleList['Sevii Rocket Grunt 2']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 27)],
        npcs: [SeviiRocketGrunts],
    }
);
TownList['Two Island'] = new Town(
    'Two Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [TwoIslandShop],
    {
        requirements: [new QuestLineStepCompletedRequirement('Bill\'s Errand', 0)],
        npcs: [TwoIslandGameCornerOwner1, TwoIslandGameCornerOwner2],
    }
);
TownList['Three Island'] = new Town(
    'Three Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [ThreeIslandShop, TemporaryBattleList['Biker Goon 1'], TemporaryBattleList['Biker Goon 2'], TemporaryBattleList['Biker Goon 3'], TemporaryBattleList['Cue Ball Paxton']],
    {
        requirements: [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)],
        npcs: [ThreeIslandBiker1, ThreeIslandBiker2, ThreeIslandBiker3],
    }
);
TownList['Professor Ivy\'s Lab'] = new Town(
    'Professor Ivy\'s Lab',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [],
    {
        requirements: [new QuestLineStepCompletedRequirement('Unfinished Business', 0)],
        npcs: [CelebiProfIvy],
    }
);
TownList['Client Island'] = new Town(
    'Client Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [ClientIslandShop],
    {
        requirements: [new ClientRequirement(), new GymBadgeRequirement(BadgeEnums.Volcano)],
        npcs: [ClientSignpost, RedSpearow],
    }
);
TownList['Four Island'] = new Town(
    'Four Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [FourIslandShop, new MoveToDungeon(dungeonList['Icefall Cave'])],
    {
        requirements: [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    }
);
TownList['Five Island'] = new Town(
    'Five Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [FiveIslandShop, new DockTownContent()],
    {
        requirements: [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    }
);
TownList['Rocket Warehouse'] = new Town(
    'Rocket Warehouse',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [TemporaryBattleList['Sevii Rocket Grunt 3'], TemporaryBattleList['Sevii Rocket Grunt 4'], TemporaryBattleList['Sevii Rocket Grunt 5'], TemporaryBattleList['Sevii Rocket Ariana'], TemporaryBattleList['Sevii Rocket Archer'], TemporaryBattleList['Scientist Gideon']],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 30),
            new QuestLineStepCompletedRequirement('Celio\'s Errand', 8),
        ],
    }
);
TownList['Six Island'] = new Town(
    'Six Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [SixIslandShop],
    {
        requirements: [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
        npcs: [SixIslandSeviiRoamerNPC],
    }
);
TownList['Dotted Hole'] = new Town(
    'Dotted Hole',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 37)],
        npcs: [SeviiGideon1, SeviiGideon2],
    }
);
TownList['Seven Island'] = new Town(
    'Seven Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [SevenIslandShop],
    {
        requirements: [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    }
);
TownList['Mikan Island'] = new Town(
    'Mikan Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [MikanIslandShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tanoby Ruins'))],
    }
);
TownList['Navel Island'] = new Town(
    'Navel Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [NavelIslandShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lost Cave'))],
    }
);
TownList['Trovita Island'] = new Town(
    'Trovita Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [TrovitaIslandShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 41)],
    }
);
TownList['Kumquat Island'] = new Town(
    'Kumquat Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [KumquatIslandShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Icefall Cave'))],
    }
);
TownList['Pummelo Island'] = new Town(
    'Pummelo Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [GymList['Supreme Gym Leader Drake'], pokeLeagueShop(), new BulletinBoard(GameConstants.BulletinBoards.Sevii4567)],
    {
        requirements:
            [
                new GymBadgeRequirement(BadgeEnums['Coral-Eye']),
                new GymBadgeRequirement(BadgeEnums.Sea_Ruby),
                new GymBadgeRequirement(BadgeEnums.Spike_Shell),
                new GymBadgeRequirement(BadgeEnums.Jade_Star),
            ],
    }
);
TownList['Valencia Pokémon Center'] = new Town(
    'Valencia Pokémon Center',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [ValenciaPokémonCenterShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 40)],
        npcs: [ValenciaProfIvy],
    }
);
TownList['Pinkan Pokémon Reserve'] = new Town(
    'Pinkan Pokémon Reserve',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [PinkanPokémonReserveShop, PinkanBerryMaster, TemporaryBattleList['Pinkan Jessie & James'], TemporaryBattleList['Pinkan Officer Jenny']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 42)],
        npcs: [PinkanOfficerJenny1, PinkanOfficerJenny2, PinkanOfficerJenny3, ThemeparkTeamRocket1, ThemeparkTeamRocket2, ThemeparkTeamRocket3, ThemeparkTeamRocket4],
    }
);

//Kanto Dungeons
TownList['Viridian Forest'] = new DungeonTown(
    'Viridian Forest',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 2)]
);
TownList['Mt. Moon'] = new DungeonTown(
    'Mt. Moon',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto,3)],
    [TemporaryBattleList['Silver 6']]
);
TownList['Diglett\'s Cave'] = new DungeonTown(
    'Diglett\'s Cave',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)]
);
TownList['Rock Tunnel'] = new DungeonTown(
    'Rock Tunnel',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
);
TownList['Rocket Game Corner'] = new DungeonTown(
    'Rocket Game Corner',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)]
);
TownList['Pokémon Tower'] = new DungeonTown(
    'Pokémon Tower',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 7),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rocket Game Corner')),
    ],
    [TemporaryBattleList['Blue 4']]
);
TownList['Silph Co.'] = new DungeonTown(
    'Silph Co.',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new TemporaryBattleRequirement('Blue 4')],
    [TemporaryBattleList['Blue 5']]
);
TownList['Power Plant'] = new DungeonTown(
    'Power Plant',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new GymBadgeRequirement(BadgeEnums.Soul),
    ]
);
TownList['Seafoam Islands'] = new DungeonTown(
    'Seafoam Islands',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 19),
        new GymBadgeRequirement(BadgeEnums.Rainbow),
    ]
);
TownList['Pokémon Mansion'] = new DungeonTown(
    'Pokémon Mansion',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new OneFromManyRequirement([
        new RouteKillRequirement(10, GameConstants.Region.kanto, 20),
        new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
    ])]
);
TownList['Mt. Ember Summit'] = new DungeonTown(
    'Mt. Ember Summit',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 27)]
);
TownList['Berry Forest'] = new DungeonTown(
    'Berry Forest',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 29)]
);
TownList['Victory Road'] = new DungeonTown(
    'Victory Road',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 23)]
);
TownList['Cerulean Cave'] = new DungeonTown(
    'Cerulean Cave',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)]
);
TownList['Ruby Path'] = new DungeonTown(
    'Ruby Path',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 2)],
    [],
    {
        npcs: [SeviiRuby],
    }
);
TownList['Icefall Cave'] = new DungeonTown(
    'Icefall Cave',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    [],
    {
        npcs: [SeviiLorelei],
    }
);
TownList['Sunburst Island'] = new DungeonTown(
    'Sunburst Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 31)],
    []
);
TownList['Lost Cave'] = new DungeonTown(
    'Lost Cave',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 33)],
    []
);
TownList['Pattern Bush'] = new DungeonTown(
    'Pattern Bush',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 34)],
    []
);
TownList['Altering Cave'] = new DungeonTown(
    'Altering Cave',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 36)],
    [],
    {
        npcs: [AlteringCaveRuinManiac1, AlteringCaveRuinManiac2],
    }
);
TownList['Tanoby Ruins'] = new DungeonTown(
    'Tanoby Ruins',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 39)],
    [TanobyRuinsShop],
    {
        npcs: [TanobyProfIvy],
    }
);
TownList['Pinkan Mountain'] = new DungeonTown(
    'Pinkan Mountain',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii4567,
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 42),
        new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion),
    ],
    []
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
    ItemList.Wonder_Chest,
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
const JohtoBerryMaster = new BerryMasterShop(GameConstants.BerryTraderLocations['Goldenrod City'], [
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


// Johto NPCs

const CherrygroveMrPokemon = new NPC('Mr. Pokémon', [
    'Welcome to Johto! This is where the first ever Pokémon egg was found long ago.',
    'Astounding breakthroughs have been made since then. We can now store Pokémon eggs for longer and queue them up for breeding.',
    'This new technology only allows up to four stored eggs for now, though.',
], {image: 'assets/images/npcs/Mr. Pokémon.png'});

const VioletEarlDervish = new NPC('Earl Dervish', [
    'Earl, I am! Teach you, I will! To be a better trainer!',
    'Some Pokémon babies, only from Day Care they come! Hatch! Hatch! Hatch!',
]);

const VioletPrimo = new NPC('Primo', [
    'You’re a trainer, right? It’s me, the Poké Dude! I’m the guy on Teachy TV!',
    'Your Item Bag has a bunch of nifty features! Take stuff in the Held Items pocket, for instance. You can use a Held Item to empower your Pokémon or acquire unique effects. How do you use it? Well, here’s how it works.',
    'Once you have obtained a Held Item, visit your Item Bag. They are most often found in Dungeons, but some, like the Wonder Chest, are for sale!',
    'From there, go into your Held Items pocket and once an item is selected, you can use it by choosing from the list of available Pokémon to hold it.',
    'Choose who you select carefully! Only one of a particular item can be held at a time and once you remove a Held Item from your Pokémon, the item will break!',
    'All righty, be seeing you!',
]);

const AzaleaElder = new NPC('Elder Li', [
    'You want to know about Celebi? It hasn\'t been seen in a long time.',
    'I remember, back in the day, it was the Guardian of Ilex Forest. It was a playful Pokémon. It loved playing with children.',
    'It was especially close to a kid named Samuel Oak. When he suddenly moved to Kanto, Celebi was quite sad. He never even said goodbye! I wonder what became of that boy. Maybe he knows more of where Celebi is right now. They certainly have Unfinished Business.',
    'Celebi got over it very quick, playful as it is. There are always other kids to play with. Then, some time later, a strange figure went into the forest with a golden Poké Ball. The Guardian hasn\'t been seen since.',
], { image: 'assets/images/npcs/Elder Li.png' });

const AzaleaHiker = new NPC('Hiker Daniel', [
    'The PokéManiacs in Union Cave are restless. They have been ranting and raving about a weekly visitor.',
    'According to them, a strange Pokémon\'s cries can be heard from a lake deep inside the cave.',
    'I\'ve never heard it myself. Apparently it only happens on Fridays.',
], {
    image: 'assets/images/trainers/Hiker.png',
    requirement: new GymBadgeRequirement(BadgeEnums.Fog),
});

const AzaleaCelebiKurt1 = new NPC('Kurt', [
    'Those poor Slowpoke! I\'m not doing anything until those disgusting Rockets are gone!',
], {
    image: 'assets/images/npcs/Kurt.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 2), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slowpoke Well'), GameConstants.AchievementOption.less)]),
});

const AzaleaCelebiKurt2 = new NPC('Kurt', [
    'Thank you for your help at the Slowpoke Well! You have something for me?',
    'So this is it then? The GS Ball. I can see why old Oak wants me to have a crack at it.',
    'I will need some time to figure this out. Please come back later.',
], {
    image: 'assets/images/npcs/Kurt.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 2), new QuestLineStepCompletedRequirement('Unfinished Business', 3, GameConstants.AchievementOption.less), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slowpoke Well'))]),
});

const AzaleaCelebiKurt3 = new NPC('Kurt', [
    'Getting closer to the solution...',
    'I think I know what\'s in there... Better give Oak a call.',
    'What? Oh, I\'m just talking to myself. I\'m not done yet. Please come back later.',
], {
    image: 'assets/images/npcs/Kurt.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 3), new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion, GameConstants.AchievementOption.less)]),
});

const AzaleaCelebiKurt4 = new NPC('Kurt', [
    'Welcome back Champ! I have good news and bad news.',
    'Bad news first. I didn\'t manage to open the ball. It\'s just stuck. No way to get in there. Better give up on it. This story ends here.',
    'Naah! Just kidding! Imagine though, how disappointing that would be. What an anticlimax!',
    'Good news first then, I managed to open the ball! And there was a Celebi inside! Bad news, the Celebi immediately left. It just flew away.',
    'Old Oak apparently had an encounter with this Celebi back when he was still young Oak. And he\'s here! He might know where the Celebi went, you should have a chat with him.',
], {
    image: 'assets/images/npcs/Kurt.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 3), new QuestLineStepCompletedRequirement('Unfinished Business', 5, GameConstants.AchievementOption.less), new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]),
});

const AzaleaCelebiOak1 = new NPC('Prof. Oak', [
    'I knew it! I knew that Celebi was in there! Well, I didn\'t actually know. I had a feeling.',
    'That Celebi is an old friend of mine. Back in the day it liked to hang out at the old shrine in Ilex Forest. You should go check it out and try to catch Celebi.',
    'I can\'t think of a better trainer for this Celebi.',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 4), new QuestLineStepCompletedRequirement('Unfinished Business', 6, GameConstants.AchievementOption.less)]),
});

const AzaleaCelebiOak2 = new NPC('Prof. Oak', [
    'Celebi wasn\'t there? Strange, usually it loves to play with young people at the shrine.',
    'Wait. That Pichu! It used to play with us at that shrine way back when! It looks like it hasn\'t aged a day!',
    'It sounds like you encountered a Time Distortion. Celebi is sensitive to time, it must be distressed. I have heared rumors of something similar going on at Tohjo Falls. Maybe if you clear up that Time Distortion, Celebi will want to come out to play?',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 7), new QuestLineStepCompletedRequirement('Unfinished Business', 9, GameConstants.AchievementOption.less)]),
});

const AzaleaCelebiOak3 = new NPC('Prof. Oak', [
    'So Giovanni was there at the Falls while you were dealing with that mess at the Radio Tower? If only we had known, we could have had him arrested right then and there.',
    'The Time Distortion seems to have cleared up. Celebi should be happy now. You should go check out the Shrine again.',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 10), new QuestLineStepCompletedRequirement('Unfinished Business', 12, GameConstants.AchievementOption.less)]),
});

const AzaleaCelebiOak4 = new NPC('Prof. Oak', [
    'What\'s that? Celebi went back into the forest? Well, follow it!',
    'If it wants to play I\'m sure a great trainer such as yourself can figure out a way that you can be friends and play all the time!',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 12), new QuestLineStepCompletedRequirement('Unfinished Business', 13, GameConstants.AchievementOption.less)]),
});

const AzaleaCelebiOak5 = new NPC('Prof. Oak', [
    'I\'m glad Celebi has been released from that wretched prison and has found a home with a great young trainer like yourself. I\'m going back to Kanto.',
    '...',
    'Goodbye Celebi.',
], {
    image: 'assets/images/npcs/Professor Oak.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 13), new QuestLineCompletedRequirement('Unfinished Business', GameConstants.AchievementOption.less)]),
});

const IlexForestShrine1 = new NPC('Investigate the Shrine', [
    '<i>Something strange is going on here. The air seems to curve around itself. You feel like you\'re here, but also not here at the same time.</i>',
    '<i>No sign of Celebi, but you do see a strange looking Pichu approaching.</i>',
], {
    image: 'assets/images/npcs/other/Ilex Forest.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 5), new QuestLineStepCompletedRequirement('Unfinished Business', 7, GameConstants.AchievementOption.less)]),
});

const IlexForestShrine2 = new NPC('Investigate the Shrine', [
    '<i>Everything is normal.</i>',
    '<i>Celebi is here! It seems to want to play with you, but every time you approach it backs off. It\'s luring you deeper into the forest!</i>',
    '<i>What would the professor do?</i>',
], {
    image: 'assets/images/npcs/other/Ilex Forest.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 11), new QuestLineStepCompletedRequirement('Unfinished Business', 13, GameConstants.AchievementOption.less)]),
});

const EcruteakBill = new NPC('Bill', [
    'I traveled here all the way from Goldenrod to buy a Soothe Bell for my Eevee.',
    'When I use a Soothe Bell on Eevee it can evolve into Espeon or Umbreon. It depends on the time. Espeon during the day, Umbreon at night.',
    'I only brought enough QP for one Soothe Bell. It\'s so hard to choose...',
], {image: 'assets/images/npcs/Bill.png'});

const EcruteakEusine = new NPC('Eusine', [
    'Legends say that when the Brass Tower burned down and became the Burned Tower, three unnamed Pokémon perished in the flames...',
    'Ho-Oh came down from the Tin Tower and revived those Pokémon. They became the Legendary Beasts. Some say these Beasts still inhabit the basement of the Burned Tower.',
    'Could you please clear Burned Tower for me and see if this is true?',
], {
    image: 'assets/images/temporaryBattle/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Legendary Beasts'), new QuestLineStepCompletedRequirement('The Legendary Beasts', 2, GameConstants.AchievementOption.less )]),
});
const EcruteakPokéfan = new NPC('Pokéfan Derek', [
    'I saw it! Did you see it?! I saw you go in there! I don\'t know what you did in the Burned Tower, but three great Beasts came running out of there!',
    'It was a great sight to behold. They all went in different directions. I think they are just roaming the region now. My friend Trevor in Blackthorn City can tell you more.',
    'Eusine was here a second ago. He seemed very excited, but then he suddenly left. I don\'t know where he went, but he seemed to be particularly interested in the blue one.',
], {
    image: 'assets/images/trainers/PokéManiac.png',
    requirement: new QuestLineStepCompletedRequirement('The Legendary Beasts', 2),
}
);

const Zuki = new NPC('Kimono Girl Zuki', [
    'Professor Elm tells me you are a master trainer. Please, show me your skills by training your Pokémon.',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Whirl Guardian'), new QuestLineStepCompletedRequirement('Whirl Guardian', 1, GameConstants.AchievementOption.less)]),
});

const Naoko = new NPC('Kimono Girl Naoko', [
    'I seem to have lost my way in the forest. Can you show me the way out?',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 1), new QuestLineStepCompletedRequirement('Whirl Guardian', 3, GameConstants.AchievementOption.less)]),
});

const Miki = new NPC('Kimono Girl Miki', [
    'My sisters Zuki and Naoko tell me you have helped them, and I thank you. Please help find my other two sisters, Sayo and Kuni. Please accept this as a token of my gratitude.',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 3), new QuestLineStepCompletedRequirement('Whirl Guardian', 5, GameConstants.AchievementOption.less)]),
});

const Sayo = new NPC('Kimono Girl Sayo', [
    'Excuse me! I\'m stuck out here on the ice, can you give me a quick push?',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 4), new QuestLineStepCompletedRequirement('Whirl Guardian', 6, GameConstants.AchievementOption.less)]),
});

const Kuni = new NPC('Kimono Girl Kuni', [
    'I\'m supposed to meet my sisters, but the streets here just aren\'t safe! Can you protect me from Team Rocket?',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 6), new QuestLineStepCompletedRequirement('Whirl Guardian', 8, GameConstants.AchievementOption.less)]),
});

const KimonoGirlsWhirl = new NPC('Kimono Girls', [
    'With the power of the Tidal Bell, we call to Lugia! Guardian of the Whirl Islands!',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 8), new QuestLineStepCompletedRequirement('Whirl Guardian', 10, GameConstants.AchievementOption.less)]),
});

const KimonoGirlsEcruteak = new NPC('Kimono Girls', [
    'We have been watching you, and see that you have tamed the three Pokémon revived by Ho-Oh in the Burned Tower. Show us your power and we shall give you the Clear Bell, which will call Ho-Oh to the Tin Tower.',
], {
    image: 'assets/images/trainers/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Rainbow Guardian'), new QuestLineStepCompletedRequirement('Rainbow Guardian', 1, GameConstants.AchievementOption.less)]),
});

const OlivineSSAquaCaptain = new NPC('S.S. Aqua Captain', [
    'Aye! At this here dock you can travel to far away regions! But only ones you’ve travelled to before; I’ve heard the Professor has his own vessel to take ye’ to new lands!',
], { image: 'assets/images/npcs/Sailor.png' });

const CianwoodPhotographyAide = new NPC('Photography Aide', [
    'Cameron the Photographer isn’t here right now; he’s off taking photos of Pokémon on Berry Farms. Did you know that some Berries can even attract rare Pokémon?',
]);

const CianwoodEusine = new NPC('Eusine', [
    'Yo, wasn\'t that Suicune just now? I only caught a quick glimpse, but I thought I saw Suicune running on the waves.',
    'Suicune is beautiful and grand. And it races through towns and roads at simply awesome speeds. It\'s wonderful... I want to see Suicune up close....',
    'I\'ve decided. I\'ll battle you as a trainer to earn Suicune\'s respect! Come on! Let\'s battle now!',
],
{
    image: 'assets/images/temporaryBattle/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 0), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 2, GameConstants.AchievementOption.less )]),
});

const MahoganySouvenirShopAttendant = new NPC('Souvenir Shop Attendant', [
    'We’ve got stuff here nobody else has got! But keep any Dowsing Machines you have away from the merchandise… especially the RageCandyBars.',
    'Keep ‘em outside where they belong! I’ve heard those machines can attract Pokémon with Held Items more often, and even more so in Dungeons!',
]);

const MahoganyEusine = new NPC('Eusine', [
    'Suicune... How brave it is! How refreshing it is! How beautiful it is! And how quickly it moves! It seems to be heading east.',
    'You seem to be around where Suicune would appear. Well, that\'s OK. My desire to search for Suicune is far beyond yours... My grandpa was...quite into myths. I\'ve heard so many stories about Suicune from him.',
    'Suicune... I won\'t stop following you until I\'ve found out what you\'re after... You hear me!',
],
{
    image: 'assets/images/temporaryBattle/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 3), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 5, GameConstants.AchievementOption.less )]),
});

const BlackthornJohtoRoamerNPC = new RoamerNPC('Pokéfan Trevor', [
    'On the news, they are getting more reports of roaming Pokémon appearing on {ROUTE_NAME}!',
], GameConstants.Region.johto, RoamingPokemonList.findGroup(GameConstants.Region.johto, GameConstants.JohtoSubRegions.Johto), 'assets/images/trainers/Pokéfan (male).png');

const TohjoFallsCelebiTimeDistortion = new NPC('Investigate the Time Distortion', [
    '<i>You are experiencing that same feeling again. Like you\'re not really here.</i>',
    '<i>A man sits in the back of the cave. He is listening to a portable radio.</i>',
    '<img src="assets/images/temporaryBattle/Rocket Boss Giovanni.png">',
    '...I don\'t know why you have come here. Anyway, I have to warn you that this is not a place for kids like you.',
    'You have a certain look... You\'re the kid who stood in front of me in Viridian City! I\'m on my way to Goldenrod City to answer the call and join my team. Are you going to get in my way?',
], {
    image: 'assets/images/npcs/other/Tohjo Falls.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 8), new QuestLineStepCompletedRequirement('Unfinished Business', 10, GameConstants.AchievementOption.less), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tohjo Falls'))]),
});

const Conductor = new NPC('Conductor', [
    'We\'re working on construction of a Magent Train line to shuttle people <b>east to Kanto</b>. Once it\'s completed, people will be able to get to Saffron City in record time!',
], { image: 'assets/images/trainers/Rail Staff.png' });

const ProfElm = new ProfNPC('Prof. Elm',
    GameConstants.Region.johto,
    'Oh, another regional Pokédex completed so soon?',
    'Amazing! Next stop is Hoenn, enjoy the sunshine while you\'re there!',
    'assets/images/npcs/Professor Elm.png');

const searchForClues = new NPC('Search For Clues', [
    '<i>You look around the city in search of clues, and are set upon by a gang of angry Aipoms!</i>',
], {
    image: 'assets/images/temporaryBattle/Aipom Alley.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Detective Pikachu'), new QuestLineStepCompletedRequirement('Detective Pikachu', 1, GameConstants.AchievementOption.less)]),
});

const HowardClifford1 = new NPC('Howard Clifford', [
    'I am Howard Clifford, CEO of Clifford Industries. I hear you have been investigating both my company, and a mysterious drug called R.',
    'I have reason to believe that a high ranking official in the company is manufacturing this drug, but have been unable to get to the bottom of it myself.',
    'There is a journalist in Hearthome City who may be able to help us both. Please make contact with her and report anything you find back to me.',
], {
    image: 'assets/images/npcs/Howard Clifford.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 6), new QuestLineStepCompletedRequirement('Detective Pikachu', 8, GameConstants.AchievementOption.less)]),
});

const HowardClifford2 = new NPC('Howard Clifford', [
    'You are too late to stop me! The R drug puts Pokémon in a frenzied state, and allows us to control them with the right equipment! You led me straight to Mewtwo, and now I will take control of the most powerful Pokémon in the world!',
    '<i>Howard puts on a headset and pushes a button. The energy sphere containing Mewtwo comes into view, and it has a crazed look in its eyes. Howard pushes a botton on his headset and slumps back in his chair.</i>',
    '<i>Mewtwo makes eye contact with you, and you hear Howard\'s voice in your mind, laughing maniacally. An armed man comes into the room, and warns you not to move.</i>',
], {
    image: 'assets/images/npcs/Howard Clifford.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 11), new QuestLineStepCompletedRequirement('Detective Pikachu', 13, GameConstants.AchievementOption.less)]),
});

const HowardClifford3 = new NPC('Howard Clifford', [
    'UNLIMITED POWER! YOU\'LL NEVER STOP ME!',
], {
    image: 'assets/images/npcs/Howard Clifford.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 13), new QuestLineStepCompletedRequirement('Detective Pikachu', 15, GameConstants.AchievementOption.less)]),
});


//Johto Towns
TownList['New Bark Town'] = new Town(
    'New Bark Town',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new BulletinBoard(GameConstants.BulletinBoards.Johto)],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)],
        npcs: [ProfElm],
    }
);
TownList['Cherrygrove City'] = new Town(
    'Cherrygrove City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [CherrygroveCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 29)],
        npcs: [CherrygroveMrPokemon],
    }
);
TownList['Violet City'] = new Town(
    'Violet City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [VioletCityShop, new MoveToDungeon(dungeonList['Sprout Tower'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 31)],
        npcs: [VioletPrimo, VioletEarlDervish, Zuki],
    }
);
TownList['Azalea Town'] = new Town(
    'Azalea Town',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [AzaleaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Azalea Town']), new MoveToDungeon(dungeonList['Slowpoke Well'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 33)],
        npcs: [AzaleaElder, AzaleaHiker, AzaleaCelebiKurt1, AzaleaCelebiKurt2, AzaleaCelebiKurt3, AzaleaCelebiKurt4, AzaleaCelebiOak1, AzaleaCelebiOak2, AzaleaCelebiOak3, AzaleaCelebiOak4, AzaleaCelebiOak5],
    }
);
TownList['Goldenrod City'] = new Town(
    'Goldenrod City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [TemporaryBattleList['Silver 4'], GoldenrodDepartmentStoreShop, JohtoBerryMaster, new MoveToDungeon(dungeonList['Radio Tower']), TemporaryBattleList['Aipom Alley'], TemporaryBattleList.Imposter, TemporaryBattleList['Possessed Mewtwo']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 34)],
        npcs: [Conductor, searchForClues, HowardClifford1, HowardClifford2, HowardClifford3, Kuni],
    }
);
TownList['Ecruteak City'] = new Town(
    'Ecruteak City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [EcruteakCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Ecruteak City']), new MoveToDungeon(dungeonList['Burned Tower']), new MoveToDungeon(dungeonList['Tin Tower']), TemporaryBattleList['Kimono Girls']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 37)],
        npcs: [EcruteakBill, EcruteakEusine, EcruteakPokéfan, Miki, KimonoGirlsEcruteak],
    }
);
TownList['Olivine City'] = new Town(
    'Olivine City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [OlivineCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Olivine City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 39)],
        npcs: [OlivineSSAquaCaptain],
    }
);
TownList['Cianwood City'] = new Town(
    'Cianwood City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [CianwoodCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cianwood City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.johto, 41)],
        npcs: [CianwoodPhotographyAide, CianwoodEusine],
    }
);
TownList['Mahogany Town'] = new Town(
    'Mahogany Town',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [MahoganyTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mahogany Town']), new MoveToDungeon(dungeonList['Team Rocket\'s Hideout'])],
    {
        requirements: [new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.johto, 42),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Mortar')),
        ])],
        npcs: [MahoganySouvenirShopAttendant, MahoganyEusine],
    }
);
TownList['Blackthorn City'] = new Town(
    'Blackthorn City',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [BlackthornCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Blackthorn City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ice Path'))],
        npcs: [BlackthornJohtoRoamerNPC],
    }
);
TownList['Indigo Plateau Johto'] = new Town(
    'Indigo Plateau Johto',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [TemporaryBattleList['Silver 7'], GymList['Elite Will'], GymList['Elite Koga'], GymList['Elite Bruno2'], GymList['Elite Karen'], GymList['Champion Lance'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.johto, 26),
            new TemporaryBattleRequirement('Silver 5'),
        ],
    }
);

//Johto Dungeons
TownList['Sprout Tower'] = new DungeonTown(
    'Sprout Tower',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 31)]
);
TownList['Ruins of Alph'] = new DungeonTown(
    'Ruins of Alph',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 32)]
);
TownList['Union Cave'] = new DungeonTown(
    'Union Cave',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 32)]
);
TownList['Slowpoke Well'] = new DungeonTown(
    'Slowpoke Well',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 33)]
);
TownList['Ilex Forest'] = new DungeonTown(
    'Ilex Forest',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [
        new GymBadgeRequirement(BadgeEnums.Hive),
        new TemporaryBattleRequirement('Silver 2'),
    ],
    [TemporaryBattleList['Spiky-eared Pichu']],
    {
        npcs: [IlexForestShrine1, IlexForestShrine2, Naoko],
    }
);
TownList['Burned Tower'] = new DungeonTown(
    'Burned Tower',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new QuestLineStepCompletedRequirement('The Legendary Beasts', 0)],
    [TemporaryBattleList['Silver 3']]
);
TownList['Tin Tower'] = new DungeonTown(
    'Tin Tower',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
);
TownList['Whirl Islands'] = new DungeonTown(
    'Whirl Islands',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))],
    [],
    {
        npcs: [KimonoGirlsWhirl],
    }
);
TownList['Mt. Mortar'] = new DungeonTown(
    'Mt. Mortar',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
);
TownList['Team Rocket\'s Hideout'] = new DungeonTown(
    'Team Rocket\'s Hideout',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 43)]
);
TownList['Radio Tower'] = new DungeonTown(
    'Radio Tower',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new TemporaryBattleRequirement('Silver 4')]
);
TownList['Ice Path'] = new DungeonTown(
    'Ice Path',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 44)],
    [],
    {
        npcs: [Sayo],
    }
);
TownList['Dark Cave'] = new DungeonTown(
    'Dark Cave',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 45)]
);
TownList['Tohjo Falls'] = new DungeonTown(
    'Tohjo Falls',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new GymBadgeRequirement(BadgeEnums.Rising)],
    [TemporaryBattleList['Rocket Boss Giovanni']],
    {
        npcs: [TohjoFallsCelebiTimeDistortion],
    }
);
TownList['Victory Road Johto'] = new DungeonTown(
    'Victory Road Johto',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 26)]
);
TownList['Mt. Silver'] = new DungeonTown(
    'Mt. Silver',
    GameConstants.Region.johto,
    GameConstants.JohtoSubRegions.Johto,
    [new RouteKillRequirement(10, GameConstants.Region.johto, 28)],
    [TemporaryBattleList.Red]
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
    new PokeballItem(GameConstants.Pokeball.Ultraball, 1, GameConstants.Currency.battlePoint, undefined, 'Ultra Ball'),
    new PokeballItem(GameConstants.Pokeball.Masterball, 500, GameConstants.Currency.battlePoint , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.battlePoint]}` }, 'Master Ball'),
    new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 10, GameConstants.Currency.battlePoint, 'Small Restore'),
    new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 20, GameConstants.Currency.battlePoint, 'Medium Restore'),
    new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 40, GameConstants.Currency.battlePoint, 'Large Restore'),
    ItemList.FarmHandJamie,
    ItemList.HatcheryHelperNoel,
    ItemList.Muscle_Band,
]);

//Hoenn Berry Master
const HoennBerryMaster = new BerryMasterShop(GameConstants.BerryTraderLocations['Mauville City'],[
    ItemList.Boost_Mulch,
    ItemList.Rich_Mulch,
    ItemList.Surprise_Mulch,
    ItemList.Amaze_Mulch,
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
    ItemList.Sprinklotad,
    ItemList.FarmHandKerry,
    ItemList.HatcheryHelperCameron,
]);

//Hoenn Flute Master
const HoennFluteMaster = new GemMasterShop();

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
], GameConstants.Region.hoenn, RoamingPokemonList.findGroup(GameConstants.Region.hoenn, GameConstants.HoennSubRegions.Hoenn), 'assets/images/npcs/Reporter.png');

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
], {image: 'assets/images/npcs/Pokemon Ranger (female).png'});

const Steven1 = new NPC('Steven', [
    'I have been investigating the behavior of Kecleon, the Color Swap Pokémon.',
    'There are a few hidden near the city. If you can find them all, I will give you a wonderful prize!'],
{requirement: new TemporaryBattleRequirement('Kecleon 3', 1, GameConstants.AchievementOption.less),
});

const Steven2 = new NPC('Steven', [
    'Thank you for finding the hidden Kecleons for me! Please accept this picture of a camouflaged Kecleon as your reward.',
], {image: 'assets/images/npcs/other/KecleonDrawing.png',
    requirement: new TemporaryBattleRequirement('Kecleon 3'),
});

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
], {image: 'assets/images/gymLeaders/Wallace.png'});

const ProfBirch = new ProfNPC('Prof. Birch',
    GameConstants.Region.hoenn,
    'That\'s another regional Pokédex completed! Fantastic.',
    'I really appreciate being able to see your outstanding progress, thank you! Sinnoh is next up.',
    'assets/images/npcs/Professor Birch.png');

const SCEntrance = new NPC('Strange Markings', [
    '<i>These strange markings seem to spell something out. The nearby Braille Enthusiast may know more.</i>',
], {image: 'assets/images/npcs/other/Regi Entrance.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 0), new QuestLineStepCompletedRequirement('The Three Golems', 1, GameConstants.AchievementOption.less)]),
});

const MazeHintLeft = new NPC('Room Engraving', [
    '<i>These strange markings seem to spell something out. The nearby Braille Enthusiast may know more.</i>',
], {image: 'assets/images/npcs/other/LeftBraille.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 1), new QuestLineStepCompletedRequirement('The Three Golems', 3, GameConstants.AchievementOption.less)]),
});

const SCMazeLeft = new NPC('Go Left', [
    '<i>You turn left and proceed to the next room.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 1), new QuestLineStepCompletedRequirement('The Three Golems', 3, GameConstants.AchievementOption.less)]),
});

const SCMazeLeftWrong = new NPC('Go Left', [
    '<i>You turn left, but it is a dead end.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 3), new QuestLineStepCompletedRequirement('The Three Golems', 6, GameConstants.AchievementOption.less)]),
});

const MazeHintRight = new NPC('Room Engraving', [
    '<i>These strange markings seem to spell something out. The nearby Braille Enthusiast may know more.</i>',
], {image: 'assets/images/npcs/other/RightBraille.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 5), new QuestLineStepCompletedRequirement('The Three Golems', 6, GameConstants.AchievementOption.less)]),
});

const SCMazeRight = new NPC('Go Right', [
    '<i>You turn right and proceed to the next room.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 5), new QuestLineStepCompletedRequirement('The Three Golems', 6, GameConstants.AchievementOption.less)]),
});

const SCMazeRightWrong = new NPC('Go Right', [
    '<i>You turn right, but it is a dead end.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 1), new QuestLineStepCompletedRequirement('The Three Golems', 5, GameConstants.AchievementOption.less)]),
});

const MazeHintStraight = new NPC('Room Engraving', [
    '<i>These strange markings seem to spell something out. The nearby Braille Enthusiast may know more.</i>',
], {image: 'assets/images/npcs/other/StraightBraille.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 3), new QuestLineStepCompletedRequirement('The Three Golems', 5, GameConstants.AchievementOption.less)]),
});

const SCMazeStraight = new NPC('Go Straight', [
    '<i>You go straight and proceed to the next room.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 3), new QuestLineStepCompletedRequirement('The Three Golems', 5, GameConstants.AchievementOption.less)]),
});

const SCMazeStraightWrong = new NPC('Go Straight', [
    '<i>You go straight, but it is a dead end.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 1), new QuestLineStepCompletedRequirement('The Three Golems', 3, GameConstants.AchievementOption.less)]),
});

const SCHints = new NPC('Hidden Message', [
    '<i>These strange markings seem to spell something out. The nearby Braille Enthusiast may know more.</i>',
], {image: 'assets/images/npcs/other/Regi Hints.png',
    requirement: new QuestLineStepCompletedRequirement('The Three Golems', 6),
});

const BrailleEnthusiast1 = new NPC('Braille Enthusiast', [
    'The markings at the entrance to the Sealed Chamber seem to say that some sort of secret is inside. Try to find more braille messages, and I can decode them for you!',
], {image: 'assets/images/npcs/Ruin Maniac.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 0), new QuestLineStepCompletedRequirement('The Three Golems', 1, GameConstants.AchievementOption.less)]),
});

const BrailleEnthusiast2 = new NPC('Braille Enthusiast', [
    'There are a few carvings inside this maze. The carving with five dots on the top row says "LEFT".',
    'The carving with nine dots on the top row says "STRAIGHT".',
    'The carving with six dots on the top row says "RIGHT".',
    'If you get totally lost, just wander around. You will find the right path eventually.',
], {image: 'assets/images/npcs/Ruin Maniac.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 1), new QuestLineStepCompletedRequirement('The Three Golems', 6, GameConstants.AchievementOption.less)]),
});

const BrailleEnthusiast3 = new NPC('Braille Enthusiast', [
    'The first carving says DESERT. There is a desert near Route 111, right?',
    'The second carving says ISLAND. There are a lot of islands on Route 105.',
    'The third carving says ANCIENT. I remember seeing some ancient ruins on Route 120.',
], {image: 'assets/images/npcs/Ruin Maniac.png',
    requirement: new QuestLineStepCompletedRequirement('The Three Golems', 6),
});

//Hoenn Towns
TownList['Littleroot Town'] = new Town(
    'Littleroot Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new BulletinBoard(GameConstants.BulletinBoards.Hoenn)],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
        npcs: [ProfBirch, LittlerootAide],
    }
);
TownList['Oldale Town'] = new Town(
    'Oldale Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [OldaleTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)],
        npcs: [OldaleTrackingScientist],
    }
);
TownList['Petalburg City'] = new Town(
    'Petalburg City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [PetalburgCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Petalburg City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 102)],
    }
);
TownList['Rustboro City'] = new Town(
    'Rustboro City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [RustboroCityShop],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))],
    }
);
TownList['Dewford Town'] = new Town(
    'Dewford Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [DewfordTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Dewford Town'])],
    {
        requirements: [new TemporaryBattleRequirement('May 2')],
    }
);
TownList['Slateport City'] = new Town(
    'Slateport City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [SlateportCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Slateport City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave'))],
        npcs: [SlateportHoennRoamerNPC],
    }
);
TownList['Mauville City'] = new Town(
    'Mauville City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [MauvilleCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mauville City']), HoennBerryMaster],
    {
        requirements: [new TemporaryBattleRequirement('May 3')],
    }
);
TownList['Verdanturf Town'] = new Town(
    'Verdanturf Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [VerdanturfTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Verdanturf Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 117)],
    }
);
TownList['Mt. Chimney'] = new Town(
    'Mt. Chimney',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new MoveToDungeon(dungeonList['Fiery Path']), new MoveToDungeon(dungeonList['Mt. Chimney Crater']), new MoveToDungeon(dungeonList['Jagged Pass']), new MoveToDungeon(dungeonList['Magma Hideout'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 112)],
    }
);
TownList['Fallarbor Town'] = new Town(
    'Fallarbor Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [FallarborTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fallarbor Town']), HoennFluteMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)],
        npcs: [FallarborProfessorCozmo],
    }
);
TownList['Lavaridge Town'] = new Town(
    'Lavaridge Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [LavaridgeTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lavaridge Town'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Jagged Pass'))],
    }
);
TownList['Fortree City'] = new Town(
    'Fortree City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [FortreeCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fortree City'])],
    {
        requirements: [new TemporaryBattleRequirement('May 4')],
        npcs: [FortreeWeatherman, FortreeRanger, Steven1, Steven2],
    }
);
TownList['Lilycove City'] = new Town(
    'Lilycove City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)],
    }
);
TownList['Mossdeep City'] = new Town(
    'Mossdeep City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [MossdeepCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mossdeep City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)],
        npcs: [MossdeepAstronomer],
    }
);
TownList['Pacifidlog Town'] = new Town(
    'Pacifidlog Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [PacifidlogTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pacifidlog Town']), TemporaryBattleList['Underground Fighting Ring']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 131)],
        npcs: [PacifidlogDiver],
    }
);
TownList['Sootopolis City'] = new Town(
    'Sootopolis City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [SootopolisCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Sootopolis City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 126), new GymBadgeRequirement(BadgeEnums.Mind)],
        npcs: [SootopolisWallace],
    }
);
TownList['Ever Grande City'] = new Town(
    'Ever Grande City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [EverGrandeCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Ever Grande City'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Rain)],
    }
);
TownList['Battle Frontier'] = new Town(
    'Battle Frontier',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [BattleFrontierShop, new BattleFrontierTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    }
);
TownList['Pokémon League Hoenn'] = new Town(
    'Pokémon League Hoenn',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [GymList['Elite Sidney'], GymList['Elite Phoebe'], GymList['Elite Glacia'], GymList['Elite Drake'], GymList['Champion Wallace'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
            new TemporaryBattleRequirement('Wally 2'),
        ],
    }
);

//Hoenn Dungeons
TownList['Petalburg Woods'] = new DungeonTown(
    'Petalburg Woods',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 104)]
);
TownList['Rusturf Tunnel'] = new DungeonTown(
    'Rusturf Tunnel',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 116),
        new GymBadgeRequirement(BadgeEnums.Stone),
    ]
);
TownList['Granite Cave'] = new DungeonTown(
    'Granite Cave',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new TemporaryBattleRequirement('May 2')]
);
TownList['Fiery Path'] = new DungeonTown(
    'Fiery Path',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 112)]
);
TownList['Meteor Falls'] = new DungeonTown(
    'Meteor Falls',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 114)]
);
TownList['Mt. Chimney Crater'] = new DungeonTown(
    'Mt. Chimney Crater',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Meteor Falls'))]
);
TownList['Jagged Pass'] = new DungeonTown(
    'Jagged Pass',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Chimney Crater'))]
);
TownList['New Mauville'] = new DungeonTown(
    'New Mauville',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new GymBadgeRequirement(BadgeEnums.Balance)]
);
TownList['Weather Institute'] = new DungeonTown(
    'Weather Institute',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 119)]
);
TownList['Mt. Pyre'] = new DungeonTown(
    'Mt. Pyre',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 122)]
);
TownList['Magma Hideout'] = new DungeonTown(
    'Magma Hideout',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Pyre'))]
);
TownList['Aqua Hideout'] = new DungeonTown(
    'Aqua Hideout',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Magma Hideout'))]
);
TownList['Shoal Cave'] = new DungeonTown(
    'Shoal Cave',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)]
);
TownList['Cave of Origin'] = new DungeonTown(
    'Cave of Origin',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 126),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seafloor Cavern')),
    ]
);
TownList['Seafloor Cavern'] = new DungeonTown(
    'Seafloor Cavern',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
        new GymBadgeRequirement(BadgeEnums.Mind),
    ]
);
TownList['Sky Pillar'] = new DungeonTown(
    'Sky Pillar',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 131),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Cave of Origin')),
    ]
);
TownList['Victory Road Hoenn'] = new DungeonTown(
    'Victory Road Hoenn',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new GymBadgeRequirement(BadgeEnums.Rain)],
    [TemporaryBattleList['Wally 2']]
);
TownList['Sealed Chamber'] = new DungeonTown(
    'Sealed Chamber',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 134),
        new GymBadgeRequirement(BadgeEnums.Mind)],
    [],
    {
        npcs: [SCEntrance, MazeHintLeft, MazeHintRight, MazeHintStraight, SCMazeLeft, SCMazeLeftWrong, SCMazeRight, SCMazeRightWrong, SCMazeStraight, SCMazeStraightWrong, SCHints, BrailleEnthusiast1, BrailleEnthusiast2, BrailleEnthusiast3],
    }
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
    ItemList['Burmy (Plant)'],
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
    ItemList.Macho_Brace,
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
const SinnohBerryMaster = new BerryMasterShop(GameConstants.BerryTraderLocations['Hearthome City'],[
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
], {image: 'assets/images/npcs/Contest Champion (Johanna).png'});

const SandgemBeachcomber = new NPC('Beachcomber', [
    'Hmmm… Oh! Sorry, I didn’t see you there! Sometimes the strangest things wash up on this beach, so I just got caught up in the search.',
    'Just last week a weird blue egg with a red center showed up. I went to go pick it up, but then it hatched! I was so surprised that the little blue Pokémon just hopped right back into the ocean. Who knows, maybe you’ll find it roaming around the region!',
]);

const FloaromaFlowerGirl = new NPC('Flower Girl', [
    'Something amazing just happened!',
    'My friend was taking their Eevee on a walk through Eterna Forest, and it suddenly evolved!',
    'Can you believe that?',
], {image: 'assets/images/npcs/Aroma Lady.png'});

const EternaLassCaroline = new NPC('Lass Caroline', [
    'Oh, you came from the Forest! That Old Chateau is so creepy, isn’t it? I’ve heard that trainers that catch the weird ghost in the TV have found ghosts in other appliances. Even lawnmowers!',
], {image: 'assets/images/trainers/Lass.png'});

const OreburghConstructionWorker = new NPC('Construction Worker', [
    'I was doing some exploring in Mt. Coronet last week, and my Nosepass gained a lot of levels.',
    'I had a big suprise when he reached level 20 though!',
], {image: 'assets/images/trainers/Worker (male).png'});

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
], {image: 'assets/images/trainers/Burglar.png'});

const CanalaveRiley = new NPC('Riley', [
    'My partner Lucario evolved from a Riolu during daytime when I used a Soothe Bell.',
], {image: 'assets/images/npcs/Riley.png'});

const CanalaveYoungBoy = new NPC('Young Boy', [
    'Oh, hello! Say, have you ever heard of Cresselia? Once when I was really little I had a really bad dream I couldn’t wake up from, but then a kind trainer went to an island near here and got help from Cresselia to cure me!',
    'Maybe if you can prove yourself by conquering that island, you could find Cresselia roaming around the region...',
]);

const CanalaveSinnohMyth = new NPC('Sinnoh\'s Myth', [
    '<i>Three Pokémon there were.</i>',
    '<i>Into the lakes they dove.</i>',
    '<i>Deep, deep, drawing no breath.</i>',
    '<i>Deeper, deeper they dove.</i>',
    '<i>Into suffocating depths they dove.</i>',
    '<i>Deeper, then deepest they alight.</i>',
    '<i>From the lake floor they rise.</i>',
    '<i>Bearing with them the power to make vast lands, they rise again.</i>',
],{
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 0), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 2, GameConstants.AchievementOption.less)])});

const VerityMesprit = new NPC('Mesprit', [
    '<i>You are the trainer looking for the Distortion World, right?</i>',
    '<i>We can help you in your mission, but we will need a few materials.</i>',
    '<i>Collect 10 Purple Shards in dungeons from the Johto region and then visit my two siblings. They will also help you in your quest.</i>',
],{
    image: 'assets/images/pokemon/481.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 2), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 4, GameConstants.AchievementOption.less)])});

const ValorAzelf = new NPC('Azelf', [
    '<i>Mesprit told me you would come.</i>',
    '<i>In order to enter the Distortion World, we need to open a gate to it. The materials you gathered for Mesprit are only a third of the ones needed to open such gate.</i>',
    '<i>Obtain 10 Ochre Shards and then visit Uxie at Lake Acuity. These Shards can be found in a few dungeons from the Hoenn region.</i>',
],{
    image: 'assets/images/pokemon/482.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 4), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 6, GameConstants.AchievementOption.less)])});

const SnowpointYoungGirl = new NPC('Young Girl', [
    'Someone told me that training an Eevee in Lake Acuity will make it evolve.',
    'They must be lying, how can that be true?!',
]);

const AcuityUxie = new NPC('Uxie', [
    '<i>My siblings had informed me of your arrival.</i>',
    '<i>Looks like you have already gathered more than half of the necessary materials. The only materials left to make the key are 10 Crimson Shards, which can be found in various Sinnoh Dungeons.</i>',
    '<i>We will be waiting at Sendoff Spring, meet us there after you have collected the shards.</i>',
],{
    image: 'assets/images/pokemon/480.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 6), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 8, GameConstants.AchievementOption.less)])});

const SunyshoreRibbonerJulia = new NPC('Ribboner Julia', [
    'Oh! I don’t get visitors often. My husband is a sailor who visits far away lands… he always tells me these fantastic things.',
    'One time he came back and his Wailmer looked funny. We took it to the Pokécenter and they said it had caught some weird virus called Pokérus!',
    'They said that it is a virus that can spread in the Pokémon Day Care. They said that Pokémon can only spread or catch the virus if they aren’t ready to hatch yet, and that they need to share a type with one another.',
    'If you have a Pokémon with Pokérus, try catching more of that type of Pokémon. When he got back from his next trip, oddly enough Wailmer seemed stronger than ever!',
], {image: 'assets/images/trainers/Beauty.png'});

const FightAreaAceTrainer = new NPC('Ace Trainer Quinn', [
    'Something amazing happened on top of Mt. Coronet. We could see it all the way from here. I\'m sure everyone in the entire region saw it.',
    'What? You were there? What happened? What was that purple thing?',
    'The Distortion World? Hold on, I think I\'ve heard that name before, there was a guy around here named Zero looking for a way to enter that place.',
], {image: 'assets/images/trainers/Ace Trainer (male).png'});

const FightAreaZero1 = new NPC('Zero', [
    'You\'re the Champion, right? I need your help on a small errand.',
    'My old friend Newton used to study the Distortion World, he was working on opening a gate to it. I\'ve heard that you were able to enter the Distortion World from a portal at the top of Mt. Coronet, so I was wondering if you could help me open a new portal to fulfill my friend\'s wish.',
    'An old book about Sinnoh\'s history was recently discovered at the Canalave City Library, it may have useful information.',
], {
    image: 'assets/images/temporaryBattle/Zero.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Zero\'s Ambition'), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 1, GameConstants.AchievementOption.less)]),
});

const FightAreaZero2 = new NPC('Zero', [
    'What was in that book? Did you find any information on the Distortion World?',
    'It didn\'t mention it once? That\'s a shame.',
    'Wait, you said the book mentioned the Lake Trio, right? Legends say they have existed since the creation of the world, they may know how to enter the Distortion World.',
], {
    image: 'assets/images/temporaryBattle/Zero.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 1), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 2, GameConstants.AchievementOption.less)]),
});

const SurvivalAreaSinnohRoamerNPC = new RoamerNPC('Hiker Kevin', [
    'I spotted a bunch of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.sinnoh, RoamingPokemonList.findGroup(GameConstants.Region.sinnoh, GameConstants.SinnohSubRegions.Sinnoh), 'assets/images/trainers/Hiker.png');

const SendoffSpringLakeTrio = new NPC('Lake Trio', [
    '<i>You are finally here.</i>',
    '<i>We have been able to create a key to the Distortion World using the materials you collected, but it is unable to work in its current state.</i>',
    '<i>We bestow it upon you, charge it with the ghostly energy of the Distortion World.</i>',
    '<i>In order to do so, you must collect Ghost gems by defeating Ghost type Pokémon and find a Spooky Plate. There should be some in this dungeon, we can sense their energy.</i>',
],{
    image: 'assets/images/npcs/Lake Trio.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 9), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 11, GameConstants.AchievementOption.less)])});

const SendoffSpringZero1 = new NPC('Zero', [
    'I couldn\'t wait anymore for you to report about your progress, so I asked around and discovered you were coming here.',
    'Wait, is that the key to the Distortion World? With that, I could open the gate myself.',
    'You know what? You are fired, I no longer need you. Now, give me the key to the Distortion World or I will take it by force!',
], {
    image: 'assets/images/temporaryBattle/Zero.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 11), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 12, GameConstants.AchievementOption.less)]),
});

const SendoffSpringZero2 = new NPC('Zero', [
    'Seems like you have managed to catch the Pokémon that rules the Distortion World.',
    'But this doesn\'t look like the Renegade Pokémon from legend, it seems like some sort of altered form.',
    'I once read that, deep within the Distortion World, there is an object capable of carrying the realm\'s power. Maybe, if you train Giratina while it has such object equipped, it can turn into its true form.',
], {
    image: 'assets/images/temporaryBattle/Zero.png',
    requirement: new QuestLineStepCompletedRequirement('Zero\'s Ambition', 14),
});

const ProfRowan = new ProfNPC('Prof. Rowan',
    GameConstants.Region.sinnoh,
    'Congratulations, you\'re more than half-way completed on the national Pokédex!',
    'Next stop is Unova! I\'ve always wanted to visit Castelia City, personally...', 'assets/images/npcs/Professor Rowan.png');

const LucyStevens1 = new NPC('Lucy Stevens', [
    'Who sent you to talk to me? Howard Clifford himself? That\'s a little suspicious, but you seem trustworthy enough.',
    'I\'ve been doing some research on this R compound, and have reason to believe it is being manufactured or used in research at the P2 Lab in Unova.',
    'We should investigate!',
], {
    image: 'assets/images/npcs/Lucy Stevens.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 7), new QuestLineStepCompletedRequirement('Detective Pikachu', 9, GameConstants.AchievementOption.less)]),
});


//Sinnoh Towns
TownList['Twinleaf Town'] = new Town(
    'Twinleaf Town',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new BulletinBoard(GameConstants.BulletinBoards.Sinnoh)],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
        npcs: [TwinleafContestChampion],
    }
);
TownList['Sandgem Town'] = new Town(
    'Sandgem Town',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [SandgemTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 201)],
        npcs: [ProfRowan, SandgemBeachcomber],
    }
);
TownList['Jubilife City'] = new Town(
    'Jubilife City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [JubilifeCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)],
    }
);
TownList['Oreburgh City'] = new Town(
    'Oreburgh City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [OreburghCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Oreburgh City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Oreburgh Gate'))],
        npcs: [OreburghConstructionWorker],
    }
);
TownList['Floaroma Town'] = new Town(
    'Floaroma Town',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
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
    GameConstants.SinnohSubRegions.Sinnoh,
    [EternaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Eterna City']), new MoveToDungeon(dungeonList['Team Galactic Eterna Building'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Eterna Forest'))],
        npcs: [EternaLassCaroline],
    }
);
TownList['Mt. Coronet'] = new Town(
    'Mt. Coronet',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new MoveToDungeon(dungeonList['Mt. Coronet South']), new MoveToDungeon(dungeonList['Mt. Coronet North']), new MoveToDungeon(dungeonList['Spear Pillar']), new MoveToDungeon(dungeonList['Hall of Origin'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207)],
    }
);
TownList['Hearthome City'] = new Town(
    'Hearthome City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [HearthomeCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Hearthome City']), SinnohBerryMaster],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 208)],
        npcs: [HearthomeContestFan, LucyStevens1],
    }
);
TownList['Solaceon Town'] = new Town(
    'Solaceon Town',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [SolaceonTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Solaceon Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)],
    }
);
TownList['Veilstone City'] = new Town(
    'Veilstone City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [DepartmentStoreShop, new MoveToDungeon(dungeonList['Team Galactic HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 215)],
        npcs: [],
    }
);
TownList['Pastoria City'] = new Town(
    'Pastoria City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [PastoriaShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pastoria City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213)],
    }
);
TownList['Celestic Town'] = new Town(
    'Celestic Town',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [CelesticTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Celestic Town']), TemporaryBattleList['Galactic Boss Cyrus']],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Fen)],
        npcs: [CelesticGrandma],
    }
);
TownList['Pal Park'] = new Town(
    'Pal Park',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [PalParkShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pal Park'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 221)],
        npcs: [PalParkWarden, PalParkBurglar],
    }
);
TownList['Canalave City'] = new Town(
    'Canalave City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [CanalaveCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Canalave City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)],
        npcs: [CanalaveRiley, CanalaveYoungBoy, CanalaveSinnohMyth],
    }
);
TownList['Snowpoint City'] = new Town(
    'Snowpoint City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [SnowpointCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Snowpoint City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 217)],
        npcs: [SnowpointYoungGirl],
    }
);
TownList['Sunyshore City'] = new Town(
    'Sunyshore City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [SunyshoreCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Sunyshore City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 222)],
        npcs: [SunyshoreRibbonerJulia],
    }
);
TownList['Fight Area'] = new Town(
    'Fight Area',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [FightAreaShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
        npcs: [FightAreaAceTrainer, FightAreaZero1, FightAreaZero2],
    }
);
TownList['Survival Area'] = new Town(
    'Survival Area',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [TemporaryBattleList['Barry 7'], SurvivalAreaShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Survival Area'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)],
        npcs: [SurvivalAreaSinnohRoamerNPC],
    }
);
TownList['Resort Area'] = new Town(
    'Resort Area',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [ResortAreaShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Resort Area'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 229)],
    }
);
TownList['Pokémon League Sinnoh'] = new Town(
    'Pokémon League Sinnoh',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [GymList['Elite Aaron'], GymList['Elite Bertha'], GymList['Elite Flint'], GymList['Elite Lucian'], GymList['Champion Cynthia'], pokeLeagueShop()],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223),
            new TemporaryBattleRequirement('Barry 6'),
        ],
    }
);

//Sinnoh Dungeons
TownList['Oreburgh Gate'] = new DungeonTown(
    'Oreburgh Gate',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 203)]
);
TownList['Valley Windworks'] = new DungeonTown(
    'Valley Windworks',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 204),
        new GymBadgeRequirement(BadgeEnums.Coal),
    ]
);
TownList['Eterna Forest'] = new DungeonTown(
    'Eterna Forest',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Coal),
    ]
);
TownList['Old Chateau'] = new DungeonTown(
    'Old Chateau',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Forest),
    ]
);
TownList['Team Galactic Eterna Building'] = new DungeonTown(
    'Team Galactic Eterna Building',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Forest)]
);
TownList['Wayward Cave'] = new DungeonTown(
    'Wayward Cave',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 206)]
);
TownList['Mt. Coronet South'] = new DungeonTown(
    'Mt. Coronet South',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207)]
);
TownList['Solaceon Ruins'] = new DungeonTown(
    'Solaceon Ruins',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)]
);
TownList['Iron Island'] = new DungeonTown(
    'Iron Island',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)]
);
TownList['Lake Valor'] = new DungeonTown(
    'Lake Valor',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Mine)],
    [],
    {
        npcs: [ValorAzelf],
    }
);
TownList['Lake Verity'] = new DungeonTown(
    'Lake Verity',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Valor'))],
    [],
    {
        npcs: [VerityMesprit],
    }
);
TownList['Mt. Coronet North'] = new DungeonTown(
    'Mt. Coronet North',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 211),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Verity')),
    ]
);
TownList['Lake Acuity'] = new DungeonTown(
    'Lake Acuity',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Icicle)],
    [],
    {
        npcs: [AcuityUxie],
    }
);
TownList['Team Galactic HQ'] = new DungeonTown(
    'Team Galactic HQ',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Acuity'))]
);
TownList['Spear Pillar'] = new DungeonTown(
    'Spear Pillar',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic HQ'))]
);
TownList['Distortion World'] = new DungeonTown(
    'Distortion World',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Spear Pillar'))]
);
TownList['Victory Road Sinnoh'] = new DungeonTown(
    'Victory Road Sinnoh',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223)]
);
TownList['Sendoff Spring'] = new DungeonTown(
    'Sendoff Spring',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new QuestLineStepCompletedRequirement('Zero\'s Ambition', 8)],
    [TemporaryBattleList.Zero],
    {
        npcs: [SendoffSpringLakeTrio, SendoffSpringZero1, SendoffSpringZero2],
    }
);
TownList['Hall of Origin'] = new DungeonTown(
    'Hall of Origin',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Fullmoon Island'] = new DungeonTown(
    'Fullmoon Island',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Newmoon Island'] = new DungeonTown(
    'Newmoon Island',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
);
TownList['Flower Paradise'] = new DungeonTown(
    'Flower Paradise',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 224),
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
    ]
);
TownList['Stark Mountain'] = new DungeonTown(
    'Stark Mountain',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 227)]
);
TownList['Snowpoint Temple'] = new DungeonTown(
    'Snowpoint Temple',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
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
    ItemList['Meloetta (Pirouette)'],
]);

//Unova Gem Master
const UnovaFluteMaster = new GemMasterShop();

//Unova NPCs

const ExcitedChild = new NPC('Excited Child', [
    'Did you hear? Did you see? It was on TV!',
    'I was just watching my favorite show, The National Gymquirer. It was a live segment! Some hot shot trainer from Kanto defeated Drayden! It was amazing! That trainer is so cool! Drayden is like unbeatable.',
    'Then my programme got interrupted by an emergency broadcast. A report on the first confirmed sightings of Tornadus and Thundurus in over twenty-five years! I\'ve read so much about them, they are my favorites.',
    'Last time they were spotted they just roamed around, causing all kinds of mischief. According to my books anyway. I\'m sure that amazing trainer from the TV will want to catch these mighty forces of nature.',
], {image: 'assets/images/trainers/School Kid (female).png'});

const CasteliaMusician = new NPC('Musician', [
    'Sup. Ya like jazz? No? Well then you should check out me and my band at the Sonata Cafe where we never play Jazz.',
    'Sometimes a cool singing Pokémon shows up and joins in on our set. I’ve heard that trainers as strong as the Champion have found it roaming around the region looking for Pokémon battles… but even I wouldn’t challenge it to a Music battle.',
], {image: 'assets/images/npcs/Musician.png'});

const PlasmaGrunt1 = new NPC('Team Plasma Grunt', [
    'Why hello there. Nothing strange going on here. Please move along.',
    'Oh that business in the sewers? Yes, we should not have gone in there. Very unfortunate situation. A complete misunderstanding. We were just curious about what was down there.',
    'Bye now.',
], {image: 'assets/images/trainers/Team Plasma Grunt (male).png'});

const RelicCastleRuinmaniac = new NPC('Ruin Maniac', [
    'I\'ve heard tell of a secret room in this ruin. A room that supposedly contains a very rare Pokémon.',
    'Apparently this secret room is only accessible via a secret entrance in Relic Passage. Relic Passage runs from Driftveil City all the way under the river to Relic Castle. It\'s very impressive. Once I\'m done investigating this part of the ruin I\'m definitely going to check it out!',
], {image: 'assets/images/trainers/Ruin Maniac.png'});

const NimbasaExplorer = new NPC('Explorer', [
    'Whew! The desert is rough out there, glad you\'ve made it all the way to Nimbasa.',
    'Sometimes I find some weird stuff out in the sand, sometimes even Pokémon hiding in Chests. Like this one time in Relic Castle, I found a Pokémon that looks like a statue that I\'ve never seen before!',
], {image: 'assets/images/trainers/Backpacker (male).png'});

const PlasmaGrunt2 = new NPC('Team Plasma Grunt', [
    'I told you. There\'s nothing suspicious going on here. We aren\'t stealing any Pokémon.',
    'If you won\'t leave, we\'ll have to remove you.',
], {
    image: 'assets/images/trainers/Team Plasma Grunt (male).png',
    requirement: new OneFromManyRequirement([new TemporaryBattleRequirement('Team Plasma Grunt 4', 1, GameConstants.AchievementOption.less), new TemporaryBattleRequirement('Team Plasma Grunt 5', 1, GameConstants.AchievementOption.less), new TemporaryBattleRequirement('Team Plasma Grunts 1', 1, GameConstants.AchievementOption.less), new TemporaryBattleRequirement('Team Plasma Grunts 2', 1, GameConstants.AchievementOption.less)]),
});

const DriftveilZinzolin = new NPC('Zinzolin', [
    'YOU!',
    'Once again we will use the legendary Dragon-type Pokémon and we will rule the Unova region!',
    'Curious Trainers, we shall not let you run around as you please!',
    'Shadow Triad! Get them out of here!',
], {
    image: 'assets/images/trainers/Team Plasma (zinzolin).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 6), new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 7, GameConstants.AchievementOption.less)]),
});

const PlasmaGrunt3 = new NPC('Team Plasma Grunt', [
    'Remember when I told you that there was nothing suspicious about this frigate? I was lying, of course.',
    'But truth be told, I didn\'t know that this thing could fly. I was not prepared for this.',
    'I\'m gonna be sick...',
], {image: 'assets/images/trainers/Team Plasma Grunt (male).png'});

const GiantChasmColress = new NPC('Colress', [
    'Welcome! I was asked by an acquaintance to help with his research. What I desire is to bring out the entirety in Pokémon potential! If I can accomplish that, I don\'t care what it takes!',
    'If it means the strength must be brought out by the interactions between Pokémon and Trainers, then so be it! If it means you have to use a merciless approach, like Team Plasma\'s, and force out all of the Pokémon\'s power, then so be it! And yes, if the entire world is destroyed as a result, then so be it...',
    'That aside! The reason I have been traveling all over Unova and battling many Pokémon Trainers is because I was testing the viability of this approach to bringing out the full strength of Pokémon. In that respect, you\'ve done an amazing job.',
    'Well now! Tell me if you have the answer I desire or not! If you\'re ready, come at me!',
], {
    image: 'assets/images/trainers/Team Plasma (colress).png',
    requirement: new MultiRequirement([new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm')), new TemporaryBattleRequirement('Plasma Shadow 1'), new TemporaryBattleRequirement('Colress 3', 1, GameConstants.AchievementOption.less)]),
});

const GiantChasmShadowTriad = new NPC('Shadow Triad', [
    'Listen well! We swore to be loyal to Lord Ghetsis since he saved us! The only thing we want is the world Lord Ghetsis desires! Even if we lose, Lord Ghetsis simply has to win...',
    'The only thing you can do is watch Lord Ghetsis use Kyurem to freeze Unova solid. That\'s all...',
], {
    image: 'assets/images/npcs/Shadow Triad.png',
    requirement: new MultiRequirement([new TemporaryBattleRequirement('Colress 3'), new TemporaryBattleRequirement('Ghetsis 1', 1, GameConstants.AchievementOption.less)]),
});

const IcirrusFanClubChairman = new NPC('Fan Club Chairman', [
    'Legends say Kyurem is missing a part of itself. It is waiting for a hero to fill in the missing parts of its body with Truth or Ideals.',
    'The legendary dragons of Dragonspiral Tower are said to embody these very concepts. They sometimes leave a piece of their DNA behind after a battle.',
    'If you have DNA splicers, perhaps you can make Kyurem whole again.',
    'I\'ve never seen it, but supposedly it works just like any other evolution item.',
], {image: 'assets/images/trainers/Gentleman.png'});

const P2LaboratoryColress = new NPC('Colress', [
    'So you defeated Ghetsis. Interesting. You must be a very strong trainer.',
    'A rare Pokémon is hiding somewhere inside this abandoned laboratory. You can catch it if you want. I have no interest in it.',
    'However, I do have an interest in you! I want to taste your power. Defeat me, and I\'ll let you search for the rare Pokémon.',
    'I\'ll be waiting for you inside.',
], {
    image: 'assets/images/trainers/Team Plasma (colress).png',
    requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'), GameConstants.AchievementOption.less),
});

const UnovaRoamerNPC = new RoamerNPC('Professor Juniper\'s Aide', [
    'Our research indicates a higher concentration of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.unova, RoamingPokemonList.findGroup(GameConstants.Region.unova, GameConstants.UnovaSubRegions.Unova));

const ProfJuniper = new ProfNPC('Prof. Juniper',
    GameConstants.Region.unova,
    'Let me see your progress...Ah, fantastic, as usual!',
    'Allow me some time to arrange tickets for your next destination.',
    'assets/images/npcs/Professor Juniper.png');

const ProfBurnet = new NPC('Professor Burnet', [
    'Welcome to my laboratory, trainer! I am working here to understand the mysterious Interdream Zone.',
    'My laboratory equipment can convert the energy of dreams you experience while sleeping, or "Offline" into orbs. We can then open these orbs and see what your mind experienced in the Interdream Zone.',
    'A trainer like you surely dreams of rare Pokémon. The more rare Pokémon you find from the Interdream Zone, the more we can explore to find others!',
], {
    image: 'assets/images/npcs/Professor Burnet.png',
});

const DreamResearcher1 = new NPC('Dream Researcher', [
    'I have been helping Professor Burnet explore the Interdream Zone with the help of my Audino.',
    'Audino\'s excellent hearing lets it pick up even the quietest hints from Dream Orbs. If you can help the professor advance her research, I may be able to help you in return.',
], {
    image: 'assets/images/trainers/Scientist (female).png',
    requirement: new TemporaryBattleRequirement('Dream Researcher', 1, GameConstants.AchievementOption.less),
});

const DreamResearcher2 = new NPC('Dream Researcher', [
    'What a battle! That Audinite will let you Mega Evolve your Audino, under certain circumstances.',
], {
    image: 'assets/images/trainers/Scientist (female).png',
    requirement: new TemporaryBattleRequirement('Dream Researcher'),
});

//Unova Towns
TownList['Aspertia City'] = new Town(
    'Aspertia City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
        npcs: [],
    }
);
TownList['Floccesy Town'] = new Town(
    'Floccesy Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [FloccesyTownShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 19),
            new TemporaryBattleRequirement('Hugh 1'),
        ],
    }
);
TownList['Virbank City'] = new Town(
    'Virbank City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [VirbankCityShop, TemporaryBattleList['Team Plasma Grunt 1']],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Basic)],
    }
);
TownList['Castelia City'] = new Town(
    'Castelia City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [CasteliaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Castelia City']), new MoveToDungeon(dungeonList['Castelia Sewers'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Toxic)],
        npcs: [CasteliaMusician],
    }
);
TownList['A Perfectly Ordinary Frigate'] = new Town(
    'A Perfectly Ordinary Frigate',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [],
    {
        requirements: [
            new GymBadgeRequirement(BadgeEnums.Insect),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 1),
            new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        ],
        npcs: [PlasmaGrunt1],
    }
);
TownList['Nimbasa City'] = new Town(
    'Nimbasa City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [NimbasaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Nimbasa City']), TemporaryBattleList['Team Plasma Grunt 2'], TemporaryBattleList['Team Plasma Grunt 3']],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 4),
            new TemporaryBattleRequirement('Colress 1'),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 2),
        ],
        npcs: [NimbasaExplorer],
    }
);
TownList['Driftveil City'] = new Town(
    'Driftveil City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [TemporaryBattleList['Hugh 7'], DriftveilCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Driftveil City'])],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 5),
            new TemporaryBattleRequirement('Team Plasma Grunt 2'),
            new TemporaryBattleRequirement('Team Plasma Grunt 3'),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 4),
        ],
    }
);
TownList['A Totally Unsuspicious Frigate'] = new Town(
    'A Totally Unsuspicious Frigate',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [TemporaryBattleList['Team Plasma Grunt 4'], TemporaryBattleList['Team Plasma Grunt 5'], TemporaryBattleList['Team Plasma Grunts 1'], TemporaryBattleList['Team Plasma Grunts 2']],
    {
        requirements: [
            new GymBadgeRequirement(BadgeEnums.Quake),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 4),
        ],
        npcs: [PlasmaGrunt2, DriftveilZinzolin],
    }
);
TownList['Mistralton City'] = new Town(
    'Mistralton City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [MistraltonCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mistralton City'])],
    {
        requirements: [
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Chargestone Cave')),
            new TemporaryBattleRequirement('Colress 2'),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 7),
        ],
    }
);
TownList['Lentimas Town'] = new Town(
    'Lentimas Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [LentimasTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lentimas Town'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Jet)],
    }
);
TownList['Undella Town'] = new Town(
    'Undella Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [UndellaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Undella Town']), UnovaFluteMaster],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    }
);
TownList['Lacunosa Town'] = new Town(
    'Lacunosa Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [LacunosaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lacunosa Town']), TemporaryBattleList['Team Plasma Grunt 6'], TemporaryBattleList['Zinzolin 1']],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 13),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 8),
        ],
    }
);
TownList['Opelucid City'] = new Town(
    'Opelucid City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [OpelucidCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Opelucid City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 11)],
    }
);
TownList['Team Plasma Assault'] = new Town(
    'Team Plasma Assault',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [TemporaryBattleList['Team Plasma Grunt 7'], TemporaryBattleList['Team Plasma Grunt 8'], TemporaryBattleList['Team Plasma Grunt 9'], TemporaryBattleList['Zinzolin 2'], TemporaryBattleList['Plasma Shadow 1']],
    {
        requirements: [
            new GymBadgeRequirement(BadgeEnums.Legend),
            new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 11),
        ],
        npcs: [PlasmaGrunt3],
    }
);
TownList['Shopping Mall Nine'] = new Town(
    'Shopping Mall Nine',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 9)],
    }
);
TownList['Humilau City'] = new Town(
    'Humilau City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [HumilauCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Humilau City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 21)],
        npcs: [ExcitedChild],
    }
);
TownList['Icirrus City'] = new Town(
    'Icirrus City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
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
    GameConstants.UnovaSubRegions.Unova,
    [new DreamOrbTownContent(), BlackAndWhiteParkShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Black and White Park']), TemporaryBattleList.DreamResearcher],
    {
        requirements: [new OneFromManyRequirement([
            new MultiRequirement([
                new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
                new RouteKillRequirement(10, GameConstants.Region.unova, 14),
            ]),
            new RouteKillRequirement(10, GameConstants.Region.unova, 15),
        ])],
        npcs: [ProfBurnet, DreamResearcher1, DreamResearcher2],
    }
);
TownList['Nacrene City'] = new Town(
    'Nacrene City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [NacreneCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Nacrene City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinwheel Forest'))],
    }
);
TownList['Striaton City'] = new Town(
    'Striaton City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [StriatonCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Striaton City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 3)],
    }
);
TownList['Accumula Town'] = new Town(
    'Accumula Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [AccumulaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Accumula Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 2)],
    }
);
TownList['Nuvema Town'] = new Town(
    'Nuvema Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [NuvemaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Nuvema Town']), TemporaryBattleList['Lab Ambush']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.unova, 1)],
        npcs: [ProfJuniper, UnovaRoamerNPC],
    }
);
TownList['Anville Town'] = new Town(
    'Anville Town',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [AnvilleTownShop],
    {
        requirements: [
            new ObtainedPokemonRequirement('Meloetta (Aria)'),
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
        ],
    }
);
TownList['Pokémon League Unova'] = new Town(
    'Pokémon League Unova',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [GymList['Elite Shauntal'], GymList['Elite Marshal'], GymList['Elite Grimsley'], GymList['Elite Caitlin'], GymList['Champion Iris'], pokeLeagueShop()],
    {
        requirements: [
            new TemporaryBattleRequirement('Hugh 5'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Unova')),
        ],
    }
);

//Unova Dungeons
TownList['Pledge Grove'] = new DungeonTown(
    'Pledge Grove',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new ObtainedPokemonRequirement('Keldeo'),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Moor of Icirrus')),
    ]
);
TownList['Floccesy Ranch'] = new DungeonTown(
    'Floccesy Ranch',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 20),
        new TemporaryBattleRequirement('Hugh 2'),
    ]
);
TownList['Liberty Garden'] = new DungeonTown(
    'Liberty Garden',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    //Victini dungeon, maybe unlock later
    [new TemporaryBattleRequirement('Team Plasma Grunt 1')]
);
TownList['Castelia Sewers'] = new DungeonTown(
    'Castelia Sewers',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 0),
    ]
);
TownList['Relic Passage'] = new DungeonTown(
    'Relic Passage',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new GymBadgeRequirement(BadgeEnums.Quake)]
);
TownList['Relic Castle'] = new DungeonTown(
    'Relic Castle',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 25)],
    [],
    {
        npcs: [RelicCastleRuinmaniac],
    }
);
TownList['Lostlorn Forest'] = new DungeonTown(
    'Lostlorn Forest',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 16)]
);
TownList['Chargestone Cave'] = new DungeonTown(
    'Chargestone Cave',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 6)]
);
TownList['Mistralton Cave'] = new DungeonTown(
    'Mistralton Cave',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new TemporaryBattleRequirement('Colress 2'),
        new RouteKillRequirement(10, GameConstants.Region.unova, 6),
    ]
);
TownList['Celestial Tower'] = new DungeonTown(
    'Celestial Tower',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 7)]
);
TownList['Reversal Mountain'] = new DungeonTown(
    'Reversal Mountain',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new GymBadgeRequirement(BadgeEnums.Jet)]
);
TownList['Seaside Cave'] = new DungeonTown(
    'Seaside Cave',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 24),
        new TemporaryBattleRequirement('Plasma Shadow 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 14),
    ]
);
TownList['Plasma Frigate'] = new DungeonTown(
    'Plasma Frigate',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 22),
        new GymBadgeRequirement(BadgeEnums.Wave),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 14),
    ]
);
TownList['Giant Chasm'] = new DungeonTown(
    'Giant Chasm',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Plasma Frigate')),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 15),
    ],
    [TemporaryBattleList['Colress 3'], TemporaryBattleList['Plasma Shadow 2'], TemporaryBattleList['Plasma Shadow 3'], TemporaryBattleList['Plasma Shadow 4'], TemporaryBattleList['Ghetsis 1'], TemporaryBattleList['Ghetsis 2']],
    {
        npcs: [GiantChasmColress, GiantChasmShadowTriad],
    }
);
TownList['Cave of Being'] = new DungeonTown(
    'Cave of Being',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 23)]
);
TownList['Abundant Shrine'] = new DungeonTown(
    'Abundant Shrine',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 23),
        new RouteKillRequirement(10, GameConstants.Region.unova, 14),
        new ObtainedPokemonRequirement('Tornadus'),
        new ObtainedPokemonRequirement('Thundurus'),
    ]
);
TownList['Victory Road Unova'] = new DungeonTown(
    'Victory Road Unova',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 23)]
);
TownList['Twist Mountain'] = new DungeonTown(
    'Twist Mountain',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
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
    GameConstants.UnovaSubRegions.Unova,
    [new OneFromManyRequirement([
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
    ])]
);
TownList['Moor of Icirrus'] = new DungeonTown(
    'Moor of Icirrus',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 8),
        new ObtainedPokemonRequirement('Cobalion'),
        new ObtainedPokemonRequirement('Terrakion'),
        new ObtainedPokemonRequirement('Virizion'),
    ]
);
TownList['Pinwheel Forest'] = new DungeonTown(
    'Pinwheel Forest',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
);
TownList.Dreamyard = new DungeonTown(
    'Dreamyard',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 3)]
);
TownList['P2 Laboratory'] = new DungeonTown(
    'P2 Laboratory',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new RouteKillRequirement(10, GameConstants.Region.unova, 17)],
    [],
    {
        npcs: [P2LaboratoryColress],
    }
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
    ItemList.Key_stone,
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
    'Rumor has it that if you conquer the Kalos Power Plant enough times, a strong Pokémon made out of Fire and Water will challenge you. But I bet you’d have to be the Champion before it finds you worthy… I certainly have never seen it!',
]);

const CamphrierFlabébéEnthusiast = new NPC('Flabébé Enthusiast', [
    'Ah, isn\'t Flabébé such an eye-catching Pokémon? All these different lovely colors…',
    'If you\'re searching for the yellow and blue kinds, look no further than the Farm!',
    'They simply can\'t resist berries that match their colors - just plant a few and they\'ll soon come wandering in.',
]);

const SharlourKorrina = new NPC('Korrina', [
    'What an explosive battle! I could tell that you didn\'t hold anything back!',
    'To Mega Evolve your Lucario, you need an even stronger bond!',
    'You can follow your progress in your Pokédex.',
    'When your bond is strong enough, you can Mega Evolve it using a Key Stone! You can buy them in this city!',
], {
    image: 'assets/images/gymLeaders/Korrina.png',
    requirement: new TemporaryBattleRequirement('Korrina'),
});

const CoumarineBirdwatcher = new NPC('Birdwatcher', [
    'I\'ve heard there is a cave you can find if you go out on the ocean a little ways.',
    'Apparently defeating a strong creature there unleashes some energy.',
    'There are rumors that the energy calls some legendary birds to roam Kalos!',
]);

const LaverreFurisodeGirlKatherine = new NPC('Furisode Girl Katherine', [
    'Don\'t you find Goomy to be an interesting Pokémon? I certainly think so, even though it isn\'t a problem for my Pokémon~',
    'I\'ve heard its evolutionary line loves damp conditions, and apparently if you train a Sliggoo during rainy or foggy weather something marvelous happens!',
], {image: 'assets/images/npcs/Furisode Girl Katherine.png'});

const AnistarKalosRoamerNPC = new RoamerNPC('Hex Maniac Melanie', [
    'The spirits tell me roaming Pokémon have been spotted on {ROUTE_NAME}!',
], GameConstants.Region.kalos, RoamingPokemonList.findGroup(GameConstants.Region.kalos, GameConstants.KalosSubRegions.Kalos), 'assets/images/trainers/Hex Maniac.png');

const KiloudeConfusedHiker = new NPC('Confused Hiker', [
    'Whoa! What the- Where am I? How did I get here? Last thing I can remember I was in Reflection Cave when this little Pokémon with hoops threw something at me… Oh you’ve beaten the Pokémon League? Maybe you can find it roaming around the region so you can tame that little prankster. Now how am I gonna get home…',
], {image: 'assets/images/trainers/Hiker.png'});

const ProfSycamore = new ProfNPC('Prof. Sycamore',
    GameConstants.Region.kalos,
    'You\'re encountering Pokémon at a really good clip, aren\'t you? Congratulations! You completed the Pokédex!',
    'Onward to Alola, shall we?', 'assets/images/temporaryBattle/Sycamore.png');

const MysteryFan = new NPC('Mystery Fan', [
    'I\'ve heard a Pokémon detective is sniffing around here for mysteries! He might be interested in an enigmatic berry, too.',
]);

const Spelunker = new NPC('Spelunker', [
    'I\'ve heard that a hidden realm lies beneath this cave, ruled by a Pokémon Princess. She might come out for a powerful and helpful trainer.',
    'That would be big news, sure to be reported on local bulletin boards!',
]);

const ExamineAegislash = new NPC('Examine Your Doublade', [
    '<i>Your Doublade evolves and shifts into an aggressive stance, revealing its Blade Forme.</i>',
], {
    image: 'assets/images/pokemon/681.1.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Princess Diancie', 4), new QuestLineStepCompletedRequirement('Princess Diancie', 5, GameConstants.AchievementOption.less)]),
});

const ThanksDiancie = new NPC('Princess Diancie', [
    'Thank you for your help saving the Diamond Domain. I will be waiting for you in Reflection Cave.',
], {
    image: 'assets/images/pokemon/719.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Princess Diancie', 6), new QuestLineStepCompletedRequirement('Princess Diancie', 8, GameConstants.AchievementOption.less)]),
});

//Kalos Towns

TownList['Vaniville Town'] = new Town(
    'Vaniville Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new BulletinBoard(GameConstants.BulletinBoards.Kalos)],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
        npcs: [],
    }
);
TownList['Aquacorde Town'] = new Town(
    'Aquacorde Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Shauna 1'], AquacordeTownShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 1)],
    }
);
TownList['Santalune City'] = new Town(
    'Santalune City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [SantaluneCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)],
        npcs: [MysteryFan],
    }
);
TownList['Lumiose City'] = new Town(
    'Lumiose City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Sycamore 1'], TemporaryBattleList['Tierno 1'], DepartmentStoreShop, FriseurFurfrouShop, TemporaryBattleList.AZ, TemporaryBattleList.Merilyn],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)],
        npcs: [ProfSycamore, LumioseEngineer],
    }
);
TownList['Camphrier Town'] = new Town(
    'Camphrier Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Trevor & Tierno'], CamphrierTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Camphrier Town'])],
    {
        requirements: [new TemporaryBattleRequirement('Tierno 1')],
        npcs: [CamphrierFlabébéEnthusiast],
    }
);
TownList['Parfum Palace'] = new Town(
    'Parfum Palace',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new ShardTraderShop(GameConstants.ShardTraderLocations['Parfum Palace'], 'Furfrou Shard Trader'), new GemMasterShop('Furfrou Gem Trader')],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 6)],
    }
);
TownList['Ambrette Town'] = new Town(
    'Ambrette Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [AmbretteTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Ambrette Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 8)],
    }
);
TownList['Cyllage City'] = new Town(
    'Cyllage City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [CyllageCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cyllage City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glittering Cave'))],
    }
);
TownList['Geosenge Town'] = new Town(
    'Geosenge Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [GeosengeTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Geosenge Town']), new MoveToDungeon(dungeonList['Team Flare Secret HQ'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 10)],
    }
);
TownList['Shalour City'] = new Town(
    'Shalour City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [ShalourCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Shalour City']), TemporaryBattleList.Korrina, TemporaryBattleList.Riot, TemporaryBattleList['Millis and Argus Steel']],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reflection Cave'))],
        npcs: [SharlourKorrina, ExamineAegislash, ThanksDiancie],
    }
);
TownList['Coumarine City'] = new Town(
    'Coumarine City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [CoumarineCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Coumarine City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)],
        npcs: [CoumarineBirdwatcher],
    }
);
TownList['Laverre City'] = new Town(
    'Laverre City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [LaverreCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Laverre City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 14)],
        npcs: [LaverreFurisodeGirlKatherine],
    }
);
TownList['Dendemille Town'] = new Town(
    'Dendemille Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [DendemilleTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Dendemille Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)],
    }
);
TownList['Anistar City'] = new Town(
    'Anistar City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [AnistarCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Anistar City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)],
        npcs: [AnistarKalosRoamerNPC],
    }
);
TownList['Couriway Town'] = new Town(
    'Couriway Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Sycamore 2'], TemporaryBattleList['Shauna 2'], TemporaryBattleList['Tierno 2'], TemporaryBattleList.Trevor, CouriwayTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Couriway Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)],
    }
);
TownList['Snowbelle City'] = new Town(
    'Snowbelle City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [SnowbelleCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Snowbelle City'])],
    {
        requirements: [new TemporaryBattleRequirement('Trevor')],
    }
);
TownList['Kiloude City'] = new Town(
    'Kiloude City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Calem 6']],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [KiloudeConfusedHiker],
    }
);
TownList['Pokémon League Kalos'] = new Town(
    'Pokémon League Kalos',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [GymList['Elite Malva'], GymList['Elite Siebold'], GymList['Elite Wikstrom'], GymList['Elite Drasna'], GymList['Champion Diantha'], pokeLeagueShop()],
    {
        requirements: [
            new TemporaryBattleRequirement('Calem 5'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Kalos')),
        ],
    }
);

//Kalos Dungeons
TownList['Santalune Forest'] = new DungeonTown(
    'Santalune Forest',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 2)]
);
TownList['Connecting Cave'] = new DungeonTown(
    'Connecting Cave',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new TemporaryBattleRequirement('Trevor & Tierno')]
);
TownList['Glittering Cave'] = new DungeonTown(
    'Glittering Cave',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 9)]
);
TownList['Reflection Cave'] = new DungeonTown(
    'Reflection Cave',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 11)],
    [],
    {
        npcs: [Spelunker],
    }
);
//Tower of Mastery?
TownList['Sea Spirit\'s Den'] = new DungeonTown(
    'Sea Spirit\'s Den',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 23)]
);
TownList['Poké Ball Factory'] = new DungeonTown(
    'Poké Ball Factory',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new GymBadgeRequirement(BadgeEnums.Fairy)]
);
TownList['Kalos Power Plant'] = new DungeonTown(
    'Kalos Power Plant',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 13), new GymBadgeRequirement(BadgeEnums.Plant)]
);
TownList['Lost Hotel'] = new DungeonTown(
    'Lost Hotel',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
);
TownList['Frost Cavern'] = new DungeonTown(
    'Frost Cavern',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
);
TownList['Team Flare Secret HQ'] = new DungeonTown(
    'Team Flare Secret HQ',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new GymBadgeRequirement(BadgeEnums.Psychic)]
);
TownList['Terminus Cave'] = new DungeonTown(
    'Terminus Cave',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
);
TownList['Pokémon Village'] = new DungeonTown(
    'Pokémon Village',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 20)]
);
TownList['Victory Road Kalos'] = new DungeonTown(
    'Victory Road Kalos',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
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
const RoadsideMotelShop = new Shop([
    ItemList.Beastball,
], 'Looker’s Exchange', [new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 1),
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
const ATreeMaybeShop = new Shop([
    ItemList.Power_Bracer,
    ItemList.Key_stone,
]);

// Magikarp Jump Shops
const MagikarpJumpGemTrade = new GemMasterShop('Trade', [new GymBadgeRequirement(BadgeEnums.Heal_League)]);
const MagikarpJumpShadySalesMan = new Shop([
    ItemList['Magikarp Blue Raindrops'],
    ItemList['Magikarp Saucy Violet'],
], 'Shady Sales Man', [new GymBadgeRequirement(BadgeEnums.Master_League)]);


//Alola NPCs

const IkiOutskirtsMom = new NPC('Scratch Cat Girl', [
    'I love cats very much, but dogs aren\'t so bad either.',
    'Out of all the dog-like Pokémon, I think Rockruff is definitely the most adorable. And it even has three evolutions! One during the day, one at night and one in between, from 5 to 6 o\'clock.',
    'What\'s that? AM or PM?',
    'Yes.',
], {image: 'assets/images/npcs/Scratch Cat Girl.png'});
const TrainerSchoolTeacher = new NPC('Teacher Emily', [
    'Just as Alola has multiple islands, its dungeons have multiple floors! Hurry to the ladder to find your way to the next floor.',
    'Watch the clock, if you make it to the next floor you\'ll get a time boost to help you find the boss.',
    'Good luck with your island challenge!',
], {image: 'assets/images/npcs/Teacher-gen7.png'});
const IkiKahuna = new NPC('Kahuna Hala', [
    'Welcome to Alola!',
    'Here we don\'t have gyms. We have the Island Challenge. On each of our four islands you will complete one or more trials.',
    'After completing all of an island\'s trials, you will battle that island\'s Kahuna in a Grand trial.',
    'This island only has one trial: Captain Ilima\'s trial in Verdant Cavern, below the Melemele Woods. Come back here after clearing that challenge for your Grand trial battle.',
], {image: 'assets/images/gymLeaders/Hala.png'});
const HeaheaCafeOwner = new NPC('Café Owner', [
    'Akala Island has three trials.',
    'Captain Lana\'s trial in Brooklet Hill, Captain Kiawe\'s trial in Wela Volcano Park and Captain Mallow\'s trial in Lush Jungle.',
    'For what it\'s worth, I say don\'t go to any of those places. Too wet, too hot and too... jungly. Why not stay here? Have a coffee! Enjoy the city!',
    'Or go to Konikoni City down south. You might even meet our Kahuna there!',
], {image: 'assets/images/npcs/Owner.png'});
const PaniolaTownActor = new NPC('Actor Meredith', [
    'I love Oricorio. I can tell you all about it!',
    'Each of the four islands in Alola has its own meadow, and each meadow has its own form of Oricorio. Each island, except for Akala Island. So you\'d think there\'s only three forms of Oricorio, right?',
    'Wrong! There is a fourth! Did you know you can find all of the Oricorio forms on the farm? One of them doesn\'t appear anywhere else!',
    'Each Oricorio form is attracted to the berry color that matches its own style. Red for Baile style, yellow for Pom-Pom style, pink for Pa\'u style and purple for Sensu style.',
    'You want to know which one can only be found on the farm? I\'m sure you can figure that out yourself. Simple process of elimination, really.',
], {image: 'assets/images/trainers/Actor.png'});
const RoyalAvenueSpectator = new NPC('Spectator', [
    'I think battles in the Battle Royal Dome are more like games of chance. But Battle Royals are nothing compared to trying to evolve an Alolan Raichu with a Thunderstone.',
    'Evolving Pikachu or Exeggcute in Alola can result in a new form! Sometimes.',
], {image: 'assets/images/trainers/Preschooler (female).png'});
const KonikoniKahuna = new NPC('Kahuna Olivia', [
    'What do you mean Grand trials are just like gym battles? It\'s a totally different thing!',
    'Come fight me in our very special and unique brand new Pokémon League and see if you still think our Island Challenge is nothing special!',
], {image: 'assets/images/gymLeaders/Olivia.png'});
const MalieKahuna = new NPC('Kahuna Nanu', [
    'A trial-goer, huh? Figures.',
    'Just go clear Captain Sophocles\' trial at the Hokulani Observatory and Captain Acerola\'s Trial at the Thrifty Megamart. And take care of those Team Skull punks in Po Town while you\'re at it.',
    'Then come back here so we can get this Grand trial over with.',
], {image: 'assets/images/gymLeaders/Nanu.png'});
const TapuWorker = new NPC('Worker Ovid', [
    'Yesterday was my first day working on Mount Lanakila. I was up there maintaining the paths to the new Pokémon League.',
    'My trusty Crabrawler was with me. He was smashing some rocks that were blocking the path, having a grand ol\' time like usual, when suddenly we were attacked by a wild Pokémon!',
    'After the battle, Crabrawler evolved! I didn\'t even know he could do that. He\'s so different now. But I still love him. He\'s my best friend, and he\'s even better at rock smashing now!',
], {image: 'assets/images/trainers/Worker (male).png'});
const SeafolkCaptain = new NPC('Captain Mina', [
    'My trial is in this town. Right there, inside my very own houseboat. However, I want you to clear the trial in Vast Poni Canyon first. It has no Captain, so you\'ll be all on your own. Be careful.',
    'If you can clear my trial you\'ll find our Kahuna on Exeggutor Island.',
], {image: 'assets/images/gymLeaders/Mina.png'});

const LanakilaColress = new NPC('Colress', [
    'It\'s been a while. You must be a formidable Trainer indeed if you are able to get Necrozma as one of your allies.',
    'Good! And this is from me! The Ultra Recon Squad asked me to develop a device that would be able to control Necrozma. But I improved it to my own liking! And now it is a device that makes it possible to draw out even more power from Necrozma!',
    '<img src="assets/images/npcs/textbody/N-Solarizer.png">',
    'Yes, in short, it makes it possible for Necrozma to fuse with the light of the Legendary Pokémon Solgaleo! This is the Colress Machine No. 1198, officially dubbed the N-Solarizer!',
    '<img src="assets/images/npcs/textbody/N-Lunarizer.png">',
    'In addition, this is the Colress Machine No. 1199, officially dubbed the N-Lunarizer! It makes it possible for Necrozma to fuse with the light of the Legendary Pokémon, Lunala!',
    'If you wish to make use of them, you will require light from Solgaleo and Lunala respectively. I believe that they may drop the crystallised form of this light if you defeat them in battle! I believe each of them will be able to make good use of their own light, as well.',
    'I believe Necrozma may drop a crystal of its own light, as well. Although I doubt it can make any use of it in its current state. Perhaps if it was already fused with the light of Solgaleo or Lunala....',
    'At any rate, I believe that a Trainer like you will be able to use both Alola\'s Legendary Pokémon and the fearsome power of Necrozma properly! I happen to know quite a bit about Pokémon fusion myself... But that is a different tale. Good luck in your battles!',
], {
    image: 'assets/images/trainers/Team Plasma (colress).png',
    requirement: new ObtainedPokemonRequirement('Necrozma'),
});

const AetherParadiseAlolaRoamerNPC = new RoamerNPC('Assistant Branch Chief Wicke', [
    'Some very rare Pokémon have been sighted on {ROUTE_NAME}. I hope we can learn more about them.',
], GameConstants.Region.alola, RoamingPokemonList.findGroup(GameConstants.Region.alola, GameConstants.AlolaSubRegions.AkalaIsland), 'assets/images/npcs/Assistant Branch Chief Wicke.png');

const ProfKukui = new ProfNPC('Prof. Kukui',
    GameConstants.Region.alola,
    'This is truly an astounding feat! Congratulations on completing the Pokédex!',
    'With that, you can stamp your ticket to the noble Galar region!',
    'assets/images/npcs/Professor Kukui.png');

const RoadsideMotelLooker1 = new NPC('Looker', [
    'I\'m very grateful that you accepted my invitation. My name is Looker. This here is my boss, Chief Anabel, head of the UB Taskforce.',
    'Ever since the incident at Aether Paradise, where you encountered UB-01 Symbiont, also known as Nihilego, we have heard reports of other Symbiont appearing in Alola. And other types of UBs too.',
    'They came here from a different world. Dropped rudely into our world against their will. We know nothing about them. They could be dangerous. They are almost certainly extremely wary and combative.',
    'We must find a way to calm their nerves. To make them feel at home in our world. Or we must destroy them. Either way, we must understand them. We must catch them.',
    'That is where you come in. The Champion of Alola. We do not have the battle power, but hopefully you do. Please allow Anabel to test your battle ability to ensure that you can handle this job.',
], {
    image: 'assets/images/npcs/Looker.png',
    requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 1, GameConstants.AchievementOption.less),
});
const RoadsideMotelAnabel1 = new NPC('Anabel', [
    'The testing is complete. I see no problem at all with your skills. Rather I would have to praise you for them. Welcome to the team!',
    'There is no more time to waste. UB-01 Symbiont, Nihilego, has been spotted on Akala Island! I will protect the nearby population centers, you must go and confront the Beast!',
    'Looker will stay here to coordinate reinforcements if needed. You can ask him about the special Beast Balls you will be using on this mission. I have given you a couple of them, but they are expensive so you will have to pitch in if you need more.',
], {
    image: 'assets/images/temporaryBattle/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 1, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 4, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelLooker2 = new NPC('Looker', [
    'Catching lots of Ultra Beasts? Oh you want to know more about Beast Balls!',
    'Beast Balls can only be used to catch Ultra Beasts. You can\'t even try to use them against normal Pokémon, and any other Poké Ball type won\'t work against Ultra Beasts.',
    'If you\'re looking to most effectively hunt the Ultra Beasts down, try putting Beast Balls in your "Already Caught" selector. Beast Balls will never be thrown at Pokémon that aren\'t Ultra Beasts.',
], {
    image: 'assets/images/npcs/Looker.png',
    requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 2),
});
const RoadsideMotelAnabel2 = new NPC('Anabel', [
    'Congratulations on a job well done. I\'ve had contact with our colleagues at HQ. They have agreed to let you keep the UBs you catch.',
    'I\'m sure the UBs will truly flourish in the company of a competent trainer like yourself. It\'ll be much better for them than being locked up in some stuffy lab. Just be sure to let us know how they are doing.',
    'Now, enough chit-chat. UB-02 Absorption and UB-02 Beauty, Buzzwole and Pheromosa, have been sighted on Melemele Island. You know what to do!',
], {
    image: 'assets/images/temporaryBattle/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 4, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 6, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelAnabel3 = new NPC('Anabel', [
    'Congratulations once again. Looker told me he wants to take us to a great restaurant to celebrate. I don\'t know how he knows any restaurants around here, we\'ve only just arrived.',
    'It doesn\'t matter though. There is no rest for us. Captain Mina is here with news, but she insist on battling you before she\'ll tell us anything.',
], {
    image: 'assets/images/temporaryBattle/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 6, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 8, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelMina = new NPC('Captain Mina', [
    'Still in tip top shape I see. Good. That means you\'re strong enough to take out this monster I heard about on Akala Island.',
    'According to your little list here its... uhm... this one! UB-03 Lighting. Xurkitree. These are some strange names you guys come up with.',
    'Good luck out there!',
], {
    image: 'assets/images/gymLeaders/Mina.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 8, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 10, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelNanu1 = new NPC('Kahuna Nanu', [
    '...',
    'I let myself in. Hope you don\'t mind.',
    'I\'m here to tell you about sightings of monsters on Ula\'ula Island. I missed some big Kahuna meeting we were all supposed to go to, so I got stuck as the messenger.',
    'It\'s not like I\'ve seen them or anything. Your friend Looker knew them from the description though. UB-04 Blade and UB-04 Blaster he called them. Kartana and Celesteela.',
    '...',
], {
    image: 'assets/images/gymLeaders/Nanu.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 10, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 12, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelNanu2 = new NPC('Kahuna Nanu', [
    '...',
    'Good job on rounding up those creatures kid.',
    'Now, how about one more battle? I insist.',
], {
    image: 'assets/images/gymLeaders/Nanu.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 12, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 14, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelAnabel4 = new NPC('Anabel', [
    'This is tiring work, but I have a feeling that we\'re almost done.',
    'Looker\'s informants told us about monster sightings on Poni Island. It seems UB Assembly and UB Burst, Stakataka and Blacephalon, have taken up residence.',
    'Please be careful.',
], {
    image: 'assets/images/temporaryBattle/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 14, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 16, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelAnabel5 = new NPC('Anabel', [
    'And so here we are. At the end. And back at the beginning.',
    'Our final target is UB-05 Glutton. Guzzlord. It is very dangerous. You must not underestimate this beast.',
    'Ten years ago, a very similar incident occured. Looker and his team were assigned to fight Guzzlord. Nanu was there too. They lost. Looker lost a colleague that day.',
    'After the battle they found something. A strange young girl, alone in the wilderness of Poni Island. They found me. It seems I came from another world as well. Not their world though. These creatures are strange to me too.',
    'I have made myself at home here. I hope Glutton can do the same. Please catch this Guzzlord. End this once and for all.',
], {
    image: 'assets/images/temporaryBattle/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 16, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 18, GameConstants.AchievementOption.less)]),
});
const BattleTreeRed = new NPC('Red', [
    '...',
], {image: 'assets/images/npcs/Red-masters.png'});
const BattleTreeBlue = new NPC('Blue', [
    'Hello there champ! Fancy seeing you here.',
    'We just planted this sapling here. Maybe it will grow into something great some day.',
], {image: 'assets/images/npcs/Blue-masters.png'});

// Magikarp Jump NPCs
const MayorKarp = new NPC('Mayor Karp', [
    'Welcome to the region of Magikarp!',
    'This is a magical place where everybody loves Magikarp!',
    'You\'re good at raising Pokémon, right? We called you here to compete in the ten leagues around the island and pick up our poor Magikarp\'s spirits!',
    'Around these parts, folks love to compete to see whose Magikarp can splash harder and jump higher! No other Pokémon are allowed to compete in these events. So, do your best to raise up some fine Magikarp!',
    'Our island is a special place, home to Magikarp patterns that aren\'t found anywhere else in the world! Collect and raise them all to increase your jump power and take on our league champion!',
], {image: 'assets/images/npcs/MayorKarp.png'});

const MagikarpJumpRoamerNPC = new RoamerNPC('Roddy Tackle', [
    'There are some singularly stunning individuals down at {ROUTE_NAME}! Some Magikarp with real personality!',
], GameConstants.Region.alola, RoamingPokemonList.findGroup(GameConstants.Region.alola, GameConstants.AlolaSubRegions.MagikarpJump), 'assets/images/npcs/Roddy Tackle.png');


//Alola Towns

TownList['Iki Town Outskirts'] = new Town(
    'Iki Town Outskirts',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [IkiOutskirtsMom],
    }
);
TownList['Iki Town'] = new Town(
    'Iki Town',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [IkiTownShop],
    {
        requirements: [new TemporaryBattleRequirement('Hau 1')],
        npcs: [IkiKahuna],
    }
);
TownList['Professor Kukui\'s Lab'] = new Town(
    'Professor Kukui\'s Lab',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new BulletinBoard(GameConstants.BulletinBoards.Alola)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 18)],
        npcs: [ProfKukui],
    }
);
TownList['Hau\'oli City'] = new Town(
    'Hau\'oli City',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [HauoliCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Hau\'oli City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Trainers\' School'))],
    }
);
TownList['Melemele Woods'] = new Town(
    'Melemele Woods',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new MoveToDungeon(dungeonList['Verdant Cavern']), new MoveToDungeon(dungeonList['Melemele Meadow']), new MoveToDungeon(dungeonList['Ruins of Conflict'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 2)],
    }
);
TownList['Roadside Motel'] = new Town(
    'Roadside Motel',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [TemporaryBattleList.Anabel, TemporaryBattleList['Captain Mina UB'], TemporaryBattleList['Kahuna Nanu UB'], RoadsideMotelShop],
    {
        requirements: [new QuestLineStartedRequirement('Ultra Beast Hunt')],
        npcs: [RoadsideMotelLooker1, RoadsideMotelAnabel1, RoadsideMotelLooker2, RoadsideMotelAnabel2, RoadsideMotelAnabel3, RoadsideMotelMina, RoadsideMotelNanu1, RoadsideMotelNanu2, RoadsideMotelAnabel4, RoadsideMotelAnabel5],
    }
);
TownList['Heahea City'] = new Town(
    'Heahea City',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [TemporaryBattleList.Dexio, TemporaryBattleList.Sina, HeaheaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Heahea City']), new DockTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
        npcs: [HeaheaCafeOwner],
    }
);
TownList['Paniola Town'] = new Town(
    'Paniola Town',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [PaniolaTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Paniola Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 4)],
        npcs: [PaniolaTownActor],
    }
);
TownList['Royal Avenue'] = new Town(
    'Royal Avenue',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [TemporaryBattleList['Battle Royal'], DepartmentStoreShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
        npcs: [RoyalAvenueSpectator],
    }
);
TownList['Konikoni City'] = new Town(
    'Konikoni City',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [KonikoniCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Konikoni City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
        npcs: [KonikoniKahuna],
    }
);
TownList['Aether Paradise'] = new Town(
    'Aether Paradise',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [
        TemporaryBattleList['Ultra Wormhole'],
        AetherParadiseShop,
        new ShardTraderShop(GameConstants.ShardTraderLocations['Aether Paradise']),
        new MoveToDungeon(dungeonList['Aether Foundation']),
    ],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
        npcs: [AetherParadiseAlolaRoamerNPC],
    }
);
TownList['Malie City'] = new Town(
    'Malie City',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [MalieCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Malie City']), new MoveToDungeon(dungeonList['Malie Garden']), new DockTownContent()],
    {
        requirements: [new TemporaryBattleRequirement('Ultra Wormhole')],
        npcs: [MalieKahuna],
    }
);
TownList['Tapu Village'] = new Town(
    'Tapu Village',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [TapuVillageShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Tapu Village']), TemporaryBattleList['Kahuna Nanu']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 13)],
        npcs: [TapuWorker],
    }
);
TownList['Seafolk Village'] = new Town(
    'Seafolk Village',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [SeafolkVillageShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Seafolk Village']), new MoveToDungeon(dungeonList['Mina\'s Houseboat']), new DockTownContent(), TemporaryBattleList['Captain Mina']],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation'))],
        npcs: [SeafolkCaptain],
    }
);
TownList['Exeggutor Island'] = new Town(
    'Exeggutor Island',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [ExeggutorIslandShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Exeggutor Island']), new MoveToDungeon(dungeonList['Exeggutor Island Hill'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    }
);
TownList['Altar of the Sunne and Moone'] = new Town(
    'Altar of the Sunne and Moone',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [TemporaryBattleList.Necrozma, TemporaryBattleList['Ultra Megalopolis'], AltaroftheSunneandMooneShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Altar of the Sunne and Moone'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))],
    }
);
TownList['Pokémon League Alola'] = new Town(
    'Pokémon League Alola',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [GymList['Elite Molayne'], GymList['Elite Olivia'], GymList['Elite Acerola'], GymList['Elite Kahili'], GymList['Champion Hau'], pokeLeagueShop()],
    {
        requirements:[
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mount Lanakila')),
        ],
    }
);
TownList['A Tree Maybe'] = new Town(
    'A Tree Maybe',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [ATreeMaybeShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 30)],
        npcs: [BattleTreeRed, BattleTreeBlue],
    }
);

// Magikarp Jump Towns
TownList['Hoppy Town'] = new Town(
    'Hoppy Town',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [new DockTownContent(), MagikarpJumpGemTrade],
    {
        requirements: [new QuestLineStartedRequirement('Magikarp Jump')],
        npcs: [MayorKarp, MagikarpJumpRoamerNPC],
    }
);
TownList['Friend League'] = new Town(
    'Friend League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 31)],
    }
);
TownList['Quick League'] = new Town(
    'Quick League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Koylee']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 32)],
    }
);
TownList['Heavy League'] = new Town(
    'Heavy League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Karpella'], TemporaryBattleList['Magikarp Jump Karpen']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 33)],
    }
);
TownList['Great League'] = new Town(
    'Great League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Tykarp'], TemporaryBattleList['Magikarp Jump Karpress']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 34)],
    }
);
TownList['Fast League'] = new Town(
    'Fast League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Karami'], TemporaryBattleList['Magikarp Jump Karson']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 35)],
    }
);
TownList['Luxury League'] = new Town(
    'Luxury League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Karpress 2'],TemporaryBattleList['Magikarp Jump Karpen 2'],TemporaryBattleList['Magikarp Jump Karbuck']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 36)],
    }
);
TownList['Heal League'] = new Town(
    'Heal League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Skyhopper'],TemporaryBattleList['Magikarp Jump Karpen 3'],TemporaryBattleList['Magikarp Jump Karpella 2']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 37)],
    }
);
TownList['Ultra League'] = new Town(
    'Ultra League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Karbuck 2'],TemporaryBattleList['Magikarp Jump Kareign'],TemporaryBattleList['Magikarp Jump Koylee 2']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 38)],
    }
);
TownList['Elite Four League'] = new Town(
    'Elite Four League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [GymList['E4 League'], TemporaryBattleList['Magikarp Jump Karpress 3'],TemporaryBattleList['Magikarp Jump Karpen 4'],TemporaryBattleList['Magikarp Jump Karpella 3']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 39)],
    }
);
TownList['Master League'] = new Town(
    'Master League',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [TemporaryBattleList['Magikarp Jump Skyhopper 2'],TemporaryBattleList['Magikarp Jump Tykarp 2']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 40)],
    }
);
TownList['Magikarp\'s Eye'] = new Town(
    'Magikarp\'s Eye',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [MagikarpJumpShadySalesMan],
    {
        requirements: [new DevelopmentRequirement()], //TODO: Should unlock as the subregion unlocks
    }
);


//Alola Dungeons
TownList['Trainers\' School'] = new DungeonTown(
    'Trainers\' School',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 18)],
    undefined,
    { npcs: [TrainerSchoolTeacher] }
);
TownList['Hau\'oli Cemetery'] = new DungeonTown(
    'Hau\'oli Cemetery',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)],
    [TemporaryBattleList['Captain Ilima']]
);
TownList['Verdant Cavern'] = new DungeonTown(
    'Verdant Cavern',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 2)]
);
TownList['Melemele Meadow'] = new DungeonTown(
    'Melemele Meadow',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 3)]
);
TownList['Seaward Cave'] = new DungeonTown(
    'Seaward Cave',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
TownList['Ten Carat Hill'] = new DungeonTown(
    'Ten Carat Hill',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)]
);
TownList['Pikachu Valley'] = new DungeonTown(
    'Pikachu Valley',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)]
);
TownList['Paniola Ranch'] = new DungeonTown(
    'Paniola Ranch',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new TemporaryBattleRequirement('Hau 4')]
);
TownList['Brooklet Hill'] = new DungeonTown(
    'Brooklet Hill',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new TemporaryBattleRequirement('Gladion 1')]
);
TownList['Wela Volcano Park'] = new DungeonTown(
    'Wela Volcano Park',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 7)],
    [TemporaryBattleList['Captain Kiawe']]
);
TownList['Lush Jungle'] = new DungeonTown(
    'Lush Jungle',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 8)],
    [TemporaryBattleList['Captain Mallow'], TemporaryBattleList['Captain Lana']]
);
TownList['Diglett\'s Tunnel'] = new DungeonTown(
    'Diglett\'s Tunnel',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lush Jungle'))]
);
TownList['Memorial Hill'] = new DungeonTown(
    'Memorial Hill',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 9)]
);
TownList['Malie Garden'] = new DungeonTown(
    'Malie Garden',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new TemporaryBattleRequirement('Hau 5')]
);
TownList['Hokulani Observatory'] = new DungeonTown(
    'Hokulani Observatory',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 22)],
    [TemporaryBattleList['Captain Sophocles']]
);
TownList['Thrifty Megamart'] = new DungeonTown(
    'Thrifty Megamart',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 14)]
);
TownList['Ula\'ula Meadow'] = new DungeonTown(
    'Ula\'ula Meadow',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 16)]
);
TownList['Po Town'] = new DungeonTown(
    'Po Town',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 17)]
);
TownList['Aether Foundation'] = new DungeonTown(
    'Aether Foundation',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)],
    [
        TemporaryBattleList['Aether Branch Chief Faba'],
        TemporaryBattleList['Team Aqua Leader Archie'],
        TemporaryBattleList['Team Magma Leader Maxie'],
        TemporaryBattleList['Team Galactic Leader Cyrus'],
        TemporaryBattleList['Team Flare Leader Lysandre'],
        TemporaryBattleList['Team Plasma Leader Ghetsis'],
        TemporaryBattleList['Team Rainbow Leader Giovanni'],
    ]
);
TownList['Exeggutor Island Hill'] = new DungeonTown(
    'Exeggutor Island Hill',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)]
);
TownList['Vast Poni Canyon'] = new DungeonTown(
    'Vast Poni Canyon',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Exeggutor Island Hill'))]
);
TownList['Mina\'s Houseboat'] = new DungeonTown(
    'Mina\'s Houseboat',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [new TemporaryBattleRequirement('Kahuna Nanu')]
);
TownList['Mount Lanakila'] = new DungeonTown(
    'Mount Lanakila',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new TemporaryBattleRequirement('Gladion 3')],
    [],
    {
        npcs: [LanakilaColress],
    }
);
TownList['Lake of the Sunne and Moone'] = new DungeonTown(
    'Lake of the Sunne and Moone',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Ruins of Conflict'] = new DungeonTown(
    'Ruins of Conflict',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MelemeleIsland,
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TownList['Ruins of Life'] = new DungeonTown(
    'Ruins of Life',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 21),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Ruins of Abundance'] = new DungeonTown(
    'Ruins of Abundance',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 23),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Ruins of Hope'] = new DungeonTown(
    'Ruins of Hope',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 26),
        new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion),
    ]
);
TownList['Poni Meadow'] = new DungeonTown(
    'Poni Meadow',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 28)]
);
TownList['Resolution Cave'] = new DungeonTown(
    'Resolution Cave',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [
        new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 17),
    ]
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
const StowonSideShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Fighting_egg,
    ItemList.Soothe_bell,
    ItemList.Dawn_stone,
    ItemList.Dubious_disc,
    ItemList.Reaper_cloth,
]);
const GlimwoodTangleShop = new Shop([
    ItemList['Zarude (Dada)'],
], 'Zarude Village', [new QuestLineCompletedRequirement('Secrets of the Jungle')]);
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


//Galar NPCs

const PostwickMum = new NPC('Mum', [
    'Don’t go too far into the Slumbering Weald.',
    'I’ve heard there are some very strong Pokémon in there.',
    'Only those who beat the champion are strong enough to face them!',
]);

const WedgehurstRailStaff = new NPC('Rail Staff', [
    'There are some areas around Galar that you can only reach after beating the Champion.',
    'One is an island paradise, the other a freezing wasteland.',
    'I’m sure if you go to these places you’ll find many unique and powerful Pokémon!',
], {image: 'assets/images/trainers/Rail Staff.png'});

const AssistantHenry = new NPC('Assistant Henry', [
    'There are many Pokémon in Galar that I heard look completely different in other regions of the world! They can also evolve in unique ways!',
    'I know that reckless one, Linoone, will only evolve during the night time here. But, I also think I’ve seen its evolution wandering across the lake if you have a way to cross.',
]);

const BattleCafeMaster = new NPC('Battle Café Master', [
    'Milcery can evolve when you spin around with it, while treating it to a Sweet.',
    'For example, you can whip up a Vanilla Alcremie, by spinning clockwise for less than 5 seconds, during the day. Piece of cake! There’s a unique form for each Sweet under this circumstance, so bake it till you make it!',
    'There are more tiers to Alcremie than I can count. Mix up the direction, duration, time of day, and the given Sweet to discover all the flavours there are to find.',
    'I will suggest that you only do 3 spins a day if you don’t want to end up sick! You might be able to try more, when you get more experienced with a flavour...',
    'Stop by the Battle Café, we sell all the Sweets you’ll need!',
], {image: 'assets/images/npcs/BattleCafeMaster.png'});

const MotostokeArtist = new NPC('Artist Duncan', [
    'My Kantonian Farfetch’d would never evolve no matter how many fresh Leeks I gave it.',
    'Lo and behold, here in Galar the Farfetch’d wield thick, tough leeks for battle!',
    'Once my Galarian Farfetch’d was holding a Leek.. Blimey, I was surprised how quickly he transformed into a noble ally! With the Leek growing into a mighty stalk for battle!',
], {image: 'assets/images/npcs/Artist (Gen 8).png'});

const TurffieldCook = new NPC('Cook Stuart', [
    'I love Sweet and Tart Apples! Oh, this is Applin! He isn’t a snack, but helps me make all sorts of dishes!',
    'Applin absolutely loves Sweet and Tart treats.',
    'But, I could never give Applin a Sweet or Tart Apple, that just seems so... wrong...',
    'I can’t be missing out on much anyways, what could be more perfect than my Applin!',
], { image: 'assets/images/trainers/Cook.png' });

const Meteorologist = new NPC('Meteorologist', [
    'The Pokémon in the Wild Area are very finicky, and many of them only appear in certain weathers.',
    'I\'ve also heard that the Pokémon in the Isle of Armor to the East, and the Crown Tundra to the South, are also like this.',
    'There are even some Pokémon, namely Cramorant and Eiscue, that only appear in certain forms depending on weather.',
]);

const HammerlockeHiker = new NPC('Hiker Donald', [
    'Have you spotted a blue bird walking around with an Arrokuda in its throat? It’s quite a daft Pokémon, but it sure is hungry! I guess if it trains near water it tries to swallow Arrokudas, but they always get stuck in its throat.',
    'My mate told me a story of a Pikachu getting lodged in the gluttonous bird’s gullet while it was gorging in a thunderstorm! But that sounds ridiculous! How would it not be bothered by the big rat in its throat? It would drive me mad.',
], {image: 'assets/images/npcs/Hiker (Gen 8).png'});

const AncientMural1 = new NPC('Ancient Mural', [
    '<i>It’s Stow-on-Side’s famous mural.</i>',
    '<i>It’s said to be a very deep work of art...</i>',
], {
    image: 'assets/images/npcs/other/Ancient Mural.png',
    requirement: new QuestLineStepCompletedRequirement('The Darkest Day', 1, GameConstants.AchievementOption.less),
});

const AncientMural2 = new NPC('Ancient Mural Ruins', [
    '<i>It’s the statues that were hidden behind Stow-on-Side’s famous mural.</i>',
    '<i>They depict two heroes and two Pokémon.</i>',
], {
    image: 'assets/images/npcs/other/Ancient Mural Ruins.png',
    requirement: new QuestLineStepCompletedRequirement('The Darkest Day', 1),
});

const StowonSideSonia = new NPC ('Sonia', [
    'Not a brilliant turn of events, but the ruins were brought into the light for us to see...',
    'What does this tell us about Galar’s legends? More than any hero, there’s those things that appear to be Pokémon that stand out!',
    'Not just that, but those Pokémon appear to be holding a sword and shield as if they were using them!',
    'More than any statue of a hero or old tapestry, these ruins made in truly ancient times must show us the real truth.',
    'Seems like at some point in history the sword and shield were combined with the two actual Pokémon and treated as the same thing...',
    'Two young heroes... The sword and shield were actually Pokémon... But why would the truth of these ruins be hidden when their stories were depicted in artwork?',
], {
    image: 'assets/images/npcs/Sonia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 1), new QuestLineStepCompletedRequirement('The Darkest Day', 3, GameConstants.AchievementOption.less)]),
});

const Archaeologist = new NPC('Archaeologist', [
    'I\'ve been studying the Galarian form of Yamask.',
    'It seems they do not evolve into Galarian Cofagrigus, but a completely different Pokémon instead.',
    'For some mysterious reason, they only evolve when trained in a specific area of the wild area known as the Dusty Bowl.',
], { image: 'assets/images/trainers/Ruin Maniac.png' });

const HerosBath = new NPC('Hero’s Bath', [
    '<i>The ancient Hero’s Bath.</i>',
    '<i>They say this is where the two heroes came to soothe their wounds after the battle to bring down that evil presence, long ago.</i>',
], {image: 'assets/images/npcs/other/HerosBath.png'});

const CirchesterHop = new NPC('Hop', [
    'Based on the statues the sword and shield must have actually been two Pokémon, right?',
    'You remember the Pokémon we met in the Slumbering Weald?',
    'Do you think...it could’ve been one of them? I mean the sword or the shield Pokémon?',
    'Perhaps when their duty was completed, they went into some kind of sleep?',
], {
    image: 'assets/images/gymLeaders/Hop.png',
    requirement: new MultiRequirement([new TemporaryBattleRequirement('Hop 7'), new QuestLineStepCompletedRequirement('The Darkest Day', 6, GameConstants.AchievementOption.less)]),
});

const CirchesterSonia = new NPC('Sonia', [
    'Hmm... Who exactly were the heroes that bathed here?',
    'Nowadays only Pokémon really use the Hero’s Bath...',
    'I think I’ll have to look more into the history of the Slumbering Weald.',
], {
    image: 'assets/images/npcs/Sonia.png',
    requirement: new MultiRequirement([new TemporaryBattleRequirement('Hop 7'), new QuestLineStepCompletedRequirement('The Darkest Day', 6, GameConstants.AchievementOption.less)]),
});

const CirchesterGuitarist = new NPC('Guitarist Justin', [
    'I caught this Snom on Steamdrift Way and we’ve become really good mates.',
    'I thought that friendship was all Snom needed to evolve, but I kept trying to give it a Soothe Bell during the day and nothing happened!',
    'I’m too busy playing gigs to scamper around with Snom in the evening!',
], {image: 'assets/images/npcs/Guitarist (male).png'});

const TeamYellGrunts = new NPC('Team Yell Grunts', [
    'Our Marnie’s Morpeko is so cute, don’tcha think?',
    'When it’s hungry, though, it gets so angry it changes forms.',
    'If you want to catch it in that form, you would probably be best trying to attract it with a berry that electric Pokémon like.',
], {image: 'assets/images/trainers/Team Yell Grunts.png'});

const RoseBroadcast = new NPC('Broadcast of Chairman Rose', [
    'Hello there, Leon! Just letting you know...',
    'I think it\'s time I brought about the Darkest Day. For the sake of Galar\'s future, of course!',
    'But I\'m in a bit of a pickle. The energy released by the Darkest Day is too much for us to contain.',
    'I\'m sorry it\'s come to this. But it\'s you who forced my hand, Leon. You refused to listen!',
], {
    image: 'assets/images/trainers/Macro Cosmos (rose).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 10), new QuestLineStepCompletedRequirement('The Darkest Day', 12, GameConstants.AchievementOption.less)]),
});

const WyndonHop = new NPC('Hop', [
    'That video stream... That was from Hammerlocke Stadium, right? What in the world did the chairman do...?',
    'I want to help my brother! I\'ve got to! But I can\'t even manage to beat you, so what sort of help could I ever be...?',
    'Hold the phone... The chairman was talking about the Darkest Day. That\'s the thing where the sky went all dark once, ages and ages ago, right? What does he mean, he\'s bringing that about? And where did we even hear that name...?',
    'Ah! That statue of the hero in Motostoke! Sonia said something back then, didn\'t she... Though it turned out to be wrong, since there were actually two heroes and all that.',
    'Still! Those two managed to bring an end to the Darkest Day with the sword and shield Pokémon! Sonia thought the Pokémon might still be sleeping somewhere though, right?',
    'That\'s it! I\'m sure it\'s got to be the Slumbering Weald! Those illusions you tried to fight off that day—they must\'ve been the Pokémon that are supposed to be sleeping there!',
    'Let\'s go back to the Slumbering Weald! If we\'re lucky, we\'ll find something that can help!',
], {
    image: 'assets/images/gymLeaders/Hop.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 11), new QuestLineStepCompletedRequirement('The Darkest Day', 13, GameConstants.AchievementOption.less)]),
});

const SlumberingHop1 = new NPC('Hop', [
    'Would you take a look at that! Now that\'s something you don\'t see every day... This place definitely feels like the stuff of legend. See that! The sword and the shield! The legends really were true!',
    'That settles it! We\'re taking the sword and shield. Though...wow, would you look at the state of these things? They seems like they might fall to pieces if you so much as look at \'em funny.',
    'I don\'t know if these rusty old things will really be able to stop the Darkest Day, but... Well, I guess it can\'t hurt to have them along! Let\'s hope they bring us some good luck!',
    'Maybe the Pokémon themselves really are still asleep somewhere. So it seems we\'re on our own if we want to go help Lee. This is all the help we\'ve got!',
], {
    image: 'assets/images/gymLeaders/Hop.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 13), new QuestLineStepCompletedRequirement('The Darkest Day', 15, GameConstants.AchievementOption.less)]),
});

const EnergyPlantRose = new NPC('Chairman Rose', [
    'Most impressive! I wouldn\'t expect any less from a challenger endorsed by the strongest Champion ever to grace our beloved Galar region!',
    'I really do wish I could have seen the Championship Match between you two. And I\'m terribly sorry to have ruined the whole Gym Challenge and everything!',
    'It\'s too bad, but it can\'t be helped... In order to solve the energy issue as soon as possible, we awakened Eternatus. But we couldn\'t control it. The Champion came to aid me, even at the cost of abandoning the match. Indeed, just like a knight in shining armor coming to rescue a princess from a dragon!',
    'I do tend to ramble on, I know. I love to make speeches. But I think I can stop talking now. I think the Champion should have captured Eternatus by now. If you\'re curious, you can take the lift up.',
    'And I trust you\'ll be going too, right, Hop? I certainly hope losing to me didn\'t discourage you too much. Go on now, both of you! Go see how our Champion is doing!',
], {
    image: 'assets/images/trainers/Macro Cosmos (rose).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 15), new QuestLineStepCompletedRequirement('The Darkest Day', 17, GameConstants.AchievementOption.less)]),
});

const Leon = new NPC('Leon', [
    'My matches are always sold out, but this... I\'ve never seen a crowd this wild!',
    'Everyone knows what you did for us this week... They know you\'re the one who caught Eternatus and saved the future of the Galar region.',
    'A real hero, who battled alongside the Legendary Pokémon, Zacian and Zamazenta... I couldn\'t have dreamed of a better challenger to help increase my winning streak!',
    'Oh... And you\'ve even added Eternatus to your party. The greatest challenger along with the most powerful Pokémon—is that it? Now you\'re really getting me excited!',
    'Now that I\'ve seen just what kind of strength you possess as the greatest of challengers...crushing you into the dirt will show everyone just how strong their Champion truly is!',
    'Come on, now! Let\'s make this a final match that\'ll go down in Galar\'s history! No! A match that\'ll change Galar forever!',
    'We\'re gonna have an absolutely champion time!',
], {
    image: 'assets/images/gymLeaders/Leon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 18), new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion, GameConstants.AchievementOption.less)]),
});

const SlumberingHop2 = new NPC('Hop', [
    'Huh? What\'re you doing here in the woods? Nobody ever comes in here, since this is the forest where Zacian and Zamazenta rested. It\'s the best place to do a bit of thinking, since it\'s so quiet and all.',
    'Oh, but I hadn\'t had the chance to tell you! Congrats on your victory! Honestly... I never thought you\'d manage to beat my brother. The greatest Champion Galar ever had! He was undefeatable till you came around! It\'s actually still pretty hard to believe...',
    'Really... You\'re amazing. So amazing, maybe, that I don\'t even realize just how amazing you really are!',
    'So, do you think... Would you be up for one more battle?',
], {
    image: 'assets/images/gymLeaders/Hop.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Sword and Shield'), new QuestLineStepCompletedRequirement('Sword and Shield', 1, GameConstants.AchievementOption.less)]),
});

const SordwardShielbert1 = new NPC('Sordward & Shielbert', [
    'Well, well, well... I thought I heard someone making some noise over this way!',
    'I am Sordward!',
    'I am Shielbert!',
    'We are the new kings of Galar! We\'re descendents of the first kings!',
    'More than that, we\'re celebrities!',
    'Well, well, well! Could these things here be the fabled sword and shield?',
    'Well, well, well! They certainly are dirty! They must be fake! I fear to touch them with my bare hands.',
    'Oh, you want us to return them? Then perhaps we should settle this with a battle?',
], {
    image: 'assets/images/temporaryBattle/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 1), new QuestLineStepCompletedRequirement('Sword and Shield', 3, GameConstants.AchievementOption.less)]),
});

const SordwardShielbert2 = new NPC('Sordward & Shielbert', [
    'We know all the Wishing Stars that Chairman Rose had gathered are here. We celebrities have an advanced level of insight into such things!',
    'You non-celebrities are not suited to having such valuable things. Hand them over to us.',
    'You wish to keep them from us? No matter. This time we\'ve brought much stronger Pokémon to thoroughly trounce you with!',
], {
    image: 'assets/images/temporaryBattle/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 6), new QuestLineStepCompletedRequirement('Sword and Shield', 8, GameConstants.AchievementOption.less)]),
});

const SordwardShielbert3 = new NPC('Sordward & Shielbert', [
    'Well, well, well? It seems you have rescued the stadiums from their perils. As expected of the Champion.',
    'You want to know why we have been forcing those Pokémon to rampage? We did it in order to expose the true nature of Zacian and Zamazenta!',
    'We have always been revered as the resplendent descendents of the real hero...',
    'It\'s all because you ruffians had to go and save Galar from Eternatus!',
    'You said that the real heroes were Pokémon! You just carelessly changed history!',
    'What does that mean we are? You dare say that our esteemed ancestors were liars?',
    'It\'s obvious that the old history was better! It was right!',
    'To suddenly start creating heroes left and right... It\'s complete rubbish!',
    'Ahem... If you want to take the lift up, you\'ll have to defeat us! This time we will show you the opulent Pokémon we have raised explicity for this battle!',
], {
    image: 'assets/images/temporaryBattle/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 13), new QuestLineStepCompletedRequirement('Sword and Shield', 15, GameConstants.AchievementOption.less)]),
});

const SordwardShielbert4 = new NPC('Sordward & Shielbert', [
    'Fwahaheho! We did it! Zacian and Zamazenta came, following after the Rusted Sword and Shield!',
    'Yes! Expose your true, barbaric, brutish nature...and reveal to us exactly who the false kings are!',
    'W-wait! D-don\'t attack us! Go into town, and sow as much destruction as you can!',
], {
    image: 'assets/images/temporaryBattle/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 15), new QuestLineStepCompletedRequirement('Sword and Shield', 17, GameConstants.AchievementOption.less)]),
});

const Piers = new NPC('Piers', [
    'As expected of the Champion... You took complete control of the situation.',
    'Plus it looks like those Pokémon are waiting for you, now they\'re calmed down an\' all.',
], {
    image: 'assets/images/gymLeaders/Piers.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 17), new QuestLineStepCompletedRequirement('Sword and Shield', 19, GameConstants.AchievementOption.less)]),
});

const EnergyPlantHop = new NPC('Hop', [
    'Huh? Oh, hi. I forgot to say, congrats on catching Zacian and Zamazenta!',
    'Y\'know, Zacian and Zamazenta got the Rusted Sword and the Rusted Shield back, right?',
    'But when you caught them, neither were using them. But they must still have them, right?',
    'So.... Maybe if you keep defeating them, they\'ll occasionally drop them?',
], {
    image: 'assets/images/gymLeaders/Hop.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('Sword and Shield')]),
});

const SouthGalarRoamerNPC = new RoamerNPC('Professor Sonia', [
    'I’ve heard there’s been sightings of a never-before-seen, super strong Pokémon on {ROUTE_NAME}! You should go check it out!',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.SouthGalar), 'assets/images/npcs/Professor Sonia.png');

//Isle of Armor NPCs
const IsleofArmorRoamerNPC = new RoamerNPC('Master Dojo Student', [
    'One of the other students said they saw a rare Pokémon on {ROUTE_NAME}. Might be worth having a look.',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.IsleofArmor), 'assets/images/trainers/Master Dojo.png');

const Mustard1 = new NPC ('Mustard', [
    '... ... ... Why hello there! My name is Mustard! I\'m rather good at Pokémon battles, you know! I\'m pleased as cheese that you could join us!',
    'Yaaay! This is my favorite part! I wanna see just how good you are! So, why not have a battle with little old me? Just say the word when you\'re ready!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Dojo\'s Armor'), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 1, GameConstants.AchievementOption.less )]),
});
const Mustard2 = new NPC ('Mustard', [
    'Bah ha ha! I lost! You\'re pretty strong, aren\'t you? The way you battle really shows me how much you care about your Pokémon! Even if you\'ve come because of a misunderstanding, as long as you have a will to learn... then you\'re welcome at the Master Dojo! I think we can all help each other become stronger! I\'m happy you\'ve come to join us!',
    'Now then! The dojo\'s at max capacity! It\'s time to really start our training! You\'ll all be facing three trials. And there\'s more! The person who completes the three trials will receive the secret armor of this dojo!',
    'For the first trial, my students... You\'ve all gotta defeat 6 of those fast Galarian Slowpoke, trained with care by little old me! But that\'s not all... You need to catch them, too!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 1), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 3, GameConstants.AchievementOption.less )]),
});
const Mustard3 = new NPC ('Mustard', [
    'Well mustered! You cleared the first trial like it was nothing! Why, I think this is the first time since Leon that someone was able to handle all six fast Slowpoke on their own! The rest of you tried very hard, too! You were able to catch up to the Slowpoke, but I guess you couldn\'t defeat them.',
    'Tell you what. Anyone who was able to catch up to a Slowpoke at least once gets a pass! Our new student here really outdid themselves, so it\'s only fair everyone else gets another chance. Try to make a comeback, everybody!',
    'And for your second trial we have mushroom picking! I\'m tasking you with finding three Max Mushrooms! They are red with a spiral pattern. I\'m pretty sure they grow in dark, humid places! And with that, your next trial begins! I\'m countin\' on ya!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 3), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 4, GameConstants.AchievementOption.less )]),
});
const Mustard4 = new NPC ('Mustard', [
    'Hey! My bad, my bad! It just dawned on me that you\'re brand-new to the Isle of Armor! I bet you have no idea where to even begin looking for Max Mushrooms! C\'mon--let\'s go for a walk, and I\'ll show you some mushroom hot spots.',
    'Dum dum dee dee... La la de daaa... Now, usually the Forest of Focus is chock-full of Max Mushrooms. But the thing is, a swarm of Greedent came through and ate every last one here! So I\'m thinking maybe you\'ll have more luck finding Max Mushrooms if you go check Warm-Up Tunnel.',
    'It\'s out on the other side of the forest! Just watch where you\'re going in the forest, \'K? It\'s easy to get lost! Anyhoo... Good luck with the hunt for Max Mushrooms! Catch you back at the dojo!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 4), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7, GameConstants.AchievementOption.less )]),
});
const Klara1 = new NPC ('Klara', [
    'Hold up a sec! *wheeze*... *wheeze*... Hellooo, what\'s this?! Three Max Mushrooms in one spot? Here I thought I\'d need to go find them one by one! I saw those mushrooms first! I swear! I\'ve been at the dojo longer and all. Sooo... It\'s only fair you let me have \'em. Riiight?',
    'Waaait... What\'s this, now? Are you givin\' me attitude? Pityin\' me, are you?! Gosh, you\'re such a pain in the neck... You just show up outta nowhere, and just happen to be young and talented... If you\'re looking to get in my way, well, I think some vile poisons will take care of that!',
], {
    image: 'assets/images/gymLeaders/Klara.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 5), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7, GameConstants.AchievementOption.less )]),
});
const Avery1 = new NPC ('Avery', [
    'Wait just one moment! *pant*... *pant*... Hah! Just as I expected! Multiple Max Mushrooms growing in a bunch! My psychic powers picked up on these Max Mushrooms eons before you found them. I believe I should be the first one to get those Max Mushrooms. First come, first served, and all!',
    'What\'s this? Are you trying to show you\'re stronger than me? How distasteful! I find your presence most disturbing! You show up at the dojo unannounced and go on to show such talent, even though you\'re still so young... You dare get in my way? I warned you about my psychic powers, and now you\'ll experience them firsthand!',
], {
    image: 'assets/images/gymLeaders/Avery.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 5), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7, GameConstants.AchievementOption.less )]),
});
const Mustard5 = new NPC ('Mustard', [
    'Hey there! Welcome back! Looks like you nailed the trial! Congrats on finding the Max Mushrooms! Trial number two was no problem for you!',
    'All my other students ended up getting lost in the forest... Turns out finding Max Mushrooms was the least of their problems! It\'s a shame, but I guess everyone other than you will fail the trial...',
    'Oh! Klara and Avery! You two look out of breath... But you have some Max Mushrooms, so it looks like you both pass the second trial as well!',
    'Right! Well, I\'ve decided that you three... will now take the Master Dojo\'s...final...last...ultimate...third trial!',
    'You three are the only ones who successfully finished the second trial! You\'ve pushed each other to greater heights and helped each other grow. So I\'d say it\'s time to finally see who is stronger... in a Pokémon battle!',
    'Yep! The rules are simple. Whoever wins will complete the trial! The winner will be granted the secret armor of the Master Dojo!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10, GameConstants.AchievementOption.less )]),
});
const Klara2 = new NPC ('Klara', [
    'You are here.',
    'When I beat you, I\'ll get the secret armor... and then I\'ll become a Poison-type Gym Leader! I\'ve got to win, no matter what.. I\'m gonna go all out and totally beat you. You ready?',
    'I\'m not holding a single thing back anymore. Time to settle this-fair and square! Oh, and maybe watch your step... Looks like some Toxic Spikes somehow got on the Battle Court!',
], {
    image: 'assets/images/gymLeaders/Klara.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 8), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10, GameConstants.AchievementOption.less )]),
});
const Avery2 = new NPC ('Avery', [
    'So, you\'ve come at last.',
    'Defeating you will grant me the secret armor...then I will at last have what I need to become a Psychic-type Gym Leader! No matter what it takes, I refuse to accept anything but a complete and utter victory... I\'m coming at you with everything I have.',
    'Heh. Let us have an elegant battle worthy of being called a finale. Prepare to sink into despair...and into the weird battlefield beneath your feet!',
], {
    image: 'assets/images/gymLeaders/Avery.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 8), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10, GameConstants.AchievementOption.less )]),
});
const Mustard6 = new NPC ('Mustard', [
    'The victor has been decided! The one to complete the third trial is you, our newest student! You gave it your best and triumphed, even when faced with an unfair challenge. To you, who has completed all the trials... I grant the secret armor of the Master Dojo!',
    'Now then... Come on out! This Pokémon is in fact the secret armor of the Master Dojo! Say hello to...Kubfu!',
    '<img src="assets/images/pokemon/891.png">',
    'I know... I know... It\'s tiny... But raise it with diligence, and it\'ll become strong enough to see you through any battle, just like a suit of armor. No opponent will be able to get past it!',
    'Now, I give you permission to catch it!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 12, GameConstants.AchievementOption.less )]),
});
const Mustard7 = new NPC ('Mustard', [
    'Good! Now then... The first thing for you to do is become best friends with Kubfu! You need to build trust! Kubfu hasn\'t really had a chance to explore the world outside the dojo, so... Maybe it\'ll help you become better friends if you train alongside it!',
    'Hmm. Maybe you should train against Dark and Water-types. It will be useful for it to know their weaknesses, since they will be its own weaknesses when it evolves.',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 12), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 14, GameConstants.AchievementOption.less )]),
});
const Mustard8 = new NPC ('Mustard', [
    'You\'re back! I can see already you look closer to Kubfu, and its training is going well! It isn\'t quite ready yet, however! To switch it up a little, you should now have it help you with catching some Water and Dark-type Pokémon!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 14), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 16, GameConstants.AchievementOption.less )]),
});
const Mustard9 = new NPC ('Mustard', [
    'Good, good! You two are just the best of friends now, aren\'t you? Kubfu\'s really become more confident. How wonderful! I daresay I think you\'re both ready.',
    'Now then! If you want Kubfu to become stronger... there are special training grounds just for Kubfu! Prepare yourselves for the...Towers of Two Fists! The blue tower is the Tower of Waters! And the red tower is the Tower of Darkness!',
    'Each tower will help Kubfu learn a different fighting style! I\'m really looking forward to when you two make it to the top of those towers! It\'s going to be so exciting!',
], {
    image: 'assets/images/temporaryBattle/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 16), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 18, GameConstants.AchievementOption.less )]),
});
const Mustard10 = new NPC ('Mustard', [
    'Behold! Before you stands Urshifu! Sure to be unyielding armor that will shatter any blade turned against it... And it has mastered the styles of darkness and water!',
    'Ha! You\'ve certainly grown, haven\'t you? And to think, not long ago you would\'ve run and hid behind me the moment you got scared! Indeed, no matter how old I get, witnessing someone grow always brings joy to my heart. Urshifu! And you as well! Thank you both, from the bottom of my heart.',
], {
    image: 'assets/images/trainers/Dojo Master.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 18), new QuestLineCompletedRequirement('The Dojo\'s Armor', GameConstants.AchievementOption.less )]),
});

const JungleAsh1 = new NPC ('Ash Ketchum', [
    'Hey! I didn\'t expect to see you again here. Fancy a ba-. Actually, no, I\'d like to ask a favour of you; a friend of mine living in Glimwood Tangle called me asking for some help.',
    'I would go myself, but I promised one of the students here a battle and I don\'t want to bail on them. Would you be able to go for me?',
    'Great! My friends name is Koko, tell him I sent you. This battle shouldn\'t take me too long, so come ask for my help if you need it!',
], {
    image: 'assets/images/temporaryBattle/Ash Ketchum.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Secrets of the Jungle'), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 1, GameConstants.AchievementOption.less )]),
});
const JungleKoko1 = new NPC ('Koko', [
    'Hmm? Who are you? Oh, so Ash sent you to help me? That\'s great!',
    'So, I\'m part of a tribe of Pokémon called Zarude, I was raised by them despite being a human. One of them has gone missing, I\'ve been told they were seen roaming, completely lost, around the Isle of Armor.',
    'Could you go catch it and bring it back here? If you need help locating it, I\'m sure one of the students at the dojo they have there could help you.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 0), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 2, GameConstants.AchievementOption.less )])});
const JungleKoko2 = new NPC ('Koko', [
    'Great, you found it! Now if you could release it... hmm? It seems to like you. Well, if it wants to stay with you, that\'s its choice, so I guess it\'s fine.',
    'Oh, it looks like a group of Zarude from the tribe are here..... They... are angry, they think you caught Zarude against its will. I\'ll try and talk sense into them,',
    'Zaruza! Zaru Zaru! Zarude!.. Nope, they\'re too angry to listen. Looks like you\'ll have to fight them if we want to calm them down. Zarude are strong, but I\'m sure you\'ll be fine if you are anywhere near as strong as Ash.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 2), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 4, GameConstants.AchievementOption.less )])});
const JungleKoko3 = new NPC ('Koko', [
    'Well, they\'re all knocked out. I\'ll try to talk reason into them when they wake up. Thanks for your help, I\'m glad you found Zarude safe.',
    '...oh no. Another two groups of Zarude are coming and, as I\'m sure you can already guess, being surrounded by unconscious Zarude does not make you look good to them.',
    'I\'m really sorry, it seems you\'ll have to fight off these ones as well.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 4), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 6, GameConstants.AchievementOption.less )])});
const JungleKoko4 = new NPC ('Koko', [
    'Okay... It\'s great that you were able to knock them all out without hurting them too much, but I don\'t think I\'ll be able to calm all of them on my own when they wake up.',
    'Would you be able to bring Ash here? I think the 3 of us together should be able to calm the lot of them down. He\'s probably still at the Master Dojo.',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 6), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 9, GameConstants.AchievementOption.less )])});
const JungleAsh2 = new NPC ('Ash Ketchum', [
    'You\'re back! How did it go with the Zarude?',
    'Oh, I see, that\'s quite the problem... Still, you said they\'re all out cold for now, right? In that case, we should have time for a battle!',
    'The battlefield out the back of the Dojo is being used at the moment, so let\'s battle out in front of the Dojo.',
    'With this amazing new team of mine, I\'ll finally beat you, my strongest rival!',
], {
    image: 'assets/images/temporaryBattle/Ash Ketchum.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 7), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 9, GameConstants.AchievementOption.less )]),
});
const JungleKoko5 = new NPC ('Koko', [
    'You brought Ash? Fantastic! And just in time, the Zarude are starting to wake up. Ash, could you have your Pokémon help me explain to them what\'s going on?',
    'Okay! It seems they finally understand. I\'m really sorry for all the trouble they caused for you.',
    'Oh, Dada! Zaruza Zaru? Zaru. This is the Zarude that raised me, Dada. He says he was impressed watching you fight, and wants to fight you as well.',
    'I should tell you, Dada is much stronger than the rest of the Zarude. Have a good fight, both of you!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 9), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 11, GameConstants.AchievementOption.less )])});
const JungleAsh3 = new NPC ('Ash Ketchum', [
    'Amazing, you even beat Dada! It\'s really clear that he is really amazed by your strength!',
    'Hang on, did you guys see something? Oh, over there, it\'s Celebi! It must have come now things are peaceful here. It looks like it wants to play!',
    'Actually, it looks interested in you in particular. Maybe it wants you to try and catch it? You should give it a shot!',
], {
    image: 'assets/images/temporaryBattle/Ash Ketchum.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 11), new QuestLineStepCompletedRequirement('Secrets of the Jungle', 13, GameConstants.AchievementOption.less )]),
});
const JungleKoko6 = new NPC ('Koko', [
    'Wow, you actually caught Celebi! Well, I\'m not sure why, but it looks like that is what it wanted.',
    'Oh, also, Dada said he would be interested in travelling with you. Although, he also said he needed to deal with the shortage of Quest Points the tribe is dealing with right now.',
    'If you help him with that, I\'m sure he\'ll join you!',
],
{ requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('Secrets of the Jungle', 13), new QuestLineCompletedRequirement('Secrets of the Jungle', GameConstants.AchievementOption.less )])});
const CrownShrineExplorer = new NPC('Explorer', [
    'Whew! This place is quite a trek from Freezington.',
    'I\'ve heard that a rare Pokémon sometimes hides in the chests here. I was told that it is incredibly rare, but can\'t be found anywhere else!',
], {image: 'assets/images/trainers/Backpacker (male).png'});

//Crown Tundra NPCs
const CrownTundraRoamerNPC = new RoamerNPC('Freezington Mayor', [
    'If my eyes didn\'t deceive me, I saw a rare Pokémon at {ROUTE_NAME}. Go and see if you can find it if you\'re interested.',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.CrownTundra));

const CrownPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they were talking about some ancient king Pokémon! They also mentioned a couple of horsey Pokémon that it was ultra-mega-close to. There\'s a statue of it outside and I\'ve heard this rock I\'ve been using as a pillow is part of it!',
    'Could you go and put it back on for me?',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Crown of Galar'), new QuestLineStepCompletedRequirement('The Crown of Galar', 1, GameConstants.AchievementOption.less )]),
});
const Calyrex1 = new NPC ('Calyrex', [
    'Ah, yes. A sturdy body, just as I expected. I hope this man doesn\'t mind that I make use of it for the time being.',
    'I am Calyrex. I am also known as the King of Bountiful Harvests. I have borrowed this man\'s body in order to thank you in person for restoring my statue...so to speak.',
    'I once reigned over these lands as king, but now I have lost all but a fraction of my former strength. Even my loyal steeds have abandoned me.',
    'Would you do me the favour of protecting me from wild Pokémon at the Old Cemetery and Snowslide Slope? I wish to grow a Shaderoot Carrot and an Iceroot Carrot which I believe could draw out my loyal steeds.',
], {
    image: 'assets/images/npcs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 1), new QuestLineStepCompletedRequirement('The Crown of Galar', 3, GameConstants.AchievementOption.less )]),
});

const Calyrex2 = new NPC ('Calyrex', [
    'Thank you for your help in growing these carrots. It is my belief that they will draw my loyal steeds back to me...',
    'What?! They are here already! But they appear to be unable to tell exactly where the scent of the carrots is coming from!',
    'The people of this place are in danger, you must fight them off!',
], {
    image: 'assets/images/npcs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 3), new QuestLineStepCompletedRequirement('The Crown of Galar', 5, GameConstants.AchievementOption.less )]),
});

const Calyrex3 = new NPC ('Calyrex', [
    'You have my thanks for protecting the village, human child. Although, unfortunately, this has also caused my loyal steeds to flee.',
    'Hmm... Perhaps now we know they are in this area, it would be better to search for them?',
    'I think that would be for the best. Once you capture them, I would appreciate it if you could bring them to the Crown Shrine at the mountain\'s peak.',
], {
    image: 'assets/images/npcs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 5), new QuestLineStepCompletedRequirement('The Crown of Galar', 7, GameConstants.AchievementOption.less )]),
});

const Calyrex4 = new NPC ('Calyrex', [
    'Finally, my loyal steeds have returned to me. There are truly no words with which to fully express my gratitude to you. But I can try. Take these Reins of Unity.',
    '<img src="assets/images/keyitems/Reins_of_unity.png">',
    'They can be used to combine myself and my steeds. However, it is incomplete. They must have have hair from the manes of my steeds intertwined to work. I expect they will occasionally leave such hair behind upon being defeated.',
    'And to that point... I have a suggestion. If you are able to capture me, it will prove your worth beyond any doubt, and I will lend you my strength on your journey. Once you have readied yourself, come face me!',
], {
    image: 'assets/images/npcs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 7), new QuestLineStepCompletedRequirement('The Crown of Galar', 9, GameConstants.AchievementOption.less )]),
});
const Calyrex5 = new NPC ('Calyrex', [
    '<i>Human child... I look forward to what adventures we might have together.</i>',
    '<i>May I remind you, if you ever wish to return my steeds and I to our true power, you must gather some hair from the manes of my steeds as they roam the Crown Tundra, and intertwine such hair with the Reins of Unity.</i>',
], {
    image: 'assets/images/pokemon/898.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 9)]),
});
const CrownPeony2 = new NPC ('Peony', [
    'Wait--you really caught Calyrex from the legends?! Thats\'s ultra-mega-brilliant! Report away!',
    'Th-that noggin\'s MASSIVE! I-is that the King of Bountiful Harvests? The one calling the shots around here? Huh? I could swear I\'ve seen it before... Or then again, maybe not...',
    'A-anyway! It\'s definitely regal of it to have steeds... and that massive head does sort of resemble a crown! It\'s kingly enough, at any rate! Let\'s just call this a successful expedition! Smashin\'!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 9), new QuestLineCompletedRequirement('The Crown of Galar', GameConstants.AchievementOption.less)]),
});
const BirdPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they mentioned they had seen some bird Pokémon that looked like the legendary birds of Kanto at that ultra-mega-massive tree in the middle of Ballimere Lake!',
    'You should go check it out!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Birds of the Dyna Tree'), new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 2, GameConstants.AchievementOption.less )]),
});
const BirdPeony2 = new NPC ('Peony', [
    'You\'re saying you saw some Pokémon that looked like.... Hang on, Chief! There\'s breaking news on the telly! They\'re sayin\' dodgy bird Pokémon are poppin\' up left and right!',
    'There\'s this fancy graceful one\'s apparently flyin\' about the Crown Tundra!',
    'And there\'s this pointy feathered one runnin\' about in the Wild Area of Southern Galar!',
    'Plus a fiery-lookin\' one out on the Isle of Armor!',
    'You\'re sayin\' you saw them and that\'s what you were tellin\' me about? Ah, sorry \'bout that. Anyway, you should go find \'em.',
    'They look real strong, so you probably can\'t catch \'em right off the bat. I\'d try weakening them first.',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 2), new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 4, GameConstants.AchievementOption.less )]),
});
const BirdPeony3 = new NPC ('Peony', [
    'Hang on--you really caught up to all three of them dodgy birds? Multiple times each? That\'s pretty impressive!',
    'I think they should all be weakened enough that you can catch \'em now!',
    'I\'d imagine they\'d be in the same areas you chased \'em about in.',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 4), new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 6, GameConstants.AchievementOption.less )]),
});
const BirdPeony4 = new NPC ('Peony', [
    'Wait--you really caught Articuno, Moltres, and Zapdos from the legends?! Thats\'s ultra-mega-brilliant! Report away!',
    'So that\'s them is it? I can definitely see the resemblance, but they don\'t seem quite the same...',
    'Maybe they\'re regional variants or somethin\'? At any rate, that\'s good enough for me. Let\'s call this expedition a success!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 6), new QuestLineCompletedRequirement('The Birds of the Dyna Tree', GameConstants.AchievementOption.less)]),
});
const GolemPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they mentioned some weird purple and yellow ruins at Three-Point Pass. You should go check \'em out!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Ancient Golems'), new QuestLineStepCompletedRequirement('The Ancient Golems', 1, GameConstants.AchievementOption.less )]),
});
const GolemPeony2 = new NPC ('Peony', [
    'So they wouldn\'t open... That\'s annoyin\'. Well, there are also 3 more ruins, 2 at opposite ends of Giant\'s Bed, and one at Snowslide Slope. Maybe you should have a look at those?',
    'How \'bout clearin\' em 10 times each, and see if you find anythin\' to open up the ruins at Three-Point Pass.',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 1), new QuestLineStepCompletedRequirement('The Ancient Golems', 3, GameConstants.AchievementOption.less )]),
});
const GolemPeony3 = new NPC ('Peony', [
    'So that didn\'t work? Well, I heard there are some legendary Pokémon in those ruins, called Regirock, Regice, and Registeel. Apparently they\'ll show up to people who have done enough explorin\' in their ruins.',
    'Maybe if you caught them, the other ruins would open? What? You already have? Well, it might be worth doing it again, anyway.',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 3), new QuestLineStepCompletedRequirement('The Ancient Golems', 5, GameConstants.AchievementOption.less )]),
});
const GolemPeony4 = new NPC ('Peony', [
    'Looks like that didn\'t do it. But don\'t lose your hopes yet! I was just told that Regigigas appeared in Giant\'s Bed! Probably somethin\' to do with you catching those other three. Anyway! You should go on and catch it!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 5), new QuestLineStepCompletedRequirement('The Ancient Golems', 7, GameConstants.AchievementOption.less )]),
});
const GolemPeony5 = new NPC ('Peony', [
    'Wait--so you really caught Regigigas from the legends? Well, that doesn\'t seem to have opened the ruins automatically or anythin\', but I imagine Regigigas can open those doors with sheer strength!',
    'You should go now and see what\'s there!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 7), new QuestLineStepCompletedRequirement('The Ancient Golems', 9, GameConstants.AchievementOption.less)]),
});
const GolemPeony6 = new NPC ('Peony', [
    'You caught Regieleki and Regidrago from the legends? Well that\'s that then! Smashin\'! I\'ll mark this expedition done!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 9), new QuestLineCompletedRequirement('The Ancient Golems', GameConstants.AchievementOption.less )]),
});
const PeonyComplete = new NPC ('Peony', [
    'Huh? Well how \'bout that, Chief! Looks like that was the last bit of the grand Peony Adven-tour that I had for you! Whoooooo! Now this is an occasion! What\'s the word? Ultra-mega-epic! Your passion for all this caught me off guard, Chief...',
    'This whole Adven-tour thing was built out of a load of rubbish I scraped together. Even I had my doubts about the whole thing. But you? You went at it with a ton of energy! Thanks for stickin\' around and finishin\' every part of my Adven-tour!',
], {
    image: 'assets/images/temporaryBattle/Peony.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('The Crown of Galar'), new QuestLineCompletedRequirement('The Birds of the Dyna Tree'), new QuestLineCompletedRequirement('The Ancient Golems')]),
});
const ProfMagnolia = new ProfNPC('Prof. Magnolia',
    GameConstants.Region.galar,
    'Ahhh, how incredible. Look how far you have come, dear trainer. Congratulations on another complete Pokédex.',
    'I hear word of an exotic region on the horizon, but there has been no word yet when the blimp will be able to reach such faraway lands.',
    //*TODO*: Change second line to this text when Paldea is available: 'Now be on your way, the illustrious Paldea region awaits over the horizons.',
    'assets/images/npcs/Professor Magnolia.png');

const MagearnaMysteryGift = new NPC('Mystery Gift', [
    'You have recieved a Mystery Gift for completing the National Shiny Dex!',
], {
    image: 'assets/images/pokemon/801.1.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('A Mystery Gift'), new QuestLineCompletedRequirement('A Mystery Gift', GameConstants.AchievementOption.less)]),
}
);

//Galar Towns
TownList.Postwick = new Town(
    'Postwick',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [new BulletinBoard(GameConstants.BulletinBoards.Galar), PostwickShop],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
        npcs: [PostwickMum, MagearnaMysteryGift],
    }
);
TownList['Slumbering Weald'] = new Town(
    'Slumbering Weald',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [TemporaryBattleList.Mirages, new MoveToDungeon(dungeonList['Slumbering Weald Shrine'])],
    {
        requirements: [new TemporaryBattleRequirement('Hop 1')],
    }
);
TownList.Wedgehurst = new Town(
    'Wedgehurst',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [TemporaryBattleList['Sordward & Shielbert'], WedgehurstShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 1)],
        npcs: [WedgehurstRailStaff, SouthGalarRoamerNPC, SordwardShielbert2],
    }
);
TownList['Professor Magnolia\'s House'] = new Town(
    'Professor Magnolia\'s House',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 2)],
        npcs: [ProfMagnolia, AssistantHenry],
    }
);
TownList.Motostoke = new Town(
    'Motostoke',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [TemporaryBattleList['Marnie 1'], TemporaryBattleList['Rampaging Torkoal'], MotostokeShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Motostoke), new BattleCafe()],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 6)],
        npcs: [BattleCafeMaster, MotostokeArtist],
    }
);
TownList.Turffield = new Town(
    'Turffield',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [TemporaryBattleList['Rampaging Tsareena'], TurffieldShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Turffield)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 13)],
        npcs: [TurffieldCook],
    }
);
TownList.Hulbury = new Town(
    'Hulbury',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [TemporaryBattleList['Rampaging Gyarados'], HulburyShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Hulbury)],
    {
        requirements: [new TemporaryBattleRequirement('Hop 4')],
        npcs: [Meteorologist],
    }
);
TownList['Stow-on-Side'] = new Town(
    'Stow-on-Side',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [TemporaryBattleList['Rampaging Conkeldurr'], TemporaryBattleList['Rampaging Dusknoir'], GymList['Stow-on-Side1'], GymList['Stow-on-Side2'], StowonSideShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Stow-on-Side']), new ShardTraderShop(GameConstants.ShardTraderLocations['Route 6'], 'Fossil Master')],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 23)],
        npcs: [AncientMural1, AncientMural2, StowonSideSonia, Archaeologist],
    }
);
TownList.Ballonlea = new Town(
    'Ballonlea',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [TemporaryBattleList['Gym Leader Bede'], BallonleaShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Ballonlea)],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))],
    }
);

TownList.Hammerlocke = new Town(
    'Hammerlocke',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [TemporaryBattleList['Rampaging Haxorus'], new MoveToDungeon(dungeonList['Energy Plant']), HammerlockeShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Hammerlocke), new BattleCafe()],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 22)],
        npcs: [HammerlockeHiker],
    }
);

TownList.Circhester = new Town(
    'Circhester',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [TemporaryBattleList['Rampaging Gigalith'], TemporaryBattleList['Rampaging Froslass'], GymList.Circhester1, GymList.Circhester2, CirchesterShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Circhester)],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 26)],
        npcs: [HerosBath, CirchesterHop, CirchesterSonia, CirchesterGuitarist],
    }
);
TownList.Spikemuth = new Town(
    'Spikemuth',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [TemporaryBattleList['Gym Leader Marnie'], SpikemuthShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Spikemuth)],
    {
        requirements: [new TemporaryBattleRequirement('Marnie 2')],
        npcs: [TeamYellGrunts],
    }
);
TownList.Wyndon = new Town(
    'Wyndon',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [WyndonShop, new MoveToDungeon(dungeonList['Rose Tower']), new BattleCafe()],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 32)],
    }
);
TownList['Wyndon Stadium'] = new Town(
    'Wyndon Stadium',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [GymList['Elite Trainer Marnie'], GymList['Elite Gym Leader Bede'], GymList['Elite Trainer Hop'], GymList['Champion Leon'], pokeLeagueShop()],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 32)],
        npcs: [RoseBroadcast, WyndonHop, Leon],
    }
);

//Isle of Armor Towns
TownList['Armor Station'] = new Town(
    'Armor Station',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    }
);
TownList['Master Dojo'] = new Town(
    'Master Dojo',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
    [new BulletinBoard(GameConstants.BulletinBoards.Armor), TemporaryBattleList.Mustard, TemporaryBattleList.Kubfu, MasterDojoShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Master Dojo'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 33)],
        npcs: [Mustard1, Mustard2, Mustard3, Mustard4, Mustard5, Klara2, Avery2, Mustard6, Mustard7, Mustard8, Mustard9, JungleAsh1, JungleAsh2, IsleofArmorRoamerNPC],
    }
);
TownList['Master Dojo Battle Court'] = new Town(
    'Master Dojo Battle Court',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
    [GymList['Elite Gym Leader Klara'], GymList['Elite Gym Leader Avery'], GymList['Elite Dojo Matron Honey'], GymList['Elite Dojo Master Mustard']],
    {
        requirements: [new QuestLineCompletedRequirement('The Dojo\'s Armor')],
    }
);

//Crown Tundra Towns
TownList['Crown Tundra Station'] = new Town(
    'Crown Tundra Station',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [TemporaryBattleList.Peony],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    }
);
TownList.Freezington = new Town(
    'Freezington',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new BulletinBoard(GameConstants.BulletinBoards.Crown), GymList['Elite Trainer Peony'], TemporaryBattleList.Calyrex, TemporaryBattleList.Glastrier, TemporaryBattleList.Spectrier, FreezingtonShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.galar, 46)],
        npcs: [CrownPeony1, Calyrex1, Calyrex2, Calyrex3, CrownPeony2, BirdPeony1, BirdPeony2, BirdPeony3, BirdPeony4, GolemPeony1, GolemPeony2, GolemPeony3, GolemPeony4, GolemPeony5, GolemPeony6, PeonyComplete, CrownTundraRoamerNPC],
    }
);


//Galar Dungeons
TownList['Slumbering Weald Shrine'] = new DungeonTown(
    'Slumbering Weald Shrine',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [new QuestLineStepCompletedRequirement('The Darkest Day', 12)],
    [TemporaryBattleList['Hop 8'], TemporaryBattleList['Sordward 1'], TemporaryBattleList['Shielbert 1']],
    {
        npcs: [SlumberingHop1, SlumberingHop2, SordwardShielbert1],
    }
);
TownList['Galar Mine'] = new DungeonTown(
    'Galar Mine',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 12)],
    [TemporaryBattleList['Bede 1']]
);
TownList['Galar Mine No. 2'] = new DungeonTown(
    'Galar Mine No. 2',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [new GymBadgeRequirement(BadgeEnums.Galar_Water)],
    [TemporaryBattleList['Bede 2']]
);
TownList['Glimwood Tangle'] = new DungeonTown(
    'Glimwood Tangle',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [new QuestLineStepCompletedRequirement('The Darkest Day', 2)],
    [TemporaryBattleList['Zarude Tribe 1'], TemporaryBattleList['Zarude Tribe 2'], TemporaryBattleList['Zarude Tribe 3'], TemporaryBattleList['Zarude (Dada)'], TemporaryBattleList['Flowering Celebi'], GlimwoodTangleShop],
    {
        npcs: [JungleKoko1, JungleKoko2, JungleKoko3, JungleKoko4, JungleKoko5, JungleAsh3, JungleKoko6],
    }
);
TownList['Rose Tower'] = new DungeonTown(
    'Rose Tower',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [new GymBadgeRequirement(BadgeEnums.Elite_Hop)]
);
TownList['Energy Plant'] = new DungeonTown(
    'Energy Plant',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.NorthGalar,
    [new QuestLineStepCompletedRequirement('The Darkest Day', 14)],
    [TemporaryBattleList.Eternatus, TemporaryBattleList['Sordward 2'], TemporaryBattleList['Shielbert 2'], TemporaryBattleList['Rampaging Zacian'], TemporaryBattleList['Rampaging Zamazenta'], TemporaryBattleList['The Darkest Day']],
    {
        npcs: [EnergyPlantRose, SordwardShielbert3, SordwardShielbert4, Piers, EnergyPlantHop],
    }
);
TownList['Dusty Bowl'] = new DungeonTown(
    'Dusty Bowl',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.SouthGalar,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 18)]
);
TownList['Courageous Cavern'] = new DungeonTown(
    'Courageous Cavern',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)]
);
TownList['Brawlers\' Cave'] = new DungeonTown(
    'Brawlers\' Cave',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
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
    GameConstants.GalarSubRegions.IsleofArmor,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 38)],
    [TemporaryBattleList['Klara 2'], TemporaryBattleList['Avery 2']],
    {
        npcs: [Klara1, Avery1],
    }
);
TownList['Tower of Darkness'] = new DungeonTown(
    'Tower of Darkness',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
    [
        new MultiRequirement([
            new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 17),
            new RouteKillRequirement(10, GameConstants.Region.galar, 40),
        ]),
    ],
    [],
    {
        npcs: [Mustard10],
    }
);
TownList['Tower of Waters'] = new DungeonTown(
    'Tower of Waters',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.IsleofArmor,
    [
        new MultiRequirement([
            new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 17),
            new RouteKillRequirement(10, GameConstants.Region.galar, 36),
        ]),
    ],
    [],
    {
        npcs: [Mustard10],
    }
);
TownList['Roaring-Sea Caves'] = new DungeonTown(
    'Roaring-Sea Caves',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 50)]
);
TownList['Rock Peak Ruins'] = new DungeonTown(
    'Rock Peak Ruins',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)]
);
TownList['Iron Ruins'] = new DungeonTown(
    'Iron Ruins',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)]
);
TownList['Iceberg Ruins'] = new DungeonTown(
    'Iceberg Ruins',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 54)]
);
TownList['Split-Decision Ruins'] = new DungeonTown(
    'Split-Decision Ruins',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new QuestLineStepCompletedRequirement('The Ancient Golems', 8)]
);
TownList['Lakeside Cave'] = new DungeonTown(
    'Lakeside Cave',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 53)]
);
TownList['Dyna Tree Hill'] = new DungeonTown(
    'Dyna Tree Hill',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 53)]
);
TownList['Tunnel to the Top'] = new DungeonTown(
    'Tunnel to the Top',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 54)]
);
TownList['Crown Shrine'] = new DungeonTown(
    'Crown Shrine',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new RouteKillRequirement(10, GameConstants.Region.galar, 55)],
    [],
    {
        npcs: [Calyrex4, Calyrex5, CrownShrineExplorer],
    }
);

// Used to check if next region can be reached, for example for professor NPC
TownList['Final Region Town'] = new Town(
    'Final Region Town',
    GameConstants.Region.final,
    GameConstants.FinalSubRegions.Final,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    }
);
