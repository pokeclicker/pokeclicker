///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>
///<reference path="../achievements/OneFromManyRequirement.ts"/>

/**
 * Data list that contains all gymLeaders, accessible by townName.
 */
const gymList: { [townName: string]: Gym } = {};

/**
 * Gym class.
 */
class Gym {
    constructor(
        public leaderName: string,
        public town: string,
        public pokemons: GymPokemon[],
        public badgeReward: BadgeCase.Badge,
        public moneyReward: number,
        public defeatMessage: string,
        public requirements: (OneFromManyRequirement | Requirement)[] = [],
        public rewardFunction = () => {}
    ) {}

    public static isUnlocked(gym: Gym): boolean {
        return gym.requirements.every(requirement => requirement.isCompleted());
    }

    public static calculateCssClass(gym: Gym): KnockoutComputed<string> {
        return ko.pureComputed(() => {
            if (App.game.badgeCase.hasBadge(gym.badgeReward)) {
                return 'btn btn-success';
            }
            return 'btn btn-secondary';
        });
    }

    public static getLeaderByBadge(badge: BadgeCase.Badge): string {
        for (const item in gymList) {
            const gym = gymList[item];
            if (BadgeCase.Badge[gym.badgeReward] == BadgeCase.Badge[BadgeCase.Badge[badge]]) {
                return gym.leaderName;
            }
        }
        return 'Brock';
    }

    public firstWinReward() {
        // Give the player this gyms badge
        App.game.badgeCase.gainBadge(this.badgeReward);
        // Show the badge modal
        $('#receiveBadgeModal').modal('show');
        // Run the first time reward function
        this.rewardFunction();
    }
}

// Kanto Gyms
gymList['Pewter City'] = new Gym(
    'Brock',
    'Pewter City',
    [
        new GymPokemon('Geodude', 770, 12),
        new GymPokemon('Onix', 1554, 14),
    ],
    BadgeCase.Badge.Boulder,
    250,
    'I took you for granted, and so I lost. As proof of your victory, I confer on you this...the official Pokémon League Boulder Badge.',
    [new RouteKillRequirement(10, 2)]
);

