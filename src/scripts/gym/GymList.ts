
const GymList: { [townName: string]: Gym } = {};

// Kanto Gyms
GymList['Pewter City'] = new Gym(
    'Brock',
    'Pewter City',
    [
        new GymPokemon('Geodude', 770, 10),
        new GymPokemon('Onix', 1554, 12),
    ],
    BadgeEnums.Boulder,
    250,
    'I took you for granted. As proof of your victory, here\'s the Boulder Badge!',
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
    'I can\'t believe I lost! All right! You can have the Cascade Badge to show you beat me!',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)]
);
GymList['Vermilion City'] = new Gym(
    'Lt. Surge',
    'Vermilion City',
    [new GymPokemon('Raichu', 37000, 28)],
    BadgeEnums.Thunder,
    1000,
    'Whoa! You\'re the real deal, kid! Fine then, take the Thunder Badge!',
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 6),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
);
GymList['Celadon City'] = new Gym(
    'Erika',
    'Celadon City',
    [
        new GymPokemon('Tangela', 38810, 30),
        new GymPokemon('Weepinbell', 30340, 32),
        new GymPokemon('Gloom', 36400, 32),
    ],
    BadgeEnums.Rainbow,
    1500,
    'Oh! I concede defeat. You are remarkably strong. I must confer you the Rainbow Badge.',
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 7)]
);
GymList['Saffron City'] = new Gym(
    'Sabrina',
    'Saffron City',
    [
        new GymPokemon('Abra', 23040, 50),
        new GymPokemon('Kadabra', 25600, 50),
        new GymPokemon('Alakazam', 28400, 50),
    ],
    BadgeEnums.Marsh,
    2500,
    'I\'m shocked! But a loss is a loss. I admit I didn\'t work hard enough to win! You earned the Marsh Badge!',
    [new GymBadgeRequirement(BadgeEnums.Rainbow)]
);
GymList['Fuchsia City'] = new Gym(
    'Koga',
    'Fuchsia City',
    [
        new GymPokemon('Venonat', 30780, 44),
        new GymPokemon('Venonat', 32460, 46),
        new GymPokemon('Venonat', 36540, 48),
        new GymPokemon('Venomoth', 37430, 50),
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
        App.game.quests.getQuestLine('Mining Expedition').beginQuest();
    }
);
GymList['Cinnabar Island'] = new Gym(
    'Blaine',
    'Cinnabar Island',
    [
        new GymPokemon('Ninetales', 37430, 48),
        new GymPokemon('Rapidash', 45230, 50),
        new GymPokemon('Arcanine', 50290, 54),
    ],
    BadgeEnums.Volcano,
    5000,
    'I\'ve burnt out! You have earned the Volcano Badge!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokemon Mansion'))]
);
GymList['Viridian City'] = new Gym(
    'Giovanni',
    'Viridian City',
    [
        new GymPokemon('Dugtrio', 45230, 50),
        new GymPokemon('Persian', 47530, 53),
        new GymPokemon('Nidoqueen', 48740, 53),
        new GymPokemon('Nidoking', 48350, 55),
        new GymPokemon('Rhydon', 55000, 55),
    ],
    BadgeEnums.Earth,
    6000,
    'Ha! That was a truly intense fight! You have won! As proof, here is the Earth Badge!',
    [
        new GymBadgeRequirement(BadgeEnums.Volcano),
        new GymBadgeRequirement(BadgeEnums.Marsh),
        new GymBadgeRequirement(BadgeEnums.Thunder),
    ],
    () => {
        App.game.keyItems.gainKeyItem(KeyItemType.Gem_case, true);
    }
);

// Kanto Elite 4
GymList['Elite Lorelei'] = new Gym(
    'Lorelei',
    'Elite Lorelei',
    [
        new GymPokemon('Dewgong', 75842, 54),
        new GymPokemon('Cloyster', 75842, 53),
        new GymPokemon('Slowbro', 75842, 54),
        new GymPokemon('Jynx', 75842, 56),
        new GymPokemon('Lapras', 90842, 56),
    ],
    BadgeEnums.Elite_Lorelei,
    7500,
    'You\'re better than I thought! Go on ahead! You only got a taste of Pokémon League power!',
    [new GymBadgeRequirement(BadgeEnums.Earth)]
);
GymList['Elite Bruno'] = new Gym(
    'Bruno',
    'Elite Bruno',
    [
        new GymPokemon('Onix', 78988, 53),
        new GymPokemon('Hitmonchan', 78988, 55),
        new GymPokemon('Hitmonlee', 78988, 55),
        new GymPokemon('Onix', 78988, 56),
        new GymPokemon('Machamp', 93988, 58),
    ],
    BadgeEnums.Elite_Bruno,
    7500,
    'My job is done! Go face your next challenge!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lorelei)]
);
GymList['Elite Agatha'] = new Gym(
    'Agatha',
    'Elite Agatha',
    [
        new GymPokemon('Gengar', 82134, 56),
        new GymPokemon('Golbat', 82134, 56),
        new GymPokemon('Haunter', 82134, 55),
        new GymPokemon('Arbok', 82134, 58),
        new GymPokemon('Gengar', 97134, 60),
    ],
    BadgeEnums.Elite_Agatha,
    7500,
    'You win! I see what the old duff sees in you now. I\'ve nothing else to say. Run along now, child!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bruno)]
);
GymList['Elite Lance'] = new Gym(
    'Lance',
    'Elite Lance',
    [
        new GymPokemon('Gyarados', 85280, 58),
        new GymPokemon('Dragonair', 85280, 56),
        new GymPokemon('Dragonair', 85280, 56),
        new GymPokemon('Aerodactyl', 85280, 60),
        new GymPokemon('Dragonite', 100280, 62),
    ],
    BadgeEnums.Elite_Lance,
    7500,
    'I still can’t believe my dragons lost to you! You’re now the Pokémon League champion! …Or, you would have been, but you have one more challenge ahead. You have to face another trainer!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Agatha)]
);
// Kanto Champion
GymList['Champion Blue'] = new Champion(
    'Blue',
    'Champion Blue',
    [
        new GymPokemon('Pidgeot', 74184, 59),
        new GymPokemon('Alakazam', 74184, 57),
        new GymPokemon('Rhydon', 74184, 59),
    ],
    BadgeEnums.Elite_KantoChampion,
    10000,
    'Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You\'re the new Pokémon League Champion! Although I don\'t like to admit it…',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lance)],
    // Bulbasaur
    [
        new GymPokemon('Exeggutor', 74184, 59),
        new GymPokemon('Gyarados', 74184, 61),
        new GymPokemon('Charizard', 86184, 63),
    ],
    // Charmander
    [
        new GymPokemon('Arcanine', 74184, 59),
        new GymPokemon('Exeggutor', 74184, 61),
        new GymPokemon('Blastoise', 86184, 63),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Gyarados', 74184, 59),
        new GymPokemon('Arcanine', 74184, 61),
        new GymPokemon('Venusaur', 86184, 63),
    ]
);

