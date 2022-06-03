const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

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


TemporaryBattleList['Team Rocket Leader Giovanni'] = new TemporaryBattle(
    'Team Rocket Leader Giovanni',
    [
        new GymPokemon('Claydol', 60000000, 60),
        new GymPokemon('Bruxish', 60000000, 60),
        new GymPokemon('Hypno', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',26)]
);

TemporaryBattleList['Team Aqua Leader Archie'] = new TemporaryBattle(
    'Team Aqua Leader Archie',
    [
        new GymPokemon('Mightyena', 60000000, 60),
        new GymPokemon('Crobat', 60000000, 60),
        new GymPokemon('Muk', 60000000, 60),
        new GymPokemon('Sharpedo', 60000000, 60),
        new GymPokemon('Kyogre', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',27)]
);

TemporaryBattleList['Team Magma Leader Maxie'] = new TemporaryBattle(
    'Team Magma Leader Maxie',
    [
        new GymPokemon('Mightyena', 60000000, 60),
        new GymPokemon('Crobat', 60000000, 60),
        new GymPokemon('Weezing', 60000000, 60),
        new GymPokemon('Camerupt', 60000000, 60),
        new GymPokemon('Groudon', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',28)]
);

TemporaryBattleList['Team Galactic Leader Cyrus'] = new TemporaryBattle(
    'Team Galactic Leader Cyrus',
    [
        new GymPokemon('Houndoom', 60000000, 60),
        new GymPokemon('Honchkrow', 60000000, 60),
        new GymPokemon('Crobat', 60000000, 60),
        new GymPokemon('Weavile', 60000000, 60),
        new GymPokemon('Dialga', 60000000, 60),
        new GymPokemon('Palkia', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',29)]
);

TemporaryBattleList['Team Flare Leader Lysandre'] = new TemporaryBattle(
    'Team Flare Leader Lysandre',
    [
        new GymPokemon('Mienshao', 60000000, 60),
        new GymPokemon('Pyroar', 60000000, 60),
        new GymPokemon('Honchkrow', 60000000, 60),
        new GymPokemon('Gyarados', 60000000, 60),
        new GymPokemon('Xerneas', 60000000, 60),
        new GymPokemon('Yveltal', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',30)]
);

TemporaryBattleList['Team Plasma Leader Ghetsis'] = new TemporaryBattle(
    'Team Plasma Leader Ghetsis',
    [
        new GymPokemon('Cofagrigus', 60000000, 60),
        new GymPokemon('Bouffalant', 60000000, 60),
        new GymPokemon('Bisharp', 60000000, 60),
        new GymPokemon('Hydreigon', 60000000, 60),
        new GymPokemon('Zekrom', 60000000, 60),
        new GymPokemon('Reshiram', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',31)]
);

TemporaryBattleList['Team Rainbow Leader Giovanni'] = new TemporaryBattle(
    'Team Rainbow Leader Giovanni',
    [
        new GymPokemon('Dugtrio', 60000000, 60),
        new GymPokemon('Nidoking', 60000000, 60),
        new GymPokemon('Nidoqueen', 60000000, 60),
        new GymPokemon('Rhyperior', 60000000, 60),
        new GymPokemon('Mewtwo', 60000000, 60),
    ],
    'Snarky text goes here.',
    [new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!',32)]
);