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
    private _eggList: Array<KnockoutObservable<Egg|void>>;
    private _eggSlots: KnockoutObservable<number>;

    private _itemList: { [name: string]: number };
    private _itemMultipliers: { [name: string]: number };

    private _mineEnergy: KnockoutObservable<number>;
    private _maxMineEnergy: KnockoutObservable<number>;
    private _mineEnergyGain: KnockoutObservable<number>;
    private _mineInventory: KnockoutObservableArray<any>;
    private _diamonds: KnockoutObservable<number>;
    private _maxDailyDeals: KnockoutObservable<number>;
    private _maxUndergroundItems: KnockoutObservable<number>;
    private _mineEnergyRegenTime: KnockoutObservable<number>;

    private _shardUpgrades: Array<Array<KnockoutObservable<number>>>;
    private _shardsCollected: Array<KnockoutObservable<number>>;

    private _keyItems: KnockoutObservableArray<string> = ko.observableArray<string>();
    public clickAttackObservable: KnockoutComputed<number>;
    public recentKeyItem: KnockoutObservable<string> = ko.observable("Teachy tv");
    public pokemonAttackObservable: KnockoutComputed<number>;
    public achievementsCompleted: {[name: string]: boolean};

    public plotList: KnockoutObservableArray<KnockoutObservable<Plot>>;
    public farmPoints: KnockoutObservable<number>;
    public seedList: KnockoutObservable<number>[];
    public berryList: KnockoutObservable<number>[];

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
                return new CaughtPokemon(PokemonHelper.getPokemonByName(pokemon.name), pokemon.evolved, pokemon.attackBonus, pokemon.exp, pokemon.breeding)
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
            let amt = 1000;
            if (savedPlayer._pokeballs && typeof savedPlayer._pokeballs[index] == 'number') {
                amt = savedPlayer._pokeballs[index];
            }
            return ko.observable(amt);
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
        this._mineEnergy = ko.observable((typeof savedPlayer._mineEnergy == 'number') ? savedPlayer._mineEnergy : 50);
        this._maxMineEnergy = ko.observable(savedPlayer._maxMineEnergy || GameConstants.MineUpgradesInitialValues.maxMineEnergy);
        this._mineEnergyGain = ko.observable(savedPlayer._mineEnergyGain || GameConstants.MineUpgradesInitialValues.mineEnergyGain);
        this._mineInventory = ko.observableArray(savedPlayer._mineInventory || []);
        for (let item of this._mineInventory()) {
            item.amount = ko.observable(item.amount);
        }
        this._diamonds = ko.observable(savedPlayer._diamonds || 0);
        this._maxDailyDeals = ko.observable(savedPlayer._maxDailyDeals || GameConstants.MineUpgradesInitialValues.maxDailyDeals);
        this._maxUndergroundItems = ko.observable(savedPlayer._maxUndergroundItems || GameConstants.MineUpgradesInitialValues.maxUndergroundItems);
        this._mineEnergyRegenTime = ko.observable(savedPlayer._mineEnergyRegenTime || GameConstants.MineUpgradesInitialValues.mineEnergyRegenTime);
        savedPlayer._eggList = savedPlayer._eggList || [null, null, null, null];
        this._eggList = savedPlayer._eggList.map((egg) => {
            return ko.observable(egg ? new Egg(egg.totalSteps, egg.pokemon, egg.type, egg.steps, egg.shinySteps, egg.notified) : null)
        });
        this._eggSlots = ko.observable(savedPlayer._eggSlots != null ? savedPlayer._eggSlots : 1);
        this._shardUpgrades = Save.initializeShards(savedPlayer._shardUpgrades);

        this.achievementsCompleted = savedPlayer.achievementsCompleted || {};

        this._shardsCollected = Array.apply(null, Array<number>(18)).map((value, index) => {
            return ko.observable(savedPlayer._shardsCollected ? savedPlayer._shardsCollected[index] : 0);
        });

        this.farmPoints = ko.observable(savedPlayer.farmPoints || 0);
        this.seedList = Array.apply(null, Array(GameConstants.AMOUNT_OF_BERRIES)).map(function (val, index) {
            return ko.observable(savedPlayer.seedList ? (savedPlayer.seedList[index] || 0) : 0)
        });
        this.berryList = Array.apply(null, Array(GameConstants.AMOUNT_OF_BERRIES)).map(function (val, index) {
            return ko.observable(savedPlayer.berryList ? (savedPlayer.berryList[index] || 0) : 0)
        });
        this.plotList = savedPlayer.plotList || Save.initializePlots();

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

    public hasMineItems(){
        for( let i = 0; i< this._mineInventory().length; i++){
            if(this._mineInventory()[i].amount() > 0){
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
        // TODO Calculate pokemon attack by checking upgrades and multipliers.
        let attack = 0;
        for (let pokemon of this.caughtPokemonList) {
            if (!pokemon.breeding()) {
                if (Battle.enemyPokemon() == null || type1 == GameConstants.PokemonType.None) {
                    attack += pokemon.attack();
                } else {
                    let dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
                    attack += pokemon.attack() * TypeHelper.getAttackModifier(dataPokemon.type1, dataPokemon.type2, Battle.enemyPokemon().type1, Battle.enemyPokemon().type2);
                }
            }
        }

        return Math.round(attack);
    }

    public calculateClickAttack(): number {
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

    public calculateCatchTime(ball?: GameConstants.Pokeball): number {
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
                return 1250;
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

    public gainFarmPoints(points: number) {
        this.farmPoints(Math.floor(this.farmPoints() + points));
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

    public gainShards(pokemon: BattlePokemon) {
        let typeNum = GameConstants.PokemonType[pokemon.type1];
        player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + pokemon.shardReward);
        if (pokemon.type2 != GameConstants.PokemonType.None) {
            typeNum = GameConstants.PokemonType[pokemon.type2];
            player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + pokemon.shardReward);
        }
    }

    public buyShardUpgrade(typeNum: number, effectNum: number) {
        if (this.canBuyShardUpgrade(typeNum, effectNum)) {
            this._shardsCollected[typeNum](this._shardsCollected[typeNum]() - this.getShardUpgradeCost(typeNum, effectNum));
            this._shardUpgrades[typeNum][effectNum](this._shardUpgrades[typeNum][effectNum]() + 1);
        }
    }

    public canBuyShardUpgrade(typeNum: number, effectNum: number): boolean {
        let lessThanMax = this._shardUpgrades[typeNum][effectNum]() < GameConstants.MAX_SHARD_UPGRADES;
        let hasEnoughShards = this._shardsCollected[typeNum]() >= this.getShardUpgradeCost(typeNum, effectNum);
        return lessThanMax && hasEnoughShards;
    }

    public getShardUpgradeCost(typeNum: number, effectNum: number): number {
        let cost = (this._shardUpgrades[typeNum][effectNum]() + 1) * GameConstants.SHARD_UPGRADE_COST;
        return cost;
    }

    public sortedPokemonList(): KnockoutComputed<Array<CaughtPokemon>> {
        return ko.pureComputed(function () {
            return this._caughtPokemonList().sort(PokemonHelper.compareBy(GameConstants.SortOptionsEnum[player._sortOption()], player._sortDescending()));
        }, this).extend({rateLimit: player.calculateCatchTime()})
    }

    public maxLevelPokemonList(): KnockoutComputed<Array<CaughtPokemon>> {
        return ko.pureComputed(function () {
            return this._caughtPokemonList().filter((pokemon) => {
                return pokemon.levelObservable() == 100 && !pokemon.breeding();
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
        let counter = 0;
        for (let egg of this._eggList) {
            if (egg() !== null) {
                counter++;
            }
        }
        return counter < this._eggSlots();
    }

    public gainEgg(e: Egg) {
        for (let i = 0; i < this._eggList.length; i++) {
            if (this._eggList[i]() == null) {
                this._eggList[i](e);
                return;
            }
        }
        console.log("Error: Could not place egg " + e);
    }

    public gainBadge(badge: GameConstants.Badge) {
        this._gymBadges().push(badge);
    }

    public mineInventoryIndex(id: number): number {
        for( let i = 0; i<player._mineInventory().length; i++){
            if(player._mineInventory()[i].id === id){
                return i;
            }
        }
        return -1;
    }

    public getUndergroundItemAmount(id: number) {
        let index = this.mineInventoryIndex(id);
        if (index > -1){
            return player._mineInventory.peek()[index].amount();
        } else {
            return 0;
        }
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

    get itemList(): {[p: string]: number} {
        return this._itemList;
    }

    set itemList(value: {[p: string]: number}) {
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

    get itemMultipliers(): {[p: string]: number} {
        return this._itemMultipliers;
    }

    set itemMultipliers(value: {[p: string]: number}) {
        this._itemMultipliers = value;
    }

    get mineEnergy() {
        return this._mineEnergy();
    }

    set mineEnergy(n: number) {
        this._mineEnergy(n);
    }

    get diamonds() {
        return this._diamonds();
    }

    set diamonds(n: number) {
        this._diamonds(n);
    }

    get maxMineEnergy() {
        return this._maxMineEnergy();
    }

    set maxMineEnergy(n: number) {
        this._maxMineEnergy(n);
    }

    get maxUndergroundItems() {
        return this._maxUndergroundItems();
    }

    set maxUndergroundItems(n: number) {
        this._maxUndergroundItems(n);
    }

    get mineEnergyGain() {
        return this._mineEnergyGain();
    }

    set mineEnergyGain(n: number) {
        this._mineEnergyGain(n);
    }

    get mineEnergyRegenTime() {
        return this._mineEnergyRegenTime();
    }

    set mineEnergyRegenTime(n: number) {
        this._mineEnergyRegenTime(n);
    }

    get maxDailyDeals() {
        return this._maxDailyDeals();
    }

    set maxDailyDeals(n: number) {
        this._maxDailyDeals(n);
    }

    get eggList(): Array<KnockoutObservable<Egg|void>> {
        return this._eggList;
    }

    set eggList(value: Array<KnockoutObservable<Egg|void>>) {
        this._eggList = value;
    }

    get eggSlots(): KnockoutObservable<number> {
        return this._eggSlots;
    }

    public gainEggSlot() {
        this._eggSlots(this._eggSlots() + 1);
    }

    get shardUpgrades(): Array<Array<KnockoutObservable<number>>> {
        return this._shardUpgrades;
    }

    set shardUpgrades(value: Array<Array<KnockoutObservable<number>>>) {
        this._shardUpgrades = value;
    }

    get shardsCollected(): Array<KnockoutObservable<number>> {
        return this._shardsCollected;
    }

    set shardsCollected(value: Array<KnockoutObservable<number>>) {
        this._shardsCollected = value;
    }

    public toJSON() {
        let keep = [
            "_money",
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
            "_mineEnergy",
            "_maxMineEnergy",
            "_mineEnergyGain",
            "_mineInventory",
            "_maxDailyDeals",
            "_diamonds",
            "_maxUndergroundItems",
            "_mineEnergyRegenTime",
            "_eggList",
            "_eggSlots",
            "_shardUpgrades",
            "_shardsCollected",
            "achievementsCompleted",
            "farmPoints",
            "seedList",
            "berryList"
        ];
        let plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep)
    }

}