gymList['Cerulean City'] = new Gym(
    'Misty',
    'Cerulean City',
    [
        new GymPokemon('Staryu', 4000, 18),
        new GymPokemon('Starmie', 6800, 21),
    ],
    BadgeCase.Badge.Cascade,
    500,
    "Wow! You're too much, all right! You can have the Cascade Badge to show that you beat me.",
    [new RouteKillRequirement(10, 4)]
);
gymList['Vermillion City'] = new Gym(
    'Lt. Surge',
    'Vermillion City',
    [
        new GymPokemon('Voltorb', 10780, 21),
        new GymPokemon('Pikachu', 13540, 18),
        new GymPokemon('Raichu', 15675, 24),
    ],
    BadgeCase.Badge.Thunder,
    1000,
    "Now that's a shocker! You're the real deal, kid! Fine, then, take the Thunder Badge!",
    [
        new RouteKillRequirement(10, 6),
        new GymBadgeRequirement(BadgeCase.Badge.Cascade),
    ]
);
gymList['Celadon City'] = new Gym(
    'Erika',
    'Celadon City',
    [
        new GymPokemon('Victreebel', 38810, 29),
        new GymPokemon('Tangela', 30340, 24),
        new GymPokemon('Vileplume', 36400, 29),
    ],
    BadgeCase.Badge.Rainbow,
    1500,
    'Oh! I concede defeat. You are remarkably strong. I must confer on you the Rainbow Badge.',
    [new RouteKillRequirement(10, 8)]
);
gymList['Saffron City'] = new Gym(
    'Sabrina',
    'Saffron City',
    [
        new GymPokemon('Kadabra', 23040, 38),
        new GymPokemon('Mr. Mime', 25600, 37),
        new GymPokemon('Venomoth', 28400, 38),
        new GymPokemon('Alakazam', 35380, 43),
    ],
    BadgeCase.Badge.Marsh,
    2500,
    'This loss shocks me! But a loss is a loss. I admit I didn\'t work hard enough to win. You earned the Marsh Badge.',
    [new GymBadgeRequirement(BadgeCase.Badge.Rainbow)]
);
gymList['Fuchsia City'] = new Gym(
    'Koga',
    'Fuchsia City',
    [
        new GymPokemon('Koffing', 30780, 38),
        new GymPokemon('Muk', 32460, 37),
        new GymPokemon('Koffing', 36540, 38),
        new GymPokemon('Weezing', 37430, 43),
    ],
    BadgeCase.Badge.Soul,
    3500,
    'Humph! You have proven your worth! Here! Take the Soul Badge!',
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 18),
            new RouteKillRequirement(10, 15),
        ]),
    ]
);
gymList['Cinnabar Island'] = new Gym(
    'Blaine',
    'Cinnabar Island',
    [
        new GymPokemon('Growlithe', 37430, 42),
        new GymPokemon('Ponyta', 42340, 40),
        new GymPokemon('Rapidash', 45230, 42),
        new GymPokemon('Arcanine', 50290, 47),
    ],
    BadgeCase.Badge.Volcano,
    5000,
    'I have burned down to nothing! Not even ashes remain! You have earned the Volcano Badge.',
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Pokemon Mansion'))]
);
gymList['Viridian City'] = new Gym(
    'Giovanni',
    'Viridian City',
    [
        new GymPokemon('Rhyhorn', 45230, 45),
        new GymPokemon('Dugtrio', 47530, 42),
        new GymPokemon('Nidoqueen', 48740, 44),
        new GymPokemon('Nidoking', 48350, 45),
        new GymPokemon('Rhydon', 55000, 50),
    ],
    BadgeCase.Badge.Earth,
    6000,
    'Ha! That was a truly intense fight. You have won! As proof, here is the Earth Badge!',
    [
        new GymBadgeRequirement(BadgeCase.Badge.Volcano),
        new GymBadgeRequirement(BadgeCase.Badge.Marsh),
        new GymBadgeRequirement(BadgeCase.Badge.Thunder),
    ]
);

// Kanto Elite 4
gymList['Elite Lorelei'] = new Gym(
    'Lorelei',
    'Elite Lorelei',
    [
        new GymPokemon('Dewgong', 45330, 52),
        new GymPokemon('Cloyster', 48300, 51),
        new GymPokemon('Slowbro', 52000, 52),
        new GymPokemon('Jynx', 57000, 54),
        new GymPokemon('Lapras', 60250, 54),
    ],
    BadgeCase.Badge.Elite_Lorelei,
    7500,
    '...Things shouldn\'t be this way!',
    [new GymBadgeRequirement(BadgeCase.Badge.Earth)]
);
gymList['Elite Bruno'] = new Gym(
    'Bruno',
    'Elite Bruno',
    [
        new GymPokemon('Onix', 45330, 51),
        new GymPokemon('Hitmonchan', 48300, 53),
        new GymPokemon('Hitmonlee', 52000, 53),
        new GymPokemon('Onix', 57000, 54),
        new GymPokemon('Machamp', 60250, 56),
    ],
    BadgeCase.Badge.Elite_Bruno,
    7500,
    'Why? How could I lose?',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Lorelei)]
);
gymList['Elite Agatha'] = new Gym(
    'Agatha',
    'Elite Agatha',
    [
        new GymPokemon('Gengar', 45330, 54),
        new GymPokemon('Golbat', 48300, 54),
        new GymPokemon('Haunter', 52000, 53),
        new GymPokemon('Arbok', 57000, 56),
        new GymPokemon('Gengar', 60250, 58),
    ],
    BadgeCase.Badge.Elite_Agatha,
    7500,
    'Oh, my! You\'re something special, child!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Bruno)]
);
gymList['Elite Lance'] = new Gym(
    'Lance',
    'Elite Lance',
    [
        new GymPokemon('Gyarados', 48300, 56),
        new GymPokemon('Dragonair', 52000, 54),
        new GymPokemon('Dragonair', 57000, 54),
        new GymPokemon('Aerodactyl', 60250, 58),
        new GymPokemon('Dragonite', 66000, 60),
    ],
    BadgeCase.Badge.Elite_Lance,
    7500,
    'That’s it! I hate to admit it, but you are a Pokémon master!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Agatha)]
);
//TODO make champion Gym

