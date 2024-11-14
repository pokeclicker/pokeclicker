
const GymList: { [townName: string]: Gym } = {};

// Kanto Gyms
GymList['Pewter City'] = new Gym(
    'Brock',
    'Pewter City',
    [
        new GymPokemon('Geodude', 693, 12),
        new GymPokemon('Onix', 1399, 14),
    ],
    BadgeEnums.Boulder,
    250,
    'I took you for granted, and so I lost. As proof of your victory, I confer on you this... the official Pokémon League BoulderBadge.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 2)]
);
GymList['Cerulean City'] = new Gym(
    'Misty',
    'Cerulean City',
    [
        new GymPokemon('Staryu', 4000, 18),
        new GymPokemon('Starmie', 6800, 21),
    ],
    BadgeEnums.Cascade,
    500,
    'Wow! You\'re too much, all right! You can have the CascadeBadge to show that you beat me.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
    () => {
        App.game.quests.getQuestLine('Team Rocket').beginQuest(0, undefined, true);
    }
);
GymList['Vermilion City'] = new Gym(
    'Lt. Surge',
    'Vermilion City',
    [
        new GymPokemon('Voltorb', 10780, 21),
        new GymPokemon('Pikachu', 13540, 18),
        new GymPokemon('Raichu', 15675, 24),
    ],
    BadgeEnums.Thunder,
    1000,
    'Now that\'s a shocker! You\'re the real deal, kid! Fine, then, take the ThunderBadge!',
    [
        new TemporaryBattleRequirement('Blue 3'),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
);
GymList['Celadon City'] = new Gym(
    'Erika',
    'Celadon City',
    [
        new GymPokemon('Victreebel', 38810, 29),
        new GymPokemon('Tangela', 30340, 24),
        new GymPokemon('Vileplume', 36400, 29),
    ],
    BadgeEnums.Rainbow,
    1500,
    'Oh! I concede defeat. You are remarkably strong. I must confer on you the RainbowBadge.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)]
);
GymList['Saffron City'] = new Gym(
    'Sabrina',
    'Saffron City',
    [
        new GymPokemon('Kadabra', 23040, 38),
        new GymPokemon('Mr. Mime', 25600, 37),
        new GymPokemon('Venomoth', 28400, 38),
        new GymPokemon('Alakazam', 35380, 43),
    ],
    BadgeEnums.Marsh,
    2500,
    'This loss shocks me! But a loss is a loss. I admit I didn\'t work hard enough to win. You earned the MarshBadge.',
    [new QuestLineStepCompletedRequirement('Team Rocket', 3)]
);
GymList['Fuchsia City'] = new Gym(
    'Koga',
    'Fuchsia City',
    [
        new GymPokemon('Koffing', 30780, 37),
        new GymPokemon('Muk', 32460, 39),
        new GymPokemon('Koffing', 36430, 37),
        new GymPokemon('Weezing', 37430, 43),
    ],
    BadgeEnums.Soul,
    3500,
    'Humph! You have proven your worth! Here! Take the Soul Badge!',
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ]),
    ],
    () => {
        App.game.keyItems.gainKeyItem(KeyItemType.Safari_ticket, true);
        App.game.quests.getQuestLine('Mining Expedition').beginQuest(0, undefined, true);
    }
);
GymList['Cinnabar Island'] = new Gym(
    'Blaine',
    'Cinnabar Island',
    [
        new GymPokemon('Growlithe', 37430, 42),
        new GymPokemon('Ponyta', 42340, 40),
        new GymPokemon('Rapidash', 45230, 42),
        new GymPokemon('Arcanine', 50290, 47),
    ],
    BadgeEnums.Volcano,
    5000,
    'I have burned down to nothing! Not even ashes remain! You have earned the VolcanoBadge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Mansion'))],
    () => {
        App.game.quests.getQuestLine('Bill\'s Errand').beginQuest(0, undefined, true);
    }
);
GymList['Viridian City'] = new Gym(
    'Giovanni',
    'Viridian City',
    [
        new GymPokemon('Rhyhorn', 45230, 45),
        new GymPokemon('Dugtrio', 47530, 42),
        new GymPokemon('Nidoqueen', 48740, 44),
        new GymPokemon('Nidoking', 48350, 45),
        new GymPokemon('Rhyhorn', 55000, 50),
    ],
    BadgeEnums.Earth,
    6000,
    'Ha! That was a truly intense fight. You have won! As proof, here is the Earth Badge!',
    [
        new GymBadgeRequirement(BadgeEnums.Thunder),
        new GymBadgeRequirement(BadgeEnums.Rainbow),
        new GymBadgeRequirement(BadgeEnums.Marsh),
        new QuestLineCompletedRequirement('Bill\'s Errand'),
    ],
    () => {
        App.game.keyItems.gainKeyItem(KeyItemType.Gem_case, true);
        App.game.quests.getQuestLine('Persons of Interest').beginQuest(0, undefined, true);
    },
    undefined,
    { imageName: 'Team Rocket Boss Giovanni' }
);

// Kanto Elite 4
GymList['Elite Lorelei'] = new Gym(
    'Lorelei',
    'Elite Lorelei',
    [
        new GymPokemon('Dewgong', 45330, 52),
        new GymPokemon('Cloyster', 48300, 51),
        new GymPokemon('Slowbro', 52000, 52),
        new GymPokemon('Jynx', 57000, 54),
        new GymPokemon('Lapras', 60250, 54),
    ],
    BadgeEnums.Elite_Lorelei,
    7500,
    '...Things shouldn\'t be this way!',
    [new GymBadgeRequirement(BadgeEnums.Earth)],
    undefined,
    undefined,
    { battleBackground: 'Ice' }
);
GymList['Elite Bruno'] = new Gym(
    'Bruno',
    'Elite Bruno',
    [
        new GymPokemon('Onix', 45330, 51),
        new GymPokemon('Hitmonchan', 48300, 53),
        new GymPokemon('Hitmonlee', 52000, 53),
        new GymPokemon('Onix', 57000, 54),
        new GymPokemon('Machamp', 60250, 56),
    ],
    BadgeEnums.Elite_Bruno,
    7500,
    'Why? How could I lose?',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lorelei)],
    undefined,
    undefined,
    { battleBackground: 'Cave' }
);
GymList['Elite Agatha'] = new Gym(
    'Agatha',
    'Elite Agatha',
    [
        new GymPokemon('Gengar', 45330, 54),
        new GymPokemon('Golbat', 48300, 54),
        new GymPokemon('Haunter', 52000, 53),
        new GymPokemon('Arbok', 57000, 56),
        new GymPokemon('Gengar', 60250, 58),
    ],
    BadgeEnums.Elite_Agatha,
    7500,
    'Oh, my! You\'re something special, child!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bruno)],
    undefined,
    undefined,
    { battleBackground: 'Graveyard' }
);
GymList['Elite Lance'] = new Gym(
    'Lance',
    'Elite Lance',
    [
        new GymPokemon('Gyarados', 48300, 56),
        new GymPokemon('Dragonair', 52000, 54),
        new GymPokemon('Dragonair', 57000, 54),
        new GymPokemon('Aerodactyl', 60250, 58),
        new GymPokemon('Dragonite', 66000, 60),
    ],
    BadgeEnums.Elite_Lance,
    7500,
    'That\'s it! I hate to admit it, but you are a Pokémon master!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Agatha)],
    undefined,
    undefined,
    { battleBackground: 'GemCave' }
);
// Kanto Champion
GymList['Champion Blue'] = new Gym(
    'Blue',
    'Champion Blue',
    [
        new GymPokemon('Pidgeot', 52340, 59),
        new GymPokemon('Alakazam', 56320, 57),
        new GymPokemon('Rhydon', 58340, 59),
        new GymPokemon('Exeggutor', 57520, 59, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Gyarados', 65340, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Charizard', 70000, 63, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Arcanine', 57520, 59, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Exeggutor', 65340, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Blastoise', 70000, 63, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Gyarados', 57520, 59, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Arcanine', 65340, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Venusaur', 70000, 63, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Gyarados', 57520, 59, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Arcanine', 65340, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
        new GymPokemon('Venusaur', 70000, 63, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Special)),
    ],
    BadgeEnums.Elite_KantoChampion,
    10000,
    'NO! That can\'t be! You beat me at my best! After all that work to become the League Champ? My reign is over already? It\'s not fair!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lance)],
    () => {},
    { champion: true },
    { battleBackground: 'GemCave' }
);

//Johto Gyms
GymList['Violet City'] = new Gym(
    'Falkner',
    'Violet City',
    [
        new GymPokemon('Pidgey', 108000, 7),
        new GymPokemon('Pidgeotto', 112000, 9),
    ],
    BadgeEnums.Zephyr,
    500,
    '...Darn! My Dad\'s cherished bird Pokémon... All right. Take this. It\'s the official Pokémon League Zephyr Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sprout Tower'))]
);
GymList['Azalea Town'] = new Gym(
    'Bugsy',
    'Azalea Town',
    [
        new GymPokemon('Metapod', 103000, 14),
        new GymPokemon('Kakuna', 101500, 14),
        new GymPokemon('Scyther', 119000, 16),
    ],
    BadgeEnums.Hive,
    1000,
    'Whoa, amazing! You\'re an expert on Pokémon! My research isn\'t complete yet. Ok, you win. Take this Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slowpoke Well'))]
);
GymList['Goldenrod City'] = new Gym(
    'Whitney',
    'Goldenrod City',
    [
        new GymPokemon('Clefairy', 130000, 18),
        new GymPokemon('Miltank', 170000, 20),
    ],
    BadgeEnums.Plain,
    1500,
    '...Sniff... What? What do you want? A badge? Oh, right. I forgot. Here\'s the Plain Badge.',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 34)]
);
GymList['Ecruteak City'] = new Gym(
    'Morty',
    'Ecruteak City',
    [
        new GymPokemon('Gastly', 127000, 21),
        new GymPokemon('Haunter', 128000, 21),
        new GymPokemon('Gengar', 132000, 25),
        new GymPokemon('Haunter', 130000, 23),
    ],
    BadgeEnums.Fog,
    2500,
    'I\'m not good enough yet... All right. This Badge is yours.',
    [new GymBadgeRequirement(BadgeEnums.Plain)],
    () => {
        App.game.quests.getQuestLine('Team Rocket Again').beginQuest(0, undefined, true);
        App.game.quests.getQuestLine('The Sick Ampharos').beginQuest(0, undefined, true);
    }
);
GymList['Cianwood City'] = new Gym(
    'Chuck',
    'Cianwood City',
    [
        new GymPokemon('Primeape', 177000, 27),
        new GymPokemon('Poliwrath', 183000, 30),
    ],
    BadgeEnums.Storm,
    3500,
    'Wha? Huh? I lost? How about that! You\'re worthy of the Storm Badge!',
    [new QuestLineStepCompletedRequirement('The Sick Ampharos', 2)]
);
GymList['Olivine City'] = new Gym(
    'Jasmine',
    'Olivine City',
    [
        new GymPokemon('Magnemite', 177000, 30),
        new GymPokemon('Magnemite', 178000, 30),
        new GymPokemon('Steelix', 182000, 35),
    ],
    BadgeEnums.Mineral,
    4000,
    '...You are a better trainer than me, in both skill and kindness. In accordance with League rules, I confer upon you this Badge.',
    [new QuestLineCompletedRequirement('The Sick Ampharos')]
);
GymList['Mahogany Town'] = new Gym(
    'Pryce',
    'Mahogany Town',
    [
        new GymPokemon('Seel', 190000, 27),
        new GymPokemon('Dewgong', 192500, 29),
        new GymPokemon('Piloswine', 196000, 31),
    ],
    BadgeEnums.Glacier,
    5000,
    'Ah, I am impressed by your prowess. With your strong will, I know you will overcome all life\'s obstacles. You are worthy of this Badge!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Rocket\'s Hideout'))]
);
GymList['Blackthorn City'] = new Gym(
    'Clair',
    'Blackthorn City',
    [
        new GymPokemon('Dragonair', 205000, 37),
        new GymPokemon('Dragonair', 205000, 37),
        new GymPokemon('Dragonair', 218000, 37),
        new GymPokemon('Kingdra', 220000, 40),
    ],
    BadgeEnums.Rising,
    7500,
    'Here, this is the Rising Badge... Hurry up! Take it!',
    [new GymBadgeRequirement(BadgeEnums.Glacier)]
);

