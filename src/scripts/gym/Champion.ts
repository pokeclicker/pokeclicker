/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="Gym.ts"/>

class Champion extends Gym {
    constructor(
        leaderName: string,
        town: string,
        public basePokemon: GymPokemon[],
        badgeReward: BadgeEnums,
        moneyReward: number,
        rewardMessage: string,
        requirements: Requirement[] = [],
        public alternativePokemon1?: GymPokemon[],
        public alternativePokemon2?: GymPokemon[],
        public alternativePokemon3?: GymPokemon[],
        public rewardFunction = () => {}
    ) {
        super(leaderName, town, basePokemon, badgeReward, moneyReward, rewardMessage, requirements, rewardFunction);
    }

    public setPokemon(starter: GameConstants.Starter) {
        this.pokemons = [...this.basePokemon];
        switch (starter) {
            case GameConstants.Starter.Bulbasaur: {
                if (this.alternativePokemon1 != undefined) {
                    this.pokemons.push(...this.alternativePokemon1);
                }
                break;
            }
            case GameConstants.Starter.Charmander: {
                if (this.alternativePokemon2 != undefined) {
                    this.pokemons.push(...this.alternativePokemon2);
                }
                break;
            }
            case GameConstants.Starter.Squirtle:
            default: {
                if (this.alternativePokemon3 != undefined) {
                    this.pokemons.push(...this.alternativePokemon3);
                }
                break;
            }
        }
    }

}