//Johto Gyms
gymList['Violet City'] = new Gym(
    'Falkner',
    'Violet City',
    [
        new GymPokemon('Pidgey', 108000, 9),
        new GymPokemon('Pidgeotto', 112000, 13),
    ],
    BadgeCase.Badge.Zephyr,
    250,
    '...For pity\'s sake! My dad\'s cherished bird Pokémon... But a defeat is a defeat. All right. Take this official Pokémon League Badge. This one is the Zephyr Badge.',
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Sprout Tower'))]
);
gymList['Azalea Town'] = new Gym(
    'Bugsy',
    'Azalea Town',
    [
        new GymPokemon('Metapod', 103000, 15),
        new GymPokemon('Kakuna', 101500, 15),
        new GymPokemon('Scyther', 119000, 17),
    ],
    BadgeCase.Badge.Hive,
    500,
    'Whoa, amazing! You\'re an expert on Pokémon! My research isn\'t complete yet. OK, you win. Take this Hive Badge.',
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Slowpoke Well'))]
);
gymList['Goldenrod City'] = new Gym(
    'Whitney',
    'Goldenrod City',
    [
        new GymPokemon('Clefairy', 130000, 17),
        new GymPokemon('Miltank', 170000, 19),
    ],
    BadgeCase.Badge.Plain,
    1000,
    '...Sniff... What? What do you want? A badge? Oh, right. I forgot. Here\'s the Plain Badge.',
    [new RouteKillRequirement(10, 34)]
);
gymList['Ecruteak City'] = new Gym(
    'Morty',
    'Ecruteak City',
    [
        new GymPokemon('Gastly', 127000, 21),
        new GymPokemon('Haunter', 128000, 21),
        new GymPokemon('Haunter', 130000, 23),
        new GymPokemon('Gengar', 132000, 25),
    ],
    BadgeCase.Badge.Fog,
    1500,
    'I see... Your journey has taken you to far-away places. And you have witnessed much more than me. I envy you for that... Here is the Fog Badge..',
    [new GymBadgeRequirement(BadgeCase.Badge.Plain)]
);
gymList['Cianwood City'] = new Gym(
    'Chuck',
    'Cianwood City',
    [
        new GymPokemon('Primeape', 177000, 29),
        new GymPokemon('Poliwrath', 183000, 31),
    ],
    BadgeCase.Badge.Storm,
    2500,
    'Here is the Storm Badge. Wahahah! I enjoyed battling you! But a loss is a loss! From now on, I\'m going to train 24 hours a day!',
    [new GymBadgeRequirement(BadgeCase.Badge.Fog)]
);
gymList['Olivine City'] = new Gym(
    'Jasmine',
    'Olivine City',
    [
        new GymPokemon('Magnemite', 177000, 30),
        new GymPokemon('Magnemite', 178000, 30),
        new GymPokemon('Steelix', 182000, 35),
    ],
    BadgeCase.Badge.Mineral,
    3500,
    '...You are a better Trainer than me, in both skill and kindness. In accordance with League rules, I confer upon you this Mineral Badge.',
    [new GymBadgeRequirement(BadgeCase.Badge.Storm)]
);
gymList['Mahogany Town'] = new Gym(
    'Pryce',
    'Mahogany Town',
    [
        new GymPokemon('Seel', 190000, 30),
        new GymPokemon('Dewgong', 192500, 32),
        new GymPokemon('Piloswine', 196000, 34),
    ],
    BadgeCase.Badge.Glacier,
    4000,
    'I am impressed by your prowess. With your strong will, I know you will overcome all life\'s obstacles. You are worthy of this Glacier Badge!',
    [new RouteKillRequirement(10, 43)]
);
gymList['Blackthorn City'] = new Gym(
    'Clair',
    'Blackthorn City',
    [
        new GymPokemon('Dragonair', 205000, 38),
        new GymPokemon('Dragonair', 205000, 38),
        new GymPokemon('Gyarados', 218000, 38),
        new GymPokemon('Kingdra', 220000, 41),
    ],
    BadgeCase.Badge.Rising,
    5000,
    'Here, this is the Rising Badge... Hurry up! Take it!',
    [new GymBadgeRequirement(BadgeCase.Badge.Glacier)]
);