//Johto Elite 4
GymList['Elite Will'] = new Gym(
    'Will',
    'Elite Will',
    [
        new GymPokemon('Xatu', 245330, 40),
        new GymPokemon('Exeggutor', 248300, 41),
        new GymPokemon('Slowbro', 252000, 41),
        new GymPokemon('Jynx', 257000, 41),
        new GymPokemon('Xatu', 260250, 42),
    ],
    BadgeEnums.Elite_Will,
    10000,
    'Even though I was defeated, I won\'t change my course. I will continue battling until I stand above all Trainers! Now move on and experience the true ferocity of the Elite Four.',
    [new TemporaryBattleRequirement('Silver 5')]
);
GymList['Elite Koga'] = new Gym(
    'Koga2',
    'Elite Koga',
    [
        new GymPokemon('Ariados', 245330, 40),
        new GymPokemon('Venomoth', 248300, 41),
        new GymPokemon('Forretress', 252000, 43),
        new GymPokemon('Muk', 257000, 42),
        new GymPokemon('Crobat', 260250, 44),
    ],
    BadgeEnums.Elite_Koga,
    10000,
    'I subjected you to everything I could muster. But my efforts failed. I must hone my skills. Go on to the next room, and put your abilities to the test!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Will)],
    undefined, undefined, { displayName: 'Elite Koga' }
);
GymList['Elite Bruno2'] = new Gym(
    'Bruno2',
    'Elite Bruno2',
    [
        new GymPokemon('Hitmontop', 245330, 42),
        new GymPokemon('Hitmonlee', 248300, 42),
        new GymPokemon('Hitmonchan', 252000, 42),
        new GymPokemon('Onix', 257000, 43),
        new GymPokemon('Machamp', 260250, 46),
    ],
    BadgeEnums.Elite_Bruno2,
    10000,
    'Having lost, I have no right to say anything… Go face your next challenge!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Koga)],
    undefined, undefined, { displayName: 'Elite Bruno' }
);
GymList['Elite Karen'] = new Gym(
    'Karen',
    'Elite Karen',
    [
        new GymPokemon('Umbreon', 248300, 42),
        new GymPokemon('Vileplume', 252000, 42),
        new GymPokemon('Murkrow', 257000, 44),
        new GymPokemon('Gengar', 260250, 45),
        new GymPokemon('Houndoom', 266000, 47),
    ],
    BadgeEnums.Elite_Karen,
    10000,
    'Strong Pokémon. Weak Pokémon. That is only the selfish perception of people. Truly skilled Trainers should try to win with the Pokémon they love best. I like your style. You understand what\'s important. Go on — — the Champion is waiting.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bruno2)]
);
// Johto Champion
GymList['Champion Lance'] = new Gym(
    'Lance2',
    'Champion Lance',
    [
        new GymPokemon('Gyarados', 258300, 44),
        new GymPokemon('Dragonite', 262000, 47),
        new GymPokemon('Charizard', 264000, 46),
        new GymPokemon('Aerodactyl', 260250, 46),
        new GymPokemon('Dragonite', 270000, 47),
        new GymPokemon('Dragonite', 270000, 50),
    ],
    BadgeEnums.Elite_JohtoChampion,
    13000,
    '…It\'s over. But it\'s an odd feeling. I\'m not angry that I lost. In fact, I feel happy. Happy that I witnessed the rise of a great new Champion!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Karen)],
    () => {},
    { champion: true }
);

// Hoenn Gyms
GymList['Rustboro City'] = new Gym(
    'Roxanne',
    'Rustboro City',
    [
        new GymPokemon('Geodude', 382900, 12),
        new GymPokemon('Geodude', 382900, 12),
        new GymPokemon('Nosepass', 410200, 15),
    ],
    BadgeEnums.Stone,
    1000,
    'So… I lost… It seems that I still have much more to learn… I understand. The Pokémon League\'s rules state that Trainers are to be given this if they defeat a Gym Leader. Please accept the official Pokémon League Stone Badge.',
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]
);
GymList['Dewford Town'] = new Gym(
    'Brawly',
    'Dewford Town',
    [
        new GymPokemon('Machop', 424000, 16),
        new GymPokemon('Meditite', 424000, 16),
        new GymPokemon('Makuhita', 444000, 19),
    ],
    BadgeEnums.Knuckle,
    2000,
    'Whoah, wow! You made a much bigger splash than I expected! You swamped me! Okay, you\'ve got me. Take this Gym Badge!',
    [new TemporaryBattleRequirement('May 2')]
);
GymList['Mauville City'] = new Gym(
    'Wattson',
    'Mauville City',
    [
        new GymPokemon('Voltorb', 452000, 20),
        new GymPokemon('Electrike', 448000, 20),
        new GymPokemon('Magneton', 483000, 22),
        new GymPokemon('Manectric', 448000, 24),
    ],
    BadgeEnums.Dynamo,
    3000,
    'Wahahahah! Fine, I lost! You ended up giving me a thrill! Take this Badge!',
    [new TemporaryBattleRequirement('Wally 1')],
    () => {
        App.game.quests.getQuestLine('Land vs. Water').beginQuest(0, undefined, true);
    }
);
GymList['Lavaridge Town'] = new Gym(
    'Flannery',
    'Lavaridge Town',
    [
        new GymPokemon('Numel', 472000, 24),
        new GymPokemon('Slugma', 472000, 24),
        new GymPokemon('Camerupt', 492000, 26),
        new GymPokemon('Torkoal', 524000, 29),
    ],
    BadgeEnums.Heat,
    4000,
    'Oh... I guess I was trying too hard... I... I\'ve only recently become a Gym Leader. I tried too hard to be someone I\'m not. I have to do things my natural way. If I don\'t, my Pokémon will be confused. Thanks for teaching me that. For that, you deserve this.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Jagged Pass'))]
);
GymList['Petalburg City'] = new Gym(
    'Norman',
    'Petalburg City',
    [
        new GymPokemon('Spinda', 490000, 27),
        new GymPokemon('Vigoroth', 530000, 27),
        new GymPokemon('Linoone', 560000, 29),
        new GymPokemon('Slaking', 596000, 31),
    ],
    BadgeEnums.Balance,
    5000,
    '… I… I can\'t… I can\'t believe it. I lost to you? But, rules are rules! Here, take this.',
    [
        new GymBadgeRequirement(BadgeEnums.Knuckle),
        new GymBadgeRequirement(BadgeEnums.Heat),
    ]
);
GymList['Fortree City'] = new Gym(
    'Winona',
    'Fortree City',
    [
        new GymPokemon('Swablu', 605000, 29),
        new GymPokemon('Tropius', 650000, 29),
        new GymPokemon('Pelipper', 630000, 30),
        new GymPokemon('Skarmory', 667000, 31),
        new GymPokemon('Altaria', 669000, 33),
    ],
    BadgeEnums.Feather,
    6000,
    'Never before have I seen a Trainer command Pokémon with more grace than I... In recognition of your prowess, I present to you this Gym Badge.',
    [new TemporaryBattleRequirement('Kecleon 1')]
);
GymList['Mossdeep City'] = new Gym(
    'Tate & Liza',
    'Mossdeep City',
    [
        new GymPokemon('Claydol', 702000, 41),
        new GymPokemon('Xatu', 703000, 41),
        new GymPokemon('Lunatone', 702000, 42),
        new GymPokemon('Solrock', 703000, 42),
    ],
    BadgeEnums.Mind,
    8000,
    'What? Our combination... was shattered! It can\'t be helped. You\'ve won... So, in recognition, take this Gym Badge.',
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 125)]
);
GymList['Sootopolis City'] = new Gym(
    'Juan',
    'Sootopolis City',
    [
        new GymPokemon('Luvdisc', 798000, 41),
        new GymPokemon('Whiscash', 813000, 41),
        new GymPokemon('Sealeo', 823400, 43),
        new GymPokemon('Crawdaunt', 842000, 43),
        new GymPokemon('Kingdra', 865000, 46),
    ],
    BadgeEnums.Rain,
    10000,
    'Ahahaha, excellent! Very well, you are the winner. From you, I sense the brilliant shine of skill that will overcome all. However, compared with me or even Wallace, you are lacking in elegance. Perhaps I should make you a loan of my outfit? ... Hahaha, I merely jest! Rather than my clothes, I shall reward you with this, the Rain Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sky Pillar'))]
);

// Hoenn Elite 4
GymList['Elite Sidney'] = new Gym(
    'Sidney',
    'Elite Sidney',
    [
        new GymPokemon('Mightyena', 972000, 46),
        new GymPokemon('Shiftry', 980000, 48),
        new GymPokemon('Cacturne', 1002000, 46),
        new GymPokemon('Crawdaunt', 1015000, 48),
        new GymPokemon('Absol', 1020000, 49),
    ],
    BadgeEnums.Elite_Sidney,
    15000,
    'Well, listen to what this loser has to say. You\'ve got what it takes to go far. Now, go on to the next room and enjoy your next battle!',
    [
        new GymBadgeRequirement(BadgeEnums.Feather),
        new TemporaryBattleRequirement('Wally 2'),
    ]
);
GymList['Elite Phoebe'] = new Gym(
    'Phoebe',
    'Elite Phoebe',
    [
        new GymPokemon('Dusclops', 1036700, 48),
        new GymPokemon('Banette', 1038000, 49),
        new GymPokemon('Sableye', 1052000, 50),
        new GymPokemon('Banette', 1038000, 49),
        new GymPokemon('Dusclops', 1063000, 51),
    ],
    BadgeEnums.Elite_Phoebe,
    15000,
    'There\'s a definite bond between you and your Pokémon, too. I didn\'t recognize it, so it\'s only natural that I lost. Yup, I\'d like to see how far your bond will carry you. Go ahead, move to the next room.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Sidney)]
);
GymList['Elite Glacia'] = new Gym(
    'Glacia',
    'Elite Glacia',
    [
        new GymPokemon('Sealeo', 1082000, 50),
        new GymPokemon('Glalie', 1072000, 50),
        new GymPokemon('Sealeo', 1086000, 52),
        new GymPokemon('Glalie', 1076000, 52),
        new GymPokemon('Walrein', 1100000, 53),
    ],
    BadgeEnums.Elite_Glacia,
    15000,
    'Advance to the next room. And there, confirm the truly fearsome side of the Pokémon League.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Phoebe)]
);
GymList['Elite Drake'] = new Gym(
    'Drake',
    'Elite Drake',
    [
        new GymPokemon('Shelgon', 1064000, 52),
        new GymPokemon('Altaria', 1072000, 54),
        new GymPokemon('Kingdra', 1076000, 53),
        new GymPokemon('Flygon', 1076000, 53),
        new GymPokemon('Salamence', 1157000, 55),
    ],
    BadgeEnums.Elite_Drake,
    15000,
    'You deserve every credit for coming this far as a Trainer of Pokémon. You do seem to know what is needed. Yes, what a Trainer needs is a virtuous heart. Pokémon touch the good hearts of Trainers and learn good from wrong. They touch the good hearts of Trainers and grow strong. Go! Go onwards! The Champion is waiting!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Glacia)]
);

// Hoenn Champion
GymList['Champion Wallace'] = new Gym(
    'Wallace',
    'Champion Wallace',
    [
        new GymPokemon('Wailord', 1202000, 57),
        new GymPokemon('Tentacruel', 1164000, 55),
        new GymPokemon('Ludicolo', 1184000, 56),
        new GymPokemon('Whiscash', 1172000, 56),
        new GymPokemon('Gyarados', 1163000, 56),
        new GymPokemon('Milotic', 1182000, 58),
    ],
    BadgeEnums.Elite_HoennChampion,
    16000,
    'I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drake)],
    () => {},
    { champion: true }
);

// Orange league gyms
GymList['Mikan Island'] = new Gym(
    'Cissy',
    'Mikan Island',
    [
        new GymPokemon('Seadra', 2307500, 24),
        new GymPokemon('Blastoise', 2307500, 24),
    ],
    BadgeEnums['Coral-Eye'],
    10000,
    'I can see why you made it so far in the Indigo League, and I bet you\'ll do pretty well in the Orange League.\n' +
    'This is the Coral-Eye Badge of the Mikan Gym, to prove that you won your match!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tanoby Ruins'))]
);
GymList['Navel Island'] = new Gym(
    'Danny',
    'Navel Island',
    [
        new GymPokemon('Geodude', 923000, 24),
        new GymPokemon('Nidoqueen', 923000, 24),
        new GymPokemon('Machoke', 923000, 24),
        new GymPokemon('Scyther', 923000, 24),
        new GymPokemon('Electrode', 923000, 24),
    ],
    BadgeEnums.Sea_Ruby,
    10000,
    'You and the others were great.\nNow I\'d like to give you and your fellow challengers something you really deserve. The Sea Ruby badge. It\'s yours.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lost Cave'))]
);
GymList['Trovita Island'] = new Gym(
    'Rudy',
    'Trovita Island',
    [
        new GymPokemon('Electabuzz', 1538333, 24),
        new GymPokemon('Exeggutor', 1538333, 24),
        new GymPokemon('Starmie', 1538333, 24),
    ],
    BadgeEnums.Spike_Shell,
    10000,
    'Nice job, guys. Here are your Spike Shell badges, guys.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 41)]
);
GymList['Kumquat Island'] = new Gym(
    'Luana',
    'Kumquat Island',
    [
        new GymPokemon('Alakazam', 2307500, 24),
        new GymPokemon('Marowak', 2307500, 24),
    ],
    BadgeEnums.Jade_Star,
    10000,
    'You did a fine job.\nAnd now, as Kumquat Island gym leader, and a member of the Orange Crew, I happily present this token of your victory.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Icefall Cave'))]
);

