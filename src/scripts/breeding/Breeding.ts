import Currency = GameConstants.Currency;

class Breeding implements Feature {
    name = 'Breeding';
    saveKey = 'breeding';

    defaults = {
        'eggList': [ko.observable(new Egg()), ko.observable(new Egg()), ko.observable(new Egg()), ko.observable(new Egg())],
        'eggSlots': 1,
    };

    private _eggList: Array<KnockoutObservable<Egg>>;
    private _eggSlots: KnockoutObservable<number>;

    private hatchList: { [name: number]: string[][] } = {};

    constructor() {
        this._eggList = this.defaults.eggList;
        this._eggSlots = ko.observable(this.defaults.eggSlots);

        this._eggList.forEach((egg) => {
            egg.extend({deferred: true});
        });
    }

    initialize(): void {
        this.hatchList[EggType.Fire] = [
            ['Charmander', 'Vulpix', 'Growlithe', 'Ponyta'],
            ['Cyndaquil', 'Slugma', 'Houndour', 'Magby'],
            ['Torchic'],
        ];
        this.hatchList[EggType.Water] = [
            ['Squirtle', 'Lapras', 'Staryu', 'Psyduck'],
            ['Totodile', 'Wooper', 'Marill', 'Qwilfish'],
            ['Mudkip', 'Feebas', 'Clamperl'],
        ];
        this.hatchList[EggType.Grass] = [
            ['Bulbasaur', 'Oddish', 'Tangela', 'Bellsprout'],
            ['Chikorita', 'Hoppip', 'Sunkern'],
            ['Treecko', 'Tropius', 'Roselia'],
        ];
        this.hatchList[EggType.Fighting] = [
            ['Hitmonlee', 'Hitmonchan', 'Machop', 'Mankey'],
            ['Tyrogue'],
            ['Makuhita', 'Meditite'],
        ];
        this.hatchList[EggType.Electric] = [
            ['Magnemite', 'Pikachu', 'Voltorb', 'Electabuzz'],
            ['Chinchou', 'Mareep', 'Elekid'],
            ['Plusle', 'Minun', 'Electrike'],
        ];
        this.hatchList[EggType.Dragon] = [
            ['Dratini', 'Dragonair', 'Dragonite'],
            [],
            ['Bagon', 'Shelgon', 'Salamence'],
        ];

    }

    update(delta: number): void {
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Mystery_egg);
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.eggSlots = json['eggSlots'] ?? this.defaults.eggSlots;

