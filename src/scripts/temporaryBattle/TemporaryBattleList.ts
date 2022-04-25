const temporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

temporaryBattleList['UltraWormhole'] = new TemporaryBattle(
    'UltraWormhole',
    'Ultra Wormhole',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);