// Orange league champion
GymList['Supreme Gym Leader Drake'] = new Gym(
    'Supreme Gym Leader Drake',
    'Supreme Gym Leader Drake',
    [
        new GymPokemon('Ditto', 899520, 38),
        new GymPokemon('Onix', 899520, 39),
        new GymPokemon('Gengar', 899520, 40),
        new GymPokemon('Venusaur', 899520, 40),
        new GymPokemon('Electabuzz', 899520, 41),
        new GymPokemon('Dragonite', 1124400, 37),
    ],
    BadgeEnums.Elite_OrangeChampion,
    12000,
    'You really deserve that trophy. You\'re a great Pokémon trainer.',
    [
        new GymBadgeRequirement(BadgeEnums['Coral-Eye']),
        new GymBadgeRequirement(BadgeEnums.Sea_Ruby),
        new GymBadgeRequirement(BadgeEnums.Spike_Shell),
        new GymBadgeRequirement(BadgeEnums.Jade_Star),
    ]
);

// Orre Gyms
GymList['Cipher Admin Ein'] = new Gym (
    'Cipher Admin Ein',
    'Cipher Admin Ein',
    [
        new GymPokemon('Crobat', 12099520, 48),
        new GymPokemon('Pelipper', 12099520, 49),
        new GymPokemon('Rhydon', 12099520, 50),
        new GymPokemon('Starmie', 12099520, 49),
        new GymPokemon('Manectric', 12099520, 50),
    ],
    BadgeEnums.Elite_F_Disk,
    12000,
    'Urrrgh… What unbelievable power…',
    [new QuestLineCompletedRequirement('Shadows in the Desert')],
    undefined, undefined, { displayName: 'Challenge Ein' }
);
GymList['Cipher Admin Miror B.'] = new Gym (
    'Cipher Admin Miror B',
    'Cipher Admin Miror B.',
    [
        new GymPokemon('Ludicolo', 11599520, 44),
        new GymPokemon('Ludicolo', 11599520, 45),
        new GymPokemon('Loudred', 11599520, 46),
        new GymPokemon('Golduck', 11599520, 45),
        new GymPokemon('Armaldo', 11599520, 43),
    ],
    BadgeEnums.Elite_L_Disk,
    12000,
    'I\'m an awesome dancer… But I can\'t win in battles!',
    [new QuestLineCompletedRequirement('Shadows in the Desert')],
    undefined, undefined, { displayName: 'Challenge Miror B.' }
);
GymList['Cipher Admin Dakim'] = new Gym (
    'Cipher Admin Dakim',
    'Cipher Admin Dakim',
    [
        new GymPokemon('Claydol', 11999520, 46),
        new GymPokemon('Forretress', 11999520, 45),
        new GymPokemon('Flygon', 11999520, 46),
        new GymPokemon('Whiscash', 11999520, 46),
        new GymPokemon('Houndoom', 11999520, 47),
    ],
    BadgeEnums.Elite_R_Disk,
    12000,
    'This can\'t be! The mighty Dakim loses again?',
    [new QuestLineCompletedRequirement('Shadows in the Desert')],
    undefined, undefined, { displayName: 'Challenge Dakim' }
);
GymList['Cipher Admin Venus'] = new Gym (
    'Cipher Admin Venus',
    'Cipher Admin Venus',
    [
        new GymPokemon('Bellossom', 12299520, 47),
        new GymPokemon('Misdreavus', 12299520, 47),
        new GymPokemon('Raichu', 12299520, 48),
        new GymPokemon('Wigglytuff', 12299520, 48),
        new GymPokemon('Milotic', 12299520, 48),
    ],
    BadgeEnums.Elite_U_Disk,
    12000,
    'I shall forget that I ever battled with you. Yes, that\'s what I\'ll do. Ohohohoh!',
    [new QuestLineCompletedRequirement('Shadows in the Desert')],
    undefined, undefined, { displayName: 'Challenge Venus' }
);
GymList['Cipher Admin Lovrina'] = new Gym ( //Kalos E4 difficulty, plus 10% per Orre Colosseum boss
    'Cipher Admin Lovrina',
    'Cipher Admin Lovrina',
    [
        new GymPokemon('Shuckle', 30994948, 100),
        new GymPokemon('Milotic', 30994948, 100),
        new GymPokemon('Wobbuffet', 30994948, 100),
        new GymPokemon('Blissey', 30994948, 100),
        new GymPokemon('Misdreavus', 30994948, 100),
        new GymPokemon('Meganium', 30994948, 100),
    ],
    BadgeEnums.Elite_ColosseumLovrina,
    65000,
    'I was so impressed by your toughness! Because you are so tough, I\'ll let you be the first member in my fan club! Doesn\'t that so make your day?',
    [new QuestLineCompletedRequirement('Gale of Darkness')],
    undefined, undefined, { displayName: 'Challenge Lovrina' }
);
GymList['Cipher Admin Snattle'] = new Gym (
    'Cipher Admin Snattle',
    'Cipher Admin Snattle',
    [
        new GymPokemon('Electrode', 34094443, 100),
        new GymPokemon('Gengar', 34094443, 100),
        new GymPokemon('Muk', 34094443, 100),
        new GymPokemon('Glalie', 34094443, 100),
        new GymPokemon('Regirock', 34094443, 100),
        new GymPokemon('Regice', 34094443, 100),
    ],
    BadgeEnums.Elite_ColosseumSnattle,
    70000,
    'In the near future, when I become the Governor of Orre, I shall appoint you as my official secretary. Let that be a motivation for you to constantly better your skills!',
    [new GymBadgeRequirement(BadgeEnums.Elite_ColosseumLovrina)],
    undefined, undefined, { displayName: 'Challenge Snattle' }
);
GymList['Cipher Admin Gorigan'] = new Gym (
    'Cipher Admin Gorigan',
    'Cipher Admin Gorigan',
    [
        new GymPokemon('Salamence', 37503887, 100),
        new GymPokemon('Granbull', 37503887, 100),
        new GymPokemon('Arcanine', 37503887, 100),
        new GymPokemon('Tauros', 37503887, 100),
        new GymPokemon('Hitmontop', 37503887, 100),
        new GymPokemon('Gyarados', 37503887, 100),
    ],
    BadgeEnums.Elite_ColosseumGorigan,
    85000,
    'You\'re some kind of special! You\'re worthy of sharing my camaraderie as a friend.',
    [new GymBadgeRequirement(BadgeEnums.Elite_ColosseumSnattle)],
    undefined, undefined, { displayName: 'Challenge Gorigan' }
);
GymList['Cipher Admin Ardos'] = new Gym (
    'Cipher Admin Ardos',
    'Cipher Admin Ardos',
    [
        new GymPokemon('Sceptile', 41254276, 100),
        new GymPokemon('Charizard', 41254276, 100),
        new GymPokemon('Gengar', 41254276, 100),
        new GymPokemon('Aerodactyl', 41254276, 100),
        new GymPokemon('Tauros', 41254276, 100),
        new GymPokemon('Starmie', 41254276, 100),
    ],
    BadgeEnums.Elite_ColosseumArdos,
    100000,
    'In all of Orre, I\'ve never seen a Pokémon Trainer of your caliber. You appear to be the biggest threat to Cipher. To make sure my underlings watch you with caution, I give you the title “Cipher\'s Biggest Enemy.”',
    [new GymBadgeRequirement(BadgeEnums.Elite_ColosseumGorigan)],
    undefined, undefined, { displayName: 'Challenge Ardos' }
);
GymList['Cipher Admin Eldes'] = new Gym (
    'Cipher Admin Eldes',
    'Cipher Admin Eldes',
    [
        new GymPokemon('Latios', 45379704, 100),
        new GymPokemon('Latias', 45379704, 100),
        new GymPokemon('Gengar', 45379704, 100),
        new GymPokemon('Metagross', 45379704, 100),
        new GymPokemon('Snorlax', 45379704, 100),
        new GymPokemon('Tauros', 45379704, 100),
    ],
    BadgeEnums.Elite_ColosseumEldes,
    128000,
    'I\'m satisfied that I was able to battle to my heart\'s content. I would like to confer on you the title “Eldes\'s Top Rival.”',
    [new GymBadgeRequirement(BadgeEnums.Elite_ColosseumArdos)],
    undefined, undefined, { displayName: 'Challenge Eldes' }
);
//Sinnoh Gyms
GymList['Oreburgh City'] = new Gym(
    'Roark',
    'Oreburgh City',
    [
        new GymPokemon('Geodude', 1338000, 12),
        new GymPokemon('Onix', 1342000, 12),
        new GymPokemon('Cranidos', 1342000, 14),
    ],
    BadgeEnums.Coal,
    250,
    'This is embarrassing... I went and lost to a Trainer who didn\'t have a single Gym Badge... But that\'s tough. You were strong, and I was weak. That\'s all there is. According to Pokémon League rules, I have to give you our Gym Badge since you\'ve beaten me, the Leader. Heres your official Pokémon League Coal Badge.',
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    () => {
        App.game.quests.getQuestLine('A New World').beginQuest(0, undefined, true);
    }
);
GymList['Eterna City'] = new Gym(
    'Gardenia',
    'Eterna City',
    [
        new GymPokemon('Turtwig', 1433000, 20),
        new GymPokemon('Cherrim (Overcast)', 1437500, 20),
        new GymPokemon('Roserade', 1439000, 22),
    ],
    BadgeEnums.Forest,
    400,
    'I might\'ve said it before, but you\'re really tough! Wasn\'t it hard for you to raise your Pokémon to be so good? I guess that\'s a measure of how much you love your Pokémon. In recognition of that, I proudly grant you this!"',
    [new GymBadgeRequirement(BadgeEnums.Coal)]
);
GymList['Hearthome City'] = new Gym(
    'Fantina',
    'Hearthome City',
    [
        new GymPokemon('Duskull', 1450000, 24),
        new GymPokemon('Haunter', 1480000, 24),
        new GymPokemon('Mismagius', 1480000, 26),
    ],
    BadgeEnums.Relic,
    740,
    'I am dumbfounded! So very, very strong! You, your Pokémon, so strong! Your power is admirable! I shall honor it with this Gym Badge!"',
    [new GymBadgeRequirement(BadgeEnums.Forest)]
);
GymList['Veilstone City'] = new Gym(
    'Maylene',
    'Veilstone City',
    [
        new GymPokemon('Meditite', 1537000, 28),
        new GymPokemon('Machoke', 1538000, 29),
        new GymPokemon('Lucario', 1540000, 32),
    ],
    BadgeEnums.Cobble,
    1200,
    '...OK. You win. That was a tough loss. I learned a lot from it. Please, accept this Gym Badge.',
    [new GymBadgeRequirement(BadgeEnums.Relic)]
);
GymList['Pastoria City'] = new Gym(
    'Crasher Wake',
    'Pastoria City',
    [
        new GymPokemon('Gyarados', 1687000, 33),
        new GymPokemon('Quagsire', 1693000, 34),
        new GymPokemon('Floatzel', 1693000, 37),
    ],
    BadgeEnums.Fen,
    2500,
    'It seems the undertow pulled me under... But I had a great time battling with you! You\'ve earned this!',
    [new TemporaryBattleRequirement('Barry 4')]
);
GymList['Canalave City'] = new Gym(
    'Byron',
    'Canalave City',
    [
        new GymPokemon('Magneton', 1767000, 37),
        new GymPokemon('Steelix', 1772000, 38),
        new GymPokemon('Bastiodon', 1768000, 41),
    ],
    BadgeEnums.Mine,
    4800,
    'You were strong enough to take down my prized team of Pokémon. In recognition of that power, I give you this: the Mine Badge!',
    [new TemporaryBattleRequirement('Barry 5')]
);
GymList['Snowpoint City'] = new Gym(
    'Candice',
    'Snowpoint City',
    [
        new GymPokemon('Sneasel', 1872500, 40),
        new GymPokemon('Piloswine', 1876000, 40),
        new GymPokemon('Abomasnow', 1870000, 42),
        new GymPokemon('Froslass', 1870000, 44),
    ],
    BadgeEnums.Icicle,
    8000,
    'Wow! You\'re great! You\'ve earned my respect! I think your focus and will bowled us over totally. Oh, that\'s right! I\'m supposed to give you this!',
    [new GymBadgeRequirement(BadgeEnums.Mine)]
);
GymList['Sunyshore City'] = new Gym(
    'Volkner',
    'Sunyshore City',
    [
        new GymPokemon('Jolteon', 1965000, 46),
        new GymPokemon('Raichu', 1965000, 46),
        new GymPokemon('Luxray', 1978000, 48),
        new GymPokemon('Electivire', 1980000, 50),
    ],
    BadgeEnums.Beacon,
    12000,
    '...Hehehe. Hahahah! ...That was the most fun I\'ve had in a battle since...I don\'t know when! It\'s also made me excited to know you and your team will keep battling to greater heights! This is your eighth Gym Badge. You\'ve earned this!',
    [new GymBadgeRequirement(BadgeEnums.Icicle)]
);

