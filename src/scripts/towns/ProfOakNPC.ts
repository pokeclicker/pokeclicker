class ProfOakNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
    ) {
        super(name, dialog);
    }

    get dialogHTML(): string {
        const UniquePokemonCaught = App.game.party.caughtPokemon.filter(p => p.id > 0).length;

        if (UniquePokemonCaught >= 493) {
            return `<p>Congratulations, you're more than half-way completed on the national Pokédex!</p>
                    <p>Next stop is Unova! I've always wanted to visit Castelia City personally...</p>`;
        }

        if (UniquePokemonCaught >= 392) {
            return `<p>That's another Pokédex completed! Fantastic.</p>
                    <p>I really appreciate being able to see your outstanding progress, thank you!</p>`;
        }

        if (UniquePokemonCaught >= 254) {
            return `<p>Oh, another regional Pokédex completed so soon?</p>
                    <p>Amazing! Next stop is Hoenn, enjoy the sunshine while you're there!</p>`;
        }

        if (UniquePokemonCaught >= 151) {
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