        if (json['eggList'] == null) {
            this._eggList = this.defaults.eggList;
        } else {
            const saveEggList: Record<string, any>[] = json['eggList'];

            for (let i = 0; i < this._eggList.length; i++) {
                if (saveEggList[i] != null) {
                    const egg: Egg = new Egg(null, null, null);
                    egg.fromJSON(saveEggList[i]);
                    this._eggList[i](egg);
                }
            }
        }
    }


    toJSON(): Record<string, any> {
        const breedingSave = {};
        breedingSave['eggList'] = this.eggList.map(function (egg: any) {
            return egg() === null ? new Egg() : egg().toJSON();
        }
        );
        breedingSave['eggSlots'] = this.eggSlots;
        return breedingSave;
    }

    public canBreedPokemon(): boolean {
        return App.game.party.hasMaxLevelPokemon() && this.hasFreeEggSlot();
    }

    public hasFreeEggSlot(): boolean {
        let counter = 0;
        for (const egg of this._eggList) {
            if (!egg().isNone()) {
                counter++;
            }
        }
        return counter < this._eggSlots();
    }

    public gainEgg(e: Egg) {
        if (e.isNone()) {
            return false;
        }
        for (let i = 0; i < this._eggList.length; i++) {
            if (this._eggList[i]().isNone()) {
                this._eggList[i](e);
                return true;
            }
        }
        console.error(`Error: Could not place ${EggType[e.type]} Egg`);
        return false;
    }

    public gainRandomEgg() {
        return this.gainEgg(this.createRandomEgg());
    }

    public progressEggsBattle(route: number, region: GameConstants.Region) {
        switch (region) {
            // Hoenn starts at route 101 need to reduce the total money earned on those routes.
            case GameConstants.Region.hoenn:
                route -= 54;
                break;
        }
        return this.progressEggs(+Math.sqrt(route).toFixed(2));
    }

    public progressEggs(amount: number) {
        amount *= App.game.oakItems.calculateBonus(OakItems.OakItem.Blaze_Cassette);

        amount = Math.round(amount);
        for (const egg of this._eggList) {
            egg().addSteps(amount);
        }
    }

    public gainPokemonEgg(pokemon: PartyPokemon): boolean {
        if (!this.hasFreeEggSlot()) {
            Notifier.notify({ message: "You don't have any free egg slots", type: GameConstants.NotificationOption.warning });
            return false;
        }
        const egg = this.createEgg(pokemon.name);
        pokemon.breeding = true;
        return this.gainEgg(egg);
    }

    public hatchPokemonEgg(index: number): void {
        const egg: Egg = this._eggList[index]();
        egg.hatch();
        this._eggList[index](new Egg());
        this.moveEggs();
    }

    public moveEggs(): void {
        const tempEggList = App.game.breeding._eggList.filter(egg => egg().type != EggType.None);

        this._eggList.forEach((egg, index) => {
            egg(tempEggList[index] ? tempEggList[index]() : new Egg());
        });
    }

    public createEgg(pokemonName: string, type = EggType.Pokemon): Egg {
        const dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(pokemonName);
        return new Egg(type, this.getSteps(dataPokemon.eggCycles), pokemonName);
    }

    public createTypedEgg(type: EggType): Egg {
        const hatchList = this.hatchList[type];
        const hatchable = hatchList.slice(0, player.highestRegion() + 1);
        let possibleHatches = [];
        hatchable.forEach((pokemon, index) => {
            if (!pokemon.length) {
                return;
            }
            const toAdd = possibleHatches.length || 1;
            for (let i = 0; i < toAdd; i++) {
                possibleHatches.push(pokemon);
            }
        });
        possibleHatches = possibleHatches[Math.floor(Math.random() * possibleHatches.length)];
        const pokemon = possibleHatches[Math.floor(Math.random() * possibleHatches.length)];
        return this.createEgg(pokemon, type);
    }

    public createRandomEgg(): Egg {
        const type = Math.floor(Math.random() * (Object.keys(this.hatchList).length - 1));
        const egg = this.createTypedEgg(type);
        egg.type = EggType.Mystery;
        return egg;
    }

    public createFossilEgg(fossil: string): Egg {
        const pokemonName = GameConstants.FossilToPokemon[fossil];
        const pokemonNativeRegion = PokemonHelper.calcNativeRegion(pokemonName);
        if (pokemonNativeRegion > player.highestRegion()) {
            Notifier.notify({ message: 'You must progress further before you can uncover this fossil Pokemon!', type: GameConstants.NotificationOption.warning, timeout: 5e3 });
            return new Egg();
        }
        return this.createEgg(pokemonName, EggType.Fossil);
    }

    public getSteps(eggCycles: number) {
        if (eggCycles === undefined) {
            return 500;
        } else {
            return eggCycles * 40;
        }
    }

    public getEggSlotCost(slot: number): number {
        return 500 * slot;
    }

    public calculateBaseForm(pokemonName: string): string {
        const devolution = pokemonDevolutionMap[pokemonName];
        // Base form of Pokemon depends on which regions players unlocked
        if (!devolution || PokemonHelper.calcNativeRegion(devolution) > player.highestRegion()) {
            // No devolutions at all
            // No further devolutions in current unlocked regions
            return pokemonName;
        } else {
            // Recurse onto its devolution
            return this.calculateBaseForm(devolution);
        }
    }

    public buyEggSlot() {
        const cost: Amount = this.nextEggSlotCost();
        if (App.game.wallet.hasAmount(cost)) {
            App.game.wallet.loseAmount(cost);
            this.gainEggSlot();
        }
    }

    public nextEggSlotCost(): Amount {
        return new Amount(this.getEggSlotCost(this.eggSlots + 1), Currency.questPoint);
    }

    // Knockout getters/setters
    get eggSlots(): number {
        return this._eggSlots();
    }

    set eggSlots(value: number) {
        this._eggSlots(value);
    }

    public gainEggSlot() {
        if (this.eggSlots === this.eggList.length) {
            console.error('Cannot gain another eggslot.');
            return;
        }
        this.eggSlots += 1;
    }

    get eggList(): Array<KnockoutObservable<Egg>> {
        return this._eggList;
    }

    set eggList(value: Array<KnockoutObservable<Egg>>) {
        this._eggList = value;
    }

}
