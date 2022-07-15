const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

//Kanto Temporary Battles
TemporaryBattleList['Fighting Dojo'] = new TemporaryBattle(
    'Fighting Dojo',
    [
        new GymPokemon('Hitmonlee', 108985, 37),
        new GymPokemon('Hitmonchan', 108985, 37),
    ],
    'Hwa! Arrgh! Beaten!',
    [
        new OneFromManyRequirement([
            new GymBadgeRequirement(BadgeEnums.Rainbow),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rocket Game Corner')),
        ]),
    ],
    undefined,
    {
        firstTimeRewardFunction: () => {
            BagHandler.gainItem({type: ItemType.item, id: 'Fighting_egg'}, 1);
            Notifier.notify({
                message: 'You were awarded a Fighting Egg for defeating the Fighting Dojo',
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        },
    }
);
TemporaryBattleList['Biker Goon 1'] = new TemporaryBattle(
    'Biker Goon 1',
    [
        new GymPokemon('Koffing', 198477, 37),
        new GymPokemon('Grimer', 198477, 37),
    ],
    'Wha... What is this kid?!',
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)]
);
TemporaryBattleList['Biker Goon 2'] = new TemporaryBattle(
    'Biker Goon 2',
    [new GymPokemon('Koffing', 396954, 38)],
    'Stop fooling around!',
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)]
);
TemporaryBattleList['Biker Goon 3'] = new TemporaryBattle(
    'Biker Goon 3',
    [new GymPokemon('Grimer', 396954, 38)],
    '... ... ... ... ... ...',
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 1)]
);
TemporaryBattleList['Cue Ball Paxton'] = new TemporaryBattle(
    'Cue Ball Paxton',
    [
        new GymPokemon('Koffing', 221664, 39),
        new GymPokemon('Grimer', 221664, 39),
    ],
    'All right, enough! We\'ll leave like you wanted! We\'ll be happy to see the last of this boring island!',
    [
        new TemporaryBattleRequirement('Biker Goon 1'),
        new TemporaryBattleRequirement('Biker Goon 2'),
        new TemporaryBattleRequirement('Biker Goon 3'),
    ]
);

// Sinnoh Temporary Battles
TemporaryBattleList['Galactic Boss Cyrus'] = new TemporaryBattle(
    'Galactic Boss Cyrus',
    [
        new GymPokemon('Sneasel', 3255000, 34),
        new GymPokemon('Golbat', 3460000, 34),
        new GymPokemon('Murkrow', 3665000, 36),
    ],
    'Impressive. Your prowess is notable.',
    [new GymBadgeRequirement(BadgeEnums.Fen)]
);