//Johto Gyms
GymList['Violet City'] = new Gym(
    'Falkner',
    'Violet City',
    [
        new GymPokemon('Pidgey', 261275, 7),
        new GymPokemon('Pidgeotto', 341275, 9),
    ],
    BadgeEnums.Zephyr,
    250,
    '...Darn! My Dad\'s cherished bird Pokémon... All right. Take this. It\'s the official Pokémon League Zephyr Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sprout Tower'))]
);
GymList['Azalea Town'] = new Gym(
    'Bugsy',
    'Azalea Town',
    [
        new GymPokemon('Metapod', 197767, 14),
        new GymPokemon('Kakuna', 197767, 14),
        new GymPokemon('Scyther', 277767, 16),
    ],
    BadgeEnums.Hive,
    500,
    'Whoa, amazing! You\'re an expert on Pokémon! My research isn\'t complete yet. Ok, you win. Take this Badge.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slowpoke Well'))]
);
GymList['Goldenrod City'] = new Gym(
    'Whitney',
    'Goldenrod City',
    [
        new GymPokemon('Clefairy', 346480, 18),
        new GymPokemon('Miltank', 426480, 20),
    ],
    BadgeEnums.Plain,
    1000,
    '...Sniff... What? What do you want? A badge? Oh, right. I forgot. Here\'s Plain Badge.',
    [new RouteKillRequirement(10, GameConstants.Region.johto, 34)]
);
GymList['Ecruteak City'] = new Gym(
    'Morty',
    'Ecruteak City',
    [
        new GymPokemon('Gastly', 222415, 21),
        new GymPokemon('Haunter', 222415, 21),
        new GymPokemon('Gengar', 302415, 25),
        new GymPokemon('Haunter', 222415, 23),
    ],
    BadgeEnums.Fog,
    1500,
    'I\'m not good enough yet... All right. This Badge is yours.',
    [new GymBadgeRequirement(BadgeEnums.Plain)],
    () => {
        App.game.quests.getQuestLine('Team Rocket Again').beginQuest();
    }
);
GymList['Cianwood City'] = new Gym(
    'Chuck',
    'Cianwood City',
    [
        new GymPokemon('Primeape', 597520, 27),
        new GymPokemon('Poliwrath', 677520, 30),
    ],
    BadgeEnums.Storm,
    2500,
    'Wha? Huh? I lost? How about that! You\'re worthy of Storm Badge!',
    [new GymBadgeRequirement(BadgeEnums.Fog)]
);
GymList['Olivine City'] = new Gym(
    'Jasmine',
    'Olivine City',
    [
        new GymPokemon('Magnemite', 423127, 30),
        new GymPokemon('Magnemite', 423127, 30),
        new GymPokemon('Steelix', 513127, 35),
    ],
    BadgeEnums.Mineral,
    3500,
    '...You are a better trainer than me, in both skill and kindness. In accordance with League rules, I confer upon you this Badge.',
    [new GymBadgeRequirement(BadgeEnums.Storm)]
);
GymList['Mahogany Town'] = new Gym(
    'Pryce',
    'Mahogany Town',
    [
        new GymPokemon('Seel', 452337, 27),
        new GymPokemon('Dewgong', 452337, 29),
        new GymPokemon('Piloswine', 542337, 31),
    ],
    BadgeEnums.Glacier,
    4000,
    'Ah, I am impressed by your prowess. With your strong will, I know you will overcome all life\'s obstacles. You are worthy of this Badge!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Rockets Hideout'))]
);
GymList['Blackthorn City'] = new Gym(
    'Clair',
    'Blackthorn City',
    [
        new GymPokemon('Dragonair', 354495, 37),
        new GymPokemon('Dragonair', 354495, 37),
        new GymPokemon('Dragonair', 354495, 37),
        new GymPokemon('Kingdra', 474495, 40),
    ],
    BadgeEnums.Rising,
    5000,
    'Here, this is the Rising Badge... Hurry up! Take it!',
    [new GymBadgeRequirement(BadgeEnums.Glacier)]
);

//Johto Elite 4
GymList['Elite Will'] = new Gym(
    'Will',
    'Elite Will',
    [
        new GymPokemon('Xatu', 378854, 40),
        new GymPokemon('Exeggutor', 378854, 41),
        new GymPokemon('Slowbro', 378854, 41),
        new GymPokemon('Jynx', 378854, 41),
        new GymPokemon('Xatu', 528854, 42),
    ],
    BadgeEnums.Elite_Will,
    7500,
    'Even though I was defeated, I won\'t change my course. I will continue battling until I stand above all Trainers! Now move on and experience the true ferocity of the Elite Four.',
    [new GymBadgeRequirement(BadgeEnums.Rising)]
);
GymList['Elite Koga'] = new Gym(
    'Koga2',
    'Elite Koga',
    [
        new GymPokemon('Ariados', 384446, 40),
        new GymPokemon('Venomoth', 384446, 41),
        new GymPokemon('Forretress', 384446, 43),
        new GymPokemon('Muk', 384446, 42),
        new GymPokemon('Crobat', 534446, 44),
    ],
    BadgeEnums.Elite_Koga,
    7500,
    'I subjected you to everything I could muster. But my efforts failed. I must hone my skills. Go on to the next room, and put your abilities to the test!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Will)]
);
GymList['Elite Bruno2'] = new Gym(
    'Bruno2',
    'Elite Bruno2',
    [
        new GymPokemon('Hitmontop', 390038, 42),
        new GymPokemon('Hitmonlee', 390038, 42),
        new GymPokemon('Hitmonchan', 390038, 42),
        new GymPokemon('Onix', 390038, 43),
        new GymPokemon('Machamp', 540038, 46),
    ],
    BadgeEnums.Elite_Bruno2,
    7500,
    'Having lost, I have no right to say anything… Go face your next challenge!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Koga)]
);
GymList['Elite Karen'] = new Gym(
    'Karen',
    'Elite Karen',
    [
        new GymPokemon('Umbreon', 395630, 42),
        new GymPokemon('Vileplume', 395630, 42),
        new GymPokemon('Murkrow', 395630, 44),
        new GymPokemon('Gengar', 395630, 45),
        new GymPokemon('Houndoom', 545630, 47),
    ],
    BadgeEnums.Elite_Karen,
    7500,
    'Strong Pokémon. Weak Pokémon. That is only the selfish perception of people. Truly skilled Trainers should try to win with the Pokémon they love best. I like your style. You understand what\'s important. Go on — — the Champion is waiting.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bruno2)]
);
// Johto Champion
GymList['Champion Lance'] = new Champion(
    'Lance2',
    'Champion Lance',
    [
        new GymPokemon('Gyarados', 339352, 44),
        new GymPokemon('Dragonite', 339352, 47),
        new GymPokemon('Charizard', 339352, 46),
        new GymPokemon('Aerodactyl', 339352, 46),
        new GymPokemon('Dragonite', 339352, 47),
        new GymPokemon('Dragonite', 459352, 50),
    ],
    BadgeEnums.Elite_JohtoChampion,
    7500,
    '…It\'s over. But it\'s an odd feeling. I\'m not angry that I lost. In fact, I feel happy. Happy that I witnessed the rise of a great new Champion!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Karen)]
);

