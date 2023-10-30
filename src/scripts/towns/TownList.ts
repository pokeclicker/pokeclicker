/* eslint-disable array-bracket-newline */
///<reference path="../../declarations/requirements/RouteKillRequirement.d.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../../declarations/requirements/SpecialEventRequirement.d.ts"/>
///<reference path="../quests/BulletinBoard.ts"/>
///<reference path="BattleCafe.ts"/>
///<reference path="../../declarations/requirements/MultiRequirement.d.ts"/>
///<reference path="../safari/SafariTownContent.ts"/>
///<reference path="PurifyChamber.ts"/>
///<reference path="PokemonContest.ts"/>

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
    ItemList.Wonder_Chest,
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
    'You can use the Poké Ball Selector to select which type of Poké Ball to use on specific Pokémon based on caught status.',
    'For example, if you click on the empty ball next to the word "Caught" and assign a Poké Ball, you will then start throwing Poké Balls at Pokémon you\'ve already caught before. This can be very useful if you need Dungeon Tokens.',
    'Here, let me show you how it works.',
    'I\'ll always be here to explain it again if you forget.',
], {
    image: 'assets/images/npcs/Old Man.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Tutorial Quests', 4), new QuestLineStepCompletedRequirement('Tutorial Quests', 5, GameConstants.AchievementOption.less)]),
});
const ViridianCityOldMan3 = new NPC('Old Man', [
    'You can use the Poké Ball Selector to select which type of Poké Ball to use on specific Pokémon based on caught status.',
    'For example, if you click on the empty ball next to the word "Caught" and assign a Poké Ball, you will then start throwing Poké Balls at Pokémon you\'ve already caught before. This can be very useful if you need Dungeon Tokens.',
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
    image: 'assets/images/npcs/Scientist (female).png',
    requirement: new GymBadgeRequirement(BadgeEnums.Earth),
});

const Route3ShadySalesman = new NPC('Shady Salesman', [
    'Have I got a deal just for you!',
    'I\'ll let you have a super secret Pokémon. For the right price! Buying this pokemon Takes No Effort, you should Value it.',
], {image: 'assets/images/npcs/ShadySalesman.png'});

const CeruleanKantoBerryMaster = new KantoBerryMasterNPC('Berry Master', [
    'Bah! You younglings have no appreciation of the art of Berry farming!',
    'Come back when you are ready to learn!',
]);

const CeruleanSuperNerd = new NPC('Super Nerd Jovan', [
    'In my spare time I like to play this kickass browser game. It takes ages to get all the best stuff.',
    'Then one day, all my progress was gone. I don\'t know exactly what happened. Something updated, some cookies got cleaned up, I don\'t know. I had to start all over from the beginning.',
    'That day I learned that I should frequently download a save.',
], {image: 'assets/images/npcs/Super Nerd.png'});

const BillsGrandpa1 = new NPC('Bill\'s Grandpa', [
    'Hm? You know Bill? He\'s my grandson. He\'s not here right now. He does something with PCs, so I\'m house-sitting.',
    'I like Pokémon but I\'m not as knowledgeable as my grandson. My grandson Bill told me about a Pokémon that is pink and like a balloon.',
    'Would you catch that Pokémon and show it to me, please?',
], {image: 'assets/images/npcs/Bill\'s Grandpa with Eevee.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Bill\'s Grandpa Treasure Hunt'), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 1, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa2 = new NPC('Bill\'s Grandpa', [
    'Ah, so that is Jigglypuff? Isn\'t it cute! That\'s so kind of you. Thanks! This Moon Stone is a token of my appreciation.',
    'Ah, my grandson mentioned a round, green Pokémon, wait not green, it\'s blue, a blue Pokémon that has leaves growing on its head.',
    'If you encounter that Pokémon and catch it, would you, please, bring it here?',
], {image: 'assets/images/npcs/Bill\'s Grandpa with Eevee.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 1), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 3, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa3 = new NPC('Bill\'s Grandpa', [
    'Oh, the Pokémon was called Oddish? It is adorable! Thank you so much for bringing it to me! Please, accept this Leaf Stone.',
    'By the way, do you know of a sea Pokémon that has a red sphere on its body? You know, the one that\'s shaped like a star?',
    'When you get one, could you, please, come back here so I can see it?',
], {image: 'assets/images/npcs/Bill\'s Grandpa with Eevee.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 3), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 5, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa4 = new NPC('Bill\'s Grandpa', [
    'Ah, you brought it to me. Staryu is the name, you said? It\'s certainly shaped like a star. You are so kind for coming back with it! This Water Stone should be really useful to you.',
    'I was thinking, Bill told me about a Pokémon that is very loyal to its trainer. It\'s supposed to roar well.',
    'I would really like to meet one, can you stop by if you capture one, please?',
], {image: 'assets/images/npcs/Bill\'s Grandpa with Eevee.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 5), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 7, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa5 = new NPC('Bill\'s Grandpa', [
    'Ah, so this little puppy is Growlithe? I cannot begin to imagine its roaring! I\'m so happy that you are doing all this for me. Thank you so much! I was saving this Fire Stone for a rainy day, but I want you to have it instead.',
    'Did you think I was done by the way? I wanted to ask if you knew that hugely popular Pokémon? The Pokémon that has a yellow body and red cheeks. I would love to see what it looks like.',
    'This is the one I\'m most excited to meet. Please come back once you catch it, I will have tea prepared for you.',
], {image: 'assets/images/npcs/Bill\'s Grandpa with Eevee.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 7), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 9, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa6 = new NPC('Bill\'s Grandpa', [
    'Yes! That\'s the one! It\'s Pikachu, right? Ohhh, I\'ve wanted to meet it for so long. Such a cutie. You deserve this Thunder Stone!',
    'You\'ve shown me everything I wanted to see and more. You have been a very nice trainer! My grandson could learn one thing or two from you, ho, ho!',
    'There is one more thing I would like to ask you, would you battle this old man? I promise I\'ll make it worth your while. Let\'s go outside.',
    'Let me tell you though, in my youth, I was strong enough to beat Viridian City\'s Gym, so don\'t expect me to be a pushover.',
], {image: 'assets/images/npcs/Bill\'s Grandpa with Eevee.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 9), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 11, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa7 = new NPC('Bill\'s Grandpa', [
    'As I said, that was one of the best battles I\'ve ever had.',
    'There is someone I would like to go with you, it\'s my partner, Eevee.',
    'I think Eevee is gonna be better with you than with me. I\'m sure that, with you, Eevee is gonna grow up healthy and strong!',
], {image: 'assets/images/npcs/Bill\'s Grandpa without Eevee.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 11), new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 13, GameConstants.AchievementOption.less)]),
});

const BillsGrandpa8 = new NPC('Bill\'s Grandpa', [
    'Hello again, I see you are treating Eevee very well.',
    'I\'m still house-sitting for my grandson, I\'m sure he\'s doing well.',
], {image: 'assets/images/npcs/Bill\'s Grandpa without Eevee.png',
    requirement: new QuestLineStepCompletedRequirement('Bill\'s Grandpa Treasure Hunt', 13),
});

const BillsHouseEusine = new NPC('Eusine', [
    'Puff, puff... I am...no match for you. ...As I predicted.',
    '..................',
    'Go ahead. Since I met you in Ecruteak City, I\'ve sort of known that Suicune would choose you.',
    'Take a look at it! Suicune is still there waiting for you! It has been waiting for a worthy Trainer to whom it can entrust itself!',
],
{
    image: 'assets/images/npcs/Eusine.png',
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
    image: 'assets/images/npcs/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 5), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 7, GameConstants.AchievementOption.less )]),
});

const LavenderMrFuji = new NPC('Mr. Fuji', [
    'Welcome. In our Volunteer House here we take in all kinds of Pokémon to care for them.',
    'Did you know that sparkling Pokémon are more often found in Dungeons, on Farms, from Eggs, and even from Shops, the Safari Zone, and Evolutions from Items?',
], {image: 'assets/images/npcs/Mr. Fuji.png'});

const LavenderChanneler = new NPC('Channeler Karina', [
    'I know a lot of useful stuff. Like the odds of finding a shiny Pokémon or how to increase Click Attack.',
    'No, I didn\'t learn this from talking to ghosts, don\'t be silly. There\'s a FAQ button in the Start Menu. It\'s very useful.',
], {image: 'assets/images/npcs/Channeler.png'});

const LavenderShopper = new NPC('Shopper', [
    'I always seem to run out of Great Balls. Luckly this shop always have them in stock!',
    'They even have an offer today! They give you free Great Balls if you give them the code <b>THE-GREATEST-POKEBALL</b>',
]);

const BigSpender = new NPC('Big Spender', [
    'I love shopping! When I come in, the cashiers know I want tons of items.',
    'You can use the Shop Amount Button settings to make it easy for big purchases, too!',
], {image: 'assets/images/npcs/Beauty.png'});

const EggHuntErika = new NPC('Erika', [
    'Hello... Isn\'t the spring weather so relaxing? I adore how lovely the blooming flowers look during this time of year...',
    'Oh! I\'m sorry, I almost dozed off. I was reminiscing about my stroll in Viridian Forest earlier today. I came across the loveliest patch of flowers over there and...',
    '...',
    'Zzz... Hm? Oh yes, the forest. It was most peculiar - when I laid down upon the flowerbed I had the strangest dream of a colorful, round Pokémon. At least, I think it was a dream... It did not strike me as one of the usual inhabitants of the area.',
], {
    image: 'assets/images/npcs/Erika.png',
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
    image: 'assets/images/npcs/Pokémon Breeder (female).png',
    requirement: new GymBadgeRequirement(BadgeEnums.Earth),
});

const LaprasGift = new GiftNPC('Silph Co. Employee', [
    'Oh! Hi! You\'re not a member of Team Rocket! You came to save us? Why thank you!',
    'I want you to have this Pokémon for saving us.',
], () => {
    App.game.party.gainPokemonByName('Lapras');
}, 'assets/images/pokemon/131.png', { saveKey: 'laprasgift', image: 'assets/images/npcs/Office Worker (male).png', requirement: new MultiRequirement([new TemporaryBattleRequirement('Blue 5'), new ObtainedPokemonRequirement('Lapras', true)]) });

const FuchsiaKantoRoamerNPC = new RoamerNPC('Youngster Wendy', [
    'There\'s been some recent sightings of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.kanto, RoamingPokemonList.findGroup(GameConstants.Region.kanto, GameConstants.KantoSubRegions.Kanto));

const FuchsiaEusine = new NPC('Eusine', [
    'You! Not again! I\'ll be there first next time! Having followed it here, I\'m starting to understand what Suicune is after.',
    'To be honest, I would like to keep this information to myself. But I want to be an honest Trainer in front of Suicune! That\'s why I am sharing a clue with you.',
    'It seems that... Suicune prefers a hilly place near water... Somewhere north. I don\'t know exactly where, yet. It will be just you and me! Who\'ll find it first? I challenge you!',
],
{
    image: 'assets/images/npcs/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 7), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 9, GameConstants.AchievementOption.less )]),
});

const CinnabarIslandResearcher = new NPC('Researcher', [
    'They were trying to clone an ancient Pokémon in the mansion... I wonder if they succeeded.',
    'Apparently the ancient Pokémon escaped, and can be found roaming around Kanto!',
], {image: 'assets/images/npcs/Scientist (male).png'});

const KantoFossilNpc = new NPC('Underground Expert', [
    'That Explorer Kit is a must-have for any Fossil Fanatic! Why, it\'s how I found my very first Old Amber.',
    'Hrm, yes! I see that gleam in your eye! It may look expensive now, but the treasures you\'ll find in the Underground are priceless! And what\'s more- with each new region you travel to, the more adept you will become at identifying new curios!',
    'Speaking of, our very own Kanto is home to three: the Helix Fossil, Dome Fossil, and Old Amber! You can revive them via that Hatchery of yours!',
], {image: 'assets/images/npcs/Ruin Maniac gen3.png'});

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
    image: 'assets/images/npcs/Youngster.png',
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
    image: 'assets/images/npcs/Biker Goon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Bill\'s Errand', 3), new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion, GameConstants.AchievementOption.less)]),
});
const ThreeIslandBiker2 = new NPC ('Biker', [
    'You know what sucks? The other islands are off limits for some arbitrary reason. There is no explanation. Just can\'t go there.',
    'Alright, you want the real truth? Some weird old dude told me this: "The other islands are locked behind part of a Questline. You can unlock it at a Bulletin Board."',
    'I don\'t know what half those words mean. All I know is I can\'t go back to Kanto with the rest of the gang. This sucks.',
], {
    image: 'assets/images/npcs/Biker Goon.png',
    requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), new QuestLineStepCompletedRequirement('Celio\'s Errand', 5 , GameConstants.AchievementOption.less)]),
});
const ThreeIslandBiker3 = new NPC ('Biker', [
    'You know what sucks? The other islands are off limits for some arbitrary reason. There is no explanation. Just can\'t go there.',
    'Wait, you got to them? Good for you. Not that it matters to me, I\'m still stuck here. This sucks.',
], {
    image: 'assets/images/npcs/Biker Goon.png',
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
    '<img src="assets/images/items/quest/Celios_Errand_Ruby.png">',
    '<i>You found a Ruby!</i>',
],
{ requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 3), new QuestLineStepCompletedRequirement('Celio\'s Errand', 4, GameConstants.AchievementOption.less )]) });
const SeviiLorelei = new NPC ('Lorelei', [
    'Thank you. But this is awful... I was born and raised here on these islands. I had no idea that those horrible criminals were loose here…',
], {
    image: 'assets/images/npcs/Lorelei.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 6), new QuestLineStepCompletedRequirement('Celio\'s Errand', 8, GameConstants.AchievementOption.less)]),
});
const SeviiGideon1 = new NPC ('Gideon', [
    'I can\'t figure out how I\'m supposed to get inside. Let me tell you, I found this place. Don\'t look so envious, will you?',
], {
    image: 'assets/images/npcs/Scientist Gideon.png',
    requirement: new QuestLineStepCompletedRequirement('Celio\'s Errand', 7, GameConstants.AchievementOption.less),
});
const SeviiGideon2 = new NPC ('Gideon', [
    'Fufu... Fufufufu... I guessed right. I was right in tailing you! I knew there was a Sapphire here, so it belongs to me! I\'ll sell it to Team Rocket for serious money.',
    '...D-don\'t glare at me like that! If you want it back, why don\'t you go get it after I sell it? I\'ll even tell you one of the passwords to Team Rocket\'s Warehouse. The Warehouse password I know is "Yes, nah, Chansey." I\'m done. Don\'t think badly of me!',
], {
    image: 'assets/images/npcs/Scientist Gideon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Celio\'s Errand', 7), new QuestLineStepCompletedRequirement('Celio\'s Errand', 9, GameConstants.AchievementOption.less)]),
});
const SixIslandSeviiRoamerNPC = new RoamerNPC('Bug Catcher John', [
    'Apparently some kid released one of his Pokémon around here. That Pokémon, its partner, and for whatever reason, the Legendary Beasts from Johto have been seen roaming on {ROUTE_NAME}.',
], GameConstants.Region.kanto, RoamingPokemonList.findGroup(GameConstants.Region.kanto, GameConstants.KantoSubRegions.Sevii4567), 'assets/images/npcs/Bug Catcher.png', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion));
const AlteringCaveRuinManiac1 = new NPC ('Ruin Maniac', [
    'Hello. You want to know what I\'m doing in this pointless dead end cave?',
    'Well, I\'m trying to dig to a secluded island north of here. I\'ve heard there are some unusual Pokémon there.',
    'Want to help me? No? Ah, you\'re busy dealing with a group of Team Rocket? Well, I wish you luck with that',
    'Once I finish it you\'ll have a way to get to get to that island too, so make sure to come back later!',
], {
    image: 'assets/images/npcs/Ruin Maniac gen3.png',
    requirement: new QuestLineCompletedRequirement('Celio\'s Errand', GameConstants.AchievementOption.less),
});
const AlteringCaveRuinManiac2 = new NPC ('Ruin Maniac', [
    'Wow, that was some back breaking work... But I have done it!',
    'I\'ve dug a tunnel to Pinkan Island! Though, I think I\'ll need to rest for a while first... You go on ahead.',
], {
    image: 'assets/images/npcs/Ruin Maniac gen3.png',
    requirement: new QuestLineCompletedRequirement('Celio\'s Errand'),
});
const ValenciaProfIvy = new NPC ('Prof. Ivy', [
    'Hello again! I see you too found a way around the giant cliff.',
    'On this island, Pokémon have changed over the years. I am here to study them.',
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
    image: 'assets/images/npcs/Pinkan Jessie & James.png',
});

const ThemeparkTeamRocket2 = new NPC('Jessie & James', [
    'Whoa! An actual Pinkan Berry! Now our evil plo- plan! Definitely not evil, our very helpful and good plan!...Ahem. Our plan can now proceed.',
    'Now we can get us some Pinkan\'s for the theme park! Would you mind defeating 500 Pinkan Pokémon in the forest and out in the plains? We\'ll do the catching, you just need to beat \'em',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 1), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 2, GameConstants.AchievementOption.less)]),
    image: 'assets/images/npcs/Pinkan Jessie & James.png',
});

const ThemeparkTeamRocket3 = new NPC('Jessie & James', [
    'Nice! Well, it would be nice. Now we have all these berries and Pinkan Pokémon, but nowhere to put \'em all!',
    'We need a bunch of Pixie Plates, and we need some Fairy Gems to help...uh...pay off the contractor?',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 2), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 3, GameConstants.AchievementOption.less)]),
    image: 'assets/images/npcs/Pinkan Jessie & James.png',
});

const ThemeparkTeamRocket4 = new NPC('Jessie and James', [
    'Hahahaha! Now our plan can really start! Prepare for trouble, and make it double, because you just built us a profit machine!',
    'We\'re going to make these Pinkan Pokémon perform silly routines and make us a ton of money, no days off for these suckers!',
    'What\'s that? You\'re gonna stop us!? Heh, yeah right! Bring it on twerp!',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 3), new QuestLineStepCompletedRequirement('Team Rocket\'s Pinkan Theme Park', 5, GameConstants.AchievementOption.less)]),
    image: 'assets/images/npcs/Pinkan Jessie & James.png',
});

const Informant1 = new NPC('Informant', [
    '<i>In a shady warehouse, you find the informant. He is a Mr. Mime, and he doesn\'t seem willing to divulge the information you need.</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Mime Interview.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 2), new QuestLineStepCompletedRequirement('Detective Pikachu', 4, GameConstants.AchievementOption.less)]),
});
const Informant2 = new NPC('Informant', [
    '<i>The Mr. Mime signals to you that this is an illicit drug called R. It is frequently used in the underground fighting rings near the Battle Frontier.</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Mime Interview.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 4), new QuestLineStepCompletedRequirement('Detective Pikachu', 6, GameConstants.AchievementOption.less)]),
});

const Mewtwo1 = new NPC('Mewtwo', [
    'You were wise to seek me out. Howard Clifford has been deceiving you. He is the one making the R drug, and....',
    '<i>A sphere of energy envelops Mewtwo, and he is dragged away by some sort of helicopter. The helicopter has a logo on it: Clifford Industries!</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Possessed Mewtwo.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Detective Pikachu', 10), new QuestLineStepCompletedRequirement('Detective Pikachu', 12, GameConstants.AchievementOption.less)]),
});

const Mewtwo2 = new NPC('Mewtwo', [
    'Thank you for your help. I have little to offer you in return, but perhaps this will help.',
    'I found Detective Pikachu\'s partner some days ago injured on the side of the road, and have nursed him back to health. I hope this reunion will suffice.',
], {
    image: 'assets/images/npcs/specialNPCs/Possessed Mewtwo.png',
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
], {image: 'assets/images/pokemon/21.01.png'});

const NewIslandJessieAndJames = new RoamerNPC('Jessie and James',
    ['Mewtwo\'s Clones have escaped and are Roaming freely across Kanto. Will you help us track them down? It\'s for a good cause, we swear.'],
    GameConstants.Region.kanto, 0, 'assets/images/npcs/Jessie and James.png',
    new ClearDungeonRequirement(1,  GameConstants.getDungeonIndex('New Island'))
);

const NewIslandAsh1 = new NPC('Ash Ketchum',
    ['Mewtwo has created an army of Clones. Please help me fight them, I have to save Pikachu!'],
    {
        image: 'assets/images/npcs/Ash Ketchum.png',
        requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('New Island'), GameConstants.AchievementOption.less),
    }
);

const NewIslandAsh2 = new NPC('Ash Ketchum',
    ['There are still Clones left in Mewtwos army! Help me fight them!'],
    {
        image: 'assets/images/npcs/Ash Ketchum.png',
        requirement: new MultiRequirement([new ClearDungeonRequirement(1,  GameConstants.getDungeonIndex('New Island')), new ClearDungeonRequirement(10, GameConstants.getDungeonIndex('New Island'), GameConstants.AchievementOption.less)]),
    }
);

const KantoSafariRanger = new SafariPokemonNPC('Safari Ranger', [
    'All sorts of unique Pokémon can be found in the Safari Zone!',
], GameConstants.Region.kanto, 'assets/images/npcs/Pokémon Breeder (male).png');

const BugCatcherPinsir = new NPC('Bug Catcher Michel', [
    'I heard there was a stone hidden in the Safari Zone that makes Pinsir stronger!',
    'But... I don\'t have a high enough Safari Level to find it.',
], {image: 'assets/images/npcs/Bug Catcher.png', requirement: new MaxRegionRequirement(GameConstants.Region.kalos)});

const CandyMan = new NPC('The Candy Man', [
    'I sure do love candy. The rarer, the better!',
    'I\'ve got a real <b>SWEET-TOOTH</b>',
]);

const SpeedyRunner = new NPC('Speedy Runner', [
    'I don\'t have time to listen to people explain stuff I already know.',
    'Some old man tried to teach me how to catch Pokémon earlier. I just shouted',
    '<b>HOW-BLU-COIN?</b>',
    'at him and left.',
], {image: 'assets/images/npcs/Jogger.png'});

const UnrivaledBlue = new NPC('Blue', [
    'So, you said you want to know where you might find Mewtwo\'s Mega Stones, right?',
    'Well, you\'re in luck! I was talking to an old rival of mine the other day, and she said she was looking for Mewtwo, and that she already had two of its Mega Stones. Unfortunately for her, they were the same one.',
    'Not much use in having two of the same Mega Stone, so she might be willing to give one up. If you want to find her, you should check out Cerulean Cave.',
], {
    image: 'assets/images/npcs/Blue-lgpe.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 2), new QuestLineStepCompletedRequirement('An Unrivaled Power', 4, GameConstants.AchievementOption.less)]),
});

const UnrivaledGreen1 = new NPC('Green', [
    '<i>Ow! You were hit by a low-flying Poké Ball!</i>',
    'Oh, whoops! You\'re not a Pokémon! Sorry, it\'s so dark in here, I saw you and thought you were some kind of Pokémon.',
    'Well, uh... nice to meet you. I\'m Green! So hey, I\'m just curious... Are you here because you\'re also looking for... y\'know, something special?',
    'R-right! Mewtwo! ...Drat, so you knew about it already, huh.......',
    'Whaaaaaaaaaat?! You\'ve already caught it?! Hey, no fair! I was planning on catching it first!',
], {
    image: 'assets/images/npcs/Green.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 4), new QuestLineStepCompletedRequirement('An Unrivaled Power', 6, GameConstants.AchievementOption.less)]),
});

const UnrivaledGreen2 = new NPC('Green', [
    'Wow, you\'re strong! Well, I guess that\'s that. Here, you can have this.',
    '</i></br><img src="assets/images/megaStone/Mewtwonite_X.png"/></br><i>You obtained the Mewtwonite X!</i>',
    'Oh, I know! Why don\'t you become one of my Pokémon, together with Mewtwo?',
    '<i>A Poké Ball came flying at you!</i>',
    '<i>A Poké Ball came flying at you!</i>',
    'Hee hee hee... <i>A Poké Ball came flying at you!</i>',
    '<i>A Poké Ball came flying at you!</i>',
    '<i>A Poké Ball came flying at you!</i> Think about it, ok?',
], {
    image: 'assets/images/npcs/Green.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 6), new QuestLineStepCompletedRequirement('An Unrivaled Power', 8, GameConstants.AchievementOption.less)]),
});

const AnomalyMewtwo1 = new NPC('Anomaly Mewtwo', [
    '<i>That child... She wished to possess me, like a mere animal. She would have cared little for my own desires. I wish only to live in peace, without being disturbed.</i>',
    '<i>You say you would help me? But you are no different. You even possess another of my kind. You do not fool me.</i>',
    '<i>I will leave this place now, to find what I desire. Do not follow me.</i>',
], {
    image: 'assets/images/pokemon/150.01.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 7), new QuestLineStepCompletedRequirement('An Unrivaled Power', 9, GameConstants.AchievementOption.less)]),
});

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
    [ViridianCityShop, TemporaryBattleList['Unrivaled Blue']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
        npcs: [ViridianCityOldMan1, ViridianCityOldMan2, ViridianCityOldMan3, UnrivaledBlue],
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
        ignoreAreaStatus: true,
    }
);
TownList['Cerulean City'] = new Town(
    'Cerulean City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [CeruleanCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cerulean City']), new MoveToDungeon(dungeonList['Cerulean Cave'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
        npcs: [CeruleanKantoBerryMaster, CeruleanSuperNerd, Mewtwo1, Mewtwo2, DetectiveRaichu],
    }
);
TownList['Bill\'s House'] = new Town(
    'Bill\'s House',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [TemporaryBattleList['Bill\'s Grandpa']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 25)],
        npcs: [BillsGrandpa1, BillsGrandpa2, BillsGrandpa3, BillsGrandpa4, BillsGrandpa5, BillsGrandpa6, BillsGrandpa7, BillsGrandpa8, BillsHouseEusine],
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
        npcs: [LavenderMrFuji, LavenderChanneler, LavenderShopper],
    }
);
TownList['Celadon City'] = new Town(
    'Celadon City',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [CeladonDepartmentStoreShop, CeladonCityShop, new MoveToDungeon(dungeonList['Rocket Game Corner'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)],
        npcs: [BigSpender, EggHuntErika, CandyMan],
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
TownList['Safari Zone'] = new Town(
    'Safari Zone',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new SafariTownContent()],
    {
        requirements: [new CustomRequirement(ko.pureComputed(() => +App.game.keyItems.hasKeyItem(KeyItemType.Safari_ticket)), 1, 'Obtain the Safari Ticket')],
        npcs: [KantoSafariRanger, BugCatcherPinsir],
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
        npcs: [KantoFossilNpc, CinnabarIslandResearcher],
    }
);
TownList['Indigo Plateau Kanto'] = new Town(
    'Indigo Plateau Kanto',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [GymList['Elite Lorelei'], GymList['Elite Bruno'], GymList['Elite Agatha'], GymList['Elite Lance'], GymList['Champion Blue'], pokeLeagueShop(), TemporaryBattleList['Unrivaled Red']],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.kanto, 23),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road')),
        ],
        npcs: [SpeedyRunner],
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
    [TemporaryBattleList['Blue 5']],
    {
        npcs: [LaprasGift],
    }
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
TownList['New Island'] = new DungeonTown(
    'New Island',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Kanto,
    [new SpecialEventRequirement('Mewtwo strikes back!')],
    [TemporaryBattleList['Ash Ketchum New Island']],
    {
        npcs: [NewIslandAsh1, NewIslandAsh2, NewIslandJessieAndJames],
    }
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
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)],
    [TemporaryBattleList['Unrivaled Green']],
    {
        npcs: [UnrivaledGreen1, UnrivaledGreen2, AnomalyMewtwo1],
    }
);
TownList['Ruby Path'] = new DungeonTown(
    'Ruby Path',
    GameConstants.Region.kanto,
    GameConstants.KantoSubRegions.Sevii123,
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
], 'Johto Berry Master');


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
    'Choose who you select carefully! Once you remove a Held Item from your Pokémon, the item will break!',
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
    image: 'assets/images/npcs/Hiker.png',
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
    'It sounds like you encountered a Time Distortion. Celebi is sensitive to time, it must be distressed. I have heard rumors of something similar going on at Tohjo Falls. Maybe if you clear up that Time Distortion, Celebi will want to come out to play?',
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
    image: 'assets/images/npcs/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Legendary Beasts'), new QuestLineStepCompletedRequirement('The Legendary Beasts', 2, GameConstants.AchievementOption.less )]),
});
const EcruteakPokéfan = new NPC('Pokéfan Derek', [
    'I saw it! Did you see it?! I saw you go in there! I don\'t know what you did in the Burned Tower, but three great Beasts came running out of there!',
    'It was a great sight to behold. They all went in different directions. I think they are just roaming the region now. My friend Trevor in Blackthorn City can tell you more.',
    'Eusine was here a second ago. He seemed very excited, but then he suddenly left. I don\'t know where he went, but he seemed to be particularly interested in the blue one.',
], {
    image: 'assets/images/npcs/PokéManiac.png',
    requirement: new QuestLineStepCompletedRequirement('The Legendary Beasts', 2),
}
);

const Zuki = new NPC('Kimono Girl Zuki', [
    'Professor Elm tells me you are a master trainer. Please, show me your skills by training your Pokémon.',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Whirl Guardian'), new QuestLineStepCompletedRequirement('Whirl Guardian', 1, GameConstants.AchievementOption.less)]),
});

const Naoko = new NPC('Kimono Girl Naoko', [
    'I seem to have lost my way in the forest. Can you show me the way out?',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 1), new QuestLineStepCompletedRequirement('Whirl Guardian', 3, GameConstants.AchievementOption.less)]),
});

const Miki = new NPC('Kimono Girl Miki', [
    'My sisters Zuki and Naoko tell me you have helped them, and I thank you. Please help find my other two sisters, Sayo and Kuni. Please accept this as a token of my gratitude.',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 3), new QuestLineStepCompletedRequirement('Whirl Guardian', 5, GameConstants.AchievementOption.less)]),
});

const Sayo = new NPC('Kimono Girl Sayo', [
    'Excuse me! I\'m stuck out here on the ice, can you give me a quick push?',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 4), new QuestLineStepCompletedRequirement('Whirl Guardian', 6, GameConstants.AchievementOption.less)]),
});

const Kuni = new NPC('Kimono Girl Kuni', [
    'I\'m supposed to meet my sisters, but the streets here just aren\'t safe! Can you protect me from Team Rocket?',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 6), new QuestLineStepCompletedRequirement('Whirl Guardian', 8, GameConstants.AchievementOption.less)]),
});

const KimonoGirlsWhirl = new NPC('Kimono Girls', [
    'With the power of the Tidal Bell, we call to Lugia! Guardian of the Whirl Islands!',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 8), new QuestLineStepCompletedRequirement('Whirl Guardian', 10, GameConstants.AchievementOption.less)]),
});

const KimonoGirlsEcruteak = new NPC('Kimono Girls', [
    'We have been watching you, and see that you have tamed the three Pokémon revived by Ho-Oh in the Burned Tower. Show us your power and we shall give you the Clear Bell, which will call Ho-Oh to the Tin Tower.',
], {
    image: 'assets/images/npcs/Kimono Girl.png',
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
    image: 'assets/images/npcs/Eusine.png',
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
    image: 'assets/images/npcs/Eusine.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eusine\'s Chase', 3), new QuestLineStepCompletedRequirement('Eusine\'s Chase', 5, GameConstants.AchievementOption.less )]),
});

const BlackthornJohtoRoamerNPC = new RoamerNPC('Pokéfan Trevor', [
    'On the news, they are getting more reports of roaming Pokémon appearing on {ROUTE_NAME}!',
], GameConstants.Region.johto, RoamingPokemonList.findGroup(GameConstants.Region.johto, GameConstants.JohtoSubRegions.Johto), 'assets/images/npcs/Pokéfan (male).png');

const RedOldManJohtoNPC = new NPC('Old Man', [
    'This young fellow comes here every day.',
    'He is a sore loser, poor boy. But he always comes back next day!',
    'But even though he is a sore loser, he will always give his opponent a shiny ball, as a reward for winning.',
], {
    image: 'assets/images/npcs/Old Man.png',
    requirement: new TemporaryBattleRequirement('Red'),
});