//Sinnoh Elite 4
GymList['Elite Aaron'] = new Gym(
    'Aaron',
    'Elite Aaron',
    [
        new GymPokemon('Yanmega', 2545330, 49),
        new GymPokemon('Scizor', 2548300, 49),
        new GymPokemon('Vespiquen', 2552000, 50),
        new GymPokemon('Heracross', 2557000, 51),
        new GymPokemon('Drapion', 2560250, 53),
    ],
    BadgeEnums.Elite_Aaron,
    18000,
    'I lost with the most beautiful and toughest of the bug Pokémon... We lost because I wasn\'t good enough... That\'s it! Back to training camp! Let\'s hear it for me! No... That was wrong... Anyway... Go on to the next room! Three Trainers are waiting for you. They are all tougher than me.',
    [new TemporaryBattleRequirement('Barry 6')]
);
GymList['Elite Bertha'] = new Gym(
    'Bertha',
    'Elite Bertha',
    [
        new GymPokemon('Whiscash', 2645330, 50),
        new GymPokemon('Gliscor', 2648300, 53),
        new GymPokemon('Hippowdon', 2652000, 52),
        new GymPokemon('Golem', 2657000, 52),
        new GymPokemon('Rhyperior', 2660250, 55),
    ],
    BadgeEnums.Elite_Bertha,
    18000,
    'You\'re quite something, youngster. I like how you and your Pokémon earned the win by working as one. That\'s what makes you so strong. Ahahaha! I think that you can go as far as you want.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Aaron)]
);
GymList['Elite Flint'] = new Gym(
    'Flint',
    'Elite Flint',
    [
        new GymPokemon('Houndoom', 2845330, 52),
        new GymPokemon('Flareon', 2848300, 55),
        new GymPokemon('Rapidash', 2852000, 53),
        new GymPokemon('Infernape', 2857000, 55),
        new GymPokemon('Magmortar', 2860250, 57),
    ],
    BadgeEnums.Elite_Flint,
    18000,
    '.........Keep going...I know your spirit burns hot. Your whole team does.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bertha)]
);
GymList['Elite Lucian'] = new Gym(
    'Lucian',
    'Elite Lucian',
    [
        new GymPokemon('Mr. Mime', 3048300, 53),
        new GymPokemon('Espeon', 3052000, 55),
        new GymPokemon('Bronzong', 3057000, 54),
        new GymPokemon('Alakazam', 3060250, 56),
        new GymPokemon('Gallade', 3066000, 59),
    ],
    BadgeEnums.Elite_Lucian,
    18000,
    'Congratulations. You have beaten the Elite Four. However, that doesn\'t mean you\'re done with the Pokémon league. There remains the Champion. I should warn you—the Champion is far stronger than the Elite Four. Now, go on. Step through the doorway to your final battle.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Flint)]
);

// Sinnoh Champion
GymList['Champion Cynthia'] = new Gym(
    'Cynthia',
    'Champion Cynthia',
    [
        new GymPokemon('Spiritomb', 3458300, 58),
        new GymPokemon('Roserade', 3462000, 58),
        new GymPokemon('Togekiss', 3464000, 60),
        new GymPokemon('Lucario', 3460250, 60),
        new GymPokemon('Milotic', 3470000, 58),
        new GymPokemon('Garchomp', 3570000, 62),
    ],
    BadgeEnums.Elite_SinnohChampion,
    32000,
    'That was excellent. Truly, an outstanding battle. You gave the support your Pokémon needed to maximize their power. And you guided them with certainty to secure victory. You have both passion and calculating coolness. Together, you and your Pokémon can overcome any challenge that may come your way. Those are the impressions I got from our battle. I\'m glad I got to take part in the crowning of Sinnoh\'s new Champion!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lucian)],
    () => {},
    { champion: true }
);

//Unova Gyms
GymList['Aspertia City'] = new Gym(
    'Cheren',
    'Aspertia City',
    [
        new GymPokemon('Patrat', 3458300, 58),
        new GymPokemon('Pidove', 3462000, 58),
        new GymPokemon('Lillipup', 3464000, 58),
    ],
    BadgeEnums.Basic,
    500,
    'That battle has made me feel really glad you were my first challenger as a Gym Leader… I give you this in honor of the strength you and your Pokémon showed!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Floccesy Ranch'))]
);
GymList['Virbank City'] = new Gym(
    'Roxie',
    'Virbank City',
    [
        new GymPokemon('Koffing', 3658300, 58),
        new GymPokemon('Grimer', 3662000, 58),
        new GymPokemon('Whirlipede', 3664000, 58),
    ],
    BadgeEnums.Toxic,
    800,
    'Sigh! What are you doing losing, Roxie?! Well…I guess that means you\'re strong! This stinks, but I gave it everything I had, and I feel revitalized and refreshed now! Here! Proof that you beat me!',
    [new GymBadgeRequirement(BadgeEnums.Basic)],
    () => {
        App.game.quests.getQuestLine('Hollow Truth and Ideals').beginQuest(0, undefined, true);
    }
);
GymList['Castelia City'] = new Gym(
    'Burgh',
    'Castelia City',
    [
        new GymPokemon('Dwebble', 3858300, 58),
        new GymPokemon('Shelmet', 3862000, 58),
        new GymPokemon('Karrablast', 3964000, 58),
        new GymPokemon('Leavanny', 4064000, 58),
    ],
    BadgeEnums.Insect,
    1500,
    'Oh hoo… You are very strong indeed! I guess it\'s no surprise I lost. Here! Take this Insect Badge! I think it\'ll suit you!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Castelia Sewers'))]
);
GymList['Nimbasa City'] = new Gym(
    'Elesa',
    'Nimbasa City',
    [
        new GymPokemon('Emolga', 4258300, 58),
        new GymPokemon('Flaaffy', 4262000, 58),
        new GymPokemon('Joltik', 4464000, 58),
        new GymPokemon('Zebstrika', 4464000, 58),
    ],
    BadgeEnums.Bolt,
    2600,
    'Well… Now you… you\'re an even more wonderful Trainer than I expected. Your sweet fighting style swept me off my feet! Take this!',
    [new GymBadgeRequirement(BadgeEnums.Insect)]
);
GymList['Driftveil City'] = new Gym(
    'Clay',
    'Driftveil City',
    [
        new GymPokemon('Krokorok', 4658300, 58),
        new GymPokemon('Sandslash', 4662000, 58),
        new GymPokemon('Onix', 4864000, 58),
        new GymPokemon('Excadrill', 5064000, 58),
    ],
    BadgeEnums.Quake,
    4800,
    'Phew… You\'re really somethin\'! Li\'l whippersnapper Trainers who pack a real punch keep showin\' up one after another. Mrmph. Here! Take this!',
    [new GymBadgeRequirement(BadgeEnums.Bolt)]
);
GymList['Mistralton City'] = new Gym(
    'Skyla',
    'Mistralton City',
    [
        new GymPokemon('Swoobat', 5458300, 58),
        new GymPokemon('Skarmory', 6062000, 58),
        new GymPokemon('Sigilyph', 5664000, 58),
        new GymPokemon('Swanna', 5864000, 58),
    ],
    BadgeEnums.Jet,
    7600,
    'You\'re an amazing Pokémon Trainer. My Pokémon and I are happy because for the first time in quite a while--about two years, I\'d say--we could fight with our full strength. This is an official League Gym Badge. But this is just a stepping-stone.',
    [new GymBadgeRequirement(BadgeEnums.Quake)]
);
GymList['Opelucid City'] = new Gym(
    'Drayden',
    'Opelucid City',
    [
        new GymPokemon('Druddigon', 6558300, 58),
        new GymPokemon('Flygon', 6662000, 58),
        new GymPokemon('Altaria', 6464000, 58),
        new GymPokemon('Haxorus', 6964000, 58),
    ],
    BadgeEnums.Legend,
    14000,
    'Wonderful. I\'m grateful that we had a chance to meet and battle. It reminded me that Pokémon battles are about working with others to meet our challenges together.',
    [new GymBadgeRequirement(BadgeEnums.Jet)]
);
GymList['Humilau City'] = new Gym(
    'Marlon',
    'Humilau City',
    [
        new GymPokemon('Wailord', 7458300, 58),
        new GymPokemon('Mantine', 7262000, 58),
        new GymPokemon('Carracosta', 7064000, 58),
        new GymPokemon('Jellicent', 7464000, 58),
    ],
    BadgeEnums.Wave,
    27000,
    'You don\'t just look strong, you\'re strong fo\' reals! Eh, I was swept away, too! Oh yeah, yo. I was so surprised that I forgot! I gotta give this to you!',
    [new GymBadgeRequirement(BadgeEnums.Legend)]
);

//Unova Elite 4
GymList['Elite Shauntal'] = new Gym(
    'Shauntal',
    'Elite Shauntal',
    [
        new GymPokemon('Cofagrigus', 10957000, 60),
        new GymPokemon('Drifblim', 10957000, 60),
        new GymPokemon('Golurk', 10957000, 60),
        new GymPokemon('Banette', 10957000, 60),
        new GymPokemon('Chandelure', 11960250, 62),
    ],
    BadgeEnums.Elite_Shauntal,
    32000,
    'My Pokémon and the challenger\'s Pokémon. Everyone battled even though they were hurt... Thank you.',
    [new GymBadgeRequirement(BadgeEnums.Wave)]
);
GymList['Elite Marshal'] = new Gym(
    'Marshal',
    'Elite Marshal',
    [
        new GymPokemon('Throh', 10957000, 60),
        new GymPokemon('Sawk', 10957000, 60),
        new GymPokemon('Mienshao', 10957000, 60),
        new GymPokemon('Lucario', 10957000, 60),
        new GymPokemon('Conkeldurr', 11960250, 62),
    ],
    BadgeEnums.Elite_Marshal,
    32000,
    'Whew! Well done! As your battles continue, aim for even greater heights!',
    [new GymBadgeRequirement(BadgeEnums.Wave)]
);
GymList['Elite Grimsley'] = new Gym(
    'Grimsley',
    'Elite Grimsley',
    [
        new GymPokemon('Liepard', 10945330, 60),
        new GymPokemon('Scrafty', 10948300, 60),
        new GymPokemon('Krookodile', 10952000, 60),
        new GymPokemon('Absol', 10957000, 60),
        new GymPokemon('Bisharp', 11960250, 62),
    ],
    BadgeEnums.Elite_Grimsley,
    32000,
    'Whether or not you get to fight at full strength, whether or not luck smiles on you--none of that matters. Only results matter. And a loss is a loss. See, victory shines like a bright light. And right now, you and your Pokémon are shining brilliantly.',
    [new GymBadgeRequirement(BadgeEnums.Wave)]
);
GymList['Elite Caitlin'] = new Gym(
    'Caitlin',
    'Elite Caitlin',
    [
        new GymPokemon('Musharna', 10957000, 60),
        new GymPokemon('Sigilyph', 10957000, 60),
        new GymPokemon('Reuniclus', 10957000, 60),
        new GymPokemon('Gothitelle', 10957000, 60),
        new GymPokemon('Metagross', 11960250, 62),
    ],
    BadgeEnums.Elite_Caitlin,
    32000,
    'You and your Pokémon are both excellent and elegant. To have been able to battle against such a splendid team... My Pokémon and I learned a lot! I offer you my thanks.',
    [new GymBadgeRequirement(BadgeEnums.Wave)]
);

// Unova Champion
GymList['Champion Iris'] = new Gym(
    'Iris',
    'Champion Iris',
    [
        new GymPokemon('Hydreigon', 12458300, 61),
        new GymPokemon('Druddigon', 12462000, 61),
        new GymPokemon('Archeops', 12464000, 61),
        new GymPokemon('Aggron', 12460250, 61),
        new GymPokemon('Lapras', 12470000, 61),
        new GymPokemon('Haxorus', 14570000, 63),
    ],
    BadgeEnums.Elite_UnovaChampion,
    64000,
    'I\'m upset I couldn\'t win! But you know what? More than that, I\'m happy! I mean, come on. By having a serious battle, you and your Pokémon, and me and my Pokémon, we all got to know one another better than before! Yep, we sure did! OK, let\'s go!',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_Shauntal),
        new GymBadgeRequirement(BadgeEnums.Elite_Marshal),
        new GymBadgeRequirement(BadgeEnums.Elite_Grimsley),
        new GymBadgeRequirement(BadgeEnums.Elite_Caitlin),
    ],
    () => {},
    { champion: true }
);

