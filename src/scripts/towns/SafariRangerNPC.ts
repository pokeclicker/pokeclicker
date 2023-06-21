class SafariPokemonNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, dialog, {image: image, requirement: requirement});
    }

    get dialogHTML(): string {
        if (!SafariPokemonList.list[this.region]) {
            return 'Huh!? This is a restricted area, kid. You can\'t be here!';
        }

        let pokemonHTML = SafariPokemonList.list[this.region]()
            .map(p => `<img width="72" src="assets/images/pokemon/${PokemonHelper.getPokemonByName(p.name).id}.png" />`);

        if (this.region === GameConstants.Region.kalos) {
            pokemonHTML = pokemonHTML.slice(0, 5); // display just the daily pokemon for friend safari
        }

        return super.dialogHTML + pokemonHTML.join('');
    }
}
