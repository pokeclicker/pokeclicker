///<reference path="Gym.ts"/>
class Champion extends Gym {

    constructor(leaderName: string, town: string, pokemons: GymPokemon[], badgeReward: BadgeCase.Badge, moneyReward: number, rewardMessage: string, requirements: Requirement[] = []) {
        super(leaderName, town, pokemons, badgeReward, moneyReward, rewardMessage, requirements);
    }

    public setPokemon(starter: GameConstants.Starter) {
        this.pokemons = [
            new GymPokemon('Pidgeot', 52340, 59),
            new GymPokemon('Alakazam', 56320, 57),
            new GymPokemon('Rhydon', 58340, 59),
        ];
        switch (starter) {
            case GameConstants.Starter.Bulbasaur: {
                this.pokemons.push(new GymPokemon('Exeggutor', 57520, 59));
                this.pokemons.push(new GymPokemon('Gyarados', 63040, 61));
                this.pokemons.push(new GymPokemon('Charizard', 70000, 63));
                break;
            }
            case GameConstants.Starter.Charmander: {
                this.pokemons.push(new GymPokemon('Arcanine', 65340, 59));
                this.pokemons.push(new GymPokemon('Exeggutor', 57520, 61));
                this.pokemons.push(new GymPokemon('Blastoise', 70000, 63));
                break;
            }
            case GameConstants.Starter.Squirtle:
            default: {
                this.pokemons.push(new GymPokemon('Gyarados', 63040, 59));
                this.pokemons.push(new GymPokemon('Arcanine', 65340, 61));
                this.pokemons.push(new GymPokemon('Venusaur', 70000, 63));
                break;
            }
        }
    }

}

gymList['Champion Blue'] = new Champion(
    'Blue',
    'Champion Blue',
    [],
    BadgeCase.Badge.Elite_KantoChampion,
    10000,
    'Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You\'re the new Pokémon League Champion! Although I don\'t like to admit it…',
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_Lance)]
);
