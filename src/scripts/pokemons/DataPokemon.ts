class DataPokemon implements PokemonInterface {
    shiny: boolean;

    constructor(
        public id: number,
        public name: string,
        public catchRate: number,
        public evolutions: Evolution[],
        public type1: PokemonType,
        public type2: PokemonType,
        public attack: number,
        public levelType: LevelType,
        public exp: number,
        public eggCycles: number,
        public heldItem: string | null
    ) {
        this.shiny = false;
    }

}