const TohjoFallsCelebiTimeDistortion = new NPC('Investigate the Time Distortion', [
    '<i>You are experiencing that same feeling again. Like you\'re not really here.</i>',
    '<i>A man sits in the back of the cave. He is listening to a portable radio.</i>',
    '<img src="assets/images/npcs/Rocket Boss Giovanni.png">',
    '...I don\'t know why you have come here. Anyway, I have to warn you that this is not a place for kids like you.',
    'You have a certain look... You\'re the kid who stood in front of me in Viridian City! I\'m on my way to Goldenrod City to answer the call and join my team. Are you going to get in my way?',
], {
    image: 'assets/images/npcs/other/Tohjo Falls.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Unfinished Business', 8), new QuestLineStepCompletedRequirement('Unfinished Business', 10, GameConstants.AchievementOption.less), new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tohjo Falls'))]),
});

const Conductor = new NPC('Conductor', [
    'We\'re working on construction of a Magnet Train line to shuttle people <b>east to Kanto</b>. Once it\'s completed, people will be able to get to Saffron City in record time!',
], { image: 'assets/images/npcs/Rail Staff.png' });

const ProfElm = new ProfNPC('Prof. Elm',
    GameConstants.Region.johto,
    'Oh, another regional Pokédex completed so soon?',
    'Amazing! Next stop is Hoenn, enjoy the sunshine while you\'re there!',
    'assets/images/npcs/Professor Elm.png');

const searchForClues = new NPC('Search For Clues', [
    '<i>You look around the city in search of clues, and are set upon by a gang of angry Aipoms!</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Aipom Alley.png',
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
    [CherrygroveCityShop, TemporaryBattleList['Youngster Joey']],
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
    [GoldenrodDepartmentStoreShop, JohtoBerryMaster, new MoveToDungeon(dungeonList['Radio Tower']), TemporaryBattleList['Silver 4'], TemporaryBattleList['Aipom Alley'], TemporaryBattleList.Imposter, TemporaryBattleList['Possessed Mewtwo']],
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
    [new TemporaryBattleRequirement('Red Gyarados')]
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
    [],
    {
        npcs: [RedOldManJohtoNPC],
    }
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
    ItemList.Wonder_Chest,
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
const RoadsideStandShop = new Shop([
    ItemList['Probably Feebas'],
], 'Shady Deal');
const FortreeCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xClick,
    ItemList.Dowsing_machine,
    ItemList.LargeRestore,
    ItemList.Leaf_stone,
]);
const WindChimeShop = new Shop([
    ItemList['Probably Chimecho'],
], 'Shady Deal');
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
const OutskirtStandShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.SmallRestore,
    ItemList.MediumRestore,
    ItemList.LargeRestore,
    ItemList.Wonder_Chest,
]);
const PhenacCityShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_egg,
    ItemList.Wonder_Chest,
]);
const AgateVillageShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Lucky_incense,
    ItemList.Token_collector,
    ItemList.Dowsing_machine,
    ItemList.Wonder_Chest,
]);
const GateonPortShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.xAttack,
    ItemList.xClick,
    ItemList.Lucky_incense,
    ItemList.Miracle_Chest,
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
], 'Hoenn Berry Master');

//Hoenn Contest Shop
const HoennContestShop = new Shop([
    ItemList['Tangela (Pom-pom)'],
    ItemList['Goldeen (Diva)'],
    ItemList['Weepinbell (Fancy)'],
    ItemList['Onix (Rocker)'],
    ItemList['Dugtrio (Punk)'],
    ItemList['Gengar (Punk)'],
    new PokeballItem(GameConstants.Pokeball.Ultraball, 20, GameConstants.Currency.contestToken, undefined, 'Ultra Ball'),
    new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 5, GameConstants.Currency.contestToken, 'Small Restore'),
    new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 10, GameConstants.Currency.contestToken, 'Medium Restore'),
    new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 30, GameConstants.Currency.contestToken, 'Large Restore'),
], 'Contest Shop', [PokemonContestController.requirements]);

//Hoenn Flute Master
const HoennFluteMaster = new GemMasterShop(GameConstants.GemShops.HoennFluteMaster);
const HoennStoneSalesman = new GemMasterShop(GameConstants.GemShops.HoennStoneSalesman, 'Stone Salesman', [new TemporaryBattleRequirement('Hoenn Stone Salesman')], true);

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

const HoennFossilNpc = new NPC('Laid-Back Angler', [
    'Every so often, I\'ll snag an old fossil from the seafloor. It weirds me out to think of all the Pokémon that used to crawl around the ocean so many years ago, but it also reminds me that life is fleeting and precious.',
    'So far I\'ve found two that I relate to, a kind of flower-looking thing and a one that looks like a bug pincer.',
    'I wonder what you\'ll feel the next time you find one.',
], {image: 'assets/images/npcs/Fisherman.png'});

const SlateportHoennRoamerNPC = new RoamerNPC('Reporter Gabby', [
    'Our sources indicate that roaming Pokémon are gathering on {ROUTE_NAME}!',
], GameConstants.Region.hoenn, RoamingPokemonList.findGroup(GameConstants.Region.hoenn, GameConstants.HoennSubRegions.Hoenn), 'assets/images/npcs/Reporter.png');

const SkepticalFisherman = new NPC('Skeptical Fisherman', [
    'There\'s some salesman offering rare fish east of New Mauville, out on the water.',
    'I\'m a bit skeptical of his wares, especially since his shop isn\'t on any maps.',
], {image: 'assets/images/npcs/Fisherman.png'});

const FallarborProfessorCozmo = new NPC('Prof. Cozmo', [
    'Oh! Welcome, welcome. Do you by any chance have any Meteorites? No? Ah well, I’m studying the Pokémon Deoxys and I’ve heard that a Meteorite can cause it to change forms!',
    'I’ve also heard that the Battle Frontier may have some secrets relevant to Deoxys and its forms… but I’m not strong enough to find out...'],
{requirement: new QuestLineStartedRequirement('The Delta Episode', GameConstants.AchievementOption.less),
});

const LavaridgeSootCollector = new NPC('Soot Collector', [
    'Blegh! I\'ve taken three soaks in the hot springs and I can still taste the soot!',
    'The Flute Trader in Fallarbor Town has been paying me to go collect soot to make Flutes, but I\'m sick of it.',
    'People say they have truly mystical powers, but that they require Gems of different types to use. Also, using more Flutes at the same time costs more Gems to use.',
]);

const RoadsideStandShadySalesman = new NPC('Shady Salesman', [
    'Have I got a deal just for you!',
    'I have spent weeks finding the perfect fishing spot for Feebas, and finally got some! For a special low price, I\'ll sell you one!',
    'All sales are final!',
], {image: 'assets/images/npcs/ShadySalesman.png'});

const FortreeWeatherman = new NPC('Weatherman', [
    'Castform is a very finicky Pokémon.',
    'It changes forms when the weather is drastically different.',
    'If you want to collect them all, wait for the weather to change.',
]);

const FortreeRanger = new NPC('Pokémon Ranger Catherine', [
    'Have you seen this? It\'s horrific. Absolutely despicable.',
    'Disposable Dowsing Machines! Who even came up with this?! People leave these everywhere. It\'s absolutely terrible for the environment. Some poor innocent Pokémon could choke on it!',
    'Please recycle your used Dowsing Machines.',
], {image: 'assets/images/npcs/Pokemon Ranger (female).png'});

const WindChimeShopShadySalesman = new NPC('Shady Salesman', [
    'Step right up! Get your Chimecho while they last! Chimecho, a very rare Pokémon indeed, with a voice that\'s both beautiful and powerful. Look closer! I see it bringing a smile to your face, just gazing into those loving eyes! They say these are the most gentle, healing eyes in the Pokémon kingdom.',
    'That\'s not all! Just look at the way Chimecho\'s tail swings and sways with the wind, like a weeping willow in a summer breeze. In really hot weather, it will act like a fan to help you cool off. And when it\'s cold outside, your Chimecho can wrap itself around your neck like a scarf, to keep you warm.',
    'And one more thing. It\'s not widely known, but it\'s a true fact; Chimecho are able to choose winning lottery tickets! Soo you see, my friend, just having a Chimecho with you, is a sure-fire ticket to happiness and success. Let Chimecho give you total peace and happiness, for a good price!',
], {image: 'assets/images/npcs/ShadySalesman.png'});

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

const Wallace1 = new NPC('Gym Leader Wallace', [
    'Ah, so you are the new trainer in the region? I\'ve heard tales of your exploits. My name is Wallace. I was once the Gym Leader of Sootopolis, but something came up. So now, I\'ve entrusted my mentor Juan with the Gym\'s operation.',
    'Groudon and Kyogre, the two Pokémon wreaking havoc in Sootopolis City, are considered to be Super-Ancient Pokémon. But there aren\'t just two Super-Ancient Pokémon. Somewhere, there is a Super-Ancient Pokémon named Rayquaza. It\'s said that it was Rayquaza that becalmed the two combatants in the distant past.',
    'I have heard that Rayquaza once lived high atop the Sky Pillar, maybe that\'s where it is now?',
], {image: 'assets/images/npcs/Wallace.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Weather Trio', 1), new QuestLineStepCompletedRequirement('The Weather Trio', 3, GameConstants.AchievementOption.less)]),
});

const Wallace2 = new NPC('Gym Leader Wallace', [
    'My eyes didn\'t deceive me. Thanks to your help, Sootopolis...',
    'No, all of Hoenn was saved. On behalf of the people, I thank you.',
    'Now that their battle is over, the Super-Ancient Pokémon have retreated to rest and recuperate. You will likely find Rayquaza back in the Sky Pillar.',
    'Kyogre and Groudon are rumored to live deep within this very cave, but they are unlikely to show themselves to any normal trainer. Maybe the champion of Hoenn could earn their respect.',
], {image: 'assets/images/npcs/Wallace.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Weather Trio', 4), new QuestLineStepCompletedRequirement('The Weather Trio', 6, GameConstants.AchievementOption.less)]),
});

const WeatherBattle1 = new NPC('The Super-Ancient Pokémon Clash', [
    '<i>Groudon and Kyogre have been awakened by the efforts of Team Magma and Team Aqua! They are engaged in a fierce battle which threatens to destroy Sootopolis City... and more!</i>',
    '<i>The locals in Sootopolis City take shelter from the raging battle. Some say that this sort of thing would never happen if Wallace was still around.</i>',
], {image: 'assets/images/npcs/other/WeatherBattle1.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Weather Trio'), new QuestLineStepCompletedRequirement('The Weather Trio', 1, GameConstants.AchievementOption.less)]),
});

const WeatherBattle2 = new NPC('The Super-Ancient Pokémon Clash', [
    '<i>Rayquaza appears above Kyogre and Groudon and utters a single intimidating roar. The battling Super-Ancient Pokémon stop their attacks, and a tense standoff ensues.</i>',
    '<i>After what seems like an eternity, the three Super-Ancient Pokémon seem to have come to an understanding. They each depart the city, and peace is restored.</i>',
], {image: 'assets/images/npcs/other/WeatherBattle2.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Weather Trio', 3), new QuestLineStepCompletedRequirement('The Weather Trio', 5, GameConstants.AchievementOption.less)]),
});

const MillenniumFest = new NPC('The Millennium Festival', [
    '<i>The Millennium Comet is about to make its long-awaited appearance in the sky again, supposedly granting the wishes of all those who see it in the skies above them.</i>',
    '<i>A festival celebrating the arrival of this comet is being held with rides, carnival games, and even a magic show by the Great Butler!</i>',
    '<i>The magic show features many exciting tricks performed by humans and Pokémon, but it looks like someone is crashing the party!</i>',
], {image: 'assets/images/npcs/other/Millennium Festival.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Wish Maker'), new QuestLineStepCompletedRequirement('Wish Maker', 1, GameConstants.AchievementOption.less)]),
});

const Butler1 = new NPC('Butler', [
    'I, the Great Butler, thank you for dealing with Team Rocket!',
    'I have been preparing for the Millennium Festival my whole life, and have big plans for the wish-granting powers it possesses.',
    'I have found what appears to be a crystalline cocoon that contains Jirachi, the Wish Pokémon! I would be honored if you would take this cocoon as thanks for helping me. Legend has it that Jirachi will appear for a trainer who is pure of heart and grant them a wish!',
    '<i>Butler gives you a crystalline cocoon containing Jirachi.</i>',
], {image: 'assets/images/npcs/Butler.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Wish Maker', 1), new QuestLineStepCompletedRequirement('Wish Maker', 3, GameConstants.AchievementOption.less)]),
});

const CocoonHatch = new NPC('Examine the Crystalline Cocoon', [
    '<i>The cocoon shifts, shimmers, and hatches to reveal Jirachi!</i>',
], {image: 'assets/images/npcs/other/Cocoon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Wish Maker', 4), new QuestLineStepCompletedRequirement('Wish Maker', 6, GameConstants.AchievementOption.less)]),
});

const Butler2 = new NPC('Butler', [
    'I, the Great Butler, thank you for saving me from the wrath of Meta Groudon.',
    'My wish was to resurrect Groudon for Team Magma, but it proved too difficult, and you have showed me that it would be irresponsible to put that much power in the hands of evil doers.',
    'I can try the experiment again using what was learned from the previous failure, but I will need your help. If we are successful, I will give control of the resulting Meta Groudon to you.',
    'To rebuild my machine, I will need a hundred power-generating Pokémon to run the machine, shiny pokemon to stabilize the energy matrix, and to conduct a new dig for fossilized Groudon materials. After that, I will need to calibrate the machine using DNA from Groudon itself.',
], {image: 'assets/images/npcs/Butler.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('A Meta Discovery'), new QuestLineStepCompletedRequirement('A Meta Discovery', 1, GameConstants.AchievementOption.less)]),
});

const Butler3 = new NPC('Butler', [
    'I, the Great Butler, thank you for all of your help in fulfilling my greatest wish!',
    'Please treat this Meta Groudon responsibly, and go forth to do great things!',
], {image: 'assets/images/npcs/Butler.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Meta Discovery', 2), new QuestLineStepCompletedRequirement('A Meta Discovery', 3, GameConstants.AchievementOption.less)]),
});

const ProfBirch = new ProfNPC('Prof. Birch',
    GameConstants.Region.hoenn,
    'That\'s another regional Pokédex completed! Fantastic.',
    'I really appreciate being able to see your outstanding progress, thank you! Sinnoh is next up.',
    'assets/images/npcs/Professor Birch.png');

const CoolTrainerDillan = new NPC('Cool Trainer Dillan', [
    'Hey newcomer! I see you are the Hoenn Champion. You must be an amazing Trainer!',
    'At the Battle Frontier, you can test your skills against Trainers from all over the world.',
    'Since some of these Trainers come from far away, you may see Pokémon that you might not be able to catch yet.',
    'But don\'t worry, catching them all is only a matter of time. Just keep exploring and having fun and you\'ll encounter lots of different Pokémon, either in form, color, or even evolutions!',
], {image: 'assets/images/npcs/Cooltrainer (male).png',
});

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
], {image: 'assets/images/npcs/Ruin Maniac gen3.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 0), new QuestLineStepCompletedRequirement('The Three Golems', 1, GameConstants.AchievementOption.less)]),
});

const BrailleEnthusiast2 = new NPC('Braille Enthusiast', [
    'There are a few carvings inside this maze. The carving with five dots on the top row says "LEFT".',
    'The carving with nine dots on the top row says "STRAIGHT".',
    'The carving with six dots on the top row says "RIGHT".',
    'If you get totally lost, just wander around. You will find the right path eventually.',
], {image: 'assets/images/npcs/Ruin Maniac gen3.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Three Golems', 1), new QuestLineStepCompletedRequirement('The Three Golems', 6, GameConstants.AchievementOption.less)]),
});

const BrailleEnthusiast3 = new NPC('Braille Enthusiast', [
    'The first carving says DESERT. There is a desert near Route 111, right?',
    'The second carving says ISLAND. There are a lot of islands on Route 105.',
    'The third carving says ANCIENT. I remember seeing some ancient ruins on Route 120.',
], {image: 'assets/images/npcs/Ruin Maniac gen3.png',
    requirement: new QuestLineStepCompletedRequirement('The Three Golems', 6),
});

const Television1 = new NPC('Watch Television', [
    'Reports are coming in from across Hoenn that two fast-moving Pokémon have appeared!',
    'These elusive Pokémon are Blue and Red and White all over, and our reporters will give you the latest updates as we try to discern their identity and location!',
],  {requirement: new MultiRequirement([new QuestLineStartedRequirement('The Eon Duo'), new QuestLineStepCompletedRequirement('The Eon Duo', 1, GameConstants.AchievementOption.less)]),
});

const Television2 = new NPC('Watch More Television', [
    'A hot new vacation spot is waiting for you!',
    'Come to the Hoenn Pokémon League to claim your free Eon Ticket today!',
    'Supplies are limited, reserve your spot on a cruise to the Southern Island!',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 0), new QuestLineStepCompletedRequirement('The Eon Duo', 2, GameConstants.AchievementOption.less)]),
});

const TicketClaim = new NPC('Contest Attendant', [
    'Thank you for reserving your Eon Ticket!',
    'To claim the ticket, all you have to do is go to your Start Menu, select "Save", and enter the following code in the "Enter Code..." box:',
    'EON-TICKET',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 1), new QuestLineStepCompletedRequirement('The Eon Duo', 3, GameConstants.AchievementOption.less)]),
});

const SurferDave = new NPC('Surfer Dave', [
    'What\'s up? I got here using my Eon Ticket, what about you?']
);

const SeaMauvilleRocket1 = new NPC('Rocket Grunt', [
    'The boss said to take a look around here and call him if I found anything cool!',
], {
    image: 'assets/images/npcs/Team Rocket Grunt (male).png',
    requirement: new TemporaryBattleRequirement('Delta Giovanni', 1, GameConstants.AchievementOption.less),
});

const SeaMauvilleRocket2 = new NPC('Rocket Grunt', [
    'I can\'t believe you beat up the boss! Better get out of here before he comes back!',
], {
    image: 'assets/images/npcs/Team Rocket Grunt (male).png',
    requirement: new TemporaryBattleRequirement('Delta Giovanni'),
});

const SouthernIsland1 = new NPC('Explore the Southern Island', [
    '<i>The Southern Island is a small but lush forest. The clearing near the center of the island is the perfect place for a tired Pokémon to rest.</i>',
    '<i>Latios and Latias are resting in the clearing. You can approach one of them, but the other will probably flee.</i>',
],  {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 2), new QuestLineStepCompletedRequirement('The Eon Duo', 3, GameConstants.AchievementOption.less)]),
});

const Cozmo1 = new NPC('Dr. Cozmo', [
    'Reports are coming in from the Mossdeep Space Center that a meteor is headed our way!',
    'It\'s on a collision course with an island north of Route 131. I\'ve been tasked with finding a way to stop this meteor.',
    '$playername$, can you go to that island and look for anything that might be able to help us?',
], {image: 'assets/images/npcs/Dr Cozmo.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Delta Episode'), new QuestLineStepCompletedRequirement('The Delta Episode', 1, GameConstants.AchievementOption.less)]),
});

const Zinnia1 = new NPC('Mysterious Figure', [
    'You must be $playername$, the trainer Wa... People are talking about.',
    'If you\'re here, it means you\'ve heard the same news that I have: a meteor is headed towards this island.',
    'Who am I? My name is Zinnia, nice to meet you. I have a certain.... connection to the Pokémon of this region, but we can get into that later.',
    'For now, I think we can help each other out. I need you to introduce me to your rival, May. If you do that, I\'ll tell you my plan to stop the meteor.',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 0), new QuestLineStepCompletedRequirement('The Delta Episode', 2, GameConstants.AchievementOption.less)]),
});

const DeltaMay1 = new NPC('May', [
    'Funny meeting you here, $playername$! I was just going to meet up with Professor Birch to discuss this weird stone I found. It seems to have a powerful energy hidden inside. I wonder if it\'s one of the Key Stones I\'ve heard let Pokémon Mega Evolve?',
    'Who\'s this? You have a new friend? Zinnia is her name? Nice to meet you!',
    'Tell you what, I\'ll show Zinnia around town for a little bit, you should go see the Professor. He had some interesting news.',
    '<i>Zinnia and May head off to May\'s house, discussing Pokémon.',
], {image: 'assets/images/npcs/May.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 1), new QuestLineStepCompletedRequirement('The Delta Episode', 3, GameConstants.AchievementOption.less)]),
});

const NewsBirch = new NPC('Discuss the news with Dr. Birch', [
    'Hello again, $playername$! It\'s been a while since you last visited!',
    'There\'s been a lot of hubbub and excitement in the region since the Mossdeep Space Center announced that a meteor was headed our way. This has lead to a lot of new faces in Hoenn.',
    'Some of them have been carrying small but powerful items known as Key Stones. These have the power to let Pokémon Mega Evolve! You may have experienced something like that in Kalos, but it\'s new to us here.',
    'Keep an eye out for new faces in familiar places!',
], {image: 'assets/images/npcs/Professor Birch.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 2), new QuestLineStepCompletedRequirement('The Delta Episode', 4, GameConstants.AchievementOption.less)]),
});

const DeltaMay2 = new NPC('May', [
    'What\s the big idea, $playername$?!?',
    'Your new friend waited until my back was turned, stole my Key Stone, and skipped town!',
    'She was headed towards Petalburg City. You better help me get my Key Stone back!',
], {image: 'assets/images/npcs/May.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 3), new QuestLineStepCompletedRequirement('The Delta Episode', 5, GameConstants.AchievementOption.less)]),
});

const DeltaSteven1 = new NPC('Ringing Holo Caster', [
    'Hello? Is that you, $playername$? It\'s me. Steven. Have you been doing well?',
    'I imagine you must be quite shocked. This is a communication mode that Devon is still currently developing. It comes installed on every Holo Caster. I thought I would only use it if I needed to contact you urgently.',
    'But it looks as though that time has already come. I\'m sorry to ask this of you, but I need your help getting some materials for Devon Corporation\'s new rocket project. We think we can help Dr. Cozmo stop the incoming meteor.',
    'Our company\'s records indicate that a meteor landed in Granite Cave thousands of years ago. Can you search the area for fragments of that meteor?',
    'Oh, and my father was asking about you. Look out for him in Rustboro City.',
], {image: 'assets/images/npcs/Steven.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 5), new QuestLineStepCompletedRequirement('The Delta Episode', 7, GameConstants.AchievementOption.less)]),
});

const DeltaWally1 = new NPC('Wally', [
    'Thank you so much, $playername$... those strange people suddenly attacked me, demanding that I hand over my Key Stone! The truth is that I couldn\'t give it to them even if I wanted to.',
    'My Key Stone is gone. I left it in the house when I went out, and it just disappeared. What in the world is going on? If someone like that ever shows up again... I\'ve gotta protect my mom and dad. You be careful, too!',
], {image: 'assets/images/npcs/Wally.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 5), new QuestLineStepCompletedRequirement('The Delta Episode', 7, GameConstants.AchievementOption.less)]),
});

const Zinnia2 = new NPC('Zinnia', [
    'Hm, hm, hm. Well, seems like it\'s true. It really is just like the wall painting there. This one shows Primal Reversion... While that one shows Mega Evolution... I guess that proves it once and for all.',
    'Our great ancestors once lived here, too. The ancestors who passed down through me the knowledge of how to protect the world... How to avert the threat that will appear from space, as long was foretold... From a place higher even than the heavens...',
    'What is it, Aster? Oh?',
    'We do seem to meet an awful lot, $playername$. Are you also interested in this old painting? Or are you here for something else? For one of the Meteorite Shards that can serve as a source of power for the Legendary Pokémon that lives in the heavens above.',
    'Either way... You know I adore you. That\'s it! I can\'t help it! I have to battle you! I\'ll play nice, though, and ask first... You\'re ready to battle me, right?',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 7), new QuestLineStepCompletedRequirement('The Delta Episode', 9, GameConstants.AchievementOption.less)]),
});

const Zinnia3 = new NPC('Zinnia', [
    'That glittering Meteorite that you\'ve got there... Hmm... It\'s sure giving off some vibes. I\'d keep a tight hold on it if I were you, along with that shard I just gave you.',
    'Hey... The actions that you\'re taking now... Are they based on the ideals you cling to? Or are they based on actual truths? And if they are... How much of the truth do you think you know?',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 9), new QuestLineStepCompletedRequirement('The Delta Episode', 11, GameConstants.AchievementOption.less)]),
});

const Cozmo2 = new NPC('Dr. Cozmo', [
    'WHAT? Recheck the data! Update the course calculations and confirm the new trajectory! But changing trajectories midflight... It\'s almost like it\'s alive.',
    'Oh, $playername$, I didn\'t see you there. And you brought the Meteorite Shard with you. Well done!',
    'Thank you for bringing it, this will really help our plan to stop the meteor. Our current plan involves using the Infinity Energy within our rocket, combined with the life energy of humans found in Key Stones.',
    'We will start off by artificially replicating the massive energy that is triggered at the time of Mega Evolution! We will fire the energy produced from our rocket into space... And create a "warp hole".',
    'By creating a warp hole in the path of the incoming meteoroid, we hope to be able to transport it somewhere far away from here....',
    '<i>Zinnia bursts into the room and interrupts Dr. Cozmo!<i>',
], {image: 'assets/images/npcs/Dr Cozmo.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 10), new QuestLineStepCompletedRequirement('The Delta Episode', 12, GameConstants.AchievementOption.less)]),
});

const Zinnia4 = new NPC('Zinnia', [
    'So this is what has come of human technology and of hope and blood and sweat and tears and... Well, the list gets kinda long and boring.',
    'But it contains everything, huh? I know all about it. About just what kinda energy you\'re using to fuel this rocket thing... The abominable technology humanity first thought up 3,000 years ago!',
    'So you\'re once again planning to claim that this is best for humanity, or best for the whole darn world? It\'s a snap of your fingers to repeat the sins of the past.',
    'Worse, if what I overheard is true then this time, you\'re about to commit an error more abominable than before!',
    'Instead of trying to make something outta nothing, you\'d rather repeat the mistakes of the past, straight up? No, you\'re gonna add new mistakes on top—that really takes the cake. You guys need some imagination.',
    '<i>Zinnia storms out of the building.</i>',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 11), new QuestLineStepCompletedRequirement('The Delta Episode', 13, GameConstants.AchievementOption.less)]),
});

const Cozmo3 = new NPC('Dr. Cozmo', [
    'That was.... quite the interruption.',
    'But there\'s no need to worry. Based on our theory, we can at least guarantee that we will be sending the meteor away from our planet if the plan is successful. Not sure where it will go.',
    'However, we\'ve realized that we will need more energy than originally anticipated to control the process properly... I\'m sorry to ask this of you, but we will need one more Meteorite Shard. There should be one at Meteor Falls.',
], {image: 'assets/images/npcs/Dr Cozmo.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 12), new QuestLineStepCompletedRequirement('The Delta Episode', 14, GameConstants.AchievementOption.less)]),
});

const DraconidElder1 = new NPC('Draconid Elder', [
    'Yes, I am one of the Draconid people. One of those ancient folk tasked with passing down the knowledge of Mega Evolution—with the great lore of Lord Rayquaza, who was the beginning of all.',
    'Since times long gone, Hoenn has repeatedly suffered great disasters. At times, the destruction took the form of a huge meteoroid, which fell upon our land from distant space.',
    'At other times, the Primal Reversion of our own super-ancient Pokémon brought us to the brink of destruction. Each time, Lord Rayquaza has saved us from doom.',
    'The chosen Lorekeeper, standing before a stone that shone with rainbow light, offered up a wish to the great one. And Lord Rayquaza\'s body was suffused with a brilliant light and transformed.',
    'In its transformed state, Rayquaza\'s power was more devastating than ever before, overcoming even the super-ancient Pokémon with all their primal power.',
    'I want to tell you more, but first you must prove you are worthy.',
], {image: 'assets/images/npcs/Draconid Elder.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 14), new QuestLineStepCompletedRequirement('The Delta Episode', 16, GameConstants.AchievementOption.less)]),
});

const DraconidElder2 = new NPC('Draconid Elder', [
    'Zinnia is the current Lorekeeper of our people, who has inherited the knowledge and power to summon Lord Rayquaza when disaster imperils the world.',
    'She has long known about the meteor approaching the planet, and has been trying to draw out the power of Rayquaza. Part of this plan was working with Teams Aqua and Magma to revive the Super-Ancient Pokémon.',
    'She taught them the secrets needed to bring back these threats and summon the great Dragon itself. And now it seems she travels the land, scouring the world for Key Stones.',
    'I do not know what you plan to do, but Zinnia will continue to follow her convictions to the very end. This may cost her her life, but she is dedicated. Please, help her if you can.',
    'Take this Meteorite Shard, and please hurry! After you have helped Zinnia, please come back here and find me.',
], {image: 'assets/images/npcs/Draconid Elder.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 16), new QuestLineStepCompletedRequirement('The Delta Episode', 18, GameConstants.AchievementOption.less)]),
});

const DraconidElder3 = new NPC('Draconid Elder', [
    'Thank you for everything you\'ve done for the Draconid people, Hoenn, and me personally.',
    'You will forever be a friend of the Draconid people.',
], {image: 'assets/images/npcs/Draconid Elder.png',
    requirement: new TemporaryBattleRequirement('Mega Draconid Elder'),
});

const Zinnia5 = new NPC('Zinnia', [
    'Thank you, dear. Now then... That is an impressive machine. Snap your fingers, the asteroid vanishes, and we all live happily ever after? It\'s a good thing you saved it from those Aqua and Magma thugs.',
    'This thing is the best hope we have of saving this planet and everything on it. But you know... It could also be the worst tragedy imaginable for some other world and everything on it.',
    'My people have passed down a story of another world, much like our own. In this other world, the world took a different path. The war in Kalos 3000 years ago never happened, and Mega Evolution is not known there.',
    'If a meteor appeared in that world because of the use of this warp hole technology, they would be unable to save themselves! We can\'t do that to the other world! We have to solve this problem a different way!',
    '<i>Zinnia smashes the complex machines Dr. Cozmo has been working on and flees.</i>',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 19), new QuestLineStepCompletedRequirement('The Delta Episode', 21, GameConstants.AchievementOption.less)]),
});

const Archie = new NPC('Archie', [
    'Baah, what\'s the use in fighting you?',
    'That Dragon twerp stole my Key Stone, there\'s no way I can win without it. Looks like you\'re after her too, huh?',
    'Last I saw, she was headed towards Mt. Chimney. Hopefully she messes up Maxie\'s day too! At least she didn\'t take the.... uuh...',
    'Never you mind that, get outta here!',
], {image: 'assets/images/npcs/Aqua Leader.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 21), new QuestLineStepCompletedRequirement('The Delta Episode', 23, GameConstants.AchievementOption.less)]),
});

const Maxie = new NPC('Maxie', [
    'There\'s no way I can beat you!',
    'Zinnia.... I thought I could trust her after she found the Red Orb for me, but I guess not. She stole my Key Stone!',
    'Oh uh... forget I said that. Zinnia\'s already gone. I have no idea where she went, but another Draconid or even an ancient Sootopolitan might know. Maybe try talking to Wallace?',
], {image: 'assets/images/npcs/Magma Leader.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 23), new QuestLineStepCompletedRequirement('The Delta Episode', 25, GameConstants.AchievementOption.less)]),
});

const Wallace3 = new NPC('Gym Leader Wallace', [
    'Hello again, $playername$. I can see by the look on your face that this is not just a social call.',
    '....Yes I do know about Zinnia, she is a Draconid and this generation\'s Lorekeeper. She may be acting in ways you disagree with, but everything she\'s doing is for a reason.',
    'I do know where she is, but I can\'t just tell you. If you can defeat me, you may be worthy of knowing.',
], {image: 'assets/images/npcs/Wallace.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 24), new QuestLineStepCompletedRequirement('The Delta Episode', 26, GameConstants.AchievementOption.less)]),
});

const Zinnia6 = new NPC('Zinnia', [
    '<i>Your Rayquaza approaches Zinnia.</i>',
    'Yes! Finally! The moment I have been waiting for! I have gathered enough Key Stones to draw out the latent power in Rayquaza and stop the impending disaster!',
    'Huh?! H-how can this be? I did everything I was supposed to, and you\'re not changing! <b>Come on! Do it! Mega Evolve! Why?!</b>',
    'Is it... you\'re not here for me? You\'re here for $playername$? That\'s no fair! I\'m the chosen one!',
    '<i>You notice the Meteorite Shards you have been carrying have fused together and are emitting a powerful glow.</i></br><img src="assets/images/megaStone/Meteorite.png"/>',
], {image: 'assets/images/npcs/other/RayquazaEncounter.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 28), new QuestLineStepCompletedRequirement('The Delta Episode', 30, GameConstants.AchievementOption.less)]),
});

