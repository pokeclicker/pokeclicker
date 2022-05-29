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
    [new GymBadgeRequirement(BadgeEnums.DarkiniumZ)]
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
      new GymPokemon('Hattena', 282601920, 60),
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
      new GymPokemon('Hattena', 282601920, 60),
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
    ]
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
TemporaryBattleList['The Darkest Day'] = new TemporaryBattle(
    'The Darkest Day',
    [new GymPokemon('Eternamax Eternatus', 282601920, 60)],
    'You caught Eternatus!',
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rose Tower'))]
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
