///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class PokerusStatusByFilterRequirement extends AchievementRequirement {
    public list: Array<PokemonNameType>;
    constructor(
        filter: (pokemon: PokemonListData) => boolean,
        amount: number,
        public statusRequired: GameConstants.Pokerus
    ) {
        super(amount, GameConstants.AchievementOption.more, GameConstants.AchievementType.Pokerus);
        this.list = pokemonList.filter(p => filter(p)).map(p => p.name);
    }

    public getProgress() {
        return Math.min(this.list.filter(p => App.game.party.getPokemonByName(p)?.pokerus >= this.statusRequired).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokémon needs to be infected.`;
    }
}