const Zinnia7 = new NPC('Zinnia', [
    'You did it! Your bond with Rayquaza is strong enough to bring out its Mega Evolution!',
    'Here, take this space suit! I put it together from parts I... Er... Borrowed from the Aqua and Magma Hideouts. It should keep you safe while you accompany Mega Rayquaza into space.',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 30), new QuestLineStepCompletedRequirement('The Delta Episode', 32, GameConstants.AchievementOption.less)]),
});

const Cozmo4 = new NPC('Dr. Cozmo', [
    'You did it! You saved Hoenn and maybe the whole planet by destroying the meteor!',
    'We have been working on repairing all the damage your... friend did when she was here last. The rocket system here at the Space Center should be able to take you up to the debris field the meteor left behind any time you want!',
], {image: 'assets/images/npcs/Dr Cozmo.png',
    requirement: new QuestLineStepCompletedRequirement('The Delta Episode', 32),
});

const ShoalFisherman1 = new NPC('Shoal Fisherman', [
    'Hi! I\'m collecting shells while I fish. There\'s a lot of neat stuff lying around here.',
], {
    image: 'assets/images/npcs/Fisherman.png',
    requirement: new TemporaryBattleRequirement('Shoal Fisherman', 1, GameConstants.AchievementOption.less),
});

const ShoalFisherman2 = new NPC('Shoal Fisherman', [
    'Oh well. Back to fishin\'.',
], {
    image: 'assets/images/npcs/Fisherman.png',
    requirement: new TemporaryBattleRequirement('Shoal Fisherman'),
});

const GraniteCamper1 = new NPC('Camper', [
    'This is a prime camping spot! Gem and mineral hunters come from all over the world to explore here!',
], {
    image: 'assets/images/npcs/Camper.png',
    requirement: new TemporaryBattleRequirement('Delta Brock', 1, GameConstants.AchievementOption.less),
});

const GraniteCamper2 = new NPC('Camper', [
    'Wow! I can\'t believe <b>THE</b> Kanto Gym Leader Brock came all this way! What an honor to meet him!',
], {
    image: 'assets/images/npcs/Camper.png',
    requirement: new TemporaryBattleRequirement('Delta Brock'),
});

const IcyBoulder = new NPC('Icy Boulder', [
    '<i>A large, icy boulder sits in the corner of the cave. Maybe you can move it when you\'re stronger?</i>',
], {
    requirement: new TemporaryBattleRequirement('Icy Boulder', 1, GameConstants.AchievementOption.less),
});

const DeltaSteven2 = new NPC('Steven', [
    'You\'re a rather impressive trainer $playername$, but there\'s no way you can beat me. Come back when you\'re stronger.',
], {
    image: 'assets/images/npcs/Steven.png',
    requirement: new TemporaryBattleRequirement('Delta Steven', 1, GameConstants.AchievementOption.less),
});

const DeltaSteven3 = new NPC('Steven', [
    'Heh... You know, this experience really brought it home for me again that there is still so much about this world that I do not know. Thank you, $playername$ for all your help.',
], {
    image: 'assets/images/npcs/Steven.png',
    requirement: new TemporaryBattleRequirement('Delta Steven'),
});

const HoennStoneSalesman1 = new NPC('Stone Salesman', [
    'I\'m hunting for rare stones! If I find any extras, I\'ll sell you some!',
], {
    requirement: new TemporaryBattleRequirement('Hoenn Stone Salesman', 1, GameConstants.AchievementOption.less),
});

const HoennStoneSalesman2 = new NPC('Stone Salesman', [
    'I\'m selling some unusual stones for gems. Let me know if any of them strike your fancy!',
], {
    requirement: new TemporaryBattleRequirement('Hoenn Stone Salesman'),
});

const MrStone1 = new NPC('Mr. Stone', [
    'Hello, $playername$! It\'s good to see you again, but I have some dire news.',
    'Despite Zinnia having stolen their leaders\ Key Stones, Team Aqua and Team Magma seem to be at it again, cooking up a scheme involving something called "Primal Reversion".',
    'My researchers tell me that there is a mural carved into the wall of Granite Cave that has some information about "Primal Reversion". Can you find it, and report back?',
], {image: 'assets/images/npcs/Mr Stone.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Primal Reversion'), new QuestLineStepCompletedRequirement('Primal Reversion', 1, GameConstants.AchievementOption.less)]),
});

const PrimalMural1 = new NPC('Groudon Mural', [
    '<i>A large mural depicting  some sort of fire-spewing lizard Pokémon. It seems to be engaged in a battle.</i>',
], {image: 'assets/images/npcs/other/GroudonMural.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 1), new QuestLineStepCompletedRequirement('Primal Reversion', 3, GameConstants.AchievementOption.less)]),
});

const PrimalMural2 = new NPC('Kyogre Mural', [
    '<i>A large mural depicting  some sort of oceanic whale-like Pokémon. It seems to be engaged in a battle.</i>',
    '<i>You see someone else looking at the mural: Steven Stone!</i>',
], {image: 'assets/images/npcs/other/KyogreMural.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 1), new QuestLineStepCompletedRequirement('Primal Reversion', 3, GameConstants.AchievementOption.less)]),
});

const PrimalSteven = new NPC('Steven', [
    'Hello again, $playername$! I see you\'re interested in these murals as well? They seem to be about Groudon and Kyogre.',
    'So in the ancient world, their primal forms once held this much power…? The super-ancient Pokémon… What terrible strength… But this appearance here… It seems somehow different from Mega Evolution, but somehow related.',
    'If you don\'t mind me asking… Do you feel anything in particular when you look up at this wall? A primal world, lost thousands of years in the past… A Legendary Pokémon of tremendous power became humanity\'s greatest threat…',
    'The terror aroused by that power is clear to see in this ancient artwork. You know who might know more about this? Captain Stern, a sailor who works for my father.',
    'He\'s usually out to sea, but you can find him in Sea Mauville if the weather is too stormy to sail.',
], {image: 'assets/images/npcs/Steven.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 2), new QuestLineStepCompletedRequirement('Primal Reversion', 4, GameConstants.AchievementOption.less)]),
});

const Stern1 = new NPC('Captain Stern', [
    'Ahoy! What brings you to this port?',
    'On the search for mysteries of the sea, eh? Well then I have one whale of a tale for you! But are yeh worthy?',
], {image: 'assets/images/npcs/Sailor.png',
    requirement: new MultiRequirement([new WeatherRequirement([WeatherType.Thunderstorm]), new QuestLineStepCompletedRequirement('Primal Reversion', 3), new QuestLineStepCompletedRequirement('Primal Reversion', 5, GameConstants.AchievementOption.less)]),
});

const SternSubstitute = new NPC('Deck Swabber', [
    'Hoy thar, matey! What\'s that? You lookin\' for Cap\'n Stern, are ya? That ol\' Jack Tar! A loose cannon \'e is! You\'ll only see \'im ashore in a Thunderstorm. \'E\'ll say it\'s all due to protocol but the trut\' is lightnin\' scares \'im stem to stern! Didn\' \'ear that from me \'ough...',
    '',
    'If ya feel like meetin\' \'im, the fine folks at the Weather Insitute can tell you when the next storm\'s brewin\'.',
], {image: 'assets/images/npcs/Janitor.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 3), new QuestLineStepCompletedRequirement('Primal Reversion', 5, GameConstants.AchievementOption.less)]),
});

const Stern2 = new NPC('Captain Stern', [
    'I see you can be trusted with the mysteries of the sea!',
    'I have been seeing a lot of strange activity around the Seafloor Cavern recently. Whirlpools, thunderstorms, and all nature of strange beasts.',
    'There\'s an old submarine around here that I\'ve been working on upgrading to go explore the lowest parts of that cavern, but need some help getting the parts.',
    'The hull needs some new Metal Coating, the ballast tanks need filled with Mystic Water, and some Heat Rocks are needed for a dive that deep.',
], {image: 'assets/images/npcs/Sailor.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 5), new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)]),
});

const Stern3 = new NPC('Captain Stern', [
    'Thanks for getting all the supplies together, $playername$!',
    'We\'re ready to set sail to the Seafloor Cavern!',
], {image: 'assets/images/npcs/Sailor.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 7), new QuestLineStepCompletedRequirement('Primal Reversion', 9, GameConstants.AchievementOption.less)]),
});

const WeatherScan = new NPC('Scan for unusual weather', [
    '<i>Pressure readings are indicating that a huge storm is brewing in Hoenn. All instruments point to Mt. Pyre as the center of the disturbance.</i>',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 11), new QuestLineStepCompletedRequirement('Primal Reversion', 13, GameConstants.AchievementOption.less)]),
});

const PrimalArchie = new NPC('Archie', [
    'Bwahahahaha! At last… AT LAST! I\'ve finally done it!!! It hasn\'t even finished reversion, and it still has this much power!!! With this I can return everything to its natural beginning! It\'s time at last!',
    'Is that crew outside?',
    'What is it…? Oh? So the great deluge has begun… Bwahahahaha! But of course it has! That is exactly what I have―',
    'What…? What do you mean far more than we thought?! It can\'t be… Then if it completes its Primal Reversion… N-never mind that! Just keep an eye on it!',
    'All that matters is… That I have used the Blue Orb to awaken Kyogre… And now… I will return this world to its natural state… The state that is best for Pokémon!',
], {image: 'assets/images/npcs/Aqua Leader.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 13), new QuestLineStepCompletedRequirement('Primal Reversion', 15, GameConstants.AchievementOption.less)]),
});

const PrimalMaxie = new NPC('Maxie', [
    '... Hm? A message from our members outside? What is it? So the sun has turned mercilessly fierce in its heat. I should expect so. That is what I have long—',
    'No, what WE have long wished for. What?! The heat is greater than simulations predicted? It will be a risk to our own safety if it continues?! That cannot be...',
    'It has only just awoken... Where is it getting so much power from? And how much more will it gain when it does undergo Primal Reversion... C-continue your readings! Then report back!',
    'All that matters is... That I have used the red orb to awaken Groudon. And now... I will transform this planet to a land ideal for humanity.',
], {image: 'assets/images/npcs/Magma Leader.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Primal Reversion', 13), new QuestLineStepCompletedRequirement('Primal Reversion', 15, GameConstants.AchievementOption.less)]),
});
const MrStone2 = new NPC('Mr. Stone', [
    'Thank you, $playername$! Your heroics have saved Hoenn once again!',
    'My researchers tell me that since their defeat, Groudon and Kyogre have been reverting to their primal forms in the Cave of Origin during Sunny and Rainy weather.',
    'They are certainly very dangerous, but it doesn\'t seem like they are a threat to the region anymore.',
], {image: 'assets/images/npcs/Mr Stone.png',
    requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 15),
});

const ZinniaOrigin = new NPC('Zinnia', [
    'Wow, $playername$! You\'ve been busy!',
    'Now that things are calmer in Hoenn, I\'ve decided to keep an eye on Kyogre and Groudon and make sure they don\'t cause any more trouble.',
    'Groudon reverts to its Primal form when it\'s sunny, and Kyogre reverts to its Primal form in the rain.',
    'Archie and Maxie are still lurking somewhere in Hoenn, but without the Orbs I think they\'re mostly harmless. If you need some help smacking em down again, come get me!',
], {image: 'assets/images/npcs/Zinnia.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('The Delta Episode'), new QuestLineCompletedRequirement('Primal Reversion')]),
});

const ExploreStand = new NPC('Explore the Outskirt Stand', [
    '<i>You look around the Outskirt Stand, and see two shady figures shuffling off into the horizon. As you move to get a closer look, some guy steps in your way.</i>',
    'Hey there! You\'re a fresh face \'round these parts, aren\'tcha!',
    'You\'ll have to let me welcome you with a battle, or my name ain\'t Willie!',
], {image: 'assets/images/npcs/Willie.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Shadows in the Desert'), new QuestLineStepCompletedRequirement('Shadows in the Desert', 1, GameConstants.AchievementOption.less)]),
});
const Willie = new NPC('Willie', [
    'Well partner, that was some dang fancy fighting, I\'ll tell you what.',
    'I dunno what your plans are round these parts, but you\'d best keep an eye out for some of them dang ole Shadow Pokémon. Give a stranger enough of a whooping an\' ya might see yourself face to face with one in a dungeon next time!',
    'I hear they are weaker than normal Pokémon but can hold a fancy incense. If you manage to purify their souls, they\'ll get a wee bit stronger!',
], {image: 'assets/images/npcs/Willie.png',
    requirement: new QuestLineStepCompletedRequirement('Shadows in the Desert', 1),
});
const Sack = new NPC('Check the sack', [
    '<i>You open the sack and a girl pops out!</i>',
    'Thanks for letting me out! I thought I was done for!',
    'My name is Rui, by the way. I\'m a psychic of sorts, on a mission to save Pokémon who have had their souls corrupted by some evil folks in Orre.',
    'There\'s a few in this city that need help. Can you come with me though? I\'m worried more shady guys will show up.',
    'I can point out which Pokémon have been corrupted, or turned into "Shadow Pokémon", and you can confiscate them from evildoers using your Pokéballs.',
    'You can adjust your Catch Filters to catch any Shadow Pokémon now too.',
], {image: 'assets/images/npcs/Rui.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 2), new QuestLineStepCompletedRequirement('Shadows in the Desert', 4, GameConstants.AchievementOption.less)]),
});
const EsCade1 = new NPC('Mayor Es Cade', [
    'Ah, you must be travelers! Welcome to Phenac City! I am Es Cade, the Mayor. Now, you wanted to see me? Is there something that I may be able to assist you with?',
    'O-o-o-oh, my! Shadow Pokémon? And they attack people?! Now if that were true, that would be truly frightening. However, that is a little hard to believe.',
    'I understand your concern, though. I will order an investigation at once.',
    'I promise you, we will obtain useful information about those sinister Pokémon. While we do so, I heartily recommend that you visit our Stadium, the symbol of our civic pride!',
], {image: 'assets/images/npcs/Es Cade.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 4), new QuestLineStepCompletedRequirement('Shadows in the Desert', 6, GameConstants.AchievementOption.less)]),
});
const Rui1 = new NPC('Rui', [
    'There\'s something suspicious going on here, but I\'m not sure what our next move is here.',
    'The Stadium here isn\'t even open yet, I think the Mayor was just trying to get rid of us.',
    'Let\'s see if we can find out more in Pyrite Town.',
], {image: 'assets/images/npcs/Rui.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 5), new QuestLineStepCompletedRequirement('Shadows in the Desert', 7, GameConstants.AchievementOption.less)]),
});
const Duking1 = new NPC('Duking', [
    '<i>Grr...</i>.',
    'Those masked trainers went and kidnapped my beloved Plusle! How dare they!',
    'They told me that I had to let them have free reign in town, or there would be trouble. They\'re out at the Colosseum causing trouble.',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 7), new QuestLineStepCompletedRequirement('Shadows in the Desert', 9, GameConstants.AchievementOption.less)]),
});
const Doken1 = new NPC('Doken', [
    'Yow! You\'re too tough!',
    'I know the Plusle you\'re looking for, it got taken by the infamous dance machine, Miror B.',
    'You don\'t want to mess with him, I promise! Oh? You do?',
    'Well, his hideout is in the Pyrite Cave. But you shouldn\'t go there.',
], {image: 'assets/images/npcs/Hunter (male).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 10), new QuestLineStepCompletedRequirement('Shadows in the Desert', 12, GameConstants.AchievementOption.less)]),
});
const FreePlusle = new NPC('Free Duking\'s Plusle', [
    '<i>Miror B. flees, leaving Plusle behind. Plusle runs off in the direction of Pyrite Town.</i>',
], {image: 'assets/images/pokemon/311.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 12), new QuestLineStepCompletedRequirement('Shadows in the Desert', 14, GameConstants.AchievementOption.less)]),
});
const Rui2 = new NPC('Rui', [
    'You did a good thing, freeing that Plusle from those goons. I think they were all part of the evil organization I\'ve been hearing about: Team Cipher!',
    'My grandfather might know more about them, he\'s a smart guy. Let\'s go see him in Agate Village!',
], {image: 'assets/images/npcs/Rui.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 13), new QuestLineStepCompletedRequirement('Shadows in the Desert', 15, GameConstants.AchievementOption.less)]),
});
const GrandpaEagun1 = new NPC('Grandpa Eagun', [
    'Rui! And you are? $playername$? Nice to meet you!',
    'Thank you both for saving me from those goons. They were disrupting the peace and tranquility of this whole area.',
    '$playername$, if you ever have troubled or downright evil Pokémon, take them to the nearby Relic Stone. Its power, combined with the power of friendship you share with your Pokémon, may purify their souls.',
], {image: 'assets/images/npcs/Old Man.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 16), new QuestLineStepCompletedRequirement('Shadows in the Desert', 18, GameConstants.AchievementOption.less)]),
});
const Rui3 = new NPC('Rui', [
    'Have you seen this crazy broadcast on TV?',
    '<i>Rui shows you a TV broadcast coming out of a dark room underground, in which a beautiful woman is encouraging her minions to steal Pokémon.</i>',
], {image: 'assets/images/npcs/Rui.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 18), new QuestLineStepCompletedRequirement('Shadows in the Desert', 20, GameConstants.AchievementOption.less)]),
});
const SearchTheStudio = new NPC('Search The Studio', [
    '<i>Scripts litter Venus\' desk, as well as other, more suspicious files addressing what trainers in town have which Pokémon. There are also several letters labeled "Mayor\'s Office".</i>',
    '<i>Rui calls to you from across the room:</i>',
    'Hey $playername$! I found a button! I\'m gonna press it!',
    '<i>An explosion rocks the room, revealing a tunnel out of a secret entrance. The scripts and letters are scattered all over the studio, making them impossible to sort out.</i>',
],
{requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 20), new QuestLineStepCompletedRequirement('Shadows in the Desert', 22, GameConstants.AchievementOption.less)])}
);
const EsCade2 = new NPC('Mayor Es Cade', [
    'My, my. That certainly was a battle worth seeing. I must be honest with you. I never imagined that you would get this far.',
    'Oh, dear me. Do you fail to understand still? You\'re such an innocent child. At times, I am the affable mayor of Phenac... And at others, I am the secret boss of the criminal syndicate Cipher!',
    'I am Evice, and I shall rule the world!',
    '<i>The Mayor changes before your eyes, taking on a much more sinister appearance.</i>',
], {image: 'assets/images/npcs/Es Cade.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 23), new QuestLineStepCompletedRequirement('Shadows in the Desert', 25, GameConstants.AchievementOption.less)]),
});
const EviceEscape = new NPC('Watch Evice Escape', [
    '<i>Before the helicopter can land, a fireball shoots across the sky, blowing it up!</i>',
    '<i>A Ho-oh flies low, screeching a thanks to you for stopping the evil Team Cipher.</i>',
    '</br><img src="assets/images/pokemon/250.png"/>',
], {image: 'assets/images/npcs/other/EviceHelicopter.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Shadows in the Desert', 25), new QuestLineCompletedRequirement('Shadows in the Desert', GameConstants.AchievementOption.less)]),
});
const PhenacRoller = new NPC('Cool Dude', [
    'There\'s been a lot of crime around here recently. But nothing I can\'t handle!',
    'Some folks have been corrupting their Pokémon and making them commit totally jank acts.',
    'Those Pokémon would be better off in the hands of a radical trainer who knows how to use Catch Filters, like me!',
], {image: 'assets/images/npcs/Roller Boy.png'});
const OrreRoamerNPC = new RoamerNPC('Fateen\'s Fortune Telling', [
    'I sense the presence of rare Pokémon at the {ROUTE_NAME}! Hurry, before the fates intervene!',
], GameConstants.Region.hoenn, RoamingPokemonList.findGroup(GameConstants.Region.hoenn, GameConstants.HoennSubRegions.Orre), 'assets/images/npcs/Psychic (female).png');
const AgateAthlete = new NPC('Jogger', [
    'This town is pretty quiet. Most folks here are retired trainers.',
    'We\'re always happy to help out any young folks who come through though!',
    'Our only real tourist attraction is the Relic Stone north of town. Just passing by it is enough to make you feel calmer.',
], {image: 'assets/images/npcs/Athlete (male).png'});
const RelicSage = new NPC('Relic Stone Sage', [
    'This stone has the power to cleanse and purify the spirits of Pokémon.',
    'If you train with your Pokémon, you will gain spiritual energy, or "Flow". You can use this Flow to purify your Pokémon.',
    'Purification will take more flow with each Pokémon you purify.',
    '<img src="./assets/images/status/shadow.svg" height="60px"/> <img src="./assets/images/arrow.svg" height="30px"/> <img src="./assets/images/status/purified.svg" height="60px"/>',
], {image: 'assets/images/npcs/Sage.png'});
const GateonSailor = new NPC('Sailor', [
    'I\'ve been waiting for the S. S. Libra to come into port for HOURS!',
    'Rumor has it that some giant Pokémon picked it up and flew away with it, but that has to be impossible.',
    'If such a Pokémon existed, Professor Krane at the Pokémon HQ Lab would know about it.',
], {image: 'assets/images/npcs/Sailor.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Gale of Darkness'), new QuestLineStepCompletedRequirement('Gale of Darkness', 1, GameConstants.AchievementOption.less)]),
});
const Chobin1 = new NPC('Chobin', [
    'Chobin has heard all about the Shadow Pokémon from Dr. Kaminko!',
    'There is a stone near Agate Village that can purify the souls of Pokémon, yes indeed.',
], {image: 'assets/images/npcs/Chobin.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 3), new QuestLineStepCompletedRequirement('Gale of Darkness', 5, GameConstants.AchievementOption.less)]),
});
const Eagun2 = new NPC('Grandpa Eagun', [
    'Ah, $playername$! It\'s good to see you again, though I wish it was under better circumstances.',
    'Yes, I heard that Professor Krane was kidnapped from the Pokémon HQ Lab. There\'s some shady characters up on Mount Battle who might know more.',
], {image: 'assets/images/npcs/Old Man.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 4), new QuestLineStepCompletedRequirement('Gale of Darkness', 6, GameConstants.AchievementOption.less)]),
});
const Lovrina = new NPC('Cipher Admin Lovrina', [
    'Ooh, I so hate to say this! I can\'t beat you right now. Master Greevil will so be cross with me but… But that\'s okay.',
    'I\'ll let you owe me this one time. But you have to promise you will think of my plan next time. If you see XD001 you will so want to help me. I\'ll so be waiting for you!',
    'And don\'t bother looking for Professor Krane here, he\'s like long gone.',
], {image: 'assets/images/npcs/Cipher Admin Lovrina.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 7), new QuestLineStepCompletedRequirement('Gale of Darkness', 9, GameConstants.AchievementOption.less)]),
});
const Exol = new NPC('Cipher Commander Exol', [
    'Your victory doesn\'t matter, we got what we came for!',
    '<i>Exol shouts to his assembled peons:</i>',
    'Troops, move out! On to Phenac!',
], {image: 'assets/images/npcs/Cipher (commander).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 11), new QuestLineStepCompletedRequirement('Gale of Darkness', 13, GameConstants.AchievementOption.less)]),
});
const Snattle = new NPC('Cipher Admin Snattle', [
    'How is this possible?! I\'ve never seen a trainer so strong! But, no matter! Surely I\'ve bought Gorigan enough time.',
    'His precious recovery operation must be finished by now. Today, we will leave quietly. But don\'t you forget us!',
], {image: 'assets/images/npcs/Cipher Admin Snattle.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 14), new QuestLineStepCompletedRequirement('Gale of Darkness', 16, GameConstants.AchievementOption.less)]),
});
const Trest = new NPC('Mayor Trest', [
    'Thank you, $playername$, for saving our town from Team Cipher once again.',
    'I haven\'t seen Professor Krane around here, but hopefully this will be of some use to you.',
], {image: 'assets/images/npcs/Office Worker (male).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 15), new QuestLineStepCompletedRequirement('Gale of Darkness', 17, GameConstants.AchievementOption.less)]),
});
const Verich = new NPC('Mr. Verich', [
    'Hohoho! You must be $playername$ I\'m hearing so much about from my.... employees.',
    'There\'s a lot of rumors buzzing around about the S. S. Libra, but if you ask me, it\'s long gone and may never be found.',
    'You\'d have to be as crazy as Kamino to go looking for it.',
], {image: 'assets/images/npcs/Grand Master Greevil.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 16), new QuestLineStepCompletedRequirement('Gale of Darkness', 18, GameConstants.AchievementOption.less)]),
});
const Chobin2 = new NPC('Chobin', [
    'Dr. Kaminko and Chobin have invented this most wonderful device! The Robo Groudon!',
    'With this robot, we can explore the deserts of Orre! Surely Chobin and $playername$ will find something interesting!',
], {image: 'assets/images/npcs/Robo Groudon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 18), new QuestLineStepCompletedRequirement('Gale of Darkness', 20, GameConstants.AchievementOption.less)]),
});
const SearchLibra = new NPC('Search the S. S. Libra', [
    '<i>You rummage around in the wreckage of the S. S. Libra, and find evidence of a recent battle. It looks like something very strong beat up a lot of weaker Pokémon</i>',
    '<i>Deep in the wreckage, you find a box that was left behind on accident.</i>',
], {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 20), new QuestLineStepCompletedRequirement('Gale of Darkness', 22, GameConstants.AchievementOption.less)]),
});
const ProfKrane = new NPC('Professor Krane', [
    '$playername$! Thank you for rescuing me from those fiends!',
    'In my time in captivity, I learned that the new Grand Master of Team Cipher has used a powerful Shadow Pokémon to kidnap all the trainers and Pokémon from the S. S. Libra and has taken them to Citadark Island!',
    'Snagging this powerful Shadow Pokémon will be hard, take this Master Ball!',
], {requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Gale of Darkness', 25), new QuestLineStepCompletedRequirement('Gale of Darkness', 27, GameConstants.AchievementOption.less)]),
});
const DrKaminko = new NPC('Dr. Kaminko', [
    'Leave me alone! I\'m WORKING!']
);
const OrreColosseumSpectator = new NPC('Colosseum Spectator', [
    'Only the toughest trainers in Orre are allowed to fight here! I\'m just watching until I get stronger.']
);
//Hoenn Towns
TownList['Littleroot Town'] = new Town(
    'Littleroot Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new BulletinBoard(GameConstants.BulletinBoards.Hoenn)],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
        npcs: [ProfBirch, LittlerootAide, Television1, Television2, DeltaMay1, NewsBirch, DeltaMay2],
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
    [PetalburgCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Petalburg City']), TemporaryBattleList['Courtney 1'], TemporaryBattleList['Matt 1']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 102)],
        npcs: [DeltaSteven1, DeltaWally1],
    }
);
TownList['Rustboro City'] = new Town(
    'Rustboro City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [RustboroCityShop, TemporaryBattleList['Mr. Stone']],
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
        npcs: [HoennFossilNpc],
    }
);
TownList['Slateport City'] = new Town(
    'Slateport City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [SlateportCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Slateport City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave'))],
        npcs: [SlateportHoennRoamerNPC, MrStone1, MrStone2],
    }
);
TownList['Mauville City'] = new Town(
    'Mauville City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [MauvilleCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Mauville City']), HoennBerryMaster],
    {
        requirements: [new TemporaryBattleRequirement('May 3')],
        npcs: [SkepticalFisherman],
    }
);
TownList['Sea Mauville'] = new Town(
    'Sea Mauville',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [TemporaryBattleList['Delta Giovanni'], TemporaryBattleList['Captain Stern']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 109)],
        npcs: [SeaMauvilleRocket1, SeaMauvilleRocket2, Stern1, SternSubstitute, Stern2, Stern3],
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
    [FallarborTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Fallarbor Town']), HoennFluteMaster, HoennStoneSalesman, TemporaryBattleList['Hoenn Stone Salesman']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)],
        npcs: [FallarborProfessorCozmo, Cozmo1, HoennStoneSalesman1, HoennStoneSalesman2],
    }
);
TownList['Lavaridge Town'] = new Town(
    'Lavaridge Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [LavaridgeTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Lavaridge Town']), TemporaryBattleList['Clown Jessie & James']],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Jagged Pass'))],
        npcs: [MillenniumFest, Butler1],
    }
);
TownList['Fish Shop'] = new Town(
    'Fish Shop',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [RoadsideStandShop],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 118),
        ],
        npcs: [RoadsideStandShadySalesman],
        ignoreAreaStatus: true,
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
TownList['Wind Chime Shop'] = new Town(
    'Wind Chime Shop',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [WindChimeShop],
    {
        requirements: [new TemporaryBattleRequirement('May 4')],
        npcs: [WindChimeShopShadySalesman],
        ignoreAreaStatus: true,
    }
);
TownList['Lilycove City'] = new Town(
    'Lilycove City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new PokemonContestTownContent(), DepartmentStoreShop, HoennContestShop],
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
TownList['Mossdeep Space Center'] = new Town(
    'Mossdeep Space Center',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [TemporaryBattleList['Aqua Grunt'], TemporaryBattleList['Magma Grunt'], TemporaryBattleList['Courtney 2'], TemporaryBattleList['Matt 2'], TemporaryBattleList['Dr Cozmo'], new MoveToDungeon(dungeonList['Near Space'])],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Mind)],
        npcs: [Cozmo2, Zinnia4, Cozmo3, Zinnia5, Cozmo4],
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
    [SootopolisCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Sootopolis City']), TemporaryBattleList['Delta Wallace']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.hoenn, 126), new GymBadgeRequirement(BadgeEnums.Mind)],
        npcs: [WeatherBattle1, WeatherBattle2, Wallace3],
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
        npcs: [CoolTrainerDillan],
    }
);
TownList['Pokémon League Hoenn'] = new Town(
    'Pokémon League Hoenn',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [GymList['Elite Sidney'], GymList['Elite Phoebe'], GymList['Elite Glacia'], GymList['Elite Drake'], GymList['Champion Wallace'], pokeLeagueShop(), TemporaryBattleList['Delta Steven']],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
            new TemporaryBattleRequirement('Wally 2'),
        ],
        npcs: [TicketClaim, DeltaSteven2, DeltaSteven3],
    }
);
TownList['Southern Island'] = new Town(
    'Southern Island',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [TemporaryBattleList.Latios, TemporaryBattleList.Latias, TemporaryBattleList['Matt 3'], TemporaryBattleList['Courtney 3']],
    {
        requirements: [new CustomRequirement(ko.pureComputed(() => +App.game.keyItems.hasKeyItem(KeyItemType.Eon_ticket)), 1, 'Obtain an Eon Ticket')],
        npcs: [SurferDave, SouthernIsland1],
    }
);

TownList['Outskirt Stand'] = new Town(
    'Outskirt Stand',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [OutskirtStandShop, TemporaryBattleList.Willie, TemporaryBattleList['Miror B. 2']],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), new QuestLineStartedRequirement('Shadows in the Desert')],
        npcs: [ExploreStand, Willie],
    }
);

TownList['Phenac City'] = new Town(
    'Phenac City',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [PhenacCityShop, new MoveToDungeon(dungeonList['Phenac Stadium']), new MoveToDungeon(dungeonList['Phenac City Battles']), TemporaryBattleList.Folly],
    {
        requirements: [new QuestLineStepCompletedRequirement('Shadows in the Desert', 1)],
        npcs: [PhenacRoller, Sack, EsCade1, Rui1, Trest],
    }
);

TownList['Pyrite Town'] = new Town(
    'Pyrite Town',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [GymList['Cipher Admin Miror B.'], new MoveToDungeon(dungeonList['Pyrite Colosseum']), new MoveToDungeon(dungeonList['The Under']), new MoveToDungeon(dungeonList['Pyrite Town Battles']), new MoveToDungeon(dungeonList['Deep Colosseum']), new MoveToDungeon(dungeonList['Under Colosseum'])],
    {
        requirements: [new QuestLineStepCompletedRequirement('Shadows in the Desert', 6)],
        npcs: [OrreRoamerNPC, Duking1],
    }
);

TownList['Agate Village'] = new Town(
    'Agate Village',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [AgateVillageShop, new MoveToTown('Relic Stone'), new MoveToDungeon(dungeonList['Relic Cave']), TemporaryBattleList['Cipher Peon Doven'], TemporaryBattleList['Cipher Peon Silton'], TemporaryBattleList['Cipher Peon Kass']],
    {
        requirements: [new QuestLineStepCompletedRequirement('Shadows in the Desert', 14)],
        npcs: [AgateAthlete],
    }
);