//Johto Elite 4
gymList['Elite Will'] = new Gym(
    'Will',
    'Elite Will',
    [
        new GymPokemon('Xatu', 245330, 40),
        new GymPokemon('Jynx', 248300, 41),
        new GymPokemon('Exeggutor', 252000, 41),
        new GymPokemon('Slowbro', 257000, 41),
        new GymPokemon('Xatu', 260250, 42),
    ],
    BadgeCase.Badge.Elite_Will,
    7500,
    'Even though I was defeated, I won\'t change my course. I will continue battling until I stand above all Trainers! Now move on and experience the true ferocity of the Elite Four.',
    [new GymBadgeRequirement(BadgeCase.Badge.Rising)]
);
gymList['Elite Koga'] = new Gym(
    'Koga2',
    'Elite Koga',
    [
        new GymPokemon('Ariados', 245330, 40),
        new GymPokemon('Venomoth', 248300, 41),
        new GymPokemon('Forretress', 252000, 43),
        new GymPokemon('Muk', 257000, 42),
        new GymPokemon('Crobat', 260250, 44),
    ],
    BadgeCase.Badge.Elite_Koga,
    7500,
    'I subjected you to everything I could muster. But my efforts failed. I must hone my skills. Go on to the next room, and put your abilities to the test!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Will)]
);
gymList['Elite Bruno2'] = new Gym(
    'Bruno2',
    'Elite Bruno2',
    [
        new GymPokemon('Hitmontop', 245330, 42),
        new GymPokemon('Hitmonlee', 248300, 42),
        new GymPokemon('Hitmonchan', 252000, 42),
        new GymPokemon('Onix', 257000, 43),
        new GymPokemon('Machamp', 260250, 46),
    ],
    BadgeCase.Badge.Elite_Bruno2,
    7500,
    'Having lost, I have no right to say anything… Go face your next challenge!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Koga)]
);
gymList['Elite Karen'] = new Gym(
    'Karen',
    'Elite Karen',
    [
        new GymPokemon('Umbreon', 248300, 42),
        new GymPokemon('Vileplume', 252000, 42),
        new GymPokemon('Gengar', 257000, 45),
        new GymPokemon('Murkrow', 260250, 44),
        new GymPokemon('Houndoom', 266000, 47),
    ],
    BadgeCase.Badge.Elite_Karen,
    7500,
    'Strong Pokémon. Weak Pokémon. That is only the selfish perception of people. Truly skilled Trainers should try to win with the Pokémon they love best. I like your style. You understand what\'s important. Go on — — the Champion is waiting.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Bruno2)]
);
gymList['Champion Lance'] = new Gym(
    'Lance2',
    'Champion Lance',
    [
        new GymPokemon('Gyarados', 258300, 44),
        new GymPokemon('Dragonite', 262000, 49),
        new GymPokemon('Dragonite', 264000, 49),
        new GymPokemon('Aerodactyl', 260250, 48),
        new GymPokemon('Dragonite', 270000, 50),
    ],
    BadgeCase.Badge.Elite_JohtoChampion,
    7500,
    '…It\'s over. But it\'s an odd feeling. I\'m not angry that I lost. In fact, I feel happy. Happy that I witnessed the rise of a great new Champion!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Karen)]
);

