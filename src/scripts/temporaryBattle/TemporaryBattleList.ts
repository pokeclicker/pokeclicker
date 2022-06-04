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

TemporaryBattleList['Anabel'] = new TemporaryBattle(
    'Anabel',
    [
        new GymPokemon('Alakazam', 90000000, 61),
        new GymPokemon('Weavile', 90000000, 61),
        new GymPokemon('Mismagius', 90000000, 61),
        new GymPokemon('Salamence', 90000000, 61),
        new GymPokemon('Snorlax', 90000000, 61),
    ],
    'Oh you\'re good! You might just have a shot, here are some Beast Balls. Go hunt down those strange Ultra Beasts! If you need more Beast Balls, you can buy them here.',
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
);
