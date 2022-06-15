const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

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
TemporaryBattleList['Hop1'] = new TemporaryBattle(
    'Hop1',
    [
        new GymPokemon('Wooloo', 282601920, 60),
        new GymPokemon('Sobble', 282601920, 60),
    ],
    'Well, that was a shock! Guess I know now why Lee thought he should give you a Pokémon, too...',
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
TemporaryBattleList['Mirages'] = new TemporaryBattle(
    'Mirages',
    [
        new GymPokemon('Zacian (Battle Hero)', 282601920, 60),
        new GymPokemon('Zamazenta (Battle Hero)', 282601920, 60),
    ],
    'The Pokémon fled.',
    [new TemporaryBattleRequirement('Hop1')]
);
TemporaryBattleList['Hop2'] = new TemporaryBattle(
    'Hop2',
    [
        new GymPokemon('Wooloo', 282601920, 60),
        new GymPokemon('Rookidee', 282601920, 60),
        new GymPokemon('Sobble', 282601920, 60),
    ],
    'And I even got my Pokéball throw perfect too!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 2)]
);
TemporaryBattleList['Hop3'] = new TemporaryBattle(
    'Hop3',
    [
        new GymPokemon('Wooloo', 282601920, 60),
        new GymPokemon('Rookidee', 282601920, 60),
        new GymPokemon('Sobble', 282601920, 60),
    ],
    'Was that really good training? Looks like I\'d better keep my guard up!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 6)]
);
TemporaryBattleList['Bede1'] = new TemporaryBattle(
    'Bede1',
    [
        new GymPokemon('Solosis', 282601920, 60),
        new GymPokemon('Gothita', 282601920, 60),
        new GymPokemon('Hatenna', 282601920, 60),
    ],
    'I see... Well, that\'s fine. I wasn\'t really trying all that hard anyway.',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine'))]
);
TemporaryBattleList['Hop4'] = new TemporaryBattle(
    'Hop4',
    [
        new GymPokemon('Wooloo', 282601920, 60),
        new GymPokemon('Corvisquire', 282601920, 60),
        new GymPokemon('Drizzile', 282601920, 60),
    ],
    'We both got ourselves the same Grass Badge, so how come you\'re so much stronger?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 14)]
);
TemporaryBattleList['Bede2'] = new TemporaryBattle(
    'Bede2',
    [
        new GymPokemon('Solosis', 282601920, 60),
        new GymPokemon('Gothita', 282601920, 60),
        new GymPokemon('Galarian Ponyta', 282601920, 60),
        new GymPokemon('Hatenna', 282601920, 60),
    ],
    'You showed at least a little effort, so I decided I should let you win!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine No. 2'))]
);
TemporaryBattleList['Marnie1'] = new TemporaryBattle(
    'Marnie1',
    [
        new GymPokemon('Croagunk', 282601920, 60),
        new GymPokemon('Scraggy', 282601920, 60),
        new GymPokemon('Morpeko', 282601920, 60),
    ],
    'You beat me... Guess you must not be so bad after all, huh?',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 15)]
);
TemporaryBattleList['Hop5'] = new TemporaryBattle(
    'Hop5',
    [
        new GymPokemon('Cramorant', 282601920, 60),
        new GymPokemon('Toxel', 282601920, 60),
        new GymPokemon('Silicobra', 282601920, 60),
        new GymPokemon('Drizzile', 282601920, 60),
    ],
    'My strategy goes right to pot when I\'ve got all these bad thoughts running through my head...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 23)]
);
TemporaryBattleList['Bede3'] = new TemporaryBattle(
    'Bede3',
    [
        new GymPokemon('Duosion', 282601920, 60),
        new GymPokemon('Gothorita', 282601920, 60),
        new GymPokemon('Galarian Ponyta', 282601920, 60),
        new GymPokemon('Hattrem', 282601920, 60),
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
TemporaryBattleList['Hop6'] = new TemporaryBattle(
    'Hop6',
    [
        new GymPokemon('Trevenant', 282601920, 60),
        new GymPokemon('Heatmor', 282601920, 60),
        new GymPokemon('Snorlax', 282601920, 60),
        new GymPokemon('Boltund', 282601920, 60),
        new GymPokemon('Inteleon', 282601920, 60),
    ],
    'This is rubbish... My team can\'t perform if I can\'t get my own head straight as their Trainer...',
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)]
);
TemporaryBattleList['Hop7'] = new TemporaryBattle(
    'Hop7',
    [
        new GymPokemon('Dubwool', 282601920, 60),
        new GymPokemon('Corviknight', 282601920, 60),
        new GymPokemon('Pincurchin', 282601920, 60),
        new GymPokemon('Snorlax', 282601920, 60),
        new GymPokemon('Inteleon', 282601920, 60),
    ],
    'I still can\'t even beat you, my true rival... But I think I\'m starting to see the light!',
    [
        new MultiRequirement([
            new GymBadgeRequirement(BadgeEnums.Galar_Rock),
            new GymBadgeRequirement(BadgeEnums.Galar_Ice),
        ]),
    ]
);
TemporaryBattleList['Marnie2'] = new TemporaryBattle(
    'Marnie2',
    [
        new GymPokemon('Liepard', 282601920, 60),
        new GymPokemon('Toxicroak', 282601920, 60),
        new GymPokemon('Scrafty', 282601920, 60),
        new GymPokemon('Morpeko', 282601920, 60),
    ],
    'What\'s with that?! My Pokémon didn\'t get a chance to really do their thing at all. Ugh!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 30)]
);
TemporaryBattleList['Eternatus'] = new TemporaryBattle(
    'Eternatus',
    [new GymPokemon('Eternatus', 282601920, 60)],
    'You defeated Eternatus, but it looks like it\'s not over yet!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower'))]