TownList['Relic Stone'] = new Town(
    'Relic Stone',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [new MoveToTown('Agate Village', undefined, false), new MoveToDungeon(dungeonList['Relic Cave']), new PurifyChamberTownContent()],
    {
        requirements: [new QuestLineStepCompletedRequirement('Shadows in the Desert', 17)],
        npcs: [RelicSage, Eagun2],
    }
);

TownList['Realgam Tower'] = new Town(
    'Realgam Tower',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [new MoveToDungeon(dungeonList['Realgam Tower Battles']), new MoveToDungeon(dungeonList['Realgam Colosseum'])],
    {
        requirements: [new QuestLineStepCompletedRequirement('Shadows in the Desert', 22)],
        npcs: [EsCade2],
    }
);

TownList['Gateon Port'] = new Town(
    'Gateon Port',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [GateonPortShop, new MoveToDungeon(dungeonList['Gateon Port Battles']), new DockTownContent()],
    {
        requirements: [new QuestLineStartedRequirement('Shadows in the Desert')],
        npcs: [GateonSailor, Verich],
    }
);

TownList['Pokemon HQ Lab'] = new Town(
    'Pokemon HQ Lab',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [new ShardTraderShop(GameConstants.ShardTraderLocations['Pokemon HQ Lab']), TemporaryBattleList['Cipher Peon Naps']],
    {
        requirements: [new DevelopmentRequirement(new QuestLineStepCompletedRequirement('Gale of Darkness', 0))],
        npcs: [ProfKrane],
    }
);

TownList['Kaminko\'s Manor'] = new Town(
    'Kaminko\'s Manor',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [TemporaryBattleList['Chobin 1'], TemporaryBattleList['Chobin 2']],
    {
        requirements: [new DevelopmentRequirement(new QuestLineStepCompletedRequirement('Gale of Darkness', 2))],
        npcs: [DrKaminko, Chobin1, Chobin2],
    }
);

TownList['S. S. Libra'] = new Town(
    'S. S. Libra',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [TemporaryBattleList['Cipher Peon Smarton']],
    {
        requirements: [new DevelopmentRequirement(new QuestLineStepCompletedRequirement('Gale of Darkness', 19))],
        npcs: [SearchLibra],
    }
);
TownList['Orre Colosseum'] = new Town(
    'Orre Colosseum',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [GymList['Cipher Admin Lovrina'], GymList['Cipher Admin Snattle'], GymList['Cipher Admin Gorigan'], GymList['Cipher Admin Ardos'], GymList['Cipher Admin Eldes']],
    {
        requirements: [new DevelopmentRequirement(new QuestLineCompletedRequirement('Gale of Darkness'))],
        npcs: [OrreColosseumSpectator],
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
    [new TemporaryBattleRequirement('May 2')],
    [TemporaryBattleList['Zinnia 1'], TemporaryBattleList['Delta Brock']],
    {
        npcs: [Zinnia2, Zinnia3, GraniteCamper1, GraniteCamper2, PrimalMural1, PrimalMural2, PrimalSteven],
    }
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
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 114)],
    [TemporaryBattleList['Draconid Elder'], TemporaryBattleList['Mega Draconid Elder']],
    {
        npcs: [DraconidElder1, DraconidElder2, DraconidElder3],
    }
);
TownList['Mt. Chimney Crater'] = new DungeonTown(
    'Mt. Chimney Crater',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Meteor Falls'))],
    [TemporaryBattleList['Butler 1']],
    {
        npcs: [CocoonHatch],
    }
);
TownList['Jagged Pass'] = new DungeonTown(
    'Jagged Pass',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Chimney Crater'))],
    [TemporaryBattleList['Butler 2']],
    {
        npcs: [Butler2, Butler3],
    }
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
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 119)],
    [new WeatherAppTownContent()],
    {
        npcs: [WeatherScan],
    }
);
TownList['Mt. Pyre'] = new DungeonTown(
    'Mt. Pyre',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 122)],
    [],
    {
        npcs: [PrimalArchie, PrimalMaxie],
    }
);
TownList['Magma Hideout'] = new DungeonTown(
    'Magma Hideout',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Pyre'))],
    [TemporaryBattleList['Delta Tabitha']],
    {
        npcs: [Maxie],
    }
);
TownList['Aqua Hideout'] = new DungeonTown(
    'Aqua Hideout',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Magma Hideout'))],
    [TemporaryBattleList['Delta Shelly']],
    {
        npcs: [Archie],
    }
);
TownList['Shoal Cave'] = new DungeonTown(
    'Shoal Cave',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)],
    [TemporaryBattleList['Shoal Fisherman'], TemporaryBattleList['Icy Boulder']],
    {
        npcs: [ShoalFisherman1, ShoalFisherman2, IcyBoulder],
    }
);
TownList['Cave of Origin'] = new DungeonTown(
    'Cave of Origin',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 126),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seafloor Cavern')),
    ],
    [],
    {
        npcs: [Wallace1, Wallace2, ZinniaOrigin],
    }
);
TownList['Seafloor Cavern'] = new DungeonTown(
    'Seafloor Cavern',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 128),
        new GymBadgeRequirement(BadgeEnums.Mind),
    ],
    [TemporaryBattleList['Archie Primal'], TemporaryBattleList['Maxie Primal']],
    {
        npcs: [],
    }
);
TownList['Sky Pillar'] = new DungeonTown(
    'Sky Pillar',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 131),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Cave of Origin'))],
    [TemporaryBattleList['Zinnia 2'], TemporaryBattleList.Deoxys],
    {
        npcs: [Zinnia1, Zinnia6, Zinnia7],
    }
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
TownList['Near Space'] = new DungeonTown(
    'Near Space',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Hoenn,
    [
        new QuestLineCompletedRequirement('The Delta Episode'),
    ]
);
TownList['Phenac City Battles'] = new DungeonTown(
    'Phenac City Battles',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 3),
    ]
);
TownList['Pyrite Town Battles'] = new DungeonTown(
    'Pyrite Town Battles',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 6),
    ]
);
TownList['Pyrite Colosseum'] = new DungeonTown(
    'Pyrite Colosseum',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 8),
    ],
    [],
    {
        npcs: [Rui2],
    }
);
TownList['Pyrite Building'] = new DungeonTown(
    'Pyrite Building',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 9),
    ],
    [],
    {
        npcs: [Doken1, Exol],
    }
);
TownList['Pyrite Cave'] = new DungeonTown(
    'Pyrite Cave',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 11),
    ],
    [],
    {
        npcs: [FreePlusle],
    }
);
TownList['Relic Cave'] = new DungeonTown(
    'Relic Cave',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 15),
    ],
    [],
    {
        npcs: [GrandpaEagun1],
    }
);
TownList['Mt. Battle'] = new DungeonTown(
    'Mt. Battle',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 17),
    ],
    [GymList['Cipher Admin Dakim']],
    {
        npcs: [Rui3],
    }
);
TownList['The Under'] = new DungeonTown(
    'The Under',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 19),
    ],
    [GymList['Cipher Admin Venus']],
    {
        npcs: [SearchTheStudio],
    }
);
TownList['Cipher Lab'] = new DungeonTown(
    'Cipher Lab',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 21),
    ],
    [GymList['Cipher Admin Ein']],
    {
        npcs: [Lovrina],
    }
);
TownList['Realgam Tower Battles'] = new DungeonTown(
    'Realgam Tower Battles',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 22),
    ]
);
TownList['Realgam Colosseum'] = new DungeonTown(
    'Realgam Colosseum',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineStepCompletedRequirement('Shadows in the Desert', 24),
    ],
    [],
    {
        npcs: [EviceEscape],
    }
);
TownList['Snagem Hideout'] = new DungeonTown(
    'Snagem Hideout',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineCompletedRequirement('Shadows in the Desert'),
    ]
);
TownList['Deep Colosseum'] = new DungeonTown(
    'Deep Colosseum',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineCompletedRequirement('Shadows in the Desert'),
    ]
);
TownList['Phenac Stadium'] = new DungeonTown(
    'Phenac Stadium',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineCompletedRequirement('Shadows in the Desert'),
    ],
    [],
    {
        npcs: [Snattle],
    }
);
TownList['Under Colosseum'] = new DungeonTown(
    'Under Colosseum',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new QuestLineCompletedRequirement('Shadows in the Desert'),
    ]
);
TownList['Gateon Port Battles'] = new DungeonTown(
    'Gateon Port Battles',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new DevelopmentRequirement(),
        new QuestLineStepCompletedRequirement('Gale of Darkness', 1),
    ]
);
TownList['Cipher Key Lair'] = new DungeonTown(
    'Cipher Key Lair',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new DevelopmentRequirement(),
        new QuestLineStepCompletedRequirement('Gale of Darkness', 24),
    ],
    [],
    {
        npcs: [],
    }
);
TownList['Citadark Isle'] = new DungeonTown(
    'Citadark Isle',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new DevelopmentRequirement(),
        new QuestLineStepCompletedRequirement('Gale of Darkness', 26),
    ]
);
TownList['Citadark Isle Dome'] = new DungeonTown(
    'Citadark Isle Dome',
    GameConstants.Region.hoenn,
    GameConstants.HoennSubRegions.Orre,
    [
        new DevelopmentRequirement(),
        new QuestLineStepCompletedRequirement('Gale of Darkness', 27),
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
    ItemList.Wonder_Chest,
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
], 'Sinnoh Berry Master');

const SecretBerryMaster = new BerryMasterShop(GameConstants.BerryTraderLocations['Secret Berry Shop'],[
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
], 'Secret Berry Shop');


//Sinnoh NPCs

const TwinleafContestChampion = new NPC('Contest Champion', [
    'Welcome to Sinnoh! There are many legends and myths here. For example, it is said that trainers that conquer the Lake nearby, Lake Verity, will meet a mythical Pokémon known for Emotion roaming around the region. It sure would have been awesome to partner with that Pokémon in one of my routines!',
], {image: 'assets/images/npcs/Contest Champion (Johanna).png'});

const SandgemBeachcomber = new NPC('Beachcomber', [
    'Hmmm… Oh! Sorry, I didn’t see you there! Sometimes the strangest things wash up on this beach, so I just got caught up in the search.',
    'Just last week a weird blue stone with a red center showed up. A rather slow-looking guy with a slowpoke found it first, and took it to the Pokémon Lab.',
    'I think I\'ve seen that stone before - it was on a book of an old legend about the sea.',
    'I think it went something like... "When the Prince of the Seas is born, all of his kin will come to this region to celebrate."',
    'Does that mean when this Prince comes, Pokémon like him will start roaming the region?',
]);

const SinnohFossilNpc = new NPC('Gossiper', [
    'Did you know?! The Gym Leaders of Canalave and Oreburgh are father and son! And what\'s more- there\'s a third person in the mix! Apparently he\'s such a dedicated digger he travelled all the way to Kanto to set up shop selling Explorer Kits! Talk about a family tradition!',
    'Too bad there are only two new fossils in the Sinnoh region. If there was one more, maybe he could be a Gym Leader too!',
    'What? Oh you didn\'t know? The ace Pokémon of Gym Leaders Byron and Roark are resurrected from fossils!',
], {image: 'assets/images/npcs/Aroma Lady.png'});

const FloaromaFlowerGirl = new NPC('Flower Girl', [
    'Something amazing just happened!',
    'My friend was taking their Eevee on a walk through Eterna Forest, and it suddenly evolved!',
    'Can you believe that?',
], {image: 'assets/images/npcs/Aroma Lady.png'});

const EternaLassCaroline = new NPC('Lass Caroline', [
    'Oh, you came from the Forest! That Old Chateau is so creepy, isn’t it? I’ve heard that trainers that catch the weird ghost in the TV have found ghosts in other appliances. Even lawnmowers!',
], {image: 'assets/images/npcs/Lass.png'});

const OreburghConstructionWorker = new NPC('Construction Worker', [
    'I was doing some exploring in Mt. Coronet last week, and my Nosepass gained a lot of levels.',
    'I had a big suprise when he reached level 20 though!',
], {image: 'assets/images/npcs/Worker (male).png'});

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
], {image: 'assets/images/npcs/Burglar.png'});

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
], {image: 'assets/images/npcs/Beauty.png'});

const FightAreaAceTrainer = new NPC('Ace Trainer Quinn', [
    'Something amazing happened on top of Mt. Coronet. We could see it all the way from here. I\'m sure everyone in the entire region saw it.',
    'What? You were there? What happened? What was that purple thing?',
    'The Distortion World? Hold on, I think I\'ve heard that name before, there was a guy around here named Zero looking for a way to enter that place.',
    'I doubt he\'d be interested in talking to you unless you could help him find a way to get there... Can\'t the lake guardians help you with that?',
], {image: 'assets/images/npcs/Ace Trainer (male).png'});

const FightAreaZero1 = new NPC('Zero', [
    'You\'re the Champion, right? I need your help on a small errand.',
    'My old friend Newton used to study the Distortion World, he was working on opening a gate to it. I\'ve heard that you were able to enter the Distortion World from a portal at the top of Mt. Coronet, so I was wondering if you could help me open a new portal to fulfill my friend\'s wish.',
    'An old book about Sinnoh\'s history was recently discovered at the Canalave City Library, it may have useful information.',
], {
    image: 'assets/images/npcs/Zero.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Zero\'s Ambition'), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 1, GameConstants.AchievementOption.less)]),
});

const FightAreaZero2 = new NPC('Zero', [
    'What was in that book? Did you find any information on the Distortion World?',
    'It didn\'t mention it once? That\'s a shame.',
    'Wait, you said the book mentioned the Lake Trio, right? Legends say they have existed since the creation of the world, they may know how to enter the Distortion World.',
], {
    image: 'assets/images/npcs/Zero.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 1), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 2, GameConstants.AchievementOption.less)]),
});

const SurvivalAreaSinnohRoamerNPC = new RoamerNPC('Hiker Kevin', [
    'I spotted a bunch of roaming Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.sinnoh, RoamingPokemonList.findGroup(GameConstants.Region.sinnoh, GameConstants.SinnohSubRegions.Sinnoh), 'assets/images/npcs/Hiker.png');

const SendoffSpringLakeTrio = new NPC('Lake Trio', [
    '<i>You are finally here.</i>',
    '<i>We have been able to create a key to the Distortion World using the materials you collected, but it is unable to work in its current state.</i>',
    '<i>We bestow it upon you, charge it with the ghostly energy of the Distortion World.</i>',
    '<i>In order to do so, you must collect Ghost gems by defeating Ghost type Pokémon and find a Spooky Plate. There should be some in this dungeon, we can sense their energy.</i>',
],{
    image: 'assets/images/npcs/specialNPCs/Lake Trio.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 9), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 11, GameConstants.AchievementOption.less)])});

const SendoffSpringZero1 = new NPC('Zero', [
    'I couldn\'t wait anymore for you to report about your progress, so I asked around and discovered you were coming here.',
    'Wait, is that the key to the Distortion World? With that, I could open the gate myself.',
    'You know what? You are fired, I no longer need you. Now, give me the key to the Distortion World or I will take it by force!',
], {
    image: 'assets/images/npcs/Zero.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Zero\'s Ambition', 11), new QuestLineStepCompletedRequirement('Zero\'s Ambition', 12, GameConstants.AchievementOption.less)]),
});

const SendoffSpringZero2 = new NPC('Zero', [
    'Seems like you have managed to catch the Pokémon that rules the Distortion World.',
    'But this doesn\'t look like the Renegade Pokémon from legend, it seems like some sort of altered form.',
    'I once read that, deep within the Distortion World, there is an object capable of carrying the realm\'s power. Maybe, if you train Giratina while it has such object equipped, it can turn into its true form.',
], {
    image: 'assets/images/npcs/Zero.png',
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

const ManaphyHastings1 = new NPC('Professor Hastings', [
    'Ah, are you a strong trainer? I\'d like to leave this to a Pokémon Ranger, but the ones in this region are far away, and the crooks could escape by the time they caught up!',
    'I was robbed of a precious Pokémon Egg by the Go-Rock Squad! The egg was coloured a transparent blue...  Like the colour of the sea!',
    'The Go-Rock Squad were troublemakers the Pokémon Rangers dealt with in my home region. I don\'t know why they took it, but the Go-Rock Squad is trying to regroup!',
    'I was robbed in the forest to the north. Please, you have to hurry!',
], {
    image: 'assets/images/npcs/Professor Hastings.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Recover the Precious Egg!'), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 2, GameConstants.AchievementOption.less)]),
});

const ManaphyHastings2 = new NPC('Professor Hastings', [
    'Thanks for retrieving the Egg!',
    'The Go-Rock Squad was already beaten once. That was probably their very last gasp of trouble-making.',
    'While you were gone I discovered that the egg belongs to Manaphy! No wonder the Go-Rock Squad was after it.',
    'Canalave\'s Library has several books detailing the legends of Manaphy. Perhaps one of them can help us find out how to hatch this egg.',
    'No time to waste - I\'ll see you at the Canalave Library!',
], {
    image: 'assets/images/npcs/Professor Hastings.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 10), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 11, GameConstants.AchievementOption.less)]),
});

const ManaphyHastings3 = new NPC('Professor Hastings', [
    'Trainer, there\'s trouble afoot!',
    'The egg was stolen again - this time by a Happiny who belongs to a little girl here. It went eastward at top speed - it\'s probably left this city far behind it now.',
    'We must retrieve that egg at all costs! Please, you have to chase down the egg-napper!',
], {
    image: 'assets/images/npcs/Professor Hastings.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 11), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 25, GameConstants.AchievementOption.less)]),
});

const ManaphyHastings4 = new NPC('Professor Hastings', [
    'Ah, Manaphy hatched, did it? Looks like all that running around you and Happiny did incubated it enough to hatch it.',
    'There is something I\'ve discovered researching the Manaphy stories here. Apparently, Manaphy can be bred to produce an entirely different species of Pokémon!',
    'Quite frankly, it\'s probably for the best if Manaphy stays with you. Apparently many things want to take that Pokémon for themselves, and I don\'t have the strength to fend them off.',
], {
    image: 'assets/images/npcs/Professor Hastings.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 25), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 26, GameConstants.AchievementOption.less)]),
});

const ManaphyBoulders = new NPC('Strange Boulders', [
    '<i>One of the pathways into the forest is blocked by a trio of large boulders.</i>',
    '<i>However, all three of the boulders look very similar... and they almost seem to have arms, as well.</i>',
    '<i>Perhaps these aren\'t boulders after all... and if they are what you think they are, a good soaking should settle the matter.</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Strange Boulders.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 0), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 2, GameConstants.AchievementOption.less)]),
});

const ManaphyGoRockCommander = new NPC('Go-Rock Commander', [
    'You... are you a Pokémon Ranger? ...No? Well, no matter.',
    'Allow me to explain something to you. This egg is meaningful only if we possess it.',
    'We\'re going to hatch Manaphy from this egg and get it to guide us to its Sea Temple.',
    'With the power contained within, I will become the King of the Sea - far stronger than the old fool guiding us before!',
    '<i>The Commander flees into the forest, with the Go-Rock Grunts covering his escape!</i>',
], {
    image: 'assets/images/npcs/Go-Rock Squad Commander.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 3), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 5, GameConstants.AchievementOption.less)]),
});

const ManaphyGoRock = new NPC('Go-Rock Grunt', [
    'Huff... huff... we should have been out of the forest by now!',
    'The plan was so simple. One of our grunts pre-planted a bunch of big red mushrooms with yellow spots to make a path out of the forest and to our hideout.',
    'But it feels like we\'ve been going in circles! The only reason I know we aren\'t is because every time we reach a similar crossroads, the mushrooms are in different places.',
    'Unless... the mushrooms are moving somehow?',
    '<i>What she\'s describing... could it be they\'re using Parasect? It\'s never a good idea to use living landmarks.</i>',
    '<i>If you can take out a few of the Parasect, that should quickly corner them.</i>',
], {
    image: 'assets/images/npcs/Go-Rock Squad Grunt (female).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 6), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 8, GameConstants.AchievementOption.less)]),
});

const HappinyWitness1 = new NPC('Black Belt', [
    'A Happiny with a blue egg?',
    'I did see a Happiny like that. They were heading north, across Route 204.',
], {
    image: 'assets/images/npcs/Black Belt.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 12), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 14, GameConstants.AchievementOption.less)]),
});

const HappinyWitness2 = new NPC('Lady', [
    'A Happiny with a blue egg? Are you its trainer?',
    'I was just minding my own business, when a little pink thing knocked me right over! By the time I got up, it was long gone, racing for the Eterna Forest.',
    'I was worried its trainer had lost it, so I came here to ask around. I hope you catch up to it soon.',
    '<i>If it has a better sense of direction than the Go-Rock Squad, it\'ll probably pop out at Eterna City.</i>',
], {
    image: 'assets/images/npcs/Lady.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 13), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 15, GameConstants.AchievementOption.less)]),
});

const HappinyWitness3 = new NPC('Cyclist', [
    'A Happiny with a blue egg? Ah yeah, I saw it.',
    'It ran right through here and went across Route 211, straight for Mt. Coronet.',
    '<i>Did the Happiny really leave Eterna and brave Mt. Coronet with the egg in tow? Maybe it\'s reached the other side by now.</i>',
], {
    image: 'assets/images/npcs/Cyclist (female).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 14), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 16, GameConstants.AchievementOption.less)]),
});

const HappinyWitness4 = new NPC('Waitress', [
    'I was just finishing up my shift at the Café Cabin when a little pink puffball ran past! It was heading south, for the ruins down there.',
    '...Eh, it was a Happiny? ...That\'s one fast Happiny, then, isn\'t it?',
], {
    image: 'assets/images/npcs/Waitress.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 15), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 17, GameConstants.AchievementOption.less)]),
});

const HappinyWitness5 = new NPC('Pokémon Ranger', [
    'Ah, you\'re the one chasing after that Happiny? You look a bit puffed, are you okay?',
    'I tried to capture it, but it barrelled right through my Capture Disc\'s trail! It went for Hearthome City. It wasn\'t showing any signs of slowing down yet.',
], {
    image: 'assets/images/npcs/Pokemon Ranger (female).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 16), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 18, GameConstants.AchievementOption.less)]),
});

const HappinyWitness6 = new NPC('Murph', [
    'Me and my buddy Slowpoke are trying to catch a Happiny that just went running into Mt. Coronet.',
    'It had a blue egg on its belly - I\'ve definitely seen an egg like that before, back in Fiore.',
    'My Slowpoke\'s gone ahead, I hope I can catch up to them soon.',
], {
    image: 'assets/images/npcs/Murph.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 17), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 19, GameConstants.AchievementOption.less)]),
});

const HappinyWitness7 = new NPC('Cyclist', [
    'Oh hey! Still chasing that Happiny, huh?',
    'When I saw it still running, I tried to catch up to it, but it got into the Oreburgh Tunnel and I lost track of it.',
    '...Say, are you alright? You look a little... bug-eyed.',
    '<i>...This annoying little twerp has been taking you in one big loop, hasn\'t it...</i>',
], {
    image: 'assets/images/npcs/Cyclist (female).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 18), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 20, GameConstants.AchievementOption.less)]),
});

const HappinyWitness8 = new NPC('Bug Catcher', [
    'Some guy in a weird white outfit was chasing a Happiny!',
    'They were heading south, towards Professor Rowan\'s lab!',
    'You\'re chasing after them too, right? Good luck catching up to them!',
], {
    image: 'assets/images/npcs/Bug Catcher.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 19), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 21, GameConstants.AchievementOption.less)]),
});

const HappinyWitness9 = new NPC('Go-Rock Pincher', [
    'Damn, that Happiny got away. Just when I had it cornered, a Pichu and a Glameow came out and attacked me.',
    '...Hey, I recognize you! You pinched the egg we pinched in Eterna Forest!',
    'I\'m gonna pinch that Pokémon first, so if you want to try and stop me, you\'ll have to get through my Pokémon!',
], {
    image: 'assets/images/npcs/Go-Rock Squad Grunt (male).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 20), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 22, GameConstants.AchievementOption.less)]),
});

const HappinyBoulders = new NPC('Strange Boulders', [
    '<i>You\'ve seen \'boulders\' like this before.</i>',
    '<i>According to the murmuring crowd around them, a Happiny ran this way and threw the boulders behind it to block any pursuers.</i>',
    '<i>You spray the boulders with your water types, and they... don\'t move. Huh, guess they really are boulders this time.</i>',
    '<i>Well, that just means that you can get some fighting-types and crush them with no regrets.</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Strange Boulders.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 22), new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 24, GameConstants.AchievementOption.less)]),
});
const SnoverBreeder = new NPC('Snover Breeder', [
    'I\'ve been finding ways to grow Snover Berries using humane methods.',
    'Snover are happy to let you pick their berries.  They then wander away into the wilderness. Please be kind to them!',
], {image: 'assets/images/npcs/Pokémon Breeder (female).png'});
const GrotleAcornParty = new NPC('Grotle and Friends', [
    '<i>Several friendly Pokémon are snacking on a Grotle\'s acorns.</i>',
], {
    image: 'assets/images/npcs/specialNPCs/Grotle Acorn Party.png',
    requirement: new ObtainedPokemonRequirement('Grotle (Acorn)'),
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
    [SandgemTownShop, TemporaryBattleList['Manaphy Go-Rock Pincher']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 201)],
        npcs: [ProfRowan, SandgemBeachcomber, ManaphyHastings1, ManaphyHastings2, HappinyWitness9],
    }
);
TownList['Jubilife City'] = new Town(
    'Jubilife City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [JubilifeCityShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)],
        npcs: [SinnohFossilNpc, HappinyWitness1, HappinyWitness8],
    }
);
TownList['Oreburgh City'] = new Town(
    'Oreburgh City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [OreburghCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Oreburgh City'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Oreburgh Gate'))],
        npcs: [OreburghConstructionWorker, HappinyWitness7],
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
        npcs: [FloaromaFlowerGirl, HappinyWitness2],
    }
);
TownList['Eterna City'] = new Town(
    'Eterna City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [EternaCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Eterna City']), new MoveToDungeon(dungeonList['Team Galactic Eterna Building'])],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Eterna Forest'))],
        npcs: [EternaLassCaroline, HappinyWitness3],
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
        npcs: [HearthomeContestFan, LucyStevens1, HappinyWitness6],
    }
);
TownList['Solaceon Town'] = new Town(
    'Solaceon Town',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [SolaceonTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Solaceon Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)],
        npcs: [HappinyWitness5],
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
        npcs: [CelesticGrandma, HappinyWitness4],
    }
);
TownList['Pal Park'] = new Town(
    'Pal Park',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [PalParkShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Pal Park']), TemporaryBattleList['Manaphy Egg Protectors']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 221)],
        npcs: [PalParkWarden, PalParkBurglar, HappinyBoulders],
    }
);
TownList['Canalave City'] = new Town(
    'Canalave City',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [CanalaveCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Canalave City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218)],
        npcs: [CanalaveRiley, CanalaveYoungBoy, CanalaveSinnohMyth, ManaphyHastings3, ManaphyHastings4],
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
TownList['Secret Berry Shop'] = new Town(
    'Secret Berry Shop',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [SecretBerryMaster],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.sinnoh, 217),
        ],
        npcs: [SnoverBreeder, GrotleAcornParty],
        ignoreAreaStatus: true,
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
    ],
    [TemporaryBattleList['Manaphy Go-Rock MGrunt 1'], TemporaryBattleList['Manaphy Go-Rock MGrunt 2'], TemporaryBattleList['Manaphy Go-Rock MGrunt 3'], TemporaryBattleList['Manaphy Go-Rock MGrunt 4'], TemporaryBattleList['Manaphy Go-Rock FGrunt 1'], TemporaryBattleList['Manaphy Go-Rock FGrunt 2']],
    {
        npcs: [ManaphyGoRock, ManaphyGoRockCommander, ManaphyBoulders],
    }
);
TownList['Old Chateau'] = new DungeonTown(
    'Old Chateau',
    GameConstants.Region.sinnoh,
    GameConstants.SinnohSubRegions.Sinnoh,
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Forest),
    ],
    [TemporaryBattleList['Manaphy Go-Rock Commander']]
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
    [
        new OneFromManyRequirement([
            new MultiRequirement([
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Spear Pillar')),
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'), GameConstants.AchievementOption.less),
            ]),
            new TemporaryBattleRequirement('Zero'),
        ]),
    ]
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
    ItemList.Wonder_Chest,
    ItemList.Miracle_Chest,
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
const UnovaFluteMaster = new GemMasterShop(GameConstants.GemShops.UnovaFluteMaster);

//Unova Berry Master
const DriftveilBerryMaster = new BerryMasterShop(GameConstants.BerryTraderLocations['Driftveil City'],[
    ItemList.Freeze_Mulch,
    ItemList.Berry_Shovel,
    ItemList.Mulch_Shovel,
], 'Unova Berry Master');

//Unova NPCs

const ExcitedChild = new NPC('Excited Child', [
    'Did you hear? Did you see? It was on TV!',
    'I was just watching my favorite show, The National Gymquirer. It was a live segment! Some hot shot trainer from Kanto defeated Drayden! It was amazing! That trainer is so cool! Drayden is like unbeatable.',
    'Then my programme got interrupted by an emergency broadcast. A report on the first confirmed sightings of Tornadus and Thundurus in over twenty-five years! I\'ve read so much about them, they are my favorites.',
    'Last time they were spotted they just roamed around, causing all kinds of mischief. According to my books anyway. I\'m sure that amazing trainer from the TV will want to catch these mighty forces of nature.',
], {image: 'assets/images/npcs/School Kid (female).png'});

const CasteliaMusician = new NPC('Musician', [
    'Sup. Ya like jazz? No? Well then you should check out me and my band at the Sonata Cafe where we never play Jazz.',
    'Sometimes a cool singing Pokémon shows up and joins in on our set. I’ve heard that trainers as strong as the Champion have found it roaming around the region looking for Pokémon battles… but even I wouldn’t challenge it to a Music battle.',
], {image: 'assets/images/npcs/Musician.png'});

const PlasmaGrunt1 = new NPC('Team Plasma Grunt', [
    'Why hello there. Nothing strange going on here. Please move along.',
    'Oh that business in the sewers? Yes, we should not have gone in there. Very unfortunate situation. A complete misunderstanding. We were just curious about what was down there.',
    'Bye now.',
], {image: 'assets/images/npcs/Team Plasma Grunt (male).png'});

const RelicCastleRuinmaniac = new NPC('Ruin Maniac', [
    'I\'ve heard tell of a secret room in this ruin. A room that supposedly contains a very rare Pokémon.',
    'Apparently this secret room is only accessible via a secret entrance in Relic Passage. Relic Passage runs from Driftveil City all the way under the river to Relic Castle. It\'s very impressive. Once I\'m done investigating this part of the ruin I\'m definitely going to check it out!',
], {image: 'assets/images/npcs/Ruin Maniac.png'});

const NimbasaExplorer = new NPC('Explorer', [
    'Whew! The desert is rough out there, glad you\'ve made it all the way to Nimbasa.',
    'Sometimes I find some weird stuff out in the sand, sometimes even Pokémon hiding in Chests. Like this one time in Relic Castle, I found a Pokémon that looks like a statue that I\'ve never seen before!',
], {image: 'assets/images/npcs/Backpacker (male).png'});

const PlasmaGrunt2 = new NPC('Team Plasma Grunt', [
    'I told you. There\'s nothing suspicious going on here. We aren\'t stealing any Pokémon.',
    'If you won\'t leave, we\'ll have to remove you.',
], {
    image: 'assets/images/npcs/Team Plasma Grunt (male).png',
    requirement: new OneFromManyRequirement([new TemporaryBattleRequirement('Team Plasma Grunt 4', 1, GameConstants.AchievementOption.less), new TemporaryBattleRequirement('Team Plasma Grunt 5', 1, GameConstants.AchievementOption.less), new TemporaryBattleRequirement('Team Plasma Grunts 1', 1, GameConstants.AchievementOption.less), new TemporaryBattleRequirement('Team Plasma Grunts 2', 1, GameConstants.AchievementOption.less)]),
});

const DriftveilZinzolin = new NPC('Zinzolin', [
    'YOU!',
    'Once again we will use the legendary Dragon-type Pokémon and we will rule the Unova region!',
    'Curious Trainers, we shall not let you run around as you please!',
    'Shadow Triad! Get them out of here!',
], {
    image: 'assets/images/npcs/Team Plasma (zinzolin).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 6), new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 7, GameConstants.AchievementOption.less)]),
});