// Hoenn Gyms
GymList['Rustboro City'] = new Gym(
    'Roxanne',
    'Rustboro City',
    [
        new GymPokemon('Geodude', 891937, 12),
        new GymPokemon('Geodude', 891937, 12),
        new GymPokemon('Nosepass', 981937, 15),
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
        new GymPokemon('Machop', 937454, 16),
        new GymPokemon('Meditite', 937454, 16),
        new GymPokemon('Makuhita', 1027454, 19),
    ],
    BadgeEnums.Knuckle,
    2000,
    'Whoah, wow! You made a much bigger splash than I expected! You swamped me! Okay, you\'ve got me. Take this Gym Badge!'
);
GymList['Mauville City'] = new Gym(
    'Wattson',
    'Mauville City',
    [
        new GymPokemon('Voltorb', 730728, 20),
        new GymPokemon('Electrike', 730728, 20),
        new GymPokemon('Magneton', 730728, 22),
        new GymPokemon('Manectric', 850728, 24),
    ],
    BadgeEnums.Dynamo,
    3000,
    'Wahahahah! Fine, I lost! You ended up giving me a thrill! Take this Badge!',
    [new GymBadgeRequirement(BadgeEnums.Knuckle)],
    () => {
        App.game.quests.getQuestLine('Land vs Water').beginQuest();
    }
);
GymList['Lavaridge Town'] = new Gym(
    'Flannery',
    'Lavaridge Town',
    [
        new GymPokemon('Numel', 963108, 24),
        new GymPokemon('Slugma', 963108, 24),
        new GymPokemon('Camerupt', 963108, 26),
        new GymPokemon('Torkoal', 1083108, 29),
    ],
    BadgeEnums.Heat,
    4000,
    'Oh... I guess I was trying too hard... I... I\'ve only recently become a Gym Leader. I tried too hard to be someone I\'m not. I have to do things my natural way. If I don\'t, my Pokémon will be confused. Thanks for teaching me that. For that, you deserve this.'
);
GymList['Petalburg City'] = new Gym(
    'Norman',
    'Petalburg City',
    [
        new GymPokemon('Spinda', 1186030, 27),
        new GymPokemon('Vigoroth', 1186030, 27),
        new GymPokemon('Linoone', 1186030, 29),
        new GymPokemon('Slaking', 1306030, 31),
    ],
    BadgeEnums.Balance,
    5000,
    '… I… I can\'t… I can\'t believe it. I lost to you? But, rules are rules! Here, take this.',
    [new GymBadgeRequirement(BadgeEnums.Heat)]
);
GymList['Fortree City'] = new Gym(
    'Winona',
    'Fortree City',
    [
        new GymPokemon('Swablu', 1020348, 29),
        new GymPokemon('Tropius', 1020348, 29),
        new GymPokemon('Pelipper', 1020348, 30),
        new GymPokemon('Skarmory', 1020348, 31),
        new GymPokemon('Altaria', 1170348, 33),
    ],
    BadgeEnums.Feather,
    6000,
    'Never before have I seen a Trainer command Pokémon with more grace than I... In recognition of your prowess, I present to you this Gym Badge.'
);
GymList['Mossdeep City'] = new Gym(
    'Tate & Liza',
    'Mossdeep City',
    [
        new GymPokemon('Claydol', 1601100, 41),
        new GymPokemon('Xatu', 1601100, 41),
        new GymPokemon('Lunatone', 1601100, 42),
        new GymPokemon('Solrock', 1721100, 42),
    ],
    BadgeEnums.Mind,
    8000,
    'What? Our combination... Was shattered! It can\'t be helped. You\'ve won... So, in recognition, take this Gym Badge.'
);
GymList['Sootopolis City'] = new Gym(
    'Juan',
    'Sootopolis City',
    [
        new GymPokemon('Luvdisc', 1563530, 41),
        new GymPokemon('Whiscash', 1563530, 41),
        new GymPokemon('Sealeo', 1563530, 43),
        new GymPokemon('Crawdaunt', 1563530, 43),
        new GymPokemon('Kingdra', 1713530, 46),
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
        new GymPokemon('Mightyena', 1721108, 46),
        new GymPokemon('Shiftry', 1721108, 48),
        new GymPokemon('Cacturne', 1721108, 46),
        new GymPokemon('Crawdaunt', 1721108, 48),
        new GymPokemon('Absol', 1871108, 49),
    ],
    BadgeEnums.Elite_Sidney,
    15000,
    'Well, listen to what this loser has to say. You\'ve got what it takes to go far. Now, go on to the next room and enjoy your next battle!',
    [new GymBadgeRequirement(BadgeEnums.Rain)]
);
GymList['Elite Phoebe'] = new Gym(
    'Phoebe',
    'Elite Phoebe',
    [
        new GymPokemon('Dusclops', 1755260, 48),
        new GymPokemon('Banette', 1755260, 49),
        new GymPokemon('Sableye', 1755260, 50),
        new GymPokemon('Banette', 1755260, 49),
        new GymPokemon('Dusclops', 1905260, 51),
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
        new GymPokemon('Sealeo', 1789412, 50),
        new GymPokemon('Glalie', 1789412, 50),
        new GymPokemon('Sealeo', 1789412, 52),
        new GymPokemon('Glalie', 1789412, 52),
        new GymPokemon('Walrein', 1939412, 53),
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
        new GymPokemon('Shelgon', 1823564, 52),
        new GymPokemon('Altaria', 1823564, 54),
        new GymPokemon('Flygon', 1823564, 53),
        new GymPokemon('Flygon', 1823564, 53),
        new GymPokemon('Salamence', 1973564, 55),
    ],
    BadgeEnums.Elite_Drake,
    15000,
    'You deserve every credit for coming this far as a Trainer of Pokémon. You do seem to know what is needed. Yes, what a Trainer needs is a virtuous heart. Pokémon touch the good hearts of Trainers and learn good from wrong. They touch the good hearts of Trainers and grow strong. Go! Go onwards! The Champion is waiting!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Glacia)]
);

// Hoenn Champion
GymList['Champion Wallace'] = new Champion(
    'Wallace',
    'Champion Wallace',
    [
        new GymPokemon('Wailord', 1543097, 57),
        new GymPokemon('Tentacruel', 1543097, 55),
        new GymPokemon('Ludicolo', 1543097, 56),
        new GymPokemon('Whiscash', 1543097, 56),
        new GymPokemon('Gyarados', 1543097, 56),
        new GymPokemon('Milotic', 1723097, 58),
    ],
    BadgeEnums.Elite_HoennChampion,
    16000,
    'I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drake)],
    undefined,
    undefined,
    undefined,
    () => {
        App.game.quests.getQuestLine('Mystery of Deoxys').beginQuest();
    }
);

