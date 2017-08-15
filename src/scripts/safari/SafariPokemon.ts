class SafariPokemon implements pokemonInterface {
    name: string;
    id: number;
    type1: PokemonTypes;
    type2: PokemonTypes;
    shiny: boolean;
    catchFactor: number;
    escapeFactor: number;
    angry: boolean;
    eating: boolean;

    constructor(name: string) {
        let data = PokemonHelper.getPokemonByName(name);

        this.name = data.name;
        this.id = data.id;
        this.type1 = data.type1;
        this.type2 = data.type2;
        this.shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SAFARI);
        this.catchFactor = data.catchRate * 100/1275;
        this.escapeFactor = 10;
        this.angry = false;
        this.eating = false;
    }
}