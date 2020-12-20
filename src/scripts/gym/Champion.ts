/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="Gym.ts"/>

class Champion extends Gym {
    constructor(
        leaderName: string,
        town: string,
        pokemons: GymPokemon[],
        badgeReward: BadgeEnums,
        moneyReward: number,
        rewardMessage: string,
        requirements: Requirement[] = [],
        public alternativePokemon1: GymPokemon[],
        public alternativePokemon2: GymPokemon[],
        public alternativePokemon3: GymPokemon[]
    ) {
        super(leaderName, town, pokemons, badgeReward, moneyReward, rewardMessage, requirements);
    }

    public setPokemon(starter: GameConstants.Starter) {
        switch (starter) {
            case GameConstants.Starter.Bulbasaur: {
                this.pokemons.push(...this.alternativePokemon1);
                break;
            }
            case GameConstants.Starter.Charmander: {
                this.pokemons.push(...this.alternativePokemon2);
                break;
            }
            case GameConstants.Starter.Squirtle:
            default: {
                this.pokemons.push(...this.alternativePokemon3);
                break;
            }
        }
    }

}

gymList['Champion Blue'] = new Champion(
    'Blue',
    'Champion Blue',
    [
        new GymPokemon('Pidgeot', 52340, 59),
        new GymPokemon('Alakazam', 56320, 57),
        new GymPokemon('Rhydon', 58340, 59),
    ],
    BadgeEnums.Elite_KantoChampion,
    10000,
    'Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You\'re the new Pokémon League Champion! Although I don\'t like to admit it…',
    [new GymBadgeRequirement(BadgeEnums.Elite_Lance)],
    // Bulbasaur
    [
        new GymPokemon('Exeggutor', 57520, 59),
        new GymPokemon('Gyarados', 63040, 61),
        new GymPokemon('Charizard', 70000, 63),
    ],
    // Charmander
    [
        new GymPokemon('Arcanine', 65340, 59),
        new GymPokemon('Exeggutor', 57520, 61),
        new GymPokemon('Blastoise', 70000, 63),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Gyarados', 63040, 59),
        new GymPokemon('Arcanine', 65340, 61),
        new GymPokemon('Venusaur', 70000, 63),
    ]
);

// TODO: Balancing - Set HP - Set win message
gymList['Champion Hao'] = new Champion(
    'Hao',
    'Champion Hao',
    [
        new GymPokemon('Raichu', 2015330, 59),
        new GymPokemon('Tauros', 2015330, 58),
        new GymPokemon('Noivern', 2015330, 58),
        new GymPokemon('Crabominable', 2015330, 59),
    ],
    BadgeEnums.Elite_AlolaChampion,
    100000,
    'Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You\'re the new Pokémon League Champion! Although I don\'t like to admit it…',
    [new GymBadgeRequirement(BadgeEnums.Elite_Kahili)],
    // Bulbasaur
    [
        new GymPokemon('Flareon', 2015330, 58),
        new GymPokemon('Primarina', 2015330, 60),
    ],
    // Charmander
    [
        new GymPokemon('Vaporeon', 2015330, 58),
        new GymPokemon('Decidueye', 2015330, 60),
    ],
    // Squirtle/Pikachu
    [
        new GymPokemon('Leafeon', 2015330, 58),
        new GymPokemon('Incineroar', 2015330, 60),
    ]
);