//Sinnoh Gyms
GymList['Oreburgh City'] = new Gym(
    'Roark',
    'Oreburgh City',
    [
        new GymPokemon('Geodude', 3041550, 12),
        new GymPokemon('Onix', 3041550, 12),
        new GymPokemon('Cranidos', 3941550, 14),
    ],
    BadgeEnums.Coal,
    250,
    'This is embarrassing... I went and lost to a Trainer who didn\'t have a single Gym Badge... But that\'s tough. You were strong, and I was weak. That\'s all there is. According to Pokémon League rules, I have to give you our Gym Badge since you\'ve beaten me, the Leader. Heres your official Pokémon League Coal Badge.',
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
    () => {
        App.game.quests.getQuestLine('A new world').beginQuest();
    }
);
GymList['Eterna City'] = new Gym(
    'Gardenia',
    'Eterna City',
    [
        new GymPokemon('Turtwig', 3244064, 20),
        new GymPokemon('Cherrim (overcast)', 3244064, 20),
        new GymPokemon('Roserade', 4144064, 22),
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
        new GymPokemon('Duskull', 3561460, 24),
        new GymPokemon('Haunter', 3561460, 24),
        new GymPokemon('Mismagius', 4461460, 26),
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
        new GymPokemon('Meditite', 3895464, 28),
        new GymPokemon('Machoke', 3895464, 29),
        new GymPokemon('Lucario', 4795464, 32),
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
        new GymPokemon('Gyarados', 4127500, 33),
        new GymPokemon('Quagsire', 4127500, 34),
        new GymPokemon('Floatzel', 5027500, 37),
    ],
    BadgeEnums.Fen,
    2500,
    'It seems the undertow pulled me under... But I had a great time battling with you! You\'ve earned this!',
    [new GymBadgeRequirement(BadgeEnums.Cobble)]
);
GymList['Canalave City'] = new Gym(
    'Byron',
    'Canalave City',
    [
        new GymPokemon('Magneton', 4489830, 37),
        new GymPokemon('Steelix', 4489830, 38),
        new GymPokemon('Bastiodon', 5389830, 41),
    ],
    BadgeEnums.Mine,
    4800,
    'You were strong enough to take down my prized team of Pokémon. In recognition of that power, I give you this: the Mine Badge!',
    [new GymBadgeRequirement(BadgeEnums.Fen)]
);
GymList['Snowpoint City'] = new Gym(
    'Candice',
    'Snowpoint City',
    [
        new GymPokemon('Sneasel', 3480763, 40),
        new GymPokemon('Piloswine', 3480763, 40),
        new GymPokemon('Abomasnow', 3480763, 42),
        new GymPokemon('Froslass', 4680763, 44),
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
        new GymPokemon('Jolteon', 3875165, 46),
        new GymPokemon('Raichu', 3875165, 46),
        new GymPokemon('Luxray', 3875165, 48),
        new GymPokemon('Electivire', 5075165, 50),
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
        new GymPokemon('Yanmega', 3121986, 49),
        new GymPokemon('Scizor', 3121986, 49),
        new GymPokemon('Vespiquen', 3121986, 50),
        new GymPokemon('Heracross', 3121986, 51),
        new GymPokemon('Drapion', 4621986, 53),
    ],
    BadgeEnums.Elite_Aaron,
    18000,
    'I lost with the most beautiful and toughest of the bug Pokémon... We lost because I wasn\'t good enough... That\'s it! Back to training camp! Let\'s hear it for me! No... That was wrong... Anyway... Go on to the next room! Three Trainers are waiting for you. They are all tougher than me.',
    [new GymBadgeRequirement(BadgeEnums.Beacon)]
);
GymList['Elite Bertha'] = new Gym(
    'Bertha',
    'Elite Bertha',
    [
        new GymPokemon('Whiscash', 3138598, 50),
        new GymPokemon('Gliscor', 3138598, 53),
        new GymPokemon('Hippowdon', 3138598, 52),
        new GymPokemon('Golem', 3138598, 52),
        new GymPokemon('Rhyperior', 4638598, 55),
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
        new GymPokemon('Houndoom', 3155210, 52),
        new GymPokemon('Flareon', 3155210, 55),
        new GymPokemon('Rapidash', 3155210, 53),
        new GymPokemon('Infernape', 3155210, 55),
        new GymPokemon('Magmortar', 4655210, 57),
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
        new GymPokemon('Mr. Mime', 3171822, 53),
        new GymPokemon('Espeon', 3171822, 55),
        new GymPokemon('Bronzong', 3171822, 54),
        new GymPokemon('Alakazam', 3171822, 56),
        new GymPokemon('Gallade', 4671822, 59),
    ],
    BadgeEnums.Elite_Lucian,
    18000,
    'Congratulations. You have beaten the Elite Four. However, that doesn\'t mean you\'re done with the Pokémon league. There remains the Champion. I should warn you—the Champion is far stronger than the Elite Four. Now, go on. Step through the doorway to your final battle.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Flint)]
);

// Sinnoh Champion
GymList['Champion Cynthia'] = new Champion(
    'Cynthia',
    'Champion Cynthia',
    [
        new GymPokemon('Spiritomb', 2720869, 58),
        new GymPokemon('Roserade', 2720869, 58),
        new GymPokemon('Togekiss', 2720869, 60),
        new GymPokemon('Lucario', 2720869, 60),
        new GymPokemon('Milotic', 2720869, 58),
        new GymPokemon('Garchomp', 3920869, 62),
    ],
    BadgeEnums.Elite_SinnohChampion,
    32000,
    'That was excellent. Truly, an outstanding battle. You gave the support your Pokémon needed to maximize their power. And you guided them with certainty to secure victory. You have both passion and calculating coolness. Together, you and your Pokémon can overcome any challenge that may come your way. Those are the impressions I got from our battle. I\'m glad I got to take part in the crowning of Sinnoh\'s new Champion! Come with me. We\'ll take the lift.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lucian)]
);

//Unova Gyms
//TODO: Balancing of gym Pokemon HP & rewards.
GymList['Aspertia City'] = new Gym(
    'Cheren',
    'Aspertia City',
    [
        new GymPokemon('Patrat', 6866217, 12),
        new GymPokemon('Pidove', 6866217, 12),
        new GymPokemon('Lillipup', 7766217, 14),
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
        new GymPokemon('Koffing', 7027750, 58),
        new GymPokemon('Grimer', 7027750, 58),
        new GymPokemon('Whirlipede', 7927750, 58),
    ],
    BadgeEnums.Toxic,
    800,
    'Sigh! What are you doing losing, Roxie?! Well…I guess that means you\'re strong! This stinks, but I gave it everything I had, and I feel revitalized and refreshed now! Here! Proof that you beat me!',
    [new GymBadgeRequirement(BadgeEnums.Basic)]
);
GymList['Castelia City'] = new Gym(
    'Burgh',
    'Castelia City',
    [
        new GymPokemon('Dwebble', 5318603, 58),
        new GymPokemon('Shelmet', 5318603, 58),
        new GymPokemon('Karrablast', 5318603, 58),
        new GymPokemon('Leavanny', 6518603, 58),
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
        new GymPokemon('Emolga', 5569120, 58),
        new GymPokemon('Flaaffy', 5569120, 58),
        new GymPokemon('Joltik', 5569120, 58),
        new GymPokemon('Zebstrika', 6769120, 58),
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
        new GymPokemon('Krokorok', 5696865, 58),
        new GymPokemon('Sandslash', 5696865, 58),
        new GymPokemon('Onix', 5696865, 58),
        new GymPokemon('Excadrill', 6896865, 58),
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
        new GymPokemon('Swoobat', 5826275, 58),
        new GymPokemon('Skarmory', 5826275, 58),
        new GymPokemon('Sigilyph', 5826275, 58),
        new GymPokemon('Swanna', 7026275, 58),
    ],
    BadgeEnums.Jet,
    7600,
    'You\'re an amazing Pokémon Trainer. My Pokémon and I are happy because for the first time in quite a while--about two years, I\'d say--we could fight with our full strength. This is an official League Gym Badge. But this is just a stepping-stone.',
    [new GymBadgeRequirement(BadgeEnums.Quake)],
    () => {
        App.game.quests.getQuestLine('Quest for the DNA Splicers').beginQuest();
    }
);
GymList['Opelucid City'] = new Gym(
    'Drayden',
    'Opelucid City',
    [
        new GymPokemon('Druddigon', 6638173, 58),
        new GymPokemon('Flygon', 6638173, 58),
        new GymPokemon('Altaria', 6638173, 58),
        new GymPokemon('Haxorus', 7838173, 58),
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
        new GymPokemon('Wailord', 6922478, 58),
        new GymPokemon('Mantine', 6922478, 58),
        new GymPokemon('Carracosta', 6922478, 58),
        new GymPokemon('Jellicent', 8122478, 58),
    ],
    BadgeEnums.Wave,
    27000,
    'You don\'t just look strong, you\'re strong fo\' reals! Eh, I was swept away, too! Oh yeah, yo. I was so surprised that I forgot! I gotta give this to you!',
    [new GymBadgeRequirement(BadgeEnums.Legend)]
);