// Kalos Temporary Battles
TemporaryBattleList.AZ = new TemporaryBattle(
    'AZ',
    [
        new GymPokemon('Torkoal', 247996000, 60),
        new GymPokemon('Golurk', 247996000, 60),
        new GymPokemon('Sigilyph', 247996000, 60),
    ],
    'Thank you very much for battling with me. Now I finally feel free…',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(670.05);
        },
    }
);
TemporaryBattleList['Ash Ketchum Kanto'] = new TemporaryBattle(
    'Ash Ketchum Kanto',
    [
        new GymPokemon('Pikachu (Partner cap)', 123998000, 58),
        new GymPokemon('Pidgeot', 123998000, 56),
        new GymPokemon('Bulbasaur', 123998000, 56),
        new GymPokemon('Charizard', 123998000, 60),
        new GymPokemon('Squirtle', 123998000, 62),
        new GymPokemon('Muk', 123998000, 62),
    ],
    'That was a fun battle!',
    [new QuestLineStartedRequirement('The new kid')],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Pallet Town',
    }
);
TemporaryBattleList['Ash Ketchum Johto'] = new TemporaryBattle(
    'Ash Ketchum Johto',
    [
        new GymPokemon('Pikachu (Partner cap)', 123998000, 58),
        new GymPokemon('Heracross', 123998000, 56),
        new GymPokemon('Noctowl', 123998000, 56),
        new GymPokemon('Bayleef', 123998000, 60),
        new GymPokemon('Cyndaquil', 123998000, 62),
        new GymPokemon('Totodile', 123998000, 62),
    ],
    'That was a nice rematch...',
    [new QuestLineStepCompletedRequirement('The new kid', 0), new RouteKillRequirement(10, GameConstants.Region.johto, 48)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Cianwood City',
    }
);
TemporaryBattleList['Ash Ketchum Hoenn'] = new TemporaryBattle(
    'Ash Ketchum Hoenn',
    [
        new GymPokemon('Pikachu (Partner cap)', 123998000, 58),
        new GymPokemon('Swellow', 123998000, 56),
        new GymPokemon('Grovyle', 123998000, 56),
        new GymPokemon('Torkoal', 123998000, 62),
        new GymPokemon('Corphish', 123998000, 60),
        new GymPokemon('Glalie', 123998000, 62),
    ],
    'Are you following me?',
    [new QuestLineStepCompletedRequirement('The new kid', 1)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Lilycove City',
    }
);
TemporaryBattleList['Ash Ketchum Sinnoh'] = new TemporaryBattle(
    'Ash Ketchum Sinnoh',
    [
        new GymPokemon('Pikachu (Partner cap)', 123998000, 58),
        new GymPokemon('Staraptor', 123998000, 56),
        new GymPokemon('Torterra', 123998000, 56),
        new GymPokemon('Infernape', 123998000, 60),
        new GymPokemon('Buizel', 123998000, 62),
        new GymPokemon('Gible', 123998000, 62),
    ],
    'Please leave me alone.',
    [new QuestLineStepCompletedRequirement('The new kid', 2), new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Survival Area',
    }
);
TemporaryBattleList['Ash Ketchum Unova'] = new TemporaryBattle(
    'Ash Ketchum Unova',
    [
        new GymPokemon('Pikachu (Partner cap)', 123998000, 58),
        new GymPokemon('Unfezant', 123998000, 56),
        new GymPokemon('Snivy', 123998000, 62),
        new GymPokemon('Pignite', 123998000, 60),
        new GymPokemon('Oshawott', 123998000, 56),
        new GymPokemon('Krookodile', 123998000, 62),
    ],
    'Stop it!',
    [new QuestLineStepCompletedRequirement('The new kid', 3)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Mistralton City',
    }
);
TemporaryBattleList['Ash Ketchum Kalos'] = new TemporaryBattle(
    'Ash Ketchum Kalos',
    [
        new GymPokemon('Pikachu (Partner cap)', 123998000, 58),
        new GymPokemon('Talonflame', 123998000, 56),
        new GymPokemon('Hawlucha', 123998000, 56),
        new GymPokemon('Goodra', 123998000, 60),
        new GymPokemon('Noivern', 123998000, 62),
        new GymPokemon('Ash Greninja', 123998000, 62),
    ],
    'Will you leave me alone if I give you my Greninja? I was gonna release it anyway.',
    [new QuestLineStepCompletedRequirement('The new kid', 4)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Kiloude City',
    }
);

