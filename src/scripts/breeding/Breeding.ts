/// <reference path="../../declarations/settings/BreedingFilters.d.ts" />
/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />
/// <reference path="../../declarations/breeding/EggType.d.ts" />

import Currency = GameConstants.Currency;

class Breeding implements Feature {
    name = 'Breeding';
    saveKey = 'breeding';

    defaults = {
        eggList: [ko.observable(new Egg()), ko.observable(new Egg()), ko.observable(new Egg()), ko.observable(new Egg())],
        eggSlots: 1,
        queueList: [],
        queueSlots: 0,
    };
    hatcheryHelpers = new HatcheryHelpers(this);

    private _eggList: Array<KnockoutObservable<Egg>>;
    private _eggSlots: KnockoutObservable<number>;

    private _queueList: KnockoutObservableArray<number>;
    public queueSlots: KnockoutObservable<number>;

    public hatchList: { [name: number]: PokemonNameType[][] } = {};

    constructor(private multiplier: Multiplier) {
        this._eggList = this.defaults.eggList;
        this._eggSlots = ko.observable(this.defaults.eggSlots);
        this._queueList = ko.observableArray(this.defaults.queueList);
        this.queueSlots = ko.observable(this.defaults.queueSlots);

        this._eggList.forEach((egg) => {
            egg.extend({deferred: true});
        });
        BreedingFilters.category.value(Settings.getSetting('breedingCategoryFilter').value);
        BreedingFilters.region.value(Settings.getSetting('breedingRegionFilter').value);
        BreedingFilters.type1.value(Settings.getSetting('breedingTypeFilter1').value);
        BreedingFilters.type2.value(Settings.getSetting('breedingTypeFilter2').value);
        BreedingFilters.shinyStatus.value(Settings.getSetting('breedingShinyFilter').value);
        BreedingFilters.pokerus.value(Settings.getSetting('breedingPokerusFilter').value);
        BreedingFilters.uniqueTransformation.value(Settings.getSetting('breedingUniqueTransformationFilter').value);
        BreedingController.displayValue(Settings.getSetting('breedingDisplayFilter').value);
        BreedingController.regionalAttackDebuff(+Settings.getSetting('breedingRegionalAttackDebuffSetting').value);
        BreedingController.queueSizeLimit(+Settings.getSetting('breedingQueueSizeSetting').value);
        BreedingFilters.uniqueTransformation.value.subscribe((v) => Settings.setSettingByName('breedingUniqueTransformationFilter', v));
    }