//Unova Elite 4
//TODO: Balancing of elite Pokemon HP & rewards.
GymList['Elite Shauntal'] = new Gym(
    'Shauntal',
    'Elite Shauntal',
    [
        new GymPokemon('Cofagrigus', 5710972, 49),
        new GymPokemon('Gengar', 5710972, 49),
        new GymPokemon('Froslass', 5710972, 50),
        new GymPokemon('Drifblim', 5710972, 51),
        new GymPokemon('Golurk', 5710972, 53),
        new GymPokemon('Chandelure', 7210972, 53),
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
        new GymPokemon('Throh', 5740620, 49),
        new GymPokemon('Sawk', 5740620, 49),
        new GymPokemon('Lucario', 5740620, 50),
        new GymPokemon('Mienshao', 5740620, 51),
        new GymPokemon('Machamp', 5740620, 51),
        new GymPokemon('Conkeldurr', 7240620, 53),
    ],
    BadgeEnums.Elite_Marshal,
    32000,
    'Whew! Well done! As your battles continue, aim for even greater heights!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Shauntal)]
);
GymList['Elite Grimsley'] = new Gym(
    'Grimsley',
    'Elite Grimsley',
    [
        new GymPokemon('Honchkrow', 5770268, 49),
        new GymPokemon('Scrafty', 5770268, 49),
        new GymPokemon('Krookodile', 5770268, 50),
        new GymPokemon('Houndoom', 5770268, 51),
        new GymPokemon('Tyranitar', 5770268, 51),
        new GymPokemon('Bisharp', 7270268, 53),
    ],
    BadgeEnums.Elite_Grimsley,
    32000,
    'Whether or not you get to fight at full strength, whether or not luck smiles on you--none of that matters. Only results matter. And a loss is a loss. See, victory shines like a bright light. And right now, you and your Pokémon are shining brilliantly.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Marshal)]
);
GymList['Elite Caitlin'] = new Gym(
    'Caitlin',
    'Elite Caitlin',
    [
        new GymPokemon('Musharna', 5799916, 49),
        new GymPokemon('Alakazam', 5799916, 49),
        new GymPokemon('Gothitelle', 5799916, 51),
        new GymPokemon('Gallade', 5799916, 51),
        new GymPokemon('Reuniclus', 5799916, 50),
        new GymPokemon('Metagross', 7299916, 53),
    ],
    BadgeEnums.Elite_Caitlin,
    32000,
    'You and your Pokémon are both excellent and elegant. To have been able to battle against such a splendid team... My Pokémon and I learned a lot! I offer you my thanks',
    [new GymBadgeRequirement(BadgeEnums.Elite_Grimsley)]
);

// Unova Champion
GymList['Champion Iris'] = new Champion(
    'Iris',
    'Champion Iris',
    [
        new GymPokemon('Hydreigon', 4907969, 58),
        new GymPokemon('Salamence', 4907969, 58),
        new GymPokemon('Aggron', 4907969, 58),
        new GymPokemon('Archeops', 4907969, 60),
        new GymPokemon('Lapras', 4907969, 58),
        new GymPokemon('Haxorus', 6107969, 62),
    ],
    BadgeEnums.Elite_UnovaChampion,
    64000,
    'I\'m upset I couldn\'t win! But you know what? More than that, I\'m happy! I mean, come on. By having a serious battle, you and your Pokémon, and me and my Pokémon, we all got to know one another better than before! Yep, we sure did! OK, let\'s go!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Caitlin)]
);

//Kalos Gyms
//TODO: Balancing of gym Pokemon HP & rewards.
GymList['Santalune City'] = new Gym(
    'Viola',
    'Santalune City',
    [
        new GymPokemon('Surskit', 16589321, 10),
        new GymPokemon('Vivillon (Meadow)', 21226969, 12),
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
        new GymPokemon('Amaura', 18236578, 25),
        new GymPokemon('Tyrunt', 24585152, 25),
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
        new GymPokemon('Mienfoo', 13981504, 29),
        new GymPokemon('Machoke', 13981504, 28),
        new GymPokemon('Hawlucha', 16358412, 32),
    ],
    BadgeEnums.Rumble,
    3800,
    'Oh! I have been defeated! Alack, alay! Lady Korrina gave a terrible display! This is it. I must give up my title and admit that your strength far exceeds-- Just teasing! But here\'s your Badge. Boy, you\'ll be rolling in \'em soon!',
    [new GymBadgeRequirement(BadgeEnums.Cliff)]
);
GymList['Coumarine City'] = new Gym(
    'Ramos',
    'Coumarine City',
    [
        new GymPokemon('Jumpluff', 14049381, 30),
        new GymPokemon('Weepinbell', 14049382, 31),
        new GymPokemon('Gogoat', 16984237, 34),
    ],
    BadgeEnums.Plant,
    5500,
    'Yeh believe in yer Pokémon... And they believe in yeh, too... Mighty oaks from acorns grow. Go on, then. Yeh\'ve earned it. Here\'s yer own Plant Badge, sprout.',
    [new GymBadgeRequirement(BadgeEnums.Rumble)]
);
GymList['Lumiose City'] = new Gym(
    'Clemont',
    'Lumiose City',
    [
        new GymPokemon('Emolga', 14552954, 35),
        new GymPokemon('Magneton', 14552954, 35),
        new GymPokemon('Heliolisk', 17523852, 37),
    ],
    BadgeEnums.Voltage,
    9000,
    'Oh, Bonnie... When will you learn there\'s no shame in losing? I\'m glad whenever I get to learn something new thanks to strong challengers like you here.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Kalos Power Plant'))]
);
GymList['Laverre City'] = new Gym(
    'Valerie',
    'Laverre City',
    [
        new GymPokemon('Mawile', 14574768, 38),
        new GymPokemon('Mr. Mime', 14574768, 38),
        new GymPokemon('Sylveon', 18265474, 42),
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
        new GymPokemon('Sigilyph', 15488198, 44),
        new GymPokemon('Slowking', 15488199, 45),
        new GymPokemon('Meowstic', 18842113, 48),
    ],
    BadgeEnums.Psychic,
    30000,
    'Now, the Psychic Badge. A testament to your skill. Proof of your power.',
    [new GymBadgeRequirement(BadgeEnums.Fairy)]
);
GymList['Snowbelle City'] = new Gym(
    'Wulfric',
    'Snowbelle City',
    [
        new GymPokemon('Abomasnow', 16431416, 56),
        new GymPokemon('Cryogonal', 16431417, 55),
        new GymPokemon('Avalugg', 19431418, 59),
    ],
    BadgeEnums.Iceberg,
    52000,
    'Impressive! Your Pokémon fought with great courage. I can tell that you\'ve trained your Pokémon well.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokémon Village'))],
    () => {
        App.game.quests.getQuestLine('The Great Vivillon Hunt!').beginQuest();
    }
);
//Kalos Elite 4
//TODO: Balancing of elite Pokemon HP & rewards.
GymList['Elite Malva'] = new Gym(
    'Malva',
    'Elite Malva',
    [
        new GymPokemon('Pyroar', 12283920, 63),
        new GymPokemon('Torkoal', 12283920, 63),
        new GymPokemon('Chandelure', 12283920, 63),
        new GymPokemon('Talonflame', 16283920, 65),
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
        new GymPokemon('Clawitzer', 12471983, 63),
        new GymPokemon('Gyarados', 12471983, 63),
        new GymPokemon('Starmie', 12471983, 63),
        new GymPokemon('Barbaracle', 16471983, 65),
    ],
    BadgeEnums.Elite_Siebold,
    64000,
    'I shall store my memory of you and your Pokémon forever away within my heart.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Malva)]
);
GymList['Elite Wikstrom'] = new Gym(
    'Wikstrom',
    'Elite Wikstrom',
    [
        new GymPokemon('Klefki', 12660045, 63),
        new GymPokemon('Probopass', 12660045, 63),
        new GymPokemon('Scizor', 12660045, 63),
        new GymPokemon('Aegislash', 16660045, 65),
    ],
    BadgeEnums.Elite_Wikstrom,
    64000,
    'Glorious! The trust that you share with your honorable Pokémon surpasses even mine!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Siebold)]
);
GymList['Elite Drasna'] = new Gym(
    'Drasna',
    'Elite Drasna',
    [
        new GymPokemon('Dragalge', 12848108, 63),
        new GymPokemon('Druddigon', 12848108, 63),
        new GymPokemon('Altaria', 12848108, 63),
        new GymPokemon('Noivern', 16848108, 65),
    ],
    BadgeEnums.Elite_Drasna,
    64000,
    'Oh, dear me. That sure was a quick battle... I do hope you\'ll come back again sometime!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Wikstrom)]
);

