const oneTimeBattleList: { [battleName: string]: OneTimeBattle } = {};

oneTimeBattleList['???'] = new OneTimeBattle(
    '???',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
