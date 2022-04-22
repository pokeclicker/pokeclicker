const OneTimeBattleList: { [battleName: string]: OneTimeBattle } = {};

OneTimeBattleList['???'] = new OneTimeBattle(
    '???',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
