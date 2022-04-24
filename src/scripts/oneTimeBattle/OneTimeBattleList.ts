const oneTimeBattleList: { [battleName: string]: OneTimeBattle } = {};

oneTimeBattleList['UltraWormhole'] = new OneTimeBattle(
    'UltraWormhole',
    'Ultra Wormhole',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