const PlasmaGrunt3 = new NPC('Team Plasma Grunt', [
    'Remember when I told you that there was nothing suspicious about this frigate? I was lying, of course.',
    'But truth be told, I didn\'t know that this thing could fly. I was not prepared for this.',
    'I\'m gonna be sick...',
], {image: 'assets/images/npcs/Team Plasma Grunt (male).png'});

const GiantChasmColress = new NPC('Colress', [
    'Welcome! I was asked by an acquaintance to help with his research. What I desire is to bring out the entirety in Pokémon potential! If I can accomplish that, I don\'t care what it takes!',
    'If it means the strength must be brought out by the interactions between Pokémon and Trainers, then so be it! If it means you have to use a merciless approach, like Team Plasma\'s, and force out all of the Pokémon\'s power, then so be it! And yes, if the entire world is destroyed as a result, then so be it...',
    'That aside! The reason I have been traveling all over Unova and battling many Pokémon Trainers is because I was testing the viability of this approach to bringing out the full strength of Pokémon. In that respect, you\'ve done an amazing job.',
    'Well now! Tell me if you have the answer I desire or not! If you\'re ready, come at me!',
], {
    image: 'assets/images/npcs/Team Plasma (colress).png',
    requirement: new MultiRequirement([new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm')), new TemporaryBattleRequirement('Plasma Shadow 1'), new TemporaryBattleRequirement('Colress 3', 1, GameConstants.AchievementOption.less)]),
});

const GiantChasmShadowTriad = new NPC('Shadow Triad', [
    'Listen well! We swore to be loyal to Lord Ghetsis since he saved us! The only thing we want is the world Lord Ghetsis desires! Even if we lose, Lord Ghetsis simply has to win...',
    'The only thing you can do is watch Lord Ghetsis use Kyurem to freeze Unova solid. That\'s all...',
], {
    image: 'assets/images/npcs/specialNPCs/Shadow Triad.png',
    requirement: new MultiRequirement([new TemporaryBattleRequirement('Colress 3'), new TemporaryBattleRequirement('Ghetsis 1', 1, GameConstants.AchievementOption.less)]),
});

const IcirrusFanClubChairman = new NPC('Fan Club Chairman', [
    'Legends say Kyurem is missing a part of itself. It is waiting for a hero to fill in the missing parts of its body with Truth or Ideals.',
    'The legendary dragons of Dragonspiral Tower are said to embody these very concepts. They sometimes leave a piece of their DNA behind after a battle.',
    'If you have DNA splicers, perhaps you can make Kyurem whole again.',
    'I\'ve never seen it, but supposedly it works just like any other evolution item.',
], {image: 'assets/images/npcs/Gentleman.png'});

const P2LaboratoryColress = new NPC('Colress', [
    'So you defeated Ghetsis. Interesting. You must be a very strong trainer.',
    'A rare Pokémon is hiding somewhere inside this abandoned laboratory. You can catch it if you want. I have no interest in it.',
    'However, I do have an interest in you! I want to taste your power. Defeat me, and I\'ll let you search for the rare Pokémon.',
    'I\'ll be waiting for you inside.',
], {
    image: 'assets/images/npcs/Team Plasma (colress).png',
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
    image: 'assets/images/npcs/Scientist (female).png',
    requirement: new TemporaryBattleRequirement('Dream Researcher', 1, GameConstants.AchievementOption.less),
});

const DreamResearcher2 = new NPC('Dream Researcher', [
    'What a battle! That Audinite will let you Mega Evolve your Audino, under certain circumstances.',
], {
    image: 'assets/images/npcs/Scientist (female).png',
    requirement: new TemporaryBattleRequirement('Dream Researcher'),
});

const VitaminRefundCode = new NPC('Pokémon Breeder', [
    'I used to have my Pokémon maxed out on Protein, but then I found out about the new Vitamins!',
    'I swapped out some of my Proteins for the new Vitamins, but then I was left with a bunch of extra Protein I couldn\'t use.',
    'Luckily I was able to use the code REFUND-VITAMINS to get my money back! Too bad it only has one use though...',
    'It will also only refund Vitamins you bought after hitting the price cap.',
]);

const UnovaFossilNpc = new NPC('Friendly Waitress', [
    'Hello! Would you like a seat indoors or on the patio? We have a lovely view of the museum, it used to double as a Gym you know! Business may have slowed down since the new Normal Gym moved to Aspertia, but our ex-Gym Leader Lenora is still at it with her husband restoring fossils!',
    'Just last week they had an exhibit on a prehistoric bird and turtle! There was quite the crowd!',
    '... Do you think they\'re hiring?',
], {image: 'assets/images/npcs/Waitress.png'});

const InvestigateP2 = new NPC('Investigate the P2 Laboratory', [
    '<i>A bright red Pokémon flies past you at a high speed, heading west.</i>',
], {
    image: 'assets/images/shinypokemon/649.05.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Legend Awakened'), new QuestLineStepCompletedRequirement('The Legend Awakened', 1, GameConstants.AchievementOption.less)]),
});

const AncientBugHunter1 = new NPC('Ancient Bug Hunter', [
    'Did you see it come through? The Paleozoic Pokémon, Genesect?',
    'They haven\'t been seen in Unova for millions of years! If one is here now, it\'s sure to be a little confused about what the world is like.',
    'I worry it might attack the city out of fear.',
], {
    image: 'assets/images/npcs/Super Nerd.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Legend Awakened', 2), new QuestLineStepCompletedRequirement('The Legend Awakened', 4, GameConstants.AchievementOption.less)]),
});

const GenesectFight = new NPC('Witness the battle', [
    '<i>The Red Genesect and a powerful Pokémon you don\'t recognize exchange energy blasts. The Red Genesect flees the battle, heading east.</i>',
], {
    image: 'assets/images/npcs/other/GenesectFight.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Legend Awakened', 4), new QuestLineStepCompletedRequirement('The Legend Awakened', 6, GameConstants.AchievementOption.less)]),
});

const AncientBugHunter2 = new NPC('Ancient Bug Hunter', [
    'Wow! A real, live Genesect!',
    'I hear that when you equip them with powerful Drive devices, they change forms!',
    'They also have a high-speed form, which I hear has been sighted across Unova.',
], {
    image: 'assets/images/npcs/Super Nerd.png',
    requirement: new QuestLineCompletedRequirement('The Legend Awakened'),
});
//Unova Towns
TownList['Aspertia City'] = new Town(
    'Aspertia City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [new BulletinBoard(GameConstants.BulletinBoards.Unova)],
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
        requirements: [new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 0)],
        npcs: [CasteliaMusician, GenesectFight],
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
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 1),
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
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 2),
        ],
        npcs: [NimbasaExplorer],
    }
);
TownList['Driftveil City'] = new Town(
    'Driftveil City',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [TemporaryBattleList['Hugh 7'], DriftveilCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Driftveil City']), DriftveilBerryMaster],
    {
        requirements: [
            new RouteKillRequirement(10, GameConstants.Region.unova, 5),
            new TemporaryBattleRequirement('Team Plasma Grunt 2'),
            new TemporaryBattleRequirement('Team Plasma Grunt 3'),
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 4),
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
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 4),
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
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 7),
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
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 8),
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
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 11),
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
        npcs: [VitaminRefundCode, UnovaFossilNpc],
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
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 0),
    ],
    [TemporaryBattleList['Red Genesect 1'], TemporaryBattleList['Red Genesect 2']],
    {
        npcs: [AncientBugHunter1, AncientBugHunter2],
    }
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
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 14),
    ]
);
TownList['Plasma Frigate'] = new DungeonTown(
    'Plasma Frigate',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new OneFromManyRequirement([
            new MultiRequirement([
                new GymBadgeRequirement(BadgeEnums.Wave),
                new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 14),
                new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 15, GameConstants.AchievementOption.less),
            ]),
            new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 16),
            new QuestLineCompletedRequirement('Hollow Truth and Ideals'),
        ]),
    ],
    [TemporaryBattleList['Colress 3'], TemporaryBattleList['Plasma Shadow 2'], TemporaryBattleList['Plasma Shadow 3'], TemporaryBattleList['Plasma Shadow 4']],
    {
        npcs: [GiantChasmColress, GiantChasmShadowTriad],
    }
);
TownList['Giant Chasm'] = new DungeonTown(
    'Giant Chasm',
    GameConstants.Region.unova,
    GameConstants.UnovaSubRegions.Unova,
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Plasma Frigate')),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 15),
    ],
    [TemporaryBattleList['Ghetsis 1'], TemporaryBattleList['Ghetsis 2']]
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
        npcs: [P2LaboratoryColress, InvestigateP2],
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
    ItemList.Wonder_Chest,
    ItemList.Miracle_Chest,
]);
const FriseurFurfrouShop = new Shop([
    ItemList['Furfrou (Debutante)'],
    ItemList['Furfrou (Diamond)'],
    ItemList['Furfrou (Matron)'],
    ItemList['Furfrou (Dandy)'],
    ItemList['Furfrou (Kabuki)'],
    ItemList['Furfrou (Pharaoh)'],
    ItemList['Furfrou (Heart)'],
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

//Hoenn Flute Master
const FurfrouGemTrader = new GemMasterShop(GameConstants.GemShops.FurfrouGemTrader, 'Furfrou Gem Trader');
const KalosStoneSalesman = new GemMasterShop(GameConstants.GemShops.KalosStoneSalesman, 'Stone Emporium', [new TemporaryBattleRequirement('Kalos Stone Salesman')], true);

//Kalos NPCs

const LumioseEngineer = new NPC('Engineer', [
    'I\'m glad to be back in the city after so long at the Power Plant; it\'s so dusty out there!',
    'Rumor has it that if you conquer the Kalos Power Plant enough times, a strong Pokémon made out of Fire and Water will challenge you. But I bet you’d have to be the Champion before it finds you worthy… I certainly have never seen it!',
]);

const LumioseDexio = new NPC('Dexio', [
    'Hey there! I\'m one of Professor Sycamore\'s assistants. If you\'ve made it to Kalos, you probably have a pretty impressive Pokédex by now, right?',
    'When you\'ve got your Pokédex open, you can click on a Pokémon\'s image to see more detailed stats about the Pokémon.',
    'Even if you don\'t remember details like how many times you\'ve encountered a particular species in the wild, or how many times you\'ve captured a Pokémon, your Pokédex does!',
    'And if some of the rumours about Mega Stones are true... it\'ll be worth keeping track of those sorts of things.',
], {
    image: 'assets/images/npcs/Dexio (Gen 6).png',
});

const Lysandre1 = new NPC('Lysandre', [
    'Oh! You\'ve already met Professor Sycamore, how wonderful! That is a wonderful thing, indeed. You are one of the chosen ones.',
    'I am Lysandre. I\'ve tried to learn as much about Pokémon as I can to help build a brighter future. Professor Sycamore has taught me so much.',
    'Now listen! It is vital that this world becomes a better place. The people and Pokémon chosen to make the world better must work tirelessly to achieve this goal.',
    'Well, I\'ll be off. Please give Professor Sycamore my best. My desire... it is for a more beautiful world!',
], {image: 'assets/images/npcs/Team Flare Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('A Beautiful World'), new QuestLineStepCompletedRequirement('A Beautiful World', 1, GameConstants.AchievementOption.less)]),
});

const Calem1 = new NPC('Calem', [
    'Hi $playername$, I just saw Diantha, a really cool and pretty actress, talking with a funny looking guy with orange spiky hair.',
    'He was such a weirdo. He kept telling her how everything should be beautiful forever and how he would end the world in an instant so that beauty never fades.',
    'Anyway, I\'m gonna continue forward. I\'ll wait for you in Ambrette Town.',
], {
    image: 'assets/images/npcs/Calem.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 0), new QuestLineStepCompletedRequirement('A Beautiful World', 2, GameConstants.AchievementOption.less)]),
});

const CamphrierFlabébéEnthusiast = new NPC('Flabébé Enthusiast', [
    'Ah, isn\'t Flabébé such an eye-catching Pokémon? All these different lovely colors…',
    'If you\'re searching for the yellow and blue kinds, look no further than the Farm!',
    'They simply can\'t resist berries that match their colors - just plant a few and they\'ll soon come wandering in.',
]);

const Calem2 = new NPC('Calem', [
    'Oh $playername$, you made it here. I wanted to learn about fossils so I went to the fossil lab, but the head scientist is not here.',
    'I heard he\'s in Glittering Cave but I also saw some weird guys in orange going there. Will you come with me and check it out?',
], {
    image: 'assets/images/npcs/Calem.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 1), new QuestLineStepCompletedRequirement('A Beautiful World', 3, GameConstants.AchievementOption.less)]),
});

const KalosFossilNpc1 = new NPC('Honeymooner Gal', [
    'I must find one! I simply must!',
    'I sent my husband to buy tickets for the aquarium but it was all a ploy to get some alone time so I can find him a Pokémon fossil found only here in Kalos!',
    'According to my brochure, there\'s a pretty cave past these cliffs that\'s filled with them! It says reviving a Jaw Fossil can give you a Tyrunt, the perfect anniversary gift for my sweetie pie!',
    'I WILL find a Jaw Fossil! Nothing will get in the way of seeing my booboo\'s smile! Anything is possible with the power of love! And don\'t you forget that either!',
], {
    image: 'assets/images/npcs/Tourist (female).png',
    requirement: new OneFromManyRequirement([
        new ObtainedPokemonRequirement('Tyrunt', true),
        new ObtainedPokemonRequirement('Amaura', true),
    ]),
});

const KalosFossilNpc2 = new NPC('Honeymooner Guy', [
    'I have to find one! I just have to!',
    'I told my wife I was going buy tickets for the aquarium in the town back there but little did she know it was a white lie so I could search for a Pokémon fossil found only here in Kalos!',
    'According to my travel guide, this cave is filled with them! It says reviving a Sail Fossil can nab you an Amaura, the perfect anniversary gift for my pumpkin!',
    'I MUST find a Sail Fossil! Nothing will get in the way of making my sunshine happy! She\'s taught me that anything is possible with the power of love!',
], {
    image: 'assets/images/npcs/Tourist (male).png',
    requirement: new OneFromManyRequirement([
        new ObtainedPokemonRequirement('Tyrunt', true),
        new ObtainedPokemonRequirement('Amaura', true),
    ]),
});

const KalosFossilNpc3 = new NPC('Honeymooner Couple', [
    'Oh, you\'ve found all the fossil Pokémon native to Kalos! We tried too, but our search ended in failure. No, that\'s not entirely true...!',
    'We may not have found those fossils, but our real goal was making each other smile! No Pokémon can compare to the feeling of catching your loved one in the same secret act as you! To think we split up to surprise each other with a fossil when the real present is the time we spend together!',
    'Safe travels, Trainer! And may the blessing of love follow you!',
], {
    image: 'assets/images/npcs/Honeymooners.png',
    requirement: new MultiRequirement([
        new ObtainedPokemonRequirement('Tyrunt'),
        new ObtainedPokemonRequirement('Amaura'),
    ]),
});

const FossilScientist = new NPC('Fossil Scientist', [
    'Why, hello! Here to look for fossils as well?',
    'What did you say? Teemphlair was here? What\'s that? A Pokémon?',
    'You are very lucky! I just now found a fossil! But it\'s one I already have, so I\'ll give it to you!',
    'Well, I\'m going back to the lab, goodbye!',
], {
    image: 'assets/images/npcs/Scientist (male).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 4), new QuestLineStepCompletedRequirement('A Beautiful World', 6, GameConstants.AchievementOption.less)]),
});

const TeamFlareGrunt1 = new NPC('Team Flare Grunt', [
    'Stop right there! I remember you! You\'re the one who foiled our fossil-finding plans!',
    'And now you\'re here, standing around these stones. Do you have any idea what they even are?',
    'Of course you don\'t! You know nothing about the legend of 3000 years ago that says...',
    'Oh, whatever! Who cares about all of that? It\'s time for me to get some sweet revenge... with style!',
], {
    image: 'assets/images/npcs/Team Flare Grunt (male).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 6), new QuestLineStepCompletedRequirement('A Beautiful World', 8, GameConstants.AchievementOption.less)]),
});

const SharlourKorrina = new NPC('Korrina', [
    'What an explosive battle! I could tell that you didn\'t hold anything back!',
    'To Mega Evolve your Lucario, you need an even stronger bond!',
    'You can follow your progress in your Pokédex.',
    'When your bond is strong enough, you can Mega Evolve it using a Key Stone! You can buy them in this city!',
], {
    image: 'assets/images/npcs/Korrina.png',
    requirement: new TemporaryBattleRequirement('Korrina'),
});

const CoumarineBirdwatcher = new NPC('Birdwatcher', [
    'I\'ve heard there is a cave you can find if you go out on the ocean a little ways.',
    'Apparently defeating a strong creature there unleashes some energy.',
    'There are rumors that the energy calls some legendary birds to roam Kalos!',
]);

const CoumarineElectricTrainer = new NPC('Electric Trainer', [
    'My Ampharos has gotten a boost since a friendly soul gave me an Ampharosite!',
    'Luckily my Ampharos was already strong enough to use it!',
    'If you find that fella, tell him the code <b>DO-MAGEARNA-DREAM-OF-MAREEP?</b> and he might help you too!',
]);

const Diantha1 = new NPC('Diantha', [
    'Bonds... They really are important to us all, aren\'t they? When I\'m acting, I think I\'m always trying to forge a bond between myself and the character I\'m playing.',
    'If all I think about is how I\'m nothing like a character, then I\'ll just hate playing it.',
    'But if I focus on what I have in common with the character and put myself in her shoes, I might be able to understand her. It\'s the same for people, or Pokémon.',
    'Oh, never mind me! I\'m just babbling about my own things. Let\'s have a battle the next we meet, shall we? I\'m looking forward to it!',

], {
    image: 'assets/images/npcs/Diantha.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 8), new QuestLineStepCompletedRequirement('A Beautiful World', 10, GameConstants.AchievementOption.less)]),
});

const Lysandre2 = new NPC('Lysandre', [
    'Professor Sycamore told me how much stronger you\'ve become.',
    'That is truly wonderful. With that power, you can steer your future in a better direction!',
    'We can\'t just cover up the old filth with new filth!',
    'I implore you to consider what we need to do to change the world into a new, beautiful world!',
], {image: 'assets/images/npcs/Team Flare Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 9), new QuestLineStepCompletedRequirement('A Beautiful World', 11, GameConstants.AchievementOption.less)]),
});

const Lysandre3 = new NPC('Lysandre', [
    'I\'m a descendant of the king\'s younger brother. That being said, that story is 3,000 years old, so it might not be entirely reliable.',
    'People can be divided into two groups. Those who give... And those who take... It\'s just as how the Kalos region\'s two Legendary Pokémon gave life and took life.',
    'I want to be the kind of person who gives... But in this world, some foolish humans exist who would show their strength by taking what isn\'t theirs. They\'re filth!',
    'Long, long ago, the king of Kalos sought to take everything for his own, and he created a terrible weapon. Then the fire of destruction was unleashed... That is the legend that has been passed down.',
    'Kalos is beautiful right now! There will be no foolish actions if the number of people and Pokémon do not increase. That being said, the future isn\'t decided. You can\'t be sure each day will be like the one before.',
    'What the king of Kalos did was reprehensible, but... The ultimate weapon did manage to wash the world clean of that era\'s filth. Thank you for listening.',
], {image: 'assets/images/npcs/Team Flare Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 12), new QuestLineStepCompletedRequirement('A Beautiful World', 14, GameConstants.AchievementOption.less)]),
});

const LaverreFurisodeGirlKatherine = new NPC('Furisode Girl Katherine', [
    'Don\'t you find Goomy to be an interesting Pokémon? I certainly think so, even though it isn\'t a problem for my Pokémon~',
    'I\'ve heard its evolutionary line loves damp conditions, and apparently if you train a Sliggoo during rainy or foggy weather something marvelous happens!',
], {image: 'assets/images/npcs/Furisode Girl Katherine.png'});

const LaverreGengariteAster1 = new NPC('Hex Maniac Aster', [
    'I\'m shocked... You have a Pokédex, but you still don\'t know... you really don\'t know anything about Pokémon connected to Gengar, do you?',
    'Well then, I guess I\'ll just have to keep this wonderful item I was going to give you...',
    'If you want to change my mind... you will have to encounter at least 666 wild Gastly, 444 wild Haunter, and 13 wild Gengar.',
    'And do bring a Gengar of your own, won\'t you?',
], {
    image: 'assets/images/npcs/Hex Maniac.png',
    requirement: new OneFromManyRequirement([
        new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Gastly').id], 666, undefined, GameConstants.AchievementOption.less),
        new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Haunter').id], 444, undefined, GameConstants.AchievementOption.less),
        new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Gengar').id], 13, undefined, GameConstants.AchievementOption.less),
        new ObtainedPokemonRequirement('Gengar', true)]),
});

const LaverreGengariteAster2 = new NPC('Hex Maniac Aster', [
    'Some Pokémon evolve when exposed to a Linking Cord, or sent through a trade.',
    'That\'s right. Haunter is one of those Pokemon.',
    'I don\'t have enough Quest Points to buy a Linking Cord, but a girl named Mindy from Snowpoint City offered to trade me her Haunter for a Medicham.',
    'Hopefully I\'ll have a Gengar soon...',
], {image: 'assets/images/npcs/Hex Maniac.png',
    requirement: new TemporaryBattleRequirement('Hex Maniac Aster'),
});

const PokéBallFactoryDirector = new NPC('Poké Ball Factory Director', [
    'You saved us! Thank you so much! You\'re an astounding Pokémon Trainer.',
    'Very well, then. I want to show my appreciation. I\'ll give you a Master Ball.',
    'I have a feeling you will put it to great use. You\'re different from those Team Flare people.',
    'What were they planning to accomplish by taking all the Poké Balls for themselves...',
], {image: 'assets/images/npcs/Gentleman (Gen 4).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 14), new QuestLineStepCompletedRequirement('A Beautiful World', 16, GameConstants.AchievementOption.less)]),
});

const DendemilleDogLover = new NPC('Dubious Dog-loving Duke', [
    'Dog Pokémon are the best of all! I\'m particularly fond of Houndour - I\'ve caught about five hundred of them.',
    'There\'s no such thing as a cold night in my house, no sir! The most fierce chill of winter is completely defeated by their warm, cozy presence.',
    'But recently, now that I\'ve got so many Houndour, they have been acting rather curiously.',
    'When the weather turns sunny, they\'ll all run barking out onto Route 16. Honestly, it\'s quite a racket, and has gotten me into no small amount of trouble.',
    'They come wandering back when the weather changes, though. I wonder if a strong Pokémon is calling them?',
    'You could build your own Houndour pack and find out, but if it\'s strong enough to call five hundred Pokémon, it probably wouldn\'t give anyone weaker than Diantha the time of day.',
], {image: 'assets/images/npcs/Gentleman.png',
});

const DendemilleWolfLover = new NPC('Worrisome Wolf-loving Woman', [
    'I adore wolf Pokémon! The most precious of all have to be the brave little Electrike - I\'ve gathered five hundred of the darlings in my home.',
    'They\'re so loyal, and so fast! I give them letters to take to a friend in Galar in the morning, and I have a response back by supper!',
    'But now that I have so many of them, their behaviour has taken a... regrettable turn.',
    'When storms come along the horizon, they\'ll run en masse out to Route 16.',
    'They fortunately do return home when the weather changes, at least. I wonder what sort of creature is calling them? A strong Pokémon, perhaps?',
    'I\'ve been debating asking someone else to collect five hundred of their own Electrike and investigate, but if it can call such a fearsome pack with its presence alone, I don\'t imagine anyone less than Diantha herself could handle it.',
], {image: 'assets/images/npcs/Madame.png',
});

const ProfessorSycamore1 = new NPC('Prof. Sycamore', [
    'Hello $playername$! Do you remember the Pokémon Lysandre mentioned in that café? Kalos\'s Legendary Pokémon are called... Xerneas and Yveltal!',
    'Apparently, these Pokémon can control energy or absorb energy, respectively. Xerneas gives life energy to plants and Pokémon, whereas Yveltal steals all of the spirits around it.',
    'When they lose all of their vitality, they go to sleep in a secret place. It would be absolutely astounding if you found it!',
    'By the way, I heard Frost Cavern has a lot of cool Pokémon, why don\'t you go check it out?',
], {image: 'assets/images/npcs/Sycamore.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 15), new QuestLineStepCompletedRequirement('A Beautiful World', 17, GameConstants.AchievementOption.less)]),
});

const AnistarKalosRoamerNPC = new RoamerNPC('Hex Maniac Melanie', [
    'The spirits tell me roaming Pokémon have been spotted on {ROUTE_NAME}!',
], GameConstants.Region.kalos, RoamingPokemonList.findGroup(GameConstants.Region.kalos, GameConstants.KalosSubRegions.Kalos), 'assets/images/npcs/Hex Maniac.png');

const KalosTVNews = new NPC('Kalos TV News', [
    'Pokémon Trainers. I come to you to make an important announcement. Listen well.',
    'Team Flare will revive the ultimate weapon, eliminate everyone who isn\'t in our group, and return the world to a beautiful, natural state.',
    'Unproductive fools are consuming our future... If nothing changes, the world will become ugly and conflicts will raze the land from end to end.',
    'I repeat. We will use the ultimate weapon and wipe the slate clean. I\'m sorry, those of you who are not members of Team Flare, but this is adieu to you all.',
], {image: 'assets/images/npcs/Team Flare Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 18), new QuestLineStepCompletedRequirement('A Beautiful World', 20, GameConstants.AchievementOption.less)]),
});

const Lysandre4 = new NPC('Lysandre', [
    'Welcome. I guess you found my secret labs, inside my own café. The world was just too vast...and too full of fools that I couldn\'t save through my hard work alone...',
    'That\'s why I decided the only way to save the world was to take it all for myself. I don\'t expect that I will ever make you understand how I think and feel...',
    'Try to stop the ultimate weapon if you must. Saving everything... The world is suffering because of this absurd dream...',
], {image: 'assets/images/npcs/Team Flare Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 19), new QuestLineStepCompletedRequirement('A Beautiful World', 21, GameConstants.AchievementOption.less)]),
});

const AZ1 = new NPC('AZ', [
    'Listen, trainer who will face Lysandre. A terribly long time ago... There was a man and a Pokémon. A war began. The man\'s beloved Pokémon took part in the war.',
    'The Pokémon died. The man wanted to bring the Pokémon back. No matter what it took. The man built a machine to give it life and succeeded.',
    'The lives of many Pokémon were taken to restore its life. The resurrected Pokémon left the man.',
    'The man had suffered too much. His rage had not subsided. He turned the machine into the ultimate weapon. The man became a bringer of destruction that ended the war.',
], {image: 'assets/images/npcs/AZ.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 21), new QuestLineStepCompletedRequirement('A Beautiful World', 23, GameConstants.AchievementOption.less)]),
});

const BlueButton = new NPC('Blue Button', [
    'You pressed it! Oh ho ho! You pressed the blue switch! Winner, winner! Congratulations!',
    'But I\'m still going to activate the ultimate weapon! I\'ll just use my remote, here! Click-click! And the power is ON!',
    'The ultimate weapon is reborn! The poisonous flower has bloomed! All shall perish! Except for Team Flare! Look at Geosenge! It has bloomed in Geosenge Town!',
    'The boss\'s dream of creating a beautiful world will come true! Add it all up, and it equals... a victory for our SCIENCE!',
], {image: 'assets/images/npcs/Team Flare Xerosic.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 23), new QuestLineStepCompletedRequirement('A Beautiful World', 24, GameConstants.AchievementOption.less)]),
});

const RedButton = new NPC('Red Button', [
    'You pushed it! Oh ho ho! You pushed the little red button! Too bad...for you!',
    'Pushing that button has enabled us to use the ultimate weapon! Don\'t feel too down, though. I would have activated it even if you had guessed correctly.',
    'The ultimate weapon is reborn! The poisonous flower has bloomed! All shall perish! Except for Team Flare! Look at Geosenge! It has bloomed in Geosenge Town!',
    'The boss\'s dream of creating a beautiful world will come true! Add it all up, and it equals... a victory for our SCIENCE!',
], {image: 'assets/images/npcs/Team Flare Xerosic.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 23), new QuestLineStepCompletedRequirement('A Beautiful World', 24, GameConstants.AchievementOption.less)]),
});

const TeamFlareLysandre1 = new NPC('Team Flare Lysandre', [
    'The ultimate weapon\'s flower has finally bloomed above the soil. Don\'t you find its beauty captivating? As we speak, it draws its energy from the Legendary Pokémon.',
    'Even though resources, space, and energy on this planet are limited, the number of people and Pokémon has increased to an unsustainable level. Whether it\'s money or energy, the ones who steal are the ones who win in this world.',
    'Pokémon... Shall no longer exist. Pokémon are wonderful beings. Humans have worked with Pokémon, and we have helped each other flourish. But precisely because of that, they will inevitably become tools for war and theft!',
    'You\'re as strong as ever. But... It\'s too late! There\'s no hope for you now! Go down to the lowest floor, and see for yourself!',
], {image: 'assets/images/npcs/Team Flare Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 29), new QuestLineStepCompletedRequirement('A Beautiful World', 31, GameConstants.AchievementOption.less)]),
});

const TeamFlareBossLysandre1 = new NPC('Team Flare Boss Lysandre', [
    'What a startling development! I never would\'ve thought you were really a chosen one!',
    'So THESE were the mighty Xerneas and Yveltal?! I expected more from Pokémon called legend! You desire help from people? YOU need help from a human?',
    'For me, victory is using the ultimate weapon. In order to do that, I need to reclaim the Legendary Pokémon\'s power and send that power to that weapon once again.',
    'I\'ll be taking the Legendary Pokémon back now! This time, I won\'t lose.',
], {image: 'assets/images/npcs/Team Flare Boss Lysandre.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('A Beautiful World', 31), new QuestLineStepCompletedRequirement('A Beautiful World', 33, GameConstants.AchievementOption.less)]),
});

const CouriwayOldGentlemanHarold = new NPC('Old Gentleman Harold', [
    'I love going on walks at <b>dusk</b>. It\'s my favourite part of the day, everything\'s so calm...',
    'Though lately, I\'ve been hearing roars near the waterfalls, but I\'m too scared to see for myself what kind of monster is making those sounds.',
    'I would ask you to go, but I\'m sure you\'re really busy either dealing with Team Flare or the Pokémon League challenge.',
    'Once you are done, you could come back at dusk. Maybe you can do something about it...',
], {image: 'assets/images/npcs/Gentleman (Gen 4).png',
    requirement: new TemporaryBattleRequirement('Team Flare Boss Lysandre 2', 1, GameConstants.AchievementOption.less),
});

const KiloudeConfusedHiker = new NPC('Confused Hiker', [
    'Whoa! What the- Where am I? How did I get here? Last thing I can remember I was in Reflection Cave when this little Pokémon with hoops threw something at me… Oh you’ve beaten the Pokémon League? Maybe you can find it roaming around the region so you can tame that little prankster. Now how am I gonna get home…',
], {image: 'assets/images/npcs/Hiker.png'});

const ProfSycamore = new ProfNPC('Prof. Sycamore',
    GameConstants.Region.kalos,
    'You\'re encountering Pokémon at a really good clip, aren\'t you? Congratulations! You completed the Pokédex!',
    'Onward to Alola, shall we?', 'assets/images/npcs/Sycamore.png');

const MysteryFan = new NPC('Mystery Fan', [
    'I\'ve heard a Pokémon detective is sniffing around here for mysteries! He might be interested in an enigmatic berry, too.',
]);

const Spelunker = new NPC('Spelunker', [
    'I\'ve heard that a hidden realm lies beneath this cave, ruled by a Pokémon Princess. She might come out for a powerful and helpful trainer.',
    'That would be big news, sure to be reported on local bulletin boards!',
]);

const ExamineAegislash = new GiftNPC('Millis and Argus Steels\' Aeglislash', [
    '<i>Aegislash wants to join you on your adventure.</i>',
], () => {
    App.game.party.gainPokemonByName('Aegislash (Blade)');
}, 'assets/images/pokemon/681.01.png', { requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Princess Diancie', 4, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Aegislash (Blade)', true)]) });