//Alola Temporary Battles
TemporaryBattleList['Ultra Wormhole'] = new TemporaryBattle(
    'Ultra Wormhole',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
TemporaryBattleList['Ultra Megalopolis'] = new TemporaryBattle(
    'Ultra Megalopolis',
    [new GymPokemon('Necrozma (Ultra)', 282601920, 60)],
    'Necrozma fled.',
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('Mina\'s Trial').beginQuest();
        },
    }
);
TemporaryBattleList['Captain Mina'] = new TemporaryBattle(
    'Captain Mina',
    [
        new GymPokemon('Mawile', 90200640, 51),
        new GymPokemon('Granbull', 90200640, 51),
        new GymPokemon('Ribombee', 102200640, 51),
    ],
    'Woah! I\'m shocked at your strength!',
    [new TemporaryBattleRequirement('Ultra Megalopolis')]
);
TemporaryBattleList['Captain Ilima'] = new TemporaryBattle(
    'Captain Ilima',
    [
        new GymPokemon('Gumshoos', 90200640, 51),
        new GymPokemon('Smeargle', 90200640, 51),
        new GymPokemon('Komala', 102200640, 51),
    ],
    'Yes! You have emerged victorious!',
    [
        new TemporaryBattleRequirement('Captain Mina'),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Hau\'oli Cemetery')),
    ]
);
TemporaryBattleList['Captain Mallow'] = new TemporaryBattle(
    'Captain Mallow',
    [
        new GymPokemon('Trevenant', 90200640, 51),
        new GymPokemon('Shiinotic', 90200640, 51),
        new GymPokemon('Tsareena', 102200640, 51),
    ],
    'Sure enough, when it comes to you and Pokémon, the quality of the ingredients shines forth!',
    [new TemporaryBattleRequirement('Captain Ilima')]
);
TemporaryBattleList['Captain Lana'] = new TemporaryBattle(
    'Captain Lana',
    [
        new GymPokemon('Lanturn', 90200640, 51),
        new GymPokemon('Cloyster', 90200640, 51),
        new GymPokemon('Araquanid', 102200640, 51),
    ],
    'Well! Once again, you certainly reeled me in.',
    [new TemporaryBattleRequirement('Captain Mallow')]
);
TemporaryBattleList['Captain Kiawe'] = new TemporaryBattle(
    'Captain Kiawe',
    [
        new GymPokemon('Arcanine', 90200640, 51),
        new GymPokemon('Talonflame', 90200640, 51),
        new GymPokemon('Alolan Marowak', 102200640, 51),
    ],
    'Not enough dancing!',
    [new TemporaryBattleRequirement('Captain Lana')]
);
TemporaryBattleList['Captain Sophocles'] = new TemporaryBattle(
    'Captain Sophocles',
    [
        new GymPokemon('Togedemaru', 90200640, 51),
        new GymPokemon('Magnezone', 90200640, 51),
        new GymPokemon('Alolan Golem', 102200640, 51),
    ],
    'I couldn\'t get it done. Don\'t worry about it, my precious Pokémon...',
    [new TemporaryBattleRequirement('Captain Kiawe')]
);
TemporaryBattleList['Kahuna Nanu'] = new TemporaryBattle(
    'Kahuna Nanu',
    [
        new GymPokemon('Sableye', 90200640, 51),
        new GymPokemon('Absol', 90200640, 51),
        new GymPokemon('Alolan Persian', 102200640, 51),
    ],
    '...',
    [new TemporaryBattleRequirement('Captain Sophocles')]
);
TemporaryBattleList['Ash Ketchum Alola'] = new TemporaryBattle(
    'Ash Ketchum Alola',
    [
        new GymPokemon('Pikachu (Partner cap)', 182908638, 58),
        new GymPokemon('Rowlet', 182908638, 56),
        new GymPokemon('Incineroar', 182908638, 56),
        new GymPokemon('Lycanroc (Dusk)', 182908638, 60),
        new GymPokemon('Naganadel', 182908638, 62),
        new GymPokemon('Melmetal', 182908638, 62),
    ],
    'Fine. I quit. Take my Pikachu.',
    [new QuestLineCompletedRequirement('The new kid'), new RouteKillRequirement(10, GameConstants.Region.alola, 30)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Seafolk Village',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(25.07);
        },
    }
);