// Kalos Champion
GymList['Champion Diantha'] = new Champion(
    'Diantha',
    'Champion Diantha',
    [
        new GymPokemon('Hawlucha', 9157444, 64),
        new GymPokemon('Tyrantrum', 9157444, 65),
        new GymPokemon('Aurorus', 9157444, 65),
        new GymPokemon('Gourgeist', 9157444, 65),
        new GymPokemon('Goodra', 9157444, 66),
        new GymPokemon('Mega Gardevoir', 10357444, 68),
    ],
    BadgeEnums.Elite_KalosChampion,
    128000,
    'Witnessing the noble spirits of you and your Pokémon in battle has really touched my heart...',
    [new GymBadgeRequirement(BadgeEnums.Elite_Drasna)]
);

//Alola Gyms
//TODO: Balancing of gym Pokemon HP & rewards.
GymList['Iki Town'] = new Gym(
    'Hala',
    'Iki Town',
    [
        new GymPokemon('Machop', 17615450, 15),
        new GymPokemon('Makuhita', 17615450, 15),
        new GymPokemon('Crabrawler', 23615450, 16),
    ],
    BadgeEnums.FightiniumZ,
    128000,
    'The results come as no surprise to me. What a fine Trainer...and what fine Pokémon, too!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Melemele Meadow'))]
);
GymList['Konikoni City'] = new Gym(
    'Olivia',
    'Konikoni City',
    [
        new GymPokemon('Anorith', 20143374, 27),
        new GymPokemon('Lileep', 20143374, 27),
        new GymPokemon('Lycanroc (Midnight)', 26143374, 28),
    ],
    BadgeEnums.RockiumZ,
    128000,
    'How lovely.',
    [new RouteKillRequirement(10, GameConstants.Region.alola, 9)],
    () => {
        App.game.quests.getQuestLine('Eater of Light').beginQuest();
    }
);
GymList['Malie City'] = new Gym(
    'Nanu',
    'Malie City',
    [
        new GymPokemon('Sableye', 23567627, 43),
        new GymPokemon('Krokorok', 23567627, 43),
        new GymPokemon('Alolan Persian', 29567627, 44),
    ],
    BadgeEnums.DarkiniumZ,
    128000,
    'Hmph...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Po Town'))]
);
GymList['Exeggutor Island'] = new Gym(
    'Hapu',
    'Exeggutor Island',
    [
        new GymPokemon('Golurk', 18266063, 53),
        new GymPokemon('Gastrodon (east)', 18266063, 53),
        new GymPokemon('Flygon', 18266063, 53),
        new GymPokemon('Mudsdale', 26266063, 54),
    ],
    BadgeEnums.GroundiumZ,
    128000,
    'You have succeeded in your final grand trial!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mina\'s Houseboat'))]
);
//trials
GymList['Ilima\'s Trial'] = new Gym(
    'Ilima',
    'Verdant Cavern',
    [
        new GymPokemon('Gumshoos', 2458300, 51),
        new GymPokemon('Smeargle', 2462000, 51),
        new GymPokemon('Komala', 2462000, 51),
    ],
    BadgeEnums.NormaliumZ,
    128000,
    'You have received the Normalium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Lana\'s Trial'] = new Gym(
    'Lana',
    'Brooklet Hill',
    [
        new GymPokemon('Lanturn', 2458300, 51),
        new GymPokemon('Cloyster', 2462000, 51),
        new GymPokemon('Araquanid', 2462000, 51),
    ],
    BadgeEnums.WateriumZ,
    128000,
    'You have received the Waterium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Kiawe\'s Trial'] = new Gym(
    'Kiawe',
    'Wela Volcano Park',
    [
        new GymPokemon('Arcanine', 2458300, 51),
        new GymPokemon('Talonflame', 2462000, 51),
        new GymPokemon('Alolan Marowak', 2462000, 51),
    ],
    BadgeEnums.FiriumZ,
    128000,
    'You have received the Firium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Mallow\'s Trial'] = new Gym(
    'Mallow',
    'Lush Jungle',
    [
        new GymPokemon('Trevenant', 2458300, 51),
        new GymPokemon('Shiinotic', 2462000, 51),
        new GymPokemon('Tsareena', 2462000, 51),
    ],
    BadgeEnums.GrassiumZ,
    128000,
    'You have received the Grassium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Sophocles\' Trial'] = new Gym(
    'Sophocles',
    'Hokulani Observatory',
    [
        new GymPokemon('Togedemaru', 2458300, 51),
        new GymPokemon('Magnezone', 2462000, 51),
        new GymPokemon('Alolan Golem', 2462000, 51),
    ],
    BadgeEnums.ElectriumZ,
    128000,
    'You have received the Electrium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Acerola\'s Trial'] = new Gym(
    'Acerola',
    'Thrifty Megamart',
    [
        new GymPokemon('Haunter', 2458300, 51),
        new GymPokemon('Gengar', 2462000, 51),
        new GymPokemon('Mimikyu', 2462000, 51),
    ],
    BadgeEnums.GhostiumZ,
    128000,
    'You have received the Ghostium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Vast Poni Canyon Trial'] = new Gym(
    'Totem Kommo-o',
    'Vast Poni Canyon',
    [
        new GymPokemon('Jangmo-o', 2458300, 51),
        new GymPokemon('Hakamo-o', 2462000, 51),
        new GymPokemon('Kommo-o', 2462000, 51),
    ],
    BadgeEnums.DragoniumZ,
    128000,
    'You have received the Dragonium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);
GymList['Mina\'s Trial'] = new Gym(
    'Mina',
    'Mina\'s Houseboat',
    [
        new GymPokemon('Pelipper', 2458300, 51),
        new GymPokemon('Chansey', 2462000, 51),
        new GymPokemon('Ribombee', 2462000, 51),
    ],
    BadgeEnums.FairiumZ,
    128000,
    'You have received the Fairium-Z!',
    undefined,
    undefined,
    {
        quest: false,
        achievement: false,
    }
);

//Alola Elite 4
//TODO: Balancing of elite Pokemon HP & rewards.
GymList['Elite Molayne'] = new Gym(
    'Molayne',
    'Elite Molayne',
    [
        new GymPokemon('Klefki', 14257378, 56),
        new GymPokemon('Bisharp', 14257378, 56),
        new GymPokemon('Magnezone', 14257378, 56),
        new GymPokemon('Metagross', 14257378, 56),
        new GymPokemon('Alolan Dugtrio', 24257378, 57),
    ],
    BadgeEnums.Elite_Molayne,
    64000,
    'That Kukui... He certainly found an interesting Trainer for me to face!',
    [new GymBadgeRequirement(BadgeEnums.GroundiumZ)]
);
GymList['Elite Olivia'] = new Gym(
    'Olivia',
    'Elite Olivia',
    [
        new GymPokemon('Armaldo', 14301906, 56),
        new GymPokemon('Cradily', 14301906, 56),
        new GymPokemon('Gigalith', 14301906, 56),
        new GymPokemon('Probopass', 14301906, 56),
        new GymPokemon('Lycanroc (Midnight)', 24301906, 57),
    ],
    BadgeEnums.Elite_Olivia,
    64000,
    'I don\'t see the same look in your eyes that I saw when we first met on Akala Island. Have you had some experiences that you\'ll carry with you in your heart forever? Well, it\'s time for you to move on.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Molayne)]
);
GymList['Elite Acerola'] = new Gym(
    'Acerola',
    'Elite Acerola',
    [
        new GymPokemon('Banette', 14346434, 56),
        new GymPokemon('Drifblim', 14346434, 56),
        new GymPokemon('Dhelmise', 14346434, 56),
        new GymPokemon('Froslass', 14346434, 56),
        new GymPokemon('Palossand', 24346434, 57),
    ],
    BadgeEnums.Elite_Acerola,
    64000,
    'I\'m...I\'m speechless! You\'ve done me in!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Olivia)]
);
GymList['Elite Kahili'] = new Gym(
    'Kahili',
    'Elite Kahili',
    [
        new GymPokemon('Braviary', 14390962, 56),
        new GymPokemon('Hawlucha', 14390962, 56),
        new GymPokemon('Oricorio (Baile)', 14390962, 56),
        new GymPokemon('Mandibuzz', 14390962, 56),
        new GymPokemon('Toucannon', 24390962, 57),
    ],
    BadgeEnums.Elite_Kahili,
    64000,
    'It\'s frustrating to me as a member of the Elite Four, but it seems your strength is the real deal.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Acerola)]
);

// Alola Champion
// TODO: Balancing - Set HP
GymList['Champion Hau'] = new Champion(
    'Hau',
    'Champion Hau',
    [
        new GymPokemon('Alolan Raichu', 12696242, 59),
        new GymPokemon('Tauros', 12696242, 58),
        new GymPokemon('Noivern', 12696242, 58),
        new GymPokemon('Crabominable', 12696242, 59),
    ],
    BadgeEnums.Elite_AlolaChampion,
    100000,
    'We\'re gonna keep moving forward, by staying at full power all the time!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Kahili)],
    // Bulbasaur
    [
        new GymPokemon('Flareon', 12696242, 58),
        new GymPokemon('Primarina', 18696242, 60),
    ],
    // Charmander
    [
        new GymPokemon('Vaporeon', 12696242, 58),
        new GymPokemon('Decidueye', 18696242, 60),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Leafeon', 12696242, 58),
        new GymPokemon('Incineroar', 18696242, 60),
    ]
);


//Galar Leaders
//TODO Addition of G-Max forms?
GymList['Turffield'] = new Gym(
    'Milo',
    'Turffield',
    [
        new GymPokemon('Gossifleur', 40466361, 19),
        new GymPokemon('Eldegoss', 42596169, 20),
    ],
    BadgeEnums.Galar_Grass,
    40000,
    'The power of Grass has wilted... What an incredible Gym Challenger!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 4)]
);
GymList['Hulbury'] = new Gym(
    'Nessa',
    'Hulbury',
    [
        new GymPokemon('Goldeen', 47607484, 22),
        new GymPokemon('Arrokuda', 48108615, 23),
        new GymPokemon('Drednaw', 50113141, 24),
    ],
    BadgeEnums.Galar_Water,
    60000,
    'I may proudly be the strongest member of this Gym, but I was totally washed away!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 5)]
);
GymList['Motostoke'] = new Gym(
    'Kabu',
    'Motostoke',
    [
        new GymPokemon('Ninetales', 56008804, 25),
        new GymPokemon('Arcanine', 56008804, 25),
        new GymPokemon('Centiskorch', 58936636, 27),
    ],
    BadgeEnums.Galar_Fire,
    60000,
    'I\'m often regarded as the first real roadblock of the Gym Challenge, and yet you defeated me! Clearly, your talent surpassed my many years of experience. I still have much to learn!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 13)]
);
GymList['Stow-on-Side1'] = new Gym(
    'Bea',
    'Stow-on-Side1',
    [
        new GymPokemon('Hitmontop', 65892712, 34),
        new GymPokemon('Pangoro', 65892712, 34),
        new GymPokemon('Sirfetch\'d', 66586319, 35),
        new GymPokemon('Machamp', 69360749, 36),
    ],
    BadgeEnums.Galar_Fighting,
    80000,
    'Your strength nearly made me want to turn and run in my bare feet',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
GymList['Stow-on-Side2'] = new Gym(
    'Allister',
    'Stow-on-Side2',
    [
        new GymPokemon('Galarian Yamask', 65892712, 34),
        new GymPokemon('Mimikyu', 65892712, 34),
        new GymPokemon('Cursola', 66586319, 35),
        new GymPokemon('Gengar', 69360749, 36),
    ],
    BadgeEnums.Galar_Ghost,
    80000,
    'Maybe my mask... kept me from seeing just how strong you really are...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
GymList['Ballonlea'] = new Gym(
    'Opal',
    'Ballonlea',
    [
        new GymPokemon('Galarian Weezing', 71622513, 36),
        new GymPokemon('Mawile', 71622513, 36),
        new GymPokemon('Togekiss', 73130355, 37),
        new GymPokemon('Alcremie (Strawberry Vanilla)', 75392119, 38),
    ],
    BadgeEnums.Galar_Fairy,
    80000,
    'Your pink is still lacking, but you\'re an excellent Trainer with some excellent Pokémon.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glimwood Tangle'))]
);
GymList['Circhester1'] = new Gym(
    'Gordie',
    'Circhester1',
    [
        new GymPokemon('Barbaracle', 84261781, 40),
        new GymPokemon('Shuckle', 84261781, 40),
        new GymPokemon('Stonjourner', 86035713, 41),
        new GymPokemon('Coalossal', 88696611, 42),
    ],
    BadgeEnums.Galar_Rock,
    80000,
    'I just want to climb into a hole... Well, I guess it\'d be more like falling from here.',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 18)]
);
GymList['Circhester2'] = new Gym(
    'Melony',
    'Circhester2',
    [
        new GymPokemon('Frosmoth', 84261781, 40),
        new GymPokemon('Galarian Darmanitan', 84261781, 40),
        new GymPokemon('Eiscue', 86035713, 41),
        new GymPokemon('Lapras', 88696611, 42),
    ],
    BadgeEnums.Galar_Ice,
    80000,
    'I think you took breaking the ice a little too literally...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 18)]
);
GymList['Spikemuth'] = new Gym(
    'Piers',
    'Spikemuth',
    [
        new GymPokemon('Scrafty', 99141007, 44),
        new GymPokemon('Malamar', 100184597, 45),
        new GymPokemon('Skuntank', 100184597, 45),
        new GymPokemon('Obstagoon', 104348955, 46),
    ],
    BadgeEnums.Galar_Dark,
    96000,
    'Me an\' my team gave it our best. Let\'s meet up again for a battle some time...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 22)]
);
GymList['Hammerlocke'] = new Gym(
    'Raihan',
    'Hammerlocke',
    [
        new GymPokemon('Gigalith', 111645278, 46),
        new GymPokemon('Flygon', 112820492, 47),
        new GymPokemon('Sandaconda', 111645278, 46),
        new GymPokemon('Duraludon', 117521346, 48),
    ],
    BadgeEnums.Galar_Dragon,
    128000,
    'I might have lost, but I still look good. Maybe I should snap a quick selfie...',
    [
        new RouteKillRequirement(10, GameConstants.Region.galar, 22),
        new GymBadgeRequirement(BadgeEnums.Galar_Dark),
    ]
);
GymList['Trainer Marnie'] = new Gym(
    'Marnie',
    'Trainer Marnie',
    [
        new GymPokemon('Liepard', 117521346, 47),
        new GymPokemon('Toxicroak', 117521346, 47),
        new GymPokemon('Scrafty', 117521346, 47),
        new GymPokemon('Morpeko', 127967688, 48),
        new GymPokemon('Grimmsnarl', 130579274, 49),
    ],
    BadgeEnums.Elite_Marnie,
    150000,
    'I mean, If you\'re gonna win, you could at least win in a way that makes me look good, right?',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower'))]
);
GymList['Gym Leader Bede'] = new Gym(
    'Bede',
    'Gym Leader Bede',
    [
        new GymPokemon('Mawile', 117521346, 51),
        new GymPokemon('Sylveon', 117521346, 51),
        new GymPokemon('Gardevoir', 117521346, 51),
        new GymPokemon('Galarian Rapidash', 127967688, 52),
        new GymPokemon('Hatterene', 130579274, 53),
    ],
    BadgeEnums.Elite_Bede,
    150000,
    'I couldn\'t win, but at least I was able to show everyone how great Fairy types are.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Marnie)]
);
GymList['Trainer Hop'] = new Gym(
    'Hop',
    'Trainer Hop',
    [
        new GymPokemon('Dubwool', 130579274, 59),
        new GymPokemon('Cramorant', 117521346, 58),
        new GymPokemon('Pincurchin', 117521346, 58),
        new GymPokemon('Snorlax', 117521346, 58),
        new GymPokemon('Corviknight', 130579274, 59),
        new GymPokemon('Inteleon', 137833678, 60),
    ],
    BadgeEnums.Elite_Hop,
    200000,
    'Thanks, mate. I\'m really glad you were the one here with me.',
    [new GymBadgeRequirement(BadgeEnums.Elite_Bede)]
    // TODO: Add ability to change gym leaders pokemon based on your starter
    // Bulbasaur
    // [new GymPokemon('Inteleon', 137833678, 60)],
    // Charmander
    // [new GymPokemon('Rillaboom', 137833678, 60)],
    // Squirtle/Pikachu
    // [new GymPokemon('Cinderace', 137833678, 60)]
);
// Galar Champion
//TODO: rewards/hp rebalance
GymList['Champion Leon'] = new Champion(
    'Leon',
    'Champion Leon',
    [
        new GymPokemon('Aegislash', 130579274, 62),
        new GymPokemon('Dragapult', 130579274, 62),
        new GymPokemon('Haxorus', 130579274, 63),
    ],
    BadgeEnums.Elite_GalarChampion,
    250000,
    'My time as Champion is over... But what a champion time it\'s been! Thank you for the greatest battle I\'ve ever had!',
    [new GymBadgeRequirement(BadgeEnums.Elite_Hop)],
    // Bulbasaur
    [
        new GymPokemon('Seismitoad', 133481036, 64),
        new GymPokemon('Cinderace', 137833678, 64),
        new GymPokemon('Charizard', 145088083, 65),
    ],
    // Charmander
    [
        new GymPokemon('Mr. Rime', 133481036, 64),
        new GymPokemon('Inteleon', 137833678, 64),
        new GymPokemon('Charizard', 145088083, 65),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Rhyperior', 133481036, 64),
        new GymPokemon('Rillaboom', 137833678, 64),
        new GymPokemon('Charizard', 145088083, 65),
    ]
);