    initialize(): void {
        this.hatchList[EggType.Fire] = [
            ['Charmander', 'Vulpix', 'Growlithe', 'Ponyta'],
            ['Cyndaquil', 'Slugma', 'Houndour', 'Magby'],
            ['Torchic', 'Numel'],
            ['Chimchar'],
            ['Tepig', 'Pansear', 'Darumaka'],
            ['Fennekin', 'Litleo'],
            ['Litten', 'Salandit'],
            ['Scorbunny', 'Sizzlipede'],
            ['Fuecoco', 'Charcadet'],
        ];
        this.hatchList[EggType.Water] = [
            ['Squirtle', 'Lapras', 'Staryu', 'Slowpoke'],
            ['Totodile', 'Wooper', 'Marill', 'Qwilfish'],
            ['Mudkip', 'Feebas', 'Clamperl'],
            ['Piplup', 'Finneon', 'Buizel'],
            ['Oshawott', 'Panpour', 'Tympole'],
            ['Froakie', 'Clauncher', 'Skrelp'],
            ['Popplio', 'Wimpod', 'Mareanie'],
            ['Sobble', 'Chewtle', 'Arrokuda'],
            ['Quaxly'],
        ];
        this.hatchList[EggType.Grass] = [
            ['Bulbasaur', 'Oddish', 'Tangela', 'Paras'],
            ['Chikorita', 'Hoppip', 'Sunkern'],
            ['Treecko', 'Tropius', 'Roselia'],
            ['Turtwig', 'Snover', 'Budew'],
            ['Snivy', 'Pansage', 'Maractus'],
            ['Chespin', 'Skiddo', 'Phantump'],
            ['Rowlet', 'Morelull', 'Fomantis'],
            ['Grookey', 'Gossifleur','Applin'],
            ['Sprigatito'],
        ];
        this.hatchList[EggType.Fighting] = [
            ['Hitmonlee', 'Hitmonchan', 'Machop', 'Mankey'],
            ['Tyrogue', 'Heracross'],
            ['Makuhita', 'Meditite'],
            ['Riolu', 'Croagunk'],
            ['Throh', 'Sawk', 'Scraggy'],
            ['Pancham', 'Hawlucha'],
            ['Crabrawler', 'Stufful'],
            ['Falinks', 'Clobbopus', 'Galarian Farfetch\'d'],
        ];
        this.hatchList[EggType.Electric] = [
            ['Magnemite', 'Pikachu', 'Voltorb', 'Electabuzz'],
            ['Chinchou', 'Mareep', 'Elekid'],
            ['Plusle', 'Minun', 'Electrike'],
            ['Pachirisu', 'Shinx'],
            ['Blitzle', 'Stunfisk', 'Joltik'],
            ['Helioptile', 'Dedenne'],
            ['Togedemaru'],
            ['Toxel', 'Pincurchin', 'Morpeko'],
        ];
        this.hatchList[EggType.Dragon] = [
            ['Dratini', 'Dragonair', 'Dragonite'],
            [],
            ['Bagon', 'Shelgon', 'Salamence'],
            ['Gible', 'Gabite', 'Garchomp'],
            ['Deino', 'Zweilous', 'Hydreigon'],
            ['Goomy', 'Sliggoo', 'Goodra'],
            ['Turtonator', 'Drampa', 'Jangmo-o', 'Hakamo-o', 'Kommo-o'],
            ['Dreepy', 'Drakloak', 'Dragapult', 'Duraludon'],
            ['Frigibax', 'Arctibax', 'Baxcalibur'],
        ];
        this.hatchList[EggType.Mystery] = [
            ['Gastly', 'Jigglypuff', 'Geodude', 'Doduo'],
            ['Yanma', 'Stantler'],
            ['Trapinch', 'Sableye', 'Spoink'],
            ['Stunky', 'Bronzor'],
            ['Vanillite', 'Drilbur'],
            ['Carbink', 'Honedge'],
            ['Mudbray', 'Rockruff'],
            ['Rolycoly', 'Milcery'],
        ];
        BreedingController.initialize();
    }

    update(delta: number): void {
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Mystery_egg);
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        this.eggSlots = json.eggSlots ?? this.defaults.eggSlots;