TemporaryBattleList['The Darkest Day'] = new TemporaryBattle(
    'The Darkest Day',
    [new GymPokemon('Eternamax Eternatus', 282601920, 60)],
    'You caught Eternatus!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower'))],
    [],
    () => {
        App.game.party.gainPokemonById(890);
    }
);
TemporaryBattleList['Hop8'] = new TemporaryBattle(
    'Hop8',
    [
        new GymPokemon('Dubwool', 282601920, 60),
        new GymPokemon('Pincurchin', 282601920, 60),
        new GymPokemon('Cramorant', 282601920, 60),
        new GymPokemon('Snorlax', 282601920, 60),
        new GymPokemon('Corviknight', 282601920, 60),
        new GymPokemon('Inteleon', 282601920, 60),
    ],
    'I didn\'t expect there to be such a gap between you and me, mate...',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList['Klara1'] = new TemporaryBattle(
    'Klara1',
    [
        new GymPokemon('Venipede', 282601920, 58),
        new GymPokemon('Galarian Slowpoke', 282601920, 60),
    ],
    'Oh, my next Pokémon\'s gonna make short work-- Huh? That was my last one?',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList['Avery1'] = new TemporaryBattle(
    'Avery1',
    [
        new GymPokemon('Abra', 282601920, 58),
        new GymPokemon('Galarian Slowbro', 282601920, 60),
    ],
    'Such strength! I\'m in Psyshock!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList['Mustard'] = new TemporaryBattle(
    'Mustard',
    [
        new GymPokemon('Mienfoo', 282601920, 60),
        new GymPokemon('Shinx', 282601920, 60),
    ],
    'That was everything I hoped for and more!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)]
);
TemporaryBattleList['Klara2'] = new TemporaryBattle(
    'Avery2',
    [
        new GymPokemon('Galarian Slowpoke', 282601920, 62),
        new GymPokemon('Koffing', 282601920, 62),
        new GymPokemon('Whirlipede', 282601920, 63),
    ],
    'Just what have you got that I don\'t?',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel'))]
);
TemporaryBattleList['Avery2'] = new TemporaryBattle(
    'Avery2',
    [
        new GymPokemon('Galarian Slowpoke', 282601920, 62),
        new GymPokemon('Woobat', 282601920, 62),
        new GymPokemon('Kadabra', 282601920, 63),
    ],
    'What a Psystrike to my poor pride...',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel'))]
);
TemporaryBattleList['Klara3'] = new TemporaryBattle(
    'Klara3',
    [
        new GymPokemon('Skorupi', 282601920, 65),
        new GymPokemon('Galarian Weezing', 282601920, 66),
        new GymPokemon('Whirlipede', 282601920, 66),
        new GymPokemon('Galarian Slowbro', 282601920, 67),
    ],
    'But I didn\'t hold back! I gave it everything I\'ve got...',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)]
);
TemporaryBattleList['Avery3'] = new TemporaryBattle(
    'Avery3',
    [
        new GymPokemon('Galarian Ponyta', 282601920, 65),
        new GymPokemon('Swoobat', 282601920, 66),
        new GymPokemon('Kadabra', 282601920, 66),
        new GymPokemon('Galarian Slowbro', 282601920, 67),
    ],
    'Oh, I should just Imprison myself for this!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)]
);
TemporaryBattleList['Peony'] = new TemporaryBattle(
    'Peony',
    [
        new GymPokemon('Copperajah', 282601920, 70),
        new GymPokemon('Aggron', 282601920, 70),
    ],
    'Gahahaaa! Look at me, takin\' a thrashin\' from a youngster like you!',
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
);
TemporaryBattleList['Calyrex'] = new TemporaryBattle(
    'Calyrex',
    [new GymPokemon('Calyrex', 264590972, 80)],
    'Cracrown crow. Roooooowwwn rown crown.',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 46)]
);
TemporaryBattleList['Glastrier'] = new TemporaryBattle(
    'Glastrier',
    [new GymPokemon('Glastrier', 264590972, 75)],
    'The Pokémon ran away!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 49)]
);
TemporaryBattleList['Spectrier'] = new TemporaryBattle(
    'Spectrier',
    [new GymPokemon('Spectrier', 264590972, 75)],
    'The Pokémon ran away!',
    [new RouteKillRequirement(10, GameConstants.Region.galar, 54)]
);
