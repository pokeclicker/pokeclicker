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
    [],
    () => {
        BagHandler.gainItem({type: ItemType.item, id: 'Fighting_egg'}, 1);
        Notifier.notify({
            message: 'You were awarded a Fighting Egg for defeating the Fighting Dojo',
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
        });
    }
);

//Kalos Temporary Battles
TemporaryBattleList.AZ = new TemporaryBattle(
    'AZ',
    [
        new GymPokemon('Torkoal', 247996000, 60),
        new GymPokemon('Golurk', 247996000, 60),
        new GymPokemon('Sigilyph', 247996000, 60),
    ],
    'Thank you very much for battling with me. Now I finally feel free…',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    [],
    () => {
        App.game.party.gainPokemonById(670.05);
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
    [],
    () => {
        App.game.quests.getQuestLine('Mina\'s Trial').beginQuest();
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

//Galar Temporary Battles
//TODO: Have Hop's starter depend on the players Galar starter
TemporaryBattleList.Hop1 = new TemporaryBattle(
    'Hop1',
    [
        new GymPokemon('Wooloo', 20965216, 3),
        new GymPokemon('Sobble', 21820939, 5),
    ],
    'Well, that was a shock! Guess I know now why Lee thought he should give you a Pokémon, too...',
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TemporaryBattleList.Mirages = new TemporaryBattle(
    'Mirages',
    [
        new GymPokemon('Zacian (Battle Hero)', 22514480, 70),
        new GymPokemon('Zamazenta (Battle Hero)', 22514480, 70),
    ],
    'The Pokémon fled.',
    [new TemporaryBattleRequirement('Hop1')]
);
TemporaryBattleList.Hop2 = new TemporaryBattle(
    'Hop2',
    [
        new GymPokemon('Wooloo', 60232887, 6),
        new GymPokemon('Rookidee', 60232887, 5),
        new GymPokemon('Sobble', 62058126, 8),
    ],
    'And I even got my Pokéball throw perfect too!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 2)]
);
TemporaryBattleList.Hop3 = new TemporaryBattle(
    'Hop3',
    [
        new GymPokemon('Wooloo', 63475599, 11),
        new GymPokemon('Rookidee', 63475599, 12),
        new GymPokemon('Sobble', 65399102, 14),
    ],
    'Was that really good training? Looks like I\'d better keep my guard up!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 6)]
);
TemporaryBattleList.Bede1 = new TemporaryBattle(
    'Bede1',
    [
        new GymPokemon('Solosis', 68533871, 13),
        new GymPokemon('Gothita', 68533871, 15),
        new GymPokemon('Hatenna', 70610655, 16),
    ],
    'I see... Well, that\'s fine. I wasn\'t really trying all that hard anyway.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine'))]
);
TemporaryBattleList.Hop4 = new TemporaryBattle(
    'Hop4',
    [
        new GymPokemon('Wooloo', 87840389, 18),
        new GymPokemon('Corvisquire', 87840389, 19),
        new GymPokemon('Drizzile', 90502219, 21),
    ],
    'We both got ourselves the same Grass Badge, so how come you\'re so much stronger?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 14)]
);
TemporaryBattleList.Bede2 = new TemporaryBattle(
    'Bede2',
    [
        new GymPokemon('Solosis', 79056351, 21),
        new GymPokemon('Gothita', 79056351, 22),
        new GymPokemon('Galarian Ponyta', 79056351, 22),
        new GymPokemon('Hatenna', 82250547, 23),
    ],
    'You showed at least a little effort, so I decided I should let you win!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine No. 2'))]
);
TemporaryBattleList.Marnie1 = new TemporaryBattle(
    'Marnie1',
    [
        new GymPokemon('Croagunk', 106727128, 24),
        new GymPokemon('Scraggy', 106727128, 24),
        new GymPokemon('Morpeko', 109961283, 26),
    ],
    'You beat me... Guess you must not be so bad after all, huh?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
TemporaryBattleList.Hop5 = new TemporaryBattle(
    'Hop5',
    [
        new GymPokemon('Cramorant', 88226998, 28),
        new GymPokemon('Toxel', 88226998, 29),
        new GymPokemon('Silicobra', 88226998, 30),
        new GymPokemon('Drizzile', 91791725, 33),
    ],
    'My strategy goes right to pot when I\'ve got all these bad thoughts running through my head...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 23)]
);
TemporaryBattleList.Bede3 = new TemporaryBattle(
    'Bede3',
    [
        new GymPokemon('Duosion', 94108792, 32),
        new GymPokemon('Gothorita', 94108792, 32),
        new GymPokemon('Galarian Ponyta', 94108792, 33),
        new GymPokemon('Hattrem', 96960579, 35),
    ],
    'This has to be some kind of mistake. I demand a do-over!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Fighting),
            new GymBadgeRequirement(BadgeEnums.Galar_Ghost),
        ]),
    ],
    [],
    () => {
        App.game.quests.getQuestLine('The Darkest Day').beginQuest();
    }
);
TemporaryBattleList.Hop6 = new TemporaryBattle(
    'Hop6',
    [
        new GymPokemon('Trevenant', 83541888, 34),
        new GymPokemon('Heatmor', 83541888, 34),
        new GymPokemon('Snorlax', 83541888, 35),
        new GymPokemon('Boltund', 83541888, 35),
        new GymPokemon('Inteleon', 86698382, 37),
    ],
    'This is rubbish... My team can\'t perform if I can\'t get my own head straight as their Trainer...',
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)]
);
TemporaryBattleList.Hop7 = new TemporaryBattle(
    'Hop7',
    [
        new GymPokemon('Dubwool', 85540774, 40),
        new GymPokemon('Corviknight', 85540774, 40),
        new GymPokemon('Pincurchin', 85540774, 39),
        new GymPokemon('Snorlax', 85540774, 39),
        new GymPokemon('Inteleon', 88772793, 41),
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
        new GymPokemon('Liepard', 111748623, 42),
        new GymPokemon('Toxicroak', 111748623, 43),
        new GymPokemon('Scrafty', 111748623, 43),
        new GymPokemon('Morpeko', 116263718, 44),
    ],
    'What\'s with that?! My Pokémon didn\'t get a chance to really do their thing at all. Ugh!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 30)]
);
TemporaryBattleList.Eternatus = new TemporaryBattle(
    'Eternatus',
    [new GymPokemon('Eternatus', 415813261, 60)],
    'You defeated Eternatus, but it looks like it\'s not over yet!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Energy Plant'))]
);
TemporaryBattleList['The Darkest Day'] = new TemporaryBattle(
    'The Darkest Day',
    [new GymPokemon('Eternamax Eternatus', 462014735, 60)],
    'You caught Eternatus!',
    [new TemporaryBattleRequirement('Eternatus')],
    [],
    () => {
        App.game.party.gainPokemonById(890);
    }
);
TemporaryBattleList.Hop8 = new TemporaryBattle(
    'Hop8',
    [
        new GymPokemon('Dubwool', 114810660, 59),
        new GymPokemon('Pincurchin', 114810660, 59),
        new GymPokemon('Cramorant', 114810660, 58),
        new GymPokemon('Snorlax', 114810660, 58),
        new GymPokemon('Corviknight', 114810660, 58),
        new GymPokemon('Inteleon', 118968793, 60),
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
        new GymPokemon('Sirfetch\'d', 137218376, 60),
        new GymPokemon('Golisopod', 137218376, 60),
        new GymPokemon('Doublade', 137218376, 60),
        new GymPokemon('Bisharp', 142762552, 60),
    ],
    'Oh... How can this be? My...my Pokémon...',
    [new TemporaryBattleRequirement('Hop8')]
);
TemporaryBattleList.Shielbert1 = new TemporaryBattle(
    'Shielbert1',
    [
        new GymPokemon('Sirfetch\'d', 137218376, 60),
        new GymPokemon('Bronzong', 137218376, 60),
        new GymPokemon('Falinks', 137218376, 60),
        new GymPokemon('Klinklang', 142762552, 60),
    ],
    'Oh... How can this be? My...my Pokémon...',
    [new TemporaryBattleRequirement('Sordward1')]
);
TemporaryBattleList['Rampaging Tsareena'] = new TemporaryBattle(
    'Rampaging Tsareena',
    [new GymPokemon('Tsareena', 508216208, 60)],
    'The Rampaging Tsareena fainted.',
    [new TemporaryBattleRequirement('Shielbert1')]
);
TemporaryBattleList['Rampaging Gyarados'] = new TemporaryBattle(
    'Rampaging Gyarados',
    [new GymPokemon('Gyarados', 508216208, 60)],
    'The Rampaging Gyarados fainted.',
    [new TemporaryBattleRequirement('Rampaging Tsareena')]
);
TemporaryBattleList['Rampaging Torkoal'] = new TemporaryBattle(
    'Rampaging Torkoal',
    [new GymPokemon('Torkoal', 508216208, 60)],
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
    [new GymPokemon('Conkeldurr', 554417682, 60)],
    'The Rampaging Conkeldurr fainted.',
    [new TemporaryBattleRequirement('Sordward & Shielbert')]
);
TemporaryBattleList['Rampaging Dusknoir'] = new TemporaryBattle(
    'Rampaging Dusknoir',
    [new GymPokemon('Dusknoir', 554417682, 60)],
    'The Rampaging Dusknoir fainted.',
    [new TemporaryBattleRequirement('Rampaging Conkeldurr')]
);
TemporaryBattleList['Gym Leader Bede'] = new TemporaryBattle(
    'Gym Leader Bede',
    [
        new GymPokemon('Mawile', 171522969, 61),
        new GymPokemon('Gardevoir', 171522969, 61),
        new GymPokemon('Galarian Rapidash', 171522969, 62),
        new GymPokemon('Hatterene', 178453190, 63),
    ],
    'Thank you for the battle. I can now accept you as the Champion. It\'s painful to admit, but I\'ve come to realise a few of my weaknesses. But I\'ll keep getting stronger.',
    [new TemporaryBattleRequirement('Rampaging Dusknoir')]
);
TemporaryBattleList['Rampaging Gigalith'] = new TemporaryBattle(
    'Rampaging Gigalith',
    [new GymPokemon('Gigalith', 554417682, 60)],
    'The Rampaging Gigalith fainted.',
    [new TemporaryBattleRequirement('Gym Leader Bede')]
);
TemporaryBattleList['Rampaging Froslass'] = new TemporaryBattle(
    'Rampaging Froslass',
    [new GymPokemon('Froslass', 554417682, 60)],
    'The Rampaging Froslass fainted.',
    [new TemporaryBattleRequirement('Rampaging Gigalith')]
);
TemporaryBattleList['Gym Leader Marnie'] = new TemporaryBattle(
    'Gym Leader Marnie',
    [
        new GymPokemon('Liepard', 137564886, 59),
        new GymPokemon('Toxicroak', 137564886, 59),
        new GymPokemon('Scrafty', 137564886, 59),
        new GymPokemon('Morpeko', 137564886, 60),
        new GymPokemon('Grimmsnarl', 142762552, 60),
    ],
    'Yeah I lost, but I\'m gonna learn from your battle style and everythin\'!',
    [new TemporaryBattleRequirement('Rampaging Froslass')]
);
TemporaryBattleList['Rampaging Haxorus'] = new TemporaryBattle(
    'Rampaging Haxorus',
    [new GymPokemon('Haxorus', 600619155, 60)],
    'The Rampaging Haxorus fainted.',
    [new TemporaryBattleRequirement('Gym Leader Marnie')]
);
TemporaryBattleList.Sordward2 = new TemporaryBattle(
    'Sordward2',
    [
        new GymPokemon('Sirfetch\'d', 160088105, 64),
        new GymPokemon('Golisopod', 160088105, 64),
        new GymPokemon('Doublade', 160088105, 64),
        new GymPokemon('Bisharp', 166556311, 64),
    ],
    'Oho... My noble Pokémon...',
    [new TemporaryBattleRequirement('Rampaging Haxorus')]
);
TemporaryBattleList.Shielbert2 = new TemporaryBattle(
    'Shielbert2',
    [
        new GymPokemon('Sirfetch\'d', 160088105, 64),
        new GymPokemon('Bronzong', 160088105, 64),
        new GymPokemon('Falinks', 160088105, 64),
        new GymPokemon('Klinklang', 166556311, 64),
    ],
    'Oho... My noble Pokémon...',
    [new TemporaryBattleRequirement('Sordward2')]
);
TemporaryBattleList.Klara1 = new TemporaryBattle(
    'Klara1',
    [
        new GymPokemon('Venipede', 231324474, 58),
        new GymPokemon('Galarian Slowpoke', 235997695, 60),
    ],
    'Oh, my next Pokémon\'s gonna make short work-- Huh? That was my last one?',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList.Avery1 = new TemporaryBattle(
    'Avery1',
    [
        new GymPokemon('Abra', 231324474, 58),
        new GymPokemon('Galarian Slowbro', 235997695, 60),
    ],
    'Such strength! I\'m in Psyshock!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList.Mustard = new TemporaryBattle(
    'Mustard',
    [
        new GymPokemon('Mienfoo', 242890697, 60),
        new GymPokemon('Shinx', 247797580, 60),
    ],
    'That was everything I hoped for and more!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)],
    [],
    () => {
        App.game.quests.getQuestLine('The Dojo\'s Armor').beginQuest();
    }
);
TemporaryBattleList.Klara2 = new TemporaryBattle(
    'Klara2',
    [
        new GymPokemon('Galarian Slowpoke', 163155876, 62),
        new GymPokemon('Koffing', 163155876, 62),
        new GymPokemon('Whirlipede', 168099994, 63),
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
        new GymPokemon('Galarian Slowpoke', 163155876, 62),
        new GymPokemon('Woobat', 163155876, 62),
        new GymPokemon('Kadabra', 168099994, 63),
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
        new GymPokemon('Skorupi', 130716093, 65),
        new GymPokemon('Galarian Weezing', 130716093, 66),
        new GymPokemon('Whirlipede', 130716093, 66),
        new GymPokemon('Galarian Slowbro', 135997551, 67),
    ],
    'But I didn\'t hold back! I gave it everything I\'ve got...',
    [new TemporaryBattleRequirement('Avery2')]
);
TemporaryBattleList.Avery3 = new TemporaryBattle(
    'Avery3',
    [
        new GymPokemon('Galarian Ponyta', 130716093, 65),
        new GymPokemon('Swoobat', 130716093, 66),
        new GymPokemon('Kadabra', 130716093, 66),
        new GymPokemon('Galarian Slowbro', 135997551, 67),
    ],
    'Oh, I should just Imprison myself for this!',
    [new TemporaryBattleRequirement('Klara3')],
    [],
    () => {
        App.game.party.gainPokemonById(891);
    }
);
TemporaryBattleList.Peony = new TemporaryBattle(
    'Peony',
    [
        new GymPokemon('Copperajah', 267146977, 70),
        new GymPokemon('Aggron', 272543886, 70),
    ],
    'Gahahaaa! Look at me, takin\' a thrashin\' from a youngster like you!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
    [],
    () => {
        App.game.quests.getQuestLine('The Crown of Galar').beginQuest();
        App.game.quests.getQuestLine('The Birds of the Dyna Tree').beginQuest();
        App.game.quests.getQuestLine('The Ancient Golems').beginQuest();
    }
);
TemporaryBattleList.Calyrex = new TemporaryBattle(
    'Calyrex',
    [new GymPokemon('Calyrex', 545520080, 80)],
    'Cracrown crow. Roooooowwwn rown crown.',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 46)]
);
TemporaryBattleList.Glastrier = new TemporaryBattle(
    'Glastrier',
    [new GymPokemon('Glastrier', 587390930, 75)],
    'The Pokémon ran away!',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 3)]
);
TemporaryBattleList.Spectrier = new TemporaryBattle(
    'Spectrier',
    [new GymPokemon('Spectrier', 587390930, 75)],
    'The Pokémon ran away!',
    [new QuestLineStepCompletedRequirement('The Crown of Galar', 2)]
);
TemporaryBattleList['Dyna Tree Birds'] = new TemporaryBattle(
    'Dyna Tree Birds',
    [
        new GymPokemon('Galarian Articuno', 267146977, 70),
        new GymPokemon('Galarian Zapdos', 272543886, 70),
        new GymPokemon('Galarian Moltres', 272543886, 70),
    ],
    'The legendary birds fled to roam the region.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))]
);
TemporaryBattleList.Regigigas = new TemporaryBattle(
    'Regigigas',
    [new GymPokemon('Regigigas', 587390930, 100)],
    'The ancient giant was defeated!',
    [
        new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Regieleki),
            new ObtainedPokemonRequirement(pokemonMap.Regidrago),
        ]),
    ]
);