//Kalos Gyms
GymList['Santalune City'] = new Gym(
    'Viola',
    'Santalune City',
    [
        new GymPokemon('Surskit', 13737400, 10),
        new GymPokemon('Vivillon (Meadow)', 17395730, 12),
    ],
    BadgeEnums.Bug,
    800,
    'Young Trainer, you... No, it wasn\'t you alone. You and your Pokémon have shown me a whole new depth of field! Fantastic! Just fantastic!',
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)]
);
GymList['Cyllage City'] = new Gym(
    'Grant',
    'Cyllage City',
    [
        new GymPokemon('Amaura', 16937530, 25),
        new GymPokemon('Tyrunt', 19837400, 25),
    ],
    BadgeEnums.Cliff,
    1700,
    'There are some things that seem out of reach no matter how hard you try. However, it\'s important that you never give up--no matter the opponent or the odds. I could tell from our battle that you and your Pokémon understand that. To commemorate such an impressive show of teamwork, please accept the Cliff Badge!',
    [new GymBadgeRequirement(BadgeEnums.Bug)]
);
GymList['Shalour City'] = new Gym(
    'Korrina',
    'Shalour City',
    [
        new GymPokemon('Mienfoo', 21558300, 29),
        new GymPokemon('Machoke', 22062000, 28),
        new GymPokemon('Hawlucha', 22362000, 32),
    ],
    BadgeEnums.Rumble,
    3800,
    'Oh! I have been defeated! Alack, alay! Lady Korrina gave a terrible display! This is it. I must give up my title and admit that your strength far exceeds-- Just teasing! But here\'s your Badge. Boy, you\'ll be rolling in \'em soon!',
    [new TemporaryBattleRequirement('Calem 1')]
);
GymList['Coumarine City'] = new Gym(
    'Ramos',
    'Coumarine City',
    [
        new GymPokemon('Jumpluff', 25508300, 30),
        new GymPokemon('Weepinbell', 27562000, 31),
        new GymPokemon('Gogoat', 29502000, 34),
    ],
    BadgeEnums.Plant,
    5500,
    'Yeh believe in yer Pokémon... And they believe in yeh, too... Mighty oaks from acorns grow. Go on, then. Yeh\'ve earned it. Here\'s yer own Plant Badge, sprout.',
    [new TemporaryBattleRequirement('Calem 2')]
);
GymList['Lumiose City'] = new Gym(
    'Clemont',
    'Lumiose City',
    [
        new GymPokemon('Emolga', 30058300, 35),
        new GymPokemon('Magneton', 31062000, 35),
        new GymPokemon('Heliolisk', 32062000, 37),
    ],
    BadgeEnums.Voltage,
    9000,
    'Oh, Bonnie... When will you learn there\'s no shame in losing? I\'m glad whenever I get to learn something new thanks to strong challengers like you here.',
    [new QuestLineStepCompletedRequirement('A Beautiful World', 11)]
);
GymList['Laverre City'] = new Gym(
    'Valerie',
    'Laverre City',
    [
        new GymPokemon('Mawile', 33058300, 38),
        new GymPokemon('Mr. Mime', 36462000, 38),
        new GymPokemon('Sylveon', 38062000, 42),
    ],
    BadgeEnums.Fairy,
    16000,
    'Yes... That was a fine battle. I shall reward you for this great victory. This is the Fairy Badge. It is yours now. Its beauty is captivating, is it not? ... ... ... ... ... ... Ah... Do forgive me. I was so captivated, I forgot for a moment that it is yours.',
    [new GymBadgeRequirement(BadgeEnums.Voltage)]
);
GymList['Anistar City'] = new Gym(
    'Olympia',
    'Anistar City',
    [
        new GymPokemon('Sigilyph', 40058300, 44),
        new GymPokemon('Slowking', 42062000, 45),
        new GymPokemon('Meowstic', 44462000, 48),
    ],
    BadgeEnums.Psychic,
    30000,
    'Now, the Psychic Badge. A testament to your skill. Proof of your power.',
    [new TemporaryBattleRequirement('Calem 4')]
);
GymList['Snowbelle City'] = new Gym(
    'Wulfric',
    'Snowbelle City',
    [
        new GymPokemon('Abomasnow', 46558300, 56),
        new GymPokemon('Cryogonal', 47654830, 55),
        new GymPokemon('Avalugg', 50062000, 59),
    ],
    BadgeEnums.Iceberg,
    52000,
    'Impressive! Your Pokémon fought with great courage. I can tell that you\'ve trained your Pokémon well.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Village'))]
);
//Kalos Elite 4
GymList['Elite Malva'] = new Gym(
    'Malva',
    'Elite Malva',
    [
        new GymPokemon('Pyroar', 46492423, 63),
        new GymPokemon('Torkoal', 46791055, 63),
        new GymPokemon('Chandelure', 46794200, 63),
        new GymPokemon('Talonflame', 47223450, 65),
    ],
    BadgeEnums.Elite_Malva,
    64000,
    'What news... So a new challenger has defeated Malva of the Elite Four!',
    [new GymBadgeRequirement(BadgeEnums.Iceberg)]
);
GymList['Elite Siebold'] = new Gym(
    'Siebold',
    'Elite Siebold',
    [
        new GymPokemon('Clawitzer', 46492423, 63),
        new GymPokemon('Gyarados', 47094530, 63),
        new GymPokemon('Starmie', 47094530, 63),
        new GymPokemon('Barbaracle', 47223450, 65),
    ],
    BadgeEnums.Elite_Siebold,
    64000,
    'I shall store my memory of you and your Pokémon forever away within my heart.',
    [new GymBadgeRequirement(BadgeEnums.Iceberg)]
);
GymList['Elite Wikstrom'] = new Gym(
    'Wikstrom',
    'Elite Wikstrom',
    [
        new GymPokemon('Klefki', 46492423, 63),
        new GymPokemon('Probopass', 47094530, 63),
        new GymPokemon('Scizor', 47094530, 63),
        new GymPokemon('Aegislash (Shield)', 47223450, 65),
    ],
    BadgeEnums.Elite_Wikstrom,
    64000,
    'Glorious! The trust that you share with your honorable Pokémon surpasses even mine!',
    [new GymBadgeRequirement(BadgeEnums.Iceberg)]
);
GymList['Elite Drasna'] = new Gym(
    'Drasna',
    'Elite Drasna',
    [
        new GymPokemon('Dragalge', 46492423, 63),
        new GymPokemon('Druddigon', 47094530, 63),
        new GymPokemon('Altaria', 47094530, 63),
        new GymPokemon('Noivern', 47223450, 65),
    ],
    BadgeEnums.Elite_Drasna,
    64000,
    'Oh, dear me. That sure was a quick battle... I do hope you\'ll come back again sometime!',
    [new GymBadgeRequirement(BadgeEnums.Iceberg)]
);

// Kalos Champion
GymList['Champion Diantha'] = new Gym(
    'Diantha',
    'Champion Diantha',
    [
        new GymPokemon('Hawlucha', 40365050, 64),
        new GymPokemon('Tyrantrum', 41691225, 65),
        new GymPokemon('Aurorus', 41691225, 65),
        new GymPokemon('Gourgeist (Average)', 41767141, 65),
        new GymPokemon('Goodra', 42027136, 66),
        new GymPokemon('Mega Gardevoir', 42371780, 68),
    ],
    BadgeEnums.Elite_KalosChampion,
    128000,
    'Witnessing the noble spirits of you and your Pokémon in battle has really touched my heart...',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_Malva),
        new GymBadgeRequirement(BadgeEnums.Elite_Siebold),
        new GymBadgeRequirement(BadgeEnums.Elite_Wikstrom),
        new GymBadgeRequirement(BadgeEnums.Elite_Drasna),
    ],
    () => {},
    { champion: true }
);

//Alola Gyms
GymList['Iki Town'] = new Gym(
    'Hala',
    'Iki Town',
    [
        new GymPokemon('Machop', 62058739, 15),
        new GymPokemon('Makuhita', 62058739, 15),
        new GymPokemon('Crabrawler', 63069612, 16),
    ],
    BadgeEnums.Melemele_Stamp,
    16000,
    'The results come as no surprise to me. What a fine Trainer...and what fine Pokémon, too! Accept this Z-Crystal! It allows Trainers to share their power with their partner Pokémon!</br><img width="100" src="assets/images/items/zCrystal/Fightinium Z.svg"/></br>With this victory... you have cleared all of the trials of Melemele Island, the first of Alola\'s islands! The Melemele stamp is proof of your accomplishments.',
    [new MultiRequirement([new QuestLineStepCompletedRequirement('Welcome to Paradise, Cousin!', 10), new TemporaryBattleRequirement('Hau 3')])],
    undefined, undefined, { displayName: 'Hala\'s Grand Trial' }
);
GymList['Konikoni City'] = new Gym(
    'Olivia',
    'Konikoni City',
    [
        new GymPokemon('Anorith', 81530244, 27),
        new GymPokemon('Lileep', 81530244, 27),
        new GymPokemon('Lycanroc (Midnight)', 83170680, 28),
    ],
    BadgeEnums.Akala_Stamp,
    30000,
    'How lovely. Diamonds only sparkle after coal is pushed to its absolute limit. Here. The Rock-type Z-Crystal... The Rockium Z is all yours!</br><img width="100" src="assets/images/items/zCrystal/Rockium Z.svg"/></br>I think your journey will hold many surprises. And I hope it holds many joys.',
    [new QuestLineStepCompletedRequirement('Symbiotic Relations', 8)],
    undefined, undefined, { displayName: 'Olivia\'s Grand Trial' }
);
GymList['Malie City'] = new Gym(
    'Nanu',
    'Malie City',
    [
        new GymPokemon('Sableye', 101710296, 43),
        new GymPokemon('Krokorok', 101710296, 43),
        new GymPokemon('Alolan Persian', 103271750, 44),
    ],
    BadgeEnums.Ula_Ula_Stamp,
    52000,
    'Hmph... heh. Let me fix your team up for you. Here. This is yours.</br><img width="100" src="assets/images/items/zCrystal/Darkinium Z.svg"/></br>There. Congratulations or whatever. You\'ve officially finished your Ula\'ula trials. You\'ve got somewhere else to be, don\'t you? Try not to destroy the whole place.',
    [new TemporaryBattleRequirement('Gladion 2')],
    undefined, undefined, { displayName: 'Nanu\'s Grand Trial' }
);
GymList['Exeggutor Island'] = new Gym(
    'Hapu',
    'Exeggutor Island',
    [
        new GymPokemon('Alolan Dugtrio', 85759429, 47, new QuestLineStepCompletedRequirement('Emissary of Light', 4, GameConstants.AchievementOption.less)),
        new GymPokemon('Gastrodon (East)', 85759429, 47, new QuestLineStepCompletedRequirement('Emissary of Light', 4, GameConstants.AchievementOption.less)),
        new GymPokemon('Flygon', 85759429, 47, new QuestLineStepCompletedRequirement('Emissary of Light', 4, GameConstants.AchievementOption.less)),
        new GymPokemon('Mudsdale', 86977838, 48, new QuestLineStepCompletedRequirement('Emissary of Light', 4, GameConstants.AchievementOption.less)),
        new GymPokemon('Golurk', 91233435, 53, new QuestLineStepCompletedRequirement('Emissary of Light', 4)),
        new GymPokemon('Gastrodon (East)', 91233435, 53, new QuestLineStepCompletedRequirement('Emissary of Light', 4)),
        new GymPokemon('Flygon', 91233435, 53, new QuestLineStepCompletedRequirement('Emissary of Light', 4)),
        new GymPokemon('Mudsdale', 92529615, 54, new QuestLineStepCompletedRequirement('Emissary of Light', 4)),
    ],
    BadgeEnums.Poni_Stamp,
    64000,
    'You have succeeded in your final grand trial! That was enjoyable. Looks like I cannot beat you even when I am not holding back... Take your Ground-type Z-Crystal then... This Groundium Z is yours!</br><img width="100" src="assets/images/items/zCrystal/Groundium Z.svg"/></br>Then go on with you two! Head straight through here and find the altar!',
    [new QuestLineCompletedRequirement('Emissary of Light')],
    undefined, undefined, { displayName: 'Hapu\'s Grand Trial' }
);

