///<reference path="Gym.ts"/>
class Champion extends Gym {

    constructor(leaderName: string, town: string, pokemons: GymPokemon[], badgeReward: GameConstants.Badge, moneyReward: number, badgeReq: GameConstants.Badge, rewardMessage: string) {
        super(leaderName, town, pokemons, badgeReward, moneyReward, badgeReq, rewardMessage);
    }

    public setPokemon(starter: GameConstants.Starter) {
        this.pokemons = [];
        this.pokemons.push(new GymPokemon("Pidgeot", 30600, 59));
        this.pokemons.push(new GymPokemon("Alakazam", 36720, 57));
        this.pokemons.push(new GymPokemon("Rhydon", 42835, 59));
        switch (starter) {
            case GameConstants.Starter.Bulbasaur: {
                this.pokemons.push(new GymPokemon("Exeggutor", 42835, 59));
                this.pokemons.push(new GymPokemon("Gyarados", 45895, 61));
                this.pokemons.push(new GymPokemon("Charizard", 61190, 63));
                break;
            }
            case GameConstants.Starter.Charmander: {
                this.pokemons.push(new GymPokemon("Arcanine", 42835, 59));
                this.pokemons.push(new GymPokemon("Gyarados", 45895, 61));
                this.pokemons.push(new GymPokemon("Blastoise", 61190, 63));
                break;
            }
            case GameConstants.Starter.Squirtle: {
                this.pokemons.push(new GymPokemon("Gyarados", 42835, 59));
                this.pokemons.push(new GymPokemon("Arcanine", 45895, 61));
                this.pokemons.push(new GymPokemon("Venusaur", 61190, 63));
                break;
            }
        }
    }

}

gymList["Champion Blue"] = new Champion(
    "Blue",
    "Champion Blue",
    [],
    GameConstants.Badge.Champion,
    10000,
    GameConstants.Badge.Lance,
    "Why? Why did I lose? I never made any mistakes raising my Pokémon… Darn it! You're the new Pokémon League Champion! Although I don't like to admit it…"
);
