///<reference path="upgrades/Upgrade.ts"/>
/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {
    private _money: KnockoutObservable<number>;
    private _dungeonTokens: KnockoutObservable<number>;

    public achievementsCompleted: { [name: string]: boolean };

    public prestigeType: GameConstants.PrestigeType;
    public prestigePoints: Array<KnockoutObservable<number>>;
    public prestigeUpgradesBought: Array<KnockoutObservable<boolean>>;
    public prestigeBank: Array<KnockoutObservable<number>>;

    public dungeonsCleared: Array<KnockoutObservable<number>>;

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
    private _gymBadges: KnockoutObservableArray<GameConstants.Badge>;
    private _pokeballs: Array<KnockoutObservable<number>>;
    private _notCaughtBallSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtBallSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _sortOption: KnockoutObservable<GameConstants.SortOptionsEnum>;
    private _sortDescending: KnockoutObservable<boolean>;
    private _town: KnockoutObservable<Town>;
    private _currentTown: KnockoutObservable<string>;
    private _starter: GameConstants.Starter;
    private _oakItemExp: Array<KnockoutObservable<number>>;
    private _oakItemsEquipped: string[];
    private _eggList: Array<KnockoutObservable<Egg | void>>;
    private _eggSlots: KnockoutObservable<number>;

    constructor(savedPlayer?) {
        let saved: boolean = (savedPlayer != null);
        savedPlayer = savedPlayer || {};
        this._lastSeen = savedPlayer._lastSeen || 0
        let tmpCaughtList = [];
        this._money = ko.observable(savedPlayer._money || 0);
        this._dungeonTokens = ko.observable(savedPlayer._dungeonTokens || 0);
        this._questPoints = ko.observable(savedPlayer._questPoints || 0);
        this.prestigeType = savedPlayer.prestigeType || GameConstants.PrestigeType.Easy;
        this.prestigePoints = Array.apply(null, Array(GameHelper.enumLength(GameConstants.PrestigeType))).map(function (val, index) {
            return ko.observable(savedPlayer.prestigePoints ? (savedPlayer.prestigePoints[index] || 0) : 0)
        });
        this.prestigeUpgradesBought = Array.apply(null, Array(GameConstants.AMOUNT_OF_PRESTIGE_UPGRADES + 1)).map(function (val, index) {
            return ko.observable(savedPlayer.prestigeUpgradesBought ? (savedPlayer.prestigeUpgradesBought[index] || false) : false)
        });
        this.prestigeBank = Array.apply(null, Array(GameHelper.enumLength(GameConstants.Currency))).map(function (val, index) {
            return ko.observable(savedPlayer.prestigeBank ? (savedPlayer.prestigeBank[index] || 0) : 0)
        });
        this.dungeonsCleared = Array.apply(null, Array(GameConstants.RegionDungeons.flat().length)).map(function (val, index) {
            return ko.observable(savedPlayer.dungeonsCleared ? (savedPlayer.dungeonsCleared[index] || 0) : 0)
        });
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
        this._oakItemExp = Array.apply(null, Array(GameConstants.AMOUNT_OF_OAKITEMS + 1)).map(function (val, index) {
            return ko.observable(savedPlayer._oakItemExp ? (savedPlayer._oakItemExp[index] || 0) : 0)
        });
        this._oakItemsEquipped = savedPlayer._oakItemsEquipped || [];
        this._routeKillsNeeded = ko.observable(savedPlayer._routeKillsNeeded || 10);
        this._gymBadges = ko.observableArray<GameConstants.Badge>(savedPlayer._gymBadges);
        this._keyItems = ko.observableArray<string>(savedPlayer._keyItems);
        this._pokeballs = Array.apply(null, Array(4)).map(function (val, index) {
            let amt = index == 0 ? 50 : 0;
            if (savedPlayer._pokeballs && typeof savedPlayer._pokeballs[index] == 'number') {
                amt = savedPlayer._pokeballs[index];
            }
            return ko.observable(amt);
        });
        this._notCaughtBallSelection = typeof(savedPlayer._notCaughtBallSelection) != 'undefined' ? ko.observable(savedPlayer._notCaughtBallSelection) : ko.observable(GameConstants.Pokeball.Pokeball);
        this._alreadyCaughtBallSelection = typeof(savedPlayer._alreadyCaughtBallSelection) != 'undefined' ? ko.observable(savedPlayer._alreadyCaughtBallSelection) : ko.observable(GameConstants.Pokeball.None);
        if (this._gymBadges().length == 0) {
            this._gymBadges.push(GameConstants.Badge.None)
        }
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
        this._diamonds = ko.observable(savedPlayer._diamonds || 0);

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
        this._questPoints = ko.observable(savedPlayer._questPoints || 0);

        this._shinyCatches = ko.observable(savedPlayer._shinyCatches || 0);

        this._lastSeen = Date.now();
        this.statistics = new Statistics(savedPlayer.statistics);

        this.farmPoints = ko.observable(savedPlayer.farmPoints || 0);
        this.berryList = Array.apply(null, Array(GameConstants.AMOUNT_OF_BERRIES)).map(function (val, index) {
            return ko.observable(savedPlayer.berryList ? (savedPlayer.berryList[index] || 0) : 0)
        });
        this.plotList = Save.initializePlots(savedPlayer.plotList);
        this.effectList = Save.initializeEffects(savedPlayer.effectList || {});
        this.highestRegion = ko.observable(savedPlayer.highestRegion || 0);

        this.tutorialProgress = ko.observable(savedPlayer.tutorialProgress || 0);
        this.tutorialState = savedPlayer.tutorialState;
        this.tutorialComplete = ko.observable(!!savedPlayer.tutorialComplete);

        if (this.starter === GameConstants.Starter.None) {
            StartSequenceRunner.start()
        }
    }

    private _itemList: { [name: string]: KnockoutObservable<number> };

    // TODO(@Isha) move to underground classes.
    private _mineInventory: KnockoutObservableArray<any>;
    private _diamonds: KnockoutObservable<number>;

    private _shardUpgrades: Array<Array<KnockoutObservable<number>>>;
    private _shardsCollected: Array<KnockoutObservable<number>>;

    private _keyItems: KnockoutObservableArray<string> = ko.observableArray<string>();
    public clickAttackObservable: KnockoutComputed<number>;
    public recentKeyItem: KnockoutObservable<string> = ko.observable("Teachy tv");
    public pokemonAttackObservable: KnockoutComputed<number>;

    get itemList(): { [p: string]: KnockoutObservable<number> } {
        return this._itemList;
    }

    public statistics: Statistics;

    public completedQuestList: Array<KnockoutObservable<boolean>>;
    public questRefreshes: number;
    public _questPoints: KnockoutObservable<number>;
    public _questXP: KnockoutObservable<number>;
    public _lastSeen: number;
    public currentQuests: KnockoutObservableArray<any>;
    private _shinyCatches: KnockoutObservable<number>;

    public plotList: KnockoutObservable<Plot>[];
    public farmPoints: KnockoutObservable<number>;
    public berryList: KnockoutObservable<number>[];

    public effectList: { [name: string]: KnockoutObservable<number> } = {};

    public tutorialProgress: KnockoutObservable<number>;
    public tutorialState: any;
    public tutorialComplete: KnockoutObservable<boolean>;

    private highestRegion: KnockoutObservable<GameConstants.Region>;

    public caughtAndShinyList(): KnockoutComputed<number> {
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
        GameHelper.incrementObservable(this.statistics.pokeballsUsed[ball]);
    }

    public addRouteKill() {
        this.routeKills[this.route()](this.routeKills[this.route()]() + 1)
    }

    public hasKeyItem(name: string): boolean {
        return this._keyItems().includes(name);
    }

    set defeatedAmount(value: Array<KnockoutObservable<number>>) {
        this._defeatedAmount = value;
    }

    public gainKeyItem(name: string, supressModal?: boolean) {
        if (!this.hasKeyItem(name)) {
            this.recentKeyItem(name);
            if (!supressModal) {
                $('.modal').modal('hide');
                $("#keyItemModal").modal('show');
            }
            this._keyItems().push(name);
            KeyItemHandler.getKeyItemObservableByName(name).valueHasMutated();
            player._keyItems.valueHasMutated();
        }
    }

    public resetKeyItem(name: string) {
        if (this.hasKeyItem(name)) {
          this._keyItems().splice(this._keyItems().indexOf(name), 1);
          KeyItemHandler.getKeyItemObservableByName(name).valueHasMutated();
          player._keyItems.valueHasMutated();
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

    private _caughtAmount: Array<KnockoutObservable<number>>;

    public calculateClickAttack(): number {
        // Base power
        let clickAttack =  Math.pow(this.caughtPokemonList.length + this.caughtAndShinyList()().length + 1, 1.4);

        // Apply Oak bonus
        const oakItemBonus = OakItemRunner.isActive(GameConstants.OakItem.Poison_Barb) ? (1 + OakItemRunner.calculateBonus(GameConstants.OakItem.Poison_Barb) / 100) : 1;
        clickAttack *= oakItemBonus;

        // Apply battle item bonus
        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.xClick)()){
            clickAttack *= 1.5;
        }

        return Math.floor(clickAttack);
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
    public calculatePokeballToUse(pokemonName: string, isShiny: boolean): GameConstants.Pokeball {
        const alreadyCaught = this.alreadyCaughtPokemon(pokemonName);
        const alreadyCaughtShiny = this.alreadyCaughtPokemonShiny(pokemonName);
        let pref: GameConstants.Pokeball;
        // just check against alreadyCaughtShiny as this returns false when you don't have the pokemon yet.
        if (!alreadyCaught || (!alreadyCaughtShiny && isShiny)) {
            pref = this._notCaughtBallSelection();
        } else {
            pref = this._alreadyCaughtBallSelection();
        }

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        // Check which Pokeballs we have in stock that are of equal or lesser than selection
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
        const pokemon = player._caughtPokemonList().find(p=>p.name==pokemonName);
        return !!pokemon;
    }

    public alreadyCaughtPokemonShiny(pokemonName: string) {
        if (!this.alreadyCaughtPokemon(pokemonName)) return false;
        return player.caughtShinyList().includes(pokemonName);
    }

    public capturePokemon(pokemonName: string, shiny: boolean = false, supressNotification = false) {
        if (PokemonHelper.calcNativeRegion(pokemonName) > player.highestRegion()) {
            return;
        }
        OakItemRunner.use(GameConstants.OakItem.Magic_Ball);
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
        OakItemRunner.use(GameConstants.OakItem.Amulet_Coin);
        // TODO add money multipliers
        let oakItemBonus = OakItemRunner.isActive(GameConstants.OakItem.Amulet_Coin) ? (1 + OakItemRunner.calculateBonus(GameConstants.OakItem.Amulet_Coin) / 100) : 1;
        let moneytogain = Math.floor(money * oakItemBonus * (1 + AchievementHandler.achievementBonus()))
        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.Lucky_incense)()){
            moneytogain = Math.floor(moneytogain * 1.5);
        }
        this._money(this._money() + moneytogain);
        GameHelper.incrementObservable(this.statistics.totalMoney, moneytogain);
        Game.updateMoney();

        Game.animateMoney(moneytogain,'playerMoney');
    }

    set itemList(value: { [p: string]: KnockoutObservable<number> }) {
        this._itemList = value;
    }

    public hasCurrency(amt: number, curr: GameConstants.Currency): boolean {
        switch (curr) {
            case GameConstants.Currency.money:
                return this.hasMoney(amt);
            case GameConstants.Currency.questPoint:
                return this.hasQuestPoints(amt);
            case GameConstants.Currency.dungeontoken:
                return this.hasDungeonTokens(amt);
            case GameConstants.Currency.diamond:
                return this.hasDiamonds(amt);
            default:
                return false;
        }
    }

    public canAfford(cost: Cost) {
        return this.hasCurrency(cost.amount, cost.currency);
    }

    public hasMoney(money: number) {
        return this._money() >= money;
    }

    public hasQuestPoints(questPoints: number) {
        return this._questPoints() >= questPoints;
    }

    public hasDungeonTokens(tokens: number) {
        return this._dungeonTokens() >= tokens;
    }

    public hasDiamonds(diamonds: number) {
        return this._diamonds() >= diamonds;
    }

    public payCurrency(amt: number, curr: GameConstants.Currency): boolean {
        switch (curr) {
            case GameConstants.Currency.money:
                return this.payMoney(amt);
            case GameConstants.Currency.questPoint:
                return this.payQuestPoints(amt);
            case GameConstants.Currency.dungeontoken:
                return this.payDungeonTokens(amt);
            case GameConstants.Currency.diamond:
                return this.payDiamonds(amt);
            default:
                return false;
        }
    }

    public payCost(cost: Cost): boolean {
        return this.payCurrency(cost.amount, cost.currency);
    }

    public payQuestPoints(questPoints: number): boolean {
        if (this.hasQuestPoints(questPoints)) {
            this._questPoints(Math.floor(this.questPoints - questPoints));
            return true;
        } else {
            return false
        }
    }

    public payMoney(money: number): boolean {
        if (this.hasMoney(money)) {
            this._money(Math.floor(this._money() - money));
            Game.updateMoney();
            return true;
        } else {
            return false;
        }
    }

    public payDungeonTokens(tokens: number): boolean {
        if (this.hasDungeonTokens(tokens)) {
            this._dungeonTokens(Math.floor(this._dungeonTokens() - tokens));
            return true;
        } else {
            return false;
        }
    }

    public payDiamonds(diamonds: number): boolean {
        if (this.hasDiamonds(diamonds)) {
            this._diamonds(Math.floor(this._diamonds() - diamonds));
            return true;
        } else {
            return false;
        }
    }

    public gainFarmPoints(points: number) {
        this.farmPoints(Math.floor(this.farmPoints() + points));
    }

    public gainExp(exp: number, level: number, trainer: boolean) {
        OakItemRunner.use(GameConstants.OakItem.Exp_Share);
        // TODO add exp multipliers
        let trainerBonus = trainer ? 1.5 : 1;
        let oakItemBonus = OakItemRunner.isActive(GameConstants.OakItem.Exp_Share) ? 1 + (OakItemRunner.calculateBonus(GameConstants.OakItem.Exp_Share) / 100) : 1;
        let expTotal = Math.floor(exp * level * trainerBonus * oakItemBonus * (1 + AchievementHandler.achievementBonus()) / 9);

        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.xExp)()){
            expTotal *= 1.5;
        }

        for (let pokemon of this._caughtPokemonList()) {
            if (pokemon.levelObservable() < (this.gymBadges.length + 2) * 10) {
                pokemon.exp(pokemon.exp() + expTotal);
            }
        }
    }

    public gainShards(pokemon: BattlePokemon) {
        let typeNum = GameConstants.PokemonType[pokemon.type1];
        player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + pokemon.shardReward);
        GameHelper.incrementObservable(player.statistics.totalShards[typeNum], pokemon.shardReward)
        if (pokemon.type2 != GameConstants.PokemonType.None) {
            typeNum = GameConstants.PokemonType[pokemon.type2];
            player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + pokemon.shardReward);
            GameHelper.incrementObservable(player.statistics.totalShards[typeNum], pokemon.shardReward)
        }
    }

    public buyShardUpgrade(typeNum: number, effectNum: number) {
        if (this.canBuyShardUpgrade(typeNum, effectNum)) {
            this._shardsCollected[typeNum](this._shardsCollected[typeNum]() - this.getShardUpgradeCost(typeNum, effectNum));
            this._shardUpgrades[typeNum][effectNum](this._shardUpgrades[typeNum][effectNum]() + 1);
        }
    }

    public shardUpgradeMaxed(typeNum: number, effectNum: number): boolean {
        return this._shardUpgrades[typeNum][effectNum]() >= GameConstants.MAX_SHARD_UPGRADES;
    }

    public canBuyShardUpgrade(typeNum: number, effectNum: number): boolean {
        let lessThanMax = !this.shardUpgradeMaxed(typeNum, effectNum);
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
                return true;
            }
        }
        console.log("Error: Could not place " + GameConstants.EggType[e.type] + " Egg");
        return false;
    }

    public gainBadge(badge: GameConstants.Badge) {
        this._gymBadges.push(badge);
    }

    public gainDungeonTokens(tokens: number) {
        // Apply prestige bonuses
        tokens = Math.round(tokens * PrestigeBonuses.getBonus(2));

        // Apply battle item bonus
        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.Token_collector)()){
            tokens *= 1.5;
        }

        tokens = Math.floor(tokens);

        this.dungeonTokens(this.dungeonTokens() + tokens);

        GameHelper.incrementObservable(this.statistics.totalTokens, tokens);
        Game.animateMoney(tokens, 'playerMoneyDungeon');
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
        return this._region();
    }

    set region(value: GameConstants.Region) {
        this._region(value);
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

    get currentTown(): KnockoutObservable<string> {
        return this._currentTown;
    }

    set currentTown(value: KnockoutObservable<string>) {
        this._currentTown = value;
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

    get eggList(): Array<KnockoutObservable<Egg | void>> {
        return this._eggList;
    }

    set eggList(value: Array<KnockoutObservable<Egg | void>>) {
        this._eggList = value;
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


    get diamonds() {
        return this._diamonds();
    }

    set diamonds(n: number) {
        const amt = n - this._diamonds();
        if (amt > 0) GameHelper.incrementObservable(player.statistics.totalDiamonds, amt);
        this._diamonds(n);
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

    get eggSlots(): KnockoutObservable<number> {
        return this._eggSlots;
    }

    public gainEggSlot() {
        this._eggSlots(this._eggSlots() + 1);
    }

    public nextEggSlotCost() {
        return BreedingHelper.getEggSlotCost(this._eggSlots() + 1);
    }

    public buyEggSlot() {
        let cost = this.nextEggSlotCost();
        if (this.questPoints >= cost) {
            this.questPoints -= cost;
            this.gainEggSlot();
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

    get questPoints(): number {
        return this._questPoints();
    }

    set questPoints(value: number) {
        this._questPoints(value);
    }

    public gainQuestPoints(value: number) {
        player.questPoints += value;
        GameHelper.incrementObservable(this.statistics.totalQuestPoints, value);
        Game.animateMoney(value,'playerMoneyQuest');
    }

    public toJSON(prestige: boolean = false) {
        let keep = [];
        if (!prestige){
          keep = [
              "_money",
              "_dungeonTokens",
              "_questPoints",
              "prestigePoints",
              "prestigeUpgradesBought",
              "prestigeType",
              "prestigeBank",
              "_caughtShinyList",
              "_route",
              "_caughtPokemonList",
              "_defeatedAmount",
              "_caughtAmount",
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
              // TODO(@Isha) remove.
              "_mineInventory",
              "_diamonds",
              // TODO(@Isha) remove.
              "_mineLayersCleared",
              "_eggList",
              "_eggSlots",
              "_shardUpgrades",
              "_shardsCollected",
              "achievementsCompleted",
              "completedQuestList",
              "questRefreshes",
              "_questXP",
              "_questPoints",
              "_lastSeen",
              "currentQuests",
              "_shinyCatches",
              "gymDefeats",
              "dungeonsCleared",
              "statistics",
              "achievementsCompleted",
              "farmPoints",
              "plotList",
              "berryList",
              "highestRegion",
              "tutorialProgress",
              "tutorialState",
              "tutorialComplete",
          ];
        } else {
          keep = [
              "prestigePoints",
              "prestigeUpgradesBought",
              "prestigeType",
              "prestigeBank",
              "_caughtShinyList",
              "_defeatedAmount",
              "_caughtAmount",
              "_sortOption",
              "_sortDescending",
              "_oakItemExp",
              "_keyItems",
              "_shardUpgrades",
              "_shardsCollected",
              "achievementsCompleted",
              "questRefreshes",
              "_questXP",
              "_lastSeen",
              "_shinyCatches",
              "statistics",
              "achievementsCompleted",
              "plotList",
              "berryList",
              "tutorialProgress",
              "tutorialState",
              "tutorialComplete",
          ];
        }
        let plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep)
    }
}
