class ProfNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region
    ) {
        super(name, dialog, { image: 'assets/images/oak.png' });
    }

    get dialogHTML(): string {
        const uniquePokemonCaught = new Set(App.game.party.caughtPokemon.filter(p => p.id > 0).map(p => Math.floor(p.id))).size;

        const caughtPokemonCount = new Set(App.game.party.caughtPokemon.filter(p => p.id > 0 && PokemonHelper.calcNativeRegion(p.name) <= this.region).map(p => Math.floor(p.id))).size;
        const remainingPokemon = GameConstants.MaxIDPerRegion[this.region] - caughtPokemonCount;

        const championBadge = new Map<GameConstants.Region, BadgeEnums>();
        championBadge.set(GameConstants.Region.kanto, BadgeEnums.Elite_KantoChampion);
        championBadge.set(GameConstants.Region.johto, BadgeEnums.Elite_JohtoChampion);
        championBadge.set(GameConstants.Region.hoenn, BadgeEnums.Elite_HoennChampion);
        championBadge.set(GameConstants.Region.sinnoh, BadgeEnums.Elite_SinnohChampion);
        championBadge.set(GameConstants.Region.unova, BadgeEnums.Elite_UnovaChampion);
        championBadge.set(GameConstants.Region.kalos, BadgeEnums.Elite_KalosChampion);
        championBadge.set(GameConstants.Region.alola, BadgeEnums.Elite_AlolaChampion);
        championBadge.set(GameConstants.Region.galar, BadgeEnums.Elite_GalarChampion);

        let html: string;

        if (App.game.badgeCase.hasBadge(championBadge.get(this.region))) {
            if (remainingPokemon == 0) {
                html += '<p>You\'ve done it, you\'ve caught all Pokémon in this region! Congratulations!</p>';
            } else {
                html += `<p>You still have ${remainingPokemon} left to catch in this region! You're almost there!</p>`;
            }
        } else {
            html += '<p>Come see me once you\'ve beat the Elite Four!</p>';
        }

        if (uniquePokemonCaught >= GameConstants.MaxIDPerRegion[GameConstants.Region.unova]) {
            html += `<p>Let me see your progress...Ah, fantastic, as usual!</p>
                    <p>Allow me some time to arrange tickets for your next destination.</p>`;
            return html;
        }

        if (uniquePokemonCaught >= GameConstants.MaxIDPerRegion[GameConstants.Region.sinnoh]) {
            html += `<p>Congratulations, you're more than half-way completed on the national Pokédex!</p>
                    <p>Next stop is Unova! I've always wanted to visit Castelia City personally...</p>`;
            return html;
        }

        if (uniquePokemonCaught >= GameConstants.MaxIDPerRegion[GameConstants.Region.hoenn]) {
            html += `<p>That's another regional Pokédex completed! Fantastic.</p>
                    <p>I really appreciate being able to see your outstanding progress, thank you!</p>`;
            return html;
        }

        if (uniquePokemonCaught >= GameConstants.MaxIDPerRegion[GameConstants.Region.johto]) {
            html += `<p>Oh, another regional Pokédex completed so soon?</p>
                    <p>Amazing! Next stop is Hoenn, enjoy the sunshine while you're there!</p>`;
            return html;
        }

        if (uniquePokemonCaught >= GameConstants.MaxIDPerRegion[GameConstants.Region.kanto]) {
            html += `<p>Congratulations on completing your Kanto Pokédex!</p>
                    <p>Your journey isn't over yet, a whole world awaits you! Onwards to Johto!</p>`;
            return html;
        }

        if (App.game.badgeCase.badgeCount() >= 13) {
            html += `<p>Hello, new Champion, you've come a long way!</p>
                    <p>If you complete your Pokédex I can arrange for you to travel to Johto!</p>`;
            return html;
        }

        //Else, it does the default message.
        return super.dialogHTML;
    }
}