// Armor + crown gyms
GymList['Gym Leader Klara'] = new Gym(
    'Klara',
    'Gym Leader Klara',
    [
        new GymPokemon('Galarian Slowking', 144036193, 68),
        new GymPokemon('Galarian Weezing', 144036193, 68),
        new GymPokemon('Drapion', 144036193, 68),
        new GymPokemon('Scolipede', 147068434, 69),
        new GymPokemon('Galarian Slowbro', 151617045, 70),
    ],
    BadgeEnums.Elite_ArmorPoison,
    150000,
    'Aww, come on! What a drag! But...I guess it was also kinda fun!',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Darkness')),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tower of Water')),
        ]),
    ]
);
GymList['Gym Leader Avery'] = new Gym(
    'Avery',
    'Gym Leader Avery',
    [
        new GymPokemon('Galarian Slowbro', 144036193, 68),
        new GymPokemon('Swoobat', 144036193, 68),
        new GymPokemon('Galarian Rapidash', 144036193, 68),
        new GymPokemon('Alakazam', 147068434, 69),
        new GymPokemon('Galarian Slowking', 151617045, 70),
    ],
    BadgeEnums.Elite_ArmorPsychic,
    150000,
    'More! I require more! Show me your Stored Power!',
    [new GymBadgeRequirement(BadgeEnums.Elite_ArmorPoison)]
);
GymList['Dojo Master Mustard'] = new Gym(
    'Mustard',
    'Dojo Master Mustard',
    [
        new GymPokemon('Mienshao', 151617046, 73),
        new GymPokemon('Luxray', 151617046, 73),
        new GymPokemon('Lycanroc (Midday)', 154808984, 75),
        new GymPokemon('Kommo-o', 154808984, 75),
        new GymPokemon('Urshifu (Single Strike)', 159596891, 75),
        new GymPokemon('Urshifu (Rapid Strike)', 159596891, 75),
    ],
    BadgeEnums.Elite_ArmorChampion,
    250000,
    'That strength of yours doesn\'t bend easily!',
    [new GymBadgeRequirement(BadgeEnums.Elite_ArmorPsychic)]
);
GymList['Trainer Peony'] = new Gym(
    'Freezington',
    'Trainer Peony',
    [
        new GymPokemon('Perrserker', 197029616, 74),
        new GymPokemon('Bronzong', 192967150, 73),
        new GymPokemon('Scizor', 192967150, 73),
        new GymPokemon('Aggron', 197029616, 74),
        new GymPokemon('Copperajah', 203123316, 74),
    ],
    BadgeEnums.Elite_CrownChampion,
    250000,
    'Gone and got stronger again, have you? Ah well! Hats off to you-in more ways than one!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Crown Shrine'))]
);