// Hoenn Gyms
gymList['Rustboro City'] = new Gym(
    'Roxanne',
    'Rustboro City',
    [
        new GymPokemon('Geodude', 282900, 12),
        new GymPokemon('Geodude', 282900, 12),
        new GymPokemon('Nosepass', 310200, 15),
    ],
    BadgeCase.Badge.Stone,
    1000,
    'So… I lost… It seems that I still have much more to learn… I understand.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_JohtoChampion)]
);
gymList['Dewford Town'] = new Gym(
    'Brawly',
    'Dewford Town',
    [
        new GymPokemon('Machop', 324000, 17),
        new GymPokemon('Meditite', 324000, 18),
        new GymPokemon('Makuhita', 344000, 19),
    ],
    BadgeCase.Badge.Knuckle,
    2000,
    'Whoah, wow! You made a much bigger splash than I expected! You swamped me! Okay, you\'ve got me. Take this Gym Badge!',
    []
);
gymList['Mauville City'] = new Gym(
    'Wattson',
    'Mauville City',
    [
        new GymPokemon('Voltorb', 352000, 20),
        new GymPokemon('Electrike', 348000, 20),
        new GymPokemon('Magneton', 383000, 22),
        new GymPokemon('Manectric', 348000, 24),
    ],
    BadgeCase.Badge.Dynamo,
    3000,
    'Wahahahah! Fine, I lost! You ended up giving me a thrill! Take this Badge!',
    []
);
gymList['Lavaridge Town'] = new Gym(
    'Flannery',
    'Lavaridge Town',
    [
        new GymPokemon('Numel', 372000, 24),
        new GymPokemon('Slugma', 372000, 24),
        new GymPokemon('Camerupt', 392000, 26),
        new GymPokemon('Torkoal', 424000, 28),
    ],
    BadgeCase.Badge.Heat,
    4000,
    'Oh... I guess I was trying too hard... I... I\'ve only recently become a Gym Leader. I tried too hard to be someone I\'m not. I have to do things my natural way. If I don\'t, my Pokémon will be confused. Thanks for teaching me that. For that, you deserve this.',
    []
);
gymList['Petalburg City'] = new Gym(
    'Norman',
    'Petalburg City',
    [
        new GymPokemon('Spinda', 390000, 27),
        new GymPokemon('Vigoroth', 430000, 30),
        new GymPokemon('Linoone', 460000, 29),
        new GymPokemon('Slaking', 496000, 31),
    ],
    BadgeCase.Badge.Balance,
    5000,
    '… I… I can\'t… I can\'t believe it. I lost to you? But, rules are rules! Here, take this.',
    [new GymBadgeRequirement(BadgeCase.Badge.Heat)]
);
gymList['Fortree City'] = new Gym(
    'Winona',
    'Fortree City',
    [
        new GymPokemon('Swablu', 405000, 29),
        new GymPokemon('Tropius', 450000, 29),
        new GymPokemon('Pelipper', 430000, 30),
        new GymPokemon('Skarmory', 467000, 32),
        new GymPokemon('Altaria', 469000, 33),
    ],
    BadgeCase.Badge.Feather,
    6000,
    'Never before have I seen a Trainer command Pokémon with more grace than I... In recognition of your prowess, I present to you this Gym Badge.',
    []
);
gymList['Mossdeep City'] = new Gym(
    'Tate & Liza',
    'Mossdeep City',
    [
        new GymPokemon('Xatu', 502000, 41),
        new GymPokemon('Claydol', 503000, 41),
        new GymPokemon('Lunatone', 502000, 42),
        new GymPokemon('Solrock', 503000, 42),
    ],
    BadgeCase.Badge.Mind,
    8000,
    'What? Our combination... Was shattered! It can\'t be helped. You\'ve won... So, in recognition, take this Gym Badge.',
    []
);
gymList['Sootopolis City'] = new Gym(
    'Juan',
    'Sootopolis City',
    [
        new GymPokemon('Luvdisc', 498000, 41),
        new GymPokemon('Whiscash', 513000, 41),
        new GymPokemon('Sealeo', 523400, 43),
        new GymPokemon('Crawdaunt', 542000, 43),
        new GymPokemon('Kingdra', 565000, 46),
    ],
    BadgeCase.Badge.Rain,
    10000,
    'I realize now your authenticity and magnificence as a Pokémon Trainer. I find much joy in having met you and your Pokémon. You have proven yourself worthy of the Rain Badge. Accept it. Having that Badge assures you full obedience of all your Pokémon to every command you make.',
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Sky Pillar'))]
);