        this._eggList = this.defaults.eggList;
        if (json.eggList !== null) {
            const saveEggList: Record<string, any>[] = json.eggList;

            for (let i = 0; i < this._eggList.length; i++) {
                if (saveEggList[i] != null) {
                    const egg: Egg = new Egg(null, null, null);
                    egg.fromJSON(saveEggList[i]);
                    this._eggList[i](egg);
                }
            }
        }
        this.queueSlots(json.queueSlots ?? this.defaults.queueSlots);
        this._queueList(json.queueList ? json.queueList : this.defaults.queueList);
        this.hatcheryHelpers.fromJSON(json.hatcheryHelpers || []);
    }


    toJSON(): Record<string, any> {
        return {
            eggList: this.eggList.map(egg => egg() === null ? new Egg() : egg().toJSON()),
            eggSlots: this.eggSlots,
            queueList: this._queueList(),
            queueSlots: this.queueSlots(),
            hatcheryHelpers: this.hatcheryHelpers.toJSON(),
        };
    }

    public canBreedPokemon(): boolean {
        return App.game.party.hasMaxLevelPokemon() && (this.hasFreeEggSlot() || this.hasFreeQueueSlot());
    }

    public hasFreeEggSlot(isHelper = false): boolean {
        let counter = 0;
        for (let i = 0; i < this._eggList.length; i++) {
            if (!this._eggList[i]().isNone() || (!isHelper && this.hatcheryHelpers.hired()[i])) {
                counter++;
            }
        }
        return counter < this._eggSlots();
    }

    public hasFreeQueueSlot(): boolean {
        const slots = this.usableQueueSlots();
        return slots && this._queueList().length < slots;
    }

    public gainEgg(e: Egg, eggSlot = -1) {
        if (e.isNone()) {
            return false;
        }

        if (eggSlot === -1) {
            // Throw egg in the first empty non-Helper slot
            for (let i = 0; i < this._eggList.length; i++) {
                if (this._eggList[i]().isNone() && !this.hatcheryHelpers.hired()[i]) {
                    this._eggList[i](e);
                    return true;
                }
            }
        } else {
            // Throw egg in the Helper slot if it's empty
            if (this._eggList[eggSlot]?.().isNone()) {
                this._eggList[eggSlot](e);
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
        route = MapHelper.normalizeRoute(route, region);
        return this.progressEggs(+Math.sqrt(route).toFixed(2));
    }

    public progressEggs(amount: number) {
        amount *= this.getStepMultiplier();

        amount = Math.round(amount);
        let index = this.eggList.length;
        let emptySlots = 0;
        while (index-- > 0) {
            const helper = this.hatcheryHelpers.hired()[index];
            if (helper) {
                continue;
            }
            const egg = this.eggList[index]();
            if (egg.isNone() && index + 1 <= this._eggSlots()) {
                emptySlots++;
                continue;
            }
            const partyPokemon = egg.partyPokemon();
            if (!egg.isNone() && partyPokemon && partyPokemon.canCatchPokerus() && partyPokemon.pokerus == GameConstants.Pokerus.Uninfected) {
                partyPokemon.calculatePokerus(index);
            }
            egg.addSteps(amount, this.multiplier);
            if (this._queueList().length && egg.canHatch()) {
                this.hatchPokemonEgg(index, false);
                emptySlots++;
            }
        }

        this.hatcheryHelpers.addSteps(amount, this.multiplier);

        if (emptySlots) {
            // Check for any empty slots between incubating eggs, move them if a gap is found.
            // For example, if the first empty slot is index 2 but there are 3 slots with eggs then there is a gap.
            const firstEmptySlot = this._eggList.findIndex((egg, i) => egg().isNone() && !this.hatcheryHelpers.hired()[i]);
            if (firstEmptySlot > -1) {
                const slotsWithEggs = this._eggList.filter((egg, i) => !egg().isNone() && !this.hatcheryHelpers.hired()[i]).length;
                if (firstEmptySlot < slotsWithEggs) {
                    this.moveEggs();
                }
            }

            // Fill empty egg slots from queue.
            while (this._queueList().length && emptySlots--) {
                this.nextEggFromQueue();
            }
        }
    }

    private getStepMultiplier() {
        return this.multiplier.getBonus('eggStep');
    }

    public addPokemonToHatchery(pokemon: PartyPokemon): boolean {
        // If they have a free eggslot, add the pokemon to the egg now
        if (this.hasFreeEggSlot()) {
            return this.gainPokemonEgg(pokemon);
        }
        // If they have a free queue, add the pokemon to the queue now
        if (this.hasFreeQueueSlot()) {
            return this.addToQueue(pokemon);
        }
        let message = 'You don\'t have any free egg slots';
        if (this.queueSlots()) {
            message += '<br/>Your queue is full';
        }
        Notifier.notify({
            message,
            type: NotificationConstants.NotificationOption.warning,
        });
        return false;
    }

    public addToQueue(pokemon: PartyPokemon): boolean {
        const queueSize = this._queueList().length;
        if (queueSize < this.usableQueueSlots()) {
            pokemon.breeding = true;
            this._queueList.push(pokemon.id);
            return true;
        }
        return false;
    }

    public removeFromQueue(index: number): boolean {
        const queueSize = this._queueList().length;
        if (queueSize > index) {
            const pokemonId = this._queueList.splice(index, 1)[0];
            App.game.party._caughtPokemon().find(p => p.id == pokemonId).breeding = false;
            return true;
        }
        return false;
    }

    public clearQueue(shouldConfirm = false) {
        if (shouldConfirm) {
            Notifier.confirm({
                title: 'Clear Queue',
                message: 'Are you sure?\n\nAll Pokémon will be removed from your breeding queue.',
                type: NotificationConstants.NotificationOption.warning,
                confirm: 'Clear',
            }).then(confirmed => {
                if (confirmed) {
                    while (this._queueList().length) {
                        this.removeFromQueue(0);
                    }
                }
            });
        } else {
            while (this._queueList().length) {
                this.removeFromQueue(0);
            }
        }
    }

    public gainPokemonEgg(pokemon: PartyPokemon | PokemonListData, eggSlot = -1): boolean {
        if (eggSlot === -1 && !this.hasFreeEggSlot()) {
            // Check that an empty, non-Helper slot exists
            Notifier.notify({
                message: 'You don\'t have any free egg slots',
                type: NotificationConstants.NotificationOption.warning,
            });
            return false;
        }

        const egg = this.createEgg(pokemon.id);
        const success = this.gainEgg(egg, eggSlot);

        if (success && pokemon instanceof PartyPokemon) {
            pokemon.breeding = true;
        }

        return success;
    }

    public hatchPokemonEgg(index: number, nextEgg = true): void {
        const egg: Egg = this._eggList[index]();
        const hatched = egg.hatch();
        if (hatched) {
            this._eggList[index](new Egg());
            if (nextEgg) {
                this.moveEggs();
                if (this._queueList().length) {
                    this.nextEggFromQueue();
                }
            }
        }
    }

    private nextEggFromQueue(): void {
        const nextEgg = this.createEgg(this._queueList.shift());
        this.gainEgg(nextEgg);
        if (!this._queueList().length) {
            Notifier.notify({
                message: 'Hatchery queue is empty.',
                type: NotificationConstants.NotificationOption.success,
                timeout: 1e4,
                sound: NotificationConstants.NotificationSound.Hatchery.empty_queue,
                setting: NotificationConstants.NotificationSetting.Hatchery.empty_queue,
            });
        }
    }

    public moveEggs(): void {
        const tempEggList = App.game.breeding._eggList.filter((egg, i) => egg().type != EggType.None && !this.hatcheryHelpers.hired()[i]);
        let tempEggIndex = 0;
        this._eggList.forEach((egg, index) => {
            if (this.hatcheryHelpers.hired()[index]) {
                return;
            }
            egg(tempEggList[tempEggIndex] ? tempEggList[tempEggIndex++]() : new Egg());
        });
    }

    public createEgg(pokemonId: number, type = EggType.Pokemon): Egg {
        const dataPokemon: DataPokemon = PokemonHelper.getPokemonById(pokemonId);
        return new Egg(type, this.getSteps(dataPokemon.eggCycles), pokemonId);
    }

    public createTypedEgg(type: EggType): Egg {
        const hatchList = this.hatchList[type];
        const hatchable = hatchList.slice(0, player.highestRegion() + 1).filter(list => list.length);

        // highest region has 1/ratio chance, next highest has 1/(ratio ^ 2), etc.
        // Leftover is given to Kanto, making Kanto and Johto equal chance
        const ratio = 2;
        const possibleHatches = GameConstants.expRandomElement(hatchable, ratio);

        const pokemonName = Rand.fromArray(possibleHatches);
        const pokemonId = PokemonHelper.getPokemonByName(pokemonName).id;
        return this.createEgg(pokemonId, type);
    }

    public createRandomEgg(): Egg {
        const type = +Rand.fromArray(Object.keys(this.hatchList));
        const egg = this.createTypedEgg(type);
        egg.type = EggType.Mystery;
        return egg;
    }

    public createFossilEgg(fossil: string): Egg {
        const pokemonName: PokemonNameType = GameConstants.FossilToPokemon[fossil];
        const pokemonNativeRegion = PokemonHelper.calcNativeRegion(pokemonName);
        let fossilEgg: Egg;
        if (pokemonNativeRegion > player.highestRegion()) {
            Notifier.notify({
                message: 'You must progress further before you can uncover this fossil Pokémon!',
                type: NotificationConstants.NotificationOption.warning,
                timeout: 5e3,
            });
            fossilEgg = new Egg();
        } else {
            const pokemonId = PokemonHelper.getPokemonByName(pokemonName).id;
            fossilEgg = this.createEgg(pokemonId, EggType.Fossil);
        }
        return fossilEgg;
    }

    public getSteps(eggCycles: number) {
        if (eggCycles === undefined) {
            return 500;
        } else {
            return eggCycles * GameConstants.EGG_CYCLE_MULTIPLIER;
        }
    }

    public calculateBaseForm(pokemonName: PokemonNameType): PokemonNameType {
        const devolution = pokemonBabyPrevolutionMap[pokemonName];
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

    public getEggSlotCost(slot: number): number {
        return 500 * slot;
    }

    public buyEggSlot(): void {
        const cost: Amount = this.nextEggSlotCost();
        if (App.game.wallet.loseAmount(cost)) {
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

    get queueList(): KnockoutObservable<Array<number>> {
        return this._queueList;
    }

    public gainEggSlot(): void {
        if (this.eggSlots === this.eggList.length) {
            console.error('Cannot gain another eggslot.');
            return;
        }
        this.eggSlots += 1;
    }

    public gainQueueSlot(amt = 1): void {
        GameHelper.incrementObservable(this.queueSlots, amt);
    }

    public queueSlotsGainedFromRegion(region: GameConstants.Region): number {
        // bewtween 4 → 32 queue slots gained when completing a region
        return Math.min(32, Math.max(4, 4 * Math.pow(2, region - 1)));
    }

    get eggList(): Array<KnockoutObservable<Egg>> {
        return this._eggList;
    }

    set eggList(value: Array<KnockoutObservable<Egg>>) {
        this._eggList = value;
    }

    getAllCaughtStatus(): CaughtStatus {
        return GameHelper.enumNumbers(EggType).reduce((status: CaughtStatus, type: EggType) => {
            return this.hatchList[type]
                ? Math.min(status, this.getTypeCaughtStatus(type))
                : status;
        }, CaughtStatus.CaughtShiny);
    }

    getTypeCaughtStatus(type: EggType): CaughtStatus {
        const hatchList = this.hatchList[type];
        if (!hatchList) {
            return CaughtStatus.NotCaught;
        }

        const hatchable = hatchList.slice(0, player.highestRegion() + 1).flat();

        return hatchable.reduce((status: CaughtStatus, pname: PokemonNameType) => {
            return Math.min(status, PartyController.getCaughtStatusByName(pname));
        }, CaughtStatus.CaughtShiny);
    }

    checkCloseModal(): void {
        if (Settings.getSetting('hideHatchery').value == 'queue' && !this.hasFreeEggSlot() && !this.hasFreeQueueSlot()) {
            $('#breedingModal').modal('hide');
        }
        if (Settings.getSetting('hideHatchery').value == 'egg' && !this.hasFreeEggSlot()) {
            $('#breedingModal').modal('hide');
        }
    }

    public usableQueueSlots = ko.pureComputed(() => {
        const queueSizeSetting = BreedingController.queueSizeLimit();
        return queueSizeSetting > -1 ? Math.min(queueSizeSetting, this.queueSlots()) : this.queueSlots();
    });

    public updateQueueSizeLimit(size: number) {
        BreedingController.queueSizeLimit(size);
        if (size == 0) {
            this.clearQueue();
        } else if (size > 0) {
            for (let i = this.queueList().length; i > this.usableQueueSlots(); i--) {
                this.removeFromQueue(i - 1);
            }
        }
    }

    public fireAllButtonTooltip(): string {
        let str = '';
        this.hatcheryHelpers.hired().forEach(x => {
            str += `<img src="assets/images/profile/trainer-${x.trainerSprite}.png" width="20px">&nbsp; ${x.name} <img src="assets/images/currency/${GameConstants.Currency[x.cost.currency]}.svg" width="20px">&nbsp;${(x.cost.amount).toLocaleString('en-US')} <br/>`;
        });
        return str;
    }
}
