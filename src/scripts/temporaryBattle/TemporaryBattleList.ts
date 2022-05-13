const TemporaryBattleList: { [battleName: string]: TemporaryBattle } = {};

TemporaryBattleList['Ultra Wormhole'] = new TemporaryBattle(
    'Ultra Wormhole',
    [new GymPokemon('???', 264590972, 27)],
    'The creature escaped back into the ultra wormhole.',
    [new GymBadgeRequirement(BadgeEnums.RockiumZ)]
);

//Ash Ketchum battles
TemporaryBattleList['Ash Ketchum Kanto'] = new TemporaryBattle(
    'Ash Ketchum Kanto',
    [
        new GymPokemon('Pikachu', 48300, 58),
        new GymPokemon('Pidgeot', 52000, 56),
        new GymPokemon('Bulbasaur', 57000, 56),
        new GymPokemon('Charizard', 60250, 60),
        new GymPokemon('Squirtle', 66000, 62),
        new GymPokemon('Muk', 66000, 62),
    ],
    'That was a fun battle!',
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    undefined,
    {
        displayName: 'Ash Ketchum',
        returnTown: 'Pewter City',
    }
);
TemporaryBattleList['Ash Ketchum Johto'] = new TemporaryBattle(
    'Ash Ketchum Johto',
    [
        new GymPokemon('Pikachu', 48300, 58),
        new GymPokemon('Heracross', 52000, 56),
        new GymPokemon('Noctowl', 57000, 56),
        new GymPokemon('Bayleef', 60250, 60),
        new GymPokemon('Cyndaquil', 66000, 62),
        new GymPokemon('Totodile', 66000, 62),
    ],
    'That was a nice rematch...',
    [new TemporaryBattleRequirement('Ash Ketchum Kanto'), new RouteKillRequirement(10, GameConstants.Region.johto, 48)],
    undefined,
    {
        displayName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Hoenn'] = new TemporaryBattle(
    'Ash Ketchum Hoenn',
    [
        new GymPokemon('Pikachu', 48300, 58),
        new GymPokemon('Swellow', 52000, 56),
        new GymPokemon('Grovyle', 57000, 56),
        new GymPokemon('Corphish', 60250, 60),
        new GymPokemon('Torkoal', 66000, 62),
        new GymPokemon('Glalie', 66000, 62),
    ],
    'Are you following me?',
    [new TemporaryBattleRequirement('Ash Ketchum Johto')],
    undefined,
    {
        displayName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Sinnoh'] = new TemporaryBattle(
    'Ash Ketchum Sinnoh',
    [
        new GymPokemon('Pikachu', 48300, 58),
        new GymPokemon('Staraptor', 52000, 56),
        new GymPokemon('Torterra', 57000, 56),
        new GymPokemon('Infernape', 60250, 60),
        new GymPokemon('Buizel', 66000, 62),
        new GymPokemon('Gible', 66000, 62),
    ],
    'Please leave me alone.',
    [new TemporaryBattleRequirement('Ash Ketchum Hoenn')],
    undefined,
    {
        displayName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Unova'] = new TemporaryBattle(
    'Ash Ketchum Unova',
    [
        new GymPokemon('Pikachu', 48300, 58),
        new GymPokemon('Unfezant', 52000, 56),
        new GymPokemon('Snivy', 66000, 62),
        new GymPokemon('Pignite', 60250, 60),
        new GymPokemon('Oshawott', 57000, 56),
        new GymPokemon('Krookodile', 66000, 62),
    ],
    'Stop it!',
    [new TemporaryBattleRequirement('Ash Ketchum Sinnoh')],
    undefined,
    {
        displayName: 'Ash Ketchum',
    }
);
TemporaryBattleList['Ash Ketchum Kalos'] = new TemporaryBattle(
    'Ash Ketchum Kalos',
    [
        new GymPokemon('Pikachu', 48300, 58),
        new GymPokemon('Talonflame', 52000, 56),
        new GymPokemon('Hawlucha', 57000, 56),
        new GymPokemon('Goodra', 60250, 60),
        new GymPokemon('Noivern', 66000, 62),
        new GymPokemon('Ash Greninja', 66000, 62),
    ],
    'Will you leave me alone if I give you my Greninja? I was gonna release it anyway.',
    [new TemporaryBattleRequirement('Ash Ketchum Unova')],
    undefined,
    {
        displayName: 'Ash Ketchum',
    }
);

TemporaryBattleList['Ash Ketchum Alola'] = new TemporaryBattle(
    'Ash Ketchum Alola',
    [
        new GymPokemon('Pikachu (Partner cap)', 48300, 58),
        new GymPokemon('Rowlet', 52000, 56),
        new GymPokemon('Incineroar', 57000, 56),
        new GymPokemon('Lycanroc (Dusk)', 60250, 60),
        new GymPokemon('Naganadel', 66000, 62),
        new GymPokemon('Melmetal', 66000, 62),
    ],
    'Fine. I quit. Take my Pikachu.',
    [new TemporaryBattleRequirement('Ash Ketchum Kalos'), new RouteKillRequirement(10, GameConstants.Region.alola, 30)],
      undefined,
    {
        displayName: 'Ash Ketchum',
        firstTimeRewardFunction: () => {
            App.game.party.gainPokemonById(25.07);
        },
    }
);
