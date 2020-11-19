class ProfOakNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
    ) {
        super(name, dialog);
    }

    get dialogHTML(): string {
        if (PokemonHelper.calcUniquePokemonsByRegion(GameConstants.Region.sinnoh) >= 107) {
            return `<p>Congratulations, you're more than half-way completed on the national Pokédex!</p>
                    <p>Next stop is Unova! I've always wanted to visit Castelia City personally...</p>`;
        }

        if (PokemonHelper.calcUniquePokemonsByRegion(GameConstants.Region.hoenn) >= 135) {
            return `<p>Hello! Thanks for visiting again.</p>
                    <p>I really appreciate being able to see your outstanding progress, thank you!</p>`;
        }

        if (PokemonHelper.calcUniquePokemonsByRegion(GameConstants.Region.johto) >= 100) {
            return `<p>Oh, another regional Pokédex completed so soon?</p>
                    <p>Amazing! Next stop is Hoenn, enjoy the sunshine while you're there!</p>`;
        }

        if (PokemonHelper.calcUniquePokemonsByRegion(GameConstants.Region.kanto) >= 151) {
            return `<p>Congratulations on completing your Kanto Pokédex!"</p>
                    <p>Your journey isn't over yet, a whole world awaits you! Onwards to Johto!</p>`;
        }

        if (App.game.badgeCase.badgeCount() >= 12) {
            return `<p>Hello, new Champion, you've come a long way!</p>
                    <p>If you complete your Pokédex I can arrange for you to travel to Johto!</p>`;
        }

        //Else, it does the default message.
        return super.dialogHTML;
    }
}