const ThanksDiancie = new NPC('Princess Diancie', [
    'Thank you for your help saving the Diamond Domain. I will be waiting for you in Reflection Cave.',
    'There are many threats in this world, and I think we will both be safer if we work together!',
], {
    image: 'assets/images/pokemon/719.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Princess Diancie', 6), new QuestLineStepCompletedRequirement('Princess Diancie', 8, GameConstants.AchievementOption.less)]),
});

const KalosStoneSalesman1 = new NPC('Stone Salesman', [
    'I\'m hunting for rare stones! If I find any extras, I\'ll sell you some!',
], {
    requirement: new TemporaryBattleRequirement('Kalos Stone Salesman', 1, GameConstants.AchievementOption.less),
});

const KalosStoneSalesman2 = new NPC('Stone Salesman', [
    'I\'m selling some peculiar stones for gems at my new shop, the Stone Emporium. Let me know if anything there strikes your fancy!',
], {
    requirement: new TemporaryBattleRequirement('Kalos Stone Salesman'),
});

const Baraz1 = new NPC('Baraz', [
    'Hello, $playername$! My name is Baraz, and my people have a complicated history with Hoopa.',
    'I have come to this region to search of a Prison Bottle, in which the spirit of a powerful Hoopa is bound.',
    'Can you help with my search? My search indicates it is nearby, maybe one of the local Psychic Pokémon has it?',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Clash of Ages', 0), new QuestLineStepCompletedRequirement('Clash of Ages', 2, GameConstants.AchievementOption.less)]),
});

const Baraz2 = new NPC('Baraz', [
    '$playername$! No luck?',
    'Maybe beating the Pokémon isn\'t enough. Try catching some of these Psychic Pokémon.',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Clash of Ages', 2), new QuestLineStepCompletedRequirement('Clash of Ages', 3, GameConstants.AchievementOption.less)]),
});

const Baraz3 = new NPC('Baraz', [
    'There\'s only one Pokémon who could keep the Prison Bottle from us for so long: Hoopa!',
    'You\'ll have to catch a ton before you find the Prison Bottle. Maybe... 100?',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Clash of Ages', 4), new QuestLineStepCompletedRequirement('Clash of Ages', 6, GameConstants.AchievementOption.less)]),
});

const Baraz4 = new NPC('Baraz', [
    'Wow, you caught 100 that fast?',
    'No? There\'s no other way, I\'m sorry...',
    '<i>While Baraz is talking, a hoop appears behind him and the Prison Bottle falls out.</i>',
    'Aha! There it is!',
    '<i>Baraz grabs the Prison Bottle, and an eerie glow surrounds him. A massive Pokémon picks him up and flies away into a nearby hoop.</i>',
], {
    image: 'assets/images/items/quest/Prison_Bottle.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Clash of Ages', 6), new QuestLineStepCompletedRequirement('Clash of Ages', 8, GameConstants.AchievementOption.less)]),
});

const VivillonPhotobook = new NPC('Vivillon Photobook', [
    '<i>Viola has sent some of her Vivillon photographs in to the local Pokémon Center as a photobook, to celebrate the Lunar New Year. You flip through the pages...</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookFancyMeadow.png" style="max-width:100%; height:auto"/>',
    '<i>You see both a Meadow and a Fancy Vivillon flying together in the skies above Kalos. Strangely, the Meadow Vivillon is wearing a necklace of exotic flowers, and the Fancy has a tiny tea cup in its grip.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookMarine.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Marine Vivillon flying above the surface of a lake. It\'s got one foot trailing through the water.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookModern.png" style="max-width:100%; height:auto"/>',
    '<i>You see what was seemingly meant to be a photo of a Pokémon with a bulbous purple tail. However, a Modern Vivillon has jumped in front, and you can\'t get a good look at the other Pokémon.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookJungle.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Jungle Vivillon resting on a blue frog-like Pokémon. The two of them seem to be in the center of a deep bog, but neither looks very concerned.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookMonsoon.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Monsoon Vivillon. It\'s been startled by a light shone in its face. As far as you can see, the area around the spotlight is darker than pitch.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookTundra.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Tundra Vivillon, watching a conveyor belt full of Poké Balls. A worker in the background looks mildly perplexed, as if he was expecting a different Pokémon there.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookSun.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Sun Vivillon bursting through a cloud of smoke. It\'s sweating, but seems to be enjoying itself.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookArchipelago.png" style="max-width:100%; height:auto"/>',
    '<i>You see an Archipelago Vivillon staring in shock at a swaying pillar. A Hoothoot sits next to it, completely unfazed.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookElegant.png" style="max-width:100%; height:auto"/>',
    '<i>You see an Elegant Vivillon frantically pulling at a doorknob. A Klefki seems to be giggling in the background.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookOcean.png" style="max-width:100%; height:auto"/>',
    '<i>You see an Ocean Vivillon snoozing peacefully. An Audino is carefully laying a blanket atop it.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookContinental.png" style="max-width:100%; height:auto"/>',
    '<i>You see a shocked Continental Vivillon staring into a chest. A Voltorb stares back, already primed to explode.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookRiver.png" style="max-width:100%; height:auto"/>',
    '<i>You see a River Vivillon flying through a forest. A spooky old mansion is in the background.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookPolar.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Polar Vivillon peering over the edge of a tower. Clouds travel distantly below.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookSandstorm.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Sandstorm Vivillon atop some desert ruins. It\'s trying to communicate with a large, orange moth-like Pokémon.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookGarden.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Garden Vivillon playing in a field of flowers. The flowers extend far, far into the distance...</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookHighPlains.png" style="max-width:100%; height:auto"/>',
    '<i>You see a High Plains Vivillon dancing with a group of Clefairy. Their dance is illuminated only by the full moon.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookSavanna.png" style="max-width:100%; height:auto"/>',
    '<i>You see a Savanna Vivillon running for its life through a ruined tower. Several dragon-type Pokémon are chasing it relentlessly.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookIcySnow.png" style="max-width:100%; height:auto"/>',
    '<i>You see an Icy Snow Vivillon bundled up with its trainer. It\'s enjoying a much-needed warm cup of cocoa to counteract the icy cave around it.</i>',
    '<img src="assets/images/npcs/textbody/VivillonPhotobookPokéBall.png" style="max-width:100%; height:auto"/>',
    '<i>Lastly, you see a Poké Ball Vivillon in a darkened mall. It\'s trying to scare the camerawoman, completely unaware of the sinister eyes peering from the darkness behind it.</i>',
], {
    requirement: new MultiRequirement([
        new QuestLineCompletedRequirement('The Great Vivillon Hunt!'),
        new SpecialEventRequirement('Lunar New Year'),
    ]),
});

const KalosSafariRanger = new SafariPokemonNPC('Safari Ranger', [
    'We\'ve had sightings of several unique Pokémon today along with the usual familiar faces!',
    'These Pokémon will hide from trainers unless captured elsewhere first.',
], GameConstants.Region.kalos, 'assets/images/npcs/Pokemon Ranger (female).png');

const FriendlyAttendant = new NPC('Friendly Attendant', [
    'Welcome to the Friend Safari!',
    'This place is a lot like the Kanto Safari Zone, except we get a much wider variety of Pokémon coming through here.',
    'Our park staff stocks the Safari with different hard-to-find Pokémon every day. Many of these Pokémon can\'t be caught anywhere else in the world!',
    'As new and rare types of Pokémon are discovered, park staff will add them to our rotation of potential stock!',
]);

const BugCatcherScizor = new NPC('Bug Catcher Elliot', [
    'I heard there was a stone hidden in the Friend Safari that makes Scizor stronger!',
    'It takes a very experienced trainer to find it, though.',
], {image: 'assets/images/npcs/Bug Catcher.png'});

const AnomalyMewtwo2 = new NPC('Anomaly Mewtwo', [
    '<i>This place is... beautiful. I am amazed such a place truly exists.</i>',
    '<i>.......Thank you.</i>',
    '<i>I would like to give you something, but first, may I ask two things of you?</i>',
    '<i>First, I would like to gather 110,000 each of Psychic and Fighting Gems to boost the power of my attacks.</i>',
    '<i>If you could gather 60,000 of each I can take care of the rest.</i>',
    '<i>Also, you have heard of Twisted Spoons, yes? They are items that greatly boost the power of psychic type Pokémon.</i>',
    '<i>When I was created, I had an enhanced version of this item created for me. I have heard it is now in the hands of an organisation named Team Plasma, in an area named P2 Laboratory.</i>',
    '<i>I would greatly appreciate it if you would retrieve this item for me.</i>',
], {
    image: 'assets/images/pokemon/150.02.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 13), new QuestLineStepCompletedRequirement('An Unrivaled Power', 15, GameConstants.AchievementOption.less)]),
});

const AnomalyMewtwo3 = new NPC('Anomaly Mewtwo', [
    '<i>I am even more in your debt. But there is one more thing I would like to ask of you.</i>',
    '<i>Would you be willing to fight me, one last time, in this new home you have given me?</i>',
    '<i>With my Twisted Spoon in hand, my moves boosted by Gems, and my Mega Evolution, I can finally show you the true heights of my power!</i>',
], {
    image: 'assets/images/pokemon/150.02.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 15), new QuestLineStepCompletedRequirement('An Unrivaled Power', 17, GameConstants.AchievementOption.less)]),
});

const AnomalyMewtwo4 = new NPC('Anomaly Mewtwo', [
    '<i>Hah! Your strength is truly unyielding!</i>',
    '<i>I would like to apolagise for accusing you of merely possessing the Mewtwo in your care. It is clear that you greatly care for it, as well as all your other Pokémon. Take this.</i>',
    '</i></br><img src="assets/images/megaStone/Mewtwonite_Y.png"/></br><i>You obtained the Mewtwonite Y!</i>',
    '<i>You are truly deserving of this Mega Stone. Use it to give your Mewtwo a truly unrivaled power.</i>',
], {
    image: 'assets/images/pokemon/150.02.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 17), new QuestLineCompletedRequirement('An Unrivaled Power', GameConstants.AchievementOption.less)]),
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
        npcs: [MysteryFan, VivillonPhotobook],
    }
);
TownList['Lumiose City'] = new Town(
    'Lumiose City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Sycamore 1'], TemporaryBattleList['Tierno 1'], DepartmentStoreShop, FriseurFurfrouShop, KalosStoneSalesman, TemporaryBattleList['Team Flare Lysandre 1'], TemporaryBattleList['Team Flare Xerosic'], TemporaryBattleList['Storyline AZ'], TemporaryBattleList.AZ, TemporaryBattleList.Merilyn, TemporaryBattleList['Grand Duchess Diantha'], TemporaryBattleList['Kalos Stone Salesman']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)],
        npcs: [ProfSycamore, LumioseDexio, LumioseEngineer, Lysandre1, Calem1, Lysandre3, Lysandre4, AZ1, BlueButton, RedButton, KalosStoneSalesman1, KalosStoneSalesman2],
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
    [new ShardTraderShop(GameConstants.ShardTraderLocations['Parfum Palace'], 'Furfrou Shard Trader', true), FurfrouGemTrader],
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
        npcs: [KalosFossilNpc1, KalosFossilNpc3, Calem2],
    }
);
TownList['Cyllage City'] = new Town(
    'Cyllage City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [CyllageCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Cyllage City']), TemporaryBattleList['Marquis Grant']],
    {
        requirements: [new QuestLineStepCompletedRequirement('A Beautiful World', 5)],
    }
);
TownList['Geosenge Town'] = new Town(
    'Geosenge Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [GeosengeTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Geosenge Town']), new MoveToDungeon(dungeonList['Team Flare Secret HQ']), TemporaryBattleList['Team Flare Grunt 2']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 10)],
        npcs: [TeamFlareGrunt1],
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
        npcs: [CoumarineBirdwatcher, CoumarineElectricTrainer, Diantha1, Lysandre2],
    }
);
TownList['Laverre City'] = new Town(
    'Laverre City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [LaverreCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Laverre City']), TemporaryBattleList['Hex Maniac Aster']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 14)],
        npcs: [LaverreFurisodeGirlKatherine, LaverreGengariteAster1, LaverreGengariteAster2],
    }
);
TownList['Dendemille Town'] = new Town(
    'Dendemille Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [DendemilleTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Dendemille Town'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)],
        npcs: [DendemilleWolfLover, DendemilleDogLover, ProfessorSycamore1],
    }
);
TownList['Anistar City'] = new Town(
    'Anistar City',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [AnistarCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Anistar City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 17)],
        npcs: [AnistarKalosRoamerNPC, KalosTVNews],
    }
);
TownList['Couriway Town'] = new Town(
    'Couriway Town',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [TemporaryBattleList['Sycamore 2'], TemporaryBattleList['Shauna 2'], TemporaryBattleList['Tierno 2'], TemporaryBattleList.Trevor, CouriwayTownShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Couriway Town']), TemporaryBattleList['Team Flare Boss Lysandre 2']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)],
        npcs: [CouriwayOldGentlemanHarold],
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
        npcs: [KiloudeConfusedHiker, Baraz1, Baraz2, Baraz3, Baraz4],
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
TownList['Friend Safari'] = new Town(
    'Friend Safari',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new SafariTownContent()],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
        npcs: [KalosSafariRanger, FriendlyAttendant, BugCatcherScizor],
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
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 9), new QuestLineStepCompletedRequirement('A Beautiful World', 2)],
    [TemporaryBattleList['Team Flare Grunt 1']],
    {
        npcs: [FossilScientist, KalosFossilNpc2],
    }
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
    [new GymBadgeRequirement(BadgeEnums.Fairy)],
    [],
    {
        npcs: [PokéBallFactoryDirector],
    }
);
TownList['Kalos Power Plant'] = new DungeonTown(
    'Kalos Power Plant',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 13), new GymBadgeRequirement(BadgeEnums.Plant), new QuestLineStepCompletedRequirement('A Beautiful World', 10)]
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
    [new QuestLineStepCompletedRequirement('A Beautiful World', 16)]
);
TownList['Team Flare Secret HQ'] = new DungeonTown(
    'Team Flare Secret HQ',
    GameConstants.Region.kalos,
    GameConstants.KalosSubRegions.Kalos,
    [new QuestLineStepCompletedRequirement('A Beautiful World', 24)],
    [TemporaryBattleList.Xerneas, TemporaryBattleList.Yveltal, TemporaryBattleList['Team Flare Boss Lysandre 1']],
    {
        npcs: [TeamFlareLysandre1, TeamFlareBossLysandre1],
    }
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
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 20)],
    [],
    {
        npcs: [AnomalyMewtwo2, AnomalyMewtwo3, AnomalyMewtwo4],
    }
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
    ItemList.Wonder_Chest,
    ItemList.Miracle_Chest,
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
//Silvally Typings Shops
const BrookletHillShop = new Shop(
    [
        ItemList.Water_Memory_Silvally,
    ],
    'Lana\'s Trade',
    [
        new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 5, GameConstants.AchievementOption.more), new ItemRequirement(1, 'Water_Memory_Silvally', GameConstants.AchievementOption.less)]),
    ],
    true
);
const LushJungleShop = new Shop(
    [
        ItemList.Grass_Memory_Silvally,
    ],
    'Mallow\'s Trade',
    [
        new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 7, GameConstants.AchievementOption.more), new ItemRequirement(1, 'Grass_Memory_Silvally', GameConstants.AchievementOption.less)]),
    ],
    true
);
const WelaVolcanoParkShop = new Shop(
    [
        ItemList.Fire_Memory_Silvally,
    ],
    'Kiawe\'s Trade',
    [
        new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 9, GameConstants.AchievementOption.more), new ItemRequirement(1, 'Fire_Memory_Silvally', GameConstants.AchievementOption.less)]),
    ],
    true
);
const HokulaniObservatoryShop = new Shop(
    [
        ItemList.Electric_Memory_Silvally,
    ],
    'Sophocles\'s Trade',
    [
        new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 11, GameConstants.AchievementOption.more), new ItemRequirement(1, 'Electric_Memory_Silvally', GameConstants.AchievementOption.less)]),
    ],
    true
);
const MountLanakilaShop = new Shop(
    [
        ItemList.Ice_Memory_Silvally,
    ],
    'Veteran Aristo\'s Trade',
    [
        new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 13, GameConstants.AchievementOption.more), new ItemRequirement(1, 'Ice_Memory_Silvally', GameConstants.AchievementOption.less)]),
    ],
    true
);
const ExeggutorIslandHillShop = new Shop(
    [
        ItemList.Ground_Memory_Silvally,
    ],
    'Hapu\'s Trade',
    [
        new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 15, GameConstants.AchievementOption.more), new ItemRequirement(1, 'Ground_Memory_Silvally', GameConstants.AchievementOption.less)]),
    ],
    true
);

// Magikarp Jump Shops
const MagikarpJumpGemTrade = new GemMasterShop(GameConstants.GemShops.MagikarpJumpGemTrader, 'Trade', [new GymBadgeRequirement(BadgeEnums.Heal_League)]);
const MagikarpJumpShadySalesMan = new Shop([
    ItemList['Magikarp Blue Raindrops'],
    ItemList['Magikarp Saucy Violet'],
], 'Shady Salesman', [new GymBadgeRequirement(BadgeEnums.Master_League)]);


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
], {image: 'assets/images/npcs/Teacher (gen7).png'});
const IkiKahuna = new NPC('Kahuna Hala', [
    'Welcome to Alola!',
    'Here we don\'t have gyms. We have the Island Challenge. On each of our four islands you will complete one or more trials.',
    'After completing all of an island\'s trials, you will battle that island\'s Kahuna in a Grand trial.',
    'This island only has one trial: Captain Ilima\'s trial in Verdant Cavern, below the Melemele Woods. Come back here after clearing that challenge for your Grand trial battle.',
], {
    image: 'assets/images/npcs/Hala.png',
    requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more)]),
});
const HeaheaCafeOwner = new NPC('Café Owner', [
    'Akala Island has three trials.',
    'Captain Lana\'s trial in Brooklet Hill, Captain Kiawe\'s trial in Wela Volcano Park and Captain Mallow\'s trial in Lush Jungle.',
    'For what it\'s worth, I say don\'t go to any of those places. Too wet, too hot and too... jungly. Why not stay here? Have a coffee! Enjoy the city!',
    'Or go to Konikoni City down south. You might even meet our Kahuna there!',
], {image: 'assets/images/npcs/Owner.png'});
const PikachuValleyPikachuGeneric = new NPC('Pikachu', [
    'Pikachu!',
    '<i>The Pikachu looks happy playing with all its friends!</i>',
], {
    image: 'assets/images/pokemon/25.png',
});
const PikachuValleyAlolaCap = new NPC('Pikachu', [
    'Pi-Pikachu!',
    '<i>The Pikachu is waving at you supportively! Its goodwill carries you forward on your journey to Alola Championship!</i>',
], {
    image: 'assets/images/pokemon/25.06.png',
    requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion, GameConstants.AchievementOption.less),
});
const PikachuValleyPikachuWorldCap = new NPC('Pikachu', [
    'Pii-kachu!',
    '<i>The Pikachu is staring at you intently! Is it waiting for you to become stronger?</i>',
], {
    image: 'assets/images/pokemon/25.07.png',
    requirement: new MultiRequirement([new MaxRegionRequirement(GameConstants.Region.galar), new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion, GameConstants.AchievementOption.less)]),
});
const PaniolaTownActor = new NPC('Actor Meredith', [
    'I love Oricorio. I can tell you all about it!',
    'Each of the four islands in Alola has its own meadow, and each meadow has its own form of Oricorio. Each island, except for Akala Island. So you\'d think there\'s only three forms of Oricorio, right?',
    'Wrong! There is a fourth! Did you know you can find all of the Oricorio forms on the farm? One of them doesn\'t appear anywhere else!',
    'Each Oricorio form is attracted to the berry color that matches its own style. Red for Baile style, yellow for Pom-Pom style, pink for Pa\'u style and purple for Sensu style.',
    'You want to know which one can only be found on the farm? I\'m sure you can figure that out yourself. Simple process of elimination, really.',
], {image: 'assets/images/npcs/Actor.png'});
const RoyalAvenueSpectator = new NPC('Spectator', [
    'I like sneaking snacks inside the Battle Royal Dome. One time I snuck in pancakes and there were two trainers from Kanto who both had a Pikachu. I ended up sharing some with one.',
    'Weird thing is, both trainers evolved their Pikachu after the battle, but one had a different form from usual! Maybe there\'s something about Alola that makes certain Pokémon evolve differently? I would check my Evolution Items if I were you.',
], {image: 'assets/images/npcs/Preschooler (female).png'});
const KonikoniKahuna = new NPC('Kahuna Olivia', [
    'What do you mean Grand trials are just like gym battles? It\'s a totally different thing!',
    'Come fight me in our very special and unique brand new Pokémon League and see if you still think our Island Challenge is nothing special!',
], {
    image: 'assets/images/npcs/Olivia.png',
    requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more)]),
});
const MalieKahuna = new NPC('Kahuna Nanu', [
    'A trial-goer, huh? Figures.',
    'Just go clear Captain Sophocles\' trial at the Hokulani Observatory and Captain Acerola\'s Trial at the Thrifty Megamart. And take care of those Team Skull punks in Po Town while you\'re at it.',
    'Then come back here so we can get this Grand trial over with.',
], {
    image: 'assets/images/npcs/Nanu.png',
    requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more)]),
});
const TapuWorker = new NPC('Worker Ovid', [
    'Yesterday was my first day working on Mount Lanakila. I was up there maintaining the paths to the new Pokémon League.',
    'My trusty Crabrawler was with me. He was smashing some rocks that were blocking the path, having a grand ol\' time like usual, when suddenly we were attacked by a wild Pokémon!',
    'After the battle, Crabrawler evolved! I didn\'t even know he could do that. He\'s so different now. But I still love him. He\'s my best friend, and he\'s even better at rock smashing now!',
], {image: 'assets/images/npcs/Worker (male).png'});
const SeafolkCaptain = new NPC('Captain Mina', [
    'My trial is in this town. Right there, inside my very own houseboat. However, I want you to clear the trial in Vast Poni Canyon first. It has no Captain, so you\'ll be all on your own. Be careful.',
    'If you can clear my trial you\'ll find our Kahuna on Exeggutor Island.',
], {
    image: 'assets/images/npcs/Mina.png',
    requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more)]),
});
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
    image: 'assets/images/npcs/Team Plasma (colress).png',
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