// Hoenn Elite 4
gymList['Elite Sidney'] = new Gym(
    'Sidney',
    'Elite Sidney',
    [
        new GymPokemon('Mightyena', 572000, 46),
        new GymPokemon('Cacturne', 580000, 46),
        new GymPokemon('Shiftry', 602000, 48),
        new GymPokemon('Sharpedo', 615000, 48),
        new GymPokemon('Absol', 620000, 49),
    ],
    BadgeCase.Badge.Elite_Sidney,
    15000,
    'Well, how do you like that? I lost! Eh, it was fun, so it doesn\'t matter.',
    [new GymBadgeRequirement(BadgeCase.Badge.Rain)]
);
gymList['Elite Phoebe'] = new Gym(
    'Phoebe',
    'Elite Phoebe',
    [
        new GymPokemon('Dusclops', 636700, 48),
        new GymPokemon('Banette', 638000, 49),
        new GymPokemon('Banette', 638000, 49),
        new GymPokemon('Sableye', 652000, 50),
        new GymPokemon('Dusclops', 663000, 51),
    ],
    BadgeCase.Badge.Elite_Phoebe,
    15000,
    'Oh, darn. I\'ve gone and lost.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Sidney)]
);
gymList['Elite Glacia'] = new Gym(
    'Glacia',
    'Elite Glacia',
    [
        new GymPokemon('Glalie', 672000, 50),
        new GymPokemon('Sealeo', 682000, 50),
        new GymPokemon('Glalie', 676000, 52),
        new GymPokemon('Sealeo', 686000, 52),
        new GymPokemon('Walrein', 700000, 53),
    ],
    BadgeCase.Badge.Elite_Glacia,
    15000,
    'You and your Pokémon... How hot your spirits burn! The all-consuming heat overwhelms. It\'s no surprise that my icy skills failed to harm you.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Phoebe)]
);
gymList['Elite Drake'] = new Gym(
    'Drake',
    'Elite Drake',
    [
        new GymPokemon('Shelgon', 664000, 52),
        new GymPokemon('Altaria', 672000, 54),
        new GymPokemon('Flygon', 676000, 53),
        new GymPokemon('Flygon', 676000, 53),
        new GymPokemon('Salamence', 757000, 55),
    ],
    BadgeCase.Badge.Elite_Drake,
    15000,
    'You deserve every credit for coming this far as a Trainer of Pokémon. You do seem to know what is needed. Yes, what a Trainer needs is a virtuous heart. Pokémon touch the good hearts of Trainers and learn good from wrong. They touch the good hearts of Trainers and grow strong. Go! Go onwards! The Champion is waiting!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Glacia)]
);
gymList['Champion Wallace'] = new Gym(
    'Wallace',
    'Champion Wallace',
    [
        new GymPokemon('Wailord', 802000, 57),
        new GymPokemon('Tentacruel', 764000, 55),
        new GymPokemon('Ludicolo', 784000, 56),
        new GymPokemon('Whiscash', 772000, 56),
        new GymPokemon('Gyarados', 763000, 56),
        new GymPokemon('Milotic', 782000, 58),
    ],
    BadgeCase.Badge.Elite_HoennChampion,
    15000,
    'I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Drake)],
    () => {
        App.game.quests.getQuestLine('Mystery of Deoxys').beginQuest();
    }
);
gymList['Oreburgh City'] = new Gym(
    'Roark',
    'Oreburgh City',
    [
        new GymPokemon('Geodude', 938000, 12),
        new GymPokemon('Onix', 942000, 12),
        new GymPokemon('Cranidos', 942000, 14),
    ],
    BadgeCase.Badge.Coal,
    2500,
    'This is embarrassing... I went and lost to a Trainer who didn\'t have a single Gym Badge... But that\'s tough. You were strong, and I was weak. That\'s all there is. According to Pokémon League rules, I have to give you our Gym Badge since you\'ve beaten me, the Leader. Heres your official Pokémon League Coal Badge.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_HoennChampion)]
);
gymList['Eterna City'] = new Gym(
    'Gardenia',
    'Eterna City',
    [
        new GymPokemon('Turtwig', 1033000, 20),
        new GymPokemon('Cherrim (overcast)', 1037500, 20),
        new GymPokemon('Roserade', 1039000, 22),
    ],
    BadgeCase.Badge.Forest,
    5000,
    'I might\'ve said it before, but you\'re really tough! Wasn\'t it hard for you to raise your Pokémon to be so good? I guess that\'s a measure of how much you love your Pokémon. In recognition of that, I proudly grant you this!"',
    [new GymBadgeRequirement(BadgeCase.Badge.Coal)]
);
gymList['Hearthome City'] = new Gym(
    'Fantina',
    'Hearthome City',
    [
        new GymPokemon('Duskull', 1050000, 24),
        new GymPokemon('Haunter', 1080000, 24),
        new GymPokemon('Mismagius', 1080000, 26),
    ],
    BadgeCase.Badge.Relic,
    10000,
    'I am dumbfounded! So very, very strong! You, your Pokémon, so strong! Your power is admirable! I shall honor it with this Gym Badge!"',
    [new GymBadgeRequirement(BadgeCase.Badge.Forest)]
);
gymList['Veilstone City'] = new Gym(
    'Maylene',
    'Veilstone City',
    [
        new GymPokemon('Meditite', 1137000, 28),
        new GymPokemon('Machoke', 1138000, 29),
        new GymPokemon('Lucario', 1140000, 32),
    ],
    BadgeCase.Badge.Cobble,
    20000,
    '...OK. You win. That was a tough loss. I learned a lot from it. Please, accept this Gym Badge.',
    [new GymBadgeRequirement(BadgeCase.Badge.Relic)]
);
gymList['Pastoria City'] = new Gym(
    'Crasher Wake',
    'Pastoria City',
    [
        new GymPokemon('Gyarados', 1187000, 33),
        new GymPokemon('Quagsire', 1193000, 34),
        new GymPokemon('Floatzel', 1193000, 37),
    ],
    BadgeCase.Badge.Fen,
    40000,
    'It seems the undertow pulled me under... But I had a great time battling with you! You\'ve earned this!',
    [new GymBadgeRequirement(BadgeCase.Badge.Cobble)]
);
gymList['Canalave City'] = new Gym(
    'Byron',
    'Canalave City',
    [
        new GymPokemon('Magneton', 1267000, 37),
        new GymPokemon('Steelix', 1272000, 38),
        new GymPokemon('Magnemite', 1268000, 41),
    ],
    BadgeCase.Badge.Mine,
    80000,
    'You were strong enough to take down my prized team of Pokémon. In recognition of that power, I give you this: the Mine Badge!',
    [new GymBadgeRequirement(BadgeCase.Badge.Fen)]
);
gymList['Snowpoint City'] = new Gym(
    'Candice',
    'Snowpoint City',
    [
        new GymPokemon('Sneasel', 1372500, 40),
        new GymPokemon('Piloswine', 1376000, 40),
        new GymPokemon('Abomasnow', 1370000, 42),
        new GymPokemon('Froslass', 1370000, 44),
    ],
    BadgeCase.Badge.Icicle,
    16000,
    'Wow! You\'re great! You\'ve earned my respect! I think your focus and will bowled us over totally. Oh, that\'s right! I\'m supposed to give you this!',
    [new GymBadgeRequirement(BadgeCase.Badge.Mine)]
);
gymList['Sunyshore City'] = new Gym(
    'Volkner',
    'Sunyshore City',
    [
        new GymPokemon('Jolteon', 1465000, 46),
        new GymPokemon('Raichu', 1465000, 46),
        new GymPokemon('Luxray', 1478000, 48),
        new GymPokemon('Electivire', 1480000, 50),
    ],
    BadgeCase.Badge.Beacon,
    32000,
    '...Hehehe. Hahahah! ...That was the most fun I\'ve had in a battle since...I don\'t know when! It\'s also made me excited to know you and your team will keep battling to greater heights! This is your eighth Gym Badge. You\'ve earned this!',
    [new GymBadgeRequirement(BadgeCase.Badge.Icicle)]
);
gymList['Elite Aaron'] = new Gym(
    'Aaron',
    'Elite Aaron',
    [
        new GymPokemon('Yanmega', 1945330, 49),
        new GymPokemon('Scizor', 1948300, 49),
        new GymPokemon('Vespiquen', 1952000, 50),
        new GymPokemon('Heracross', 1957000, 51),
        new GymPokemon('Drapion', 1960250, 53),
    ],
    BadgeCase.Badge.Elite_Aaron,
    64000,
    'I lost with the most beautiful and toughest of the bug Pokémon... We lost because I wasn\'t good enough... That\'s it! Back to training camp! Let\'s hear it for me! No... That was wrong... Anyway... Go on to the next room! Three Trainers are waiting for you. They are all tougher than me.',
    [new GymBadgeRequirement(BadgeCase.Badge.Beacon)]
);
gymList['Elite Bertha'] = new Gym(
    'Bertha',
    'Elite Bertha',
    [
        new GymPokemon('Whiscash', 2045330, 50),
        new GymPokemon('Gliscor', 2048300, 53),
        new GymPokemon('Golem', 2052000, 52),
        new GymPokemon('Rhyperior', 2057000, 52),
        new GymPokemon('Hippowdon', 2060250, 55),
    ],
    BadgeCase.Badge.Elite_Bertha,
    64000,
    'You\'re quite something, youngster. I like how you and your Pokémon earned the win by working as one. That\'s what makes you so strong. Ahahaha! I think that you can go as far as you want.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Aaron)]
);
gymList['Elite Flint'] = new Gym(
    'Flint',
    'Elite Flint',
    [
        new GymPokemon('Houndoom', 2145330, 52),
        new GymPokemon('Flareon', 2148300, 55),
        new GymPokemon('Rapidash', 2152000, 53),
        new GymPokemon('Infernape', 2157000, 55),
        new GymPokemon('Magmortar', 2160250, 57),
    ],
    BadgeCase.Badge.Elite_Flint,
    64000,
    '...! I don\'t believe it! I lost! I didn\'t take you for granted. Bud I\'d never even considered it! I\'m blown away by this! You and your Pokémon are hot stuff!',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Bertha)]
);
gymList['Elite Lucian'] = new Gym(
    'Lucian',
    'Elite Lucian',
    [
        new GymPokemon('Mr. Mime', 2248300, 53),
        new GymPokemon('Espeon', 2252000, 55),
        new GymPokemon('Bronzong', 2257000, 54),
        new GymPokemon('Alakazam', 2260250, 56),
        new GymPokemon('Gallade', 2266000, 59),
    ],
    BadgeCase.Badge.Elite_Lucian,
    64000,
    'Congratulations. You have beaten the Elite Four. However, that doesn\'t mean you\'re done with the Pokémon league. There remains the Champion. I should warn you—the Champion is far stronger than the Elite Four. Now, go on. Step through the doorway to your final battle.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Flint)]
);
gymList['Champion Cynthia'] = new Gym(
    'Cynthia',
    'Champion Cynthia',
    [
        new GymPokemon('Spiritomb', 2458300, 58),
        new GymPokemon('Roserade', 2462000, 58),
        new GymPokemon('Togekiss', 2464000, 58),
        new GymPokemon('Lucario', 2460250, 60),
        new GymPokemon('Milotic', 2470000, 58),
        new GymPokemon('Garchomp', 2570000, 62),
    ],
    BadgeCase.Badge.Elite_SinnohChampion,
    128000,
    'That was excellent. Truly, an outstanding battle. You gave the support your Pokémon needed to maximize their power. And you guided them with certainty to secure victory. You have both passion and calculating coolness. Together, you and your Pokémon can overcome any challenge that may come your way. Those are the impressions I got from our battle. I\'m glad I got to take part in the crowning of Sinnoh\'s new Champion! Come with me. We\'ll take the lift.',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Lucian)]
);
