class SafariPokemon implements pokemonInterface {
    name: string;
    id: number;
    type1: PokemonTypes;
    type2: PokemonTypes;
    shiny: boolean;
    baseCatchFactor: number;
    baseEscapeFactor: number;
    angry: number;
    eating: number;

    constructor(name: string) {
        let data = PokemonHelper.getPokemonByName(name);

        this.name = data.name;
        this.id = data.id;
        this.type1 = data.type1;
        this.type2 = data.type2;
        this.shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SAFARI);
        this.baseCatchFactor = data.catchRate * 100/1275;
        this.baseEscapeFactor = 10;
        this.angry = 0;
        this.eating = 0;
    }

    public get catchFactor(): number {
        if(this.eating > 0) {
            return this.baseCatchFactor / 2;
        }
        if(this.angry > 0) {
            return this.baseCatchFactor * 2;
        }

        return this.baseCatchFactor;
    }

    public get escapeFactor(): number {
        if(this.eating > 0) {
            return this.baseEscapeFactor / 4;
        }
        if(this.angry > 0) {
            return this.baseEscapeFactor * 2;
        }

        return this.baseEscapeFactor;
        }
}