//Silvally Types NPC
const SilvallyGladion1 = new NPC('Gladion', [
    'Oh, it\'s you. I thought the professor would help when I put my request up at the Bulletin Board, but the Champion\'s even better.',
    'See, my Silvally has been acting strange lately, almost as if it\'s back to being haunted by its traumatizing past, the poor thing. Silvally are unique Pokémon who can download memories from artificial disks to change their type, but my Silvally\'s own memories somehow got mixed in with them. I need to get the disks back and recover its memories. That\'s where you come in.',
    'Silvally has its memories divided in 17 parts and I lost all of them after traveling with it around Alola. Try talking with citizens of all four islands to find out if they know anything about them. If you help me restore its memories I\'ll maybe give you a reward, but don\'t expect any charity. The memories look like this:',
    '<img src="assets/images/items/quest/Dark_Memory_Silvally.png">',
    'Keep an eye out if you come across any of them.',
], {
    image: 'assets/images/npcs/Gladion.png',
    requirement: new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 2, GameConstants.AchievementOption.less), new QuestLineStartedRequirement('Typing some Memories', GameConstants.AchievementOption.more)]),
});
const SilvallyHala = new NPC('Kahuna Hala', [
    'Greetings, $playername$. May I help you with something? Oh, you\'re looking for things called Silvally Memories? Something like this one?',
    '<img src="assets/images/items/quest/Fighting_Memory_Silvally.png">',
    'I found that while getting back here after helping Ilima in the Verdant Cavern. If you need it, I can give it to you. Here it is. Oh, also Kahuna Olivia told me she found one of these on Akala Island somewhere. Maybe you should go and ask her for it too. She\'ll probably give it to you as she also doesn\'t know what it is.',
], {
    image: 'assets/images/npcs/Hala.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 2, GameConstants.AchievementOption.less)]),
});
const SilvallyOlivia = new NPC('Kahuna Olivia', [
    'Hey, kiddo. What are you doing here? Just visiting Akala Island? Cus y\'know lots of tourists come here to see the Battle Royal. So, what\'re you doing here? Looking for something?',
    'Oh, you\'re looking for something called a Silvally Memory and Hala told you I found one? Do you mean this thing?',
    '<img src="assets/images/items/quest/Rock_Memory_Silvally.png">',
    'I found it while helping Mallow with her trial. If you want it, you can have it. It\'s useless to me anyway.',
], {
    image: 'assets/images/npcs/Olivia.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 2, GameConstants.AchievementOption.less)]),
});
const SilvallyNanu = new NPC('Kahuna Nanu', [
    'Oh, hello. How can I help you? You\'re looking for Silvally Memories? What do they look like? Oh, so like a disk with a broken part. I think I <i>have</i> seen one while helping Acerola with her trial. Here, you can take it.',
    '<img src="assets/images/items/quest/Dark_Memory_Silvally.png">',
    'I don\'t know how to use it, so you can keep it.',
], {
    image: 'assets/images/npcs/Nanu.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 2, GameConstants.AchievementOption.less)]),
});
const SilvallyMina = new NPC('Captain Mina', [
    'Hello, $playername$. Here to do my trial again? Oh, I see you\'re looking for Silvally Memories. Well, I have just the right thing for you. Here, take it.',
    '<img src="assets/images/items/quest/Fairy_Memory_Silvally.png">',
    'Kahuna Hapu gave me that as a gift. She even told me how to use it, but I couldn\'t afford to buy a Silvally. You can keep it.',
], {
    image: 'assets/images/npcs/Mina.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 1, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 2, GameConstants.AchievementOption.less)]),
});
const SilvallyGladion2 = new NPC('Gladion', [
    'Hey, I see you\'re back. Did you find any Silvally Memories? Oh, I see you found 4 of them, and in surprisingly relevant places too. Let me give them to Silvally.',
    '<i>Gladion uses the 4 memories on Silvally</i>',
    'As for that reward I mentioned, I\'ll put these memories in the Memory Replicator so I can make some Silvally Memories for you. The machine isn\'t powerful enough to create the Memories out of nothing, though. I\'ll be needing you to grab some gems of the Memory\'s type so I can replicate the Memory and insert it into a Silvally for you. It needs some fine-tuning first so the amount needed won\'t be the same after the first trade.',
    'Oh and also, I\'ve heard of more sightings of strange disks across the region. I think they might be the Silvally Memories we\'re looking for. If you\'re ever lost, I got descriptions of them.',
    'I\'ll let you keep the Memories you\'ve found in the meantime so you keep track of your progress.',
], {
    image: 'assets/images/npcs/Gladion.png',
    requirement: new  MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 2, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 16, GameConstants.AchievementOption.less)]),
});
const SilvallyGladion2Hints = new NPC('Ask Gladion for help', [
    'Here are the descriptions of them. You should look for:',
    'A blue-haired girl near Brooklet Hill,',
    'A green-haired girl in Lush Jungle,',
    'A black and red-haired guy at the Wela Volcano Park,',
    'A child with orange hair in the Hokulani Observatory,',
    'A dark blue-haired guy that looks like a Veteran inside Mount Lanakila,',
    'And a girl with a Mudsdale on Exeggutor Island Hill.',
], {
    image: 'assets/images/npcs/Gladion.png',
    requirement: new  MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 16, GameConstants.AchievementOption.less)]),
});
const LanaSilvally1 = new NPC('Captain Lana', [
    'Hi, $playername$. How are you doing? I\'m not doing so well right now.',
    'Why, you ask? That\'s because I need a lot of Dungeon Tokens to pay for an amazing rod so I can fish for every single water pokémon! Sadly, it costs too much and I can\'t afford it because I have to take care of my sisters. Oh, you can help me? Thank you, but I have nothing to offer in return.',
    'Have I a seen a Silvally Memory? Yes, I have. If you want it, I could sell it to you. The price is 125 million Dungeon Tokens. I\'ll be here for a long time, so you can get the Dungeon Tokens and come back later if you need to.',
], {
    image: 'assets/images/npcs/Lana.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 4, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 6, GameConstants.AchievementOption.less)]),
});
const MallowSilvally1 = new NPC('Captain Mallow', [
    'Hey, welcome to the Lush Jungle! How are you doing today? I\'m not so good. I wanted to try a new ingredient to see if it attracts Lurantis, but it costs too much. Like, a lot of Quest Points. I just can\'t afford it.',
    'Oh, you\'re asking if I have a Silvally Memory? You mean from that weird fusion-like Pokémon? Yeah, I do. It has a weird green coloration on it, which weirdly enough reminds me of Pokémon resistant to Electric attacks and weak against Fire attacks.',
    'How about a trade? I will give you the Memory if you give me some Quest Points, how \'bout that? Ok, I\'ll be here in the Lush Jungle for a while, so you can get Quest Points and come back later to do the trade if you need to.',
], {
    image: 'assets/images/npcs/Mallow.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 6, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 8, GameConstants.AchievementOption.less)]),
});
const KiaweSilvally1 = new NPC('Captain Kiawe', [
    'Hey, good to see ya here. How are you doing? I\'m doing well, but I need some Battle Points. I need to get more materials for a school project, but I\'m not sure how I will get Battle Points in Alola, since the Battle Frontier is only in the Hoenn region. And I don\'t know anyone who could get them and deliver them to me.',
    'Oh, Silvally Memory? The thing that\'s shaped like a disk? I have one right here, but I\'m not sure how it works. Wait, I just got an idea, what about a trade? I\'ll trade the Memory for some Battle Points. I\'ll be here for a while, probably long enough for you to take a trip to the Hoenn region to get some Battle Points.',
], {
    image: 'assets/images/npcs/Kiawe.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 8, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 10, GameConstants.AchievementOption.less)]),
});
const SophoclesSilvally1 = new NPC('Captain Sophocles', [
    'Hey, $playername$! How are you doing? I\'ve been doing great, except that my equipment is getting old and rusted. I would like to buy some more, but I don\'t have enough money to buy any right now.',
    'So, how can I help you? Oh, you\'re looking for a Silvally Memory? I have been keeping one of them here and doing a little bit of testing to find out how it works. Maybe we could make a trade. I\'ll trade the Silvally Memory for some Pokédollars. I\'ll be trying to figure out how it works, so you can go get Pokédollars and come back later to trade if you need to.',
], {
    image: 'assets/images/npcs/Sophocles.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 10, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 12, GameConstants.AchievementOption.less)]),
});
const VeteranSilvally1 = new NPC('Veteran Aristo', [
    'Hey, $playername$. Looking for a battle? Hm, ok. Can I say something to you anyway? It will be quick. I want to propose to my girlfriend, but I can\'t afford the ring she really wants. It\'s so expensive, and I feel guilty not being able to give her what she deserves. I don\'t know what to do! Maybe I could pick up some extra work to hire more Miners for some Diamonds.',
    'Anyway what did you want to ask me? Hmm, if I\'ve seen a Silvally Memory anywhere near? Sure, it\'s in my pocket right here. It even is coloured like a diamond! I wish I could trade it for some... hm? You\'re asking if we could do a trade? Sure, I\'ll sell it to you for 5k Diamonds, so I can buy my lovely fiancée-to-be an engagement ring. I\'ll always be here in the same place at all times, we can trade anytime you want.',
], {
    image: 'assets/images/npcs/Veteran (male).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 12, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 14, GameConstants.AchievementOption.less)]),
});
const HapuSilvally1 = new NPC('Kahuna Hapu', [
    'Hey, $playername$. How\'s it going? Looking for a rematch, or did you come here explore the Poni Island secrets? Oh, I see. You\'re looking for a Silvally Memory. I found a memory in the ground here, so I took it and studied it a bit. All I could find out is that it was from some Silvally. I also found another memory while helping Mina out with her trial. I gave it to her, but I\'m not sure if she found out how it works.',
    'Anyway. Can I ask you something? Do you know any farmers? I\'m needing to plant more palm trees around here on Exeggutor Island but I don\'t have enough Farm Points to buy all the seeds I need. If I got in contact with a farmer I could get them for much cheaper or even free! Oh? You know how to use the Farm? So that means you have a lot of Farm Points, right? Good! How about you give me some of those Farm Points for this Silvally Memory? Ok, I\'ll be here taking care of the Exeggutor for a while so you can come and visit me anytime to do this trade.',
], {
    image: 'assets/images/npcs/Hapu.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 14, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 16, GameConstants.AchievementOption.less)]),
});
const SilvallyGladion3 = new NPC('Gladion', [
    'I see you\'ve recovered more of the Silvally Memories. Thanks for helping me recover them. Silvally appreciates it too. How did it go, getting them back?',
    'You had to <i>pay</i> for them? Wha- How did you even get that much money? Are you rich? I... Never mind. You\'re doing a great job. Buddy\'s feeling better already. What? No, I said Silvally\'s feeling better already. You must be hearing things. Go find those memories.',
    'Also I\'m not compensating you.',
], {
    image: 'assets/images/npcs/Gladion.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 16, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 32, GameConstants.AchievementOption.less)]),
});
const SilvallyGladion3Hints = new NPC('Ask Gladion for help', [
    'For the next set of memories I\'ve been keeping an ear out and have heard some rumors:',
    'People from Ula\'ula have seen Guzma walking around Po Town, so I suspect he might\'ve found a Silvally Memory. Go ask him in Po Town.',
    'Melemele Island inhabitants have seen Kahili taking daily walks on Ten Carat Hill, she might\'ve found a Silvally Memory during one of those walks.',
    'Some people from Poni Island have seen Plumeria walking around with some old Team Skull grunts around the Vast Poni Canyon. That is really suspicious, so they probably found something rare or presumably a Silvally Memory.',
    'Ula\'ula Island people have seen Captain Acerola inside the Thrifty Megamart with a Mimikyu carrying a disk-shaped item, which I suspect is a Silvally Memory.',
    'Some people from Akala Island have seen some people in white suits with a lot of boxes travelling to the southwest of the island.',
    'I\'ve heard Molayne wanted to brush up on his training a bit. He\'s at the Royal Avenue, and he\'s also offering a strange reward which I presume is a Silvally Memory.',
    'Also, while I was walking near A Tree Maybe I saw a guy dressed almost like an old Pokémon that doesn\'t exist anymore with a Silvally Memory.',
    'They are all tough trainers, so you might need to train more to defeat them.',
], {
    image: 'assets/images/npcs/Gladion.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 32, GameConstants.AchievementOption.less)]),
});
const GuzmaSilvally = new NPC('Guzma', [
    'Huh? What are you doing in here? A what? Silvally Memory? I think I have what you\'re looking for. Yeah, I have it, if you want to see it. Anyways, I was just passing by and decided to visit this place again.',
    'If you need this Memory, let\'s battle. I miss the times when you got in the way of my plans for Team Skull and I used to battle you. I\'m not gonna lose this time.',
], {
    image: 'assets/images/npcs/Team Skull Boss (guzma).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 18, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 20, GameConstants.AchievementOption.less)]),
});
const KahiliSilvally = new NPC('Kahili', [
    'Hello there, $playername$! Today is a beautiful day for a walk. I found this disk while walking around. I\'m not so sure what it is, but it\'s an interesting find. What brings you here? Oh, you\'re here looking for this disk. Well, I can give it to you if you beat me in battle! What do you say? Fantastic!',
], {
    image: 'assets/images/npcs/Kahili.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 20, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 22, GameConstants.AchievementOption.less)]),
});
const PlumeriaSilvally = new NPC('Plumeria', [
    'Well, hey! Look who we have here! It\'s the Champ, wandering all the way into Vast Poni Canyon! You gotta have guts to do that, kid. Not many trainers dare to challenge this place.',
    'Let me guess, you\'re after this Silvally Memory I found around here, aren\'t you? I can tell by the way you carry yourself. You\'re not like the rest of the tourists and challengers who come here just for a sightseeing or a battle. You\'re on a mission, right?',
    'If you want it that bad, you gotta earn it. I won\'t just hand it over to you. I\'m starting from scratch as a Pokémon Trainer and doing it right this time, so you gotta show me what you\'re made of, in a battle. You and your Pokémon against me and mine! Are you up for the challenge, kid?',
], {
    image: 'assets/images/npcs/Plumeria.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 22, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 24, GameConstants.AchievementOption.less)]),
});
const AcerolaSilvally = new NPC('Captain Acerola', [
    'Hey there, $playername$! Have you checked out the trail behind the Thrifty Megamart lately? It\'s been pretty wild! I ventured there the other day and stumbled upon a Mimikyu holding a Silvally Memory. It was quite a challenge to retrieve it, but I managed to befriend it and recover the disk eventually. I love the thrill of exploring new places and discovering new stuff, don\'t you?',
    'But enough about me, what brings you here? Hmm, I can sense that you have a burning desire for something... Ah, it must be the Silvally Memory I found in the trail, am I right? It was a challenge to befriend that Mimikyu holding it. If you want it, you\'ll have to battle me first! Don\'t worry, I won\'t hold back just because we\'re friends. I want to see what you\'re made of! So, what do you say, ready to face the challenge?',
], {
    image: 'assets/images/npcs/Acerola.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 24, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 26, GameConstants.AchievementOption.less)]),
});
const FabaSilvally = new NPC('Aether Branch Chief Faba', [
    'Oh, welcome $playername$, the Champion of Alola! I see you <i>still</i> haven\'t lost that title. You\'re a pretty... <i>worthy</i> trainer, aren\'t you? Anyways, I think you should come visit us another time we\'re... er.. busy! Yes, we\'re extremely busy right now... ',
    'Oh, you\'re looking for a Silvally Memory? Well I can\'t help you with it so bye! What? You\'re not leaving until I help you? Ugh.. kids are so annoying these days.. er... I mean I\'d gladly help, I\'m just <i>busy</i> right now. <i>LikeISaidTwoSecondsAgo.</i>',
    'Well, I guess you can already tell. We\'ve been in Haina Desert looking for Tapu Bulu, but the search team stumbled upon this Silvally Memory instead and it looks pretty rare because we couldn\'t find much information about it. We want to take it in for some experiments, but we knew you wouldn\'t let us do that so I tried to hide it. Now that you know, my only choice is battling you.',
    'Let\'s make a deal first though: If I defeat you, you\'ll let us do our experiments on that thing and leave us alone forever, but if you defeat me I\'ll give that Memory to you. Sounds like a deal? Then let\'s see if you can take the new Faba!',
], {
    image: 'assets/images/npcs/Aether Branch Chief (faba).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 26, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 28, GameConstants.AchievementOption.less)]),
});
const MolayneSilvally = new NPC('Molayne', [
    'Hello there, $playername$! Have you perchance caught sight of my advertisement? I\'m on the lookout for a formidable opponent to assist me in honing my Pokémon\'s skills. And let me assure you, the rewards are quite substantial! Should you best me in battle, you shall be granted a most wondrous prize: a Silvally Memory that I found inside the Hokulani Observatory.',
    'As you may already know, I am both a Steel-type expert and a stickler for precision in combat. I desire nothing more than to elevate my team to the utmost degree of mastery. But in order to do so, I must face off against trainers of the highest caliber. That is where you come in, my friend! If you are prepared for the challenge, step forward and engage me in a duel for the ages!',
], {
    image: 'assets/images/npcs/Molayne.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 28, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 30, GameConstants.AchievementOption.less)]),
});
const RyukiSilvally = new NPC('Ryuki', [
    'Yo, traveler! The name\'s Ryuki! You\'ve come here to battle against a star like me, haven\'t you? No? Why\'s that? I see, you\'re looking for something?',
    'Speaking of which, I stumbled upon a gnarly disk in my travels recently. It was unlike any music disk I had ever seen before, it has a rockin\' dark blue coloration. But for all its uniqueness, I can\'t make out what it is, see?',
    'A Dragon-type Silvally Memory, you say? Rock on! I had a feeling it was something rare and powerful, but I never would have guessed it was a Silvally Memory! But now that I know what I have, I can\'t simply give it to you. I\'m a rock star, not a trial captain! We\'re on stage and the crowd wants a show!',
    'If you want this Silvally Memory, you have to defeat me in a burning hot battle! It won\'t be easy, mind you. My babies are dying to play a set, and I won\'t be holding back! But if you truly have what it takes to be the champion, then you should be up for the challenge, yeah? Right on! Let\'s rock!',
], {
    image: 'assets/images/npcs/Ryuki.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 30, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Typing some Memories', 32, GameConstants.AchievementOption.less)]),
});
const SilvallyGladion4 = new NPC('Gladion', [
    'Hey there, $playername$! I gotta say, you\'ve done something truly incredible. You\'ve brought back every single one of Silvally\'s lost memories. I expected nothing less from the Champion. I can\'t even imagine how long all that must have taken you. Silvally\'s back to normal and I can\'t thank you enough.',
    'And... seeing my buddy suffer like that made me consider how many new memories I\'ve been taking for granted... I\'m glad to have met you, Hau... everyone. Like Hau said, people can achieve more if they do something together. Thank you for reminding me of that.',
    'I can see what Lillie saw in you now... You\'ve been a true inspiration to me too. I hope our paths cross again someday. Until then... See you around.',
], {
    image:'assets/images/npcs/Gladion.png',
    requirement: new MultiRequirement ([new QuestLineStepCompletedRequirement('Typing some Memories', 32, GameConstants.AchievementOption.more), new QuestLineCompletedRequirement('Typing some Memories', GameConstants.AchievementOption.less)]),
});
//Ultra Beasts NPCs
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
    image: 'assets/images/npcs/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 1, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 4, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelLooker2 = new NPC('Looker', [
    'Catching lots of Ultra Beasts? Oh you want to know more about Beast Balls!',
    'Beast Balls can only be used to catch Ultra Beasts. You can\'t even try to use them against normal Pokémon, and any other Poké Ball type won\'t work against Ultra Beasts.',
    'To help you out, I\'ve added an "Ultra Beast" option to the Encounter Type Pokéball filter setting. You can use this to set up a filter just for Ultra Beasts. Don\'t forget to enable it and assign Beast Balls!',
], {
    image: 'assets/images/npcs/Looker.png',
    requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 2),
});
const RoadsideMotelAnabel2 = new NPC('Anabel', [
    'Congratulations on a job well done. I\'ve had contact with our colleagues at HQ. They have agreed to let you keep the UBs you catch.',
    'I\'m sure the UBs will truly flourish in the company of a competent trainer like yourself. It\'ll be much better for them than being locked up in some stuffy lab. Just be sure to let us know how they are doing.',
    'Now, enough chit-chat. UB-02 Absorption and UB-02 Beauty, Buzzwole and Pheromosa, have been sighted on Melemele Island. You know what to do!',
], {
    image: 'assets/images/npcs/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 4, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 6, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelAnabel3 = new NPC('Anabel', [
    'Congratulations once again. Looker told me he wants to take us to a great restaurant to celebrate. I don\'t know how he knows any restaurants around here, we\'ve only just arrived.',
    'It doesn\'t matter though. There is no rest for us. Captain Mina is here with news, but she insist on battling you before she\'ll tell us anything.',
], {
    image: 'assets/images/npcs/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 6, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 8, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelMina = new NPC('Captain Mina', [
    'Still in tip top shape I see. Good. That means you\'re strong enough to take out this monster I heard about on Akala Island.',
    'According to your little list here its... uhm... this one! UB-03 Lighting. Xurkitree. These are some strange names you guys come up with.',
    'Good luck out there!',
], {
    image: 'assets/images/npcs/Mina.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 8, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 10, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelNanu1 = new NPC('Kahuna Nanu', [
    '...',
    'I let myself in. Hope you don\'t mind.',
    'I\'m here to tell you about sightings of monsters on Ula\'ula Island. I missed some big Kahuna meeting we were all supposed to go to, so I got stuck as the messenger.',
    'It\'s not like I\'ve seen them or anything. Your friend Looker knew them from the description though. UB-04 Blade and UB-04 Blaster he called them. Kartana and Celesteela.',
    '...',
], {
    image: 'assets/images/npcs/Nanu.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 10, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 12, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelNanu2 = new NPC('Kahuna Nanu', [
    '...',
    'Good job on rounding up those creatures kid.',
    'Now, how about one more battle? I insist.',
], {
    image: 'assets/images/npcs/Nanu.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 12, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 14, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelAnabel4 = new NPC('Anabel', [
    'This is tiring work, but I have a feeling that we\'re almost done.',
    'Looker\'s informants told us about monster sightings on Poni Island. It seems UB Assembly and UB Burst, Stakataka and Blacephalon, have taken up residence.',
    'Please be careful.',
], {
    image: 'assets/images/npcs/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 14, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 16, GameConstants.AchievementOption.less)]),
});
const RoadsideMotelAnabel5 = new NPC('Anabel', [
    'And so here we are. At the end. And back at the beginning.',
    'Our final target is UB-05 Glutton. Guzzlord. It is very dangerous. You must not underestimate this beast.',
    'Ten years ago, a very similar incident occured. Looker and his team were assigned to fight Guzzlord. Nanu was there too. They lost. Looker lost a colleague that day.',
    'After the battle they found something. A strange young girl, alone in the wilderness of Poni Island. They found me. It seems I came from another world as well. Not their world though. These creatures are strange to me too.',
    'I have made myself at home here. I hope Glutton can do the same. Please catch this Guzzlord. End this once and for all.',
], {
    image: 'assets/images/npcs/Anabel.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 16, GameConstants.AchievementOption.more), new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 18, GameConstants.AchievementOption.less)]),
});
const NecrozmaLooker = new NPC('Looker', [
    'There haven\'t been any new reports of Ultra Beasts in Alola, but I did see something strange over in Ten Carat Hill. It was black, yet shining. It seemed to be fleeing, no doubt about that. Must have been in a weakened state. Was it involved in some kind of battle? If you find it, I doubt it will have much energy left.',
], {
    image: 'assets/images/npcs/Looker.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('Ultra Beast Hunt'), new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Necrozma').id], 1, 'Must have never encountered Necrozma before.', GameConstants.AchievementOption.less)]),
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
], {
    image: 'assets/images/npcs/MayorKarp.png',
    requirement: new OneFromManyRequirement([new ObtainedPokemonRequirement('Magikarp'), new ObtainedPokemonRequirement('Magikarp (Feebas)')]),
});
const MagikarpJumpRoamerNPC = new RoamerNPC('Roddy Tackle', [
    'There are some singularly stunning individuals down at {ROUTE_NAME}! Some Magikarp with real personality!',
], GameConstants.Region.alola, RoamingPokemonList.findGroup(GameConstants.Region.alola, GameConstants.AlolaSubRegions.MagikarpJump), 'assets/images/npcs/Roddy Tackle.png', new OneFromManyRequirement([new ObtainedPokemonRequirement('Magikarp'), new ObtainedPokemonRequirement('Magikarp (Feebas)')]));
const HoppyManOfMystery = new NPC('Man of Mystery', [
    'We have been looking for a Shady Salesman.',
    'He is trying to sell overpriced Magikarps to clueless children.',
    'Please keep an <i>eye</i> open for him.',
],  {
    image:'assets/images/npcs/Man of Mystery.png',
    requirement: new OneFromManyRequirement([new ObtainedPokemonRequirement('Magikarp'), new ObtainedPokemonRequirement('Magikarp (Feebas)')]),
});

const DrSplash1 = new NPC('Dr. Splash', [
    'Welcome to my laboratory!',
    'Well... it\'s not much of a laboratory yet. I\'m working on several projects to help Magikarps reach their full potential. Can you help me out?',
    'The first step in unlocking this potential will be to formulate the perfect diet. Can you gather some berries for me to experiment with?',
], {
    image: 'assets/images/npcs/Dr Splash.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Dr. Splash\'s Research Project'), new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 1, GameConstants.AchievementOption.less)]),
});

const DrSplash2 = new NPC('Dr. Splash', [
    'Thank you for the berries! These should be enough for my experiments.',
    'While you were gone, I was working on optimizing the training regimen for Magikarps. According to my calculations, we are missing a LOT of equipment.',
    'I\'m going to need some sand for sandbags, springs for a jump counter, wood for a pell post, rocks and ice for smashing, a TON of Pokéballs, electricity generation...',
    'There\'s a lot more, but that should get you started.',
], {
    image: 'assets/images/npcs/Dr Splash.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 1), new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 3, GameConstants.AchievementOption.less)]),
});

const DrSplash3 = new NPC('Dr. Splash', [
    'Wow, that\'s a lot of stuff! This place is starting to look like a proper lab now!',
    'I have discovered that a critical part of any Magikarp training program is pushing other Pokémon around in a field. This form of exercise rounds out the muscle groups and really boosts performance.',
    'According to my calculations, the ideal Pokémon to push around are Dwebble, Boldore, Forretress, Golem, and Steelix. Can you catch or hatch me some?',
    'Steer clear of the Alolan version of Golem, its electrical fields are too dangerous to use.',
], {
    image: 'assets/images/npcs/Dr Splash.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 3), new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 5, GameConstants.AchievementOption.less)]),
});

const DrSplash4 = new NPC('Dr. Splash', [
    'These Pokémon are perfect! I\'ll put them out back in the training fields.',
    'The last piece of equipment needed is a Tackle Machine. I have a prototype here, but it needs to be calibrated.',
    'Can you take it out for a spin? Defeating a ton of Pokémon should be enough to test it out.',
], {
    image: 'assets/images/npcs/Dr Splash.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 5), new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 7, GameConstants.AchievementOption.less)]),
});

const DrSplash5 = new NPC('Dr. Splash', [
    'Thank you for all your help!',
    'Now that the laboratory and training program are up and running, I\'ll be very busy!',
    'Please take this Magikarp as a thank you! Train them for greatness!',
], {
    image: 'assets/images/npcs/Dr Splash.png',
    requirement: new QuestLineStepCompletedRequirement('Dr. Splash\'s Research Project', 7),
});

const MagikarpEyeShadySalesman = new NPC('Shady Salesman', [
    'Kid, I have a deal for you! And for you alone. Here\'s your chance. I will sell you the secret Magikarp... For an unbelievable price.',
    'Oh, yeah... Returns not accepted, got that?',
],  {image:'assets/images/npcs/ShadySalesman.png'});

const FishPolice = new NPC('The Fish Police', [
    'Stop right there! This is the sacred land of Magikarp Jump. I can tell there is something suspicious about you... Yeah, I see! You have no Magikarp! How did you even make it this far without the best Pokémon, anyway?',
    'In any case, everyone in town is too afraid of you so come back here when you get a Magikarp of your own. Then, the residents may be willing to talk to you.',
],  {
    image:'assets/images/npcs/Officer Jenny.png',
    requirement: new MultiRequirement([new ObtainedPokemonRequirement('Magikarp', true), new ObtainedPokemonRequirement('Magikarp (Feebas)', true)]),
});

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
        npcs: [IkiKahuna, SilvallyHala],
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
        npcs: [NecrozmaLooker],
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
    [TemporaryBattleList['Battle Royal'], DepartmentStoreShop, TemporaryBattleList['Molayne Steel Memory']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
        npcs: [RoyalAvenueSpectator, MolayneSilvally],
    }
);
TownList['Konikoni City'] = new Town(
    'Konikoni City',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [KonikoniCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Konikoni City'])],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
        npcs: [KonikoniKahuna, SilvallyOlivia],
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
        TemporaryBattleList['Faba Psychic Memory'],
    ],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.RockiumZ)],
        npcs: [AetherParadiseAlolaRoamerNPC, FabaSilvally],
    }
);
TownList['Malie City'] = new Town(
    'Malie City',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [MalieCityShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Malie City']), new MoveToDungeon(dungeonList['Malie Garden']), new DockTownContent()],
    {
        requirements: [new TemporaryBattleRequirement('Ultra Wormhole')],
        npcs: [MalieKahuna, SilvallyNanu],
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
        npcs: [SeafolkCaptain, SilvallyMina],
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
    GameConstants.AlolaSubRegions.PoniIsland,
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
    [ATreeMaybeShop, TemporaryBattleList['Ryuki Dragon Memory']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.alola, 30)],
        npcs: [BattleTreeRed, BattleTreeBlue, RyukiSilvally],
    }
);

// Magikarp Jump Towns
TownList['Hoppy Town'] = new Town(
    'Hoppy Town',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.MagikarpJump,
    [new DockTownContent(), new BulletinBoard(GameConstants.BulletinBoards.Hoppy), MagikarpJumpGemTrade],
    {
        requirements: [new QuestLineStartedRequirement('Magikarp Jump')],
        npcs: [MayorKarp, MagikarpJumpRoamerNPC, HoppyManOfMystery, DrSplash1, DrSplash2, DrSplash3, DrSplash4, DrSplash5, FishPolice],
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
        requirements: [new GymBadgeRequirement(BadgeEnums.Master_League)],
        npcs: [MagikarpEyeShadySalesman],
        ignoreAreaStatus: true,
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
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
    [TemporaryBattleList['Kahili Flying Memory']],
    {
        npcs:[KahiliSilvally],
    }
);
TownList['Pikachu Valley'] = new DungeonTown(
    'Pikachu Valley',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 4)],
    undefined,
    {
        npcs: [PikachuValleyPikachuGeneric, PikachuValleyAlolaCap, PikachuValleyPikachuWorldCap],
    }
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
    [new TemporaryBattleRequirement('Gladion 1')],
    [BrookletHillShop],
    {
        npcs: [LanaSilvally1],
    }
);
TownList['Wela Volcano Park'] = new DungeonTown(
    'Wela Volcano Park',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 7)],
    [WelaVolcanoParkShop, TemporaryBattleList['Captain Kiawe']],
    {
        npcs: [KiaweSilvally1],
    }
);
TownList['Lush Jungle'] = new DungeonTown(
    'Lush Jungle',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 8)],
    [LushJungleShop, TemporaryBattleList['Captain Mallow'], TemporaryBattleList['Captain Lana']],
    {npcs: [MallowSilvally1]}
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
    [HokulaniObservatoryShop, TemporaryBattleList['Captain Sophocles']],
    {npcs: [SophoclesSilvally1]}
);
TownList['Thrifty Megamart'] = new DungeonTown(
    'Thrifty Megamart',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.UlaulaIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 14)],
    [TemporaryBattleList['Acerola Ghost Memory']],
    {npcs: [AcerolaSilvally]}
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
    [new RouteKillRequirement(10, GameConstants.Region.alola, 17)],
    [TemporaryBattleList['Guzma Bug Memory']],
    {npcs: [GuzmaSilvally]}
);
TownList['Aether Foundation'] = new DungeonTown(
    'Aether Foundation',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.AkalaIsland,
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)],
    [
        new GemMasterShop(GameConstants.GemShops.SilvallyTrader, 'Memory Replicator', [new QuestLineStepCompletedRequirement('Typing some Memories', 3)], true),
        TemporaryBattleList['Aether Branch Chief Faba'],
        TemporaryBattleList['Team Aqua Leader Archie'],
        TemporaryBattleList['Team Magma Leader Maxie'],
        TemporaryBattleList['Team Galactic Leader Cyrus'],
        TemporaryBattleList['Team Flare Leader Lysandre'],
        TemporaryBattleList['Team Plasma Leader Ghetsis'],
        TemporaryBattleList['Team Rainbow Leader Giovanni'],
    ],
    {
        npcs: [SilvallyGladion1, SilvallyGladion2, SilvallyGladion3, SilvallyGladion4, SilvallyGladion2Hints, SilvallyGladion3Hints],
    }
);
TownList['Exeggutor Island Hill'] = new DungeonTown(
    'Exeggutor Island Hill',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    [ExeggutorIslandHillShop],
    {npcs: [HapuSilvally1]}
);
TownList['Vast Poni Canyon'] = new DungeonTown(
    'Vast Poni Canyon',
    GameConstants.Region.alola,
    GameConstants.AlolaSubRegions.PoniIsland,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Exeggutor Island Hill'))],
    [TemporaryBattleList['Plumeria Poison Memory']],
    {npcs: [PlumeriaSilvally]}
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
    [MountLanakilaShop],
    {
        npcs: [LanakilaColress, VeteranSilvally1],
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
    ItemList.Wonder_Chest,
    ItemList.Miracle_Chest,
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
    ItemList.Event_calendar,
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
], {image: 'assets/images/npcs/Rail Staff.png'});

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
], { image: 'assets/images/npcs/Cook.png' });

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
], { image: 'assets/images/npcs/Ruin Maniac.png' });

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
    image: 'assets/images/npcs/Hop.png',
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
], {image: 'assets/images/npcs/Team Yell Grunts.png'});

const RoseBroadcast = new NPC('Broadcast of Chairman Rose', [
    'Hello there, Leon! Just letting you know...',
    'I think it\'s time I brought about the Darkest Day. For the sake of Galar\'s future, of course!',
    'But I\'m in a bit of a pickle. The energy released by the Darkest Day is too much for us to contain.',
    'I\'m sorry it\'s come to this. But it\'s you who forced my hand, Leon. You refused to listen!',
], {
    image: 'assets/images/npcs/Macro Cosmos (rose).png',
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
    image: 'assets/images/npcs/Hop.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 11), new QuestLineStepCompletedRequirement('The Darkest Day', 13, GameConstants.AchievementOption.less)]),
});

const SlumberingHop1 = new NPC('Hop', [
    'Would you take a look at that! Now that\'s something you don\'t see every day... This place definitely feels like the stuff of legend. See that! The sword and the shield! The legends really were true!',
    'That settles it! We\'re taking the sword and shield. Though...wow, would you look at the state of these things? They seems like they might fall to pieces if you so much as look at \'em funny.',
    'I don\'t know if these rusty old things will really be able to stop the Darkest Day, but... Well, I guess it can\'t hurt to have them along! Let\'s hope they bring us some good luck!',
    'Maybe the Pokémon themselves really are still asleep somewhere. So it seems we\'re on our own if we want to go help Lee. This is all the help we\'ve got!',
], {
    image: 'assets/images/npcs/Hop.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 13), new QuestLineStepCompletedRequirement('The Darkest Day', 15, GameConstants.AchievementOption.less)]),
});

const EnergyPlantRose = new NPC('Chairman Rose', [
    'Most impressive! I wouldn\'t expect any less from a challenger endorsed by the strongest Champion ever to grace our beloved Galar region!',
    'I really do wish I could have seen the Championship Match between you two. And I\'m terribly sorry to have ruined the whole Gym Challenge and everything!',
    'It\'s too bad, but it can\'t be helped... In order to solve the energy issue as soon as possible, we awakened Eternatus. But we couldn\'t control it. The Champion came to aid me, even at the cost of abandoning the match. Indeed, just like a knight in shining armor coming to rescue a princess from a dragon!',
    'I do tend to ramble on, I know. I love to make speeches. But I think I can stop talking now. I think the Champion should have captured Eternatus by now. If you\'re curious, you can take the lift up.',
    'And I trust you\'ll be going too, right, Hop? I certainly hope losing to me didn\'t discourage you too much. Go on now, both of you! Go see how our Champion is doing!',
], {
    image: 'assets/images/npcs/Macro Cosmos (rose).png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 15), new QuestLineStepCompletedRequirement('The Darkest Day', 17, GameConstants.AchievementOption.less)]),
});

const EternatusCatch = new GiftNPC('Catch Eternatus', [
    'You caught Eternatus!',
], () => {
    App.game.party.gainPokemonByName('Eternatus');
}, 'assets/images/pokemon/890.png', { saveKey: 'eternatuscatch', requirement: new MultiRequirement([new TemporaryBattleRequirement('The Darkest Day'), new ObtainedPokemonRequirement('Eternatus', true)]) });

const Leon = new NPC('Leon', [
    'My matches are always sold out, but this... I\'ve never seen a crowd this wild!',
    'Everyone knows what you did for us this week... They know you\'re the one who caught Eternatus and saved the future of the Galar region.',
    'A real hero, who battled alongside the Legendary Pokémon, Zacian and Zamazenta... I couldn\'t have dreamed of a better challenger to help increase my winning streak!',
    'Now that I\'ve seen just what kind of strength you possess as the greatest of challengers...crushing you into the dirt will show everyone just how strong their Champion truly is!',
    'Come on, now! Let\'s make this a final match that\'ll go down in Galar\'s history! No! A match that\'ll change Galar forever!',
    'We\'re gonna have an absolutely champion time!',
], {
    image: 'assets/images/npcs/Leon.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Darkest Day', 18), new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion, GameConstants.AchievementOption.less)]),
});

const SlumberingHop2 = new NPC('Hop', [
    'Huh? What\'re you doing here in the woods? Nobody ever comes in here, since this is the forest where Zacian and Zamazenta rested. It\'s the best place to do a bit of thinking, since it\'s so quiet and all.',
    'Oh, but I hadn\'t had the chance to tell you! Congrats on your victory! Honestly... I never thought you\'d manage to beat my brother. The greatest Champion Galar ever had! He was undefeatable till you came around! It\'s actually still pretty hard to believe...',
    'Really... You\'re amazing. So amazing, maybe, that I don\'t even realize just how amazing you really are!',
    'So, do you think... Would you be up for one more battle?',
], {
    image: 'assets/images/npcs/Hop.png',
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
    image: 'assets/images/npcs/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 1), new QuestLineStepCompletedRequirement('Sword and Shield', 3, GameConstants.AchievementOption.less)]),
});

const SordwardShielbert2 = new NPC('Sordward & Shielbert', [
    'We know all the Wishing Stars that Chairman Rose had gathered are here. We celebrities have an advanced level of insight into such things!',
    'You non-celebrities are not suited to having such valuable things. Hand them over to us.',
    'You wish to keep them from us? No matter. This time we\'ve brought much stronger Pokémon to thoroughly trounce you with!',
], {
    image: 'assets/images/npcs/Sordward & Shielbert.png',
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
    image: 'assets/images/npcs/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 13), new QuestLineStepCompletedRequirement('Sword and Shield', 15, GameConstants.AchievementOption.less)]),
});

const SordwardShielbert4 = new NPC('Sordward & Shielbert', [
    'Fwahaheho! We did it! Zacian and Zamazenta came, following after the Rusted Sword and Shield!',
    'Yes! Expose your true, barbaric, brutish nature...and reveal to us exactly who the false kings are!',
    'W-wait! D-don\'t attack us! Go into town, and sow as much destruction as you can!',
], {
    image: 'assets/images/npcs/Sordward & Shielbert.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 15), new QuestLineStepCompletedRequirement('Sword and Shield', 17, GameConstants.AchievementOption.less)]),
});

const Piers = new NPC('Piers', [
    'As expected of the Champion... You took complete control of the situation.',
    'Plus it looks like those Pokémon are waiting for you, now they\'re calmed down an\' all.',
], {
    image: 'assets/images/npcs/Piers.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Sword and Shield', 17), new QuestLineStepCompletedRequirement('Sword and Shield', 19, GameConstants.AchievementOption.less)]),
});

const EnergyPlantHop = new NPC('Hop', [
    'Huh? Oh, hi. I forgot to say, congrats on catching Zacian and Zamazenta!',
    'Y\'know, Zacian and Zamazenta got the Rusted Sword and the Rusted Shield back, right?',
    'But when you caught them, neither were using them. But they must still have them, right?',
    'So.... Maybe if you keep defeating them, they\'ll occasionally drop them?',
], {
    image: 'assets/images/npcs/Hop.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('Sword and Shield')]),
});

const SouthGalarRoamerNPC = new RoamerNPC('Professor Sonia', [
    'I’ve heard there’s been sightings of a never-before-seen, super strong Pokémon on {ROUTE_NAME}! You should go check it out!',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.SouthGalar), 'assets/images/npcs/Professor Sonia.png');

//Isle of Armor NPCs
const IsleofArmorRoamerNPC = new RoamerNPC('Master Dojo Student', [
    'One of the other students said they saw a rare Pokémon on {ROUTE_NAME}. Might be worth having a look.',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.IsleofArmor), 'assets/images/npcs/Master Dojo.png');