//Alola Elite 4
// modified from base HP, keep them roughly the same difficulty
// regular mons base HP: 91879987
// ace pokemon base HP: 92856372
GymList['Elite Molayne'] = new Gym(
    'Molayne',
    'Elite Molayne',
    [
        new GymPokemon('Klefki', 78883047, 56),
        new GymPokemon('Bisharp', 84369882, 56),
        new GymPokemon('Magnezone', 82982134, 56),
        new GymPokemon('Metagross', 84733765, 56),
        new GymPokemon('Alolan Dugtrio', 95774052, 57),
    ],
    BadgeEnums.Elite_Molayne,
    100000,
    'That Kukui... He certainly found an interesting Trainer for me to face!',
    [new GymBadgeRequirement(BadgeEnums.Poni_Stamp)]
);
GymList['Elite Olivia'] = new Gym(
    'Olivia',
    'Elite Olivia',
    [
        new GymPokemon('Armaldo', 81025320, 56),
        new GymPokemon('Cradily', 74381821, 56),
        new GymPokemon('Gigalith', 140708180, 56),
        new GymPokemon('Probopass', 85174188, 56),
        new GymPokemon('Lycanroc (Midnight)', 150439372, 57),
    ],
    BadgeEnums.Elite_Olivia,
    100000,
    'I don\'t see the same look in your eyes that I saw when we first met on Akala Island. Have you had some experiences that you\'ll carry with you in your heart forever? Well, it\'s time for you to move on.',
    [new GymBadgeRequirement(BadgeEnums.Poni_Stamp)]
);
GymList['Elite Acerola'] = new Gym(
    'Acerola',
    'Elite Acerola',
    [
        new GymPokemon('Banette', 94589428, 56),
        new GymPokemon('Drifblim', 87179189, 56),
        new GymPokemon('Dhelmise', 91179189, 56),
        new GymPokemon('Froslass', 91691988, 56),
        new GymPokemon('Palossand', 103277813, 57),
    ],
    BadgeEnums.Elite_Acerola,
    100000,
    'I\'m...I\'m speechless! You\'ve done me in!',
    [new GymBadgeRequirement(BadgeEnums.Poni_Stamp)]
);
GymList['Elite Kahili'] = new Gym(
    'Kahili',
    'Elite Kahili',
    [
        new GymPokemon('Braviary', 86420587, 56),
        new GymPokemon('Hawlucha', 109446185, 56),
        new GymPokemon('Oricorio (Baile)', 103127826, 56),
        new GymPokemon('Mandibuzz', 89123587, 56),
        new GymPokemon('Toucannon', 91392090, 57),
    ],
    BadgeEnums.Elite_Kahili,
    100000,
    'It\'s frustrating to me as a member of the Elite Four, but it seems your strength is the real deal.',
    [new GymBadgeRequirement(BadgeEnums.Poni_Stamp)]
);

