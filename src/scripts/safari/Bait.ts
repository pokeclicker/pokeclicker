enum BaitType {
    Bait = 0,
    Razz,
    Nanab
}


class Bait {

    constructor(
        public type: BaitType,
        public name: string,
        public useName: string,
        public amount: () => string | number,
        public use: (pokemon: SafariPokemon) => void
    ) { }


    get btnName(): string {
        return `${this.name} (${this.amount()})`;
    }

}

const BaitList: { [name: string]: Bait } = {};

BaitList['Bait'] = new Bait(BaitType.Bait, 'Bait', 'some bait', () => '∞',
    function(pokemon: SafariPokemon) {
        pokemon.eating = Math.max(pokemon.eating, Math.floor(Math.random() * 5 + 2));
        pokemon.angry = 0;
    });
BaitList['Razz'] = new Bait(BaitType.Razz, 'Razz Berries', 'a Razz Berry', () => App.game.farming.berryList[BerryType.Razz](),
    function(pokemon: SafariPokemon) {
        pokemon.eating = Math.max(pokemon.eating, Math.floor(Math.random() * 5 + 2));
        pokemon.angry = Math.max(pokemon.angry, Math.floor(Math.random() * 3 + 2));
    });
BaitList['Nanab'] = new Bait(BaitType.Bait, 'Nanab Berries', 'a Nanab Berry', () => App.game.farming.berryList[BerryType.Nanab](),
    function(pokemon: SafariPokemon) {
        pokemon.eating = Math.max(pokemon.eating, Math.floor(Math.random() * 3 + 2));
        pokemon.angry = Math.max(pokemon.angry, Math.floor(Math.random() * 5 + 2));
    });
