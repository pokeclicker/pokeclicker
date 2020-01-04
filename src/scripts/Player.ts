///<reference path="upgrades/Upgrade.ts"/>
/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {

    public achievementsCompleted: { [name: string]: boolean };

    private _caughtShinyList: KnockoutObservableArray<string>;
    private _route: KnockoutObservable<number>;
    private _caughtPokemonList: KnockoutObservableArray<CaughtPokemon>;

    private _defeatedAmount: Array<KnockoutObservable<number>>;

    get defeatedAmount(): Array<KnockoutObservable<number>> {
        return this._defeatedAmount;
    }

    private _routeKills: Array<KnockoutObservable<number>>;
    private _routeKillsNeeded: KnockoutObservable<number>;
    private _region: KnockoutObservable<GameConstants.Region>;
    private _sortOption: KnockoutObservable<GameConstants.SortOptionsEnum>;
    private _sortDescending: KnockoutObservable<boolean>;
    private _town: KnockoutObservable<Town>;
    private _currentTown: KnockoutObservable<string>;
    private _starter: GameConstants.Starter;

    constructor(savedPlayer?) {
        let saved: boolean = (savedPlayer != null);
        savedPlayer = savedPlayer || {};
        this._lastSeen = savedPlayer._lastSeen || 0
        let tmpCaughtList = [];
        this._caughtShinyList = ko.observableArray<string>(savedPlayer._caughtShinyList);
        this._region = ko.observable(savedPlayer._region);
        if (MapHelper.validRoute(savedPlayer._route, savedPlayer._region)) {
            this._route = ko.observable(savedPlayer._route)
        } else {
            switch (savedPlayer._region) {
                case 0:
                    this._route = ko.observable(1);
                    break;
                case 1:
                    this._route = ko.observable(29);
                    break;
                default:
                    this._route = ko.observable(1);
                    this._region = ko.observable(GameConstants.Region.kanto);
            }
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

        this._defeatedAmount = Array.apply(null, Array(pokemonList.length + 1)).map(function (val, index) {
            return ko.observable(savedPlayer._defeatedAmount ? (savedPlayer._defeatedAmount[index] || 0) : 0)
        });
        this._caughtAmount = Array.apply(null, Array(pokemonList.length + 1)).map(function (val, index) {
            return ko.observable(savedPlayer._caughtAmount ? (savedPlayer._caughtAmount[index] || 0) : 0)
        });
        this._routeKillsNeeded = ko.observable(savedPlayer._routeKillsNeeded || 10);
        this._sortOption = ko.observable(savedPlayer._sortOption || null);
        this._sortDescending = ko.observable(typeof(savedPlayer._sortDescending) != 'undefined' ? savedPlayer._sortDescending : false);
        this.clickAttackObservable = ko.computed(function () {
            return this.calculateClickAttack()
        }, this);
        this.pokemonAttackObservable = ko.computed(function () {
            return this.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None);
        }, this);
        this._town = ko.observable(TownList["Pallet Town"]);
        this._currentTown = ko.observable("");
        this._starter = savedPlayer._starter != undefined ? savedPlayer._starter : GameConstants.Starter.None;

        console.log(savedPlayer._itemList);

        this._itemList = Save.initializeItemlist();
        if (savedPlayer._itemList) {
            for (let key in savedPlayer._itemList) {
                this._itemList[key] = ko.observable(savedPlayer._itemList[key]);
            }
        }

        this._itemMultipliers = savedPlayer._itemMultipliers || Save.initializeMultipliers();

        // TODO(@Isha) move to underground classes.
        this._mineInventory = ko.observableArray(savedPlayer._mineInventory || []);
        for (let item of this._mineInventory()) {
            item.amount = ko.observable(item.amount);
        }

        this._shardUpgrades = Save.initializeShards(savedPlayer._shardUpgrades);

        this.achievementsCompleted = savedPlayer.achievementsCompleted || {};

        this._shardsCollected = Array.apply(null, Array<number>(18)).map((value, index) => {
            return ko.observable(savedPlayer._shardsCollected ? savedPlayer._shardsCollected[index] : 0);
        });

        let today = new Date();
        let lastSeen = new Date(this._lastSeen);
        if (today.toLocaleDateString() == lastSeen.toLocaleDateString()) {
            this.questRefreshes = savedPlayer.questRefreshes;
            if (savedPlayer.completedQuestList) {
                this.completedQuestList = savedPlayer.completedQuestList.map((bool) => {
                    return ko.observable(bool)
                });
            } else {
                this.completedQuestList = Array.apply(null, Array(GameConstants.QUESTS_PER_SET)).map(() => {
                    return ko.observable(false)
                });
            }

            this.currentQuests = ko.observableArray(savedPlayer.currentQuests || []);
            for (let q of this.currentQuests()) {
                q.initial = ko.observable(q.initial);
            }
        } else {
            this.questRefreshes = 0;
            this.completedQuestList = Array.apply(null, Array(GameConstants.QUESTS_PER_SET)).map(() => {
                return ko.observable(false)
            });
            this.currentQuests = ko.observableArray([]);
        }
        this._questXP = ko.observable(savedPlayer._questXP || 0);

        this._shinyCatches = ko.observable(savedPlayer._shinyCatches || 0);

        this._lastSeen = Date.now();
        this.statistics = new Statistics(savedPlayer.statistics);

        this.berryList = Array.apply(null, Array(GameConstants.AMOUNT_OF_BERRIES)).map(function (val, index) {
            return ko.observable(savedPlayer.berryList ? (savedPlayer.berryList[index] || 0) : 0)
        });
        this.plotList = Save.initializePlots(savedPlayer.plotList);
        this.effectList = Save.initializeEffects(savedPlayer.effectList || {});
        this.highestRegion = ko.observable(savedPlayer.highestRegion || 0);

        this.tutorialProgress = ko.observable(savedPlayer.tutorialProgress || 0);
        this.tutorialState = savedPlayer.tutorialState;
        this.tutorialComplete = ko.observable(!!savedPlayer.tutorialComplete);

    }

    private _itemList: { [name: string]: KnockoutObservable<number> };

    // TODO(@Isha) move to underground classes.
    private _mineInventory: KnockoutObservableArray<any>;

    private _shardUpgrades: Array<Array<KnockoutObservable<number>>>;
    private _shardsCollected: Array<KnockoutObservable<number>>;

    public clickAttackObservable: KnockoutComputed<number>;
    public pokemonAttackObservable: KnockoutComputed<number>;

    get itemList(): { [p: string]: KnockoutObservable<number> } {
        return this._itemList;
    }

    public statistics: Statistics;

    public completedQuestList: Array<KnockoutObservable<boolean>>;
    public questRefreshes: number;
    public _questXP: KnockoutObservable<number>;
    public _lastSeen: number;
    public currentQuests: KnockoutObservableArray<any>;
    private _shinyCatches: KnockoutObservable<number>;

    public plotList: KnockoutObservable<Plot>[];
    public berryList: KnockoutObservable<number>[];

    public effectList: { [name: string]: KnockoutObservable<number> } = {};

    public tutorialProgress: KnockoutObservable<number>;
    public tutorialState: any;
    public tutorialComplete: KnockoutObservable<boolean>;

    private highestRegion: KnockoutObservable<GameConstants.Region>;

    public caughtAndShinyList(): KnockoutComputed<string[]> {
        return ko.computed(function () {
            const pokeList = this.caughtPokemonList.map(pokemon=>pokemon.name);
            return this.caughtShinyList().filter(pokemon=>pokeList.includes(pokemon));
        }, this);
    }

    public routeKillsObservable(route: number): KnockoutComputed<number> {
        return ko.computed(function () {
            return Math.min(this.routeKillsNeeded, this.routeKills[route]());
        }, this);
    }

    public addRouteKill() {
        this.routeKills[this.route()](this.routeKills[this.route()]() + 1)
    }

    set defeatedAmount(value: Array<KnockoutObservable<number>>) {
        this._defeatedAmount = value;
    }

    private _caughtAmount: Array<KnockoutObservable<number>>;

    public calculateClickAttack(): number {
        // Base power
        let clickAttack =  Math.pow(this.caughtPokemonList.length + this.caughtAndShinyList()().length + 1, 1.4);

        // TODO(@Isha) fix when refactoring to party
        if (App.game != undefined) {
            clickAttack *= App.game.oakItems.calculateBonus(OakItems.OakItem.Poison_Barb);
        }

        // Apply battle item bonus
        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.xClick)()){
            clickAttack *= 1.5;
        }

        return Math.floor(clickAttack);
    }

    public calculateExpMultiplier(): number {
        // TODO Calculate exp multiplier by checking upgrades and multipliers.
        return 1;
    }

    /**
     * Loops through the caughtPokemonList to check if the pokémon is already caight
     * @param pokemonName name to search for.
     * @returns {boolean}
     */
    public alreadyCaughtPokemon(pokemonName: string) {
        const pokemon = PokemonHelper.getPokemonByName(pokemonName);
        if (!pokemon) return false;
        const id = PokemonHelper.getPokemonByName(pokemonName).id;
        return player.caughtAmount[id]() > 0;
    }

    public alreadyCaughtPokemonShiny(pokemonName: string) {
        if (!this.alreadyCaughtPokemon(pokemonName)) return false;
        for (let i: number = 0; i < this.caughtShinyList().length; i++) {
            if (this.caughtShinyList()[i] == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public capturePokemon(pokemonName: string, shiny: boolean = false, supressNotification = false) {
        if (PokemonHelper.calcNativeRegion(pokemonName) > player.highestRegion()) {
            return;
        }
        App.game.oakItems.use(OakItems.OakItem.Magic_Ball);
        let pokemonData = PokemonHelper.getPokemonByName(pokemonName);
        if (!this.alreadyCaughtPokemon(pokemonName)) {
            let caughtPokemon: CaughtPokemon = new CaughtPokemon(pokemonData, false, 0, 0);
            this._caughtPokemonList.push(caughtPokemon);
            if (!supressNotification) {
                if (shiny) Notifier.notify(`✨ You have captured a shiny ${pokemonName}! ✨`, GameConstants.NotificationOption.warning);
                else Notifier.notify(`You have captured ${GameHelper.anOrA(pokemonName)} ${pokemonName}!`, GameConstants.NotificationOption.success)
            }
        }
        if (shiny && !this.alreadyCaughtPokemonShiny(pokemonName)) {
            this._caughtShinyList.push(pokemonName);
            Save.store(player);
        }
        if (shiny) {
            player.shinyCatches++;
        }
        player.caughtAmount[pokemonData.id](player.caughtAmount[pokemonData.id]() + 1);
        GameHelper.incrementObservable(player.statistics.pokemonCaptured);
    }

    set itemList(value: { [p: string]: KnockoutObservable<number> }) {
        this._itemList = value;
    }

    public gainExp(exp: number, level: number, trainer: boolean) {
        App.game.oakItems.use(OakItems.OakItem.Exp_Share);
        // TODO add exp multipliers
        let trainerBonus = trainer ? 1.5 : 1;
        let oakItemBonus = App.game.oakItems.calculateBonus(OakItems.OakItem.Exp_Share);
        let expTotal = Math.floor(exp * level * trainerBonus * oakItemBonus * (1 + AchievementHandler.achievementBonus()) / 9);

        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.xExp)()){
            expTotal *= 1.5;
        }

        for (let pokemon of this._caughtPokemonList()) {
            if (pokemon.levelObservable() < (App.game.badgeCase.badgeCount() + 2) * 10) {
                pokemon.exp(pokemon.exp() + expTotal);
            }
        }
    }

    public sortedPokemonList(): KnockoutComputed<Array<CaughtPokemon>> {
        return ko.pureComputed(function () {
            return this._caughtPokemonList().sort(PokemonHelper.compareBy(GameConstants.SortOptionsEnum[player._sortOption()], player._sortDescending()));
        }, this).extend({rateLimit: 1000})
    }

    public maxLevelPokemonList(): KnockoutComputed<Array<CaughtPokemon>> {
        return ko.pureComputed(function () {
            return this._caughtPokemonList().filter((pokemon) => {
                return pokemon.levelObservable() == 100 && !pokemon.breeding();
            })
        }, this)
    }

    get caughtAmount(): Array<KnockoutObservable<number>> {
        return this._caughtAmount;
    }

    set caughtAmount(value: Array<KnockoutObservable<number>>) {
        this._caughtAmount = value;
    }

    private _itemMultipliers: { [name: string]: number };

    get itemMultipliers(): { [p: string]: number } {
        return this._itemMultipliers;
    }

    public hasMaxLevelPokemon(): boolean {
        return this.maxLevelPokemonList()().length > 0;
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

    get caughtPokemonList() {
        return this._caughtPokemonList();
    }

    get region(): GameConstants.Region {
        return this._region();
    }

    set region(value: GameConstants.Region) {
        this._region(value);
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

    get currentTown(): KnockoutObservable<string> {
        return this._currentTown;
    }

    set currentTown(value: KnockoutObservable<string>) {
        this._currentTown = value;
    }

    get starter(): GameConstants.Starter {
        return this._starter;
    }

    set starter(value: GameConstants.Starter) {
        this._starter = value;
    }

    public gainItem(itemName: string, amount: number) {
        this._itemList[itemName](this._itemList[itemName]() + amount);
    }

    public loseItem(itemName: string, amount: number) {
        this._itemList[itemName](this._itemList[itemName]() - amount);
    }

    public lowerItemMultipliers() {
        for (let obj in ItemList) {
            let item = ItemList[obj];
            item.decreasePriceMultiplier();
        }
    }

    // TODO(@Isha) move to underground classes.
    public hasMineItems() {
        for (let i = 0; i < this._mineInventory().length; i++) {
            if (this._mineInventory()[i].amount() > 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public calculatePokemonAttack(type1: GameConstants.PokemonType, type2: GameConstants.PokemonType): number {
        let attack = 0;
        for (let pokemon of this.caughtPokemonList) {
            let multiplier = 1;
            if (this.region !== GameHelper.getRegion(pokemon.id)) {
                // Pokemon only retain 20% of their total damage in other regions.
                multiplier = 0.2
            }
            if (!pokemon.breeding()) {
                if (Battle.enemyPokemon() == null || type1 == GameConstants.PokemonType.None) {
                    attack += pokemon.attack() * multiplier;
                } else {
                    let dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
                    attack += pokemon.attack() * TypeHelper.getAttackModifier(dataPokemon.type1, dataPokemon.type2, Battle.enemyPokemon().type1, Battle.enemyPokemon().type2) * multiplier;
                }
            }
        }

        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.xAttack)()){
            attack *= 1.5;
        }

        return Math.round(attack);
    }

    public getRandomBerry() {
        let i = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        Notifier.notify("You got a " + GameConstants.BerryType[i] + " berry!", GameConstants.NotificationOption.success);
        let amount = 1;
        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Item_magnet)()) {
            if (Math.random() < 0.5) {
                amount += 1;
            }
        }
        player.berryList[i](player.berryList[i]() + amount);
    }

    // TODO(@Isha) move to underground classes.
    public mineInventoryIndex(id: number): number {
        for (let i = 0; i < player._mineInventory().length; i++) {
            if (player._mineInventory()[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    // TODO(@Isha) move to underground classes.
    public getUndergroundItemAmount(id: number) {
        let index = this.mineInventoryIndex(id);
        if (index > -1) {
            return player._mineInventory.peek()[index].amount();
        } else {
            return 0;
        }
    }

    public unlockPlot() {
        let i = 0;
        while (i < this.plotList.length && this.plotList[i]().isUnlocked()) {
            i++;
        }
        if (i == this.plotList.length) {
            return;
        }
        this.plotList[i]().isUnlocked(true);
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

    get questLevel(): number {
        return QuestHelper.xpToLevel(player.questXP);
    }

    public percentToNextQuestLevel(): number {
        let current = this.questLevel;
        let requiredForCurrent = QuestHelper.levelToXP(current);
        let requiredForNext = QuestHelper.levelToXP(current + 1);
        return 100 * (this.questXP - requiredForCurrent) / (requiredForNext - requiredForCurrent);
    }

    get shinyCatches(): number {
        return this._shinyCatches();
    }

    set shinyCatches(value: number) {
        this._shinyCatches(value);
    }

    get questXP(): number {
        return this._questXP();
    }

    set questXP(value: number) {
        this._questXP(value);
    }

    public toJSON() {
        let keep = [
            "_caughtShinyList",
            "_route",
            "_caughtPokemonList",
            "_defeatedAmount",
            "_caughtAmount",
            "_routeKills",
            "_routeKillsNeeded",
            "_region",
            "_sortOption",
            "_sortDescending",
            "_starter",
            "_itemList",
            "_itemMultipliers",
            // TODO(@Isha) remove.
            "_mineInventory",
            // TODO(@Isha) remove.
            "_mineLayersCleared",
            "_shardUpgrades",
            "_shardsCollected",
            "achievementsCompleted",
            "completedQuestList",
            "questRefreshes",
            "_questXP",
            "_lastSeen",
            "currentQuests",
            "_shinyCatches",
            "gymDefeats",
            "statistics",
            "achievementsCompleted",
            "plotList",
            "berryList",
            "effectList",
            "highestRegion",
            "tutorialProgress",
            "tutorialState",
            "tutorialComplete",
        ];
        let plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep)
    }
}