// Alola Champion
GymList['Champion Hau'] = new Gym(
    'Hau',
    'Champion Hau',
    [
        new GymPokemon('Alolan Raichu', 91545555, 59),
        new GymPokemon('Tauros', 89636471, 58),
        new GymPokemon('Noivern', 89636471, 58),
        new GymPokemon('Crabominable', 91545555, 59),
        new GymPokemon('Flareon', 89636471, 58, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Primarina', 96725389, 60, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Grass)),
        new GymPokemon('Vaporeon', 89636471, 58, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Decidueye', 96725389, 60, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Fire)),
        new GymPokemon('Leafeon', 89636471, 58, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
        new GymPokemon('Incineroar', 96725389, 60, new StarterRequirement(GameConstants.Region.alola, GameConstants.Starter.Water)),
    ],
    BadgeEnums.Champion_Stamp,
    150000,
    'We\'re gonna keep moving forward, by staying at full power all the time!',
    [
        new GymBadgeRequirement(BadgeEnums.Elite_Molayne),
        new GymBadgeRequirement(BadgeEnums.Elite_Olivia),
        new GymBadgeRequirement(BadgeEnums.Elite_Acerola),
        new GymBadgeRequirement(BadgeEnums.Elite_Kahili),
    ],
    () => {},
    { champion: true }
);

// Magikarp Jump Gyms
GymList['Friend League'] = new Gym(
    'Karson', // red cap
    'Friend League',
    [new GymPokemon('Magikarp', 337500, 20)],
    BadgeEnums.Friend_League,
    10000,
    'Your Karp is really Magic!',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 31)],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    { imageName: 'Jump Champ Red' }
);

GymList['Quick League'] = new Gym(
    'Koichiro', // blue cap
    'Quick League',
    [new GymPokemon('Magikarp Skelly', 675000, 20)],
    BadgeEnums.Quick_League,
    10500,
    'Looks like I flailed...',
    [new TemporaryBattleRequirement('Magikarp Jump Koylee')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    { imageName: 'Jump Champ Blue' }
);

GymList['Heavy League'] = new Gym(
    'Kareign', // green cap
    'Heavy League',
    [new GymPokemon('Magikarp Orange Two-Tone', 1687500, 20)],
    BadgeEnums.Heavy_League,
    11000,
    'Karpe Diem',
    [new TemporaryBattleRequirement('Magikarp Jump Karpen')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    {
        displayName: 'Kareign\'s Heavy League Gym',
        imageName: 'Jump Champ Green',
    }
);

GymList['Great League'] = new Gym(
    'Karbuck', // blue cap
    'Great League',
    [new GymPokemon('Magikarp', 2700000, 20)],
    BadgeEnums.Great_League,
    11500,
    'Guess ya got me. Hook, line and sinker!',
    [new TemporaryBattleRequirement('Magikarp Jump Karpress')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    { imageName: 'Jump Champ Blue' }
);

GymList['Fast League'] = new Gym(
    'Kareign 2', // green cap
    'Fast League',
    [new GymPokemon('Magikarp Pink Dapples', 5062500, 20)],
    BadgeEnums.Fast_League,
    12000,
    'This life is not for me... I will become a Karpenter now...',
    [new TemporaryBattleRequirement('Magikarp Jump Karson')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    {
        displayName: 'Kareign\'s Fast League Gym',
        imageName: 'Jump Champ Green',
    }
);

GymList['Luxury League'] = new Gym(
    'Jump Champ', // red cap
    'Luxury League',
    [new GymPokemon('Magikarp Pink Orca', 6750000, 20)],
    BadgeEnums.Luxury_League,
    12500,
    'Just wait \'til my Magikarp evolves and you will all see how great I am! <i>Cries</i>',
    [new TemporaryBattleRequirement('Magikarp Jump Karbuck')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    {
        displayName: 'Jump Champ\'s Luxury League Gym',
        imageName: 'Jump Champ Red',
    }
);

GymList['Heal League'] = new Gym(
    'Karami', // blue cap
    'Heal League',
    [new GymPokemon('Magikarp Purple Bubbles', 10125000, 20)],
    BadgeEnums.Heal_League,
    12500,
    'I\'m getting more old than my rod...',
    [new TemporaryBattleRequirement('Magikarp Jump Karpella 2')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    { imageName: 'Jump Champ Blue' }
);

GymList['Ultra League'] = new Gym(
    'Jump Champ 2', // red cap
    'Ultra League',
    [new GymPokemon('Magikarp Brown Tiger', 13500000, 20)],
    BadgeEnums.Ultra_League,
    12500,
    'I knew I smelled something fishy...',
    [new TemporaryBattleRequirement('Magikarp Jump Koylee 2')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    {
        displayName: 'Jump Champ\'s Ultra League Gym',
        imageName: 'Jump Champ Red',
    }
);

GymList['E4 League'] = new Gym(
    'Jump Champ 3', // red cap
    'E4 League',
    [new GymPokemon('Magikarp Orange Forehead', 20250000, 20)],
    BadgeEnums.E4_League,
    12500,
    'That jump really splashed!',
    [new TemporaryBattleRequirement('Magikarp Jump Karpella 3')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    },
    undefined,
    {
        displayName: 'Jump Champ\'s Elite League Gym',
        imageName: 'Jump Champ Red',
    }
);

GymList['Master League'] = new Gym(
    'Magikarp',
    'Master League',
    [new GymPokemon('Magikarp', 27000000, 20)],
    BadgeEnums.Master_League,
    13000,
    'Mayor Karp will be proud of you!',
    [new TemporaryBattleRequirement('Magikarp Jump Tykarp 2')],
    () => {
        Notifier.notify({
            message: 'You were awarded a Magikarp Biscuit!',
            type: NotificationConstants.NotificationOption.success,
            image: ItemList.Magikarp_Biscuit.image,
        });
        player.gainItem('Magikarp_Biscuit', 1);
    }
);

//Galar Leaders
GymList.Turffield = new Gym(
    'Milo',
    'Turffield',
    [
        new GymPokemon('Gossifleur', 110892836, 19),
        new GymPokemon('Eldegoss', 123214264, 20),
    ],
    BadgeEnums.Galar_Grass,
    40000,
    'The power of Grass has wilted... What an incredible Gym Challenger!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 13)]
);
GymList.Hulbury = new Gym(
    'Nessa',
    'Hulbury',
    [
        new GymPokemon('Goldeen', 119044213, 22),
        new GymPokemon('Arrokuda', 119044213, 23),
        new GymPokemon('Gigantamax Drednaw', 122651613, 24),
    ],
    BadgeEnums.Galar_Water,
    60000,
    'I may proudly be the strongest member of this Gym, but I was totally washed away!',
    [new TemporaryBattleRequirement('Hop 4')]
);
GymList.Motostoke = new Gym(
    'Kabu',
    'Motostoke',
    [
        new GymPokemon('Ninetales', 125012841, 25),
        new GymPokemon('Arcanine', 125012841, 25),
        new GymPokemon('Gigantamax Centiskorch', 132826144, 27),
    ],
    BadgeEnums.Galar_Fire,
    60000,
    'I\'m often regarded as the first real roadblock of the Gym Challenge, and yet you defeated me! Clearly, your talent surpassed my many years of experience. I still have much to learn!',
    [new TemporaryBattleRequirement('Marnie 1')]
);
GymList['Stow-on-Side1'] = new Gym(
    'Bea',
    'Stow-on-Side1',
    [
        new GymPokemon('Hitmontop', 131352402, 34),
        new GymPokemon('Pangoro', 131352402, 34),
        new GymPokemon('Sirfetch\'d', 131352402, 35),
        new GymPokemon('Gigantamax Machamp', 142075062, 36),
    ],
    BadgeEnums.Galar_Fighting,
    80000,
    'Your strength nearly made me want to turn and run in my bare feet.',
    [new TemporaryBattleRequirement('Hop 5')],
    // Starts Galar story quest if both Stow-on-Side gyms are defeated.
    () => {
        if (App.game.badgeCase.hasBadge(BadgeEnums.Galar_Ghost)) {
            App.game.quests.getQuestLine('The Darkest Day').beginQuest(0, undefined, true);
        }
    }, undefined, { displayName: 'Bea\'s Stow-on-Side Gym' }
);
GymList['Stow-on-Side2'] = new Gym(
    'Allister',
    'Stow-on-Side2',
    [
        new GymPokemon('Galarian Yamask', 131352402, 34),
        new GymPokemon('Mimikyu', 131352402, 34),
        new GymPokemon('Cursola', 131352402, 35),
        new GymPokemon('Gigantamax Gengar', 142075062, 36),
    ],
    BadgeEnums.Galar_Ghost,
    80000,
    'Maybe my mask... kept me from seeing just how strong you really are...',
    [new TemporaryBattleRequirement('Hop 5')],
    // Starts Galar story quest if both Stow-on-Side gyms are defeated.
    () => {
        if (App.game.badgeCase.hasBadge(BadgeEnums.Galar_Fighting)) {
            App.game.quests.getQuestLine('The Darkest Day').beginQuest(0, undefined, true);
        }
    }, undefined, { displayName: 'Allister\'s Stow-on-Side Gym' }
);
GymList.Ballonlea = new Gym(
    'Opal',
    'Ballonlea',
    [
        new GymPokemon('Galarian Weezing', 135999999, 36),
        new GymPokemon('Mawile', 135999999, 36),
        new GymPokemon('Togekiss', 135999999, 37),
        new GymPokemon('Gigantamax Alcremie', 147097917, 38),
    ],
    BadgeEnums.Galar_Fairy,
    80000,
    'Your pink is still lacking, but you\'re an excellent Trainer with some excellent Pokémon.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))]
);
GymList.Circhester1 = new Gym(
    'Gordie',
    'Circhester1',
    [
        new GymPokemon('Barbaracle', 140246069, 40),
        new GymPokemon('Shuckle', 140246069, 40),
        new GymPokemon('Stonjourner', 140246069, 41),
        new GymPokemon('Gigantamax Coalossal', 151694727, 42),
    ],
    BadgeEnums.Galar_Rock,
    80000,
    'I just want to climb into a hole... Well, I guess it\'d be more like falling from here.',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 26)],
    undefined, undefined, { displayName: 'Gordie\'s Circhester Gym' }
);
GymList.Circhester2 = new Gym(
    'Melony',
    'Circhester2',
    [
        new GymPokemon('Frosmoth', 140246069, 40),
        new GymPokemon('Galarian Darmanitan', 140246069, 40),
        new GymPokemon('Eiscue (Ice Face)', 140246069, 41, new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Rain, WeatherType.Thunderstorm, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
        new GymPokemon('Eiscue (Noice Face)', 140246069, 41, new WeatherRequirement([WeatherType.Harsh_Sunlight])),
        new GymPokemon('Gigantamax Lapras', 151694727, 42),
    ],
    BadgeEnums.Galar_Ice,
    80000,
    'I think you took breaking the ice a little too literally...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 26)],
    undefined, undefined, { displayName: 'Melony\'s Circhester Gym' }
);
GymList.Spikemuth = new Gym(
    'Piers',
    'Spikemuth',
    [
        new GymPokemon('Scrafty', 145552675, 44),
        new GymPokemon('Malamar', 145552675, 45),
        new GymPokemon('Skuntank', 145552675, 45),
        new GymPokemon('Obstagoon', 157434528, 46),
    ],
    BadgeEnums.Galar_Dark,
    96000,
    'Me an\' my team gave it our best. Let\'s meet up again for a battle some time...',
    [new TemporaryBattleRequirement('Marnie 2')]
);
GymList.Hammerlocke = new Gym(
    'Raihan',
    'Hammerlocke',
    [
        new GymPokemon('Gigalith', 151276613, 46),
        new GymPokemon('Flygon', 151276613, 47),
        new GymPokemon('Sandaconda', 151276613, 46),
        new GymPokemon('Gigantamax Duraludon', 163625773, 48),
    ],
    BadgeEnums.Galar_Dragon,
    128000,
    'I might have lost, but I still look good. Maybe I should snap a quick selfie...',
    [new GymBadgeRequirement(BadgeEnums.Galar_Dark)]
);
GymList['Elite Trainer Marnie'] = new Gym(
    'Marnie',
    'Elite Trainer Marnie',
    [
        new GymPokemon('Liepard', 160047044, 47),
        new GymPokemon('Toxicroak', 160047044, 47),
        new GymPokemon('Scrafty', 160047044, 47),
        new GymPokemon('Morpeko', 165478757, 48),
        new GymPokemon('Gigantamax Grimmsnarl', 171568449, 49),
    ],
    BadgeEnums.Elite_Marnie,
    150000,
    'OK, so I lost... but I got to see a lot of the good points of you and your Pokémon!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 26)]
);
GymList['Elite Gym Leader Bede'] = new Gym(
    'Bede',
    'Elite Gym Leader Bede',
    [
        new GymPokemon('Mawile', 160047044, 51),
        new GymPokemon('Sylveon', 160047044, 51),
        new GymPokemon('Gardevoir', 160047044, 51),
        new GymPokemon('Galarian Rapidash', 165478757, 52),
        new GymPokemon('Gigantamax Hatterene', 171568449, 53),
    ],
    BadgeEnums.Elite_Bede,
    150000,
    'I couldn\'t win, but at least I was able to show everyone how great Fairy types are.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Marnie)],
    undefined,
    undefined,
    { imageName: 'Gym Leader Bede' }
);
GymList['Elite Trainer Hop'] = new Gym(
    'Hop',
    'Elite Trainer Hop',
    [
        new GymPokemon('Dubwool', 173506298, 59),
        new GymPokemon('Pincurchin', 168817428, 58),
        new GymPokemon('Snorlax', 168817428, 58),
        new GymPokemon('Corviknight', 179511126, 60),
        new GymPokemon('Gigantamax Inteleon', 189335021, 59, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Gigantamax Rillaboom', 189335021, 59, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Gigantamax Cinderace', 189335021, 59, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
    ],
    BadgeEnums.Elite_Hop,
    200000,
    'Thanks, mate. I\'m really glad you were the one here with me.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bede)]
);
// Galar Champion
GymList['Champion Leon'] = new Gym(
    'Leon',
    'Champion Leon',
    [
        new GymPokemon('Aegislash (Shield)', 177587812, 62),
        new GymPokemon('Dragapult', 177587812, 62),
        new GymPokemon('Haxorus', 177587812, 63),
        new GymPokemon('Seismitoad', 181534208, 64, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Cinderace', 187453801, 64, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Grass)),
        new GymPokemon('Mr. Rime', 181534208, 64, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Inteleon', 187453801, 64, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Fire)),
        new GymPokemon('Rhyperior', 181534208, 64, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
        new GymPokemon('Rillaboom', 187453801, 64, new StarterRequirement(GameConstants.Region.galar, GameConstants.Starter.Water)),
        new GymPokemon('Gigantamax Charizard', 197319950, 65),
    ],
    BadgeEnums.Elite_GalarChampion,
    250000,
    'My time as Champion is over... But what a champion time it\'s been! Thank you for the greatest battle I\'ve ever had!',
    [new QuestLineStepCompletedRequirement('The Darkest Day', 19)],
    () => {},
    { champion: true }
);

// Armor + Crown gyms
GymList['Elite Gym Leader Klara'] = new Gym(
    'Klara',
    'Elite Gym Leader Klara',
    [
        new GymPokemon('Galarian Slowking', 281126897, 68),
        new GymPokemon('Galarian Weezing', 281126897, 68),
        new GymPokemon('Drapion', 281126897, 68),
        new GymPokemon('Scolipede', 287045163, 69),
        new GymPokemon('Galarian Slowbro', 295923049, 70),
    ],
    BadgeEnums.Elite_ArmorPoison,
    150000,
    'Aww, come on! What a drag! But...I guess it was also kinda fun!',
    [new QuestLineCompletedRequirement('The Dojo\'s Armor')]
);
GymList['Elite Gym Leader Avery'] = new Gym(
    'Avery',
    'Elite Gym Leader Avery',
    [
        new GymPokemon('Galarian Slowbro', 281126897, 68),
        new GymPokemon('Swoobat', 281126897, 68),
        new GymPokemon('Galarian Rapidash', 281126897, 68),
        new GymPokemon('Alakazam', 287045163, 69),
        new GymPokemon('Galarian Slowking', 295923049, 70),
    ],
    BadgeEnums.Elite_ArmorPsychic,
    150000,
    'More! I require more! Show me your Stored Power!',
    [new QuestLineCompletedRequirement('The Dojo\'s Armor')]
);
GymList['Elite Dojo Matron Honey'] = new Gym(
    'Honey',
    'Elite Dojo Matron Honey',
    [
        new GymPokemon('Galarian Darmanitan', 238066328, 73),
        new GymPokemon('Gallade', 238066328, 74),
        new GymPokemon('Salazzle', 243078251, 73),
        new GymPokemon('Togekiss', 243078251, 75),
        new GymPokemon('Gigantamax Venusaur', 250596135, 75),
        new GymPokemon('Gigantamax Blastoise', 250596135, 75),
    ],
    BadgeEnums.Elite_ArmorMatron,
    250000,
    'That was a delight! Nice battling, love!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Elite_ArmorPoison),
            new GymBadgeRequirement(BadgeEnums.Elite_ArmorPsychic),
        ]),
    ]
);
GymList['Elite Dojo Master Mustard'] = new Gym(
    'Mustard',
    'Elite Dojo Master Mustard',
    [
        new GymPokemon('Mienshao', 243689942, 73),
        new GymPokemon('Luxray', 243689942, 73),
        new GymPokemon('Lycanroc (Midday)', 248820300, 75),
        new GymPokemon('Kommo-o', 248820300, 75),
        new GymPokemon('Gigantamax Urshifu (Single Strike)', 256515729, 75),
        new GymPokemon('Gigantamax Urshifu (Rapid Strike)', 256515729, 75),
    ],
    BadgeEnums.Elite_ArmorChampion,
    250000,
    'That strength of yours doesn\'t bend easily!',
    [new GymBadgeRequirement(BadgeEnums.Elite_ArmorMatron)],
    undefined,
    undefined,
    { imageName: 'Mustard Elite' }
);
GymList['Elite Trainer Peony'] = new Gym(
    'Peony',
    'Elite Trainer Peony',
    [
        new GymPokemon('Perrserker', 305387462, 74),
        new GymPokemon('Bronzong', 299090814, 73),
        new GymPokemon('Scizor', 299090814, 73),
        new GymPokemon('Aggron', 305387462, 74),
        new GymPokemon('Copperajah', 314832436, 74),
    ],
    BadgeEnums.Elite_CrownChampion,
    250000,
    'Gone and got stronger again, have you? Ah well! Hats off to you-in more ways than one!',
    [
        new MultiRequirement([
            new QuestLineCompletedRequirement('The Crown of Galar'),
            new QuestLineCompletedRequirement('The Birds of the Dyna Tree'),
            new QuestLineCompletedRequirement('The Ancient Golems'),
        ]),
    ],
    undefined,
    undefined,
    { imageName: 'Peony Elite' }
);

// Hisui Gyms

GymList['Grandtree Arena'] = new Gym(
    'Lord of the Woods: Kleavor',
    'Grandtree Arena',
    [new GymPokemon('Noble Kleavor', 76658268, 70)],
    BadgeEnums.Noble_Kleavor,
    128000,
    'You defeated Lord Kleavor once again!',
    [new DevelopmentRequirement()],
    undefined, undefined, { displayName: 'Lord Kleavor', imageName: '../pokemon/900.01' }
);
GymList['Brava Arena'] = new Gym(
    'Lady of the Ridge: Lilligant',
    'Brava Arena',
    [new GymPokemon('Noble Lilligant', 76658268, 70)],
    BadgeEnums.Noble_Lilligant,
    128000,
    'You defeated Lady Lilligant once again!',
    [new DevelopmentRequirement()],
    undefined, undefined, { displayName: 'Lady Lilligant', imageName: '../pokemon/549.02' }
);
GymList['Molten Arena'] = new Gym(
    'Lord of the Isles: Arcanine',
    'Molten Arena',
    [new GymPokemon('Noble Arcanine', 76658268, 70)],
    BadgeEnums.Noble_Arcanine,
    128000,
    'You defeated Lord Arcanine once again!',
    [new DevelopmentRequirement()],
    undefined, undefined, { displayName: 'Lord Arcanine', imageName: '../pokemon/59.02' }
);
GymList['Moonview Arena'] = new Gym(
    'Lord of the Hollow: Electrode',
    'Moonview Arena',
    [new GymPokemon('Noble Electrode', 76658268, 70)],
    BadgeEnums.Noble_Electrode,
    128000,
    'You defeated Lord Electrode once again!',
    [new DevelopmentRequirement()],
    undefined, undefined, { displayName: 'Lord Electrode', imageName: '../pokemon/101.02' }
);
GymList['Icepeak Arena'] = new Gym(
    'Lord of the Tundra: Avalugg',
    'Icepeak Arena',
    [new GymPokemon('Noble Avalugg', 76658268, 70)],
    BadgeEnums.Noble_Avalugg,
    128000,
    'You defeated Lord Avalugg once again!',
    [new DevelopmentRequirement()],
    undefined, undefined, { displayName: 'Lord Avalugg', imageName: '../pokemon/713.02' }
);
GymList['Temple of Sinnoh'] = new Gym(
    'Volo',
    'Temple of Sinnoh',
    [
        new GymPokemon('Spiritomb', 348526193, 68),
        new GymPokemon('Roserade', 348526193, 68),
        new GymPokemon('Togekiss', 348526193, 68),
        new GymPokemon('Hisuian Arcanine', 348526193, 68),
        new GymPokemon('Lucario', 348526193, 68),
        new GymPokemon('Garchomp', 348526193, 68),
        new GymPokemon('Giratina (Altered)', 348526193, 70, new TemporaryBattleRequirement('Volo 3')),
        new GymPokemon('Giratina (Origin)', 348526193, 70, new TemporaryBattleRequirement('Volo 3')),
    ],
    BadgeEnums.Azure,
    128000,
    'Why? Why you?! Why do you have the blessing of Arceus?!',
    [new DevelopmentRequirement()],
    () => {},
    { champion: true },
    { displayName: 'Pokémon Wielder Volo' }
);

// Paldea Gyms
GymList.Cortondo = new Gym(
    'Katy',
    'Cortondo',
    [
        new GymPokemon('Nymble', 203123316, 14),
        new GymPokemon('Tarountula', 203123316, 14),
        new GymPokemon('Teddiursa', 203123316, 15),
    ],
    BadgeEnums.Bug_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList.Artazon = new Gym(
    'Brassius',
    'Artazon',
    [
        new GymPokemon('Petilil', 203123316, 16),
        new GymPokemon('Smoliv', 203123316, 14),
        new GymPokemon('Sudowoodo', 203123316, 17),
    ],
    BadgeEnums.Grass_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList.Levincia = new Gym(
    'Iono',
    'Levincia',
    [
        new GymPokemon('Wattrel', 203123316, 23),
        new GymPokemon('Bellibolt', 203123316, 23),
        new GymPokemon('Luxio', 203123316, 23),
        new GymPokemon('Mismagius', 203123316, 24),
    ],
    BadgeEnums.Electric_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList.Cascarrafa = new Gym(
    'Kofu',
    'Cascarrafa',
    [
        new GymPokemon('Veluza', 203123316, 29),
        new GymPokemon('Wugtrio', 203123316, 29),
        new GymPokemon('Crabominable', 203123316, 30),
    ],
    BadgeEnums.Water_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList.Medali = new Gym(
    'Larry',
    'Medali',
    [
        new GymPokemon('Komala', 203123316, 35),
        new GymPokemon('Dudunsparce (Two-Segment)', 203123316, 35),
        new GymPokemon('Staraptor', 203123316, 36),
    ],
    BadgeEnums.Normal_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList.Montenevera = new Gym(
    'Ryme',
    'Montenevera',
    [
        new GymPokemon('Banette', 203123316, 41),
        new GymPokemon('Mimikyu', 203123316, 41),
        new GymPokemon('Houndstone', 203123316, 41),
        new GymPokemon('Toxtricity (Low Key)', 203123316, 42),
    ],
    BadgeEnums.Ghost_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList.Alfornada = new Gym(
    'Tulip',
    'Alfornada',
    [
        new GymPokemon('Farigiraf', 203123316, 44),
        new GymPokemon('Gardevoir', 203123316, 44),
        new GymPokemon('Espathra', 203123316, 44),
        new GymPokemon('Florges (Red)', 203123316, 45),
    ],
    BadgeEnums.Psychic_Gym,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList['Glaseado Mountain'] = new Gym(
    'Grusha',
    'Glaseado Mountain',
    [
        new GymPokemon('Frosmoth', 203123316, 47),
        new GymPokemon('Beartic', 203123316, 47),
        new GymPokemon('Cetitan', 203123316, 47),
        new GymPokemon('Altaria', 203123316, 48),
    ],
    BadgeEnums.Ice_Gym,
    250000,
    '',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glaseado Mountain'))]
);
GymList['Elite Rika'] = new Gym(
    'Rika',
    'Elite Rika',
    [
        new GymPokemon('Whiscash', 203123316, 57),
        new GymPokemon('Camerupt', 203123316, 57),
        new GymPokemon('Donphan', 203123316, 57),
        new GymPokemon('Dugtrio', 203123316, 57),
        new GymPokemon('Clodsire', 203123316, 58),
    ],
    BadgeEnums.Elite_Rika,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Bug_Gym), new GymBadgeRequirement(BadgeEnums.Grass_Gym), new GymBadgeRequirement(BadgeEnums.Electric_Gym), new GymBadgeRequirement(BadgeEnums.Water_Gym), new GymBadgeRequirement(BadgeEnums.Normal_Gym), new GymBadgeRequirement(BadgeEnums.Ghost_Gym), new GymBadgeRequirement(BadgeEnums.Psychic_Gym), new GymBadgeRequirement(BadgeEnums.Ice_Gym)]
);
GymList['Elite Poppy'] = new Gym(
    'Poppy',
    'Elite Poppy',
    [
        new GymPokemon('Copperajah', 203123316, 58),
        new GymPokemon('Magnezone', 203123316, 58),
        new GymPokemon('Bronzong', 203123316, 58),
        new GymPokemon('Corviknight', 203123316, 58),
        new GymPokemon('Tinkaton', 203123316, 59),
    ],
    BadgeEnums.Elite_Poppy,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Elite_Rika)]
);
GymList['Elite Larry'] = new Gym(
    'Larry',
    'Elite Larry',
    [
        new GymPokemon('Tropius', 203123316, 59),
        new GymPokemon('Oricorio (Pom-Pom)', 203123316, 59),
        new GymPokemon('Altaria', 203123316, 59),
        new GymPokemon('Staraptor', 203123316, 59),
        new GymPokemon('Flamigo', 203123316, 60),
    ],
    BadgeEnums.Elite_Larry,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Elite_Poppy)]
);
GymList['Elite Hassel'] = new Gym(
    'Hassel',
    'Elite Hassel',
    [
        new GymPokemon('Noivern', 203123316, 60),
        new GymPokemon('Haxorus', 203123316, 60),
        new GymPokemon('Dragalge', 203123316, 60),
        new GymPokemon('Flapple', 203123316, 60),
        new GymPokemon('Baxcalibur', 203123316, 61),
    ],
    BadgeEnums.Elite_Hassel,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Elite_Larry)]
);
GymList['Top Champion Geeta'] = new Gym(
    'Geeta',
    'Top Champion Geeta',
    [
        new GymPokemon('Espathra', 203123316, 61),
        new GymPokemon('Gogoat', 203123316, 61),
        new GymPokemon('Veluza', 203123316, 61),
        new GymPokemon('Avalugg', 203123316, 61),
        new GymPokemon('Kingambit', 203123316, 61),
        new GymPokemon('Glimmora', 203123316, 62),
    ],
    BadgeEnums.Elite_PaldeaChampion,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Elite_Hassel)],
    () => {},
    { champion: true }
);
GymList['Champion Nemona'] = new Gym(
    'Nemona',
    'Champion Nemona',
    [
        new GymPokemon('Lycanroc (Midday)', 203123316, 65),
        new GymPokemon('Goodra', 203123316, 65),
        new GymPokemon('Dudunsparce (Three-Segment)', 203123316, 65),
        new GymPokemon('Orthworm', 203123316, 65),
        new GymPokemon('Pawmot', 203123316, 65),
        new GymPokemon('Quaquaval', 203123316, 66, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Meowscarada', 203123316, 66, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Skeledirge', 203123316, 66, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
    ],
    BadgeEnums.Elite_Nemona,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Elite_PaldeaChampion)],
    undefined, undefined, { hideUntilUnlocked: true }
);
GymList['Segin Squad\'s Base'] = new Gym(
    'Giacomo',
    'Segin Squad\'s Base',
    [
        new GymPokemon('Pawniard', 203123316, 21),
        new GymPokemon('Segin Starmobile', 203123316, 20),
    ],
    BadgeEnums.Dark_Star,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Giacomo of Team Star' }
);
GymList['Schedar Squad\'s Base'] = new Gym(
    'Mela',
    'Schedar Squad\'s Base',
    [
        new GymPokemon('Torkoal', 203123316, 27),
        new GymPokemon('Schedar Starmobile', 203123316, 26),
    ],
    BadgeEnums.Fire_Star,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Mela of Team Star' }
);
GymList['Navi Squad\'s Base'] = new Gym(
    'Atticus',
    'Navi Squad\'s Base',
    [
        new GymPokemon('Skuntank', 203123316, 32),
        new GymPokemon('Muk', 203123316, 32),
        new GymPokemon('Revavroom', 203123316, 33),
        new GymPokemon('Navi Starmobile', 203123316, 32),
    ],
    BadgeEnums.Poison_Star,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Atticus of Team Star' }
);
GymList['Ruchbah Squad\'s Base'] = new Gym(
    'Ortega',
    'Ruchbah Squad\'s Base',
    [
        new GymPokemon('Azumarill', 203123316, 50),
        new GymPokemon('Wigglytuff', 203123316, 50),
        new GymPokemon('Dachsbun', 203123316, 51),
        new GymPokemon('Ruchbah Starmobile', 203123316, 50),
    ],
    BadgeEnums.Fairy_Star,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Ortega of Team Star' }
);
GymList['Caph Squad\'s Base'] = new Gym(
    'Eri',
    'Caph Squad\'s Base',
    [
        new GymPokemon('Toxicroak', 203123316, 55),
        new GymPokemon('Passimian', 203123316, 55),
        new GymPokemon('Lucario', 203123316, 55),
        new GymPokemon('Annihilape', 203123316, 56),
        new GymPokemon('Caph Starmobile', 203123316, 56),
    ],
    BadgeEnums.Fighting_Star,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Eri of Team Star' }
);
GymList['Director Clavell'] = new Gym(
    'Clavell',
    'Director Clavell',
    [
        new GymPokemon('Oranguru', 203123316, 60),
        new GymPokemon('Abomasnow', 203123316, 60),
        new GymPokemon('Polteageist', 203123316, 60),
        new GymPokemon('Amoonguss', 203123316, 60, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Houndoom', 203123316, 60, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Gyarados', 203123316, 60, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Gyarados', 203123316, 60, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Amoonguss', 203123316, 60, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Houndoom', 203123316, 60, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
        new GymPokemon('Skeledirge', 203123316, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Grass)),
        new GymPokemon('Quaquaval', 203123316, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Fire)),
        new GymPokemon('Meowscarada', 203123316, 61, new StarterRequirement(GameConstants.Region.kanto, GameConstants.Starter.Water)),
    ],
    BadgeEnums.Elite_Clavell,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Director Clavell', hideUntilUnlocked: true }
);
GymList['Penny of Team Star'] = new Gym(
    'Penny',
    'Penny of Team Star',
    [
        new GymPokemon('Umbreon', 203123316, 62),
        new GymPokemon('Vaporeon', 203123316, 62),
        new GymPokemon('Jolteon', 203123316, 62),
        new GymPokemon('Flareon', 203123316, 62),
        new GymPokemon('Leafeon', 203123316, 62),
        new GymPokemon('Sylveon', 203123316, 63),
    ],
    BadgeEnums.Elite_Penny,
    250000,
    '',
    [new GymBadgeRequirement(BadgeEnums.Elite_Clavell)],
    undefined, undefined, { displayName: 'Penny of Team Star', hideUntilUnlocked: true }
);
GymList['Stony Cliff Titan'] = new Gym(
    'Stony Cliff Titan',
    'Stony Cliff Titan',
    [new GymPokemon('Titan Klawf', 203123316, 16)],
    BadgeEnums.Rock_Titan,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { imageName: '../pokemon/950.01' }
);
GymList['Open Sky Titan'] = new Gym(
    'Open Sky Titan',
    'Open Sky Titan',
    [new GymPokemon('Titan Bombirdier', 203123316, 20)],
    BadgeEnums.Flying_Titan,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { imageName: '../pokemon/962.01' }
);
GymList['Lurking Steel Titan'] = new Gym(
    'Lurking Steel Titan',
    'Lurking Steel Titan',
    [new GymPokemon('Titan Orthworm', 203123316, 29)],
    BadgeEnums.Steel_Titan,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { imageName: '../pokemon/968.01' }
);
GymList['Asado Desert'] = new Gym(
    'Quaking Earth Titan',
    'Asado Desert',
    [
        new GymPokemon('Titan Great Tusk', 203123316, 45),
        new GymPokemon('Titan Iron Treads', 203123316, 45),
    ],
    BadgeEnums.Ground_Titan,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList['Casseroya Lake'] = new Gym(
    'False Dragon Titan',
    'Casseroya Lake',
    [
        new GymPokemon('Titan Dondozo', 203123316, 56),
        new GymPokemon('Titan Tatsugiri', 203123316, 57),
    ],
    BadgeEnums.Dragon_Titan,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)]
);
GymList['Pokémon Trainer Arven'] = new Gym(
    'Arven',
    'Pokémon Trainer Arven',
    [
        new GymPokemon('Greedent', 203123316, 58),
        new GymPokemon('Cloyster', 203123316, 59),
        new GymPokemon('Scovillain', 203123316, 60),
        new GymPokemon('Toedscruel', 203123316, 61),
        new GymPokemon('Garganacl', 203123316, 62),
        new GymPokemon('Mabosstiff', 203123316, 63),
    ],
    BadgeEnums.Elite_Arven,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'Arven', hideUntilUnlocked: true }
);
GymList['AI Sada'] = new Gym(
    'AI Sada',
    'AI Sada',
    [
        new GymPokemon('Slither Wing', 203123316, 66),
        new GymPokemon('Scream Tail', 203123316, 66),
        new GymPokemon('Brute Bonnet', 203123316, 66),
        new GymPokemon('Flutter Mane', 203123316, 66),
        new GymPokemon('Sandy Shocks', 203123316, 66),
        new GymPokemon('Roaring Moon', 203123316, 67),
    ],
    BadgeEnums.Scarlet,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'AI Sada' }
);
GymList['AI Turo'] = new Gym(
    'AI Turo',
    'AI Turo',
    [
        new GymPokemon('Iron Moth', 203123316, 66),
        new GymPokemon('Iron Bundle', 203123316, 66),
        new GymPokemon('Iron Hands', 203123316, 66),
        new GymPokemon('Iron Jugulis', 203123316, 66),
        new GymPokemon('Iron Thorns', 203123316, 66),
        new GymPokemon('Iron Valiant', 203123316, 67),
    ],
    BadgeEnums.Violet,
    250000,
    '',
    [new RouteKillRequirement(10, GameConstants.Region.paldea, 2)],
    undefined, undefined, { displayName: 'AI Turo' }
);
