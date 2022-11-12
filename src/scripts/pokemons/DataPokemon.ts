class DataPokemon implements PokemonInterface {
    shiny: boolean;

    constructor(
        public id: number,
        public name: PokemonNameType,
        public catchRate: number,
        public evolutions: EvoData[],
        public type1: PokemonType,
        public type2: PokemonType,
        public attack: number,
        public hitpoints: number,
        public levelType: LevelType,
        public exp: number,
        public eggCycles: number,
        public heldItem: BagItem | null,
        public gender
    ) {
        this.shiny = false;
    }

}