//Galar Temporary Battles
//TODO: Have Hop's starter depend on the players Galar starter
TemporaryBattleList.Hop1 = new TemporaryBattle(
    'Hop1',
    [
        new GymPokemon('Wooloo', 29607662, 3),
        new GymPokemon('Sobble', 30984763, 5),
    ],
    'Well, that was a shock! Guess I know now why Lee thought he should give you a Pokémon, too...',
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TemporaryBattleList.Mirages = new TemporaryBattle(
    'Mirages',
    [
        new GymPokemon('Zacian (Battle Hero)', 34427515, 70),
        new GymPokemon('Zamazenta (Battle Hero)', 34427515, 70),
    ],
    'The Pokémon fled.',
    [new TemporaryBattleRequirement('Hop1')]
);
TemporaryBattleList.Hop2 = new TemporaryBattle(
    'Hop2',
    [
        new GymPokemon('Wooloo', 82626036, 6),
        new GymPokemon('Rookidee', 82626036, 5),
        new GymPokemon('Sobble', 85208099, 8),
    ],
    'And I even got my Pokéball throw perfect too!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 2)]
);
TemporaryBattleList.Hop3 = new TemporaryBattle(
    'Hop3',
    [
        new GymPokemon('Wooloo', 102249719, 11),
        new GymPokemon('Rookidee', 102249719, 12),
        new GymPokemon('Sobble', 105348195, 14),
    ],
    'Was that really good training? Looks like I\'d better keep my guard up!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 6)]
);
TemporaryBattleList.Bede1 = new TemporaryBattle(
    'Bede1',
    [
        new GymPokemon('Solosis', 107930259, 13),
        new GymPokemon('Gothita', 107930259, 15),
        new GymPokemon('Hatenna', 111200873, 16),
    ],
    'I see... Well, that\'s fine. I wasn\'t really trying all that hard anyway.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine'))]
);
TemporaryBattleList.Hop4 = new TemporaryBattle(
    'Hop4',
    [
        new GymPokemon('Wooloo', 145167441, 18),
        new GymPokemon('Corvisquire', 145167441, 19),
        new GymPokemon('Drizzile', 149566454, 21),
    ],
    'We both got ourselves the same Grass Badge, so how come you\'re so much stronger?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 14)]
);
TemporaryBattleList.Bede2 = new TemporaryBattle(
    'Bede2',
    [
        new GymPokemon('Solosis', 135596164, 21),
        new GymPokemon('Gothita', 135596164, 22),
        new GymPokemon('Galarian Ponyta', 135596164, 22),
        new GymPokemon('Hatenna', 139970233, 23),
    ],
    'You showed at least a little effort, so I decided I should let you win!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine No. 2'))]
);
TemporaryBattleList.Marnie1 = new TemporaryBattle(
    'Marnie1',
    [
        new GymPokemon('Croagunk', 183113060, 24),
        new GymPokemon('Scraggy', 183113060, 24),
        new GymPokemon('Morpeko', 188661940, 26),
    ],
    'You beat me... Guess you must not be so bad after all, huh?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
TemporaryBattleList.Hop5 = new TemporaryBattle(
    'Hop5',
    [
        new GymPokemon('Cramorant', 184350136, 28),
        new GymPokemon('Toxel', 184350136, 29),
        new GymPokemon('Silicobra', 184350136, 30),
        new GymPokemon('Drizzile', 190296915, 33),
    ],
    'My strategy goes right to pot when I\'ve got all these bad thoughts running through my head...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 23)]
);
TemporaryBattleList.Bede3 = new TemporaryBattle(
    'Bede3',
    [
        new GymPokemon('Duosion', 197836220, 32),
        new GymPokemon('Gothorita', 197836220, 32),
        new GymPokemon('Galarian Ponyta', 197836220, 33),
        new GymPokemon('Hattrem', 204218033, 35),
    ],
    'This has to be some kind of mistake. I demand a do-over!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Fighting),
            new GymBadgeRequirement(BadgeEnums.Galar_Ghost),
        ]),
    ],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('The Darkest Day').beginQuest();
        },
    }
);
TemporaryBattleList.Hop6 = new TemporaryBattle(
    'Hop6',
    [
        new GymPokemon('Trevenant', 164138786, 34),
        new GymPokemon('Heatmor', 164138786, 34),
        new GymPokemon('Snorlax', 164138786, 35),
        new GymPokemon('Boltund', 164138786, 35),
        new GymPokemon('Inteleon', 169087694, 37),
    ],
    'This is rubbish... My team can\'t perform if I can\'t get my own head straight as their Trainer...',
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)]
);
TemporaryBattleList.Hop7 = new TemporaryBattle(
    'Hop7',
    [
        new GymPokemon('Dubwool', 169633690, 40),
        new GymPokemon('Corviknight', 169633690, 40),
        new GymPokemon('Pincurchin', 169633690, 39),
        new GymPokemon('Snorlax', 169633690, 39),
        new GymPokemon('Inteleon', 174748273, 41),
    ],
    'I still can\'t even beat you, my true rival... But I think I\'m starting to see the light!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Rock),
            new GymBadgeRequirement(BadgeEnums.Galar_Ice),
        ]),
    ]
);
TemporaryBattleList.Marnie2 = new TemporaryBattle(
    'Marnie2',
    [
        new GymPokemon('Liepard', 214035920, 42),
        new GymPokemon('Toxicroak', 214035920, 43),
        new GymPokemon('Scrafty', 214035920, 43),
        new GymPokemon('Morpeko', 220940304, 44),
    ],
    'What\'s with that?! My Pokémon didn\'t get a chance to really do their thing at all. Ugh!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 30)]
);
TemporaryBattleList.Eternatus = new TemporaryBattle(
    'Eternatus',
    [new GymPokemon('Eternatus', 1560840234, 60)],
    'You defeated Eternatus, but it looks like it\'s not over yet!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Energy Plant'))]
);
TemporaryBattleList['The Darkest Day'] = new TemporaryBattle(
    'The Darkest Day',
    [new GymPokemon('Eternamax Eternatus', 1597800902, 60)],
    'You caught Eternatus!',
    [new TemporaryBattleRequirement('Eternatus')],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(890);
        },
    }
);
);
TemporaryBattleList.Hop8 = new TemporaryBattle(
    'Hop8',
    [
        new GymPokemon('Dubwool', 372064692, 59),
        new GymPokemon('Pincurchin', 372064692, 59),
        new GymPokemon('Cramorant', 372064692, 58),
        new GymPokemon('Snorlax', 372064692, 58),
        new GymPokemon('Corviknight', 372064692, 58),
        new GymPokemon('Inteleon', 375642238, 60),
    ],
    'I didn\'t expect there to be such a gap between you and me, mate...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slumbering Weald Shrine'))],
    [],
    () => {
        App.game.quests.getQuestLine('Sword and Shield').beginQuest();
    }
);
TemporaryBattleList.Sordward1 = new TemporaryBattle(
    'Sordward1',
    [
        new GymPokemon('Sirfetch\'d', 443615594, 60),
        new GymPokemon('Golisopod', 443615594, 60),
        new GymPokemon('Doublade', 443615594, 60),
        new GymPokemon('Bisharp', 457925774, 60),
    ],
    'Oh... How can this be? My...my Pokémon...',
    [new TemporaryBattleRequirement('Hop8')]
);
TemporaryBattleList.Shielbert1 = new TemporaryBattle(
    'Shielbert1',
    [
        new GymPokemon('Sirfetch\'d', 443615594, 60),
        new GymPokemon('Bronzong', 443615594, 60),
        new GymPokemon('Falinks', 443615594, 60),
        new GymPokemon('Klinklang', 457925774, 60),
    ],
    'Oh... How can this be? My...my Pokémon...',
    [new TemporaryBattleRequirement('Sordward1')]
);
TemporaryBattleList['Rampaging Tsareena'] = new TemporaryBattle(
    'Rampaging Tsareena',
    [new GymPokemon('Tsareena', 1757548771, 60)],
    'The Rampaging Tsareena fainted.',
    [new TemporaryBattleRequirement('Shielbert1')]
);
TemporaryBattleList['Rampaging Gyarados'] = new TemporaryBattle(
    'Rampaging Gyarados',
    [new GymPokemon('Gyarados', 1757548771, 60)],
    'The Rampaging Gyarados fainted.',
    [new TemporaryBattleRequirement('Rampaging Tsareena')]
);
TemporaryBattleList['Rampaging Torkoal'] = new TemporaryBattle(
    'Rampaging Torkoal',
    [new GymPokemon('Torkoal', 1757548771, 60)],
    'The Rampaging Torkoal fainted.',
    [new TemporaryBattleRequirement('Rampaging Gyarados')]
);
TemporaryBattleList['Sordward & Shielbert'] = new TemporaryBattle(
    'Sordward & Shielbert',
    [
        new GymPokemon('Golisopod', 99102160, 62),
        new GymPokemon('Bronzong', 99102160, 62),
        new GymPokemon('Doublade', 99102160, 62),
        new GymPokemon('Falinks', 99102160, 62),
        new GymPokemon('Bisharp', 102105255, 62),
        new GymPokemon('Klinklang', 102105255, 62),
    ],
    'Quite the vexing predicament indeed, surely this must be some kind of mistake...',
    [new TemporaryBattleRequirement('Rampaging Torkoal')]
);
TemporaryBattleList['Rampaging Conkeldurr'] = new TemporaryBattle(
    'Rampaging Conkeldurr',
    [new GymPokemon('Conkeldurr', 1917325934, 60)],
    'The Rampaging Conkeldurr fainted.',
    [new TemporaryBattleRequirement('Sordward & Shielbert')]
);
TemporaryBattleList['Rampaging Dusknoir'] = new TemporaryBattle(
    'Rampaging Dusknoir',
    [new GymPokemon('Dusknoir', 1917325934, 60)],
    'The Rampaging Dusknoir fainted.',
    [new TemporaryBattleRequirement('Rampaging Conkeldurr')]
);
TemporaryBattleList['Gym Leader Bede'] = new TemporaryBattle(
    'Gym Leader Bede',
    [
        new GymPokemon('Mawile', 594371034, 61),
        new GymPokemon('Gardevoir', 594371034, 61),
        new GymPokemon('Galarian Rapidash', 594371034, 62),
        new GymPokemon('Hatterene', 613544294, 63),
    ],
    'Thank you for the battle. I can now accept you as the Champion. It\'s painful to admit, but I\'ve come to realise a few of my weaknesses. But I\'ll keep getting stronger.',
    [new TemporaryBattleRequirement('Rampaging Dusknoir')]
);
TemporaryBattleList['Rampaging Gigalith'] = new TemporaryBattle(
    'Rampaging Gigalith',
    [new GymPokemon('Gigalith', 1917325934, 60)],
    'The Rampaging Gigalith fainted.',
    [new TemporaryBattleRequirement('Gym Leader Bede')]
);
TemporaryBattleList['Rampaging Froslass'] = new TemporaryBattle(
    'Rampaging Froslass',
    [new GymPokemon('Froslass', 1917325934, 60)],
    'The Rampaging Froslass fainted.',
    [new TemporaryBattleRequirement('Rampaging Gigalith')]
);
TemporaryBattleList['Gym Leader Marnie'] = new TemporaryBattle(
    'Gym Leader Marnie',
    [
        new GymPokemon('Liepard', 476934822, 59),
        new GymPokemon('Toxicroak', 476934822, 59),
        new GymPokemon('Scrafty', 476934822, 59),
        new GymPokemon('Morpeko', 476934822, 60),
        new GymPokemon('Grimmsnarl', 491314766, 60),
    ],
    'Yeah I lost, but I\'m gonna learn from your battle style and everythin\'!',
    [new TemporaryBattleRequirement('Rampaging Froslass')]
);
TemporaryBattleList['Rampaging Haxorus'] = new TemporaryBattle(
    'Rampaging Haxorus',
    [new GymPokemon('Haxorus', 2077103093, 60)],
    'The Rampaging Haxorus fainted.',
    [new TemporaryBattleRequirement('Gym Leader Marnie')]
);
TemporaryBattleList.Sordward2 = new TemporaryBattle(
    'Sordward2',
    [
        new GymPokemon('Sirfetch\'d', 554746301, 64),
        new GymPokemon('Golisopod', 554746301, 64),
        new GymPokemon('Doublade', 554746301, 64),
        new GymPokemon('Bisharp', 572641343, 64),
    ],
    'Oho... My noble Pokémon...',
    [new TemporaryBattleRequirement('Rampaging Haxorus')]
);
TemporaryBattleList.Shielbert2 = new TemporaryBattle(
    'Shielbert2',
    [
        new GymPokemon('Sirfetch\'d', 554746301, 64),
        new GymPokemon('Bronzong', 554746301, 64),
        new GymPokemon('Falinks', 554746301, 64),
        new GymPokemon('Klinklang', 572641343, 64),
    ],
    'Oho... My noble Pokémon...',
    [new TemporaryBattleRequirement('Sordward2')]
);
TemporaryBattleList.Klara1 = new TemporaryBattle(
    'Klara1',
    [
        new GymPokemon('Venipede', 799982445, 58),
        new GymPokemon('Galarian Slowpoke', 816143704, 60),
    ],
    'Oh, my next Pokémon\'s gonna make short work-- Huh? That was my last one?',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList.Avery1 = new TemporaryBattle(
    'Avery1',
    [
        new GymPokemon('Abra', 799982445, 58),
        new GymPokemon('Galarian Slowpoke', 816143704, 60),
    ],
    'Such strength! I\'m in Psyshock!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList.Mustard = new TemporaryBattle(
    'Mustard',
    [
        new GymPokemon('Mienfoo', 839981565, 60),
        new GymPokemon('Shinx', 856950891, 60),
    ],
    'That was everything I hoped for and more!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)],
    [],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('The Dojo\'s Armor').beginQuest();
        },
    }
);
TemporaryBattleList.Klara2 = new TemporaryBattle(
    'Klara2',
    [
        new GymPokemon('Galarian Slowpoke', 564237041, 62),
        new GymPokemon('Koffing', 564237041, 62),
        new GymPokemon('Whirlipede', 581335135, 63),
    ],
    'Just what have you got that I don\'t?',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel')),
            new TemporaryBattleRequirement('Mustard'),
        ]),
    ]
);
TemporaryBattleList.Avery2 = new TemporaryBattle(
    'Avery2',
    [
        new GymPokemon('Galarian Slowpoke', 564237041, 62),
        new GymPokemon('Woobat', 564237041, 62),
        new GymPokemon('Kadabra', 581335135, 63),
    ],
    'What a Psystrike to my poor pride...',
    [
        new MultiRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel')),
            new TemporaryBattleRequirement('Klara2'),
        ]),
    ]
);
TemporaryBattleList.Klara3 = new TemporaryBattle(
    'Klara3',
    [
        new GymPokemon('Skorupi', 452051518, 65),
        new GymPokemon('Galarian Weezing', 452051518, 66),
        new GymPokemon('Whirlipede', 452051518, 66),
        new GymPokemon('Galarian Slowbro', 470316225, 67),
    ],
    'But I didn\'t hold back! I gave it everything I\'ve got...',
    [new TemporaryBattleRequirement('Avery2')]
);
TemporaryBattleList.Avery3 = new TemporaryBattle(
    'Avery3',
    [
        new GymPokemon('Galarian Ponyta', 452051518, 65),
        new GymPokemon('Swoobat', 452051518, 66),
        new GymPokemon('Kadabra', 452051518, 66),
        new GymPokemon('Galarian Slowbro', 470316225, 67),
    ],
    'Oh, I should just Imprison myself for this!',
    [new TemporaryBattleRequirement('Klara3')]
);
TemporaryBattleList.Peony = new TemporaryBattle(
    'Peony',
    [
        new GymPokemon('Copperajah', 869380472, 70),
        new GymPokemon('Aggron', 877467733, 70),
    ],
    'Gahahaaa! Look at me, takin\' a thrashin\' from a youngster like you!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    [],
    undefined,
    {
        firstTimeRewardFunction: () => {
            App.game.quests.getQuestLine('The Crown of Galar').beginQuest();
            App.game.quests.getQuestLine('The Birds of the Dyna Tree').beginQuest();
            App.game.quests.getQuestLine('The Ancient Golems').beginQuest();
        },
    }
);
TemporaryBattleList.Calyrex = new TemporaryBattle(
    'Calyrex',
    [new GymPokemon('Calyrex', 1886555626, 80)],
    'Cracrown crow. Roooooowwwn rown crown.',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 46)]
);
TemporaryBattleList.Glastrier = new TemporaryBattle(
    'Glastrier',
    [new GymPokemon('Glastrier', 2031393560, 75)],
    'The Pokémon ran away!',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 3)]
);
TemporaryBattleList.Spectrier = new TemporaryBattle(
    'Spectrier',
    [new GymPokemon('Spectrier', 2031393560, 75)],
    'The Pokémon ran away!',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 2)]
);
TemporaryBattleList['Dyna Tree Birds'] = new TemporaryBattle(
    'Dyna Tree Birds',
    [
        new GymPokemon('Galarian Articuno', 710987746, 70),
        new GymPokemon('Galarian Zapdos', 710987746, 70),
        new GymPokemon('Galarian Moltres', 710987746, 70),
    ],
    'The legendary birds fled to roam the region.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))]
);
TemporaryBattleList.Regigigas = new TemporaryBattle(
    'Regigigas',
    [new GymPokemon('Regigigas', 2336102594, 100)],
    'The ancient giant was defeated!',
    [
        new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Regieleki),
            new ObtainedPokemonRequirement(pokemonMap.Regidrago),
        ]),
    ]
);