const Mustard1 = new NPC ('Mustard', [
    '... ... ... Why hello there! My name is Mustard! I\'m rather good at Pokémon battles, you know! I\'m pleased as cheese that you could join us!',
    'Yaaay! This is my favorite part! I wanna see just how good you are! So, why not have a battle with little old me? Just say the word when you\'re ready!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Dojo\'s Armor'), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 1, GameConstants.AchievementOption.less )]),
});
const Mustard2 = new NPC ('Mustard', [
    'Bah ha ha! I lost! You\'re pretty strong, aren\'t you? The way you battle really shows me how much you care about your Pokémon! Even if you\'ve come because of a misunderstanding, as long as you have a will to learn... then you\'re welcome at the Master Dojo! I think we can all help each other become stronger! I\'m happy you\'ve come to join us!',
    'Now then! The dojo\'s at max capacity! It\'s time to really start our training! You\'ll all be facing three trials. And there\'s more! The person who completes the three trials will receive the secret armor of this dojo!',
    'For the first trial, my students... You\'ve all gotta defeat 6 of those fast Galarian Slowpoke, trained with care by little old me! But that\'s not all... You need to catch them, too!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 1), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 3, GameConstants.AchievementOption.less )]),
});
const Mustard3 = new NPC ('Mustard', [
    'Well mustered! You cleared the first trial like it was nothing! Why, I think this is the first time since Leon that someone was able to handle all six fast Slowpoke on their own! The rest of you tried very hard, too! You were able to catch up to the Slowpoke, but I guess you couldn\'t defeat them.',
    'Tell you what. Anyone who was able to catch up to a Slowpoke at least once gets a pass! Our new student here really outdid themselves, so it\'s only fair everyone else gets another chance. Try to make a comeback, everybody!',
    'And for your second trial we have mushroom picking! I\'m tasking you with finding three Max Mushrooms! They are red with a spiral pattern. I\'m pretty sure they grow in dark, humid places! And with that, your next trial begins! I\'m countin\' on ya!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 3), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 4, GameConstants.AchievementOption.less )]),
});
const Mustard4 = new NPC ('Mustard', [
    'Hey! My bad, my bad! It just dawned on me that you\'re brand-new to the Isle of Armor! I bet you have no idea where to even begin looking for Max Mushrooms! C\'mon--let\'s go for a walk, and I\'ll show you some mushroom hot spots.',
    'Dum dum dee dee... La la de daaa... Now, usually the Forest of Focus is chock-full of Max Mushrooms. But the thing is, a swarm of Greedent came through and ate every last one here! So I\'m thinking maybe you\'ll have more luck finding Max Mushrooms if you go check Warm-Up Tunnel.',
    'It\'s out on the other side of the forest! Just watch where you\'re going in the forest, \'K? It\'s easy to get lost! Anyhoo... Good luck with the hunt for Max Mushrooms! Catch you back at the dojo!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 4), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7, GameConstants.AchievementOption.less )]),
});
const Klara1 = new NPC ('Klara', [
    'Hold up a sec! *wheeze*... *wheeze*... Hellooo, what\'s this?! Three Max Mushrooms in one spot? Here I thought I\'d need to go find them one by one! I saw those mushrooms first! I swear! I\'ve been at the dojo longer and all. Sooo... It\'s only fair you let me have \'em. Riiight?',
    'Waaait... What\'s this, now? Are you givin\' me attitude? Pityin\' me, are you?! Gosh, you\'re such a pain in the neck... You just show up outta nowhere, and just happen to be young and talented... If you\'re looking to get in my way, well, I think some vile poisons will take care of that!',
], {
    image: 'assets/images/npcs/Klara.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 5), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7, GameConstants.AchievementOption.less )]),
});
const Avery1 = new NPC ('Avery', [
    'Wait just one moment! *pant*... *pant*... Hah! Just as I expected! Multiple Max Mushrooms growing in a bunch! My psychic powers picked up on these Max Mushrooms eons before you found them. I believe I should be the first one to get those Max Mushrooms. First come, first served, and all!',
    'What\'s this? Are you trying to show you\'re stronger than me? How distasteful! I find your presence most disturbing! You show up at the dojo unannounced and go on to show such talent, even though you\'re still so young... You dare get in my way? I warned you about my psychic powers, and now you\'ll experience them firsthand!',
], {
    image: 'assets/images/npcs/Avery.png',
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
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 7), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10, GameConstants.AchievementOption.less )]),
});
const Klara2 = new NPC ('Klara', [
    'You are here.',
    'When I beat you, I\'ll get the secret armor... and then I\'ll become a Poison-type Gym Leader! I\'ve got to win, no matter what.. I\'m gonna go all out and totally beat you. You ready?',
    'I\'m not holding a single thing back anymore. Time to settle this-fair and square! Oh, and maybe watch your step... Looks like some Toxic Spikes somehow got on the Battle Court!',
], {
    image: 'assets/images/npcs/Klara.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 8), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10, GameConstants.AchievementOption.less )]),
});
const Avery2 = new NPC ('Avery', [
    'So, you\'ve come at last.',
    'Defeating you will grant me the secret armor...then I will at last have what I need to become a Psychic-type Gym Leader! No matter what it takes, I refuse to accept anything but a complete and utter victory... I\'m coming at you with everything I have.',
    'Heh. Let us have an elegant battle worthy of being called a finale. Prepare to sink into despair...and into the weird battlefield beneath your feet!',
], {
    image: 'assets/images/npcs/Avery.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 8), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10, GameConstants.AchievementOption.less )]),
});
const Mustard6 = new NPC ('Mustard', [
    'The victor has been decided! The one to complete the third trial is you, our newest student! You gave it your best and triumphed, even when faced with an unfair challenge. To you, who has completed all the trials... I grant the secret armor of the Master Dojo!',
    'Now then... Come on out! This Pokémon is in fact the secret armor of the Master Dojo! Say hello to...Kubfu!',
    '<img src="assets/images/pokemon/891.png">',
    'I know... I know... It\'s tiny... But raise it with diligence, and it\'ll become strong enough to see you through any battle, just like a suit of armor. No opponent will be able to get past it!',
    'Now, I give you permission to catch it!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 10), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 12, GameConstants.AchievementOption.less )]),
});
const Mustard7 = new NPC ('Mustard', [
    'Good! Now then... The first thing for you to do is become best friends with Kubfu! You need to build trust! Kubfu hasn\'t really had a chance to explore the world outside the dojo, so... Maybe it\'ll help you become better friends if you train alongside it!',
    'Hmm. Maybe you should train against Dark and Water-types. It will be useful for it to know their weaknesses, since they will be its own weaknesses when it evolves.',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 12), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 14, GameConstants.AchievementOption.less )]),
});
const Mustard8 = new NPC ('Mustard', [
    'You\'re back! I can see already you look closer to Kubfu, and its training is going well! It isn\'t quite ready yet, however! To switch it up a little, you should now have it help you with catching some Water and Dark-type Pokémon!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 14), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 16, GameConstants.AchievementOption.less )]),
});
const Mustard9 = new NPC ('Mustard', [
    'Good, good! You two are just the best of friends now, aren\'t you? Kubfu\'s really become more confident. How wonderful! I daresay I think you\'re both ready.',
    'Now then! If you want Kubfu to become stronger... there are special training grounds just for Kubfu! Prepare yourselves for the...Towers of Two Fists! The blue tower is the Tower of Waters! And the red tower is the Tower of Darkness!',
    'Each tower will help Kubfu learn a different fighting style! I\'m really looking forward to when you two make it to the top of those towers! It\'s going to be so exciting!',
], {
    image: 'assets/images/npcs/Mustard.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 16), new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 18, GameConstants.AchievementOption.less )]),
});
const Mustard10 = new NPC ('Mustard', [
    'Behold! Before you stands Urshifu! Sure to be unyielding armor that will shatter any blade turned against it... And it has mastered the styles of darkness and water!',
    'Ha! You\'ve certainly grown, haven\'t you? And to think, not long ago you would\'ve run and hid behind me the moment you got scared! Indeed, no matter how old I get, witnessing someone grow always brings joy to my heart. Urshifu! And you as well! Thank you both, from the bottom of my heart.',
], {
    image: 'assets/images/npcs/Dojo Master.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Dojo\'s Armor', 18), new QuestLineCompletedRequirement('The Dojo\'s Armor', GameConstants.AchievementOption.less )]),
});

const JungleAsh1 = new NPC ('Ash Ketchum', [
    'Hey! I didn\'t expect to see you again here. Fancy a ba-. Actually, no, I\'d like to ask a favour of you; a friend of mine living in Glimwood Tangle called me asking for some help.',
    'I would go myself, but I promised one of the students here a battle and I don\'t want to bail on them. Would you be able to go for me?',
    'Great! My friends name is Koko, tell him I sent you. This battle shouldn\'t take me too long, so come ask for my help if you need it!',
], {
    image: 'assets/images/npcs/Ash Ketchum.png',
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
    image: 'assets/images/npcs/Ash Ketchum.png',
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
    image: 'assets/images/npcs/Ash Ketchum.png',
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
], {image: 'assets/images/npcs/Backpacker (male).png'});

//Crown Tundra NPCs
const CrownTundraRoamerNPC = new RoamerNPC('Freezington Mayor', [
    'If my eyes didn\'t deceive me, I saw a rare Pokémon at {ROUTE_NAME}. Go and see if you can find it if you\'re interested.',
], GameConstants.Region.galar, RoamingPokemonList.findGroup(GameConstants.Region.galar, GameConstants.GalarSubRegions.CrownTundra));

const GalarFossilHiker = new NPC('Spelunker', [
    'Wow! The Crown Tundra is filled with wild fossil Pokémon! I\'ve heard stories of these snowfields protecting the Pokémon living here, but this level of sanctuary is insane!',
    'And what\'s really interesting is that they only show up to trainers who have already caught one of their species. Could it be they are aware enough to use that as an appraisal of trust?',
], {image: 'assets/images/npcs/Hiker (Gen 8).png'});

const CrownPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they were talking about some ancient king Pokémon! They also mentioned a couple of horsey Pokémon that it was ultra-mega-close to. There\'s a statue of it outside and I\'ve heard this rock I\'ve been using as a pillow is part of it!',
    'Could you go and put it back on for me?',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Crown of Galar'), new QuestLineStepCompletedRequirement('The Crown of Galar', 1, GameConstants.AchievementOption.less )]),
});
const Calyrex1 = new NPC ('Calyrex', [
    'Ah, yes. A sturdy body, just as I expected. I hope this man doesn\'t mind that I make use of it for the time being.',
    'I am Calyrex. I am also known as the King of Bountiful Harvests. I have borrowed this man\'s body in order to thank you in person for restoring my statue...so to speak.',
    'I once reigned over these lands as king, but now I have lost all but a fraction of my former strength. Even my loyal steeds have abandoned me.',
    'Would you do me the favour of protecting me from wild Pokémon at the Old Cemetery and Snowslide Slope? I wish to grow a Shaderoot Carrot and an Iceroot Carrot which I believe could draw out my loyal steeds.',
], {
    image: 'assets/images/npcs/specialNPCs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 1), new QuestLineStepCompletedRequirement('The Crown of Galar', 3, GameConstants.AchievementOption.less )]),
});

const Calyrex2 = new NPC ('Calyrex', [
    'Thank you for your help in growing these carrots. It is my belief that they will draw my loyal steeds back to me...',
    'What?! They are here already! But they appear to be unable to tell exactly where the scent of the carrots is coming from!',
    'The people of this place are in danger, you must fight them off!',
], {
    image: 'assets/images/npcs/specialNPCs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 3), new QuestLineStepCompletedRequirement('The Crown of Galar', 5, GameConstants.AchievementOption.less )]),
});

const Calyrex3 = new NPC ('Calyrex', [
    'You have my thanks for protecting the village, human child. Although, unfortunately, this has also caused my loyal steeds to flee.',
    'Hmm... Perhaps now we know they are in this area, it would be better to search for them?',
    'I think that would be for the best. Once you capture them, I would appreciate it if you could bring them to the Crown Shrine at the mountain\'s peak.',
], {
    image: 'assets/images/npcs/specialNPCs/Possessed Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 5), new QuestLineStepCompletedRequirement('The Crown of Galar', 7, GameConstants.AchievementOption.less )]),
});

const Calyrex4 = new NPC ('Calyrex', [
    'Finally, my loyal steeds have returned to me. There are truly no words with which to fully express my gratitude to you. But I can try. Take these Reins of Unity.',
    '<img src="assets/images/keyitems/Reins_of_unity.png">',
    'They can be used to combine myself and my steeds. However, it is incomplete. They must have have hair from the manes of my steeds intertwined to work. I expect they will occasionally leave such hair behind upon being defeated.',
    'And to that point... I have a suggestion. If you are able to capture me, it will prove your worth beyond any doubt, and I will lend you my strength on your journey. Once you have readied yourself, come face me!',
], {
    image: 'assets/images/npcs/specialNPCs/Possessed Peony.png',
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
    image: 'assets/images/npcs/Peony.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Crown of Galar', 9), new QuestLineCompletedRequirement('The Crown of Galar', GameConstants.AchievementOption.less)]),
});
const BirdPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they mentioned they had seen some bird Pokémon that looked like the legendary birds of Kanto at that ultra-mega-massive tree in the middle of Ballimere Lake!',
    'You should go check it out!',
], {
    image: 'assets/images/npcs/Peony.png',
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
    image: 'assets/images/npcs/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 2), new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 4, GameConstants.AchievementOption.less )]),
});
const BirdPeony3 = new NPC ('Peony', [
    'Hang on--you really caught up to all three of them dodgy birds? Multiple times each? That\'s pretty impressive!',
    'I think they should all be weakened enough that you can catch \'em now!',
    'I\'d imagine they\'d be in the same areas you chased \'em about in.',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 4), new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 6, GameConstants.AchievementOption.less )]),
});
const BirdPeony4 = new NPC ('Peony', [
    'Wait--you really caught Articuno, Moltres, and Zapdos from the legends?! Thats\'s ultra-mega-brilliant! Report away!',
    'So that\'s them is it? I can definitely see the resemblance, but they don\'t seem quite the same...',
    'Maybe they\'re regional variants or somethin\'? At any rate, that\'s good enough for me. Let\'s call this expedition a success!',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 6), new QuestLineCompletedRequirement('The Birds of the Dyna Tree', GameConstants.AchievementOption.less)]),
});
const GolemPeony1 = new NPC ('Peony', [
    'Hey, Chief! I was talking to the locals and they mentioned some weird purple and yellow ruins at Three-Point Pass. You should go check \'em out!',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement: new MultiRequirement([new QuestLineStartedRequirement('The Ancient Golems'), new QuestLineStepCompletedRequirement('The Ancient Golems', 1, GameConstants.AchievementOption.less )]),
});
const GolemPeony2 = new NPC ('Peony', [
    'So they wouldn\'t open... That\'s annoyin\'. Well, there are also 3 more ruins, 2 at opposite ends of Giant\'s Bed, and one at Snowslide Slope. Maybe you should have a look at those?',
    'How \'bout clearin\' em 10 times each, and see if you find anythin\' to open up the ruins at Three-Point Pass.',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 1), new QuestLineStepCompletedRequirement('The Ancient Golems', 3, GameConstants.AchievementOption.less )]),
});
const GolemPeony3 = new NPC ('Peony', [
    'So that didn\'t work? Well, I heard there are some legendary Pokémon in those ruins, called Regirock, Regice, and Registeel. Apparently they\'ll show up to people who have done enough explorin\' in their ruins.',
    'Maybe if you caught them, the other ruins would open? What? You already have? Well, it might be worth doing it again, anyway.',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 3), new QuestLineStepCompletedRequirement('The Ancient Golems', 5, GameConstants.AchievementOption.less )]),
});
const GolemPeony4 = new NPC ('Peony', [
    'Looks like that didn\'t do it. But don\'t lose your hopes yet! I was just told that Regigigas appeared in Giant\'s Bed! Probably somethin\' to do with you catching those other three. Anyway! You should go on and catch it!',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 5), new QuestLineStepCompletedRequirement('The Ancient Golems', 7, GameConstants.AchievementOption.less )]),
});
const GolemPeony5 = new NPC ('Peony', [
    'Wait--so you really caught Regigigas from the legends? Well, that doesn\'t seem to have opened the ruins automatically or anythin\', but I imagine Regigigas can open those doors with sheer strength!',
    'You should go now and see what\'s there!',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 7), new QuestLineStepCompletedRequirement('The Ancient Golems', 9, GameConstants.AchievementOption.less)]),
});
const GolemPeony6 = new NPC ('Peony', [
    'You caught Regieleki and Regidrago from the legends? Well that\'s that then! Smashin\'! I\'ll mark this expedition done!',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement:  new MultiRequirement([new QuestLineStepCompletedRequirement('The Ancient Golems', 9), new QuestLineCompletedRequirement('The Ancient Golems', GameConstants.AchievementOption.less )]),
});
const PeonyComplete = new NPC ('Peony', [
    'Huh? Well how \'bout that, Chief! Looks like that was the last bit of the grand Peony Adven-tour that I had for you! Whoooooo! Now this is an occasion! What\'s the word? Ultra-mega-epic! Your passion for all this caught me off guard, Chief...',
    'This whole Adven-tour thing was built out of a load of rubbish I scraped together. Even I had my doubts about the whole thing. But you? You went at it with a ton of energy! Thanks for stickin\' around and finishin\' every part of my Adven-tour!',
], {
    image: 'assets/images/npcs/Peony.png',
    requirement: new MultiRequirement([new QuestLineCompletedRequirement('The Crown of Galar'), new QuestLineCompletedRequirement('The Birds of the Dyna Tree'), new QuestLineCompletedRequirement('The Ancient Golems')]),
});
const ProfMagnolia = new ProfNPC('Prof. Magnolia',
    GameConstants.Region.galar,
    'Ahhh, how incredible. Look how far you have come, dear trainer. Congratulations on another complete Pokédex.',
    'I hear word of an exotic region on the horizon, but there has been no word yet when the blimp will be able to reach such faraway lands.',
    //*TODO*: Change second line to this text when Paldea is available: 'Now be on your way, the illustrious Paldea region awaits over the horizons.',
    'assets/images/npcs/Professor Magnolia.png');

const MagearnaMysteryGift = new NPC('Mystery Gift', [
    'You have received a Mystery Gift for completing the National Shiny Dex!',
], {
    image: 'assets/images/pokemon/801.01.png',
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
    [TemporaryBattleList['Rampaging Conkeldurr'], TemporaryBattleList['Rampaging Dusknoir'], GymList['Stow-on-Side1'], GymList['Stow-on-Side2'], StowonSideShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Stow-on-Side']), new ShardTraderShop(GameConstants.ShardTraderLocations['Route 6'], 'Fossil Master', true, 'Fossils')],
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
    [TemporaryBattleList['Gym Leader Marnie'], SpikemuthShop, new ShardTraderShop(GameConstants.ShardTraderLocations.Spikemuth), new DockTownContent()],
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
    [new BulletinBoard(GameConstants.BulletinBoards.Armor), TemporaryBattleList.Mustard, TemporaryBattleList.Kubfu, MasterDojoShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Master Dojo']), new DockTownContent()],
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
    [new DockTownContent(), TemporaryBattleList.Peony],
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
        npcs: [EnergyPlantRose, EternatusCatch, SordwardShielbert3, SordwardShielbert4, Piers, EnergyPlantHop],
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
    [new RouteKillRequirement(10, GameConstants.Region.galar, 50)],
    [],
    {
        npcs: [GalarFossilHiker],
    }
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
TownList['Max Lair'] = new DungeonTown(
    'Max Lair',
    GameConstants.Region.galar,
    GameConstants.GalarSubRegions.CrownTundra,
    [new DevelopmentRequirement(new QuestLineStartedRequirement('The Lair of Giants'))]
);

//Hisui shops
const JubilifeVillageShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Black_augurite,
    ItemList.Peat_block,
]);

// Hisui NPCs

const ForcesCogita1 = new NPC('Cogita', [
    'I\'ve just been told of the foul plan Volo had concocted. Well, think no more on that scoundrel. Just another tale of passion burning too bright and consuming its bearer. This is what happens, if you allow it to.',
    'But what of you? Are you making any progress with your...what do you call your studies of Pokémon? Surveying, was it?',
    'Indeed? Well, Hisui still holds more fascinating Pokémon.',
    'Such as Tornadus... In every direction it flies, stirring up tremendous storms as it goes. When a blizzard batters the Alabaster Icelands, Tornadus may be about.',
    'Also, Thundurus: as it flies around, it fires bolts of lightning every which way. When a rainstorm lashes the Cobalt Coastlands, Tornadus may be about.',
    'Lastly, Landorus, the Pokémon hailed as the Guardian of the Fields. It seems it can be glimpsed in the Obsidian Fieldlands. Perhaps you\'d be so good as to catch it for me?',
    'I know not why these three have chosen to show themselves. Perhaps the cause lies with the space-time rift...or simply within their own whims...',
], {
    requirement: new MultiRequirement([new QuestLineStartedRequirement('Incarnate Forces of Hisui'), new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1, GameConstants.AchievementOption.less)]),
});
const ForcesCogita2 = new NPC('Cogita', [
    'Ah, you\'ve arrived. You now know much about Landorus, Tornadus and even Thundurus. Well done.',
    'In more normal times, I would bid you to let these three fly free as is their nature.',
    'But we are fresh from the tearing of the space-time rift. Until its aftereffects fade entirely, perhaps its best to keep our trio contained.',
    'And now, it is time to tell you the rest. There is one more of that cohort. Come.',
    '<img src="assets/images/pokemon/905.png">',
    'This is Enamorus, a Pokémon hailed as the Herald of Spring. Enamorus is not particularly given to ill behaviour. But I imagine you\'d like to document her for your Pokédex, wouldn\'t you?',
    'Catch her then, if you like. She always flits about in the Crimson Mirelands.',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1), new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 3, GameConstants.AchievementOption.less)]),
});
const ForcesCogita3 = new NPC('Cogita', [
    'Aha, you\'ve caught Enamorus as well. And you know so much about her.',
    'Enamorus arrives in Hisui once winter has passed. Hence the epithet Herald of Spring.',
    'Her company, when I have the pleasure, is of great help, she ferries me hither and yon across Hisui. But I\'ll leave her in your care for now, I suppose.',
    'Indeed, even you can hardly expect to live for all time, surely, but she will be in your care for now.',
    'You, Enamorus and her brethren have something in common: you tend to stir the pot of life. Do not mistake me - I mean this positively.',
    'If everything were straightforward, what meaning would there be in living as long as we do?',
    '"Once there was a god of field, and once there was a god of spring. Upon Hisui\'s winds it wheeled, brought life to every growing thing..." Was that how that old verse went?',
    'I have passed on to you all there is to pass. Where history goes from here...I leave to you and your companions to see through.',
], {
    requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 4), new QuestLineCompletedRequirement('Incarnate Forces of Hisui', GameConstants.AchievementOption.less)]),
});

//Hisui Towns
TownList['Prelude Beach'] = new Town(
    'Prelude Beach',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['The Galaxy Team\'s Kamado']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Jubilife Village'] = new Town(
    'Jubilife Village',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [JubilifeVillageShop, new ShardTraderShop(GameConstants.ShardTraderLocations['Jubilife Village']), TemporaryBattleList['Volo 1'], TemporaryBattleList['Akari 1'], TemporaryBattleList['Akari 2'], TemporaryBattleList['Adaman 1']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Galaxy Hall'] = new Town(
    'Galaxy Hall',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new BulletinBoard(GameConstants.BulletinBoards.Hisui)],
    {
        requirements: [new DevelopmentRequirement()],
        npcs: [ForcesCogita1],
    }
);
TownList['Fieldlands Camp'] = new Town(
    'Fieldlands Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Warden Mai']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Heights Camp'] = new Town(
    'Heights Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Alpha Kricketune']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Grandtree Arena'] = new Town(
    'Grandtree Arena',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Warden Lian'], TemporaryBattleList['Irida 1'], TemporaryBattleList['Lord of the Woods: Kleavor']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Mirelands Camp'] = new Town(
    'Mirelands Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Coin 1']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Bogbound Camp'] = new Town(
    'Bogbound Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Sludge Mound'] = new Town(
    'Sludge Mound',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList.Ursaluna],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Diamond Settlement'] = new Town(
    'Diamond Settlement',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Brava Arena'] = new Town(
    'Brava Arena',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Lady of the Ridge: Lilligant']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Beachside Camp'] = new Town(
    'Beachside Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Irida 2']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Coastlands Camp'] = new Town(
    'Coastlands Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Iscan\'s Cabin'] = new Town(
    'Iscan\'s Cabin',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Molten Arena'] = new Town(
    'Molten Arena',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList.Clover, TemporaryBattleList['Coin 2'], TemporaryBattleList['Charm 1'], TemporaryBattleList['Lord of the Isles: Arcanine']],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Firespit Island'))],
    }
);
TownList['Highlands Camp'] = new Town(
    'Highlands Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Mountain Camp'] = new Town(
    'Mountain Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Summit Camp'] = new Town(
    'Summit Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Moonview Arena'] = new Town(
    'Moonview Arena',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Melli 2'], TemporaryBattleList['Lord of the Hollow: Electrode']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Snowfields Camp'] = new Town(
    'Snowfields Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Icepeak Camp'] = new Town(
    'Icepeak Camp',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Pearl Settlement'] = new Town(
    'Pearl Settlement',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Irida 3']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Icepeak Arena'] = new Town(
    'Icepeak Arena',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList['Lord of the Tundra: Avalugg']],
    {
        requirements: [new DevelopmentRequirement()],
    }
);
TownList['Ancient Retreat'] = new Town(
    'Ancient Retreat',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [],
    {
        requirements: [new DevelopmentRequirement()],
        npcs: [ForcesCogita2, ForcesCogita3],
    }
);
TownList['Stone Portal'] = new Town(
    'Stone Portal',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [TemporaryBattleList.Beni],
    {
        requirements: [new DevelopmentRequirement()],
    }
);

//Hisui Dungeons
TownList['Floaro Gardens'] = new DungeonTown(
    'Floaro Gardens',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Oreburrow Tunnel'] = new DungeonTown(
    'Oreburrow Tunnel',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList.Heartwood = new DungeonTown(
    'Heartwood',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Ancient Solaceon Ruins'] = new DungeonTown(
    'Ancient Solaceon Ruins',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Volo 2']]
);
TownList['Shrouded Ruins'] = new DungeonTown(
    'Shrouded Ruins',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Veilstone Cape'] = new DungeonTown(
    'Veilstone Cape',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Firespit Island'] = new DungeonTown(
    'Firespit Island',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [new MoveToTown('Molten Arena')]
);
TownList['Ancient Wayward Cave'] = new DungeonTown(
    'Ancient Wayward Cave',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Melli 1']]
);
TownList['Ancient Quarry'] = new DungeonTown(
    'Ancient Quarry',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Primeval Grotto'] = new DungeonTown(
    'Primeval Grotto',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Charm 2']]
);
TownList['Clamberclaw Cliffs'] = new DungeonTown(
    'Clamberclaw Cliffs',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Warden Ingo']]
);
TownList['Celestica Ruins'] = new DungeonTown(
    'Celestica Ruins',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Sacred Plaza'] = new DungeonTown(
    'Sacred Plaza',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Avalugg\'s Legacy'] = new DungeonTown(
    'Avalugg\'s Legacy',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Warden Gaeric']]
);
TownList['Ice Column Chamber'] = new DungeonTown(
    'Ice Column Chamber',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Icepeak Cavern'] = new DungeonTown(
    'Icepeak Cavern',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Ancient Snowpoint Temple'] = new DungeonTown(
    'Ancient Snowpoint Temple',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Warden Sabi'], TemporaryBattleList['Hisuian Braviary']]
);
TownList['Seaside Hollow'] = new DungeonTown(
    'Seaside Hollow',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [
        new DevelopmentRequirement(),
        new ObtainedPokemonRequirement('Overqwil'),
    ]
);
TownList['Ancient Lake Verity'] = new DungeonTown(
    'Ancient Lake Verity',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Ancient Lake Valor'] = new DungeonTown(
    'Ancient Lake Valor',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Adaman 2']]
);
TownList['Ancient Lake Acuity'] = new DungeonTown(
    'Ancient Lake Acuity',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);
TownList['Temple of Sinnoh'] = new DungeonTown(
    'Temple of Sinnoh',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()],
    [TemporaryBattleList['Dialga (Origin)'], TemporaryBattleList['Palkia (Origin)'], TemporaryBattleList['Volo 3'], TemporaryBattleList.Arceus]
);
TownList['Turnback Cave'] = new DungeonTown(
    'Turnback Cave',
    GameConstants.Region.hisui,
    GameConstants.HisuiSubRegions.Hisui,
    [new DevelopmentRequirement()]
);

//Paldea Shops
const ZapapicoShop = new Shop([
    ItemList.Pokeball,
    ItemList.Greatball,
    ItemList.Ultraball,
    ItemList.Auspicious_armor,
    ItemList.Malicious_armor,
]);

// Paldea NPCs
const PaldeaRoamerNPC = new RoamerNPC('Student Emily', [
    'Hey, hey, did you hear? A group of students saw some super rare Pokémon on {ROUTE_NAME}!',
], GameConstants.Region.paldea, RoamingPokemonList.findGroup(GameConstants.Region.paldea, GameConstants.PaldeaSubRegions.Paldea));

//Paldea Towns
TownList['Cabo Poco'] = new Town(
    'Cabo Poco',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new BulletinBoard(GameConstants.BulletinBoards.Paldea)],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Azure)],
    }
);
TownList['Poco Path Lighthouse'] = new Town(
    'Poco Path Lighthouse',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [GymList['Pokémon Trainer Arven']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Los Platos'] = new Town(
    'Los Platos',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Mesagoza = new Town(
    'Mesagoza',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [GymList['Champion Nemona']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
//Dunno what do about Naranja and Uva Academy's names. For now I've merged them.
TownList['Naranjuva Academy'] = new Town(
    'Naranjuva Academy',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [GymList['Director Clavell'], GymList['Penny of Team Star']],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
        npcs: [PaldeaRoamerNPC],
    }
);
TownList.Cortondo = new Town(
    'Cortondo',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Artazon = new Town(
    'Artazon',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Levincia = new Town(
    'Levincia',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Alfornada = new Town(
    'Alfornada',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Cascarrafa = new Town(
    'Cascarrafa',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Porto Marinada'] = new Town(
    'Porto Marinada',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Medali = new Town(
    'Medali',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Zapapico = new Town(
    'Zapapico',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [ZapapicoShop],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList.Montenevera = new Town(
    'Montenevera',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Pokémon League Paldea'] = new Town(
    'Pokémon League Paldea',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [GymList['Elite Rika'], GymList['Elite Poppy'], GymList['Elite Larry'], GymList['Elite Hassel'], GymList['Top Champion Geeta'], pokeLeagueShop()],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Segin Squad\'s Base'] = new Town(
    'Segin Squad\'s Base',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Schedar Squad\'s Base'] = new Town(
    'Schedar Squad\'s Base',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Navi Squad\'s Base'] = new Town(
    'Navi Squad\'s Base',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Ruchbah Squad\'s Base'] = new Town(
    'Ruchbah Squad\'s Base',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Caph Squad\'s Base'] = new Town(
    'Caph Squad\'s Base',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Zero Gate'] = new Town(
    'Zero Gate',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [],
    {
        requirements: [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    }
);
TownList['Zero Lab'] = new Town(
    'Zero Lab',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [GymList['AI Sada'], GymList['AI Turo'], TemporaryBattleList['Paradise Protection Protocol']],
    {
        requirements: [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Area Zero Depths'))],
    }
);

// Paldea Dungeons
TownList['Inlet Grotto'] = new DungeonTown(
    'Inlet Grotto',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 1)]
);
TownList['Glaseado Mountain'] = new DungeonTown(
    'Glaseado Mountain',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 1)]
);
TownList['Grasswither Shrine'] = new DungeonTown(
    'Grasswither Shrine',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 1)]
);
TownList['Icerend Shrine'] = new DungeonTown(
    'Icerend Shrine',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 1)]
);
TownList['Groundblight Shrine'] = new DungeonTown(
    'Groundblight Shrine',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 1)]
);
TownList['Firescourge Shrine'] = new DungeonTown(
    'Firescourge Shrine',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 1)]
);
TownList['Area Zero'] = new DungeonTown(
    'Area Zero',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    /*[new MultiRequirement([
        new QuestLineCompletedRequirement('Path of Legends'),
        new QuestLineCompletedRequirement('Victory Road'),
        new QuestLineCompletedRequirement('Starfall Street'),
    ])]*/
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Inlet Grotto'))]
);
TownList['Area Zero Depths'] = new DungeonTown(
    'Area Zero Depths',
    GameConstants.Region.paldea,
    GameConstants.PaldeaSubRegions.Paldea,
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Area Zero'))]
);

// Used to check if next region can be reached, for example for professor NPC
TownList['Final Region Town'] = new Town(
    'Final Region Town',
    GameConstants.Region.final,
    GameConstants.FinalSubRegions.Final,
    [],
    {
        requirements: [new GymBadgeRequirement(BadgeEnums.Elite_PaldeaChampion)],
    }
);
