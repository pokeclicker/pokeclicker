class DamageCalculator {
    static type1 = ko.observable(PokemonType.None);
    static type2 = ko.observable(PokemonType.None);
    static region = ko.observable(GameConstants.Region.none);
    static ignoreBreeding = ko.observable(false);

    static observableTypeDamageArray = ko.pureComputed(DamageCalculator.getDamageByTypes, DamageCalculator);

    static getDamageByTypes(): number[] {
        const typedamage = new Array(GameHelper.enumLength(PokemonType) - 1).fill(0);
        const ignoreRegionMultiplier = this.region() == GameConstants.Region.none;

        for (const pokemon of App.game.party.caughtPokemon) {
            const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
            if (dataPokemon.type1 === PokemonType.None) {
                continue;
            }

            const attack = App.game.party.calculateOnePokemonAttack(pokemon, this.type1(), this.type2(), this.region(), ignoreRegionMultiplier);
            
            typedamage[dataPokemon.type1] += attack / 2;
            const otherType = dataPokemon.type2 !== PokemonType.None ? dataPokemon.type2 : dataPokemon.type1;
            typedamage[otherType] += attack / 2;
        }

        return typedamage;
    }
}