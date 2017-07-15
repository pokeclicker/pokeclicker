/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {

    private _money: KnockoutObservable<number>;
    private _dungeonTokens: KnockoutObservable<number>;
    private _caughtShinyList: KnockoutObservableArray<string>;
    private _route: KnockoutObservable<number>;
    private _caughtPokemonList: KnockoutObservableArray<CaughtPokemon>;
    private _routeKills: Array<KnockoutObservable<number>>;
    private _routeKillsNeeded: KnockoutObservable<number>;
    private _region: GameConstants.Region;
    private _gymBadges: KnockoutObservableArray<GameConstants.Badge>;
    private _pokeballs: Array<KnockoutObservable<number>>;
    private _notCaughtBallSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtBallSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _sortOption: KnockoutObservable<GameConstants.SortOptionsEnum>;
    private _sortDescending: KnockoutObservable<boolean>;
    private _town: KnockoutObservable<Town>;
    private _starter: GameConstants.Starter;
    private _oakItemExp: Array<KnockoutObservable<number>>;
    private _oakItemsEquipped: string[];
    private _eggList: KnockoutObservableArray<Egg>;
    private _eggSlots: KnockoutObservable<number>;

    private _itemList: { [name: string]: number };
    private _itemMultipliers: { [name: string]: number };

    private _keyItems: KnockoutObservableArray<string> = ko.observableArray<string>();
    public clickAttackObservable: KnockoutComputed<number>;
    public recentKeyItem: KnockoutObservable<string> = ko.observable("Teachy tv");
    public pokemonAttackObservable: KnockoutComputed<number>;

    public routeKillsObservable(route: number): KnockoutComputed<number> {
        return ko.computed(function () {
            return Math.min(this.routeKillsNeeded, this.routeKills[route]());
        }, this);
    }

    public pokeballsObservable(ball: GameConstants.Pokeball): KnockoutComputed<number> {
        return ko.computed(function () {
            return this._pokeballs[ball]();
        }, this);
    }

    public setAlreadyCaughtBallSelection(ball: GameConstants.Pokeball) {
        this._alreadyCaughtBallSelection(ball);
    }

    public setNotCaughtBallSelection(ball: GameConstants.Pokeball) {
        this._notCaughtBallSelection(ball);
    }

    public gainPokeballs(ball: GameConstants.Pokeball, amount: number) {
        this._pokeballs[ball](this._pokeballs[ball]() + amount)
    }

    public usePokeball(ball: GameConstants.Pokeball): void {
        this._pokeballs[ball](this._pokeballs[ball]() - 1)
    }

    constructor(savedPlayer?) {
        let saved: boolean = (savedPlayer != null);
        savedPlayer = savedPlayer || {};
        let tmpCaughtList = [];
        this._money = ko.observable(savedPlayer._money || 0);
        this._dungeonTokens = ko.observable(savedPlayer._dungeonTokens || 0);
        this._caughtShinyList = ko.observableArray<string>(savedPlayer._caughtShinyList);
        if (savedPlayer._route == null || savedPlayer._route == 0) {
            this._route = ko.observable(1);
        } else {
            this._route = ko.observable(savedPlayer._route)
        }

        if (savedPlayer._caughtPokemonList) {
            tmpCaughtList = savedPlayer._caughtPokemonList.map((pokemon) => {
                return new CaughtPokemon(PokemonHelper.getPokemonByName(pokemon.name), pokemon.evolved, pokemon.attackBonus, pokemon.exp)
            });
        }
        this._caughtPokemonList = ko.observableArray<CaughtPokemon>(tmpCaughtList);
        this._routeKills = Array.apply(null, Array(GameConstants.AMOUNT_OF_ROUTES + 1)).map(function (val, index) {
            return ko.observable(savedPlayer._routeKills ? (savedPlayer._routeKills[index] || 0) : 0)
        });

        this._oakItemExp = Array.apply(null, Array(GameConstants.AMOUNT_OF_OAKITEMS + 1)).map(function (val, index) {
            return ko.observable(savedPlayer._oakItemExp ? (savedPlayer._oakItemExp[index] || 0) : 0)
        });
        this._oakItemsEquipped = savedPlayer._oakItemsEquipped || [];
        this._routeKillsNeeded = ko.observable(savedPlayer._routeKillsNeeded || 10);
        this._region = savedPlayer._region || GameConstants.Region.kanto;
        this._gymBadges = ko.observableArray<GameConstants.Badge>(savedPlayer._gymBadges);
        this._keyItems = ko.observableArray<string>(savedPlayer._keyItems);
        this._pokeballs = Array.apply(null, Array(4)).map(function (val, index) {
            return ko.observable(savedPlayer._pokeballs ? (savedPlayer._pokeballs[index] || 1000) : 1000)
        });
        this._notCaughtBallSelection = typeof(savedPlayer._notCaughtBallSelection) != 'undefined' ? ko.observable(savedPlayer._notCaughtBallSelection) : ko.observable(GameConstants.Pokeball.Pokeball);
        this._alreadyCaughtBallSelection = typeof(savedPlayer._alreadyCaughtBallSelection) != 'undefined' ? ko.observable(savedPlayer._alreadyCaughtBallSelection) : ko.observable(GameConstants.Pokeball.Pokeball);
        if (this._gymBadges().length == 0) {
            this._gymBadges.push(GameConstants.Badge.None)
        }
        this._sortOption = ko.observable(savedPlayer._sortOption || GameConstants.SortOptionsEnum.id);
        this._sortDescending = ko.observable(typeof(savedPlayer._sortDescending) != 'undefined' ? savedPlayer._sortDescending : false);
        this.clickAttackObservable = ko.computed(function () {
            return this.calculateClickAttack()
        }, this);
        this.pokemonAttackObservable = ko.computed(function () {
            return this.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None);
        }, this);
        this._town = ko.observable(TownList["Pallet Town"]);
        this._starter = savedPlayer._starter || GameConstants.Starter.None;
        this._itemList = savedPlayer._itemList || Save.initializeItemlist();
        this._itemMultipliers = savedPlayer._itemMultipliers || Save.initializeMultipliers();
        this._eggList = ko.observableArray(savedPlayer._eggList != null ? savedPlayer._eggList : []);
        this._eggSlots = ko.observable(savedPlayer._eggSlots != null ? savedPlayer._eggSlots : 1);

        //TODO remove before deployment
        if (!debug) {
            if (!saved) {
                StartSequenceRunner.start()
            }
        }
    }

    public addRouteKill() {
        this.routeKills[this.route()](this.routeKills[this.route()]() + 1)
    }

    public hasKeyItem(name: string): boolean {
        for (let i = 0; i < this._keyItems().length; i++) {
            if (this._keyItems()[i] == name) {
                return true;
            }
        }
        return false;
    }

    public gainKeyItem(name: string, supressModal?: boolean) {
        if (!this.hasKeyItem(name)) {
            this.recentKeyItem(name);
            if (!supressModal) {
                $("#keyItemModal").modal('show');
            }
            this._keyItems().push(name);
            KeyItemHandler.getKeyItemObservableByName(name).valueHasMutated();
        }
    }

    public calculateOakItemSlots(): KnockoutObservable<number> {
        let total = 0;
        if (this.caughtPokemonList.length >= GameConstants.OAKITEM_FIRST_UNLOCK) {
            total++;
        }
        if (this.caughtPokemonList.length >= GameConstants.OAKITEM_SECOND_UNLOCK) {
            total++;
        }

        if (this.caughtPokemonList.length >= GameConstants.OAKITEM_THIRD_UNLOCK) {
            total++;
        }
        return ko.observable(total);
    }

    public gainOakItemExp(item: GameConstants.OakItem, amount: number) {
        this.oakItemExp[item](this.oakItemExp[item]() + amount)
    }

    public getOakItemExp(item: GameConstants.OakItem): number {
        return this.oakItemExp[item]();
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public calculatePokemonAttack(type1: GameConstants.PokemonType, type2: GameConstants.PokemonType): number {
        // TODO Calculate pokemon attack by checking the caught list, upgrades and multipliers.
        // TODO factor in types
        // TODO start at 0
        let attack = 0;
        for (let pokemon of this.caughtPokemonList) {
            attack += pokemon.attack();
        }

        // return attack;
        return attack;
    }

    public calculateClickAttack(): number {
        // TODO Calculate click attack by checking the caught list size, upgrades and multipliers.
        let oakItemBonus = OakItemRunner.isActive("Poison Barb") ? (1 + OakItemRunner.calculateBonus("Poison Barb") / 100) : 1;
        return Math.floor(Math.pow(this.caughtPokemonList.length + 1, 1.4) * oakItemBonus);
    }

    public calculateMoneyMultiplier(): number {
        // TODO Calculate money multiplier by checking upgrades and multipliers.
        return 1;
    }

    public calculateExpMultiplier(): number {
        // TODO Calculate exp multiplier by checking upgrades and multipliers.
        return 1;
    }

    public calculateDungeonTokenMultiplier(): number {
        // TODO Calculate dungeon token multiplier by checking upgrades and multipliers.
        return 1;
    }

    public calculateCatchTime(caughtYet?: boolean): number {
        let ball: GameConstants.Pokeball = this._alreadyCaughtBallSelection();
        if (!caughtYet) {
            ball = this._notCaughtBallSelection();
        }

        switch (ball) {
            case GameConstants.Pokeball.Pokeball:
                return 1250;
            case GameConstants.Pokeball.Greatball:
                return 1000;
            case GameConstants.Pokeball.Ultraball:
                return 750;
            case GameConstants.Pokeball.Masterball:
                return 500;
            default:
                return 0;
        }
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param alreadyCaught if the pokémon is already caught.
     * @param shiny if the pokémon is shiny.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(alreadyCaught: boolean, shiny: boolean): GameConstants.Pokeball {
        let pref: GameConstants.Pokeball;
        if (alreadyCaught) {
            pref = this._alreadyCaughtBallSelection();
        } else {
            pref = this._notCaughtBallSelection();
        }

        // Always throw the highest available Pokéball at shinies
        if (shiny) {
            pref = GameConstants.Pokeball.Masterball;
        }

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        for (let i: number = pref; i >= 0; i--) {
            if (this._pokeballs[i]() > 0) {
                use = i;
                break;
            }
        }
        return use;
    }

    /**
     * Loops through the caughtPokemonList to check if the pokémon is already caight
     * @param pokemonName name to search for.
     * @returns {boolean}
     */
    public alreadyCaughtPokemon(pokemonName: string) {
        for (let i: number = 0; i < this.caughtPokemonList.length; i++) {
            if (this.caughtPokemonList[i].name == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public alreadyCaughtPokemonShiny(pokemonName: string) {
        for (let i: number = 0; i < this.caughtShinyList().length; i++) {
            if (this.caughtShinyList()[i] == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public capturePokemon(pokemonName: string, shiny: boolean = false, supressNotification = false) {
        OakItemRunner.use("Magic Ball");
        if (!this.alreadyCaughtPokemon(pokemonName)) {
            let pokemonData = PokemonHelper.getPokemonByName(pokemonName);
            let caughtPokemon: CaughtPokemon = new CaughtPokemon(pokemonData, false, 0, 0);
            this._caughtPokemonList.push(caughtPokemon);
            if (!supressNotification) {
                Notifier.notify("You have captured " + pokemonName, GameConstants.NotificationOption.success)
            }
        }
        if (shiny && !this.alreadyCaughtPokemonShiny(pokemonName)) {
            this._caughtShinyList.push(pokemonName);
            Save.store(player);
        }
    }

    public hasBadge(badge: GameConstants.Badge) {
        if (badge == undefined || GameConstants.Badge.None) {
            return true;
        }
        for (let i = 0; i < this._gymBadges().length; i++) {
            if (this._gymBadges()[i] == badge) {
                return true;
            }
        }
        return false;
    }

    public gainMoney(money: number) {
        OakItemRunner.use("Amulet Coin");
        // TODO add money multipliers
        let oakItemBonus = OakItemRunner.isActive("Amulet Coin") ? (1 + OakItemRunner.calculateBonus("Amulet Coin") / 100) : 1;
        this._money(Math.floor(this._money() + money * oakItemBonus));
    }

    public hasMoney(money: number) {
        return this._money() >= money;
    }

    public payMoney(money: number) {
        if (this.hasMoney(money)) {
            this._money(Math.floor(this._money() - money));
        }
    }

    public gainExp(exp: number, level: number, trainer: boolean) {
        OakItemRunner.use("Exp Share");
        // TODO add exp multipliers
        let trainerBonus = trainer ? 1.5 : 1;
        let oakItemBonus = OakItemRunner.isActive("Exp Share") ? 1 + (OakItemRunner.calculateBonus("Exp Share") / 100) : 1;
        let expTotal = Math.floor(exp * level * trainerBonus * oakItemBonus / 9);

        for (let pokemon of this._caughtPokemonList()) {
            if (pokemon.levelObservable() < (this.gymBadges.length + 2) * 10) {
                pokemon.exp(pokemon.exp() + expTotal);
            }
        }
    }

    public sortedPokemonList(): KnockoutComputed<Array<CaughtPokemon>> {
        return ko.pureComputed(function () {
            return this._caughtPokemonList().sort(PokemonHelper.compareBy(GameConstants.SortOptionsEnum[player._sortOption()], player._sortDescending()))
        }, this).extend({rateLimit: player.calculateCatchTime()})
    }

    public maxLevelPokemonList(): KnockoutComputed<Array<CaughtPokemon>> {
        return ko.pureComputed(function () {
            return this._caughtPokemonList().filter((pokemon) => {
                return pokemon.levelObservable() == 100;
            })
        }, this)
    }

    public canBreedPokemon(): boolean {
        return this.hasMaxLevelPokemon() && this.hasFreeEggSlot();
    }

    public hasMaxLevelPokemon(): boolean {
        return this.maxLevelPokemonList()().length > 0;
    }

    public hasFreeEggSlot(): boolean {
        return this._eggList().length < this._eggSlots();
    }

    public gainBadge(badge: GameConstants.Badge) {
        this._gymBadges().push(badge);
    }

    get routeKills(): Array<KnockoutObservable<number>> {
        return this._routeKills;
    }

    set routeKills(value: Array<KnockoutObservable<number>>) {
        this._routeKills = value;
    }

    get routeKillsNeeded(): number {
        return this._routeKillsNeeded();
    }

    set routeKillsNeeded(value: number) {
        this._routeKillsNeeded(value);
    }

    get route(): KnockoutObservable<number> {
        return this._route;
    }

    set route(value: KnockoutObservable<number>) {
        this._route = value;
    }

    get money(): number {
        return this._money();
    }

    get dungeonTokens(): KnockoutObservable<number> {
        return this._dungeonTokens;
    }

    get caughtPokemonList() {
        return this._caughtPokemonList();
    }

    get region(): GameConstants.Region {
        return this._region;
    }

    set region(value: GameConstants.Region) {
        this._region = value;
    }

    get gymBadges(): GameConstants.Badge[] {
        return this._gymBadges();
    }

    set gymBadges(value: GameConstants.Badge[]) {
        this._gymBadges(value);
    }

    get caughtShinyList(): KnockoutObservableArray<string> {
        return this._caughtShinyList;
    }

    set caughtShinyList(value: KnockoutObservableArray<string>) {
        this._caughtShinyList = value;
    }

    get town(): KnockoutObservable<Town> {
        return this._town;
    }

    set town(value: KnockoutObservable<Town>) {
        this._town = value;
    }

    get oakItemsEquipped(): string[] {
        return this._oakItemsEquipped;
    }

    set oakItemsEquipped(value: string[]) {
        this._oakItemsEquipped = value;
    }

    get starter(): GameConstants.Starter {
        return this._starter;
    }

    set starter(value: GameConstants.Starter) {
        this._starter = value;
    }

    get oakItemExp(): Array<KnockoutObservable<number>> {
        return this._oakItemExp;
    }

    set oakItemExp(value: Array<KnockoutObservable<number>>) {
        this._oakItemExp = value;
    }

    get itemList(): { [p: string]: number } {
        return this._itemList;
    }

    set itemList(value: { [p: string]: number }) {
        this._itemList = value;
    }

    public gainItem(itemName: string, amount: number) {
        this._itemList[itemName] += amount;
    }

    public loseItem(itemname: string, amount: number) {
        this._itemList[itemname] -= amount;
    }

    public lowerItemMultipliers() {
        for (let obj in ItemList) {
            let item = ItemList[obj];
            item.decreasePriceMultiplier();
        }
    }

    get itemMultipliers(): { [p: string]: number } {
        return this._itemMultipliers;
    }

    set itemMultipliers(value: { [p: string]: number }) {
        this._itemMultipliers = value;
    }

    get eggList(): KnockoutObservableArray<Egg> {
        return this._eggList;
    }

    get eggSlots(): KnockoutObservable<number> {
        return this._eggSlots;
    }

    public gainEggSlot() {
        this._eggSlots(this._eggSlots() + 1);
    }

    public toJSON() {
        let keep = ["_money",
            "_dungeonTokens",
            "_caughtShinyList",
            "_route",
            "_caughtPokemonList",
            "_routeKills",
            "_routeKillsNeeded",
            "_region",
            "_gymBadges",
            "_pokeballs",
            "_notCaughtBallSelection",
            "_alreadyCaughtBallSelection",
            "_sortOption",
            "_sortDescending",
            "_starter",
            "_oakItemExp",
            "_oakItemsEquipped",
            "_itemList",
            "_itemMultipliers",
            "_keyItems",
            "_eggList",
            "_eggSlots"];
        let plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep)
    }

}

