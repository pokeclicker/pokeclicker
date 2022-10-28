enum BCBaitType {
    BCBait = 0,
    BCRazz,
    BCNanab
}


class BCBait {

    constructor(
        public type: BCBaitType,
        public name: string,
        public useName: string,
        public image: string,
        public amount: () => string | number,
        public use: (pokemon: BugCatchingPokemon) => void
    ) { }


    get btnName(): string {
        return `${this.name} (${this.amount()})`;
    }

}

const BCBaitList: { [name: string]: BCBait } = {};

BCBaitList.BCBait = new BCBait(BCBaitType.BCBait, 'Bait', 'some bait', 'assets/images/safari/bait.png',
    () => '∞',
    (pokemon: BugCatchingPokemon) => {
        pokemon.eatingBCBait = BCBaitType.BCBait;
        pokemon.eating = Math.max(pokemon.eating, Rand.intBetween(2, 6));
        pokemon.angry = 0;

    });
BCBaitList.BCRazz = new BCBait(BCBaitType.BCRazz, 'Razz Berry', 'a Razz Berry', 'assets/images/items/berry/Razz.png',
    () => App.game.farming.berryList[BerryType.Razz](),
    (pokemon: BugCatchingPokemon) => {
        GameHelper.incrementObservable(App.game.farming.berryList[BerryType.Razz], -1);
        pokemon.eatingBCBait = BCBaitType.BCRazz;
        pokemon.eating = Math.max(pokemon.eating, Rand.intBetween(2, 7));
        pokemon.angry = 0;
    });
BCBaitList.BCNanab = new BCBait(BCBaitType.BCNanab, 'Nanab Berry', 'a Nanab Berry', 'assets/images/items/berry/Nanab.png',
    () => App.game.farming.berryList[BerryType.Nanab](),
    (pokemon: BugCatchingPokemon) => {
        GameHelper.incrementObservable(App.game.farming.berryList[BerryType.Nanab], -1);
        pokemon.eatingBCBait = BCBaitType.BCNanab;
        pokemon.eating = Math.max(pokemon.eating, Rand.intBetween(2, 7));
        pokemon.angry = 0;
    });
